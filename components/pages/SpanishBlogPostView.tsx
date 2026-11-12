import Link from "next/link"
import { Check } from "lucide-react"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import Container from "@/components/shared/Container"
import type { SpanishBlogPostContent } from "@/content/types/blog-post"
import { blogContent } from "@/content/es/blog"
import { SITE_CONFIG } from "@/lib/constants"
import { alternatesFor, hrefForLocale } from "@/lib/i18n"
import { spanishBlogPublished } from "@/lib/page-data/spanish-blog"

export default function SpanishBlogPostView({ content: copy }: { content: SpanishBlogPostContent }) {
  const published = copy.published ?? spanishBlogPublished
  const date = new Intl.DateTimeFormat("es-US", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(published))
  const jsonLd = {
    "@context": "https://schema.org", "@type": "Article", inLanguage: "es",
    headline: copy.title, description: copy.description,
    datePublished: published, dateModified: published,
    author: { "@id": SITE_CONFIG.organizationId }, publisher: { "@id": SITE_CONFIG.organizationId },
    mainEntityOfPage: { "@type": "WebPage", "@id": alternatesFor(copy.path).canonical },
    image: new URL(SITE_CONFIG.ogImage, SITE_CONFIG.url).href,
  }
  const faqJsonLd = copy.faq ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: copy.faq.items.map(({ question, answer }) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })),
  } : null
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
                <p className="mt-4 text-sm text-[#9ca3af]">{blogContent.author} · <time dateTime={published}>{date}</time></p>
                <hr className="mt-8 border-[#e6dbc9]" />
              </div>
            </Container>
          </div>
          <section aria-label={blogContent.articleLabel} className="pb-20">
            <Container>
              <div className="mx-auto max-w-3xl space-y-12 leading-relaxed text-[#374151]">
                {typeof copy.introduction === "string" ? <p className="pt-10 text-lg">{copy.introduction}</p> : <div className="space-y-4 pt-10 text-lg">{copy.introduction.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>}
                {copy.introCallout && <aside className="rounded-lg border border-[#e6dbc9] bg-[#f8f5ef] p-6 sm:p-8"><p>{copy.introCallout.text}{" "}<Link href={hrefForLocale(copy.introCallout.link.href, "es")} className="font-medium text-[#80613a] underline underline-offset-4 hover:text-foreground">{copy.introCallout.link.label}</Link></p></aside>}
                {copy.sections.map((section) => (
                  <div key={section.heading} className={section.callout ? "space-y-4 rounded-lg border border-[#e6dbc9] bg-[#f8f5ef] p-6 sm:p-8" : "space-y-4"}>
                    {section.eyebrow && <p className="text-xs font-semibold uppercase tracking-widest text-[#80613a]">{section.eyebrow}</p>}
                    {section.partIntroduction && <p>{section.partIntroduction}</p>}
                    <h2 className="font-heading border-l-4 border-[#c8a97e] pl-4 text-2xl font-bold text-[#222222]">{section.heading}</h2>
                    {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                    {section.sources?.map((source) => <p key={source.url} className="text-sm"><a href={source.url} rel="noopener" className="text-[#80613a] underline underline-offset-4 hover:text-foreground">{source.label}</a></p>)}
                    {section.links?.map((link) => <p key={link.href}><Link href={hrefForLocale(link.href, "es")} className="text-[#80613a] underline underline-offset-4 hover:text-foreground">{link.label}</Link></p>)}
                    {section.list && <ul className="list-disc space-y-3 pl-5">{section.list.map((item) => <li key={item}>{item}</li>)}</ul>}
                    {section.checkpoint && <p className="font-medium">{section.checkpoint}</p>}
                    {section.serviceLink && <p className="text-sm text-[#6b7280]"><Link href={hrefForLocale(section.serviceLink.href, "es")} className="text-[#80613a] underline decoration-[#c8a97e] underline-offset-4 hover:text-foreground">{section.serviceLink.label}</Link></p>}
                  </div>
                ))}
                {copy.faq && <div className="space-y-4">
                  <h2 className="font-heading border-l-4 border-[#c8a97e] pl-4 text-2xl font-bold text-[#222222]">{copy.faq.heading}</h2>
                  {copy.faq.items.map(({ question, answer }) => <div key={question} className="space-y-3"><h3 className="font-heading text-xl font-bold text-[#222222]">{question}</h3><p>{answer}</p></div>)}
                </div>}
                <aside className="border-t border-[#e6dbc9] pt-8">
                  <h2 className="font-heading text-2xl font-bold">{blogContent.relatedServices}</h2>
                  {copy.serviceIntroduction && <p className="mt-5 leading-relaxed">{copy.serviceIntroduction}{" "}<Link href={hrefForLocale(copy.servicePath, "es")} className="text-[#80613a] underline underline-offset-4 hover:text-foreground">{copy.serviceLabel}</Link>.</p>}
                  <div className="mt-5 flex flex-wrap gap-5 text-[#80613a] underline underline-offset-4">
                    {!copy.serviceIntroduction && <Link href={hrefForLocale(copy.servicePath, "es")}>{copy.serviceLabel}</Link>}
                    <Link href="/es/blog/diseno-web-miami">{blogContent.miamiLabel}</Link>
                    <Link href="/es/contacto">{blogContent.contactLabel}</Link>
                  </div>
                </aside>
                {copy.ctaChecklist ? <section className="rounded-lg border border-[#e6dbc9] bg-[#f8f5ef] p-6 sm:p-8">
                  <h2 className="font-heading text-3xl font-bold text-[#222222]">{copy.ctaHeading}</h2>
                  <p className="mt-5">{copy.ctaDescription}</p>
                  <ul className="mt-6 space-y-4">{copy.ctaChecklist.map((item) => <li key={item} className="flex gap-3"><Check className="mt-1 h-5 w-5 shrink-0 text-[#80613a]" aria-hidden="true" /><span>{item}</span></li>)}</ul>
                  {copy.ctaFollowUp && <p className="mt-6">{copy.ctaFollowUp}</p>}
                  <div className="mt-7 flex flex-wrap items-center gap-5">
                    <Link href={hrefForLocale(copy.ctaPath ?? "/es/agendar-consulta", "es")} className="inline-flex min-h-12 items-center justify-center rounded-sm bg-[#80613a] px-6 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-[#634927]">{copy.ctaLabel}</Link>
                    {copy.ctaSecondary && <Link href={hrefForLocale(copy.ctaSecondary.href, "es")} className="font-medium text-[#80613a] underline underline-offset-4 hover:text-foreground">{copy.ctaSecondary.label}</Link>}
                  </div>
                </section> : <div className="rounded-xl bg-[#c8a97e] p-8 text-center">
                  <h2 className="font-heading mb-2 text-2xl font-bold text-white">{copy.ctaHeading}</h2>
                  <p className="mb-6 text-white/90">{copy.ctaDescription}</p>
                  <Link href={hrefForLocale(copy.ctaPath ?? "/es/agendar-consulta", "es")} className="inline-flex min-h-10 items-center justify-center rounded-sm bg-white px-6 py-2 text-sm font-medium text-[#222222] transition-colors hover:bg-white/90">{copy.ctaLabel}</Link>
                </div>}
                {copy.disclaimer && <p className="text-sm text-[#6b7280]">{copy.disclaimer}</p>}
              </div>
            </Container>
          </section>
        </article>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
        {faqJsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c") }} />}
      </main>
      <Footer locale="es" />
    </>
  )
}
