import type { Metadata } from "next"
import LegalView from "@/components/pages/LegalView"
import { termsContent } from "@/content/en/terms"
import { alternatesFor } from "@/lib/i18n"

export const metadata: Metadata = {
  title: termsContent.metadata_title,
  description: termsContent.metadata_description,
  alternates: alternatesFor("/terms"),
}

export default function TermsPage() {
  return <LegalView content={termsContent} locale="en" />
}
