import Footer from "@/components/layout/Footer"
import Header from "@/components/layout/Header"
import Container from "@/components/shared/Container"
import type { TechnologySolutionsContent } from "@/content/types/technology-solutions"
import { resolveContent } from "@/lib/content"
import { hrefForLocale, type Locale } from "@/lib/i18n"
import { getTechnologySolutionsData, technologySolutionsNumbers } from "@/lib/page-data/technology-solutions"
import Link from "next/link"

export default function TechnologySolutionsView({ content, locale }: { content: TechnologySolutionsContent; locale: Locale }) {
  const copy = resolveContent(content, technologySolutionsNumbers)
  const { stats, capabilities, engagementModels, qualityPillars } = getTechnologySolutionsData(copy)
  return (
    <>
      <Header locale={locale} />
      <main>
        {/* Hero */}
        <section className="py-20 bg-background">
          <Container>
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="font-heading">
                <span className="block text-2xl font-normal text-muted-foreground tracking-wide mb-3">
                  {copy.heroEyebrow}
                </span>
                <span className="block text-5xl font-bold text-foreground leading-tight sm:text-6xl">
                  {copy.heroHeadingFirstLine}{" "}
                  <span className="block sm:inline">{copy.heroHeadingSecondLine}</span>
                </span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
                {copy.heroDescription}
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link
                  href={hrefForLocale("/book-demo", locale)}
                  className="inline-flex h-11 items-center justify-center rounded-sm bg-[#c8a97e] px-6 text-sm font-medium text-white transition-colors hover:bg-[#b69468]"
                >
                  {copy.heroPrimaryCta}
                </Link>
                <Link
                  href={hrefForLocale("/book-demo", locale)}
                  className="inline-flex h-11 items-center justify-center rounded-sm border border-[#c8a97e] px-6 text-sm font-medium text-[#c8a97e] transition-colors hover:bg-[#c8a97e] hover:text-white"
                >
                  {copy.heroSecondaryCta}
                </Link>
              </div>
            </div>
          </Container>
        </section>

        {/* Stat Bar */}
        <section className="border-y border-[#e6dbc9] bg-[#f8f5ef] py-12">
          <Container>
            <div className="grid grid-cols-2 gap-y-8 sm:grid-cols-4">
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className={`text-center ${
                    i < stats.length - 1 ? "sm:border-r sm:border-[#c8a97e]/30" : ""
                  }`}
                >
                  <p className="font-heading text-3xl font-bold text-[#c8a97e] sm:text-4xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-sm text-[#222222]">{stat.label}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* What We Build */}
        <section className="py-20 bg-background">
          <Container>
            <h2 className="font-heading text-4xl font-bold text-center text-foreground mb-12">
              {copy.capabilitiesHeading}
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {capabilities.map((cap) => (
                <div
                  key={cap.title}
                  className="rounded-lg border border-[#c8a97e]/30 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-md bg-[#f8f5ef] text-xl">
                    {cap.icon}
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{cap.title}</h3>
                  <p className="text-sm text-muted-foreground">{cap.description}</p>
                  {cap.href && (
                    <Link
                      href={hrefForLocale(cap.href, locale)}
                      className="mt-4 inline-block text-sm font-medium text-[#c8a97e] transition-colors hover:text-[#b69468] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c8a97e]"
                    >
                      {copy.capabilityCta}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Engagement Models */}
        <section className="py-20 bg-[#f8f5ef]">
          <Container>
            <h2 className="font-heading text-4xl font-bold text-center text-foreground mb-12">
              {copy.engagementHeading}
            </h2>
            <div className="grid gap-8 sm:grid-cols-3">
              {engagementModels.map((model) => (
                <div
                  key={model.label}
                  className={`relative flex flex-col rounded-lg bg-white p-8 shadow-sm ${
                    model.popular
                      ? "border-2 border-[#c8a97e] shadow-md"
                      : "border border-[#e6dbc9]"
                  }`}
                >
                  {model.popular && (
                    <span className="absolute right-3 top-3 rounded-full bg-[#c8a97e] px-2.5 py-0.5 text-xs font-medium text-white">
                      {copy.popularLabel}
                    </span>
                  )}
                  <p className="text-xs uppercase tracking-[0.12em] text-[#c8a97e] font-medium mb-2">
                    {model.label}
                  </p>
                  <p className="font-heading text-2xl font-bold text-foreground mb-1">
                    {model.price}
                  </p>
                  <p className="text-sm text-muted-foreground mb-6">
                    {copy.bestForLabel}{model.bestFor}
                  </p>
                  <ul className="mb-8 flex-1 space-y-2">
                    {model.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm text-foreground">
                        <span className="mt-0.5 font-bold text-[#c8a97e]">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={hrefForLocale("/book-demo", locale)}
                    className={`inline-flex h-10 items-center justify-center rounded-sm px-4 text-sm font-medium transition-colors ${
                      model.popular
                        ? "bg-[#c8a97e] text-white hover:bg-[#b69468]"
                        : "border border-[#c8a97e] text-[#c8a97e] hover:bg-[#c8a97e] hover:text-white"
                    }`}
                  >
                    {model.cta}
                  </Link>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Quality Pillars */}
        <section className="py-20 bg-gray-950">
          <Container>
            <div className="grid gap-10 text-center sm:grid-cols-3">
              {qualityPillars.map((pillar) => (
                <div key={pillar.title}>
                  <p className="mb-4 text-4xl">{pillar.icon}</p>
                  <h3 className="font-heading text-xl font-bold text-white mb-3">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-gray-400">{pillar.description}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Bottom CTA */}
        <section className="py-20 bg-[#c8a97e]">
          <Container>
            <div className="text-center">
              <h2 className="font-heading text-4xl font-bold text-white mb-4">
                {copy.ctaHeading}
              </h2>
              <p className="mb-8 max-w-xl mx-auto text-lg text-white/90">
                {copy.ctaDescription}
              </p>
              <Link
                href={hrefForLocale("/book-demo", locale)}
                className="inline-flex h-11 items-center justify-center rounded-sm border-2 border-white px-8 text-sm font-medium text-white transition-colors hover:bg-white hover:text-[#c8a97e]"
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
