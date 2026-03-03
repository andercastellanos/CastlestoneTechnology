import type { Metadata } from "next"
import Link from "next/link"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import Container from "@/components/shared/Container"

const TITLE = "The Real Cost of Missed Calls for Small Businesses"
const DESCRIPTION =
  "Research shows 85% of callers who can't reach you won't call back. Here's what that means for your bottom line — and how a virtual front desk changes the math."
const CANONICAL = "https://castlestonetechnology.com/blog/the-real-cost-of-missed-calls"
const PUBLISHED = "2026-02-10T08:00:00Z"
const KEYWORDS = [
  "cost of missed calls",
  "missed call revenue loss",
  "virtual receptionist ROI",
  "small business missed calls",
  "virtual front desk",
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
        alt: "The Real Cost of Missed Calls | Castlestone Technology",
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

export default function BlogPost3() {
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
                  Business Efficiency
                </span>
                <h1 className="font-heading mt-4 text-4xl font-bold leading-tight text-[#222222] sm:text-5xl">
                  {TITLE}
                </h1>
                <p className="mt-4 text-sm text-[#9ca3af]">
                  By the Castlestone Team &nbsp;·&nbsp; February 10, 2026 &nbsp;·&nbsp; 5 min read
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
                    Missed calls cost small businesses an average of{" "}
                    <strong>$126,000 per year.</strong> That&apos;s not a typo. And the reason is simpler than you think: <strong>85% of callers who can&apos;t reach you will never call back</strong> — they&apos;ll call your competitor instead.
                  </p>
                  <p>
                    For most small businesses, the phone is still the primary revenue channel. Not a form. Not a chatbot. A phone call from someone who is ready to buy. Here&apos;s exactly what happens when that call goes unanswered.
                  </p>
                </div>

                {/* Section 1 */}
                <div className="space-y-4">
                  <h2 className="font-heading border-l-4 border-[#c8a97e] pl-4 text-2xl font-bold text-[#222222]">
                    The 85% Rule Nobody Talks About
                  </h2>
                  <p>
                    The research on call abandonment is stark. When a caller reaches voicemail or just rings out, 85% don&apos;t try again. Of those, 62% immediately call the next business they find — your competitor. Only 20% of callers sent to voicemail bother leaving a message at all, and of those, a full 67% of people ignore voicemails and delete them unheard.
                  </p>
                  <p>
                    The arithmetic here is brutal. The average small business answers only 37.8% of incoming calls during business hours. That means for every ten people who call your business, six of them never speak to anyone. They either gave up, left a voicemail you&apos;ll return two days later when they&apos;ve already moved on, or went straight to a competitor who picked up.
                  </p>
                  <p>
                    And it&apos;s not because small business owners don&apos;t care about their customers. It&apos;s because they&apos;re in a meeting, on another call, with a client, or simply understaffed for the call volume they&apos;re generating.
                  </p>
                  <div className="rounded-lg border border-[#c8a97e]/30 bg-[#c8a97e]/10 p-6 text-center">
                    <p className="font-heading text-3xl font-bold text-[#c8a97e]">62%</p>
                    <p className="mt-2 text-sm text-[#6b7280]">of your callers go straight to a competitor after one unanswered call</p>
                  </div>
                </div>

                {/* Section 2 */}
                <div className="space-y-4">
                  <h2 className="font-heading border-l-4 border-[#c8a97e] pl-4 text-2xl font-bold text-[#222222]">
                    The Hidden Math: What Each Call Is Really Worth
                  </h2>
                  <p>
                    Here&apos;s a framework for calculating your actual exposure. Take your monthly missed call volume, multiply by your average customer value, multiply by 12 months, then multiply by 0.85 — the percentage of those callers who won&apos;t try again. That&apos;s your annual revenue leak.
                  </p>
                  <p>
                    Concrete example: a service business missing 50 calls per month with an average customer value of $500 is leaking $255,000 per year in unrealized revenue. Not lost sales — just calls that went to voicemail.
                  </p>
                  <p>
                    The numbers get more dramatic by vertical. Home services businesses lose an average of $1,200 per missed call — when you account for the lifetime value of repeat service and referrals. In real estate, MIT research found that agents who don&apos;t respond within 5 minutes are 21 times less likely to qualify that lead. By minute 10, the conversation is almost certainly with someone else.
                  </p>
                  <div className="rounded-lg border border-[#c8a97e]/30 bg-[#c8a97e]/10 p-6 text-center">
                    <p className="font-heading text-3xl font-bold text-[#c8a97e]">$126,000</p>
                    <p className="mt-2 text-sm text-[#6b7280]">the average annual revenue lost to missed calls for small businesses</p>
                  </div>
                </div>

                {/* Section 3 */}
                <div className="space-y-4">
                  <h2 className="font-heading border-l-4 border-[#c8a97e] pl-4 text-2xl font-bold text-[#222222]">
                    After-Hours Is Where You&apos;re Bleeding Most
                  </h2>
                  <p>
                    Here&apos;s the part that surprises most business owners: your biggest missed-call problem probably isn&apos;t during business hours. It&apos;s evenings, weekends, and lunch breaks — the exact windows when most consumers and decision-makers actually have time to make the call.
                  </p>
                  <p>
                    For home services, healthcare, legal, and financial businesses especially, after-hours inquiries are peak conversion opportunities. A homeowner with a plumbing emergency at 7pm doesn&apos;t want to leave a voicemail — they want someone to pick up. The first business that does gets the job. If you&apos;re closed, they move on.
                  </p>
                  <p>
                    The painful reality: every after-hours call that goes unanswered is a lead you paid to generate — through paid ads, SEO, referrals, or word of mouth — handed directly to whoever picks up next. Your marketing budget funds your competitor&apos;s revenue.
                  </p>
                </div>

                {/* Section 4 */}
                <div className="space-y-4">
                  <h2 className="font-heading border-l-4 border-[#c8a97e] pl-4 text-2xl font-bold text-[#222222]">
                    How a Virtual Front Desk Changes the Math
                  </h2>
                  <p>
                    A virtual receptionist answers every call, greets every visitor, and routes every inquiry — at 70% less than the cost of an in-house hire. The economics are straightforward: a dedicated in-house receptionist costs $35,000–$50,000 per year in salary alone, before benefits, payroll taxes, or PTO. A virtual front desk from Castlestone starts at $1,200 per month.
                  </p>
                  <p>
                    More importantly, it flips the math on missed calls entirely. You stop leaking revenue at the top of the funnel. Every person who calls your business during business hours, after hours, or on weekends gets a real response. Your paid traffic converts. Your referrals don&apos;t bounce to a voicemail.
                  </p>
                  <p>
                    For most service businesses, the virtual front desk pays for itself by capturing a single client per month that would otherwise have been lost. For high-ticket verticals, it pays for itself on day one.
                  </p>
                </div>

                {/* Conclusion */}
                <div className="space-y-4 border-t border-[#e6dbc9] pt-10">
                  <p>
                    The math on missed calls isn&apos;t complicated — it&apos;s just uncomfortable to look at. Most small businesses have been absorbing this revenue loss for years and attributing it to something else: the economy, competition, slow seasons. But if 62% of your callers are going to a competitor after a single unanswered call, the lever isn&apos;t marketing spend. It&apos;s coverage.
                  </p>
                  <p>
                    If you want to stop losing leads you already paid for, the fix is simpler and more affordable than you probably think.
                  </p>
                </div>

                {/* Related Services */}
                <aside className="border-t border-[#e6dbc9] pt-8">
                  <p className="text-xs font-semibold uppercase tracking-widest text-[#9ca3af] mb-4">
                    Related Services
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Link
                      href="/services/virtual-front-desk"
                      className="text-sm font-medium text-[#c8a97e] transition-colors hover:text-[#b69468]"
                    >
                      Virtual Front Desk →
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
                    Stop sending leads to your competitor.
                  </h3>
                  <p className="mb-6 text-white/90">
                    See how the Castlestone Virtual Front Desk keeps every call answered — at a fraction of the cost of in-house reception.
                  </p>
                  <Link
                    href="/book-demo"
                    className="inline-flex h-10 items-center justify-center rounded-sm bg-white px-6 text-sm font-medium text-[#222222] transition-colors hover:bg-white/90"
                  >
                    See the Virtual Front Desk
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
