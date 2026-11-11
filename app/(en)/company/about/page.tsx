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
      "@type": "ProfessionalService",
      "@id": SITE_CONFIG.organizationId,
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
      description: copy.description,
      logo: new URL("/logo.png", SITE_CONFIG.url).href,
      email: SITE_CONFIG.contact.email,
      telephone: SITE_CONFIG.contact.phone.e164,
      address: {
        "@type": "PostalAddress",
        streetAddress: `${SITE_CONFIG.contact.address.street} ${SITE_CONFIG.contact.address.suite}`,
        addressLocality: SITE_CONFIG.contact.address.city,
        addressRegion: SITE_CONFIG.contact.address.region,
        postalCode: SITE_CONFIG.contact.address.postalCode,
        addressCountry: SITE_CONFIG.contact.address.country,
      },
      areaServed: [
        ...["Miami", "Fort Lauderdale", "West Palm Beach", "Boca Raton", "Orlando"].map((name) => ({ "@type": "City", name })),
        { "@type": "Country", name: "United States" },
      ],
      knowsAbout: ["Web design", "Local SEO", "AI receptionists", "Marketing automation", "Custom software development"],
      // TODO: Add verified Google Business Profile, Clutch and other profile URLs.
      sameAs: [SITE_CONFIG.links.linkedin],
    },
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
