import { NextResponse } from "next/server"
import { requireAdmin } from "@/lib/admin-auth"
import { twilioClient } from "@/lib/twilio"

/** POST /api/admin/provision/search — { areaCode } → available US local numbers. */
export async function POST(req: Request) {
  const gate = await requireAdmin()
  if (!gate.ok) {
    return NextResponse.json(
      { error: gate.status === 401 ? "Unauthorized" : "Forbidden" },
      { status: gate.status },
    )
  }

  let body: { areaCode?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 })
  }

  const areaCode = String(body.areaCode ?? "").trim()
  if (!/^\d{3}$/.test(areaCode)) {
    return NextResponse.json(
      { error: "areaCode must be 3 digits" },
      { status: 400 },
    )
  }

  try {
    const numbers = await twilioClient
      .availablePhoneNumbers("US")
      .local.list({ areaCode: Number(areaCode), limit: 10 })

    return NextResponse.json(
      numbers.map((n) => ({
        phoneNumber: n.phoneNumber,
        locality: n.locality,
        region: n.region,
      })),
    )
  } catch (err) {
    const message = err instanceof Error ? err.message : "Twilio search failed"
    return NextResponse.json({ error: message }, { status: 502 })
  }
}
