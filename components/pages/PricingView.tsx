import Link from "next/link"
import Footer from "@/components/layout/Footer"
import Header from "@/components/layout/Header"
import { servicesHubContent as englishServicesHubContent } from "@/content/en/services-hub"
import { servicesHubContent as spanishServicesHubContent } from "@/content/es/services-hub"
import type { PricingContent } from "@/content/types/pricing"
import { resolveContent } from "@/lib/content"
import { hrefForLocale, type Locale } from "@/lib/i18n"
import { getPricingPlans, pricingNumbers, type PricingPlan } from "@/lib/page-data/pricing"

function PricingCard({ plan, copy, locale, inDevelopment = false }: { plan: PricingPlan; copy: PricingContent; locale: Locale; inDevelopment?: boolean }) {
  const cardClasses = plan.popular
    ? "relative rounded-sm border border-[#c8a97e] bg-white p-8"
    : "relative rounded-sm border border-[#e6dbc9] bg-white p-8 transition-colors duration-200 hover:border-[#c8a97e]"

  return (
    <article className={cardClasses}>
      {plan.popular ? (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#c8a97e] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-white">
          {copy.popularLabel}
        </div>
      ) : null}

      <h3 className="text-2xl text-[#222222] [font-family:var(--font-heading)]">
        {plan.name}
      </h3>
      {inDevelopment && (
        <p className="mt-4 inline-block rounded-sm border border-[#c8a97e] bg-[#f8f5ef] px-3 py-1 text-sm font-semibold text-[#80613a]">
          {(locale === "es" ? spanishServicesHubContent : englishServicesHubContent).developmentLabel}
        </p>
      )}
      <p className="mt-2 text-3xl leading-none text-[#c8a97e] [font-family:var(--font-heading)]">
        {plan.price}
      </p>

      <ul className="mt-6 space-y-3">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-sm text-[#555555]">
            <span className="mt-[1px] text-[#c8a97e]">✓</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <Link
        href={hrefForLocale("/book-demo", locale)}
        className="mt-8 inline-flex h-10 items-center justify-center rounded-sm border border-[#c8a97e] px-5 text-sm font-medium text-[#c8a97e] transition-colors hover:bg-[#c8a97e] hover:text-white"
      >
        {copy.planCta}
      </Link>
    </article>
  )
}

export default function PricingView({ content, locale }: { content: PricingContent; locale: Locale }) {
  const copy = resolveContent(content, pricingNumbers)
  const { frontDeskPlans, virtualAssistantPlans } = getPricingPlans(copy)
  return (
    <div className="min-h-screen bg-white">
      <Header locale={locale} />

      <main>
        <section className="mx-auto w-full max-w-6xl px-6 pb-16 pt-24 text-center lg:px-10">
          <h1 className="text-4xl tracking-tight text-[#222222] [font-family:var(--font-heading)] sm:text-5xl lg:text-6xl">
            {copy.heading}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-[#6b7280]">
            {copy.introduction}
          </p>
        </section>

        <section className="mx-auto w-full max-w-6xl px-6 py-10 lg:px-10">
          <h2 className="text-center text-4xl text-[#222222] [font-family:var(--font-heading)] sm:text-5xl">
            {copy.frontDeskHeading}
          </h2>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {frontDeskPlans.map((plan) => (
              <PricingCard key={plan.name} plan={plan} copy={copy} locale={locale} inDevelopment />
            ))}
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-6 py-20 lg:px-10">
          <h2 className="text-center text-4xl text-[#222222] [font-family:var(--font-heading)] sm:text-5xl">
            {copy.assistantHeading}
          </h2>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {virtualAssistantPlans.map((plan) => (
              <PricingCard key={plan.name} plan={plan} copy={copy} locale={locale} />
            ))}
          </div>
        </section>

        <section className="border-y border-[#e6dbc9] bg-[#fafaf8]">
          <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-center gap-4 px-6 py-10 text-center sm:flex-row sm:gap-8 lg:px-10">
            <p className="text-sm text-[#6b7280]">
              <span className="text-[#c8a97e]">✓</span> {copy.trustCard}
            </p>
            <p className="text-sm text-[#6b7280]">
              <span className="text-[#c8a97e]">✓</span> {copy.trustGuarantee}
            </p>
            <p className="text-sm text-[#6b7280]">
              <span className="text-[#c8a97e]">✓</span> {copy.trustCancellation}
            </p>
          </div>
        </section>
      </main>

      <Footer locale={locale} />
    </div>
  )
}
