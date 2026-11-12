import { alternatesFor } from "@/lib/i18n"
import type { Metadata } from "next"
import Link from "next/link"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import Container from "@/components/shared/Container"
import { SITE_CONFIG, SOCIAL_IMAGES } from "@/lib/constants"
import { websiteCostSources } from "@/lib/page-data/web-design"

const TITLE = "How Much Does a Website Cost in 2026?"
const DESCRIPTION =
  "Understand website cost factors, sourced market ranges, ongoing expenses, and how Castlestone prepares a written fixed-scope quote after a free consultation."
const CANONICAL = "/blog/how-much-does-a-website-cost"
const PUBLISHED = "2026-11-07T08:00:00Z"
const KEYWORDS = [
  "how much does a website cost",
  "website cost factors",
  "website design quote",
]

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: KEYWORDS,
  authors: [{ name: "Castlestone Technology", url: "https://castlestonetechnology.com" }],
  robots: { index: true, follow: true },
  alternates: alternatesFor(CANONICAL),
  openGraph: {
    type: "article",
    locale: "en_US",
    title: TITLE,
    description: DESCRIPTION,
    url: CANONICAL,
    siteName: "Castlestone Technology",
    publishedTime: PUBLISHED,
    authors: ["Castlestone Technology"],
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
  author: { "@id": SITE_CONFIG.organizationId },
  publisher: { "@id": SITE_CONFIG.organizationId },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": new URL(CANONICAL, SITE_CONFIG.url).href,
  },
  image: new URL(SITE_CONFIG.ogImage, SITE_CONFIG.url).href,
  keywords: KEYWORDS.join(", "),
}

