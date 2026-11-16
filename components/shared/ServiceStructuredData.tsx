import { SITE_CONFIG } from "@/lib/constants"
import { alternatesFor, type Locale } from "@/lib/i18n"
import { serviceCatalog, servicesFor } from "@/lib/page-data/service-catalog"

type ServicePath = (typeof serviceCatalog)[number]["path"]

/** Service JSON-LD for a service page, with the provider pointing to the organization @id. */
export default function ServiceStructuredData({ path, locale }: { path: ServicePath; locale: Locale }) {
  const service = servicesFor(locale).find((entry) => entry.path === path)
  if (!service) return null
  const data = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    url: alternatesFor(service.href).canonical,
    provider: {
      "@id": SITE_CONFIG.organizationId,
    },
    areaServed: { "@type": "Country", name: "United States" },
  }
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />
  )
}
