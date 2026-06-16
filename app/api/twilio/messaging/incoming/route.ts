import { type NextRequest } from "next/server"
import {
  getBusinessByTwilioNumber,
  getBusinessByWhatsAppNumber,
  validateTwilioSignature,
  emptyTwiML,
} from "@/lib/twilio"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import type { Business, MessagingChannel } from "@/lib/types"

// POST /api/twilio/messaging/incoming
// Twilio inbound SMS + WhatsApp webhook.
// Finds/creates Contact → Conversation (per channel) → inserts Message → bumps activity.

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

  // Twilio prefixes WhatsApp endpoints with "whatsapp:"; SMS endpoints are bare.
  const channel: MessagingChannel = From.startsWith("whatsapp:")
    ? "whatsapp"
    : "sms"
  const bareFrom = From.replace(/^whatsapp:/, "")
  const bareTo = To.replace(/^whatsapp:/, "")

  const supabase = createServerSupabaseClient()

  // ── Resolve the owning business by channel ────────────────────────────────
  let business: Business

  if (channel === "sms") {
    // Unchanged: match the destination Twilio number, requires routing rules.
    const result = await getBusinessByTwilioNumber(To)
    if (!result) return emptyTwiML()
    business = result.business
  } else {
    // WhatsApp: match the business's whatsapp_number (no routing rules needed).
    let wa = await getBusinessByWhatsAppNumber(bareTo)

    if (!wa) {
      // Sandbox fallback: non-prod only, and only for the shared sandbox sender.
      const isSandboxTo = bareTo === process.env.TWILIO_WHATSAPP_SANDBOX_NUMBER
      if (process.env.VERCEL_ENV !== "production" && isSandboxTo) {
        const sandboxId = process.env.WHATSAPP_SANDBOX_BUSINESS_ID
        const { data } = sandboxId
          ? await supabase
              .from("businesses")
              .select("*")
              .eq("id", sandboxId)
              .single()
          : { data: null }
        wa = (data as Business | null) ?? null
        if (!wa) {
          console.warn(
            `messaging/incoming: dropped whatsapp inbound — sandbox business not found (WHATSAPP_SANDBOX_BUSINESS_ID=${sandboxId ?? "unset"})`,
          )
          return emptyTwiML()
        }
      } else {
        console.warn(
          `messaging/incoming: dropped whatsapp inbound — no business for whatsapp_number=${bareTo} ` +
            `(env=${process.env.VERCEL_ENV ?? "dev"}, matchesSandbox=${isSandboxTo})`,
        )
        return emptyTwiML()
      }
    }
    business = wa
  }

  const now     = new Date().toISOString()
  const preview = Body.length > 100 ? `${Body.slice(0, 100)}…` : Body

  // ── 1. Find or create Contact for the sender (always the BARE number) ──────
  const { data: existingContact } = await supabase
    .from("contacts")
    .select("id")
    .eq("business_id", business.id)
    .eq("phone", bareFrom)
    .maybeSingle()

  let contactId = existingContact?.id

  if (!contactId) {
    const { data: created } = await supabase
      .from("contacts")
      .insert({ business_id: business.id, phone: bareFrom })
      .select("id")
      .single()
    contactId = created?.id
  }

  if (!contactId) return emptyTwiML()

  // ── 2. Get or create the open Conversation atomically, per channel ────────
  // upsert_open_conversation() is backed by the partial unique index
  // (business_id, contact_id, channel) WHERE status='open'. WhatsApp and SMS
  // for the same contact resolve to SEPARATE open threads.
  const { data: conversationId, error: convErr } = await supabase.rpc(
    "upsert_open_conversation",
    {
      p_business_id: business.id,
      p_contact_id:  contactId,
      p_preview:     preview,
      p_at:          now,
      p_channel:     channel,
    },
  )
  if (convErr || !conversationId) {
    console.error("messaging/incoming: conversation upsert failed:", convErr)
    return emptyTwiML()
  }

  // ── 3. Insert inbound Message ─────────────────────────────────────────────
  const { error: msgErr } = await supabase.from("messages").insert({
    conversation_id:    conversationId,
    direction:          "inbound",
    body:               Body,
    sender_name:        null,
    twilio_message_sid: MessageSid,
    sent_by:            null,
  })
  if (msgErr) console.error("messaging/incoming: message insert failed:", msgErr)

  // Conversation activity (last_message_at / preview / unread_count) is bumped
  // atomically inside upsert_open_conversation() above — no separate update.

  return emptyTwiML()
}
