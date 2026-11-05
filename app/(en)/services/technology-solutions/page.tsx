import TechnologySolutionsView from "@/components/pages/TechnologySolutionsView"
import { technologySolutionsContent } from "@/content/en/technology-solutions"
import { resolveContent } from "@/lib/content"
import { alternatesFor } from "@/lib/i18n"
import { technologySolutionsNumbers } from "@/lib/page-data/technology-solutions"
import type { Metadata } from "next"

const copy = resolveContent(technologySolutionsContent, technologySolutionsNumbers)

export const metadata: Metadata = {
  title: copy.metadata_title,
  description: copy.metadata_description,
  alternates: alternatesFor("/services/technology-solutions"),
}

export default function TechnologySolutionsPage() {
  return <TechnologySolutionsView content={technologySolutionsContent} locale="en" />
}
