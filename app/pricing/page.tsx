import type { Metadata } from "next"
import Link from "next/link"

import Footer from "../components/layout/Footer"
import Header from "../components/layout/Header"

export const metadata: Metadata = {
  title: "Pricing - Virtual Assistant & Front Desk Services",
  description:
    "Transparent pricing for virtual front desk and virtual assistant services. Plans starting at $1,200/month. Save 60% vs. in-house staff.",
}

type PricingPlan = {
  name: string
  price: string
  features: string[]
  popular?: boolean
}

const frontDeskPlans: PricingPlan[] = [
  {
    name: "Basic",
    price: "$1,200/mo",
    features: [
      "40hrs/week coverage",
      "Live video greeting",
      "Call forwarding",
      "Visitor logging",
      "Email support",
    ],
  },
  {
    name: "Professional",
    price: "$1,800/mo",
    popular: true,
    features: [
      "55hrs/week coverage",
      "Call transfer",
      "Package management",
      "Priority support",
    ],
  },
  {
    name: "Enterprise",
    price: "$2,500/mo",
    features: [
      "Custom hours",
      "Multiple locations",
      "Dedicated VA",
      "24/7 support",
    ],
  },
]

const virtualAssistantPlans: PricingPlan[] = [
  {
    name: "Personal",
    price: "$1,500/mo",
    features: ["80hrs", "Calendar management", "Email management", "Admin support"],
  },
  {
    name: "Business",
    price: "$2,000/mo",
    features: [
      "120hrs",
      "Client communications",
      "Task coordination",
      "Operations support",
    ],
  },
  {
    name: "Specialized",
    price: "$2,500/mo",
    features: ["160hrs", "Bookkeeping", "Social media", "Sales support"],
  },
]

function PricingCard({ plan }: { plan: PricingPlan }) {
  const cardClasses = plan.popular
    ? "relative rounded-sm border border-[#c8a97e] bg-white p-8"
    : "relative rounded-sm border border-[#e6dbc9] bg-white p-8 transition-colors duration-200 hover:border-[#c8a97e]"

  return (
    <article className={cardClasses}>
      {plan.popular ? (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#c8a97e] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-white">
          Most Popular
        </div>
      ) : null}

      <h3 className="text-2xl text-[#222222] [font-family:var(--font-heading)]">
        {plan.name}
      </h3>
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
        href="/demo"
        className="mt-8 inline-flex h-10 items-center justify-center rounded-sm border border-[#c8a97e] px-5 text-sm font-medium text-[#c8a97e] transition-colors hover:bg-[#c8a97e] hover:text-white"
      >
        Get Started
      </Link>
    </article>
  )
}

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        <section className="mx-auto w-full max-w-6xl px-6 pb-16 pt-24 text-center lg:px-10">
          <h1 className="text-4xl tracking-tight text-[#222222] [font-family:var(--font-heading)] sm:text-5xl lg:text-6xl">
            Simple, Transparent Pricing
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-[#6b7280]">
            No hidden fees. Cancel anytime. Money-back guarantee.
          </p>
        </section>

        <section className="mx-auto w-full max-w-6xl px-6 py-10 lg:px-10">
          <h2 className="text-center text-4xl text-[#222222] [font-family:var(--font-heading)] sm:text-5xl">
            Virtual Front Desk
          </h2>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {frontDeskPlans.map((plan) => (
              <PricingCard key={plan.name} plan={plan} />
            ))}
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-6 py-20 lg:px-10">
          <h2 className="text-center text-4xl text-[#222222] [font-family:var(--font-heading)] sm:text-5xl">
            Virtual Assistants
          </h2>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {virtualAssistantPlans.map((plan) => (
              <PricingCard key={plan.name} plan={plan} />
            ))}
          </div>
        </section>

        <section className="border-y border-[#e6dbc9] bg-[#fafaf8]">
          <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-center gap-4 px-6 py-10 text-center sm:flex-row sm:gap-8 lg:px-10">
            <p className="text-sm text-[#6b7280]">
              <span className="text-[#c8a97e]">✓</span> No credit card required
            </p>
            <p className="text-sm text-[#6b7280]">
              <span className="text-[#c8a97e]">✓</span> 30-day money-back
              guarantee
            </p>
            <p className="text-sm text-[#6b7280]">
              <span className="text-[#c8a97e]">✓</span> Cancel anytime
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
