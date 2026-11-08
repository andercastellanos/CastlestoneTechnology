import HomeView from "@/components/pages/HomeView"
import { homeContent } from "@/content/en/home"
import { resolveContent } from "@/lib/content"
import { alternatesFor } from "@/lib/i18n"
import { homeNumbers } from "@/lib/page-data/home"
import type { Metadata, ResolvingMetadata } from "next"

const copy = resolveContent(homeContent, homeNumbers)

const title = copy.title

const description =
  copy.description

const metadata: Metadata = {
  title: {
    absolute: title,
  },
  description,
  alternates: alternatesFor("/"),
  openGraph: {
    locale: "en_US",
    type: "website",
    title,
    description,
    url: "/",
    siteName: copy.metadata_openGraph_siteName,
  },
}

export async function generateMetadata(
  _props: unknown,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const inherited = await parent

  return {
    ...metadata,
    openGraph: {
      ...metadata.openGraph,
      images: inherited.openGraph?.images,
    },
  }
}

export default function HomePage() {
  return <HomeView content={homeContent} locale="en" />
}
