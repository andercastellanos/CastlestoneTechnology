import type { Metadata } from "next"
import LegalView from "@/components/pages/LegalView"
import { privacyContent } from "@/content/en/privacy"
import { alternatesFor } from "@/lib/i18n"

export const metadata: Metadata = {
  title: privacyContent.metadata_title,
  description: privacyContent.metadata_description,
  alternates: alternatesFor("/privacy"),
}

export default function PrivacyPage() {
  return <LegalView content={privacyContent} locale="en" />
}
