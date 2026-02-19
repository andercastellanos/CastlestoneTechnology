import type { Metadata } from "next"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import Container from "@/components/shared/Container"
import Button from "@/components/shared/Button"
import { SITE_CONFIG } from "@/lib/constants"
import Link from "next/link"

export const metadata: Metadata = {
  title: "About Us - Miami-Based Virtual Staffing Company",
  description:
    "Learn how Castlestone Technology connects US businesses with elite bilingual talent from Latin America. Founded in Miami, FL in 2023.",
  alternates: {
    canonical: "https://castlestonetechnology.com/company/about",
  },
}

const missionStats = [
  { value: "2023", label: "Founded" },
  { value: "Miami, FL", label: "Headquarters" },
  { value: "100+", label: "Clients Served" },
  { value: "4.9/5", label: "Avg Client Rating" },
]

const values = [
  {
    emoji: "🤝",
    title: "People First",
    description:
      "We invest in our team's growth, wellbeing, and long-term careers. Happy VAs deliver better results.",
  },
  {
    emoji: "💡",
    title: "Radical Transparency",
    description:
      "Clear pricing, no hidden fees, no long-term lock-ins. You always know exactly what you're paying for.",
  },
  {
    emoji: "⭐",
    title: "Excellence Always",
    description:
      "We accept only the top 5% of applicants. Every VA is rigorously vetted before they ever speak to a client.",
  },
]

const leadership = [
  {
    name: "Maria Santos",
    title: "CEO & Co-Founder",
    bio: "Maria spent 10 years scaling Latin American talent operations before co-founding Castlestone.",
  },
  {
    name: "James Whitfield",
    title: "CTO & Co-Founder",
    bio: "James built enterprise SaaS products for 8 years and leads all platform and technology decisions.",
  },
  {
    name: "Ana Morales",
    title: "Head of VA Operations",
    bio: "A former bilingual executive assistant, Ana oversees VA placement, training, and client satisfaction.",
  },
]

const latinAmericaStats = [
  { value: "95%", label: "English Proficiency" },
  { value: "GMT-5", label: "Time Zone Alignment" },
  { value: "70%", label: "Average Cost Savings" },
  { value: "2 Weeks", label: "Average Placement Time" },
]

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        <section className="bg-gradient-to-b from-blue-50 to-background py-20">
          <Container className="text-center">
            <h1 className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              We&apos;re Building the Future of Work
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              {SITE_CONFIG.name} connects US businesses with elite bilingual
              professionals from Latin America - delivering the same quality as
              in-house staff at 60% less cost.
            </p>
          </Container>
        </section>

        <section className="bg-background py-20">
          <Container>
            <div className="grid items-start gap-12 lg:grid-cols-2">
              <div>
                <h2 className="font-heading text-3xl font-bold text-foreground">
                  Our Story
                </h2>
                <p className="mt-4 text-muted-foreground">
                  Castlestone Technology was founded in Miami in 2023 after our
                  founders saw a clear gap in the market - small and mid-sized
                  businesses were spending $50,000+ per year on in-house
                  receptionists and administrative staff, yet getting
                  inconsistent results.
                </p>
                <p className="mt-4 text-muted-foreground">
                  We built a technology-enabled staffing model that sources,
                  vets, and places bilingual professionals from Colombia and
                  across Latin America into remote roles for US companies. Our
                  clients get dedicated, full-time support at a fraction of the
                  traditional cost.
                </p>
                <p className="mt-4 text-muted-foreground">
                  Today we serve 100+ clients across healthcare, legal, real
                  estate, and professional services - and we&apos;re just getting
                  started.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6 rounded-xl bg-muted/50 p-8">
                {missionStats.map((stat) => (
                  <div key={stat.label}>
                    <p className="text-3xl font-bold text-primary">{stat.value}</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>

        <section className="bg-muted/50 py-20">
          <Container>
            <h2 className="text-center font-heading text-3xl font-bold text-foreground">
              What We Stand For
            </h2>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              {values.map((value) => (
                <article
                  key={value.title}
                  className="rounded-xl border border-border bg-background p-8"
                >
                  <div className="mb-4 text-4xl">{value.emoji}</div>
                  <h3 className="mb-2 text-lg font-semibold text-foreground">
                    {value.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {value.description}
                  </p>
                </article>
              ))}
            </div>
          </Container>
        </section>

        <section className="py-20">
          <Container>
            <h2 className="text-center font-heading text-3xl font-bold text-foreground">
              Leadership Team
            </h2>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              {leadership.map((member) => (
                <article
                  key={member.name}
                  className="rounded-xl border border-border bg-background p-8 text-center"
                >
                  <div className="mx-auto mb-4 h-24 w-24 rounded-full bg-muted" />
                  <h3 className="text-lg font-semibold text-foreground">{member.name}</h3>
                  <p className="mb-2 text-sm text-primary">{member.title}</p>
                  <p className="text-sm text-muted-foreground">{member.bio}</p>
                </article>
              ))}
            </div>
          </Container>
        </section>

        <section className="bg-muted/50 py-20">
          <Container className="text-center">
            <h2 className="font-heading text-3xl font-bold text-foreground">
              Why Latin America?
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-muted-foreground">
              Latin America offers something rare - a highly educated,
              bilingual workforce in US-compatible time zones, with deep
              cultural alignment and a strong work ethic. Our talent pool is
              drawn primarily from Colombia&apos;s top universities and
              professional networks.
            </p>
            <div className="mt-12 grid grid-cols-2 gap-8 text-center sm:grid-cols-4">
              {latinAmericaStats.map((item) => (
                <div key={item.label}>
                  <p className="text-4xl font-bold text-primary">{item.value}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{item.label}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        <section className="bg-primary py-20 text-primary-foreground">
          <Container className="text-center">
            <h2 className="font-heading text-3xl font-bold sm:text-4xl">
              Join 100+ Companies Already Saving
            </h2>
            <p className="mt-4 text-lg opacity-90">
              Book a free consultation. No commitment required.
            </p>
            <div className="mt-8">
              <Link href="/demo">
                <Button variant="secondary" size="lg">
                  Book a Demo
                </Button>
              </Link>
            </div>
            <p className="mt-4 text-sm opacity-75">
              ✓ No credit card required  •  ✓ Cancel anytime
            </p>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  )
}
