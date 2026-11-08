import MarketingAutomationView from "@/components/pages/MarketingAutomationView"
import { marketingAutomationContent } from "@/content/en/marketing-automation"
import { SOCIAL_IMAGES } from "@/lib/constants"
import { resolveContent } from "@/lib/content"
import { alternatesFor } from "@/lib/i18n"
import { marketingAutomationNumbers } from "@/lib/page-data/marketing-automation"
import type { Metadata } from "next"

const copy = resolveContent(marketingAutomationContent, marketingAutomationNumbers)

const title = copy.title

const description =
  copy.description

export const metadata: Metadata = {
  title,
  description,
  alternates: alternatesFor("/services/marketing-automation"),
  openGraph: {
    locale: "en_US",
    title: copy.openGraphTitle,
    description,
    url: "/services/marketing-automation",
    type: "website",
    images: SOCIAL_IMAGES.openGraph,
  },
}

export default function MarketingAutomationPage() {
  return <MarketingAutomationView content={marketingAutomationContent} locale="en" />
}
