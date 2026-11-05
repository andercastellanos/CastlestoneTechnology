import type { ResolvingMetadata } from "next"
import ContactView from "@/components/pages/ContactView"
import { contactContent } from "@/content/es/contact"
import { hrefForLocale } from "@/lib/i18n"
import { spanishPageMetadata } from "@/lib/spanish-metadata"

const copy = contactContent

export function generateMetadata(_props: unknown, parent: ResolvingMetadata) {
  return spanishPageMetadata({
    path: hrefForLocale("/contact", "es"),
    title: copy.metadata_title,
    description: copy.metadata_description,
  }, parent)
}

export default function ContactSpanishPage() {
  return <ContactView content={contactContent} locale="es" />
}
