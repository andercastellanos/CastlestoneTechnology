import { type NextRequest } from "next/server"
import VoiceResponse from "twilio/lib/twiml/VoiceResponse"
import { validateTwilioSignature } from "@/lib/twilio"
import { createServerSupabaseClient } from "@/lib/supabase/server"

function twimlResponse(twiml: VoiceResponse): Response {
  return new Response(twiml.toString(), {
    status:  200,
    headers: { "Content-Type": "text/xml; charset=utf-8" },
  })
}

// POST /api/twilio/voice/fallback
// Called by Twilio when a <Dial> times out, is rejected, or fails.
// Escalates to owner (if mode === 'assistant_first') or drops to voicemail.

export async function POST(req: NextRequest) {
  const formText = await req.text()
  const params: Record<string, string> = Object.fromEntries(
    new URLSearchParams(formText),
  )

  const { CallSid, DialCallStatus } = params

  if (process.env.VERCEL_ENV === "production") {
    if (!validateTwilioSignature(req, params)) {
      return new Response("Forbidden", { status: 403 })
    }
  }

  const twiml    = new VoiceResponse()
  const supabase  = createServerSupabaseClient()
  const siteUrl   = process.env.NEXT_PUBLIC_SITE_URL!.replace(/\/$/, "")

  // If the dial completed normally, the call ended — return empty response
  if (DialCallStatus === "completed") {
    return twimlResponse(twiml)
  }

  // Look up the call to get business context
  const { data: call } = await supabase
    .from("calls")
    .select("id, business_id")
    .eq("twilio_call_sid", CallSid)
    .maybeSingle()

  if (!call) {
    // No DB record — safe fallback to voicemail
    twiml.say("Please leave a message after the tone.")
    twiml.record({ maxLength: 120, action: `${siteUrl}/api/twilio/voicemail` })
    return twimlResponse(twiml)
  }

  // Load routing rules to decide escalation behaviour
  const { data: rules } = await supabase
    .from("routing_rules")
    .select("mode, ring_timeout")
    .eq("business_id", call.business_id)
    .maybeSingle()

  if (rules?.mode === "assistant_first") {
    // Escalate: try the business owner before going to voicemail
    const { data: owner } = await supabase
      .from("users")
      .select("phone")
      .eq("business_id", call.business_id)
      .eq("role", "owner")
      .not("phone", "is", null)
      .maybeSingle()

    if (owner?.phone) {
      const dial = twiml.dial({
        timeout: rules.ring_timeout ?? 30,
        action:  `${siteUrl}/api/twilio/voice/status`,
      })
      dial.number({}, owner.phone as string)
    } else {
      // Owner has no phone configured — fall through to voicemail
      twiml.say("Please leave a message after the tone.")
      twiml.record({ maxLength: 120, action: `${siteUrl}/api/twilio/voicemail` })
    }
  } else {
    // simultaneous / owner_only already failed — go straight to voicemail
    twiml.say("Please leave a message after the tone.")
    twiml.record({ maxLength: 120, action: `${siteUrl}/api/twilio/voicemail` })
  }

  return twimlResponse(twiml)
}
