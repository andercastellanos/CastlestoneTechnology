import type { Metadata } from "next"
import Link from "next/link"
import {
  BarChart3,
  BriefcaseBusiness,
  CalendarDays,
  ChevronDown,
  ClipboardList,
  House,
  Mail,
  MessageSquare,
  Plug,
  Rocket,
  ShieldCheck,
  SlidersHorizontal,
  Store,
  UserCheck,
  UserRoundMinus,
  Workflow,
} from "lucide-react"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import Container from "@/components/shared/Container"
import { SOCIAL_IMAGES } from "@/lib/constants"

const title = "SMS & Email Marketing Automation"
const description =
  "Turn new leads into repeat customers with SMS and email campaigns, automated follow-ups, customer reactivation, and CRM integrations built around your business."

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/services/marketing-automation",
  },
  openGraph: {
    title,
    description,
    url: "/services/marketing-automation",
    type: "website",
    images: SOCIAL_IMAGES.openGraph,
  },
}

const capabilities = [
  {
    icon: MessageSquare,
    title: "Text Coupons & Promotions",
    description:
      "Send time-limited offers straight to customers' phones, with a trackable code or link on every coupon.",
  },
  {
    icon: Mail,
    title: "Email Campaigns",
    description:
      "Build branded newsletters, welcome emails, and promotions tailored to different customer groups.",
  },
  {
    icon: Workflow,
    title: "Automated Follow-Ups",
    description:
      "Follow up after an inquiry, signup, or purchase with a sequence that keeps the conversation moving.",
  },
  {
    icon: UserCheck,
    title: "Customer Reactivation",
    description:
      "Reconnect with past customers through thoughtful check-ins, relevant offers, and reminders to book again.",
  },
  {
    icon: Plug,
    title: "CRM & Tool Integrations",
    description:
      "Connect your forms, CRM, booking tools, or store so campaigns respond to customer activity.",
  },
  {
    icon: BarChart3,
    title: "Reporting & Optimization",
    description:
      "Track opens, clicks, and coupon redemptions, so you see what actually drove sales—then refine the audience, message, and timing.",
  },
]

const steps = [
  {
    icon: ClipboardList,
    number: "01",
    title: "Plan the Customer Journey",
    description:
      "We review your goals, audience, and current tools, then agree on the campaigns, triggers, and integrations to build.",
  },
  {
    icon: Workflow,
    number: "02",
    title: "Build & Connect",
    description:
      "We create the templates and workflows, connect your systems, and test the messages and sending controls with your team.",
  },
  {
    icon: Rocket,
    number: "03",
    title: "Launch & Improve",
    description:
      "You approve the campaigns before launch. We review performance together and scope improvements as your needs evolve.",
  },
]

const compliancePillars = [
  {
    icon: ShieldCheck,
    title: "Permission Comes First",
    description:
      "We plan consent capture and preference tracking so your audience and channel permissions guide each campaign.",
  },
  {
    icon: UserRoundMinus,
    title: "Clear Ways to Opt Out",
    description:
      "We build unsubscribe and SMS opt-out handling into the workflow, with suppression lists to keep opted-out contacts out of future sends.",
  },
  {
    icon: SlidersHorizontal,
    title: "Thoughtful Sending Controls",
    description:
      "We configure timing, frequency limits, and approval steps around your audience and the capabilities of your sending platform.",
  },
]

const audiences = [
  {
    icon: House,
    title: "Local & Home Services",
    description:
      "Follow up on quote requests, remind customers about maintenance, and invite them to book their next service.",
  },
  {
    icon: Store,
    title: "Retail & E-Commerce",
    description:
      "Welcome new subscribers, follow up after purchases, and share relevant products and promotions.",
  },
  {
    icon: CalendarDays,
    title: "Appointment-Based Businesses",
    description:
      "Keep appointments top of mind and make it easier for existing customers to return when they need you again.",
  },
  {
    icon: BriefcaseBusiness,
    title: "B2B & Professional Services",
    description:
      "Nurture inquiries over a longer sales cycle with useful content, timely check-ins, and follow-up reminders.",
  },
]

