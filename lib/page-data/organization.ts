import { SITE_CONFIG } from "@/lib/constants"
import type { Locale } from "@/lib/i18n"

const descriptions: Record<Locale, string> = {
  en: "Castlestone Technology is a Miami technology agency helping small businesses grow with websites, local SEO, AI receptionists, automation and custom software.",
  es: "Castlestone Technology es una agencia de tecnología en Miami que ayuda a pequeñas empresas a crecer con sitios web, SEO local, recepcionistas con IA, automatización y software a medida.",
}

/** The single organization node every page carries; page-level data refers to it by @id. */
export function organizationJsonLd(locale: Locale) {
  const { address } = SITE_CONFIG.contact

  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": SITE_CONFIG.organizationId,
    name: SITE_CONFIG.name,
    url: new URL("/", SITE_CONFIG.url).href,
    description: descriptions[locale],
    logo: new URL("/logo.png", SITE_CONFIG.url).href,
    image: new URL("/logo.png", SITE_CONFIG.url).href,
    email: SITE_CONFIG.contact.email,
    telephone: SITE_CONFIG.contact.phone.e164,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${address.street} ${address.suite}`,
      addressLocality: address.city,
      addressRegion: address.region,
      postalCode: address.postalCode,
      addressCountry: address.country,
    },
    areaServed: [
      ...["Miami", "Fort Lauderdale", "West Palm Beach", "Boca Raton", "Orlando"].map((name) => ({ "@type": "City", name })),
      { "@type": "Country", name: "United States" },
    ],
    knowsAbout: ["Web design", "Local SEO", "AI receptionists", "AI outbound calling", "Marketing automation", "Custom software development"],
    // TODO: Add verified social, Google Business Profile and directory profile URLs as they go live.
    sameAs: [SITE_CONFIG.links.linkedin],
  }
}
