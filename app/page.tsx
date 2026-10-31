import type { Metadata } from "next"
import Link from "next/link"
import {
  Bot,
  Globe,
  LayoutDashboard,
  Plug,
  ShoppingCart,
  Smartphone,
  type LucideIcon,
} from "lucide-react"
import Header from "./components/layout/Header"
import Footer from "./components/layout/Footer"

export const metadata: Metadata = {
  title: {
    absolute: "Castlestone Technology | Custom Software & AI for Growing Businesses",
  },
  description:
    "Web apps, AI agents, automations, integrations and websites, built by a nearshore engineering team in U.S. time zones. Bilingual support teams available too.",
}

/* ── Technology Solutions (lead offer) ─────────────────────────── */

const heroCommitments = [
  { value: "Fixed scope", label: "Written quote before work starts" },
  { value: "Weekly demos", label: "See progress every week" },
  { value: "Your code", label: "Full handover when we finish" },
]

const techSolutions: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: Bot,
    title: "AI Agents & Automation",
    description:
      "Chatbots, AI phone and WhatsApp agents, document processing, and workflow automation.",
  },
  {
    icon: LayoutDashboard,
    title: "Web Apps & Client Portals",
    description: "Dashboards, internal tools, client portals, and SaaS products.",
  },
  {
    icon: Globe,
    title: "Websites & Landing Pages",
    description: "Fast, search-ready marketing sites and redesigns built to convert.",
  },
  {
    icon: Plug,
    title: "APIs & Integrations",
    description: "Connect your CRM, payments, phone system, and the tools you already use.",
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce",
    description: "Custom storefronts, Shopify builds, and payment integrations.",
  },
  {
    icon: Smartphone,
    title: "Mobile Apps",
    description: "iOS and Android apps built with React Native.",
  },
]

/* ── Bilingual support teams (existing offers) ─────────────────── */

const specialistRoles = [
  "Virtual Assistant",
  "Social Media Manager",
  "Social Media Executive Assistant",
  "Technology Manager",
  "Website Manager",
  "HR Manager",
]

const supportCards: {
  title: string
  description: string
  href: string
  chips: string[]
  status?: string
}[] = [
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
    status: "In development",
  },
]

const goldButton =
  "inline-flex h-11 items-center justify-center rounded-sm bg-[#c8a97e] px-6 text-sm font-medium text-white transition-colors hover:bg-[#b69468]"
const goldOutlineButton =
  "inline-flex h-11 items-center justify-center rounded-sm border border-[#c8a97e] px-6 text-sm font-medium text-[#c8a97e] transition-colors hover:bg-[#c8a97e] hover:text-white"

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        {/* ── Hero: Technology Solutions ───────────────────── */}
        <section className="mx-auto flex w-full max-w-5xl flex-col items-center px-6 pb-20 pt-24 text-center sm:pt-28">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c8a97e]">
            Software &amp; AI Engineering
          </p>

          <h1 className="mt-5 max-w-4xl text-5xl leading-tight tracking-tight text-[#222222] [font-family:var(--font-heading)] sm:text-6xl">
            Custom software and AI, built for your business.
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[#6b7280] [font-family:var(--font-sans)]">
            Web apps, AI agents, automations, and integrations — scoped in Florida and built by our
            nearshore engineering team, working in U.S. time zones in English and Spanish.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link href="/book-demo" className={goldButton}>
              Start a Project
            </Link>
            <Link href="#what-we-build" className={goldOutlineButton}>
              See What We Build
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
                What We Build
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-[#6b7280]">
                A few of the things our team ships most often.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {techSolutions.map(({ icon: Icon, title, description }) => (
                <div
                  key={title}
                  className="rounded-xl border border-[#e5e5e5] bg-white p-6 transition-shadow hover:shadow-md"
                >
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-md bg-[#c8a97e]/10">
                    <Icon className="h-5 w-5 text-[#c8a97e]" aria-hidden="true" />
                  </div>
                  <h3 className="font-semibold text-[#222222]">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#6b7280]">{description}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 text-center">
              <Link
                href="/services/technology-solutions"
                className="text-sm font-medium text-[#c8a97e] transition-colors hover:text-[#b69468]"
              >
                See all technology solutions →
              </Link>
            </div>
          </div>
        </section>

        {/* ── Bilingual Support Teams ──────────────────────── */}
        <section className="mx-auto w-full max-w-5xl px-6 py-20">
          <div className="mb-12 text-center">
            <h2 className="font-heading text-4xl font-bold text-[#222222] sm:text-5xl">
              Bilingual Support Teams
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[#6b7280]">
              Need people, not just software? Bilingual English and Spanish professionals from
              Latin America.
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
                  {card.status && (
                    <span className="rounded-full bg-[#222222] px-2.5 py-0.5 text-xs font-medium text-white">
                      {card.status}
                    </span>
                  )}
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
                  href={card.href}
                  className="mt-6 inline-flex h-10 items-center justify-center rounded-sm border border-[#c8a97e] px-5 text-sm font-medium text-[#c8a97e] transition-colors hover:bg-[#c8a97e] hover:text-white"
                >
                  Learn More →
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* ── Closing CTA ──────────────────────────────────── */}
        <section className="bg-[#c8a97e] py-20">
          <div className="mx-auto w-full max-w-5xl px-6 text-center">
            <h2 className="font-heading text-4xl font-bold text-white sm:text-5xl">
              Have a project in mind?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-white/90">
              Tell us what you need. We&apos;ll scope it, quote it, and show you progress every
              week.
            </p>
            <Link
              href="/book-demo"
              className="mt-8 inline-flex h-11 items-center justify-center rounded-sm border-2 border-white px-8 text-sm font-medium text-white transition-colors hover:bg-white hover:text-[#c8a97e]"
            >
              Start a Project
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
