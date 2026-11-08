import type { ResolvingMetadata } from "next"
import WebDesignCityView from "@/components/pages/WebDesignCityView"
import { webDesignMiamiContent as copy } from "@/content/es/web-design-miami"
import { spanishPageMetadata } from "@/lib/spanish-metadata"

export function generateMetadata(_props: unknown, parent: ResolvingMetadata) {
  return spanishPageMetadata({
    path: copy.path,
    title: copy.metadata_title,
    description: copy.metadata_description,
  }, parent)
}

export default function MiamiPage() {
  return <WebDesignCityView content={copy} locale="es" />
}
