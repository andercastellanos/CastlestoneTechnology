import WebDesignCityLinks from "@/components/shared/WebDesignCityLinks"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import Container from "@/components/shared/Container"
import { SITE_CONFIG } from "@/lib/constants"
import { resolveContent } from "@/lib/content"
import { alternatesFor, hrefForLocale, type Locale } from "@/lib/i18n"
import { aiReceptionistLinks, aiReceptionistNumbers, aiReceptionistStudy, getAiReceptionistData, type AiReceptionistContent } from "@/lib/page-data/ai-receptionist"
import { ArrowUpRight, ChevronDown, PhoneCall } from "lucide-react"
import Link from "next/link"

const headingClass = "font-heading text-3xl font-bold leading-tight text-foreground sm:text-4xl"
const paragraphClass = "mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg"
const linkClass = "inline-flex items-center gap-2 font-semibold text-[#80613a] underline decoration-[#c8a97e] underline-offset-4 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#80613a]"
const buttonClass = "inline-flex min-h-12 items-center justify-center rounded-sm bg-[#80613a] px-6 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-[#634927] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#80613a]"

export default function AiReceptionistView({ content, locale }: { content: AiReceptionistContent; locale: Locale }) {
  const copy = resolveContent(content, aiReceptionistNumbers)
  const { industries, faqs } = getAiReceptionistData(copy)
  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: copy.aiHeading,
    description: copy.description,
    url: alternatesFor(aiReceptionistLinks[locale]).canonical,
    provider: {
      "@id": SITE_CONFIG.organizationId,
    },
    areaServed: { "@type": "Country", name: "United States" },
  }

  return (
    <>
      <Header locale={locale} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(service).replace(/</g, "\\u003c") }} />
      <main className="font-sans">
        <section className="border-b border-[#e6dbc9] bg-[#f8f5ef] py-16 sm:py-24">
          <Container>
            <div className="mx-auto max-w-4xl text-center">
              <span className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-full border border-[#e6dbc9] bg-white text-[#80613a]">
                <PhoneCall className="h-6 w-6" aria-hidden="true" />
              </span>
              <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.16em] text-[#80613a]">{copy.heroEyebrow}</span>
              <h1 className="font-heading text-4xl font-bold leading-tight text-foreground sm:text-6xl">{copy.heroHeading}</h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">{copy.heroDescription}</p>
              <Link href={hrefForLocale(aiReceptionistLinks.demo, locale)} className={`${buttonClass} mt-8`}>{copy.demoCta}</Link>
            </div>
          </Container>
        </section>

        <section className="bg-background py-16 sm:py-20">
          <Container>
            <div className="mx-auto max-w-3xl">
              <h2 className={headingClass}>{copy.missedCallsHeading}</h2>
              <p className={`${paragraphClass} font-semibold text-foreground`}>{copy.missedCallsStat}</p>
              <p className="mt-3 text-sm text-muted-foreground">
                <a href={aiReceptionistStudy.sourceUrl} className={linkClass}>{copy.missedCallsCredit}</a>
              </p>
              <p className={paragraphClass}>{copy.missedCallsDescription}</p>
              <Link href={aiReceptionistLinks.missedCalls} className={`${linkClass} mt-6`}>{copy.missedCallsLink}<ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" /></Link>
            </div>
          </Container>
        </section>

        <section className="border-y border-[#e6dbc9] bg-[#f8f5ef] py-16 sm:py-20">
          <Container>
            <div className="mx-auto max-w-3xl">
              <h2 className={headingClass}>{copy.capabilitiesHeading}</h2>
              <p className={paragraphClass}>{copy.capabilitiesDescription}</p>
            </div>
          </Container>
        </section>

        <section className="bg-background py-16 sm:py-20">
          <Container>
            <h2 className={`${headingClass} mx-auto mb-10 max-w-3xl text-center`}>{copy.industriesHeading}</h2>
            <div className="grid gap-6 lg:grid-cols-3">
              {industries.map(({ heading, description }) => (
                <article key={heading} className="rounded-xl border border-[#e6dbc9] bg-white p-6 sm:p-8">
                  <h3 className="font-heading text-2xl font-bold leading-snug text-foreground">{heading}</h3>
                  <p className="mt-4 leading-relaxed text-muted-foreground">{description}</p>
                </article>
              ))}
            </div>
          </Container>
        </section>

        <section className="border-y border-[#e6dbc9] bg-[#f8f5ef] py-16 sm:py-20">
          <Container>
            <div className="mx-auto max-w-3xl">
              <h2 className={headingClass}>{copy.bookingHeading}</h2>
              <p className={paragraphClass}>{copy.bookingDescription}</p>
              <p className={paragraphClass}>
                {copy.webDesignDescription}{" "}
                <WebDesignCityLinks locale={locale} className={linkClass} />.
              </p>
            </div>
          </Container>
        </section>

        <section className="bg-background py-16 sm:py-20">
          <Container>
            <div className="mx-auto max-w-3xl rounded-xl border border-[#e6dbc9] p-6 sm:p-10">
              <h2 className={headingClass}>{copy.pricingHeading}</h2>
              <p className="mt-6 text-xl font-semibold text-[#80613a]">{copy.pricingLabel}</p>
              <p className={paragraphClass}>{copy.pricingDescription}</p>
            </div>
          </Container>
        </section>

        <section className="border-y border-[#e6dbc9] bg-[#f8f5ef] py-16 sm:py-20">
          <Container>
            <h2 className={`${headingClass} mx-auto mb-10 max-w-3xl text-center`}>{copy.comparisonHeading}</h2>
            <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
              <article className="rounded-xl border border-[#e6dbc9] bg-white p-6 sm:p-8">
                <h3 className="font-heading text-2xl font-bold text-foreground">{copy.aiHeading}</h3>
                <p className="mt-4 leading-relaxed text-muted-foreground">{copy.aiDescription}</p>
              </article>
              <article className="rounded-xl border border-[#e6dbc9] bg-white p-6 sm:p-8">
                <h3 className="font-heading text-2xl font-bold text-foreground">{copy.frontDeskHeading}</h3>
                <p className="mt-4 leading-relaxed text-muted-foreground">{copy.frontDeskDescription}</p>
                <Link href={hrefForLocale(aiReceptionistLinks.frontDesk, locale)} className={`${linkClass} mt-6`}>{copy.frontDeskLink}</Link>
              </article>
            </div>
          </Container>
        </section>

        <section className="bg-background py-16 sm:py-20">
          <Container>
            <div className="mx-auto max-w-3xl">
              <h2 className={`${headingClass} mb-8`}>{copy.faqHeading}</h2>
              <div className="space-y-4">
                {faqs.map(({ question, answer }) => (
                  <details key={question} className="group rounded-lg border border-[#e6dbc9] bg-white">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-lg p-6 font-semibold text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#80613a] [&::-webkit-details-marker]:hidden">
                      {question}<ChevronDown className="h-5 w-5 shrink-0 text-[#80613a] transition-transform group-open:rotate-180 motion-reduce:transition-none" aria-hidden="true" />
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
              <h2 className={headingClass}>{copy.finalHeading}</h2>
              <p className={paragraphClass}>{copy.finalDescription}</p>
              <Link href={hrefForLocale(aiReceptionistLinks.demo, locale)} className={`${buttonClass} mt-8`}>{copy.demoCta}</Link>
            </div>
          </Container>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  )
}
