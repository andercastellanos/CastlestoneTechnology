import type { ResolvingMetadata } from "next"
import WebDesignView from "@/components/pages/WebDesignView"
import { webDesignContent } from "@/content/es/web-design"
import { spanishPageMetadata } from "@/lib/spanish-metadata"

export function generateMetadata(_props: unknown, parent: ResolvingMetadata) {
  return spanishPageMetadata({
    path: webDesignContent.path,
    title: webDesignContent.metadata_title,
    description: webDesignContent.metadata_description,
    explicitOpenGraphImage: true,
  }, parent)
}

export default function SpanishWebDesignPage() {
  return <WebDesignView content={webDesignContent} locale="es" />
}
