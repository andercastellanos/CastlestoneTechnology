import type { ResolvingMetadata } from "next"
import AiReceptionistView from "@/components/pages/AiReceptionistView"
import { aiReceptionistContent as copy } from "@/content/es/ai-receptionist"
import { aiReceptionistLinks } from "@/lib/page-data/ai-receptionist"
import { spanishPageMetadata } from "@/lib/spanish-metadata"

export function generateMetadata(_props: unknown, parent: ResolvingMetadata) {
  return spanishPageMetadata({
    path: aiReceptionistLinks.es,
    title: copy.title,
    description: copy.description,
    explicitOpenGraphImage: true,
  }, parent)
}

export default function AiReceptionistSpanishPage() {
  return <AiReceptionistView content={copy} locale="es" />
}
