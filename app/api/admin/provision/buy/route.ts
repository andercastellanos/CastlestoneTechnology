import { NextResponse } from "next/server"
import { requireAdmin } from "@/lib/admin-auth"
import { twilioClient } from "@/lib/twilio"
import { createAdminSupabaseClient } from "@/lib/supabase/server"

/**
 * POST /api/admin/provision/buy — { phoneNumber, businessId }
 * Buys the number from Twilio (wiring its voice + SMS webhooks), then stores it
 * on the business. If Twilio fails, the DB is left untouched.
 */
export async function POST(req: Request) {
  const gate = await requireAdmin()
  if (!gate.ok) {
    return NextResponse.json(
      { error: gate.status === 401 ? "Unauthorized" : "Forbidden" },
      { status: gate.status },
    )
  }

  let body: { phoneNumber?: string; businessId?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 })
  }

  const phoneNumber = String(body.phoneNumber ?? "").trim()
  const businessId = String(body.businessId ?? "").trim()
  if (!phoneNumber || !businessId) {
    return NextResponse.json(
      { error: "Missing phoneNumber or businessId" },
      { status: 400 },
    )
  }

  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "").replace(/\/$/, "")

  // 1) Buy + configure the number on Twilio. On any error, do NOT touch the DB.
  try {
    await twilioClient.incomingPhoneNumbers.create({
      phoneNumber,
      voiceUrl: `${siteUrl}/api/twilio/voice/incoming`,
      smsUrl: `${siteUrl}/api/twilio/messaging/incoming`,
    })
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Twilio provisioning failed"
    return NextResponse.json({ error: message }, { status: 500 })
  }

  // 2) Persist on the business.
  const supabase = createAdminSupabaseClient()
  const { error } = await supabase
    .from("businesses")
    .update({ twilio_number: phoneNumber })
    .eq("id", businessId)

  if (error) {
    return NextResponse.json(
      {
        error: `Number ${phoneNumber} was provisioned on Twilio, but saving it to the business failed: ${error.message}`,
      },
      { status: 500 },
    )
  }

  return NextResponse.json({ success: true, phoneNumber })
}
