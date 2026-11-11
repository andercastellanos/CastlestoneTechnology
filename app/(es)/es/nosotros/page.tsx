import type { ResolvingMetadata } from "next"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import AboutView from "@/components/pages/AboutView"
import { aboutContent as copy } from "@/content/es/about"
import { SITE_CONFIG } from "@/lib/constants"
import { alternatesFor } from "@/lib/i18n"
import { spanishPageMetadata } from "@/lib/spanish-metadata"

export function generateMetadata(_props: unknown, parent: ResolvingMetadata) {
  return spanishPageMetadata({ path: copy.path, title: copy.title, description: copy.description }, parent)
}

const canonical = alternatesFor(copy.path).canonical
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": `${canonical}#webpage`,
  url: canonical,
  name: copy.title,
  description: copy.description,
  inLanguage: "es",
  isPartOf: { "@id": `${new URL("/", SITE_CONFIG.url).href}#website` },
  mainEntity: { "@id": SITE_CONFIG.organizationId },
  about: { "@id": SITE_CONFIG.organizationId },
}

export default function SpanishAboutPage() {
  return (
    <>
      <Header locale="es" />
      <AboutView content={copy} locale="es" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <Footer locale="es" />
    </>
  )
}
