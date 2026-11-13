import type { Metadata } from "next"
import AiOutboundCallingView from "@/components/pages/AiOutboundCallingView"
import { aiOutboundCallingContent as content } from "@/content/en/ai-outbound-calling"
import { SOCIAL_IMAGES } from "@/lib/constants"
import { resolveContent } from "@/lib/content"
import { alternatesFor } from "@/lib/i18n"
import { aiOutboundCallingLinks, aiOutboundCallingNumbers } from "@/lib/page-data/ai-outbound-calling"

const copy = resolveContent(content, aiOutboundCallingNumbers)

export const metadata: Metadata = {
  title: copy.title,
  description: copy.description,
  keywords: ["AI outbound calling", "AI lead qualification", "AI cold calling", "The Lead Caller"],
  alternates: alternatesFor(aiOutboundCallingLinks.en),
  openGraph: {
    title: copy.title,
    description: copy.description,
    url: aiOutboundCallingLinks.en,
    type: "website",
    locale: "en_US",
    images: SOCIAL_IMAGES.openGraph,
  },
  twitter: {
    card: "summary_large_image",
    title: copy.title,
    description: copy.description,
    images: SOCIAL_IMAGES.twitter,
  },
}

export default function AiOutboundCallingPage() {
  return <AiOutboundCallingView content={content} locale="en" />
}
