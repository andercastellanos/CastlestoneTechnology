import { NextResponse } from "next/server"

type ContactPayload = {
  name?: string
  email?: string
  company?: string
  message?: string
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as ContactPayload

    const name = payload.name?.trim() ?? ""
    const email = payload.email?.trim() ?? ""
    const company = payload.company?.trim() ?? ""
    const message = payload.message?.trim() ?? ""

    if (!name || !email || !message) {
      return NextResponse.json(
        {
          success: false,
          error: "Name, email, and message are required.",
        },
        { status: 400 },
      )
    }

    console.log("New contact submission", {
      name,
      email,
      company,
      message,
      submittedAt: new Date().toISOString(),
    })

    return NextResponse.json({
      success: true,
      message: "Thanks for reaching out. We will get back to you shortly.",
    })
  } catch (error) {
    console.error("Contact API error", error)
    return NextResponse.json(
      {
        success: false,
        error: "Unable to process your request right now.",
      },
      { status: 500 },
    )
  }
}
