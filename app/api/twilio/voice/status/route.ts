import { type NextRequest } from "next/server"
import { validateTwilioSignature } from "@/lib/twilio"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import type { CallStatus } from "@/lib/types"

// Twilio CallStatus → our CallStatus
const STATUS_MAP: Record<string, CallStatus> = {
  completed:   "answered",
  "no-answer": "missed",
  busy:        "missed",
  failed:      "missed",
  canceled:    "missed",
}

// POST /api/twilio/voice/status
// Twilio status callback after a call leg ends.
// Updates the call row, links the caller as a Contact, and records who answered.

export async function POST(req: NextRequest) {
  const formText = await req.text()
  const params: Record<string, string> = Object.fromEntries(
    new URLSearchParams(formText),
  )

  const {
    CallSid,
    CallStatus:   twilioStatus,
    CallDuration,
    RecordingUrl,
    AnsweredBy,
  } = params

  if (process.env.VERCEL_ENV === "production") {
    if (!validateTwilioSignature(req, params)) {
      return new Response("Forbidden", { status: 403 })
    }
  }

  const supabase     = createServerSupabaseClient()
  const mappedStatus = STATUS_MAP[twilioStatus] ?? "missed"

  // Look up call by Twilio SID — we need id, business_id, from_number
  const { data: call } = await supabase
    .from("calls")
    .select("id, business_id, from_number")
    .eq("twilio_call_sid", CallSid)
    .maybeSingle()

  if (!call) return new Response("OK", { status: 200 })

  const update: Record<string, unknown> = {
    status:       mappedStatus,
    duration:     parseInt(CallDuration, 10) || null,
    recording_url: RecordingUrl || null,
  }

  // If answered, find the user who picked up by matching their phone number
  if (mappedStatus === "answered" && AnsweredBy) {
    const { data: user } = await supabase
      .from("users")
      .select("id")
      .eq("business_id", call.business_id)
      .eq("phone", AnsweredBy)
      .maybeSingle()

    if (user) update.answered_by = user.id
  }

  // Find or create a Contact for the caller, then link to the call
  const fromNumber = call.from_number as string | null
  if (fromNumber) {
    const { data: existing } = await supabase
      .from("contacts")
      .select("id")
      .eq("business_id", call.business_id)
      .eq("phone", fromNumber)
      .maybeSingle()

    let contactId = existing?.id

    if (!contactId) {
      const { data: created } = await supabase
        .from("contacts")
        .insert({ business_id: call.business_id, phone: fromNumber })
        .select("id")
        .single()
      contactId = created?.id
    }

    if (contactId) update.contact_id = contactId
  }

  await supabase.from("calls").update(update).eq("id", call.id)

  return new Response("OK", { status: 200 })
}
