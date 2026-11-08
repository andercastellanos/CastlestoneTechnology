import WebDesignCityLinks from "@/components/shared/WebDesignCityLinks"
import Footer from "@/components/layout/Footer"
import Header from "@/components/layout/Header"
import Container from "@/components/shared/Container"
import { resolveContent } from "@/lib/content"
import type { Locale } from "@/lib/i18n"
import {
  getLocalSeoData,
  localSeoNumbers,
  localSeoServiceSchema,
  localSeoSourceUrl,
  type LocalSeoContent,
} from "@/lib/page-data/local-seo"
import { ChevronDown } from "lucide-react"
import Link from "next/link"
import { hrefForLocale } from "@/lib/i18n"

const buttonClass = "inline-flex min-h-11 items-center justify-center rounded-sm bg-[#c8a97e] px-6 py-3 text-center text-sm font-medium text-[#222222] transition-colors hover:bg-[#b69468] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b69468]"

export default function LocalSeoView({ content, locale }: { content: LocalSeoContent; locale: Locale }) {
  const copy = resolveContent(content, localSeoNumbers)
  const { included, steps, faqs } = getLocalSeoData(copy)

  return (
    <>
      <Header locale={locale} />
      <main className="font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localSeoServiceSchema(copy, locale)).replace(/</g, "\\u003c") }}
        />
        <section className="bg-background py-16 sm:py-20">
          <Container>
            <div className="mx-auto max-w-4xl text-center">
              <p className="mb-4 text-sm font-semibold tracking-wide text-[#84633b]">{copy.heroEyebrow}</p>
              <h1 className="font-heading text-5xl font-bold leading-tight text-foreground sm:text-6xl">{copy.heroHeading}</h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">{copy.heroDescription}</p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link href={hrefForLocale("/book-demo", locale)} className={buttonClass}>{copy.primaryCta}</Link>
                <Link href="#included" className="inline-flex min-h-11 items-center justify-center px-4 py-3 text-sm font-medium text-foreground underline decoration-[#c8a97e] underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b69468]">{copy.secondaryCta}</Link>
              </div>
            </div>
          </Container>
        </section>

        <section className="border-y border-[#e6dbc9] bg-[#f8f5ef] py-16">
          <Container>
            <div className="mx-auto max-w-4xl">
              <h2 className="font-heading text-3xl font-bold sm:text-4xl">{copy.numbersHeading}</h2>
              <p className="mt-6 text-xl leading-relaxed text-foreground sm:text-2xl">{copy.currentStat}</p>
              <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
                {copy.sourceLabel}{" "}
                <a href={localSeoSourceUrl} className="underline underline-offset-4 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b69468]">{copy.sourceTitle}</a>
              </p>
            </div>
          </Container>
        </section>

        <section id="included" className="scroll-mt-24 py-16 sm:py-20">
          <Container>
            <div className="mb-10 max-w-2xl">
              <h2 className="font-heading text-4xl font-bold sm:text-5xl">{copy.includedHeading}</h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">{copy.includedDescription}</p>
            </div>
            <div className="grid gap-6 lg:grid-cols-3">
              {included.map(({ title, description }) => (
                <article key={title} className="rounded-lg border border-[#e6dbc9] bg-white p-6 sm:p-8">
                  <h3 className="font-heading text-2xl font-bold">{title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{description}</p>
                </article>
              ))}
            </div>
            <p className="mt-6 leading-relaxed text-muted-foreground">{copy.reportingDescription}</p>
            <p className="mt-6 leading-relaxed text-muted-foreground">
              {copy.webDesignDescription}{" "}
              <WebDesignCityLinks locale={locale} className="font-semibold text-[#84633b] underline underline-offset-4 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b69468]" />.
            </p>
          </Container>
        </section>

        <section className="border-y border-[#e6dbc9] bg-[#f8f5ef] py-16 sm:py-20">
          <Container>
            <h2 className="font-heading mb-10 text-4xl font-bold sm:text-5xl">{copy.stepsHeading}</h2>
            <ol className="grid gap-8 lg:grid-cols-3">
              {steps.map(({ number, title, description }) => (
                <li key={number} className="border-t border-[#c8a97e] pt-6">
                  <span className="font-heading text-4xl text-[#84633b]" aria-hidden="true">{number}</span>
                  <h3 className="font-heading mt-4 text-2xl font-bold">{title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{description}</p>
                </li>
              ))}
            </ol>
          </Container>
        </section>

        <section className="py-16 sm:py-20">
          <Container>
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="font-heading text-4xl font-bold sm:text-5xl">{copy.pricingHeading}</h2>
              <p className="font-heading mt-6 text-3xl font-bold text-[#84633b] sm:text-4xl">{copy.pricingRate}</p>
              <p className="mt-3 font-medium text-foreground">{copy.pricingMultipleLocations}</p>
              <p className="mt-5 leading-relaxed text-muted-foreground">{copy.pricingDescription}</p>
              <Link href={hrefForLocale("/book-demo", locale)} className={`${buttonClass} mt-7`}>{copy.pricingCta}</Link>
            </div>
          </Container>
        </section>

        <section className="border-y border-[#e6dbc9] bg-[#f8f5ef] py-16 sm:py-20">
          <Container>
            <div className="mx-auto max-w-3xl">
              <h2 className="font-heading mb-10 text-center text-4xl font-bold sm:text-5xl">{copy.faqHeading}</h2>
              <div className="space-y-4">
                {faqs.map(({ question, answer }) => (
                  <details key={question} className="group rounded-lg border border-[#e6dbc9] bg-white">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-lg p-6 font-semibold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b69468] [&::-webkit-details-marker]:hidden">
                      {question}
                      <ChevronDown className="h-5 w-5 shrink-0 text-[#84633b] transition-transform group-open:rotate-180 motion-reduce:transition-none" aria-hidden="true" />
                    </summary>
                    <p className="px-6 pb-6 text-sm leading-relaxed text-muted-foreground">{answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </Container>
        </section>

        <section className="bg-gray-950 py-16 sm:py-20">
          <Container>
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="font-heading text-4xl font-bold text-white sm:text-5xl">{copy.ctaHeading}</h2>
              <p className="mt-5 leading-relaxed text-gray-300">{copy.ctaDescription}</p>
              <Link href={hrefForLocale("/book-demo", locale)} className={`${buttonClass} mt-8`}>{copy.primaryCta}</Link>
            </div>
          </Container>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  )
}
