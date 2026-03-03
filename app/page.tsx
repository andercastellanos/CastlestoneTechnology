import Link from "next/link"
import Header from "./components/layout/Header"
import Footer from "./components/layout/Footer"

const heroStats = [
  { value: "60%", label: "Cost Savings" },
  { value: "48hr", label: "Matching" },
  { value: "4.9/5", label: "Satisfaction" },
]

const trustStats = [
  { value: "60%", label: "average cost reduction" },
  { value: "48-hour", label: "matching" },
  { value: "4.9/5", label: "client satisfaction" },
]

const specialistRoles = [
  "Virtual Assistant",
  "Social Media Manager",
  "Social Media Executive Assistant",
  "Technology Manager",
  "Website Manager",
  "HR Manager",
]

const serviceCards = [
  {
    title: "Specialist Tracks",
    description:
      "Six bilingual specialist roles covering every business function — from admin and social media to HR, IT, and website management.",
    href: "/services/virtual-assistant",
    chips: specialistRoles,
  },
  {
    title: "Virtual Front Desk",
    description:
      "Live video reception for your office — a bilingual professional who greets visitors, routes calls, and manages your front desk presence.",
    href: "/services/virtual-front-desk",
    chips: ["Live Video Greeting", "Call Routing", "Visitor Logging", "Bilingual EN/ES"],
  },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        {/* ── Hero ─────────────────────────────────────────── */}
        <section className="mx-auto flex w-full max-w-5xl flex-col items-center px-6 pb-20 pt-24 text-center sm:pt-28">
          <h1 className="max-w-4xl text-5xl leading-tight tracking-tight text-[#222222] [font-family:var(--font-heading)] sm:text-6xl">
            Professional Support. Zero Overhead.
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[#6b7280] [font-family:var(--font-sans)]">
            Elite bilingual professionals across 6 specialist tracks — virtual assistants, social
            media managers, technology coordinators, website managers, HR support, and more. All
            from Latin America. All at 60% less cost.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
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
              View Pricing
            </Link>
          </div>

          <div className="mt-14 grid w-full max-w-3xl grid-cols-3 gap-6 border-t border-[#e6dbc9] pt-10">
            {heroStats.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center gap-2">
                <p className="text-3xl leading-none text-[#c8a97e] [font-family:var(--font-heading)] sm:text-4xl">
                  {stat.value}
                </p>
                <p className="text-sm uppercase tracking-[0.14em] text-[#6b7280]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Trust Bar ────────────────────────────────────── */}
        <section className="border-y border-[#e6dbc9] bg-[#f8f5ef] py-10">
          <div className="mx-auto w-full max-w-5xl px-6">
            <p className="mb-6 text-center text-xs font-semibold uppercase tracking-widest text-[#9ca3af]">
              Trusted by Growing Businesses Across the US
            </p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {trustStats.map((stat, i) => (
                <div
                  key={stat.label}
                  className={`text-center ${i < trustStats.length - 1 ? "sm:border-r sm:border-[#c8a97e]/30" : ""}`}
                >
                  <p className="font-heading text-2xl font-bold text-[#c8a97e]">{stat.value}</p>
                  <p className="mt-1 text-sm text-[#6b7280]">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Service Cards ─────────────────────────────────── */}
        <section className="mx-auto w-full max-w-5xl px-6 py-20">
          <div className="mb-12 text-center">
            <h2 className="font-heading text-4xl font-bold text-[#222222] sm:text-5xl">
              Two Ways to Build Your Team
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[#6b7280]">
              Choose the support model that fits your business — or combine both.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            {serviceCards.map((card) => (
              <div
                key={card.title}
                className="flex flex-col rounded-xl border border-[#e5e5e5] bg-white p-8 transition-shadow hover:shadow-md"
              >
                <h3 className="font-heading text-2xl font-bold text-[#222222]">{card.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-[#6b7280]">
                  {card.description}
                </p>

                {/* Role chips */}
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
                  href={card.href}
                  className="mt-6 inline-flex h-10 items-center justify-center rounded-sm border border-[#c8a97e] px-5 text-sm font-medium text-[#c8a97e] transition-colors hover:bg-[#c8a97e] hover:text-white"
                >
                  Learn More →
                </Link>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
