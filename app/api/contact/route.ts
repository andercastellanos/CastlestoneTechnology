import { NextResponse } from "next/server"
import { z } from "zod"
import { createServerSupabaseClient } from "@/lib/supabase/server"

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required.").max(120, "Name must be 120 characters or fewer."),
  email: z.string().trim().min(1, "Email is required.").max(254, "Email must be 254 characters or fewer.").email("Enter a valid email address."),
  company: z.string().trim().max(200, "Company must be 200 characters or fewer.").optional(),
  message: z.string().trim().min(1, "Message is required.").max(10000, "Message must be 10,000 characters or fewer."),
  source_page: z.string().trim().max(2048).regex(/^\/(?!\/)[^\s?#]*$/, "Invalid source page.").optional(),
  website: z.string().max(0, "Unable to submit this form.").optional(),
})

type ContactSubmission = Omit<z.infer<typeof contactSchema>, "website">

async function notifyContact(submission: ContactSubmission, id: string) {
  const apiKey = process.env.RESEND_API_KEY?.trim()
  const recipient = process.env.CONTACT_NOTIFY_EMAIL?.trim()
  const sender = process.env.CONTACT_FROM_EMAIL?.trim()
  if (!apiKey || !recipient || !sender) return

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      signal: AbortSignal.timeout(5000),
      body: JSON.stringify({
        from: sender,
        to: [recipient],
        reply_to: submission.email,
        subject: "New Castlestone contact submission",
        text: [
          `Submission ID: ${id}`,
          `Name: ${submission.name}`,
          `Email: ${submission.email}`,
          `Company: ${submission.company || "Not provided"}`,
          `Source page: ${submission.source_page || "Not provided"}`,
          "",
          "Message:",
          submission.message,
        ].join("\n"),
      }),
    })
    if (!response.ok) {
      console.error("Contact notification failed", { submissionId: id, status: response.status })
    }
    await response.body?.cancel()
  } catch {
    // The row is already saved. Email failure must not invite a duplicate retry.
    console.error("Contact notification unavailable", { submissionId: id })
  }
}

export async function POST(request: Request) {
  let payload: unknown
  try {
    payload = await request.json()
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid JSON body." },
      { status: 400 },
    )
  }

  const parsed = contactSchema.safeParse(payload)
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: parsed.error.issues[0].message },
      { status: 400 },
    )
  }

  const { name, email, company, message, source_page } = parsed.data
  let submissionId: string
  try {
    const supabase = createServerSupabaseClient()
    const { data, error } = await supabase
      .from("contact_submissions")
      .insert({
        name,
        email,
        company: company || null,
        message,
        source_page: source_page || null,
      })
      .select("id")
      .single()

    if (error || !data?.id) {
      console.error("Contact submission save failed", { code: error?.code })
      return NextResponse.json(
        { success: false, error: "We couldn't save your message. Please try again." },
        { status: 500 },
      )
    }
    submissionId = data.id
  } catch {
    console.error("Contact submission storage unavailable")
    return NextResponse.json(
      { success: false, error: "We couldn't save your message. Please try again." },
      { status: 500 },
    )
  }

  await notifyContact({ name, email, company, message, source_page }, submissionId)

  return NextResponse.json(
    {
      success: true,
      id: submissionId,
      message: "Thanks for reaching out. We will get back to you shortly.",
    },
    { status: 201 },
  )
}
