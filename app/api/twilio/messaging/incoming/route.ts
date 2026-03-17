import { type NextRequest } from "next/server"
import { getBusinessByTwilioNumber, validateTwilioSignature, emptyTwiML } from "@/lib/twilio"
import { createServerSupabaseClient } from "@/lib/supabase/server"

// POST /api/twilio/messaging/incoming
// Twilio inbound SMS webhook.
// Finds/creates Contact → Conversation → inserts Message → updates preview.

export async function POST(req: NextRequest) {
  const formText = await req.text()
  const params: Record<string, string> = Object.fromEntries(
    new URLSearchParams(formText),
  )

  const { MessageSid, From, To, Body } = params

  if (process.env.VERCEL_ENV === "production") {
    if (!validateTwilioSignature(req, params)) {
      return new Response("Forbidden", { status: 403 })
    }
  }

  // Look up the business that owns the destination Twilio number
  const result = await getBusinessByTwilioNumber(To)
  if (!result) return emptyTwiML()

  const { business } = result
  const supabase      = createServerSupabaseClient()
  const now           = new Date().toISOString()
  const preview       = Body.length > 100 ? `${Body.slice(0, 100)}…` : Body

  // ── 1. Find or create Contact for the sender ──────────────────────────────
  const { data: existingContact } = await supabase
    .from("contacts")
    .select("id")
    .eq("business_id", business.id)
    .eq("phone", From)
    .maybeSingle()

  let contactId = existingContact?.id

  if (!contactId) {
    const { data: created } = await supabase
      .from("contacts")
      .insert({ business_id: business.id, phone: From })
      .select("id")
      .single()
    contactId = created?.id
  }

  if (!contactId) return emptyTwiML()

  // ── 2. Find open Conversation or create one ───────────────────────────────
  const { data: existingConv } = await supabase
    .from("conversations")
    .select("id")
    .eq("business_id", business.id)
    .eq("contact_id", contactId)
    .eq("status", "open")
    .maybeSingle()

  let conversationId = existingConv?.id

  if (!conversationId) {
    const { data: created } = await supabase
      .from("conversations")
      .insert({
        business_id:          business.id,
        contact_id:           contactId,
        status:               "open",
        last_message_at:      now,
        last_message_preview: preview,
        unread_count:         1,
      })
      .select("id")
      .single()
    conversationId = created?.id
  }

  if (!conversationId) return emptyTwiML()

  // ── 3. Insert inbound Message ─────────────────────────────────────────────
  await supabase.from("messages").insert({
    conversation_id:    conversationId,
    direction:          "inbound",
    body:               Body,
    sender_name:        null,
    twilio_message_sid: MessageSid,
    sent_by:            null,
  })

  // ── 4. Update conversation timestamp + preview (only if it already existed) ─
  if (existingConv) {
    await supabase
      .from("conversations")
      .update({ last_message_at: now, last_message_preview: preview })
      .eq("id", conversationId)
  }

  return emptyTwiML()
}
