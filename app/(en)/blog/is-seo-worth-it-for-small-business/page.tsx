import type { Metadata } from "next"
import Link from "next/link"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import Container from "@/components/shared/Container"
import { SITE_CONFIG, SOCIAL_IMAGES } from "@/lib/constants"

const TITLE = "Is SEO Worth It for Small Business?"
const DESCRIPTION = "Decide whether SEO fits your business by comparing customer demand, timelines, local versus national reach, measurement, and the capacity to handle inquiries."
const CANONICAL = "/blog/is-seo-worth-it-for-small-business"
const PUBLISHED = "2026-11-08T08:00:00Z"
const KEYWORDS = ["is seo worth it for small business"]

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: KEYWORDS,
  authors: [{ name: "Castlestone Team", url: SITE_CONFIG.url }],
  robots: { index: true, follow: true },
  alternates: { canonical: CANONICAL },
  openGraph: {
    type: "article",
    locale: "en_US",
    title: TITLE,
    description: DESCRIPTION,
    url: CANONICAL,
    siteName: SITE_CONFIG.name,
    publishedTime: PUBLISHED,
    authors: ["Castlestone Team"],
    images: SOCIAL_IMAGES.openGraph,
  },
  twitter: {
    card: "summary_large_image",
    images: SOCIAL_IMAGES.twitter,
    title: TITLE,
    description: DESCRIPTION,
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: TITLE,
  description: DESCRIPTION,
  datePublished: PUBLISHED,
  dateModified: PUBLISHED,
  author: { "@type": "Organization", name: "Castlestone Team", url: SITE_CONFIG.url },
  publisher: { "@id": SITE_CONFIG.organizationId },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": new URL(CANONICAL, SITE_CONFIG.url).href,
  },
  image: new URL(SITE_CONFIG.ogImage, SITE_CONFIG.url).href,
  keywords: KEYWORDS.join(", "),
}

