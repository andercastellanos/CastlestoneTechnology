import type { ResolvingMetadata } from "next"
import AiOutboundCallingView from "@/components/pages/AiOutboundCallingView"
import { aiOutboundCallingContent as content } from "@/content/es/ai-outbound-calling"
import { resolveContent } from "@/lib/content"
import { aiOutboundCallingLinks, aiOutboundCallingNumbers } from "@/lib/page-data/ai-outbound-calling"
import { spanishPageMetadata } from "@/lib/spanish-metadata"

const copy = resolveContent(content, aiOutboundCallingNumbers)

export function generateMetadata(_props: unknown, parent: ResolvingMetadata) {
  return spanishPageMetadata({
    path: aiOutboundCallingLinks.es,
    title: copy.title,
    description: copy.description,
    keywords: ["llamadas salientes con IA", "calificación de prospectos con IA", "The Lead Caller"],
    explicitOpenGraphImage: true,
  }, parent)
}

export default function AiOutboundCallingSpanishPage() {
  return <AiOutboundCallingView content={content} locale="es" />
}
