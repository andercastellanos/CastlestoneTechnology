"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import Script from "next/script"
import { GoogleAnalytics } from "@next/third-parties/google"
import {
  analyticsEnabled,
  excludedPathPattern,
  isMarketingPath,
  trackMarketingEvent,
} from "./events"

export default function MarketingAnalytics({ gaId }: { gaId: string }) {
  const pathname = usePathname()
  const enabled = analyticsEnabled() && Boolean(pathname && isMarketingPath(pathname))

  useEffect(() => {
    if (!enabled) return

    function onClick(event: MouseEvent) {
      const target = event.target
      const link = target instanceof Element ? target.closest("a[href]") : null
      if (!(link instanceof HTMLAnchorElement)) return

      if (link.protocol === "tel:") {
        trackMarketingEvent({ name: "phone_click" })
      } else {
        const destination = new URL(link.href)
        if (destination.origin === window.location.origin && destination.pathname.replace(/\/+$/, "") === "/book-demo") {
          trackMarketingEvent({
            name: "book_demo_click",
            link_text: (link.textContent || link.getAttribute("aria-label") || "").replace(/\s+/g, " ").trim(),
          })
        }
      }
    }

    function onMessage(event: MessageEvent) {
      if (window.location.pathname !== "/book-demo" || event.origin !== "https://calendly.com") return
      if (!event.data || event.data.event !== "calendly.event_scheduled") return

      // Verify the sender is the actual Calendly frame; ignore all booking data.
      const frames = document.querySelectorAll<HTMLIFrameElement>(".calendly-inline-widget iframe")
      if (Array.from(frames).some((frame) => frame.contentWindow === event.source && new URL(frame.src).origin === event.origin)) {
        trackMarketingEvent({ name: "calendly_scheduled" })
      }
    }

    document.addEventListener("click", onClick, true)
    window.addEventListener("message", onMessage)
    return () => {
      document.removeEventListener("click", onClick, true)
      window.removeEventListener("message", onMessage)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <>
      <Script id="ga-route-guard" strategy="afterInteractive">{`
        // A downloaded tag persists across client navigation. Google's disable
        // flag must therefore reflect the live URL, including history changes.
        Object.defineProperty(window, ${JSON.stringify(`ga-disable-${gaId}`)}, {
          configurable: true,
          get: function () {
            return new RegExp(${JSON.stringify(excludedPathPattern)}).test(window.location.pathname);
          }
        });
      `}</Script>
      <GoogleAnalytics gaId={gaId} />
    </>
  )
}
