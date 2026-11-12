import Link from "next/link"
import { ChevronDown } from "lucide-react"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import Container from "@/components/shared/Container"
import type { WebDesignContent, WebDesignText } from "@/content/types/web-design"
import { SITE_CONFIG } from "@/lib/constants"
import { alternatesFor, hrefForLocale, type Locale } from "@/lib/i18n"
import { webDesignCities } from "@/lib/page-data/web-design-cities"

const headingClass = "font-heading text-3xl font-bold leading-tight text-foreground sm:text-4xl"
const paragraphClass = "mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg"
const buttonClass = "inline-flex min-h-12 items-center justify-center rounded-sm bg-[#80613a] px-6 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-[#634927] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#80613a]"
const linkClass = "font-semibold text-[#80613a] underline decoration-[#c8a97e] underline-offset-4 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#80613a]"

function LinkedText({ parts, locale }: { parts: WebDesignText; locale: Locale }) {
  return parts.map((part, index) => typeof part === "string" ? part : <Link key={index} href={hrefForLocale(part.href, locale)} className={linkClass}>{part.text}</Link>)
}

export default function WebDesignView({ content: copy, locale }: { content: WebDesignContent; locale: Locale }) {
  const { canonical } = alternatesFor(copy.path)
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${canonical}#service`,
        name: "Web Design",
        serviceType: "Web design",
        description: copy.metadata_description,
        url: canonical,
        provider: { "@id": SITE_CONFIG.organizationId },
        areaServed: { "@type": "Country", name: "United States" },
      },
      {
        "@type": "FAQPage",
        "@id": `${canonical}#faq`,
        mainEntity: copy.faq.items.map(({ question, answer }) => ({
          "@type": "Question",
          name: question,
          acceptedAnswer: {
            "@type": "Answer",
            text: answer.map((part) => typeof part === "string" ? part : part.text).join(""),
          },
        })),
      },
    ],
  }

  return (
    <>
      <Header locale={locale} />
      <main className="font-sans">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />

        <section className="border-b border-[#e6dbc9] bg-[#f8f5ef] py-16 sm:py-24">
          <Container>
            <div className="mx-auto max-w-4xl text-center">
              <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.16em] text-[#80613a]">{copy.eyebrow}</span>
              <h1 className="font-heading text-4xl font-bold leading-tight text-foreground sm:text-6xl">{copy.heading}</h1>
              <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">{copy.introduction}</p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-5">
                <Link href={hrefForLocale("/book-demo", locale)} className={buttonClass}>{copy.primaryCta}</Link>
                <Link href="#included" className={linkClass}>{copy.secondaryCta}</Link>
              </div>
            </div>
          </Container>
        </section>

        <section className="py-16 sm:py-20">
          <Container>
            <h2 className={headingClass}>{copy.websites.heading}</h2>
            <p className={`${paragraphClass} max-w-3xl`}>{copy.websites.introduction}</p>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {copy.websites.items.map((item) => (
                <article key={item.title} className="rounded-lg border border-[#e6dbc9] bg-white p-6 sm:p-8">
                  <h3 className="font-heading text-2xl font-bold">{item.title}</h3>
                  <p className="mt-4 leading-relaxed text-muted-foreground">{item.description}</p>
                </article>
              ))}
            </div>
          </Container>
        </section>

        <section id="included" className="scroll-mt-24 border-y border-[#e6dbc9] bg-[#f8f5ef] py-16 sm:py-20">
          <Container>
            <h2 className={headingClass}>{copy.included.heading}</h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {copy.included.items.map((item) => (
                <article key={item.title} className="rounded-lg border border-[#e6dbc9] bg-white p-6 sm:p-8">
                  <h3 className="font-heading text-2xl font-bold">{item.title}</h3>
                  <p className="mt-4 leading-relaxed text-muted-foreground">{item.description}</p>
                </article>
              ))}
            </div>
          </Container>
        </section>

        <section className="py-16 sm:py-20">
          <Container>
            <div className="mx-auto max-w-3xl">
              <h2 className={headingClass}>{copy.connected.heading}</h2>
              <p className={paragraphClass}><LinkedText parts={copy.connected.description} locale={locale} /></p>
            </div>
          </Container>
        </section>

        <section className="border-y border-[#e6dbc9] bg-[#f8f5ef] py-16 sm:py-20">
          <Container>
            <div className="mx-auto max-w-3xl">
              <h2 className={headingClass}>{copy.pricing.heading}</h2>
              <p className={paragraphClass}>{copy.pricing.introduction}</p>
              <h3 className="font-heading mt-8 text-2xl font-bold">{copy.pricing.factorsHeading}</h3>
              <ul className="mt-5 list-disc space-y-3 pl-5 text-muted-foreground">
                {copy.pricing.factors.map((factor) => <li key={factor} className="pl-1 leading-relaxed">{factor}</li>)}
              </ul>
              <p className={paragraphClass}><LinkedText parts={copy.pricing.closing} locale={locale} /></p>
            </div>
          </Container>
        </section>

        <section className="py-16 sm:py-20">
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

        <section className="border-y border-[#e6dbc9] bg-[#f8f5ef] py-16 sm:py-20">
          <Container>
            <h2 className={headingClass}>{copy.cities.heading}</h2>
            <p className={`${paragraphClass} max-w-3xl`}>{copy.cities.introduction}</p>
            <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {webDesignCities.map((city) => (
                <li key={city.path}>
                  <Link href={hrefForLocale(city.path, locale)} className={`${linkClass} font-heading block h-full rounded-lg border border-[#e6dbc9] bg-white p-6 text-xl transition-colors hover:border-[#c8a97e] sm:p-8`}>
                    {locale === "es" && "esCity" in city ? city.esCity : city.city}
                  </Link>
                </li>
              ))}
            </ul>
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
                      {question}<ChevronDown className="h-5 w-5 shrink-0 text-[#80613a] transition-transform group-open:rotate-180 motion-reduce:transition-none" aria-hidden="true" />
                    </summary>
                    <p className="px-6 pb-6 leading-relaxed text-muted-foreground"><LinkedText parts={answer} locale={locale} /></p>
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
              <Link href={hrefForLocale("/book-demo", locale)} className={`${buttonClass} mt-8`}>{copy.primaryCta}</Link>
              <p className="mt-6"><Link href={hrefForLocale("/contact", locale)} className={linkClass}>{copy.final.contactLabel}</Link></p>
            </div>
          </Container>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  )
}
