import ContactView from "@/components/pages/ContactView"
import { contactContent } from "@/content/en/contact"
import { alternatesFor } from "@/lib/i18n"
import type { Metadata } from "next"

const copy = contactContent

export const metadata: Metadata = {
  title: copy.metadata_title,
  description: copy.metadata_description,
  alternates: alternatesFor("/contact"),
}

export default function ContactPage() {
  return <ContactView content={contactContent} locale="en" />
}
