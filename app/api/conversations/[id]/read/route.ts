import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import { getUserByClerkId } from "@/lib/twilio"

// POST /api/conversations/[id]/read
// Marks a conversation as read by zeroing its unread_count. Called when the
// portal user opens the thread so the inbox unread badge clears.

export async function POST(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  // ── Auth ──────────────────────────────────────────────────────────────────
  const { userId } = await auth()
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id: conversationId } = await context.params

  const user = await getUserByClerkId(userId)
  if (!user) {
    return NextResponse.json({ error: "User profile not found" }, { status: 403 })
  }

  const supabase = createServerSupabaseClient()

  // Scope by business_id so a user can only clear their own business's threads.
  const { error } = await supabase
    .from("conversations")
    .update({ unread_count: 0 })
    .eq("id", conversationId)
    .eq("business_id", user.business_id)

  if (error) {
    console.error("conversations/read: update failed:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
