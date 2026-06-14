import { NextResponse } from "next/server"
import { requireAdmin } from "@/lib/admin-auth"
import { createAdminSupabaseClient } from "@/lib/supabase/server"

// Roles an admin may provision via this endpoint.
const PROVISIONABLE_ROLES = ["owner", "va", "assistant"] as const
type ProvisionableRole = (typeof PROVISIONABLE_ROLES)[number]

// POST /api/admin/users — platform admin pre-creates a PENDING user for a business.
// clerk_user_id is null; the Clerk webhook links it by email on signup.
export async function POST(request: Request) {
  const gate = await requireAdmin()
  if (!gate.ok) {
    return NextResponse.json({ error: "Forbidden" }, { status: gate.status })
  }

  const body = (await request.json()) as {
    business_id?: string
    email?: string
    role?: string
  }
  const businessId = body.business_id
  const email = body.email?.trim().toLowerCase()
  const role = body.role as ProvisionableRole | undefined

  if (!businessId) {
    return NextResponse.json({ error: "business_id is required" }, { status: 400 })
  }
  if (!email) {
    return NextResponse.json({ error: "email is required" }, { status: 400 })
  }
  if (!role || !PROVISIONABLE_ROLES.includes(role)) {
    return NextResponse.json(
      { error: `role must be one of: ${PROVISIONABLE_ROLES.join(", ")}` },
      { status: 400 },
    )
  }

  const supabase = createAdminSupabaseClient()

  // Guard against duplicate provisioning for the same email in this business.
  const { data: dupe } = await supabase
    .from("users")
    .select("id")
    .eq("business_id", businessId)
    .ilike("email", email)
    .limit(1)
    .maybeSingle()
  if (dupe) {
    return NextResponse.json(
      { error: "A user with this email already exists for this business" },
      { status: 409 },
    )
  }

  const { data: user, error } = await supabase
    .from("users")
    .insert({
      business_id:   businessId,
      clerk_user_id: null, // pending — linked by the Clerk webhook on signup
      role,
      email,
      name:          null,
      status:        "offline",
    })
    .select("id, email, role, business_id")
    .single()

  if (error) {
    console.error("admin/users POST error", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ user }, { status: 201 })
}
