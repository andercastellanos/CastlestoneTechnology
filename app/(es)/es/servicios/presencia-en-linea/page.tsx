import type { ResolvingMetadata } from "next"
import OnlinePresenceView from "@/components/pages/OnlinePresenceView"
import { onlinePresenceContent as copy } from "@/content/es/online-presence"
import { spanishPageMetadata } from "@/lib/spanish-metadata"

export function generateMetadata(_props: unknown, parent: ResolvingMetadata) {
  return spanishPageMetadata({
    path: copy.path,
    title: copy.metadata_title,
    description: copy.metadata_description,
    explicitOpenGraphImage: true,
  }, parent)
}

export default function OnlinePresenceSpanishPage() {
  return <OnlinePresenceView content={copy} locale="es" />
}