export default function WebsiteCostPost() {
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
                  Web Design
                </span>
                <h1 className="font-heading mt-4 text-4xl font-bold leading-tight text-[#222222] sm:text-5xl">
                  {TITLE}
                </h1>
                <p className="mt-4 text-sm text-[#9ca3af]">
                  By the Castlestone Team &nbsp;·&nbsp; November 7, 2026 &nbsp;·&nbsp; 6 min read
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
                    How much does a website cost when your small business needs more than a page that looks good? The answer depends on what you need to publish, what visitors should be able to do, and who will prepare the content and build the site. Start by defining that work, then use published market figures as context for a written quote.
                  </p>
                </div>

                <div className="space-y-4">
                  <h2 className="font-heading border-l-4 border-[#c8a97e] pl-4 text-2xl font-bold text-[#222222]">
                    What the published market figures tell you
                  </h2>
                  <p>
                    WebFX’s web design pricing guide reports an average range of {websiteCostSources.webfx.typicalRange}, with complex sites for larger businesses sometimes reaching {websiteCostSources.webfx.complexSiteCost}. Its methodology describes a survey of {websiteCostSources.webfx.surveyRespondents} U.S. marketing professionals. Those figures concern web design; the work included in a particular proposal still needs to be defined.
                  </p>
                  <p className="text-sm">
                    <a href={websiteCostSources.webfx.url} className="text-[#80613a] underline underline-offset-4 hover:text-foreground">Read WebFX’s web design pricing guide</a>
                  </p>
                  <p>
                    Clutch reports that most web design projects reviewed on its platform cost less than {websiteCostSources.clutch.mostProjectsBelow}. That describes reviewed projects on Clutch, rather than a universal price for a business website. Use the finding as another reference point when you compare a proposed scope.
                  </p>
                  <p className="text-sm">
                    <a href={websiteCostSources.clutch.url} className="text-[#80613a] underline underline-offset-4 hover:text-foreground">Read Clutch’s web design pricing guide</a>
                  </p>
                  <p>
                    The reports describe different groups of projects. A market range cannot tell you whether your content, booking flow, payment setup, or launch work is included. Before comparing a quote with either source, write down the result you need and the work required to deliver it.
                  </p>
                </div>

                <div className="space-y-4">
                  <h2 className="font-heading border-l-4 border-[#c8a97e] pl-4 text-2xl font-bold text-[#222222]">
                    Define the pages and the work inside them
                  </h2>
                  <p>
                    Start with the information visitors need to make a decision. List the services, products, locations, or experiences you need to explain, then identify which need their own page. A short page with supplied copy and images involves different work from a page that needs research, writing, and a new design.
                  </p>
                  <p>
                    Count page types as well as pages. A set of trip pages may share a layout, while a homepage, an inquiry page, and a detailed service page each need a different approach. Ask what is included in the design and build so the page count has a clear meaning.
                  </p>
                </div>

                <div className="space-y-4">
                  <h2 className="font-heading border-l-4 border-[#c8a97e] pl-4 text-2xl font-bold text-[#222222]">
                    Separate a feature from the process behind it
                  </h2>
                  <p>
                    A booking button can lead to an existing scheduling tool, or a project may need a more involved booking flow. Online payments can introduce product details, checkout decisions, and connections to services your business already uses. Explain what should happen before and after a customer takes that action.
                  </p>
                  <p>
                    Bring the names of your current tools to the consultation. Define what information needs to move between them and who will use it. A clear description helps the team assess the work, instead of discovering late that a simple-looking page depends on a separate business process.
                  </p>
                </div>

                <div className="space-y-4">
                  <h2 className="font-heading border-l-4 border-[#c8a97e] pl-4 text-2xl font-bold text-[#222222]">
                    DIY, freelancer, or agency: compare the responsibilities
                  </h2>
                  <p>
                    A do-it-yourself website builder can suit an owner who wants direct control and has time to arrange content, choose a design, and configure the site. Budget for that time as well as the platform. Check whether the plan supports the functions you need and what happens if you outgrow it.
                  </p>
                  <p>
                    A freelancer may suit a defined project when their skills match the work. Establish who handles design, writing, development, and launch, especially when those responsibilities involve different people. Ask how revisions are handled and what files, access, and documentation will be handed over.
                  </p>
                  <p>
                    An agency brings a team to the project. Compare how the team defines the scope and coordinates design, revisions, build, and launch. The useful question is which responsibilities the proposed engagement covers. A polished portfolio helps you assess the work, but the written scope tells you what you are buying.
                  </p>
                </div>

                <div className="space-y-4">
                  <h2 className="font-heading border-l-4 border-[#c8a97e] pl-4 text-2xl font-bold text-[#222222]">
                    Content, revisions, and timing change the scope
                  </h2>
                  <p>
                    Decide whether your business will provide ready-to-use text and images or needs help preparing them. Writing service descriptions, organizing existing material, and selecting content all require work. Make those responsibilities explicit so the project does not stall while everyone assumes someone else is supplying the copy.
                  </p>
                  <p>
                    Agree on how feedback will be gathered and which revisions belong in the project. Give the team your target timeline and any dependencies, such as new photography or approval from another stakeholder. Discuss changes to the brief before treating them as part of the original scope.
                  </p>
                </div>

                <div className="space-y-4">
                  <h2 className="font-heading border-l-4 border-[#c8a97e] pl-4 text-2xl font-bold text-[#222222]">
                    Plan for the costs that continue after launch
                  </h2>
                  <p>
                    Separate the website project from the services that keep it running. A domain name identifies the site, hosting makes it available, and maintenance addresses updates and changes over time. A website builder may bundle some services, while a custom setup may involve separate providers. Check ownership, access, and renewal terms.
                  </p>
                  <p>
                    Ask who will update content and keep connected tools working after launch. Confirm whether ongoing work is included, quoted separately, or handled by your business. Review any third-party subscriptions needed for bookings, payments, or other features. Avoid assuming that a build quote covers every future renewal or change.
                  </p>
                </div>

                <div className="space-y-4">
                  <h2 className="font-heading border-l-4 border-[#c8a97e] pl-4 text-2xl font-bold text-[#222222]">
                    How our quote process works
                  </h2>
                  <p>
                    At Castlestone, pricing is set after a free consultation. We discuss your pages, required features, connections to existing tools, content and copywriting needs, and timeline. You receive a written fixed-scope quote before work starts, giving the project an agreed definition before design and development move forward.
                  </p>
                  <p>
                    Our process is discovery call, written quote, design, revisions, build, and launch. Use the consultation to explain what your customers need to accomplish and what your team needs to manage. The quote should reflect that discussion so you can review the proposed work before committing to it.
                  </p>
                  <p>
                    To see how this works for a local business, explore our <Link href="/blog/web-design-miami" className="text-[#80613a] underline underline-offset-4 hover:text-foreground">web design in Miami</Link> page. It covers the industries we work with and what shapes a website quote, so you can bring your own requirements to the consultation.
                  </p>
                </div>

                <div className="space-y-4">
                  <h2 className="font-heading border-l-4 border-[#c8a97e] pl-4 text-2xl font-bold text-[#222222]">
                    Prepare for a useful consultation
                  </h2>
                  <p>
                    Bring your current website if you have one, examples of pages you like, a list of required content, and the tools your business uses. Identify the action visitors should take and who will approve the work. These details give a quote a stronger foundation than a request for a website with no defined scope.
                  </p>
                  <p>
                    How much does a website cost for your business? Start with what it needs to do, then compare proposals that describe the same work. A written scope makes the conversation about cost more useful and gives you a basis for deciding which approach fits your business.
                  </p>
                </div>

                {/* Related Services */}
                <aside className="border-t border-[#e6dbc9] pt-8">
                  <p className="text-xs font-semibold uppercase tracking-widest text-[#9ca3af] mb-4">
                    Related Services
                  </p>
                  <p className="mb-4 leading-relaxed">
                    For the pages, features and launch work behind a quote, explore our <Link href="/services/web-design" className="text-[#80613a] underline underline-offset-4 hover:text-foreground">web design services</Link>.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Link
                      href="/contact"
                      className="text-sm font-medium text-[#c8a97e] transition-colors hover:text-[#b69468]"
                    >
                      Contact our team →
                    </Link>
                  </div>
                </aside>

                {/* CTA Box */}
                <div className="rounded-xl bg-[#c8a97e] p-8 text-center">
                  <h3 className="font-heading text-2xl font-bold text-white mb-2">
                    Start with a clear website scope
                  </h3>
                  <p className="mb-6 text-white/90">
                    Book a free consultation to discuss your pages, features, content, and timeline. We provide a written fixed-scope quote before work starts.
                  </p>
                  <Link
                    href="/book-demo"
                    className="inline-flex h-10 items-center justify-center rounded-sm bg-white px-6 text-sm font-medium text-[#222222] transition-colors hover:bg-white/90"
                  >
                    Book a free website consultation
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
