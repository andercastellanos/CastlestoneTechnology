import { NextResponse } from "next/server"

type CareersPayload = {
  name?: string
  email?: string
  country?: string
  role?: string
  linkedin?: string
  message?: string
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as CareersPayload

    const name = payload.name?.trim() ?? ""
    const email = payload.email?.trim() ?? ""
    const country = payload.country?.trim() ?? ""
    const role = payload.role?.trim() ?? ""
    const linkedin = payload.linkedin?.trim() ?? ""
    const message = payload.message?.trim() ?? ""

    if (!name || !email || !country || !role || !message) {
      return NextResponse.json(
        {
          success: false,
          error: "Name, email, country, role, and message are required.",
        },
        { status: 400 },
      )
    }

    console.log("New careers application", {
      name,
      email,
      country,
      role,
      linkedin: linkedin || "(not provided)",
      message,
      submittedAt: new Date().toISOString(),
    })

    return NextResponse.json({
      success: true,
      message: "Application received! We'll review it and get back to you within 3–5 business days.",
    })
  } catch (error) {
    console.error("Careers API error", error)
    return NextResponse.json(
      {
        success: false,
        error: "Unable to process your application right now. Please try again.",
      },
      { status: 500 },
    )
  }
}
