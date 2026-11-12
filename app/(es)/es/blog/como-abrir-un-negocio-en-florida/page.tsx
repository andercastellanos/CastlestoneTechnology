import type { ResolvingMetadata } from "next"
import SpanishBlogPostView from "@/components/pages/SpanishBlogPostView"
import { blogPostContent } from "@/content/es/blog-business-florida"
import { spanishBlogMetadata } from "@/lib/spanish-blog-metadata"

export function generateMetadata(_props: unknown, parent: ResolvingMetadata) {
  return spanishBlogMetadata(blogPostContent, parent)
}

export default function SpanishArticle() {
  return <SpanishBlogPostView content={blogPostContent} />
}
