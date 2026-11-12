export type SpanishBlogPostContent = {
  path: string
  title: string
  description: string
  keyword: string
  category: string
  introduction: string | readonly string[]
  introCallout?: { text: string; link: { label: string; href: string } }
  published?: string
  sections: readonly {
    heading: string
    paragraphs: readonly string[]
    eyebrow?: string
    partIntroduction?: string
    callout?: boolean
    sources?: readonly { label: string; url: string }[]
    links?: readonly { label: string; href: string }[]
    list?: readonly string[]
    checkpoint?: string
    serviceLink?: { label: string; href: string }
  }[]
  faq?: { heading: string; items: readonly { question: string; answer: string }[] }
  disclaimer?: string
  ctaHeading: string
  ctaDescription: string
  ctaLabel: string
  ctaPath?: string
  ctaChecklist?: readonly string[]
  ctaFollowUp?: string
  ctaSecondary?: { label: string; href: string }
  servicePath: string
  serviceLabel: string
  serviceIntroduction?: string
}
