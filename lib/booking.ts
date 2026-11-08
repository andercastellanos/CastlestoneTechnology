type BookingLinks = {
  bookingUrl: string
  embedUrl: string | null
}

function googleUrl(value: string): URL | null {
  try {
    const url = new URL(value)
    if (url.protocol !== "https:" || url.username || url.password || url.port) return null
    return url
  } catch {
    return null
  }
}

function isSchedule(url: URL) {
  return url.hostname === "calendar.google.com"
    && /^\/calendar(?:\/u\/\d+)?\/appointments\/schedules\/[\w-]+\/?$/.test(url.pathname)
}

export async function getGoogleBookingLinks(value: string | undefined): Promise<BookingLinks | null> {
  const configured = googleUrl(value?.trim() || "")
  if (!configured) return null

  let schedule = configured
  if (!isSchedule(schedule)) {
    if (configured.hostname !== "calendar.app.google" || !/^\/[\w-]+\/?$/.test(configured.pathname)) return null

    // Resolve Google's public short link on the server. The short-link response
    // itself cannot be framed; only the appointment schedule supports embedding.
    try {
      const response = await fetch(configured.href, {
        redirect: "manual",
        cache: "force-cache",
        signal: AbortSignal.timeout(5000),
      })
      const location = response.headers.get("location")
      const resolved = location && googleUrl(new URL(location, configured).href)
      if (![301, 302, 303, 307, 308].includes(response.status) || !resolved || !isSchedule(resolved)) {
        return { bookingUrl: configured.href, embedUrl: null }
      }
      schedule = resolved
    } catch {
      // Keep a usable direct link and contact form if Google is unavailable.
      return { bookingUrl: configured.href, embedUrl: null }
    }
  }

  schedule.hash = ""
  schedule.searchParams.delete("gv")
  const bookingUrl = schedule.href
  schedule.searchParams.set("gv", "true")
  return { bookingUrl, embedUrl: schedule.href }
}
