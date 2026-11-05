import type { Metadata } from "next"
import LocalSeoView from "@/components/pages/LocalSeoView"
import { localSeoContent } from "@/content/en/local-seo"
import { SOCIAL_IMAGES } from "@/lib/constants"
import { alternatesFor } from "@/lib/i18n"

export const metadata: Metadata = {
  title: localSeoContent.title,
  description: localSeoContent.description,
  alternates: alternatesFor("/services/local-seo"),
  openGraph: {
    title: localSeoContent.title,
    description: localSeoContent.description,
    url: "/services/local-seo",
    type: "website",
    locale: "en_US",
    images: SOCIAL_IMAGES.openGraph,
  },
  twitter: {
    card: "summary_large_image",
    title: localSeoContent.title,
    description: localSeoContent.description,
    images: SOCIAL_IMAGES.twitter,
  },
}

export default function LocalSeoPage() {
  return <LocalSeoView content={localSeoContent} locale="en" />
}
