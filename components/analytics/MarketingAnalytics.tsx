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

    document.addEventListener("click", onClick, true)
    return () => {
      document.removeEventListener("click", onClick, true)
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
