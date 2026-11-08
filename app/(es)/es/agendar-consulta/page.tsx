import type { ResolvingMetadata } from "next"
import BookDemoView from "@/components/pages/BookDemoView"
import { bookDemoContent } from "@/content/es/book-demo"
import { contactFormStrings } from "@/content/es/contact-form"
import { resolveContent } from "@/lib/content"
import { bookDemoNumbers } from "@/lib/page-data/book-demo"
import { spanishPageMetadata } from "@/lib/spanish-metadata"

const copy = resolveContent(bookDemoContent, bookDemoNumbers)

export function generateMetadata(_props: unknown, parent: ResolvingMetadata) {
  return spanishPageMetadata({
    path: "/es/agendar-consulta",
    title: copy.metadata_title,
    description: copy.metadata_description,
  }, parent)
}

export default function BookingPage() {
  return <BookDemoView content={bookDemoContent} formStrings={contactFormStrings} locale="es" />
}
