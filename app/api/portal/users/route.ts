import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase/server"

// GET /api/portal/users — list team members for the authenticated business
export async function GET() {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const supabase = createServerSupabaseClient()

  const { data: profile } = await supabase
    .from("users")
    .select("business_id")
    .eq("clerk_user_id", userId)
    .single()

  if (!profile) return NextResponse.json({ error: "User profile not found" }, { status: 403 })

  const { data: users, error } = await supabase
    .from("users")
    .select("id, clerk_user_id, business_id, role, name, email, created_at")
    .eq("business_id", profile.business_id)
    .order("created_at", { ascending: true })

  if (error) {
    console.error("portal/users GET error", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ users: users ?? [] })
}

// POST /api/portal/users — invite a new team member
export async function POST(request: Request) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const body = (await request.json()) as { email?: string; role?: string }
  if (!body.email) return NextResponse.json({ error: "Email is required" }, { status: 400 })

  const supabase = createServerSupabaseClient()

  const { data: profile } = await supabase
    .from("users")
    .select("business_id")
    .eq("clerk_user_id", userId)
    .single()

  if (!profile) return NextResponse.json({ error: "User profile not found" }, { status: 403 })

  // TODO: trigger Clerk invitation email — for now insert a placeholder row
  const { data: user, error } = await supabase
    .from("users")
    .insert({
      business_id: profile.business_id,
      clerk_user_id: `pending-${Date.now()}`,
      role: body.role ?? "va",
      email: body.email,
      name: null,
    })
    .select()
    .single()

  if (error) {
    console.error("portal/users POST error", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ user }, { status: 201 })
}
