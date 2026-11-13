import type { Metadata } from "next"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import AboutView from "@/components/pages/AboutView"
import { aboutContent as copy } from "@/content/en/about"
import { SITE_CONFIG, SOCIAL_IMAGES } from "@/lib/constants"
import { alternatesFor } from "@/lib/i18n"

const canonical = new URL(copy.path, SITE_CONFIG.url).href

export const metadata: Metadata = {
  title: copy.title,
  description: copy.description,
  alternates: alternatesFor(copy.path),
  openGraph: {
    locale: "en_US",
    type: "website",
    title: `${copy.title} | ${SITE_CONFIG.name}`,
    description: copy.description,
    url: canonical,
    siteName: SITE_CONFIG.name,
    images: SOCIAL_IMAGES.openGraph,
  },
  twitter: {
    card: "summary_large_image",
    images: SOCIAL_IMAGES.twitter,
    title: `${copy.title} | ${SITE_CONFIG.name}`,
    description: copy.description,
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AboutPage",
      "@id": `${canonical}#webpage`,
      url: canonical,
      name: copy.title,
      description: copy.description,
      inLanguage: "en-US",
      isPartOf: { "@id": `${new URL("/", SITE_CONFIG.url).href}#website` },
      mainEntity: { "@id": SITE_CONFIG.organizationId },
      about: { "@id": SITE_CONFIG.organizationId },
    },
  ],
}

export default function AboutPage() {
  return (
    <>
      <Header />
      <AboutView locale="en" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <Footer />
    </>
  )
}
