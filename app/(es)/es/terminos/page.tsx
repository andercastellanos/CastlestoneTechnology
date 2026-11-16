import type { ResolvingMetadata } from "next"
import LegalView from "@/components/pages/LegalView"
import { termsContent } from "@/content/es/terms"
import { spanishPageMetadata } from "@/lib/spanish-metadata"

export function generateMetadata(_props: unknown, parent: ResolvingMetadata) {
  return spanishPageMetadata({
    path: "/es/terminos",
    title: termsContent.metadata_title,
    description: termsContent.metadata_description,
  }, parent)
}

export default function TermsSpanishPage() {
  return <LegalView content={termsContent} locale="es" />
}
