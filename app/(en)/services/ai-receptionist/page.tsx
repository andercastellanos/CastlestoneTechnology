import type { Metadata } from "next"
import AiReceptionistView from "@/components/pages/AiReceptionistView"
import { aiReceptionistContent as copy } from "@/content/en/ai-receptionist"
import { SOCIAL_IMAGES } from "@/lib/constants"
import { alternatesFor } from "@/lib/i18n"
import { aiReceptionistLinks } from "@/lib/page-data/ai-receptionist"

export const metadata: Metadata = {
  title: copy.title,
  description: copy.description,
  alternates: alternatesFor(aiReceptionistLinks.en),
  openGraph: {
    title: copy.title,
    description: copy.description,
    url: aiReceptionistLinks.en,
    type: "website",
    locale: "en_US",
    images: SOCIAL_IMAGES.openGraph,
  },
  twitter: {
    card: "summary_large_image",
    title: copy.title,
    description: copy.description,
    images: SOCIAL_IMAGES.twitter,
  },
}

export default function AiReceptionistPage() {
  return <AiReceptionistView content={copy} locale="en" />
}
