"use client"

import { sendGAEvent } from "@next/third-parties/google"
import type { Locale } from "@/lib/i18n"

// Also exclude localized variants and descendants of every application route.
export const excludedPathPattern = "^/(?:es/)?(?:portal|va|admin|dashboard|sign-in|sign-up|account-pending|client-login|api|_next)(?:/|$)"
const excludedPath = new RegExp(excludedPathPattern)
const gaId = process.env.NEXT_PUBLIC_GA_ID?.trim()

export function isMarketingPath(pathname: string) {
  return pathname.startsWith("/") && !excludedPath.test(pathname)
}

export function analyticsEnabled() {
  return Boolean(gaId && /^G-[A-Z0-9]+$/.test(gaId))
}

type AnalyticsEvent =
  | { name: "generate_lead"; language: Locale }
  | { name: "book_demo_click"; link_text: string }
  | { name: "phone_click" }

// Clicks are interactions only. Leads are emitted by successful contact submissions;
// embedded booking has no verified completion signal and emits no conversion event.
export function trackMarketingEvent(event: AnalyticsEvent) {
  if (!analyticsEnabled() || typeof window === "undefined") return
  if (!["generate_lead", "book_demo_click", "phone_click"].includes(event.name)) return
  const page_path = window.location.pathname
  if (!isMarketingPath(page_path)) return

  const params = event.name === "generate_lead"
    ? { page_path, language: event.language }
    : event.name === "book_demo_click"
      ? { page_path, link_text: event.link_text }
      : { page_path }

  sendGAEvent("event", event.name, params)
}
