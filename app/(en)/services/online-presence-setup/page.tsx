import type { Metadata } from "next"
import OnlinePresenceView from "@/components/pages/OnlinePresenceView"
import { onlinePresenceContent as copy } from "@/content/en/online-presence"
import { SOCIAL_IMAGES } from "@/lib/constants"
import { alternatesFor } from "@/lib/i18n"

export const metadata: Metadata = {
  title: copy.metadata_title,
  description: copy.metadata_description,
  alternates: alternatesFor(copy.path),
  openGraph: {
    title: copy.metadata_title,
    description: copy.metadata_description,
    url: copy.path,
    type: "website",
    locale: "en_US",
    images: SOCIAL_IMAGES.openGraph,
  },
  twitter: {
    card: "summary_large_image",
    title: copy.metadata_title,
    description: copy.metadata_description,
    images: SOCIAL_IMAGES.twitter,
  },
}

export default function OnlinePresencePage() {
  return <OnlinePresenceView content={copy} locale="en" />
}
