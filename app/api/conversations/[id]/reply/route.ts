import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import { twilioClient, getUserByClerkId, buildOutboundAddressing } from "@/lib/twilio"
import type { SendReplyPayload } from "@/lib/types"

// POST /api/conversations/[id]/reply
// Sends an outbound message via Twilio (SMS or WhatsApp, per the conversation's
// channel) and records it as a Message row.

export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  // ── Auth ────────────────────────────────────────────────────────────────────
  const { userId } = await auth()
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id: conversationId } = await context.params

  // ── Parse body ──────────────────────────────────────────────────────────────
  const payload = (await request.json()) as SendReplyPayload
  const body    = payload.body?.trim()
  if (!body) {
    return NextResponse.json({ error: "Message body is required" }, { status: 400 })
  }

  const supabase = createServerSupabaseClient()

  // ── Load sender profile ─────────────────────────────────────────────────────
  const user = await getUserByClerkId(userId)
  if (!user) {
    return NextResponse.json({ error: "User profile not found" }, { status: 403 })
  }

  // ── Verify conversation belongs to this business ────────────────────────────
  const { data: conversation } = await supabase
    .from("conversations")
    .select("id, contact_id, business_id, channel")
    .eq("id", conversationId)
    .eq("business_id", user.business_id)
    .single()

  if (!conversation) {
    return NextResponse.json({ error: "Conversation not found" }, { status: 404 })
  }

  // ── Load contact (need their phone) ────────────────────────────────────────
  const { data: contact } = await supabase
    .from("contacts")
    .select("phone")
    .eq("id", conversation.contact_id)
    .single()

  if (!contact?.phone) {
    return NextResponse.json(
      { error: "Contact has no phone number on file" },
      { status: 422 },
    )
  }

  // ── Load business (need the channel's sender number) ───────────────────────
  const { data: business } = await supabase
    .from("businesses")
    .select("twilio_number, whatsapp_number")
    .eq("id", user.business_id)
    .single()

  const { from, to } = buildOutboundAddressing({
    channel:      conversation.channel,
    business:     business ?? { twilio_number: null, whatsapp_number: null },
    contactPhone: contact.phone,
  })

  // For SMS the sender is the business twilio_number; for WhatsApp it falls back
  // to the shared sandbox sender — so only SMS can be "unconfigured" here.
  if (conversation.channel === "sms" && !business?.twilio_number) {
    return NextResponse.json(
      { error: "Business has no Twilio number configured" },
      { status: 422 },
    )
  }

  // ── Send via Twilio (send-before-insert preserved) ─────────────────────────
  let twilioMessageSid: string | null = null
  try {
    const sent = await twilioClient.messages.create({ body, from, to })
    twilioMessageSid = sent.sid
  } catch (err) {
    // Surface the Twilio error code so failures are diagnosable in testing.
    const e = err as { code?: number; message?: string }
    const hint =
      e.code === 63016
        ? " — WhatsApp free-form message outside the 24h customer-service window"
        : ""
    console.error(
      `Twilio send failed [channel=${conversation.channel}, code=${e.code ?? "?"}]: ${e.message ?? err}${hint}`,
    )
    // Do NOT insert a phantom 'sent' message — bail before the DB write.
    return NextResponse.json(
      { error: `Failed to send message${hint}` },
      { status: 502 },
    )
  }

  // ── Insert outbound Message row ─────────────────────────────────────────────
  const { data: message, error: insertError } = await supabase
    .from("messages")
    .insert({
      conversation_id:    conversationId,
      direction:          "outbound",
      body,
      sender_name:        user.name,
      twilio_message_sid: twilioMessageSid,
      sent_by:            user.id,
    })
    .select()
    .single()

  if (insertError) {
    console.error("Message insert error", insertError)
    return NextResponse.json({ error: insertError.message }, { status: 500 })
  }

  // ── Update conversation preview + timestamp ─────────────────────────────────
  const preview = body.length > 100 ? `${body.slice(0, 100)}…` : body
  await supabase
    .from("conversations")
    .update({
      last_message_at:      message.created_at,
      last_message_preview: preview,
    })
    .eq("id", conversationId)

  return NextResponse.json({ success: true, message_id: message.id })
}
