import { type NextRequest } from "next/server"
import VoiceResponse from "twilio/lib/twiml/VoiceResponse"
import { twilioClient, validateTwilioSignature } from "@/lib/twilio"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import type { CallStatus } from "@/lib/types"

type Supabase = ReturnType<typeof createServerSupabaseClient>

function twimlResponse(twiml: VoiceResponse): Response {
  return new Response(twiml.toString(), {
    status:  200,
    headers: { "Content-Type": "text/xml; charset=utf-8" },
  })
}

// Statuses we treat as terminal — once a call reaches one, a re-fired callback
// must be a no-op (idempotency, gotcha #2).
const TERMINAL: CallStatus[] = ["answered", "missed", "voicemail"]

/** Find-or-create the caller as a contact; returns the contact id (or null). */
async function findOrCreateContact(
  supabase: Supabase,
  businessId: string,
  fromNumber: string | null,
): Promise<string | null> {
  if (!fromNumber) return null

  const { data: existing, error: selErr } = await supabase
    .from("contacts")
    .select("id")
    .eq("business_id", businessId)
    .eq("phone", fromNumber)
    .maybeSingle()
  if (selErr) console.error("fallback: contact lookup failed:", selErr)
  if (existing) return existing.id as string

  const { data: created, error: insErr } = await supabase
    .from("contacts")
    .insert({ business_id: businessId, phone: fromNumber })
    .select("id")
    .single()
  if (insErr) {
    console.error("fallback: contact insert failed:", insErr)
    return null
  }
  return (created?.id as string) ?? null
}

/**
 * For simultaneous dials, the answering user isn't known from the action
 * params. Look up the connected child leg by DialCallSid via the Twilio API,
 * read the number it reached, and match it to a user.
 */
async function resolveAnsweredByFromLeg(
  supabase: Supabase,
  businessId: string,
  dialCallSid: string | undefined,
): Promise<string | null> {
  if (!dialCallSid) return null
  try {
    const leg = await twilioClient.calls(dialCallSid).fetch()
    const dialedNumber = leg.to
    if (!dialedNumber) return null
    const { data: user } = await supabase
      .from("users")
      .select("id")
      .eq("business_id", businessId)
      .eq("phone", dialedNumber)
      .maybeSingle()
    return (user?.id as string) ?? null
  } catch (err) {
    console.error("fallback: DialCallSid lookup failed:", err)
    return null
  }
}

// ─── POST /api/twilio/voice/incoming's <Dial action> handler ─────────────────
// This is the callback Twilio ACTUALLY fires when a <Dial> ends. It owns:
//   • finalizing answered calls (status/duration/answered_by/contact)
//   • advancing the routing chain (assistant_first VA → owner)
//   • driving every unanswered path to a terminal status (voicemail | missed)
// so a call can never remain stuck at "in_progress".
//
// Query params carry stage context set by the dial that pointed here:
//   stage=va      → assistant_first stage 1; on failure, escalate to owner
//   stage=final   → last stage; on failure, voicemail/missed
//   dialed=<uid>  → the user dialed at THIS (sequential) stage → answered_by
//   multi=1       → simultaneous dial; resolve answered_by via DialCallSid

