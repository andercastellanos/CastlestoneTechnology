import type { Metadata } from "next"
import WebDesignView from "@/components/pages/WebDesignView"
import { webDesignContent } from "@/content/en/web-design"
import { SOCIAL_IMAGES } from "@/lib/constants"
import { alternatesFor } from "@/lib/i18n"

export const metadata: Metadata = {
  title: webDesignContent.metadata_title,
  description: webDesignContent.metadata_description,
  alternates: alternatesFor("/services/web-design"),
  openGraph: {
    title: webDesignContent.metadata_title,
    description: webDesignContent.metadata_description,
    url: "/services/web-design",
    type: "website",
    locale: "en_US",
    images: SOCIAL_IMAGES.openGraph,
  },
  twitter: {
    card: "summary_large_image",
    title: webDesignContent.metadata_title,
    description: webDesignContent.metadata_description,
    images: SOCIAL_IMAGES.twitter,
  },
}

export default function WebDesignPage() {
  return <WebDesignView content={webDesignContent} locale="en" />
}
