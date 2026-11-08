import type { Metadata } from "next"
import BookDemoView from "@/components/pages/BookDemoView"
import { bookDemoContent } from "@/content/en/book-demo"
import { contactFormStrings } from "@/content/en/contact-form"
import { resolveContent } from "@/lib/content"
import { alternatesFor } from "@/lib/i18n"
import { bookDemoNumbers } from "@/lib/page-data/book-demo"

const copy = resolveContent(bookDemoContent, bookDemoNumbers)

export const metadata: Metadata = {
  title: copy.metadata_title,
  description: copy.metadata_description,
  alternates: alternatesFor("/book-demo"),
}

export default function DemoPage() {
  return <BookDemoView content={bookDemoContent} formStrings={contactFormStrings} locale="en" />
}
