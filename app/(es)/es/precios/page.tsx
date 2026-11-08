import type { ResolvingMetadata } from "next"
import PricingView from "@/components/pages/PricingView"
import { pricingContent } from "@/content/es/pricing"
import { resolveContent } from "@/lib/content"
import { pricingNumbers } from "@/lib/page-data/pricing"
import { spanishPageMetadata } from "@/lib/spanish-metadata"

const copy = resolveContent(pricingContent, pricingNumbers)

export function generateMetadata(_props: unknown, parent: ResolvingMetadata) {
  return spanishPageMetadata({
    path: "/es/precios",
    title: copy.metadata_title,
    description: copy.metadata_description,
  }, parent)
}

export default function PricingPage() {
  return <PricingView content={pricingContent} locale="es" />
}
