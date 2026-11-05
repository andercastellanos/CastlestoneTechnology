import type { ResolvingMetadata } from "next"
import LocalSeoView from "@/components/pages/LocalSeoView"
import { localSeoContent } from "@/content/es/local-seo"
import { spanishPageMetadata } from "@/lib/spanish-metadata"

export function generateMetadata(_props: unknown, parent: ResolvingMetadata) {
  return spanishPageMetadata({
    path: "/es/servicios/seo-local",
    title: localSeoContent.title,
    description: localSeoContent.description,
    explicitOpenGraphImage: true,
  }, parent)
}

export default function LocalSeoSpanishPage() {
  return <LocalSeoView content={localSeoContent} locale="es" />
}
