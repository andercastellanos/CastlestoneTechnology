import { NextResponse } from "next/server"
import { requireAdmin } from "@/lib/admin-auth"
import { createAdminSupabaseClient } from "@/lib/supabase/server"

// POST /api/admin/requests/approve
// Approve a captured signup: create a business + linked owner, then mark approved.
//
// Idempotency: we ATOMICALLY claim the row (pending → approved) up front. A second
// click (or race) finds nothing pending and bails before provisioning, so we never
// create duplicate businesses. If provisioning then fails, we revert to 'pending'
// so the request can be retried.
export async function POST(request: Request) {
  const gate = await requireAdmin()
  if (!gate.ok) {
    return NextResponse.json({ error: "Forbidden" }, { status: gate.status })
  }

  const body = (await request.json()) as {
    requestId?: string
    businessName?: string
  }
  const requestId = body.requestId
  const businessName = body.businessName?.trim()

  if (!requestId) {
    return NextResponse.json({ error: "requestId is required" }, { status: 400 })
  }
  if (!businessName) {
    return NextResponse.json(
      { error: "Business name is required" },
      { status: 400 },
    )
  }

  const supabase = createAdminSupabaseClient()

  // Atomic claim: only succeeds while the row is still pending.
  const { data: claimed, error: claimError } = await supabase
    .from("signup_requests")
    .update({ status: "approved", updated_at: new Date().toISOString() })
    .eq("id", requestId)
    .eq("status", "pending")
    .select("id, email, clerk_user_id")
    .maybeSingle()

  if (claimError) {
    console.error("admin/requests/approve claim error", claimError)
    return NextResponse.json({ error: claimError.message }, { status: 500 })
  }
  if (!claimed) {
    // Either the id doesn't exist or it was already actioned.
    return NextResponse.json(
      { error: "Request is no longer pending" },
      { status: 409 },
    )
  }

  // Provision: business first, then the owner row linked to the captured Clerk id.
  const { data: business, error: bizError } = await supabase
    .from("businesses")
    .insert({ name: businessName })
    .select("id, name")
    .single()

  if (bizError || !business) {
    console.error("admin/requests/approve business error", bizError)
    await revertToPending(supabase, requestId)
    return NextResponse.json(
      { error: bizError?.message ?? "Failed to create business" },
      { status: 500 },
    )
  }

  const { error: userError } = await supabase.from("users").insert({
    business_id:   business.id,
    clerk_user_id: claimed.clerk_user_id ?? null, // stamp captured id → instant link
    role:          "owner",
    email:         claimed.email,
    name:          null,
    status:        "offline",
  })

  if (userError) {
    console.error("admin/requests/approve owner error", userError)
    // Roll back: remove the orphaned business and re-open the request.
    await supabase.from("businesses").delete().eq("id", business.id)
    await revertToPending(supabase, requestId)
    return NextResponse.json({ error: userError.message }, { status: 500 })
  }

  return NextResponse.json(
    { success: true, businessId: business.id, linked: Boolean(claimed.clerk_user_id) },
    { status: 201 },
  )
}

async function revertToPending(
  supabase: ReturnType<typeof createAdminSupabaseClient>,
  requestId: string,
) {
  await supabase
    .from("signup_requests")
    .update({ status: "pending", updated_at: new Date().toISOString() })
    .eq("id", requestId)
}
