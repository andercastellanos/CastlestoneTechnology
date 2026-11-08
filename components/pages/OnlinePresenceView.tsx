import Link from "next/link"
import { Check, ChevronDown, Globe, Mail, Share2 } from "lucide-react"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import Container from "@/components/shared/Container"
import type { OnlinePresenceContent } from "@/content/en/online-presence"
import { SITE_CONFIG } from "@/lib/constants"
import { alternatesFor, hrefForLocale, type Locale } from "@/lib/i18n"

const headingClass = "font-heading text-3xl font-bold leading-tight text-foreground sm:text-4xl"
const paragraphClass = "mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg"
const buttonClass = "inline-flex min-h-12 items-center justify-center rounded-sm bg-[#80613a] px-6 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-[#634927] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#80613a]"
const icons = [Share2, Globe, Mail]

export default function OnlinePresenceView({ content: copy, locale }: { content: OnlinePresenceContent; locale: Locale }) {
  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${alternatesFor(copy.path).canonical}#service`,
    name: copy.heading,
    description: copy.metadata_description,
    url: alternatesFor(copy.path).canonical,
    provider: { "@id": SITE_CONFIG.organizationId },
    areaServed: { "@type": "Country", name: "United States" },
  }
  const bookingHref = hrefForLocale("/book-demo", locale)

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
              <p className={`${paragraphClass} mx-auto max-w-3xl`}>{copy.introduction}</p>
              <Link href={bookingHref} className={`${buttonClass} mt-8`}>{copy.primaryCta}</Link>
            </div>
          </Container>
        </section>
        <section className="py-16 sm:py-20">
          <Container>
            <h2 className={headingClass}>{copy.setupHeading}</h2>
            <p className={`${paragraphClass} max-w-3xl`}>{copy.setupIntroduction}</p>
            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              {copy.setupItems.map((item, index) => {
                const Icon = icons[index]
                return (
                  <article key={item.title} className="rounded-lg border border-[#e6dbc9] bg-white p-6 sm:p-8">
                    <Icon className="mb-6 h-7 w-7 text-[#80613a]" aria-hidden="true" />
                    <h3 className="font-heading text-2xl font-bold">{item.title}</h3>
                    <p className="mt-4 leading-relaxed text-muted-foreground">{item.description}</p>
                  </article>
                )
              })}
            </div>
          </Container>
        </section>
        <section className="border-y border-[#e6dbc9] bg-[#f8f5ef] py-16 sm:py-20">
          <Container>
            <h2 className={headingClass}>{copy.processHeading}</h2>
            <ol className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {copy.processSteps.map((step, index) => (
                <li key={step.title} className="border-t border-[#c8a97e] pt-6">
                  <span className="font-heading text-3xl text-[#80613a]" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                  <h3 className="font-heading mt-4 text-2xl font-bold">{step.title}</h3>
                  <p className="mt-3 leading-relaxed text-muted-foreground">{step.description}</p>
                </li>
              ))}
            </ol>
            <div className="mt-10 rounded-lg border border-[#e6dbc9] bg-white p-6 sm:p-8">
              <h3 className="font-heading text-2xl font-bold">{copy.ownershipHeading}</h3>
              <p className="mt-4 leading-relaxed text-muted-foreground">{copy.ownershipDescription}</p>
            </div>
          </Container>
        </section>
        <section className="py-16 sm:py-20">
          <Container>
            <div className="mx-auto max-w-3xl">
              <h2 className={headingClass}>{copy.audienceHeading}</h2>
              <p className={paragraphClass}>{copy.audienceIntroduction}</p>
              <ul className="mt-7 space-y-4">
                {copy.audienceItems.map((item) => <li key={item} className="flex gap-3 leading-relaxed text-muted-foreground"><Check className="mt-1 h-5 w-5 shrink-0 text-[#80613a]" aria-hidden="true" />{item}</li>)}
              </ul>
            </div>
          </Container>
        </section>
        <section className="border-y border-[#e6dbc9] bg-[#f8f5ef] py-16 sm:py-20">
          <Container>
            <div className="mx-auto max-w-3xl">
              <h2 className={headingClass}>{copy.faqHeading}</h2>
              <div className="mt-8 space-y-4">
                {copy.faqItems.map(({ question, answer }) => (
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
        <section className="py-16 sm:py-20">
          <Container>
            <div className="mx-auto max-w-3xl text-center">
              <h2 className={headingClass}>{copy.finalHeading}</h2>
              <p className={paragraphClass}>{copy.finalDescription}</p>
              <Link href={bookingHref} className={`${buttonClass} mt-8`}>{copy.primaryCta}</Link>
              <p className="mt-7 leading-relaxed text-muted-foreground">
                {copy.nextStepDescription}{" "}
                <Link href={hrefForLocale("/services/local-seo", locale)} className="font-semibold text-[#80613a] underline decoration-[#c8a97e] underline-offset-4 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#80613a]">{copy.nextStepLabel}</Link>.
              </p>
            </div>
          </Container>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  )
}
