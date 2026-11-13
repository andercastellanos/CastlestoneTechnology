import { alternatesFor } from "@/lib/i18n"
import type { Metadata } from "next"
import Link from "next/link"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import Container from "@/components/shared/Container"
import { SITE_CONFIG, SOCIAL_IMAGES } from "@/lib/constants"

const TITLE = "GEO vs. SEO: Generative Engine Optimization for ChatGPT"
const DESCRIPTION = "Understand GEO and SEO, what a local business can improve for AI search, and why accurate information and useful pages matter more than visibility promises."
const CANONICAL = "/blog/geo-vs-seo"
const PUBLISHED = "2026-11-08T08:00:00Z"
const KEYWORDS = ["generative engine optimization"]

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: KEYWORDS,
  authors: [{ name: "Castlestone Team", url: SITE_CONFIG.url }],
  robots: { index: true, follow: true },
  alternates: alternatesFor(CANONICAL),
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
                  AI Search
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
                    Generative engine optimization is a term for improving how a business can be found and understood in search experiences that generate answers. Owners often encounter it as GEO while asking how to show up in ChatGPT. It overlaps with familiar SEO work, but the reporting and presentation can differ. Begin with accurate public information and helpful service pages. Treat any promise of a guaranteed recommendation as a reason to ask harder questions.
                  </p>
                </div>
                <div className="space-y-4">
                  <h2 className="font-heading border-l-4 border-[#c8a97e] pl-4 text-2xl font-bold text-[#222222]">Understand the difference without buying a new vocabulary</h2>
                  <p>
                    Traditional SEO focuses on helping people discover a website through search and understand whether it answers their needs. GEO discussions focus on visibility within generated answers, including references to businesses or links to supporting pages. These are useful distinctions for planning, but a new label does not identify which work your website actually needs. Ask a provider to name the pages, records, and customer questions it will improve.
                  </p>
                  <p>
                    Google’s <a className="text-[#80613a] underline underline-offset-4 hover:text-foreground" href="https://developers.google.com/search/docs/fundamentals/ai-optimization-guide">guide to generative AI search features</a> explains that its AI search experiences still rely on foundational SEO. That is guidance about Google, not a specification for every other product. Use it to resist separate packages built around unsupported tricks. Ask which recommendations come from a platform’s documentation and which are the provider’s own hypotheses. A practical proposal should distinguish the two.
                  </p>
                </div>
                <div className="space-y-4">
                  <h2 className="font-heading border-l-4 border-[#c8a97e] pl-4 text-2xl font-bold text-[#222222]">Check whether your content can be accessed</h2>
                  <p>
                    Before discussing citations, confirm that important pages are public, readable, and connected through working navigation. Ask your website provider to inspect access restrictions, error pages, and accidental blocks. Review the page a customer actually receives rather than an editor preview. Keep useful service information in the page itself, and make sure a visitor can reach the relevant location or booking details without guessing where to look.
                  </p>
                  <p>
                    For ChatGPT search specifically, <a className="text-[#80613a] underline underline-offset-4 hover:text-foreground" href="https://developers.openai.com/api/docs/bots">OpenAI’s crawler documentation</a> identifies OAI-SearchBot as its search crawler and recommends allowing it for search visibility. It distinguishes that control from GPTBot, which concerns model training. Ask your provider to review the relevant crawler and network rules against the documentation. Allowing access does not mean your business will be recommended for a particular question. Keep a copy of the settings and their purpose.
                  </p>
                </div>
                <div className="space-y-4">
                  <h2 className="font-heading border-l-4 border-[#c8a97e] pl-4 text-2xl font-bold text-[#222222]">Make business listings agree with the real business</h2>
                  <p>
                    Start with a master record of the business name, website, phone number, hours, services, and genuine service area. Compare the listings your customers use with that record. Correct old locations, disconnected phone numbers, duplicate records, and outdated service descriptions. Use an address only when it accurately represents the business and fits the platform’s rules. Adding a city name to a listing should not imply an office you do not have.
                  </p>
                  <p>
                    Assign an owner for changes after a move, holiday schedule, or service update. Ask that person to check the website, relevant profiles, and important directories together. A customer should be able to recognize the same business across them. This is sensible information management; it is not evidence that changing a directory field automatically produces an AI recommendation. Keep a record of the corrections so you can explain what changed.
                  </p>
                </div>
                <div className="space-y-4">
                  <h2 className="font-heading border-l-4 border-[#c8a97e] pl-4 text-2xl font-bold text-[#222222]">Write service pages that answer buying questions</h2>
                  <p>
                    Explain what the service includes, where it is available, who it fits, and what a customer should prepare. Use headings that make those answers easy to find. Describe limits as carefully as capabilities: an emergency request, a custom requirement, or an unsupported area should lead to a clear next step. A visitor needs enough information to decide whether contacting you makes sense before filling out a form.
                  </p>
                  <p>
                    For a hypothetical repair business, a useful page might separate routine appointments from urgent inquiries and explain which details help staff assess a request. That is more valuable to a prospective customer than repeating the city name throughout a generic page. Use genuine project examples only when you can explain the business relationship and the work performed. Have someone familiar with the service check every operational claim before publication.
                  </p>
                </div>
                <div className="space-y-4">
                  <h2 className="font-heading border-l-4 border-[#c8a97e] pl-4 text-2xl font-bold text-[#222222]">Treat reviews as customer feedback, not a ranking shortcut</h2>
                  <p>
                    Invite genuine feedback through the review process your chosen platform permits. Do not write reviews for customers, invent testimonials, or offer a predetermined statement for them to copy. Ask staff to identify recurring questions and confusion in real feedback. Those patterns can improve the website and the service itself. A review request should be part of a consistent customer process, with a named person responsible for responses.
                  </p>
                  <p>
                    When you respond, protect customer information and address the issue without turning the reply into a promotional script. If several customers misunderstand the same service boundary, clarify that boundary on the relevant page. Do not promise that a specific review count will cause ChatGPT to recommend the business. Without platform evidence, a threshold is only a sales claim. Focus on truthful information that a customer can evaluate.
                  </p>
                </div>
                <div className="space-y-4">
                  <h2 className="font-heading border-l-4 border-[#c8a97e] pl-4 text-2xl font-bold text-[#222222]">Earn useful references and measure what follows</h2>
                  <p>
                    Look for legitimate contexts where your business belongs: an association directory, a supplier listing, or a local publication with an actual reason to cover your work. Provide accurate details and substantiate any project story. Do not confuse paid mentions or copied directory entries with independent recommendations. The aim is to make information useful where people already look, while avoiding a promise that every reference produces search visibility.
                  </p>
                  <p>
                    For measurement, record the question, date, product, location context, and any cited source when checking an AI answer. Treat the result as an observation, not a permanent position. Compare relevant referral visits and actual inquiries with your wider search work. To discuss the foundations together, explore our <Link className="text-[#80613a] underline underline-offset-4 hover:text-foreground" href="/services/local-seo">local SEO and AI search services</Link>. Bring your current listings, service pages, and customer questions rather than a request for a guaranteed citation.
                  </p>
                </div>
                <div className="rounded-xl bg-[#c8a97e] p-8 text-center">
                  <h2 className="font-heading mb-2 text-2xl font-bold text-white">Review your local and AI search foundations</h2>
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
