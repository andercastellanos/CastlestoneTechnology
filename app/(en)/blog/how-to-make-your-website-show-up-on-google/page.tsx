import type { Metadata } from "next"
import Link from "next/link"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import Container from "@/components/shared/Container"
import { SITE_CONFIG, SOCIAL_IMAGES } from "@/lib/constants"

const TITLE = "How to Make My Website Show Up on Google"
const DESCRIPTION = "A practical guide to Search Console, sitemaps, indexing requests, page titles, business details, mobile usability, useful content, and relevant links."
const CANONICAL = "/blog/how-to-make-your-website-show-up-on-google"
const PUBLISHED = "2026-11-07T08:00:00Z"
const KEYWORDS = ["how to make my website show up on google", "website indexing", "local SEO"]

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
                  By the Castlestone Team &nbsp;·&nbsp; <time dateTime={PUBLISHED}>November 7, 2026</time>
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
                    Learning how to make your website show up on Google starts with checking whether your pages can be found and understood. If you have been searching “how to make my website show up on Google,” begin with the checks below. Separate technical access problems from the work of making your pages useful for the customers you want to reach.
                  </p>
                </div>
                <div className="space-y-4">
                  <h2 className="font-heading border-l-4 border-[#c8a97e] pl-4 text-2xl font-bold text-[#222222]">
                    Check the page in Search Console
                  </h2>
                  <p>
                    Set up <a className="text-[#80613a] underline underline-offset-4 hover:text-foreground" href="https://search.google.com/search-console/about">Google Search Console</a> and verify access to your website’s property. Inspect the full address of an important page, such as your homepage or main service page. Record what the inspection reports about indexing and access. Give your website provider the exact URL and any reported problem rather than a general request to fix SEO.
                  </p>
                  <p>
                    Google’s <a className="text-[#80613a] underline underline-offset-4 hover:text-foreground" href="https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl">guidance on requesting a recrawl</a> explains that URL Inspection can be used to request crawling of individual pages you manage. A request does not guarantee inclusion in search results. Repeated requests for the same page will not speed up crawling, so investigate a reported issue before submitting again.
                  </p>
                </div>
                <div className="space-y-4">
                  <h2 className="font-heading border-l-4 border-[#c8a97e] pl-4 text-2xl font-bold text-[#222222]">
                    Submit a sitemap that reflects your live site
                  </h2>
                  <p>
                    Ask your website provider for the sitemap address; do not assume a particular filename without opening it. Review whether it lists your current public pages. Remove references to pages that should no longer be there, and make sure the important service pages have working links from the site’s navigation or related content.
                  </p>
                  <p>
                    Submit the sitemap through Search Console and review processing errors. Google’s <a className="text-[#80613a] underline underline-offset-4 hover:text-foreground" href="https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap">sitemap documentation</a> explains how to build and submit one, including using full URLs. A sitemap gives you a manageable inventory to discuss with your provider. Keep that inventory current when you add services, replace pages, or change the site structure.
                  </p>
                </div>
                <div className="space-y-4">
                  <h2 className="font-heading border-l-4 border-[#c8a97e] pl-4 text-2xl font-bold text-[#222222]">
                    Resolve access problems before rewriting everything
                  </h2>
                  <p>
                    Open the page in a private browser window without signing in. Check that it loads, shows the intended content, and does not send visitors somewhere unrelated. Ask your provider to review accidental indexing blocks, unavailable pages, and canonical settings when Search Console identifies a problem. Keep a record of the fix and the affected address.
                  </p>
                  <p>
                    Google’s <a className="text-[#80613a] underline underline-offset-4 hover:text-foreground" href="https://developers.google.com/search/docs/fundamentals/seo-starter-guide">SEO Starter Guide</a> explains how access restrictions can affect discovery and indexing. Use its guidance with the inspection report rather than changing technical settings at random. After a repair, retest the live page and request indexing where appropriate. Keep technical access work separate from decisions about the page’s message.
                  </p>
                </div>
                <div className="space-y-4">
                  <h2 className="font-heading border-l-4 border-[#c8a97e] pl-4 text-2xl font-bold text-[#222222]">
                    Write titles and descriptions for each page
                  </h2>
                  <p>
                    Give every important page a title that describes its service and, where relevant, its actual location. A hypothetical repair shop might use a title describing appliance repair in its service area, then write a page that supports that promise. Avoid giving every page the same generic title or stuffing several variations of a phrase into it.
                  </p>
                  <p>
                    Google’s <a className="text-[#80613a] underline underline-offset-4 hover:text-foreground" href="https://developers.google.com/search/docs/appearance/title-link">title-link documentation</a> says it uses several sources to generate search-result titles, including the title element and headings. Its <a className="text-[#80613a] underline underline-offset-4 hover:text-foreground" href="https://developers.google.com/search/docs/appearance/snippet">snippet guidance</a> explains that snippets usually come from page content and may use the meta description. Write a concise, accurate description, but expect the displayed text to vary with the search.
                  </p>
                </div>
                <div className="space-y-4">
                  <h2 className="font-heading border-l-4 border-[#c8a97e] pl-4 text-2xl font-bold text-[#222222]">
                    Keep business details clear and consistent
                  </h2>
                  <p>
                    Create a reference record for your business name, public address where appropriate, phone number, website, and opening hours. Compare it with your contact page, location pages, business profiles, and relevant directory listings. Correct outdated details after a move or number change. Use your genuine service area and business arrangements; do not add an address simply to target a city.
                  </p>
                  <p>
                    For technical markup, Google’s <a className="text-[#80613a] underline underline-offset-4 hover:text-foreground" href="https://developers.google.com/search/docs/appearance/structured-data/local-business">LocalBusiness documentation</a> describes how structured data can communicate details such as business hours and location information. Ask your provider whether it fits your site and whether it matches what customers can read. Treat accurate contact information as a customer-service task as well: call the number and test the directions.
                  </p>
                </div>
                <div className="space-y-4">
                  <h2 className="font-heading border-l-4 border-[#c8a97e] pl-4 text-2xl font-bold text-[#222222]">
                    Test mobile pages and loading speed
                  </h2>
                  <p>
                    Open your main pages on a phone and complete the action you want a customer to take. Can you read the service details, use the menu, call the business, and submit the form? Watch for oversized images, shifting buttons, and overlays that cover useful content. Test the booking journey through its final confirmation, including any outside tool.
                  </p>
                  <p>
                    Google’s <a className="text-[#80613a] underline underline-offset-4 hover:text-foreground" href="https://developers.google.com/search/docs/crawling-indexing/mobile/mobile-sites-mobile-first-indexing">mobile-first indexing guidance</a> says it uses the mobile version of content for indexing and ranking. Its <a className="text-[#80613a] underline underline-offset-4 hover:text-foreground" href="https://developers.google.com/search/docs/appearance/page-experience">page experience guidance</a> recommends assessing the overall experience and explains that good scores do not guarantee high rankings. Use performance reports to identify specific repairs, then retest the actual customer journey.
                  </p>
                </div>
                <div className="space-y-4">
                  <h2 className="font-heading border-l-4 border-[#c8a97e] pl-4 text-2xl font-bold text-[#222222]">
                    Publish answers to real customer questions
                  </h2>
                  <p>
                    Collect the questions customers ask before booking or requesting a quote. Explain what your service includes, which areas you serve, how appointments work, and what a customer needs to prepare. Give each main service enough detail to support a decision. Use examples only when you can label them accurately, and publish project claims only when you can substantiate them.
                  </p>
                  <p>
                    Google’s <a className="text-[#80613a] underline underline-offset-4 hover:text-foreground" href="https://developers.google.com/search/docs/fundamentals/creating-helpful-content">helpful-content guidance</a> describes a focus on information created to benefit people. Use that as an editing check: would the page still help a customer if they reached it through a direct link? Remove repetitive paragraphs and unsupported promises. Assign someone to update the page when your services or process change.
                  </p>
                </div>
                <div className="space-y-4">
                  <h2 className="font-heading border-l-4 border-[#c8a97e] pl-4 text-2xl font-bold text-[#222222]">
                    Earn relevant links and track useful progress
                  </h2>
                  <p>
                    Look for legitimate places where people already seek information about your business, such as a trade association directory or a supplier’s partner page when you qualify. Contribute useful information through real relationships. Google’s <a className="text-[#80613a] underline underline-offset-4 hover:text-foreground" href="https://developers.google.com/search/docs/fundamentals/seo-starter-guide#promoting">SEO Starter Guide discusses promoting a website</a>; its <a className="text-[#80613a] underline underline-offset-4 hover:text-foreground" href="https://developers.google.com/search/docs/essentials/spam-policies#link-spam">link-spam policies</a> prohibit schemes intended to manipulate rankings. Avoid buying packages of ranking links.
                  </p>
                  <p>
                    Keep a simple record of inspected pages, fixes, published content, and genuine inquiries. Review Search Console alongside your booking or contact records so visibility work stays connected to the business. If you need help organizing the next steps, explore our <Link className="text-[#80613a] underline underline-offset-4 hover:text-foreground" href="/services/local-seo">local SEO services</Link> and bring your current website and priority services to a consultation.
                  </p>
                </div>

                <div className="rounded-xl bg-[#c8a97e] p-8 text-center">
                  <h2 className="font-heading mb-2 text-2xl font-bold text-white">
                    Turn your website checks into a practical plan
                  </h2>
                  <p className="mb-6 text-white/90">
                    Discuss your pages, business information, and search priorities with the Castlestone team.
                  </p>
                  <Link
                    href="/book-demo"
                    className="inline-flex min-h-10 items-center justify-center rounded-sm bg-white px-6 py-2 text-sm font-medium text-[#222222] transition-colors hover:bg-white/90"
                  >
                    Book a local SEO consultation
                  </Link>
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
