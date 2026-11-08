import Link from "next/link"
import { ArrowUpRight, Check, ChevronDown } from "lucide-react"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import Container from "@/components/shared/Container"
import type { WebDesignCityContent } from "@/content/types/web-design-city"
import { SITE_CONFIG } from "@/lib/constants"
import { alternatesFor, hrefForLocale, type Locale } from "@/lib/i18n"

const headingClass = "font-heading text-3xl font-bold leading-tight text-foreground sm:text-4xl"
const paragraphClass = "mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg"
const buttonClass = "inline-flex min-h-12 items-center justify-center rounded-sm bg-[#80613a] px-6 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-[#634927] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#80613a]"
const linkClass = "font-semibold text-[#80613a] underline decoration-[#c8a97e] underline-offset-4 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#80613a]"

export default function WebDesignCityView({ content: copy, locale }: { content: WebDesignCityContent; locale: Locale }) {
  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${alternatesFor(copy.path).canonical}#service`,
    name: copy.heading,
    description: copy.metadata_description,
    url: alternatesFor(copy.path).canonical,
    provider: { "@id": SITE_CONFIG.organizationId },
    areaServed: { "@type": "City", name: `${copy.city}, ${copy.region}` },
  }

  return (
    <>
      <Header locale={locale} />
      <main className="font-sans">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(service).replace(/</g, "\\u003c") }} />

        <section className="border-b border-[#e6dbc9] bg-[#f8f5ef] py-16 sm:py-24">
          <Container>
            <div className="mx-auto max-w-4xl text-center">
              <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.16em] text-[#80613a]">{copy.eyebrow}</span>
              <h1 className="font-heading text-4xl font-bold leading-tight text-foreground sm:text-6xl">{copy.heading}</h1>
              <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">{copy.introduction}</p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-5">
                <Link href="/book-demo" className={buttonClass}>{copy.primaryCta}</Link>
                <a href="#featured-project" className={linkClass}>{copy.projectCta}</a>
              </div>
            </div>
          </Container>
        </section>

        <section id="featured-project" className="scroll-mt-24 py-16 sm:py-20">
          <Container>
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#80613a]">{copy.project.eyebrow}</p>
                <h2 className={headingClass}>{copy.project.heading}</h2>
                <p className={paragraphClass}>{copy.project.description}</p>
                <a href={copy.project.url} target="_blank" rel="noopener noreferrer" className={`${linkClass} mt-6 inline-flex items-center gap-2`}>
                  {copy.project.linkLabel}<ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                </a>
              </div>
              <div className="rounded-xl border border-[#e6dbc9] bg-[#f8f5ef] p-6 sm:p-8">
                <h3 className="font-heading text-2xl font-bold">{copy.project.featuresHeading}</h3>
                <ul className="mt-6 space-y-4">
                  {copy.project.features.map((feature) => (
                    <li key={feature} className="flex gap-3 leading-relaxed text-muted-foreground">
                      <Check className="mt-1 h-5 w-5 shrink-0 text-[#80613a]" aria-hidden="true" />{feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Container>
        </section>

        <section className="border-y border-[#e6dbc9] bg-[#f8f5ef] py-16 sm:py-20">
          <Container>
            <h2 className={headingClass}>{copy.industries.heading}</h2>
            <p className={`${paragraphClass} max-w-3xl`}>{copy.industries.introduction}</p>
            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              {copy.industries.items.map((industry) => (
                <article key={industry.title} className="rounded-lg border border-[#e6dbc9] bg-white p-6 sm:p-8">
                  <h3 className="font-heading text-2xl font-bold">{industry.title}</h3>
                  <p className="mt-4 leading-relaxed text-muted-foreground">{industry.description}</p>
                </article>
              ))}
            </div>
          </Container>
        </section>

        <section className="py-16 sm:py-20">
          <Container>
            <div className="mx-auto max-w-3xl">
              <h2 className={headingClass}>{copy.pricing.heading}</h2>
              <p className={paragraphClass}>{copy.pricing.introduction}</p>
              <h3 className="font-heading mt-8 text-2xl font-bold">{copy.pricing.factorsHeading}</h3>
              <ul className="mt-5 list-disc space-y-3 pl-5 text-muted-foreground">
                {copy.pricing.factors.map((factor) => <li key={factor} className="pl-1 leading-relaxed">{factor}</li>)}
              </ul>
              <p className={paragraphClass}>{copy.pricing.closing}</p>
              <Link href="/book-demo" className={`${buttonClass} mt-7`}>{copy.primaryCta}</Link>
            </div>
          </Container>
        </section>

        <section className="border-y border-[#e6dbc9] bg-[#f8f5ef] py-16 sm:py-20">
          <Container>
            <h2 className={headingClass}>{copy.process.heading}</h2>
            <ol className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {copy.process.steps.map((step, index) => (
                <li key={step.title} className="border-t border-[#c8a97e] pt-6">
                  <span className="font-heading text-3xl text-[#80613a]" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                  <h3 className="font-heading mt-4 text-2xl font-bold">{step.title}</h3>
                  <p className="mt-3 leading-relaxed text-muted-foreground">{step.description}</p>
                </li>
              ))}
            </ol>
          </Container>
        </section>

        <section className="py-16 sm:py-20">
          <Container>
            <div className="mx-auto max-w-3xl">
              <h2 className={headingClass}>{copy.faq.heading}</h2>
              <div className="mt-8 space-y-4">
                {copy.faq.items.map(({ question, answer }) => (
                  <details key={question} className="group rounded-lg border border-[#e6dbc9] bg-white">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-lg p-6 font-semibold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#80613a] [&::-webkit-details-marker]:hidden">
                      {question}<ChevronDown className="h-5 w-5 shrink-0 text-[#80613a] transition-transform group-open:rotate-180" aria-hidden="true" />
                    </summary>
                    <p className="px-6 pb-6 leading-relaxed text-muted-foreground">{answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </Container>
        </section>

        <section className="border-t border-[#e6dbc9] bg-[#f8f5ef] py-16 sm:py-20">
          <Container>
            <div className="mx-auto max-w-3xl text-center">
              <h2 className={headingClass}>{copy.final.heading}</h2>
              <p className={paragraphClass}>{copy.final.description}</p>
              <Link href="/book-demo" className={`${buttonClass} mt-8`}>{copy.primaryCta}</Link>
              <p className="mt-6"><Link href={hrefForLocale("/contact", locale)} className={linkClass}>{copy.final.contactLabel}</Link></p>
              <aside className="mt-12 border-t border-[#e6dbc9] pt-8">
                <h3 className="font-heading text-2xl font-bold">{copy.related.heading}</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">{copy.related.introduction}</p>
                <ul className="mt-5 flex flex-wrap justify-center gap-x-6 gap-y-3">
                  <li><Link href={hrefForLocale("/services/technology-solutions", locale)} className={linkClass}>{copy.related.websites}</Link></li>
                  <li><Link href={hrefForLocale("/services/ai-receptionist", locale)} className={linkClass}>{copy.related.receptionist}</Link></li>
                  <li><Link href={hrefForLocale("/services/marketing-automation", locale)} className={linkClass}>{copy.related.marketing}</Link></li>
                </ul>
              </aside>
            </div>
          </Container>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  )
}
