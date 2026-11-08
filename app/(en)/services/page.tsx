import type { Metadata } from "next"
import ServicesHubView from "@/components/pages/ServicesHubView"
import { servicesHubContent as copy } from "@/content/en/services-hub"
import { SOCIAL_IMAGES } from "@/lib/constants"
import { alternatesFor } from "@/lib/i18n"

export const metadata: Metadata = {
  title: copy.title,
  description: copy.description,
  alternates: alternatesFor(copy.path),
  openGraph: {
    title: copy.title,
    description: copy.description,
    url: copy.path,
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

export default function ServicesHubPage() {
  return <ServicesHubView content={copy} locale="en" />
}
