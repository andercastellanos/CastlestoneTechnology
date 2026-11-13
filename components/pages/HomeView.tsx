import Footer from "@/components/layout/Footer"
import Header from "@/components/layout/Header"
import type { HomeContent } from "@/content/types/home"
import { SITE_CONFIG } from "@/lib/constants"
import { resolveContent } from "@/lib/content"
import { hrefForLocale, type Locale } from "@/lib/i18n"
import { getHomeData, homeNumbers } from "@/lib/page-data/home"
import Link from "next/link"

const goldButton =
  "inline-flex h-11 items-center justify-center rounded-sm bg-[#c8a97e] px-6 text-sm font-medium text-white transition-colors hover:bg-[#b69468]"

const goldOutlineButton =
  "inline-flex h-11 items-center justify-center rounded-sm border border-[#c8a97e] px-6 text-sm font-medium text-[#c8a97e] transition-colors hover:bg-[#c8a97e] hover:text-white"

export default function HomeView({ content, locale }: { content: HomeContent; locale: Locale }) {
  const copy = resolveContent(content, homeNumbers)
  const { heroCommitments, techSolutions, supportCards } = getHomeData(copy)
  const siteUrl = new URL("/", SITE_CONFIG.url).href

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}#website`,
        name: SITE_CONFIG.name,
        url: siteUrl,
        description: copy.schemaDescription,
        publisher: { "@id": SITE_CONFIG.organizationId },
      },
    ],
  }

  return (
    <div className="min-h-screen bg-white">
      <Header locale={locale} />

      <main>
        {/* ── Hero: Technology Solutions ───────────────────── */}
        <section className="mx-auto flex w-full max-w-5xl flex-col items-center px-6 pb-20 pt-24 text-center sm:pt-28">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c8a97e]">
            {copy.heroEyebrow}
          </p>

          <h1 className="mt-5 max-w-4xl text-5xl leading-tight tracking-tight text-[#222222] [font-family:var(--font-heading)] sm:text-6xl">
            {copy.heroHeading}
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[#6b7280] [font-family:var(--font-sans)]">
            {copy.heroDescription}
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link href={hrefForLocale("/book-demo", locale)} className={goldButton}>
              {copy.heroPrimaryCta}
            </Link>
            <Link href="#what-we-build" className={goldOutlineButton}>
              {copy.heroSecondaryCta}
            </Link>
          </div>

          <div className="mt-14 grid w-full max-w-3xl grid-cols-1 gap-6 border-t border-[#e6dbc9] pt-10 sm:grid-cols-3">
            {heroCommitments.map((item) => (
              <div key={item.value} className="flex flex-col items-center gap-2">
                <p className="text-2xl leading-none text-[#c8a97e] [font-family:var(--font-heading)] sm:text-3xl">
                  {item.value}
                </p>
                <p className="text-sm text-[#6b7280]">{item.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── What We Build ────────────────────────────────── */}
        <section
          id="what-we-build"
          className="scroll-mt-24 border-y border-[#e6dbc9] bg-[#f8f5ef] py-20"
        >
          <div className="mx-auto w-full max-w-5xl px-6">
            <div className="mb-12 text-center">
              <h2 className="font-heading text-4xl font-bold text-[#222222] sm:text-5xl">
                {copy.servicesHeading}
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-[#6b7280]">
                {copy.servicesDescription}
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {techSolutions.map(({ icon: Icon, title, description, href }) => (
                <div
                  key={title}
                  className="rounded-xl border border-[#e5e5e5] bg-white p-6 transition-shadow hover:shadow-md"
                >
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-md bg-[#c8a97e]/10">
                    <Icon className="h-5 w-5 text-[#c8a97e]" aria-hidden="true" />
                  </div>
                  <h3 className="font-semibold text-[#222222]">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#6b7280]">{description}</p>
                  {href && (
                    <Link
                      href={hrefForLocale(href, locale)}
                      className="mt-4 inline-block text-sm font-medium text-[#c8a97e] transition-colors hover:text-[#b69468] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c8a97e]"
                    >
                      {copy.serviceLearnMore}
                    </Link>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-10 text-center">
              <Link
                href={hrefForLocale("/services/technology-solutions", locale)}
                className="text-sm font-medium text-[#c8a97e] transition-colors hover:text-[#b69468]"
              >
                {copy.servicesCta}
              </Link>
            </div>
          </div>
        </section>

        {/* ── Virtual Support Teams ────────────────────────── */}
        <section className="mx-auto w-full max-w-5xl px-6 py-20">
          <div className="mb-12 text-center">
            <h2 className="font-heading text-4xl font-bold text-[#222222] sm:text-5xl">
              {copy.supportHeading}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[#6b7280]">
              {copy.supportDescription}
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            {supportCards.map((card) => (
              <div
                key={card.title}
                className="flex flex-col rounded-xl border border-[#e5e5e5] bg-white p-8 transition-shadow hover:shadow-md"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="font-heading text-2xl font-bold text-[#222222]">{card.title}</h3>
                </div>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-[#6b7280]">
                  {card.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {card.chips.map((chip) => (
                    <span
                      key={chip}
                      className="rounded-full border border-[#c8a97e]/30 bg-[#c8a97e]/10 px-2.5 py-0.5 text-xs font-medium text-[#c8a97e]"
                    >
                      {chip}
                    </span>
                  ))}
                </div>

                <Link
                  href={hrefForLocale(card.href, locale)}
                  className="mt-6 inline-flex h-10 items-center justify-center rounded-sm border border-[#c8a97e] px-5 text-sm font-medium text-[#c8a97e] transition-colors hover:bg-[#c8a97e] hover:text-white"
                >
                  {copy.supportLearnMore}
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* ── Closing CTA ──────────────────────────────────── */}
        <section className="bg-[#c8a97e] py-20">
          <div className="mx-auto w-full max-w-5xl px-6 text-center">
            <h2 className="font-heading text-4xl font-bold text-white sm:text-5xl">
              {copy.ctaHeading}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-white/90">
              {copy.ctaDescription}
            </p>
            <Link
              href={hrefForLocale("/book-demo", locale)}
              className="mt-8 inline-flex h-11 items-center justify-center rounded-sm border-2 border-white px-8 text-sm font-medium text-white transition-colors hover:bg-white hover:text-[#c8a97e]"
            >
              {copy.ctaLabel}
            </Link>
          </div>
        </section>
      </main>

      <Footer locale={locale} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
    </div>
  )
}
