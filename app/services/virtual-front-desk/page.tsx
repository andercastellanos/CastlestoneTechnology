import type { Metadata } from "next"
import Link from "next/link"

import Footer from "../../components/layout/Footer"
import Header from "../../components/layout/Header"

export const metadata: Metadata = {
  title: "Virtual Front Desk - AI-Powered Reception Service",
  description:
    "iPad-powered virtual receptionist for your office. Live video greeting, call routing, and visitor management. Starting at $1,200/month.",
}

const features = [
  {
    title: "Live Video Greeting",
    description:
      "Welcome every visitor with a polished, real-time video receptionist experience.",
  },
  {
    title: "Call Management",
    description:
      "Route and transfer incoming calls instantly so your team never misses key opportunities.",
  },
  {
    title: "Visitor Logging",
    description:
      "Track arrivals, collect details, and maintain a secure front-desk record automatically.",
  },
]

const pricingPlans = [
  {
    name: "Basic",
    price: "$1,200/mo",
    features: [
      "40hrs/week",
      "Live video greeting",
      "Call forwarding",
      "Visitor logging",
      "Email support",
    ],
  },
  {
    name: "Professional",
    price: "$1,800/mo",
    features: [
      "55hrs/week",
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

export default function VirtualFrontDeskPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        <section className="mx-auto w-full max-w-6xl px-6 pb-24 pt-24 text-center lg:px-10">
          <h1 className="mx-auto max-w-4xl text-4xl leading-tight tracking-tight text-[#222222] [font-family:var(--font-heading)] sm:text-5xl lg:text-6xl">
            Never Miss a Client - Even Without a Receptionist
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-[#555555] [font-family:var(--font-sans)]">
            Upgrade your office with iPad-powered virtual reception that greets
            visitors and manages calls at 70% less cost than traditional
            front-desk staffing.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/book-demo"
              className="inline-flex h-11 items-center justify-center rounded-sm bg-[#c8a97e] px-6 text-sm font-medium text-white transition-colors hover:bg-[#b69468]"
            >
              Book a Free Consultation
            </Link>
            <Link
              href="/pricing"
              className="inline-flex h-11 items-center justify-center rounded-sm border border-[#c8a97e] px-6 text-sm font-medium text-[#c8a97e] transition-colors hover:bg-[#c8a97e] hover:text-white"
            >
              See Pricing
            </Link>
          </div>
        </section>

        <section className="border-y border-[#e6dbc9] bg-[#fafaf8]">
          <div className="mx-auto w-full max-w-6xl px-6 py-20 lg:px-10">
            <div className="grid gap-8 md:grid-cols-3">
              {features.map((feature) => (
                <article
                  key={feature.title}
                  className="rounded-sm border border-[#e6dbc9] bg-white p-8 text-center"
                >
                  <div className="mx-auto h-3 w-3 rounded-full bg-[#c8a97e]" />
                  <h2 className="mt-5 text-2xl leading-snug text-[#222222] [font-family:var(--font-heading)]">
                    {feature.title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-[#555555]">
                    {feature.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-6 py-24 lg:px-10">
          <div className="text-center">
            <h2 className="text-4xl text-[#222222] [font-family:var(--font-heading)] sm:text-5xl">
              Pricing
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-[#555555]">
              Flexible plans designed to match your office traffic and
              operational needs.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {pricingPlans.map((plan) => (
              <article
                key={plan.name}
                className="group rounded-sm border border-[#e6dbc9] bg-white p-8 transition-colors duration-200 hover:border-[#c8a97e]"
              >
                <h3 className="text-2xl text-[#222222] [font-family:var(--font-heading)]">
                  {plan.name}
                </h3>
                <p className="mt-2 text-3xl leading-none text-[#c8a97e] [font-family:var(--font-heading)]">
                  {plan.price}
                </p>
                <ul className="mt-6 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="text-sm text-[#555555]">
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/book-demo"
                  className="mt-8 inline-flex h-10 items-center justify-center rounded-sm border border-[#c8a97e] px-5 text-sm font-medium text-[#c8a97e] transition-colors hover:bg-[#c8a97e] hover:text-white"
                >
                  Get Started
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-[#c8a97e]">
          <div className="mx-auto flex w-full max-w-6xl flex-col items-center px-6 py-16 text-center lg:px-10">
            <h2 className="text-4xl text-white [font-family:var(--font-heading)] sm:text-5xl">
              Ready to Get Started?
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/90">
              Launch your virtual front desk quickly and deliver a premium
              first impression from day one.
            </p>
            <Link
              href="/book-demo"
              className="mt-8 inline-flex h-11 items-center justify-center rounded-sm border border-white px-6 text-sm font-medium text-white transition-colors hover:bg-white hover:text-[#c8a97e]"
            >
              Book a Free Consultation
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
