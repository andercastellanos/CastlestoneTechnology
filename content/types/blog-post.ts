export type SpanishBlogPostContent = {
  path: string
  title: string
  description: string
  keyword: string
  category: string
  introduction: string
  sections: readonly { heading: string; paragraphs: readonly string[]; sources?: readonly { label: string; url: string }[] }[]
  ctaHeading: string
  ctaDescription: string
  ctaLabel: string
  servicePath: string
  serviceLabel: string
}
