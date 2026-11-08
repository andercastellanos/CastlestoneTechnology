import type { MetadataRoute } from "next"
import { SITE_CONFIG } from "@/lib/constants"
import { alternatesFor, routeMap } from "@/lib/i18n"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_CONFIG.url.replace(/\/+$/, "")

  const entries: MetadataRoute.Sitemap = [
    { url: baseUrl, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/services/virtual-front-desk`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/services/virtual-assistant`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/services/technology-solutions`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/services/marketing-automation`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/pricing`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/company/about`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/book-demo`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/contact`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/privacy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/terms`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/blog`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/blog/5-tasks-to-delegate-to-your-va`, lastModified: "2026-01-15T08:00:00Z", changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/blog/how-to-onboard-a-virtual-team-member`, lastModified: "2026-01-28T08:00:00Z", changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/blog/the-real-cost-of-missed-calls`, lastModified: "2026-02-10T08:00:00Z", changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/services/ai-receptionist`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/services/local-seo`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/blog/how-do-ai-receptionists-work`, lastModified: "2026-11-04T08:00:00Z", changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/blog/ai-receptionist-vs-answering-service`, lastModified: "2026-11-04T08:00:00Z", changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/blog/web-design-miami`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/blog/how-much-does-a-website-cost`, lastModified: "2026-11-07T08:00:00Z", changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/blog/sms-marketing-platforms-vs-done-for-you`, lastModified: "2026-11-07T08:00:00Z", changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/blog/wordpress-vs-wix-vs-custom-website`, lastModified: "2026-11-07T08:00:00Z", changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/blog/how-to-make-your-website-show-up-on-google`, lastModified: "2026-11-07T08:00:00Z", changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/blog/email-marketing-for-small-business`, lastModified: "2026-11-08T08:00:00Z", changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/blog/geo-vs-seo`, lastModified: "2026-11-08T08:00:00Z", changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/blog/can-ai-build-a-website`, lastModified: "2026-11-08T08:00:00Z", changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/blog/is-seo-worth-it-for-small-business`, lastModified: "2026-11-08T08:00:00Z", changeFrequency: "monthly", priority: 0.6 },
  ]

  const spanishEntries: MetadataRoute.Sitemap = routeMap.map((pair) => {
    const english = entries.find((entry) => new URL(entry.url).pathname === pair.en)
    return { ...english, url: `${baseUrl}${pair.es}` }
  })

  return [...entries, ...spanishEntries].map((entry) => {
    const { languages } = alternatesFor(new URL(entry.url).pathname)
    return languages ? { ...entry, alternates: { languages } } : entry
  })
}
