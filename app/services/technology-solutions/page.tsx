import type { Metadata } from "next"
import Link from "next/link"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import Container from "@/components/shared/Container"

export const metadata: Metadata = {
  title: "Technology Solutions - Software & AI Engineering | Castlestone Technology",
  description:
    "Custom applications, websites, automations, and product features built by elite nearshore engineers from Latin America — at a fraction of traditional U.S. development costs.",
  alternates: {
    canonical: "https://castlestonetechnology.com/services/technology-solutions",
  },
}

const stats = [
  { value: "70%", label: "Less than U.S. dev rates" },
  { value: "Top 5%", label: "Of applicants accepted" },
  { value: "10+", label: "Countries across Latin America" },
  { value: "Full-Stack", label: "AI, Web, Mobile & More" },
]

const capabilities = [
  {
    icon: "🖥️",
    title: "Web Apps & SaaS",
    description: "Dashboards, client portals, internal tools, SaaS platforms",
  },
  {
    icon: "🤖",
    title: "AI & Automation",
    description:
      "Chatbots, document AI, voice agents, custom GPT integrations, workflow automation",
  },
  {
    icon: "📱",
    title: "Mobile Apps",
    description: "iOS, Android, and cross-platform React Native applications",
  },
  {
    icon: "🛒",
    title: "E-Commerce",
    description: "Custom storefronts, Shopify development, payment integrations",
  },
  {
    icon: "🔗",
    title: "APIs & Integrations",
    description: "Third-party connections, custom REST APIs, data pipelines",
  },
  {
    icon: "🌐",
    title: "Websites & Landing Pages",
    description: "Marketing sites, redesigns, conversion-focused builds",
  },
  {
    icon: "⚡",
    title: "Product Features",
    description: "Add features to your existing product fast, without hiring",
  },
  {
    icon: "🏗️",
    title: "CTO-as-a-Service",
    description: "Tech strategy, architecture decisions, and engineering leadership",
  },
  {
    icon: "⚙️",
    title: "Automations & Workflows",
    description: "Zapier-level automation built custom to your exact needs",
  },
]

const engagementModels = [
  {
    label: "Hourly Blocks",
    price: "From $45/hr",
    bestFor: "Maintenance, small features, technical consulting",
    features: [
      "Buy hours upfront, use on demand",
      "No retainer required",
      "Rollover unused hours",
    ],
    cta: "Buy Hours",
    popular: false,
  },
  {
    label: "Project-Based",
    price: "Custom Quote",
    bestFor: "MVPs, new products, client builds",
    features: [
      "Fixed scope and timeline",
      "Milestone-based delivery",
      "Dedicated project manager",
      "Full IP transfer on completion",
    ],
    cta: "Get a Quote",
    popular: true,
  },
  {
    label: "Dedicated Team",
    price: "From $3,500/mo",
    bestFor: "Ongoing development, startups, scaling teams",
    features: [
      "1–3 engineers assigned exclusively to you",
      "Feels like in-house",
      "Cancel anytime",
      "Async + real-time collaboration",
    ],
    cta: "Build Your Team",
    popular: false,
  },
]

const qualityPillars = [
  {
    icon: "🏆",
    title: "Top 5% Vetted",
    description:
      "Rigorous multi-stage technical screening. Only elite engineers make the cut.",
  },
  {
    icon: "🌎",
    title: "US-Market Experienced",
    description:
      "Familiar with American business culture, communication standards, and time zones.",
  },
  {
    icon: "💬",
    title: "Bilingual Professionals",
    description: "English-fluent, async-friendly, no communication gaps.",
  },
]

export default function TechnologySolutionsPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="py-20 bg-background">
          <Container>
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="font-heading">
                <span className="block text-2xl font-normal text-muted-foreground tracking-wide mb-3">
                  Software & AI Engineering Services
                </span>
                <span className="block text-5xl font-bold text-foreground leading-tight sm:text-6xl">
                  Silicon Valley Talent.{" "}
                  <span className="block sm:inline">Latin America Pricing.</span>
                </span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
                Custom applications, websites, automations, and product features built by elite
                nearshore engineers at a fraction of traditional U.S. development costs.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link
                  href="/book-demo"
                  className="inline-flex h-11 items-center justify-center rounded-sm bg-[#c8a97e] px-6 text-sm font-medium text-white transition-colors hover:bg-[#b69468]"
                >
                  Start a Project
                </Link>
                <Link
                  href="/book-demo"
                  className="inline-flex h-11 items-center justify-center rounded-sm border border-[#c8a97e] px-6 text-sm font-medium text-[#c8a97e] transition-colors hover:bg-[#c8a97e] hover:text-white"
                >
                  View Engagement Models
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
              We Build Everything.
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
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Engagement Models */}
        <section className="py-20 bg-[#f8f5ef]">
          <Container>
            <h2 className="font-heading text-4xl font-bold text-center text-foreground mb-12">
              How We Work Together
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
                      Most Popular
                    </span>
                  )}
                  <p className="text-xs uppercase tracking-[0.12em] text-[#c8a97e] font-medium mb-2">
                    {model.label}
                  </p>
                  <p className="font-heading text-2xl font-bold text-foreground mb-1">
                    {model.price}
                  </p>
                  <p className="text-sm text-muted-foreground mb-6">
                    Best for: {model.bestFor}
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
                    href="/book-demo"
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
                Ready to Build Something?
              </h2>
              <p className="mb-8 max-w-xl mx-auto text-lg text-white/90">
                Tell us what you need. We&apos;ll scope it, staff it, and ship it.
              </p>
              <Link
                href="/book-demo"
                className="inline-flex h-11 items-center justify-center rounded-sm border-2 border-white px-8 text-sm font-medium text-white transition-colors hover:bg-white hover:text-[#c8a97e]"
              >
                Start Your Project
              </Link>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  )
}
