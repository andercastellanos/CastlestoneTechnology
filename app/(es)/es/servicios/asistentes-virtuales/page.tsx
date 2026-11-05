import type { ResolvingMetadata } from "next"
import VirtualAssistantView from "@/components/pages/VirtualAssistantView"
import { virtualAssistantContent } from "@/content/es/virtual-assistant"
import { hrefForLocale } from "@/lib/i18n"
import { spanishPageMetadata } from "@/lib/spanish-metadata"
import { resolveContent } from "@/lib/content"
import { virtualAssistantNumbers } from "@/lib/page-data/virtual-assistant"

const copy = resolveContent(virtualAssistantContent, virtualAssistantNumbers)

export function generateMetadata(_props: unknown, parent: ResolvingMetadata) {
  return spanishPageMetadata({
    path: hrefForLocale("/services/virtual-assistant", "es"),
    title: copy.metadata_title,
    description: copy.metadata_description,
    openGraphTitle: copy.metadata_openGraph_title,
    openGraphDescription: copy.metadata_openGraph_description,
    keywords: [copy.metadata_keywords_1, copy.metadata_keywords_2, copy.metadata_keywords_3, copy.metadata_keywords_4, copy.metadata_keywords_5, copy.metadata_keywords_6, copy.metadata_keywords_7],
    explicitOpenGraphImage: true,
  }, parent)
}

export default function VirtualAssistantSpanishPage() {
  return <VirtualAssistantView content={virtualAssistantContent} locale="es" />
}