export default function BlogPost() {
  return (
    <>
      <Header />
      <main>
        <article>
          <div className="bg-background py-16">
            <Container>
              <div className="mx-auto max-w-3xl">
                <span className="inline-block rounded-sm border border-[#c8a97e]/30 bg-[#c8a97e]/15 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-[#c8a97e]">
                  Local SEO
                </span>
                <h1 className="font-heading mt-4 text-4xl font-bold leading-tight text-[#222222] sm:text-5xl">
                  {TITLE}
                </h1>
                <p className="mt-4 text-sm text-[#9ca3af]">
                  By the Castlestone Team &nbsp;·&nbsp; <time dateTime={PUBLISHED}>November 8, 2026</time>
                </p>
                <hr className="mt-8 border-[#e6dbc9]" />
              </div>
            </Container>
          </div>
          <section aria-label="Article content" className="pb-20">
            <Container>
              <div className="mx-auto max-w-3xl space-y-12 leading-relaxed text-[#374151]">
                <div className="space-y-4 pt-10">
                  <p>
                    Is SEO worth it for small business? It can be, when customers search for what you offer, your website can answer their questions, and your business can invest in ongoing improvements. It may be a poor fit when you need immediate demand or cannot serve additional inquiries. Decide against your own goals and operating constraints. A higher position or a larger traffic report is not the same thing as a profitable customer relationship.
                  </p>
                </div>
                <div className="space-y-4">
                  <h2 className="font-heading border-l-4 border-[#c8a97e] pl-4 text-2xl font-bold text-[#222222]">Establish whether search matches how customers buy</h2>
                  <p>
                    Ask recent customers how they found you and what they needed to know before contacting you. Review the services that matter most to your business. Search work is easier to assess when you can identify a real customer need and a page that should address it. Do not begin by collecting a large list of phrases unrelated to the work you want to deliver. Relevance matters more than the size of a keyword spreadsheet.
                  </p>
                  <p>
                    Consider the information a customer needs to choose you: service availability, area served, preparation, timing, or the difference between your offerings. Review whether the current website provides it clearly. If a visitor cannot tell what happens after submitting a form, more traffic may only expose that problem to more people. Improve the customer journey alongside discovery. SEO should support a useful destination rather than compensate for an unclear offer.
                  </p>
                </div>
                <div className="space-y-4">
                  <h2 className="font-heading border-l-4 border-[#c8a97e] pl-4 text-2xl font-bold text-[#222222]">Plan in months rather than expecting a quick rescue</h2>
                  <p>
                    Treat SEO as a program of work over months, not a promise of results within weeks. There may be technical repairs, content preparation, review cycles, and changes that need time to be discovered. Google’s <a className="text-[#80613a] underline underline-offset-4 hover:text-foreground" href="https://developers.google.com/search/docs/fundamentals/seo-starter-guide">SEO Starter Guide</a> explains that changes can take different amounts of time, including several months, and may not produce a noticeable impact. A timetable should identify deliverables and review points without guaranteeing rankings.
                  </p>
                  <p>
                    If you need inquiries immediately to keep operating, discuss channels and actions that fit that urgency before committing scarce resources to a longer effort. Improving a broken contact form may be more pressing than publishing another article. Ask what can be assessed now, what requires ongoing work, and what evidence would change the plan. Separate urgent operational fixes from expectations about future search demand. That makes the decision more honest.
                  </p>
                </div>
                <div className="space-y-4">
                  <h2 className="font-heading border-l-4 border-[#c8a97e] pl-4 text-2xl font-bold text-[#222222]">Measure visibility, useful visits, and confirmed outcomes separately</h2>
                  <p>
                    Begin with a baseline of the pages people reach and the actions that matter to your business. Record search visibility and visits, then compare them with completed inquiries, qualified conversations, confirmed appointments, or sales. Define each outcome before creating the report. Someone opening a booking page has not completed an appointment. A clicked phone link does not establish that a call connected or that the caller became a customer.
                  </p>
                  <p>
                    Include the quality of inquiries in the review. Ask whether they concern services you provide and locations you serve, and whether staff can respond promptly. Keep notes about unrelated changes, such as a new offer, a holiday closure, or another campaign. Those changes can affect results too. Avoid crediting every sale to SEO simply because search traffic increased during the same period. A report should make uncertainty visible rather than conceal it.
                  </p>
                </div>
                <div className="space-y-4">
                  <h2 className="font-heading border-l-4 border-[#c8a97e] pl-4 text-2xl font-bold text-[#222222]">Compare the economics using your own records</h2>
                  <p>
                    Use your actual costs, capacity, and customer records when evaluating an engagement. Include the time spent approving content, supplying images, reviewing reports, and handling inquiries. A provider’s fee is only part of the commitment. Decide which services you want to grow and whether your business can fulfill them sustainably. Do not use an invented industry conversion rate to make the proposal look affordable. If a needed figure is unknown, measure it first.
                  </p>
                  <p>
                    Agree on how you will judge progress and when to revisit the scope. Ask what work the provider will complete, what information your team must supply, and what dependencies could delay it. Check whether the engagement improves assets you can keep using, such as clearer service pages or corrected business information. That does not guarantee a financial return, but it gives you concrete work to review when assessing the next step.
                  </p>
                </div>
                <div className="space-y-4">
                  <h2 className="font-heading border-l-4 border-[#c8a97e] pl-4 text-2xl font-bold text-[#222222]">Understand local SEO versus national SEO</h2>
                  <p>
                    Local SEO concerns customers looking for a business in a particular area or a service available near them. A local plan should start with genuine service coverage, accurate business information, and pages that explain relevant services. National SEO addresses an audience across a wider geography. The content and customer journey should reflect that reach. A national ambition is not a reason to publish city pages that imply offices or projects you do not have.
                  </p>
                  <p>
                    Consider a hypothetical home-service company that can only accept jobs within its operating area. A broad audience outside that area may bring little value, even if traffic rises. A business delivering a remote service across the country may need a different plan. Describe the customer and the delivery model before choosing geographic targets. Keep the website’s location claims aligned with how the business actually operates and what it can substantiate.
                  </p>
                </div>
                <div className="space-y-4">
                  <h2 className="font-heading border-l-4 border-[#c8a97e] pl-4 text-2xl font-bold text-[#222222]">Know when to pause or choose another priority</h2>
                  <p>
                    SEO may need to wait if your service is still changing, your website is being replaced, or nobody can review business information. It may also be a weak priority when customers rarely search for the offering or when existing demand already exceeds your capacity. These are reasons to investigate and sequence the work carefully. Avoid taking on an ongoing commitment simply because a competitor publishes frequently or a sales pitch predicts missed revenue.
                  </p>
                  <p>
                    Ask for a limited assessment when the problem is unclear. You may need access repairs, a better service page, consistent listings, or a measurement plan before a larger program makes sense. Be cautious about proposals that guarantee a position, hide the work performed, or report only flattering totals. Request plain explanations and examples of the deliverables. You should be able to understand what you are buying without becoming a search specialist.
                  </p>
                </div>
                <div className="space-y-4">
                  <h2 className="font-heading border-l-4 border-[#c8a97e] pl-4 text-2xl font-bold text-[#222222]">Make the next decision reviewable</h2>
                  <p>
                    Write a brief with your priority services, real coverage, current website, capacity, and the customer actions you want to support. Bring the records you already have and label the gaps. Ask a provider to explain the proposed work, responsibilities, and review process against that brief. For a local discussion, explore our <Link className="text-[#80613a] underline underline-offset-4 hover:text-foreground" href="/services/local-seo">local SEO services</Link>. The right starting point is a plan you can assess against your business, without a promised ranking or an invented return.
                  </p>
                </div>
                <div className="rounded-xl bg-[#c8a97e] p-8 text-center">
                  <h2 className="font-heading mb-2 text-2xl font-bold text-white">Discuss whether SEO fits your business</h2>
                  <p className="mb-6 text-white/90">Bring your business goals, current tools, and questions to a consultation with the Castlestone team.</p>
                  <Link href="/book-demo" className="inline-flex min-h-10 items-center justify-center rounded-sm bg-white px-6 py-2 text-sm font-medium text-[#222222] transition-colors hover:bg-white/90">Book a consultation with our team</Link>
                </div>
              </div>
            </Container>
          </section>
        </article>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
      </main>
      <Footer />
    </>
  )
}
