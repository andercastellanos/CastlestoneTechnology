import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase/server"

// DELETE /api/portal/users/[id] — remove a team member (non-owners only)
export async function DELETE(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await context.params
  const supabase = createServerSupabaseClient()

  const { data: profile } = await supabase
    .from("users")
    .select("business_id")
    .eq("clerk_user_id", userId)
    .single()

  if (!profile) return NextResponse.json({ error: "User profile not found" }, { status: 403 })

  // Verify the target belongs to same business
  const { data: target } = await supabase
    .from("users")
    .select("id, role")
    .eq("id", id)
    .eq("business_id", profile.business_id)
    .single()

  if (!target) return NextResponse.json({ error: "User not found" }, { status: 404 })
  if (target.role === "owner") {
    return NextResponse.json({ error: "Cannot remove the owner" }, { status: 403 })
  }

  const { error } = await supabase
    .from("users")
    .delete()
    .eq("id", id)

  if (error) {
    console.error("portal/users DELETE error", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
