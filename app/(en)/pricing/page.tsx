import type { Metadata } from "next"
import PricingView from "@/components/pages/PricingView"
import { pricingContent } from "@/content/en/pricing"
import { resolveContent } from "@/lib/content"
import { alternatesFor } from "@/lib/i18n"
import { pricingNumbers } from "@/lib/page-data/pricing"

const copy = resolveContent(pricingContent, pricingNumbers)

export const metadata: Metadata = {
  title: copy.metadata_title,
  description: copy.metadata_description,
  alternates: alternatesFor("/pricing"),
}

export default function PricingPage() {
  return <PricingView content={pricingContent} locale="en" />
}
