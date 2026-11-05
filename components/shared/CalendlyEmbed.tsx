"use client"

import { useEffect } from "react"
import ContactForm from "@/components/forms/ContactForm"

// Enable embedded booking once a verified Calendly URL has been configured.
const CALENDLY_URL = process.env.NEXT_PUBLIC_CALENDLY_URL?.trim()

export default function CalendlyEmbed() {
  useEffect(() => {
    if (!CALENDLY_URL) return

    const script = document.createElement("script")
    script.src = "https://assets.calendly.com/assets/external/widget.js"
    script.async = true
    document.body.appendChild(script)

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script)
      }
    }
  }, [])

  if (!CALENDLY_URL) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="font-heading mb-4 text-2xl font-bold text-foreground">
            Request a Consultation
          </h2>
          <p className="leading-relaxed text-muted-foreground">
            Share the service you&apos;re interested in and your preferred
            availability.
          </p>
        </div>
        <ContactForm />
      </div>
    )
  }

  return (
    <div
      className="calendly-inline-widget"
      data-url={CALENDLY_URL}
      style={{ minWidth: "320px", height: "700px" }}
    />
  )
}
