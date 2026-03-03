import type { Metadata } from "next"
import Link from "next/link"
import {
  LayoutDashboard,
  Share2,
  Star,
  Cpu,
  Globe,
  Users,
  type LucideIcon,
} from "lucide-react"

import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import Container from "@/components/shared/Container"
import { VIRTUAL_ASSISTANT_ROLES, VIRTUAL_ASSISTANT_PRICING } from "@/src/lib/constants"

export const metadata: Metadata = {
  title: "Virtual Assistant Services | Social Media, HR, Tech & More",
  description:
    "Hire bilingual virtual assistants, social media managers, HR coordinators, website managers, and technology specialists from Latin America. Save 60% vs. in-house hiring. Matches in 48 hours.",
  keywords: [
    "virtual assistant services",
    "bilingual virtual assistant",
    "social media manager remote",
    "HR virtual assistant",
    "website manager remote",
    "Latin America virtual assistant",
    "remote technology manager",
    "social media executive assistant",
  ],
  alternates: {
    canonical: "https://castlestonetechnology.com/services/virtual-assistant",
  },
  openGraph: {
    title: "Virtual Assistant Specialists | Castlestone Technology",
    description: "6 specialist tracks. Bilingual talent. 60% savings. Start in 72 hours.",
    url: "https://castlestonetechnology.com/services/virtual-assistant",
  },
}

const iconMap: Record<string, LucideIcon> = {
  LayoutDashboard,
  Share2,
  Star,
  Cpu,
  Globe,
  Users,
}

const heroStats = [
  { value: "60%", label: "Cost savings" },
  { value: "6", label: "Specialist tracks" },
  { value: "EN/ES", label: "Bilingual" },
  { value: "No", label: "Long-term contracts" },
]

const steps = [
  {
    number: "01",
    title: "Tell Us Your Needs",
    description:
      "A 15-minute discovery call to identify the right specialist track and scope your requirements.",
  },
  {
    number: "02",
    title: "Meet Your Match",
    description:
      "We present 2–3 pre-vetted candidates within 48 hours. You interview and choose your hire.",
  },
  {
    number: "03",
    title: "Start in Days",
    description:
      "Your VA onboards and gets to work within 72 hours of approval — no lengthy procurement.",
  },
]

const whyLatAm = [
  {
    icon: "🗣️",
    title: "Bilingual by Default",
    description:
      "All professionals are fully fluent in English and Spanish, removing communication barriers entirely.",
  },
  {
    icon: "🕐",
    title: "Same Time Zone",
    description:
      "US-aligned working hours — no coordination lag, no overnight handoffs, no missed deadlines.",
  },
  {
    icon: "🎓",
    title: "University Educated",
    description:
      "Bachelor's degree minimum for all placements. Many hold master's degrees and professional certifications.",
  },
  {
    icon: "🤝",
    title: "Culture-Matched",
    description:
      "Deep familiarity with US business norms, communication standards, and professional expectations.",
  },
]

export default function VirtualAssistantPage() {
  return (
    <>
      <Header />
      <main>

        {/* ── Section 1: Hero ───────────────────────────────── */}
        <section className="bg-background py-24">
          <Container>
            <div className="mx-auto max-w-4xl text-center">
              <h1 className="font-heading text-5xl font-bold leading-tight tracking-tight text-[#222222] sm:text-6xl">
                World-Class Remote Talent.{" "}
                <span className="block">Every Role. Every Function.</span>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[#6b7280]">
                Bilingual virtual professionals from Latin America — available across 6 specialist
                tracks to support every part of your business.
              </p>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/book-demo"
                  className="inline-flex h-11 items-center justify-center rounded-sm bg-[#222222] px-8 text-sm font-medium text-white transition-colors hover:bg-[#333333]"
                >
                  Book a Free Demo
                </Link>
                <Link
                  href="/pricing"
                  className="inline-flex h-11 items-center justify-center rounded-sm border border-[#c8a97e] px-8 text-sm font-medium text-[#c8a97e] transition-colors hover:bg-[#c8a97e] hover:text-white"
                >
                  See Pricing
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
                Find Your Specialist
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-[#6b7280]">
                Every professional is pre-vetted, bilingual, and ready within 72 hours.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {VIRTUAL_ASSISTANT_ROLES.map((role) => {
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
                      href={`/services/virtual-assistant/${role.slug}`}
                      className="mt-6 inline-flex h-9 items-center justify-center rounded-sm border border-[#c8a97e] px-4 text-sm font-medium text-[#c8a97e] transition-colors hover:bg-[#c8a97e] hover:text-white"
                    >
                      Learn More
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
                Hire Your First VA in 3 Steps
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
                Simple, Transparent Pricing
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-[#6b7280]">
                All plans include a dedicated specialist, bilingual support, and weekly check-ins.
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-3">
              {VIRTUAL_ASSISTANT_PRICING.map((plan) => (
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
                      Most Popular
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
                    href="/book-demo"
                    className={`mt-8 inline-flex h-10 items-center justify-center rounded-sm px-4 text-sm font-medium transition-colors ${
                      plan.popular
                        ? "bg-[#c8a97e] text-white hover:bg-[#b69468]"
                        : "border border-[#c8a97e] text-[#c8a97e] hover:bg-[#c8a97e] hover:text-white"
                    }`}
                  >
                    Get Started
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
                Why Our Talent Is Different
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
                Ready to Scale Your Team?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-lg text-white/90">
                Book a free 15-minute call. We&apos;ll match you with the right specialist in 48 hours.
              </p>
              <Link
                href="/book-demo"
                className="mt-8 inline-flex h-11 items-center justify-center rounded-sm bg-white px-8 text-sm font-medium text-[#222222] transition-colors hover:bg-white/90"
              >
                Book Your Free Demo
              </Link>
            </div>
          </Container>
        </section>

      </main>
      <Footer />
    </>
  )
}
