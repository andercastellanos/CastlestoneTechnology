import type { Metadata } from "next"
import Link from "next/link"

import Footer from "../../components/layout/Footer"
import Header from "../../components/layout/Header"

export const metadata: Metadata = {
  title: "Virtual Assistants - Bilingual Remote Professionals",
  description:
    "Dedicated bilingual virtual assistants from Latin America. Calendar, email, admin, and specialized tasks. Plans from $1,500/month.",
}

const responsibilities = [
  {
    title: "Calendar & Scheduling",
    description:
      "Coordinate meetings, manage availability, and keep your day organized without back-and-forth.",
  },
  {
    title: "Email & Communications",
    description:
      "Handle inbox triage, client follow-ups, and professional communication in English and Spanish.",
  },
  {
    title: "Admin & Operations",
    description:
      "Take recurring admin tasks off your plate so your team can stay focused on growth work.",
  },
]

const pricingPlans = [
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

export default function VirtualAssistantPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        <section className="mx-auto w-full max-w-6xl px-6 pb-24 pt-24 text-center lg:px-10">
          <h1 className="mx-auto max-w-4xl text-4xl leading-tight tracking-tight text-[#222222] [font-family:var(--font-heading)] sm:text-5xl lg:text-6xl">
            Your Dedicated Assistant, Starting Tomorrow
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-[#555555] [font-family:var(--font-sans)]">
            Work with bilingual professionals who handle calendar, email, and
            admin tasks at 60% less cost than traditional in-office staffing.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/demo"
              className="inline-flex h-11 items-center justify-center rounded-sm bg-[#c8a97e] px-6 text-sm font-medium text-white transition-colors hover:bg-[#b69468]"
            >
              Book a Demo
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
            <div className="mb-10 text-center">
              <h2 className="text-4xl text-[#222222] [font-family:var(--font-heading)] sm:text-5xl">
                What your VA handles
              </h2>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {responsibilities.map((item) => (
                <article
                  key={item.title}
                  className="rounded-sm border border-[#e6dbc9] bg-white p-8 text-center"
                >
                  <div className="mx-auto h-3 w-3 rounded-full bg-[#c8a97e]" />
                  <h3 className="mt-5 text-2xl leading-snug text-[#222222] [font-family:var(--font-heading)]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#555555]">
                    {item.description}
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
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {pricingPlans.map((plan) => (
              <article
                key={plan.name}
                className="rounded-sm border border-[#e6dbc9] bg-white p-8 transition-colors duration-200 hover:border-[#c8a97e]"
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
                  href="/demo"
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
              Ready to Meet Your VA?
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/90">
              Get matched with a bilingual assistant and start delegating
              critical tasks within days.
            </p>
            <Link
              href="/demo"
              className="mt-8 inline-flex h-11 items-center justify-center rounded-sm border border-white px-6 text-sm font-medium text-white transition-colors hover:bg-white hover:text-[#c8a97e]"
            >
              Book a Demo
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
