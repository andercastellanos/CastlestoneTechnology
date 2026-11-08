"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { relatedPosts } from "@/lib/page-data/related-posts"
import { blogNavigationContent as en } from "@/content/en/blog-navigation"
import { blogNavigationContent as es } from "@/content/es/blog-navigation"
import type { Locale } from "@/lib/i18n"

export default function RelatedArticles({ locale }: { locale: Locale }) {
  const pathname = usePathname()
  const post = relatedPosts.find((entry) => entry.path === pathname)
  if (!post) return null
  const copy = locale === "es" ? es : en
  return (
    <section data-related-articles aria-labelledby="related-articles-heading" className="border-t border-[#e6dbc9] bg-[#f8f5ef] py-12">
      <div className="mx-auto max-w-3xl px-6">
        <h2 id="related-articles-heading" className="font-heading text-3xl font-bold text-[#222222]">{copy.related}</h2>
        <ul className="mt-6 space-y-4">
          {post.related.map((path) => {
            const related = relatedPosts.find((entry) => entry.path === path)
            return related ? <li key={path}><Link href={path} className="font-medium text-[#80613a] underline underline-offset-4 hover:text-foreground">{related.title}</Link></li> : null
          })}
        </ul>
      </div>
    </section>
  )
}
