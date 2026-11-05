import Footer from "@/components/layout/Footer"
import Header from "@/components/layout/Header"
import Container from "@/components/shared/Container"
import type { MarketingAutomationContent } from "@/content/types/marketing-automation"
import { resolveContent } from "@/lib/content"
import { hrefForLocale, type Locale } from "@/lib/i18n"
import { getMarketingAutomationData, marketingAutomationNumbers } from "@/lib/page-data/marketing-automation"
import {
ChevronDown
} from "lucide-react"
import Link from "next/link"

export default function MarketingAutomationView({ content, locale }: { content: MarketingAutomationContent; locale: Locale }) {
  const copy = resolveContent(content, marketingAutomationNumbers)
  const { capabilities, steps, compliancePillars, audiences, faqs } = getMarketingAutomationData(copy)
  return (
    <>
      <Header locale={locale} />
      <main className="font-sans">
        {/* Hero */}
        <section className="bg-background py-20">
          <Container>
            <div className="mx-auto max-w-4xl text-center">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-[#c8a97e]">
                {copy.heroEyebrow}
              </p>
              <h1 className="font-heading text-5xl font-bold leading-tight text-foreground sm:text-6xl">
                {copy.heroHeading}
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                {copy.heroDescription}
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link
                  href={hrefForLocale("/book-demo", locale)}
                  className="inline-flex h-11 items-center justify-center rounded-sm bg-[#c8a97e] px-6 text-sm font-medium text-white transition-colors hover:bg-[#b69468] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c8a97e]"
                >
                  {copy.heroPrimaryCta}
                </Link>
                <Link
                  href="#how-it-works"
                  className="inline-flex h-11 items-center justify-center rounded-sm border border-[#c8a97e] px-6 text-sm font-medium text-[#c8a97e] transition-colors hover:bg-[#c8a97e] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c8a97e]"
                >
                  {copy.heroSecondaryCta}
                </Link>
              </div>
            </div>
          </Container>
        </section>

        {/* Capabilities */}
        <section className="border-y border-[#e6dbc9] bg-[#f8f5ef] py-20">
          <Container>
            <div className="mb-12 text-center">
              <h2 className="font-heading text-4xl font-bold text-foreground sm:text-5xl">
                {copy.capabilitiesHeading}
              </h2>
              <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-muted-foreground">
                {copy.capabilitiesDescription}
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {capabilities.map(({ icon: Icon, title, description }) => (
                <article
                  key={title}
                  className="rounded-xl border border-[#e5e5e5] bg-white p-6 transition-shadow hover:shadow-md"
                >
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-md bg-[#c8a97e]/10">
                    <Icon className="h-5 w-5 text-[#c8a97e]" aria-hidden="true" />
                  </div>
                  <h3 className="mb-2 font-semibold text-foreground">{title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {description}
                  </p>
                </article>
              ))}
            </div>
          </Container>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="scroll-mt-24 bg-background py-20">
          <Container>
            <h2 className="font-heading mb-12 text-center text-4xl font-bold text-foreground sm:text-5xl">
              {copy.stepsHeading}
            </h2>
            <ol className="grid gap-8 lg:grid-cols-3">
              {steps.map(({ icon: Icon, number, title, description }) => (
                <li key={number} className="rounded-lg border border-[#e6dbc9] bg-white p-8">
                  <div className="mb-6 flex items-center justify-between">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-[#c8a97e]/10">
                      <Icon className="h-5 w-5 text-[#c8a97e]" aria-hidden="true" />
                    </span>
                    <span className="font-heading text-3xl text-[#c8a97e]" aria-hidden="true">
                      {number}
                    </span>
                  </div>
                  <h3 className="font-heading mb-3 text-2xl font-bold text-foreground">
                    {title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {description}
                  </p>
                </li>
              ))}
            </ol>
          </Container>
        </section>

        {/* Compliance */}
        <section className="bg-gray-950 py-20">
          <Container>
            <div className="mb-12 text-center">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#c8a97e]">
                {copy.complianceEyebrow}
              </p>
              <h2 className="font-heading text-4xl font-bold text-white sm:text-5xl">
                {copy.complianceHeading}
              </h2>
              <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-gray-400">
                {copy.complianceDescription}
              </p>
            </div>
            <div className="grid gap-10 text-center sm:grid-cols-3">
              {compliancePillars.map(({ icon: Icon, title, description }) => (
                <div key={title}>
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-md bg-[#c8a97e]/10">
                    <Icon className="h-5 w-5 text-[#c8a97e]" aria-hidden="true" />
                  </div>
                  <h3 className="font-heading mb-3 text-xl font-bold text-white">
                    {title}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-400">{description}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Who It's For */}
        <section className="bg-background py-20">
          <Container>
            <div className="mb-12 text-center">
              <h2 className="font-heading text-4xl font-bold text-foreground sm:text-5xl">
                {copy.audiencesHeading}
              </h2>
              <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-muted-foreground">
                {copy.audiencesDescription}
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              {audiences.map(({ icon: Icon, title, description }) => (
                <article key={title} className="rounded-xl border border-[#e5e5e5] bg-white p-8">
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-md bg-[#c8a97e]/10">
                    <Icon className="h-5 w-5 text-[#c8a97e]" aria-hidden="true" />
                  </div>
                  <h3 className="font-heading mb-3 text-2xl font-bold text-foreground">
                    {title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {description}
                  </p>
                </article>
              ))}
            </div>
          </Container>
        </section>

        {/* FAQ */}
        <section className="border-y border-[#e6dbc9] bg-[#f8f5ef] py-20">
          <Container>
            <div className="mx-auto max-w-3xl">
              <h2 className="font-heading mb-12 text-center text-4xl font-bold text-foreground sm:text-5xl">
                {copy.faqHeading}
              </h2>
              <div className="space-y-4">
                {faqs.map(({ question, answer }) => (
                  <details key={question} className="group rounded-lg border border-[#e6dbc9] bg-white">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-lg p-6 text-left font-semibold text-foreground transition-colors hover:text-[#b69468] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c8a97e] [&::-webkit-details-marker]:hidden">
                      {question}
                      <ChevronDown
                        className="h-5 w-5 shrink-0 text-[#c8a97e] transition-transform group-open:rotate-180 motion-reduce:transition-none"
                        aria-hidden="true"
                      />
                    </summary>
                    <p className="px-6 pb-6 text-sm leading-relaxed text-muted-foreground">
                      {answer}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* Closing CTA */}
        <section className="bg-[#c8a97e] py-20">
          <Container>
            <div className="text-center">
              <h2 className="font-heading mb-4 text-4xl font-bold text-white sm:text-5xl">
                {copy.ctaHeading}
              </h2>
              <p className="mx-auto mb-8 max-w-xl text-lg leading-relaxed text-white/90">
                {copy.ctaDescription}
              </p>
              <Link
                href={hrefForLocale("/book-demo", locale)}
                className="inline-flex h-11 items-center justify-center rounded-sm border-2 border-white px-8 text-sm font-medium text-white transition-colors hover:bg-white hover:text-[#c8a97e] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                {copy.ctaLabel}
              </Link>
            </div>
          </Container>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  )
}
