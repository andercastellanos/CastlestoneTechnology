import type { ResolvingMetadata } from "next"
import ServicesHubView from "@/components/pages/ServicesHubView"
import { servicesHubContent as copy } from "@/content/es/services-hub"
import { spanishPageMetadata } from "@/lib/spanish-metadata"

export function generateMetadata(_props: unknown, parent: ResolvingMetadata) {
  return spanishPageMetadata({
    path: copy.path,
    title: copy.title,
    description: copy.description,
    explicitOpenGraphImage: true,
  }, parent)
}

export default function ServicesHubSpanishPage() {
  return <ServicesHubView content={copy} locale="es" />
}