const faqs = [
  {
    question: "What can you automate?",
    answer:
      "Common starting points include welcome sequences, lead follow-ups, appointment reminders, post-purchase messages, and customer reactivation. We choose the workflows with you based on your customer journey and the data your tools make available.",
  },
  {
    question: "Can you work with our existing CRM and marketing tools?",
    answer:
      "We start by reviewing your current setup. Where your tools support integrations, we build around them. If a connection needs custom development or a different platform, we explain the options and include that work in the scope before starting.",
  },
  {
    question: "Do we need an existing subscriber list?",
    answer:
      "You can start with an existing audience that has opted in, or begin by building signup forms and welcome workflows. We review how contacts join your list and which channels they have agreed to receive messages on before planning campaigns.",
  },
  {
    question: "How do SMS and email work together?",
    answer:
      "Each channel has a role. Email can carry longer updates and useful content, while SMS can support timely reminders and short messages. We coordinate the sequence around customer preferences so the channels work together without unnecessary repetition.",
  },
  {
    question: "Can campaigns be in Spanish?",
    answer:
      "Yes. Every campaign can run in English, Spanish, or both, so you reach your whole customer base.",
  },
  {
    question: "Who writes and approves the messages?",
    answer:
      "Copywriting and branded templates can be included in your project scope, or we can work with content your team supplies. Your team reviews the content, audience, and sending settings before campaigns go live.",
  },
  {
    question: "How is pricing determined?",
    answer:
      "We provide a custom quote based on the channels, workflows, integrations, and ongoing support you need. We also identify platform subscriptions and messaging usage costs separately so you can review the full setup before committing.",
  },
]

