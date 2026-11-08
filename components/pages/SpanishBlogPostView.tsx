import Link from "next/link"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import Container from "@/components/shared/Container"
import type { SpanishBlogPostContent } from "@/content/types/blog-post"
import { blogContent } from "@/content/es/blog"
import { SITE_CONFIG } from "@/lib/constants"
import { alternatesFor, hrefForLocale } from "@/lib/i18n"
import { spanishBlogPublished } from "@/lib/page-data/spanish-blog"

export default function SpanishBlogPostView({ content: copy }: { content: SpanishBlogPostContent }) {
  const date = new Intl.DateTimeFormat("es-US", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(spanishBlogPublished))
  const jsonLd = {
    "@context": "https://schema.org", "@type": "Article", inLanguage: "es",
    headline: copy.title, description: copy.description,
    datePublished: spanishBlogPublished, dateModified: spanishBlogPublished,
    author: { "@id": SITE_CONFIG.organizationId }, publisher: { "@id": SITE_CONFIG.organizationId },
    mainEntityOfPage: { "@type": "WebPage", "@id": alternatesFor(copy.path).canonical },
    image: new URL(SITE_CONFIG.ogImage, SITE_CONFIG.url).href,
  }
  return (
    <>
      <Header locale="es" />
      <main>
        <article>
          <div className="bg-background py-16">
            <Container>
              <div className="mx-auto max-w-3xl">
                <span className="inline-block rounded-sm border border-[#c8a97e]/30 bg-[#c8a97e]/15 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-[#c8a97e]">{copy.category}</span>
                <h1 className="font-heading mt-4 text-4xl font-bold leading-tight text-[#222222] sm:text-5xl">{copy.title}</h1>
                <p className="mt-4 text-sm text-[#9ca3af]">{blogContent.author} · <time dateTime={spanishBlogPublished}>{date}</time></p>
                <hr className="mt-8 border-[#e6dbc9]" />
              </div>
            </Container>
          </div>
          <section aria-label={blogContent.articleLabel} className="pb-20">
            <Container>
              <div className="mx-auto max-w-3xl space-y-12 leading-relaxed text-[#374151]">
                <p className="pt-10 text-lg">{copy.introduction}</p>
                {copy.sections.map((section) => (
                  <div key={section.heading} className="space-y-4">
                    <h2 className="font-heading border-l-4 border-[#c8a97e] pl-4 text-2xl font-bold text-[#222222]">{section.heading}</h2>
                    {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                    {section.sources?.map((source) => <p key={source.url} className="text-sm"><a href={source.url} className="text-[#80613a] underline underline-offset-4 hover:text-foreground">{source.label}</a></p>)}
                  </div>
                ))}
                <aside className="border-t border-[#e6dbc9] pt-8">
                  <h2 className="font-heading text-2xl font-bold">{blogContent.relatedServices}</h2>
                  <div className="mt-5 flex flex-wrap gap-5 text-[#80613a] underline underline-offset-4">
                    <Link href={hrefForLocale(copy.servicePath, "es")}>{copy.serviceLabel}</Link>
                    <Link href="/es/blog/diseno-web-miami">{blogContent.miamiLabel}</Link>
                    <Link href="/es/contacto">{blogContent.contactLabel}</Link>
                  </div>
                </aside>
                <div className="rounded-xl bg-[#c8a97e] p-8 text-center">
                  <h2 className="font-heading mb-2 text-2xl font-bold text-white">{copy.ctaHeading}</h2>
                  <p className="mb-6 text-white/90">{copy.ctaDescription}</p>
                  <Link href="/es/agendar-consulta" className="inline-flex min-h-10 items-center justify-center rounded-sm bg-white px-6 py-2 text-sm font-medium text-[#222222] transition-colors hover:bg-white/90">{copy.ctaLabel}</Link>
                </div>
              </div>
            </Container>
          </section>
        </article>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      </main>
      <Footer locale="es" />
    </>
  )
}