export async function POST(req: NextRequest) {
  const formText = await req.text()
  const params: Record<string, string> = Object.fromEntries(
    new URLSearchParams(formText),
  )

  const { CallSid, DialCallStatus, DialCallDuration, DialCallSid } = params

  // Signature validation — preserved exactly as before (prod only).
  if (process.env.VERCEL_ENV === "production") {
    if (!validateTwilioSignature(req, params)) {
      return new Response("Forbidden", { status: 403 })
    }
  }

  const url     = new URL(req.url)
  const stage   = url.searchParams.get("stage")    // "va" | "final" | null
  const dialed  = url.searchParams.get("dialed")   // user id (sequential) | null
  const isMulti = url.searchParams.get("multi") === "1"

  const twiml    = new VoiceResponse()
  const supabase = createServerSupabaseClient()
  const siteUrl  = process.env.NEXT_PUBLIC_SITE_URL!.replace(/\/$/, "")

  // The call row already exists (created in /voice/incoming) — finalize, never insert.
  const { data: call, error: callErr } = await supabase
    .from("calls")
    .select("id, business_id, from_number, status")
    .eq("twilio_call_sid", CallSid)
    .maybeSingle()
  if (callErr) console.error("fallback: call lookup failed:", callErr)

  // Idempotency: already terminal → no-op (don't clobber, don't re-prompt).
  if (call && TERMINAL.includes(call.status as CallStatus)) {
    return twimlResponse(twiml)
  }

  // ── 1. ANSWERED ─────────────────────────────────────────────────────────
  if (DialCallStatus === "completed") {
    if (call) {
      const update: Record<string, unknown> = {
        status:   "answered",
        duration: parseInt(DialCallDuration ?? "", 10) || null,
      }

      const answeredBy = isMulti
        ? await resolveAnsweredByFromLeg(supabase, call.business_id, DialCallSid)
        : dialed
      if (answeredBy) update.answered_by = answeredBy

      const contactId = await findOrCreateContact(
        supabase,
        call.business_id,
        call.from_number as string | null,
      )
      if (contactId) update.contact_id = contactId

      const { error: upErr } = await supabase
        .from("calls")
        .update(update)
        .eq("id", call.id)
      if (upErr) console.error("fallback: answered finalize failed:", upErr)
    }
    return twimlResponse(twiml) // empty → call is over
  }

  // ── 2. NOT CONNECTED — advance the chain if there's a next stage ─────────
  // assistant_first: VA leg failed → escalate to the configured escalation number.
  // OPT-IN: escalation only fires if routing_rules.escalation_phone is set. With no
  // number configured, a VA miss goes straight to voicemail and no one else rings.
  // (forward_number is NOT read here — it's the after-hours forward target only.)
  if (stage === "va" && call) {
    const { data: rules } = await supabase
      .from("routing_rules")
      .select("ring_timeout, escalation_phone")
      .eq("business_id", call.business_id)
      .maybeSingle()

    const escalationNumber = rules?.escalation_phone?.trim()
    if (escalationNumber) {
      const dial = twiml.dial({
        timeout: rules?.ring_timeout ?? 30,
        action:  `${siteUrl}/api/twilio/voice/fallback?stage=final`,
      })
      dial.number({}, escalationNumber)
      return twimlResponse(twiml) // not terminal yet — escalation stage pending
    }
    // No escalation number configured → fall through to voicemail/missed.
  }

  // ── 3. CHAIN EXHAUSTED — terminate (voicemail or missed) ─────────────────
  // Mark "missed" + link the contact FIRST, so even if the caller hangs up
  // without leaving a message the call never stays "in_progress". If voicemail
  // is enabled, /voice/voicemail upgrades status to "voicemail" on recording.
  if (call) {
    const contactId = await findOrCreateContact(
      supabase,
      call.business_id,
      call.from_number as string | null,
    )
    const update: Record<string, unknown> = { status: "missed" }
    if (contactId) update.contact_id = contactId

    const { error: upErr } = await supabase
      .from("calls")
      .update(update)
      .eq("id", call.id)
    if (upErr) console.error("fallback: missed finalize failed:", upErr)

    const { data: biz } = await supabase
      .from("businesses")
      .select("voicemail_enabled")
      .eq("id", call.business_id)
      .maybeSingle()

    if (biz?.voicemail_enabled) {
      twiml.say("Please leave a message after the tone.")
      twiml.record({ maxLength: 120, action: `${siteUrl}/api/twilio/voicemail` })
    } else {
      twiml.hangup()
    }
    return twimlResponse(twiml)
  }

  // No DB row at all — best-effort voicemail prompt.
  twiml.say("Please leave a message after the tone.")
  twiml.record({ maxLength: 120, action: `${siteUrl}/api/twilio/voicemail` })
  return twimlResponse(twiml)
}
