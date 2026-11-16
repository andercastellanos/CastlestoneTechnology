import type { ResolvingMetadata } from "next"
import LegalView from "@/components/pages/LegalView"
import { privacyContent } from "@/content/es/privacy"
import { spanishPageMetadata } from "@/lib/spanish-metadata"

export function generateMetadata(_props: unknown, parent: ResolvingMetadata) {
  return spanishPageMetadata({
    path: "/es/privacidad",
    title: privacyContent.metadata_title,
    description: privacyContent.metadata_description,
  }, parent)
}

export default function PrivacySpanishPage() {
  return <LegalView content={privacyContent} locale="es" />
}
