"use client"

import { useEffect } from "react"

// TODO: Replace YOUR_CALENDLY_LINK with your actual Calendly URL
const CALENDLY_URL = "https://calendly.com/YOUR_CALENDLY_LINK"

export default function CalendlyEmbed() {
  useEffect(() => {
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

  return (
    <div
      className="calendly-inline-widget"
      data-url={CALENDLY_URL}
      style={{ minWidth: "320px", height: "700px" }}
    />
  )
}
