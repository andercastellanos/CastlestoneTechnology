import type { Metadata, ResolvingMetadata } from "next"
import { Cormorant_Garamond, DM_Sans } from "next/font/google"
import { ClerkProvider } from "@clerk/nextjs"
import { SITE_CONFIG } from "@/lib/constants"
import type { Locale } from "@/lib/i18n"
import { spanishSiteContent } from "@/content/es/site"
import MarketingAnalytics from "@/components/analytics/MarketingAnalytics"

const headingFont = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
})

const bodyFont = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const siteName = SITE_CONFIG.name
const siteDescription = SITE_CONFIG.description
const siteUrl = SITE_CONFIG.url
const spanishImageAlt = spanishSiteContent.imageAlt

const baseMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  applicationName: siteName,
  referrer: "origin-when-cross-origin",
  authors: [{ name: siteName }],
  creator: siteName,
  publisher: siteName,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName,
    title: siteName,
    description: siteDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: siteDescription,
    creator: "@castlestonetech",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
}

export function metadataFor(locale: Locale): Metadata {
  if (locale === "en") return baseMetadata

  const description = spanishSiteContent.description

  return {
    ...baseMetadata,
    description,
    openGraph: {
      ...baseMetadata.openGraph,
      locale: "es_US",
      description,
      images: [{ url: SITE_CONFIG.ogImage, width: 1200, height: 630, alt: spanishImageAlt }],
    },
    twitter: {
      ...baseMetadata.twitter,
      description,
      images: [{ url: SITE_CONFIG.twitterImage, width: 1200, height: 630, alt: spanishImageAlt }],
    },
  }
}

type SocialImage = string | URL | {
  url: string | URL
  alt?: string
  type?: string
  width?: string | number
  height?: string | number
}

function inheritedImages(images: SocialImage[] | null | undefined, locale: Locale) {
  if (!images?.length) return undefined

  return images.map((image) => {
    const descriptor = typeof image === "string" || image instanceof URL ? { url: image } : image
    const source = new URL(String(descriptor.url), siteUrl)
    // Root image files resolve before the route group's metadataBase. Preserve
    // their generated cache keys while restoring the configured site origin.
    return {
      ...descriptor,
      url: new URL(`${source.pathname}${source.search}`, siteUrl).href,
      ...(locale === "es" ? { alt: spanishImageAlt } : {}),
    }
  })
}

export async function generateSiteMetadata(
  locale: Locale,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const metadata = metadataFor(locale)
  const inherited = await parent
  const openGraphImages = inheritedImages(inherited.openGraph?.images, locale)
  const twitterImages = inheritedImages(inherited.twitter?.images, locale)

  return {
    ...metadata,
    openGraph: {
      ...metadata.openGraph,
      ...(openGraphImages ? { images: openGraphImages } : {}),
    },
    twitter: {
      ...metadata.twitter,
      ...(twitterImages ? { images: twitterImages } : {}),
    },
  }
}

export function SiteRoot({
  children,
  locale,
}: Readonly<{
  children: React.ReactNode
  locale: Locale
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID?.trim()

  return (
    <ClerkProvider>
      <html lang={locale}>
        <body className={`${bodyFont.variable} ${headingFont.variable} antialiased`}>
          {children}
          {gaId ? <MarketingAnalytics gaId={gaId} /> : null}
        </body>
      </html>
    </ClerkProvider>
  )
}
