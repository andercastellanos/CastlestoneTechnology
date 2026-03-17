import { type NextRequest } from "next/server"
import VoiceResponse from "twilio/lib/twiml/VoiceResponse"
import { getBusinessByTwilioNumber, validateTwilioSignature } from "@/lib/twilio"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import type { BusinessHours } from "@/lib/types"

// ─── Helpers ──────────────────────────────────────────────────────────────────

function twimlResponse(twiml: VoiceResponse): Response {
  return new Response(twiml.toString(), {
    status:  200,
    headers: { "Content-Type": "text/xml; charset=utf-8" },
  })
}

function isWithinBusinessHours(
  businessHours: BusinessHours[],
  timezone: string,
): boolean {
  if (!businessHours?.length) return false

  // Evaluate "now" in the business's local timezone without external packages.
  // toLocaleString returns a string that `new Date()` parses as local time,
  // so getDay / getHours / getMinutes correctly reflect the remote timezone.
  const localStr    = new Date().toLocaleString("en-US", { timeZone: timezone })
  const local       = new Date(localStr)
  const currentDay  = local.getDay()                            // 0 = Sun … 6 = Sat
  const currentMins = local.getHours() * 60 + local.getMinutes()

  const schedule = businessHours.find((h) => h.day === currentDay)
  if (!schedule?.open) return false

  const [startH, startM] = schedule.start.split(":").map(Number)
  const [endH,   endM]   = schedule.end.split(":").map(Number)

  return (
    currentMins >= startH * 60 + startM &&
    currentMins <  endH   * 60 + endM
  )
}

// ─── POST /api/twilio/voice/incoming ─────────────────────────────────────────
// Twilio webhook — no Clerk auth. Secured via X-Twilio-Signature validation.

export async function POST(req: NextRequest) {
  // 1 — Parse application/x-www-form-urlencoded body
  const formText = await req.text()
  const params: Record<string, string> = Object.fromEntries(
    new URLSearchParams(formText),
  )

  const { CallSid, From, To, CallStatus } = params

  // 2 — Validate Twilio signature (bypassed in development for easier testing)
  if (process.env.NODE_ENV === "production") {
    if (!validateTwilioSignature(req, params)) {
      return new Response("Forbidden", { status: 403 })
    }
  }

  const twiml    = new VoiceResponse()
  const supabase = createServerSupabaseClient()
  const siteUrl  = process.env.NEXT_PUBLIC_SITE_URL!.replace(/\/$/, "")

  // 3 — Look up the business that owns this Twilio number
  const result = await getBusinessByTwilioNumber(To)

  if (!result) {
    twiml.reject()
    return twimlResponse(twiml)
  }

  const { business, rules } = result

  // 4 — Record the inbound call immediately (status updated via status callback)
  await supabase.from("calls").insert({
    business_id:     business.id,
    twilio_call_sid: CallSid,
    from_number:     From,
    direction:       "inbound",
    status:          CallStatus ?? "in_progress",
    contact_id:      null,
  })

  // 5 — Branch on business hours
  const inHours = isWithinBusinessHours(business.business_hours, business.timezone)

  if (inHours) {
    // ── IN HOURS ────────────────────────────────────────────────────────────

    if (rules.mode === "assistant_first") {
      // Ring the first online VA / assistant
      const { data: va } = await supabase
        .from("users")
        .select("phone")
        .eq("business_id", business.id)
        .in("role", ["va", "assistant"])
        .eq("status", "online")
        .not("phone", "is", null)
        .limit(1)
        .single()

      const dial = twiml.dial({
        timeout: rules.ring_timeout,
        action:  `${siteUrl}/api/twilio/voice/fallback`,
      })
      if (va?.phone) dial.number({}, va.phone as string)

    } else if (rules.mode === "simultaneous") {
      // Ring all online VAs, assistants, and the owner at the same time
      const { data: agents } = await supabase
        .from("users")
        .select("phone")
        .eq("business_id", business.id)
        .in("role", ["owner", "va", "assistant"])
        .not("phone", "is", null)

      const dial = twiml.dial({
        timeout: rules.ring_timeout,
        action:  `${siteUrl}/api/twilio/voice/fallback`,
      })
      agents?.forEach((u) => {
        if (u.phone) dial.number({}, u.phone as string)
      })

    } else if (rules.mode === "owner_only") {
      // Ring only the business owner
      const { data: owner } = await supabase
        .from("users")
        .select("phone")
        .eq("business_id", business.id)
        .eq("role", "owner")
        .not("phone", "is", null)
        .single()

      const dial = twiml.dial({
        timeout: rules.ring_timeout,
        action:  `${siteUrl}/api/twilio/voice/fallback`,
      })
      if (owner?.phone) dial.number({}, owner.phone as string)
    }

  } else {
    // ── AFTER HOURS ─────────────────────────────────────────────────────────

    if (rules.after_hours_mode === "voicemail") {
      twiml.record({
        maxLength: 120,
        action:    `${siteUrl}/api/twilio/voicemail`,
      })

    } else if (rules.after_hours_mode === "forward") {
      if (rules.forward_number) {
        const dial = twiml.dial()
        dial.number({}, rules.forward_number)
      } else {
        // forward_number not set — fall back to closed message
        twiml.say(
          "We are currently closed. A team member will reach out shortly.",
        )
      }

    } else {
      // 'message' — play a polite closed greeting
      twiml.say(
        "We are currently closed. A team member will reach out shortly.",
      )
    }
  }

  return twimlResponse(twiml)
}
