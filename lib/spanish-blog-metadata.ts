import type { ResolvingMetadata } from "next"
import type { SpanishBlogPostContent } from "@/content/types/blog-post"
import { spanishPageMetadata } from "@/lib/spanish-metadata"
import { spanishBlogPublished } from "@/lib/page-data/spanish-blog"

export async function spanishBlogMetadata(copy: SpanishBlogPostContent, parent: ResolvingMetadata) {
  const metadata = await spanishPageMetadata({ path: copy.path, title: copy.title, description: copy.description, keywords: [copy.keyword] }, parent)
  return { ...metadata, openGraph: { ...metadata.openGraph, type: "article" as const, publishedTime: spanishBlogPublished, authors: ["Castlestone Team"] } }
}
