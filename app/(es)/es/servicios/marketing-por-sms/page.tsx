import type { ResolvingMetadata } from "next"
import MarketingAutomationView from "@/components/pages/MarketingAutomationView"
import { marketingAutomationContent } from "@/content/es/marketing-automation"
import { hrefForLocale } from "@/lib/i18n"
import { spanishPageMetadata } from "@/lib/spanish-metadata"
import { resolveContent } from "@/lib/content"
import { marketingAutomationNumbers } from "@/lib/page-data/marketing-automation"

const copy = resolveContent(marketingAutomationContent, marketingAutomationNumbers)

export function generateMetadata(_props: unknown, parent: ResolvingMetadata) {
  return spanishPageMetadata({
    path: hrefForLocale("/services/marketing-automation", "es"),
    title: copy.title,
    description: copy.description,
    openGraphTitle: copy.openGraphTitle,
    explicitOpenGraphImage: true,
  }, parent)
}

export default function MarketingAutomationSpanishPage() {
  return <MarketingAutomationView content={marketingAutomationContent} locale="es" />
}
