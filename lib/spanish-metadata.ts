import type { Metadata, ResolvingMetadata } from "next"
import { spanishSiteContent } from "@/content/es/site"
import { SITE_CONFIG, SOCIAL_IMAGES } from "@/lib/constants"
import { alternatesFor } from "@/lib/i18n"

type SocialImage = string | URL | {
  url: string | URL
  alt?: string
  type?: string
  width?: string | number
  height?: string | number
}

type SpanishPageMetadata = {
  path: string
  title: string
  description: string
  openGraphTitle?: string
  openGraphDescription?: string
  keywords?: string[]
  explicitOpenGraphImage?: boolean
}

function imagesInSpanish(images: SocialImage[]) {
  return images.map((image) => {
    const descriptor = typeof image === "string" || image instanceof URL ? { url: image } : image
    const source = new URL(String(descriptor.url), SITE_CONFIG.url)
    return {
      ...descriptor,
      url: new URL(`${source.pathname}${source.search}`, SITE_CONFIG.url).href,
      alt: spanishSiteContent.imageAlt,
    }
  })
}

export async function spanishPageMetadata(
  options: SpanishPageMetadata,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const inherited = await parent
  const alternates = alternatesFor(options.path)
  const title = `${options.title} | ${SITE_CONFIG.name}`
  // Preserve the nearest file-based images, including their generated route and cache key.
  const openGraphImages = inherited.openGraph?.images ?? SOCIAL_IMAGES.openGraph

  return {
    title: { absolute: title },
    description: options.description,
    keywords: options.keywords ?? inherited.keywords,
    alternates,
    openGraph: {
      type: "website",
      locale: "es_US",
      siteName: SITE_CONFIG.name,
      title: options.openGraphTitle ?? title,
      description: options.openGraphDescription ?? options.description,
      url: alternates.canonical,
      images: imagesInSpanish(openGraphImages),
    },
    twitter: {
      card: "summary_large_image",
      creator: "@castlestonetech",
      title,
      description: options.description,
      images: imagesInSpanish(inherited.twitter?.images ?? SOCIAL_IMAGES.twitter),
    },
  }
}
