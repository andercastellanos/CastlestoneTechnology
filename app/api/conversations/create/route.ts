import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import { twilioClient, getUserByClerkId, buildOutboundAddressing } from "@/lib/twilio"
import type { MessagingChannel } from "@/lib/types"

// POST /api/conversations/create
// Start a NEW outbound conversation with a first message on a chosen channel.

const CHANNELS: MessagingChannel[] = ["sms", "whatsapp"]

// Best-effort E.164 normalization. Keeps a leading +; otherwise assumes a US
// number for 10 digits / 11 digits starting with 1. Returns null if it can't.
function toE164(raw: string): string | null {
  const trimmed = raw.trim()
  const digits = trimmed.replace(/\D/g, "")
  if (trimmed.startsWith("+")) {
    return /^\+[1-9]\d{7,14}$/.test(`+${digits}`) ? `+${digits}` : null
  }
  if (digits.length === 10) return `+1${digits}`
  if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`
  return null
}

export async function POST(request: Request) {
  // ── Auth ────────────────────────────────────────────────────────────────────
  const { userId } = await auth()
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  const user = await getUserByClerkId(userId)
  if (!user) {
    return NextResponse.json({ error: "User profile not found" }, { status: 403 })
  }

  // ── Validate body ─────────────────────────────────────────────────────────
  let body: { phone?: unknown; message?: unknown; channel?: unknown } | null
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 })
  }
  const phone = typeof body?.phone === "string" ? toE164(body.phone) : null
  const message = typeof body?.message === "string" ? body.message.trim() : ""
  const channel = body?.channel as MessagingChannel | undefined

  if (!phone) {
    return NextResponse.json(
      { error: "A valid phone number is required" },
      { status: 400 },
    )
  }
  if (!message) {
    return NextResponse.json({ error: "Message is required" }, { status: 400 })
  }
  if (!channel || !CHANNELS.includes(channel)) {
    return NextResponse.json(
      { error: "channel must be 'sms' or 'whatsapp'" },
      { status: 400 },
    )
  }

  const supabase = createServerSupabaseClient()

  // ── Load business (sender numbers) ─────────────────────────────────────────
  const { data: business } = await supabase
    .from("businesses")
    .select("id, twilio_number, whatsapp_number")
    .eq("id", user.business_id)
    .single()
  if (!business) {
    return NextResponse.json({ error: "Business not found" }, { status: 404 })
  }
  if (channel === "sms" && !business.twilio_number) {
    return NextResponse.json(
      { error: "Business has no Twilio number configured" },
      { status: 422 },
    )
  }
  if (
    channel === "whatsapp" &&
    !business.whatsapp_number &&
    !process.env.TWILIO_WHATSAPP_SANDBOX_NUMBER
  ) {
    return NextResponse.json(
      { error: "Business has no WhatsApp number configured" },
      { status: 422 },
    )
  }

  // ── Find or create the Contact by (business_id, phone) ─────────────────────
  let contactId: string | undefined
  const { data: existingContact } = await supabase
    .from("contacts")
    .select("id")
    .eq("business_id", user.business_id)
    .eq("phone", phone)
    .maybeSingle()
  contactId = existingContact?.id
  if (!contactId) {
    const { data: created, error: cErr } = await supabase
      .from("contacts")
      .insert({ business_id: user.business_id, phone })
      .select("id")
      .single()
    if (cErr || !created) {
      console.error("conversations/create: contact create failed", cErr)
      return NextResponse.json(
        { error: cErr?.message ?? "Failed to create contact" },
        { status: 500 },
      )
    }
    contactId = created.id
  }

  // ── Dedup: an open thread for (business, contact, channel) already? ────────
  const { data: existingConv } = await supabase
    .from("conversations")
    .select("id")
    .eq("business_id", user.business_id)
    .eq("contact_id", contactId)
    .eq("channel", channel)
    .eq("status", "open")
    .maybeSingle()
  if (existingConv) {
    return NextResponse.json(
      {
        error: "An open conversation already exists for this contact and channel",
        id: existingConv.id,
      },
      { status: 409 },
    )
  }

  // ── Create the new open conversation (outbound-initiated → unread_count 0) ──
  const now     = new Date().toISOString()
  const preview = message.length > 100 ? `${message.slice(0, 100)}…` : message
  const { data: conversation, error: convErr } = await supabase
    .from("conversations")
    .insert({
      business_id:          user.business_id,
      contact_id:           contactId,
      channel,
      status:               "open",
      unread_count:         0,
      last_message_at:      now,
      // A failed first send must not look like a sent message in the inbox.
      last_message_preview: null,
    })
    .select("id")
    .single()
  if (convErr || !conversation) {
    console.error("conversations/create: conversation insert failed", convErr)
    return NextResponse.json(
      { error: convErr?.message ?? "Failed to create conversation" },
      { status: 500 },
    )
  }

  // ── Send the first message (leave the conversation in place on failure) ────
  const { from, to } = buildOutboundAddressing({
    channel,
    business,
    contactPhone: phone,
  })
  let twilioMessageSid: string | null = null
  try {
    const sent = await twilioClient.messages.create({ body: message, from, to })
    twilioMessageSid = sent.sid
  } catch (err) {
    const e = err as { code?: number; message?: string }
    const hint =
      e.code === 63016
        ? " — WhatsApp free-form message outside the 24h customer-service window"
        : ""
    console.error(
      `conversations/create: Twilio send failed [channel=${channel}, code=${e.code ?? "?"}]: ${e.message ?? err}${hint}`,
    )
    // Keep the conversation open so the user can retry or abandon it.
    return NextResponse.json(
      {
        error: `Failed to send message${hint}`,
        id: conversation.id,
        message_sent: false,
      },
      { status: 502 },
    )
  }

  // ── Record the outbound first message ──────────────────────────────────────
  const { error: msgErr } = await supabase.from("messages").insert({
    conversation_id:    conversation.id,
    direction:          "outbound",
    body:               message,
    sender_name:        user.name,
    twilio_message_sid: twilioMessageSid,
    sent_by:            user.id,
  })
  if (msgErr) {
    console.error("conversations/create: message insert failed", msgErr)
    return NextResponse.json(
      {
        error: "Your message was submitted for sending, but could not be saved to the conversation history. Do not resend it.",
        id: conversation.id,
        message_sent: true,
        message_saved: false,
      },
      { status: 502 },
    )
  }

  const { error: previewErr } = await supabase
    .from("conversations")
    .update({ last_message_at: now, last_message_preview: preview })
    .eq("id", conversation.id)
    // Don't overwrite a newer inbound message that arrived during the send.
    .eq("last_message_at", now)
  if (previewErr) {
    console.error("conversations/create: preview update failed", previewErr)
  }

  return NextResponse.json(
    { id: conversation.id, channel, phone, message_sent: true, message_saved: true },
    { status: 200 },
  )
}
