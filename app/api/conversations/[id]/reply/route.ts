import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase/server"

interface ReplyPayload {
  body: string
}

export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  // Auth guard
  const { userId } = await auth()
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id: conversationId } = await context.params

  // Validate payload
  const payload = (await request.json()) as ReplyPayload
  const body = payload.body?.trim()
  if (!body) {
    return NextResponse.json(
      { error: "Message body is required" },
      { status: 400 },
    )
  }

  const supabase = createServerSupabaseClient()

  // Verify this conversation belongs to a business the user has access to
  const { data: profile } = await supabase
    .from("users")
    .select("business_id")
    .eq("clerk_user_id", userId)
    .single()

  if (!profile) {
    return NextResponse.json({ error: "User profile not found" }, { status: 403 })
  }

  const { data: conversation } = await supabase
    .from("conversations")
    .select("id")
    .eq("id", conversationId)
    .eq("business_id", profile.business_id)
    .single()

  if (!conversation) {
    return NextResponse.json({ error: "Conversation not found" }, { status: 404 })
  }

  // Insert the outbound message
  const { data: message, error: insertError } = await supabase
    .from("messages")
    .insert({
      conversation_id: conversationId,
      direction: "outbound",
      body,
      sender_name: null, // could be enriched with user display name
    })
    .select()
    .single()

  if (insertError) {
    console.error("Message insert error", insertError)
    return NextResponse.json({ error: insertError.message }, { status: 500 })
  }

  // Update conversation's preview + timestamp
  await supabase
    .from("conversations")
    .update({
      last_message_at: message.created_at,
      last_message_preview: body.length > 100 ? body.slice(0, 100) + "…" : body,
    })
    .eq("id", conversationId)

  return NextResponse.json({ message })
}
