import type { ResolvingMetadata } from "next"
import TechnologySolutionsView from "@/components/pages/TechnologySolutionsView"
import { technologySolutionsContent } from "@/content/es/technology-solutions"
import { hrefForLocale } from "@/lib/i18n"
import { spanishPageMetadata } from "@/lib/spanish-metadata"
import { resolveContent } from "@/lib/content"
import { technologySolutionsNumbers } from "@/lib/page-data/technology-solutions"

const copy = resolveContent(technologySolutionsContent, technologySolutionsNumbers)

export function generateMetadata(_props: unknown, parent: ResolvingMetadata) {
  return spanishPageMetadata({
    path: hrefForLocale("/services/technology-solutions", "es"),
    title: copy.metadata_title,
    description: copy.metadata_description,
  }, parent)
}

export default function TechnologySolutionsSpanishPage() {
  return <TechnologySolutionsView content={technologySolutionsContent} locale="es" />
}
