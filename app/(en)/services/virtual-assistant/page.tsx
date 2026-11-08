import VirtualAssistantView from "@/components/pages/VirtualAssistantView"
import { virtualAssistantContent } from "@/content/en/virtual-assistant"
import { SOCIAL_IMAGES } from "@/lib/constants"
import { resolveContent } from "@/lib/content"
import { alternatesFor } from "@/lib/i18n"
import { virtualAssistantNumbers } from "@/lib/page-data/virtual-assistant"
import type { Metadata } from "next"

const copy = resolveContent(virtualAssistantContent, virtualAssistantNumbers)

export const metadata: Metadata = {
  title: copy.metadata_title,
  description: copy.metadata_description,
  keywords: [
    copy.metadata_keywords_1,
    copy.metadata_keywords_2,
    copy.metadata_keywords_3,
    copy.metadata_keywords_4,
    copy.metadata_keywords_5,
    copy.metadata_keywords_6,
    copy.metadata_keywords_7,
  ],
  alternates: alternatesFor("/services/virtual-assistant"),
  openGraph: {
    locale: "en_US",
    title: copy.metadata_openGraph_title,
    description: copy.metadata_openGraph_description,
    url: "https://castlestonetechnology.com/services/virtual-assistant",
    images: SOCIAL_IMAGES.openGraph,
  },
}

export default function VirtualAssistantPage() {
  return <VirtualAssistantView content={virtualAssistantContent} locale="en" />
}
