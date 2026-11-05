import Footer from "@/components/layout/Footer"
import Header from "@/components/layout/Header"
import Container from "@/components/shared/Container"
import type { VirtualAssistantContent } from "@/content/types/virtual-assistant"
import { resolveContent } from "@/lib/content"
import { hrefForLocale, type Locale } from "@/lib/i18n"
import { getVirtualAssistantData, virtualAssistantNumbers } from "@/lib/page-data/virtual-assistant"
import Link from "next/link"

export default function VirtualAssistantView({ content, locale }: { content: VirtualAssistantContent; locale: Locale }) {
  const copy = resolveContent(content, virtualAssistantNumbers)
  const { iconMap, heroStats, steps, whyLatAm, roles, pricing } = getVirtualAssistantData(copy)
  return (
    <>
      <Header locale={locale} />
      <main>

        {/* ── Section 1: Hero ───────────────────────────────── */}
        <section className="bg-background py-24">
          <Container>
            <div className="mx-auto max-w-4xl text-center">
              <h1 className="font-heading text-5xl font-bold leading-tight tracking-tight text-[#222222] sm:text-6xl">
                {copy.heroHeading}{" "}
                <span className="block">{copy.heroHeadingSecondLine}</span>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[#6b7280]">
                {copy.heroDescription}
              </p>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <Link
                  href={hrefForLocale("/book-demo", locale)}
                  className="inline-flex h-11 items-center justify-center rounded-sm bg-[#222222] px-8 text-sm font-medium text-white transition-colors hover:bg-[#333333]"
                >
                  {copy.heroPrimaryCta}
                </Link>
                <Link
                  href={hrefForLocale("/pricing", locale)}
                  className="inline-flex h-11 items-center justify-center rounded-sm border border-[#c8a97e] px-8 text-sm font-medium text-[#c8a97e] transition-colors hover:bg-[#c8a97e] hover:text-white"
                >
                  {copy.heroSecondaryCta}
                </Link>
              </div>

              {/* Stat row */}
              <div className="mt-14 grid grid-cols-2 gap-6 border-t border-[#e6dbc9] pt-10 sm:grid-cols-4">
                {heroStats.map((stat, i) => (
                  <div
                    key={stat.label}
                    className={`text-center ${i < heroStats.length - 1 ? "sm:border-r sm:border-[#c8a97e]/30" : ""}`}
                  >
                    <p className="font-heading text-3xl font-bold text-[#c8a97e] sm:text-4xl">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-sm text-[#6b7280]">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* ── Section 2: Specialist Roles Grid ─────────────── */}
        <section className="bg-[#f8f5ef] py-20">
          <Container>
            <div className="mb-12 text-center">
              <h2 className="font-heading text-4xl font-bold text-[#222222] sm:text-5xl">
                {copy.rolesHeading}
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-[#6b7280]">
                {copy.rolesDescription}
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {roles.map((role) => {
                const Icon = iconMap[role.icon]
                return (
                  <div
                    key={role.slug}
                    className="flex flex-col rounded-xl border border-[#e5e5e5] bg-white p-8 transition-shadow hover:shadow-md"
                  >
                    {Icon && (
                      <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-md bg-[#f8f5ef]">
                        <Icon className="h-5 w-5 text-[#c8a97e]" />
                      </div>
                    )}
                    <h3 className="font-heading text-xl font-bold text-[#222222]">
                      {role.name}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-[#6b7280]">
                      {role.description}
                    </p>
                    <ul className="mt-4 space-y-1.5">
                      {role.skills.slice(0, 4).map((skill) => (
                        <li key={skill} className="flex items-center gap-2 text-sm text-[#374151]">
                          <span className="font-bold text-[#c8a97e]">✓</span>
                          {skill}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={hrefForLocale(`/services/virtual-assistant/${role.slug}`, locale)}
                      className="mt-6 inline-flex h-9 items-center justify-center rounded-sm border border-[#c8a97e] px-4 text-sm font-medium text-[#c8a97e] transition-colors hover:bg-[#c8a97e] hover:text-white"
                    >
                      {copy.roleCta}
                    </Link>
                  </div>
                )
              })}
            </div>
          </Container>
        </section>

        {/* ── Section 3: How It Works ───────────────────────── */}
        <section className="bg-background py-20">
          <Container>
            <div className="mb-16 text-center">
              <h2 className="font-heading text-4xl font-bold text-[#222222] sm:text-5xl">
                {copy.stepsHeading}
              </h2>
            </div>

            <div className="relative grid gap-12 md:grid-cols-3">
              {/* connecting line — desktop only */}
              <div
                className="absolute left-[calc(16.67%+16px)] right-[calc(16.67%+16px)] top-8 hidden h-px bg-[#c8a97e]/30 md:block"
                aria-hidden="true"
              />

              {steps.map((step) => (
                <div key={step.number} className="relative flex flex-col items-center text-center">
                  <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#c8a97e] bg-white">
                    <span className="font-heading text-xl font-bold text-[#c8a97e]">
                      {step.number}
                    </span>
                  </div>
                  <h3 className="font-heading mt-6 text-xl font-bold text-[#222222]">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#6b7280]">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* ── Section 4: Pricing ───────────────────────────── */}
        <section className="bg-[#f8f5ef] py-20">
          <Container>
            <div className="mb-12 text-center">
              <h2 className="font-heading text-4xl font-bold text-[#222222] sm:text-5xl">
                {copy.pricingHeading}
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-[#6b7280]">
                {copy.pricingDescription}
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-3">
              {pricing.map((plan) => (
                <div
                  key={plan.name}
                  className={`relative flex flex-col rounded-xl bg-white p-8 transition-shadow hover:shadow-md ${
                    plan.popular
                      ? "border-2 border-[#c8a97e] shadow-md"
                      : "border border-[#e5e5e5]"
                  }`}
                >
                  {plan.popular && (
                    <span className="absolute right-4 top-4 rounded-full bg-[#c8a97e] px-2.5 py-0.5 text-xs font-medium text-white">
                      {copy.popularLabel}
                    </span>
                  )}
                  <p className="text-xs font-semibold uppercase tracking-widest text-[#c8a97e]">
                    {plan.name}
                  </p>
                  <p className="font-heading mt-2 text-3xl font-bold text-[#222222]">
                    {plan.price}
                  </p>
                  <p className="mt-1 text-sm text-[#6b7280]">{plan.hours}</p>
                  <ul className="mt-6 flex-1 space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm text-[#374151]">
                        <span className="mt-0.5 font-bold text-[#c8a97e]">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={hrefForLocale("/book-demo", locale)}
                    className={`mt-8 inline-flex h-10 items-center justify-center rounded-sm px-4 text-sm font-medium transition-colors ${
                      plan.popular
                        ? "bg-[#c8a97e] text-white hover:bg-[#b69468]"
                        : "border border-[#c8a97e] text-[#c8a97e] hover:bg-[#c8a97e] hover:text-white"
                    }`}
                  >
                    {copy.planCta}
                  </Link>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* ── Section 5: Why Latin America ─────────────────── */}
        <section className="bg-background py-20">
          <Container>
            <div className="mb-12 text-center">
              <h2 className="font-heading text-4xl font-bold text-[#222222] sm:text-5xl">
                {copy.whyHeading}
              </h2>
            </div>

            <div className="grid gap-8 sm:grid-cols-2">
              {whyLatAm.map((item) => (
                <div
                  key={item.title}
                  className="flex gap-5 rounded-xl border border-[#e5e5e5] bg-white p-8"
                >
                  <span className="text-3xl">{item.icon}</span>
                  <div>
                    <h3 className="font-heading text-xl font-bold text-[#222222]">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#6b7280]">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* ── Section 6: CTA Banner ─────────────────────────── */}
        <section className="bg-[#c8a97e] py-20">
          <Container>
            <div className="text-center">
              <h2 className="font-heading text-4xl font-bold text-white sm:text-5xl">
                {copy.ctaHeading}
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-lg text-white/90">
                {copy.ctaDescription}
              </p>
              <Link
                href={hrefForLocale("/book-demo", locale)}
                className="mt-8 inline-flex h-11 items-center justify-center rounded-sm bg-white px-8 text-sm font-medium text-[#222222] transition-colors hover:bg-white/90"
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
