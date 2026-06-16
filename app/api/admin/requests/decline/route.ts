import { NextResponse } from "next/server"
import { requireAdmin } from "@/lib/admin-auth"
import { createAdminSupabaseClient } from "@/lib/supabase/server"

// POST /api/admin/requests/decline
// Mark a captured signup 'declined'. No provisioning. Atomic + idempotent:
// only a still-pending row flips; a repeat click finds nothing and 409s.
export async function POST(request: Request) {
  const gate = await requireAdmin()
  if (!gate.ok) {
    return NextResponse.json({ error: "Forbidden" }, { status: gate.status })
  }

  const body = (await request.json()) as { requestId?: string }
  const requestId = body.requestId
  if (!requestId) {
    return NextResponse.json({ error: "requestId is required" }, { status: 400 })
  }

  const supabase = createAdminSupabaseClient()

  const { data: declined, error } = await supabase
    .from("signup_requests")
    .update({ status: "declined", updated_at: new Date().toISOString() })
    .eq("id", requestId)
    .eq("status", "pending")
    .select("id")
    .maybeSingle()

  if (error) {
    console.error("admin/requests/decline error", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  if (!declined) {
    return NextResponse.json(
      { error: "Request is no longer pending" },
      { status: 409 },
    )
  }

  return NextResponse.json({ success: true })
}