export default function MarketingAutomationPage() {
  return (
    <>
      <Header />
      <main className="font-sans">
        {/* Hero */}
        <section className="bg-background py-20">
          <Container>
            <div className="mx-auto max-w-4xl text-center">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-[#c8a97e]">
                Keep the Conversation Going
              </p>
              <h1 className="font-heading text-5xl font-bold leading-tight text-foreground sm:text-6xl">
                SMS &amp; Email Marketing Automation
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                Follow up with new leads, stay connected to your customers, and
                bring them back. We build campaigns and workflows around your
                business so your team can spend less time sending every message
                by hand. Campaigns run in English and Spanish.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link
                  href="/book-demo"
                  className="inline-flex h-11 items-center justify-center rounded-sm bg-[#c8a97e] px-6 text-sm font-medium text-white transition-colors hover:bg-[#b69468] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c8a97e]"
                >
                  Book a Free Consultation
                </Link>
                <Link
                  href="#how-it-works"
                  className="inline-flex h-11 items-center justify-center rounded-sm border border-[#c8a97e] px-6 text-sm font-medium text-[#c8a97e] transition-colors hover:bg-[#c8a97e] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c8a97e]"
                >
                  See How It Works
                </Link>
              </div>
            </div>
          </Container>
        </section>

        {/* Capabilities */}
        <section className="border-y border-[#e6dbc9] bg-[#f8f5ef] py-20">
          <Container>
            <div className="mb-12 text-center">
              <h2 className="font-heading text-4xl font-bold text-foreground sm:text-5xl">
                The Right Message, Without the Manual Work
              </h2>
              <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-muted-foreground">
                Start with the campaigns you need today, then connect them into a
                customer journey that works across SMS and email.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {capabilities.map(({ icon: Icon, title, description }) => (
                <article
                  key={title}
                  className="rounded-xl border border-[#e5e5e5] bg-white p-6 transition-shadow hover:shadow-md"
                >
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-md bg-[#c8a97e]/10">
                    <Icon className="h-5 w-5 text-[#c8a97e]" aria-hidden="true" />
                  </div>
                  <h3 className="mb-2 font-semibold text-foreground">{title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {description}
                  </p>
                </article>
              ))}
            </div>
          </Container>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="scroll-mt-24 bg-background py-20">
          <Container>
            <h2 className="font-heading mb-12 text-center text-4xl font-bold text-foreground sm:text-5xl">
              How It Works
            </h2>
            <ol className="grid gap-8 lg:grid-cols-3">
              {steps.map(({ icon: Icon, number, title, description }) => (
                <li key={number} className="rounded-lg border border-[#e6dbc9] bg-white p-8">
                  <div className="mb-6 flex items-center justify-between">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-[#c8a97e]/10">
                      <Icon className="h-5 w-5 text-[#c8a97e]" aria-hidden="true" />
                    </span>
                    <span className="font-heading text-3xl text-[#c8a97e]" aria-hidden="true">
                      {number}
                    </span>
                  </div>
                  <h3 className="font-heading mb-3 text-2xl font-bold text-foreground">
                    {title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {description}
                  </p>
                </li>
              ))}
            </ol>
          </Container>
        </section>

        {/* Compliance */}
        <section className="bg-gray-950 py-20">
          <Container>
            <div className="mb-12 text-center">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#c8a97e]">
                Compliance
              </p>
              <h2 className="font-heading text-4xl font-bold text-white sm:text-5xl">
                Respect Your Customers at Every Step
              </h2>
              <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-gray-400">
                Consent, preferences, and sending controls are part of the
                project scope from the start.
              </p>
            </div>
            <div className="grid gap-10 text-center sm:grid-cols-3">
              {compliancePillars.map(({ icon: Icon, title, description }) => (
                <div key={title}>
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-md bg-[#c8a97e]/10">
                    <Icon className="h-5 w-5 text-[#c8a97e]" aria-hidden="true" />
                  </div>
                  <h3 className="font-heading mb-3 text-xl font-bold text-white">
                    {title}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-400">{description}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Who It's For */}
        <section className="bg-background py-20">
          <Container>
            <div className="mb-12 text-center">
              <h2 className="font-heading text-4xl font-bold text-foreground sm:text-5xl">
                Who It&apos;s For
              </h2>
              <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-muted-foreground">
                For businesses that want to build lasting customer relationships
                with more consistent follow-up.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              {audiences.map(({ icon: Icon, title, description }) => (
                <article key={title} className="rounded-xl border border-[#e5e5e5] bg-white p-8">
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-md bg-[#c8a97e]/10">
                    <Icon className="h-5 w-5 text-[#c8a97e]" aria-hidden="true" />
                  </div>
                  <h3 className="font-heading mb-3 text-2xl font-bold text-foreground">
                    {title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {description}
                  </p>
                </article>
              ))}
            </div>
          </Container>
        </section>

        {/* FAQ */}
        <section className="border-y border-[#e6dbc9] bg-[#f8f5ef] py-20">
          <Container>
            <div className="mx-auto max-w-3xl">
              <h2 className="font-heading mb-12 text-center text-4xl font-bold text-foreground sm:text-5xl">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {faqs.map(({ question, answer }) => (
                  <details key={question} className="group rounded-lg border border-[#e6dbc9] bg-white">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-lg p-6 text-left font-semibold text-foreground transition-colors hover:text-[#b69468] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c8a97e] [&::-webkit-details-marker]:hidden">
                      {question}
                      <ChevronDown
                        className="h-5 w-5 shrink-0 text-[#c8a97e] transition-transform group-open:rotate-180 motion-reduce:transition-none"
                        aria-hidden="true"
                      />
                    </summary>
                    <p className="px-6 pb-6 text-sm leading-relaxed text-muted-foreground">
                      {answer}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* Closing CTA */}
        <section className="bg-[#c8a97e] py-20">
          <Container>
            <div className="text-center">
              <h2 className="font-heading mb-4 text-4xl font-bold text-white sm:text-5xl">
                Ready to Put Your Follow-Ups to Work?
              </h2>
              <p className="mx-auto mb-8 max-w-xl text-lg leading-relaxed text-white/90">
                Tell us about your customers and the tools you use. We&apos;ll
                help you plan the right SMS and email workflows for your business.
              </p>
              <Link
                href="/book-demo"
                className="inline-flex h-11 items-center justify-center rounded-sm border-2 border-white px-8 text-sm font-medium text-white transition-colors hover:bg-white hover:text-[#c8a97e] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                Book a Free Consultation
              </Link>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  )
}
