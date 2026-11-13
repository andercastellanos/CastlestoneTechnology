import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import Container from "@/components/shared/Container"
import { SITE_CONFIG } from "@/lib/constants"
import { resolveContent } from "@/lib/content"
import { alternatesFor, hrefForLocale, type Locale } from "@/lib/i18n"
import {
  aiOutboundCallingLinks,
  aiOutboundCallingNumbers,
  aiOutboundCallingPricing,
  getAiOutboundCallingData,
  type AiOutboundCallingContent,
} from "@/lib/page-data/ai-outbound-calling"
import { ArrowUpRight, ChevronDown, PhoneOutgoing } from "lucide-react"
import Link from "next/link"

const headingClass = "font-heading text-3xl font-bold leading-tight text-foreground sm:text-4xl"
const paragraphClass = "mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg"
const linkClass = "inline-flex items-center gap-2 font-semibold text-[#80613a] underline decoration-[#c8a97e] underline-offset-4 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#80613a]"
const buttonClass = "inline-flex min-h-12 items-center justify-center rounded-sm bg-[#80613a] px-6 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-[#634927] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#80613a]"
const secondaryButtonClass = "inline-flex min-h-12 items-center justify-center rounded-sm border border-[#80613a] bg-white px-6 py-3 text-center text-sm font-semibold text-[#80613a] transition-colors hover:bg-[#f8f5ef] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#80613a]"

function Ctas({ copy, locale }: { copy: AiOutboundCallingContent; locale: Locale }) {
  return (
    <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
      <a href={aiOutboundCallingLinks.product} target="_blank" rel="noopener" className={buttonClass}>
        {copy.startCta}
        <ArrowUpRight className="ml-2 h-4 w-4 shrink-0" aria-hidden="true" />
      </a>
      <Link href={hrefForLocale(aiOutboundCallingLinks.demo, locale)} className={secondaryButtonClass}>{copy.consultCta}</Link>
    </div>
  )
}

export default function AiOutboundCallingView({ content, locale }: { content: AiOutboundCallingContent; locale: Locale }) {
  const copy = resolveContent(content, aiOutboundCallingNumbers)
  const { steps, outcomes, faqs } = getAiOutboundCallingData(copy)
  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: copy.outboundHeading,
    serviceType: copy.outboundHeading,
    description: copy.description,
    url: alternatesFor(aiOutboundCallingLinks[locale]).canonical,
    brand: { "@type": "Brand", name: "The Lead Caller", url: aiOutboundCallingLinks.product },
    provider: {
      "@id": SITE_CONFIG.organizationId,
    },
    areaServed: { "@type": "Country", name: "United States" },
    offers: {
      "@type": "Offer",
      url: aiOutboundCallingLinks.product,
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: aiOutboundCallingPricing.perConnectedMinute,
        priceCurrency: "USD",
        unitText: "connected minute",
      },
    },
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
                <PhoneOutgoing className="h-6 w-6" aria-hidden="true" />
              </span>
              <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.16em] text-[#80613a]">{copy.heroEyebrow}</span>
              <h1 className="font-heading text-4xl font-bold leading-tight text-foreground sm:text-6xl">{copy.heroHeading}</h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">{copy.heroDescription}</p>
              <Ctas copy={copy} locale={locale} />
            </div>
          </Container>
        </section>

        <section className="bg-background py-16 sm:py-20">
          <Container>
            <h2 className={`${headingClass} mx-auto mb-10 max-w-3xl text-center`}>{copy.stepsHeading}</h2>
            <ol className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2 lg:grid-cols-3">
              {steps.map(({ heading, description }, index) => (
                <li key={heading} className="rounded-xl border border-[#e6dbc9] bg-white p-6 sm:p-8">
                  <span className="font-heading text-lg font-bold text-[#c8a97e]">{String(index + 1).padStart(2, "0")}</span>
                  <h3 className="mt-2 font-heading text-2xl font-bold leading-snug text-foreground">{heading}</h3>
                  <p className="mt-3 leading-relaxed text-muted-foreground">{description}</p>
                </li>
              ))}
            </ol>
          </Container>
        </section>

        <section className="border-y border-[#e6dbc9] bg-[#f8f5ef] py-16 sm:py-20">
          <Container>
            <div className="mx-auto max-w-3xl">
              <h2 className={headingClass}>{copy.outcomesHeading}</h2>
              <p className={paragraphClass}>{copy.outcomesDescription}</p>
              <ul className="mt-6 flex flex-wrap gap-3">
                {outcomes.map((outcome) => (
                  <li key={outcome} className="rounded-full border border-[#e6dbc9] bg-white px-4 py-2 text-sm font-medium text-foreground">{outcome}</li>
                ))}
              </ul>
            </div>
          </Container>
        </section>

        <section className="bg-background py-16 sm:py-20">
          <Container>
            <div className="mx-auto max-w-3xl">
              <h2 className={headingClass}>{copy.consentHeading}</h2>
              <p className={paragraphClass}>{copy.consentDescription}</p>
            </div>
          </Container>
        </section>

        <section className="border-y border-[#e6dbc9] bg-[#f8f5ef] py-16 sm:py-20">
          <Container>
            <div className="mx-auto max-w-3xl rounded-xl border border-[#e6dbc9] bg-white p-6 sm:p-10">
              <h2 className={headingClass}>{copy.pricingHeading}</h2>
              <p className={paragraphClass}>{copy.pricingDescription}</p>
              <p className={paragraphClass}>
                {copy.pricingSetupQuestion}{" "}
                <Link href={hrefForLocale(aiOutboundCallingLinks.demo, locale)} className={linkClass}>{copy.consultCta}</Link>
              </p>
              <a href={aiOutboundCallingLinks.product} target="_blank" rel="noopener" className={`${linkClass} mt-6`}>
                {copy.pricingLink}
                <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" />
              </a>
            </div>
          </Container>
        </section>

        <section className="bg-background py-16 sm:py-20">
          <Container>
            <h2 className={`${headingClass} mx-auto mb-10 max-w-3xl text-center`}>{copy.comparisonHeading}</h2>
            <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
              <article className="rounded-xl border border-[#e6dbc9] bg-white p-6 sm:p-8">
                <h3 className="font-heading text-2xl font-bold text-foreground">{copy.outboundHeading}</h3>
                <p className="mt-4 leading-relaxed text-muted-foreground">{copy.outboundDescription}</p>
              </article>
              <article className="rounded-xl border border-[#e6dbc9] bg-white p-6 sm:p-8">
                <h3 className="font-heading text-2xl font-bold text-foreground">{copy.receptionistHeading}</h3>
                <p className="mt-4 leading-relaxed text-muted-foreground">{copy.receptionistDescription}</p>
                <Link href={hrefForLocale(aiOutboundCallingLinks.receptionist, locale)} className={`${linkClass} mt-6`}>{copy.receptionistLink}</Link>
              </article>
            </div>
          </Container>
        </section>

        <section className="border-y border-[#e6dbc9] bg-[#f8f5ef] py-16 sm:py-20">
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

        <section className="bg-background py-16 sm:py-20">
          <Container>
            <div className="mx-auto max-w-3xl text-center">
              <h2 className={headingClass}>{copy.finalHeading}</h2>
              <Ctas copy={copy} locale={locale} />
            </div>
          </Container>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  )
}
