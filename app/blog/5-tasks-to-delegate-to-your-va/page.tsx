import type { Metadata } from "next"
import Link from "next/link"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import Container from "@/components/shared/Container"

const TITLE = "5 Tasks You Should Stop Doing Yourself Right Now"
const DESCRIPTION =
  "From inbox management to calendar chaos, here are the 5 recurring tasks costing you hours every week — and exactly how a virtual assistant takes them off your plate."
const CANONICAL = "https://castlestonetechnology.com/blog/5-tasks-to-delegate-to-your-va"
const PUBLISHED = "2026-01-15T08:00:00Z"
const KEYWORDS = [
  "virtual assistant tasks",
  "delegate to VA",
  "what can a VA do",
  "hire virtual assistant",
  "outsource admin tasks",
]

export const metadata: Metadata = {
  title: `${TITLE} | Castlestone Technology`,
  description: DESCRIPTION,
  keywords: KEYWORDS,
  authors: [{ name: "Castlestone Technology", url: "https://castlestonetechnology.com" }],
  robots: { index: true, follow: true },
  alternates: { canonical: CANONICAL },
  openGraph: {
    type: "article",
    title: TITLE,
    description: DESCRIPTION,
    url: CANONICAL,
    siteName: "Castlestone Technology",
    publishedTime: PUBLISHED,
    authors: ["Castlestone Technology"],
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "5 Tasks You Should Stop Doing Yourself | Castlestone Technology",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og-image.png"],
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: TITLE,
  description: DESCRIPTION,
  datePublished: PUBLISHED,
  dateModified: PUBLISHED,
  author: {
    "@type": "Organization",
    name: "Castlestone Technology",
    url: "https://castlestonetechnology.com",
  },
  publisher: {
    "@type": "Organization",
    name: "Castlestone Technology",
    url: "https://castlestonetechnology.com",
    logo: {
      "@type": "ImageObject",
      url: "https://castlestonetechnology.com/logo.png",
    },
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": CANONICAL,
  },
  image: "https://castlestonetechnology.com/og-image.png",
  keywords: KEYWORDS.join(", "),
}

export default function BlogPost1() {
  return (
    <>
      <Header />
      <main>
        <article>
          {/* Article header */}
          <div className="py-16 bg-background">
            <Container>
              <div className="mx-auto max-w-3xl">
                <span className="inline-block rounded-sm border border-[#c8a97e]/30 bg-[#c8a97e]/15 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-[#c8a97e]">
                  Virtual Assistants
                </span>
                <h1 className="font-heading mt-4 text-4xl font-bold leading-tight text-[#222222] sm:text-5xl">
                  {TITLE}
                </h1>
                <p className="mt-4 text-sm text-[#9ca3af]">
                  By the Castlestone Team &nbsp;·&nbsp; January 15, 2026 &nbsp;·&nbsp; 6 min read
                </p>
                <hr className="mt-8 border-[#e6dbc9]" />
              </div>
            </Container>
          </div>

          {/* Article content */}
          <section aria-label="Article content" className="pb-20">
            <Container>
              <div className="mx-auto max-w-3xl space-y-12 text-[#374151] leading-relaxed">

                {/* Intro */}
                <div className="space-y-4 pt-10">
                  <p className="text-lg">
                    <strong>47% of business owners say they&apos;re too overwhelmed by day-to-day operations to focus on growth</strong> (Microsoft). If you&apos;re nodding your head, you&apos;re not alone — and the fix isn&apos;t working harder. It&apos;s delegating smarter.
                  </p>
                  <p>
                    The good news: most of what&apos;s eating your time is repetitive, rules-based work that a skilled virtual assistant can own completely. Here are five tasks you should hand off today.
                  </p>
                </div>

                {/* Task 1 */}
                <div className="space-y-4">
                  <h2 className="font-heading border-l-4 border-[#c8a97e] pl-4 text-2xl font-bold text-[#222222]">
                    1. Email Inbox Management
                  </h2>
                  <p>
                    Most entrepreneurs spend 2–3 hours daily on email. Not reading strategy memos or closing deals — triaging newsletters, responding to &ldquo;quick questions,&rdquo; and digging through threads to find an attachment from three weeks ago. That&apos;s more than 700 hours a year on a single app.
                  </p>
                  <p>
                    A virtual assistant can triage your inbox every morning, respond to routine messages using templates you approve, flag anything that actually needs your attention, and systematically unsubscribe from junk. With the right setup, you can check your email once a day and see only what matters.
                  </p>
                  <p>
                    Some clients go from 400+ unread to a true zero-inbox system within the first two weeks of working with a VA. It&apos;s one of the highest-leverage first delegations you can make.
                  </p>
                  <div className="rounded-lg border border-[#c8a97e]/30 bg-[#c8a97e]/10 p-6 text-center">
                    <p className="font-heading text-3xl font-bold text-[#c8a97e]">2–3 hours</p>
                    <p className="mt-2 text-sm text-[#6b7280]">lost to email every single day</p>
                  </div>
                </div>

                {/* Task 2 */}
                <div className="space-y-4">
                  <h2 className="font-heading border-l-4 border-[#c8a97e] pl-4 text-2xl font-bold text-[#222222]">
                    2. Calendar &amp; Scheduling
                  </h2>
                  <p>
                    Back-and-forth scheduling is one of the biggest hidden time drains in any business. You send availability, they respond, there&apos;s a conflict, you resend, then a reminder gets missed — and a meeting that should have taken five minutes to book ends up eating thirty.
                  </p>
                  <p>
                    A VA manages your calendar end-to-end: sending invites, protecting buffer time between back-to-back meetings, handling rescheduling without looping you in, and making sure you actually arrive prepared. They can also build in focused work blocks so your calendar doesn&apos;t become an open-door policy.
                  </p>
                  <p>
                    Calendar chaos is almost always a delegation problem, not a technology problem. The tools are fine — someone just needs to own the system.
                  </p>
                  <div className="rounded-lg border border-[#c8a97e]/30 bg-[#c8a97e]/10 p-6 text-center">
                    <p className="font-heading text-3xl font-bold text-[#c8a97e]">Over 20%</p>
                    <p className="mt-2 text-sm text-[#6b7280]">of VA users delegate calendar management as their very first task</p>
                  </div>
                </div>

                {/* Task 3 */}
                <div className="space-y-4">
                  <h2 className="font-heading border-l-4 border-[#c8a97e] pl-4 text-2xl font-bold text-[#222222]">
                    3. Travel &amp; Logistics Planning
                  </h2>
                  <p>
                    Researching flight options, comparing hotel prices, booking ground transportation, building day-by-day itineraries, managing loyalty programs, handling cancellations — travel planning is one of those tasks that looks simple until you&apos;re 90 minutes into it wondering why you&apos;re comparing three separate airline tabs at midnight.
                  </p>
                  <p>
                    A VA handles all of it. You give them your destination, your preferences, your budget, and your dates. They hand you a clean itinerary, confirmation numbers, and anything you need to be where you&apos;re supposed to be — on time, with zero tabs open.
                  </p>
                  <p>
                    For frequent travelers, this alone pays for the entire VA engagement. The cognitive load of logistics is real, and removing it from your plate means you travel less stressed and more prepared.
                  </p>
                </div>

                {/* Task 4 */}
                <div className="space-y-4">
                  <h2 className="font-heading border-l-4 border-[#c8a97e] pl-4 text-2xl font-bold text-[#222222]">
                    4. CRM &amp; Lead Follow-Up
                  </h2>
                  <p>
                    This one is costing businesses real revenue. When leads come in through multiple channels — your website form, a referral, a trade show scan, a cold email reply — they often fall into a black hole. Someone means to follow up, life gets busy, and two weeks later that prospect has signed with a competitor.
                  </p>
                  <p>
                    A VA can own your entire follow-up system: updating your CRM as leads come in, sending follow-up emails within 24 hours, logging calls, tagging pipeline stages, and flagging leads that have gone cold so you can decide whether to re-engage. The system runs whether or not you remember to check it.
                  </p>
                  <p>
                    This is especially powerful for service businesses and agencies where personal follow-up makes the difference between closing a deal and losing it to inertia.
                  </p>
                  <div className="rounded-lg border border-[#c8a97e]/30 bg-[#c8a97e]/10 p-6 text-center">
                    <p className="font-heading text-3xl font-bold text-[#c8a97e]">30%</p>
                    <p className="mt-2 text-sm text-[#6b7280]">of inbound leads are never followed up on due to gap in process</p>
                  </div>
                </div>

                {/* Task 5 */}
                <div className="space-y-4">
                  <h2 className="font-heading border-l-4 border-[#c8a97e] pl-4 text-2xl font-bold text-[#222222]">
                    5. Research &amp; Reports
                  </h2>
                  <p>
                    Whether it&apos;s building a competitor analysis, comparing three software tools side-by-side, pulling together market data for a pitch deck, or summarizing a long report into a two-page brief — research is time-intensive and mentally exhausting to do yourself.
                  </p>
                  <p>
                    VAs with strong analytical skills can take a research request and deliver a finished document you can actually use. Not a pile of links and browser tabs — a structured summary with a clear recommendation. You get the output, not the process.
                  </p>
                  <p>
                    The compound effect here is significant: businesses that leverage VAs for research and reporting see up to a 35% improvement in workforce efficiency — not because the VA is working faster, but because the people who matter are freed to do only the work that requires them.
                  </p>
                </div>

                {/* Conclusion */}
                <div className="space-y-4 border-t border-[#e6dbc9] pt-10">
                  <p>
                    The pattern across all five tasks is the same: high frequency, low decision threshold, high time cost. These aren&apos;t strategic — they&apos;re operational. And operational work belongs in the hands of someone who can own it fully, not someone who squeezes it between the things that actually move the needle.
                  </p>
                  <p>
                    The best time to delegate was six months ago. The second-best time is this week. Start with whichever of these five tasks you hate the most — and let us help you find someone great to take it off your hands.
                  </p>
                </div>

                {/* Related Services */}
                <aside className="border-t border-[#e6dbc9] pt-8">
                  <p className="text-xs font-semibold uppercase tracking-widest text-[#9ca3af] mb-4">
                    Related Services
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Link
                      href="/services/virtual-assistant"
                      className="text-sm font-medium text-[#c8a97e] transition-colors hover:text-[#b69468]"
                    >
                      Virtual Assistant Services →
                    </Link>
                    <Link
                      href="/pricing"
                      className="text-sm font-medium text-[#c8a97e] transition-colors hover:text-[#b69468]"
                    >
                      View Pricing →
                    </Link>
                  </div>
                </aside>

                {/* CTA Box */}
                <div className="rounded-xl bg-[#c8a97e] p-8 text-center">
                  <h3 className="font-heading text-2xl font-bold text-white mb-2">
                    Ready to hand off your to-do list?
                  </h3>
                  <p className="mb-6 text-white/90">
                    Tell us what&apos;s taking up your time and we&apos;ll match you with a VA who can own it.
                  </p>
                  <Link
                    href="/book-demo"
                    className="inline-flex h-10 items-center justify-center rounded-sm bg-white px-6 text-sm font-medium text-[#222222] transition-colors hover:bg-white/90"
                  >
                    Meet Your VA
                  </Link>
                </div>

              </div>
            </Container>
          </section>
        </article>

        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </main>
      <Footer />
    </>
  )
}
