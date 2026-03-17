import { type NextRequest } from "next/server"
import { validateTwilioSignature, emptyTwiML } from "@/lib/twilio"
import { createServerSupabaseClient } from "@/lib/supabase/server"

// POST /api/twilio/voicemail
// Called by Twilio after a <Record> verb completes (voicemail left).
// Stores the recording URL on the call row and returns empty TwiML.

export async function POST(req: NextRequest) {
  const formText = await req.text()
  const params: Record<string, string> = Object.fromEntries(
    new URLSearchParams(formText),
  )

  const { CallSid, RecordingUrl } = params

  if (process.env.VERCEL_ENV === "production") {
    if (!validateTwilioSignature(req, params)) {
      return new Response("Forbidden", { status: 403 })
    }
  }

  if (CallSid && RecordingUrl) {
    const supabase = createServerSupabaseClient()
    await supabase
      .from("calls")
      .update({ status: "voicemail", voicemail_url: RecordingUrl })
      .eq("twilio_call_sid", CallSid)
  }

  return emptyTwiML()
}
