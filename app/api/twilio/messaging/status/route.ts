import { type NextRequest } from "next/server"
import { validateTwilioSignature } from "@/lib/twilio"

// POST /api/twilio/messaging/status
// Twilio delivery-status callback for outbound SMS.
// Message status (queued → sent → delivered / failed) is not persisted yet —
// that is a future enhancement once a message_status column is added.

export async function POST(req: NextRequest) {
  const formText = await req.text()
  const params: Record<string, string> = Object.fromEntries(
    new URLSearchParams(formText),
  )

  if (process.env.VERCEL_ENV === "production") {
    if (!validateTwilioSignature(req, params)) {
      return new Response("Forbidden", { status: 403 })
    }
  }

  return new Response("OK", { status: 200 })
}
