import type { ResolvingMetadata } from "next"
import HomeView from "@/components/pages/HomeView"
import { homeContent } from "@/content/es/home"
import { hrefForLocale } from "@/lib/i18n"
import { spanishPageMetadata } from "@/lib/spanish-metadata"
import { resolveContent } from "@/lib/content"
import { homeNumbers } from "@/lib/page-data/home"

const copy = resolveContent(homeContent, homeNumbers)

export function generateMetadata(_props: unknown, parent: ResolvingMetadata) {
  return spanishPageMetadata({
    path: hrefForLocale("/", "es"),
    title: copy.title,
    description: copy.description,
  }, parent)
}

export default function HomeSpanishPage() {
  return <HomeView content={homeContent} locale="es" />
}
