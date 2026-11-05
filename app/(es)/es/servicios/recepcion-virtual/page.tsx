import type { ResolvingMetadata } from "next"
import VirtualFrontDeskView from "@/components/pages/VirtualFrontDeskView"
import { virtualFrontDeskContent } from "@/content/es/virtual-front-desk"
import { hrefForLocale } from "@/lib/i18n"
import { spanishPageMetadata } from "@/lib/spanish-metadata"
import { resolveContent } from "@/lib/content"
import { virtualFrontDeskNumbers } from "@/lib/page-data/virtual-front-desk"

const copy = resolveContent(virtualFrontDeskContent, virtualFrontDeskNumbers)

export function generateMetadata(_props: unknown, parent: ResolvingMetadata) {
  return spanishPageMetadata({
    path: hrefForLocale("/services/virtual-front-desk", "es"),
    title: copy.metadata_title,
    description: copy.metadata_description,
  }, parent)
}

export default function VirtualFrontDeskSpanishPage() {
  return <VirtualFrontDeskView content={virtualFrontDeskContent} locale="es" />
}
