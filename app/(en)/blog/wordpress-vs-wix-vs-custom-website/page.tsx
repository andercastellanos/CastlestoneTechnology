import type { Metadata } from "next"
import Link from "next/link"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import Container from "@/components/shared/Container"
import { SITE_CONFIG, SOCIAL_IMAGES } from "@/lib/constants"

const TITLE = "WordPress vs Wix vs. a Custom Website"
const DESCRIPTION = "Compare WordPress, Wix, and a custom website on control, ease of use, maintenance, speed, SEO, ownership, and moving your business site later."
const CANONICAL = "/blog/wordpress-vs-wix-vs-custom-website"
const PUBLISHED = "2026-11-07T08:00:00Z"
const KEYWORDS = ["wordpress vs wix", "custom website", "small business websites"]

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
                  Web Design
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
                    The WordPress vs Wix decision starts with how your business needs to run its website. Add a custom website to the comparison when your pages or workflows need a more specific approach. To choose well, look beyond the first design: consider who will edit the site, maintain it, connect your tools, and move it if your needs change.
                  </p>
                </div>
                <div className="space-y-4">
                  <h2 className="font-heading border-l-4 border-[#c8a97e] pl-4 text-2xl font-bold text-[#222222]">
                    Define the options before comparing them
                  </h2>
                  <p>
                    Here, WordPress means the self-hosted software available through WordPress.org. It differs from WordPress.com, a hosted service with its own plans and terms. The <a className="text-[#80613a] underline underline-offset-4 hover:text-foreground" href="https://wordpress.org/documentation/article/difference-between-wordpress-org-and-wordpress-com/">WordPress documentation explains that distinction</a>. When reviewing a proposal, ask which setup it describes and who manages the hosting account.
                  </p>
                  <p>
                    Wix is a hosted website platform. A custom website describes a tailored build, not a single product: it might include a content management system or rely on a development team for changes. Also, a WordPress website can have a custom design. Ask what technology and editing interface a proposed custom project actually includes.
                  </p>
                </div>
                <div className="space-y-4">
                  <h2 className="font-heading border-l-4 border-[#c8a97e] pl-4 text-2xl font-bold text-[#222222]">
                    Control and flexibility: start with required behavior
                  </h2>
                  <p>
                    WordPress offers themes, plugins, and code customization, as described in its <a className="text-[#80613a] underline underline-offset-4 hover:text-foreground" href="https://wordpress.org/about/features/">official feature overview</a>. That flexibility gives you options, but it also creates decisions. Ask how the proposed components work together, which ones are essential, and whether a future change would require replacing part of the setup.
                  </p>
                  <p>
                    For Wix, have the provider demonstrate your required booking, forms, product, or membership flow in the intended setup. Judge the actual workflow, including its limits. For a custom build, describe the behavior in plain terms: what the visitor enters, what information your staff receive, and what happens next. Put those requirements into the project scope.
                  </p>
                  <p>
                    A custom approach deserves consideration when an ordinary page hides a complicated process. Examples might include different inquiry routes for different services or a connection to an internal system. Treat these as requirements to investigate, not reasons to commission more software automatically. A simpler supported workflow may serve your business better.
                  </p>
                </div>
                <div className="space-y-4">
                  <h2 className="font-heading border-l-4 border-[#c8a97e] pl-4 text-2xl font-bold text-[#222222]">
                    Ease of use: try the tasks your staff will repeat
                  </h2>
                  <p>
                    Ask for an editing demonstration using your own material. Can a staff member change business hours, add a service, replace a photograph, and fix a broken link? Look at the mobile result after making those changes. A polished homepage demonstration tells you little about everyday publishing and approval work.
                  </p>
                  <p>
                    For WordPress, review the exact editor, theme, and permissions your team would use. For Wix, test the selected editor and relevant apps. For a custom website, confirm which content is editable and which changes require development. Request training and written instructions, then have the person who will maintain the content try the process.
                  </p>
                </div>
                <div className="space-y-4">
                  <h2 className="font-heading border-l-4 border-[#c8a97e] pl-4 text-2xl font-bold text-[#222222]">
                    Ongoing maintenance: name the responsible party
                  </h2>
                  <p>
                    Make a maintenance list before launch: hosting, backups, access management, software updates, security monitoring, broken forms, and third-party connections. For self-hosted WordPress, establish who maintains the software and tests changes. If hosting or an agency handles part of that work, ask what is included and how an issue is reported.
                  </p>
                  <p>
                    For Wix, distinguish platform operation from your business’s responsibility for content, accounts, and connected tools. For a custom site, ask who maintains its dependencies and deployment setup. Every option needs someone to check that inquiries still arrive and that important customer journeys work after changes. Record the support contact and response arrangements.
                  </p>
                </div>
                <div className="space-y-4">
                  <h2 className="font-heading border-l-4 border-[#c8a97e] pl-4 text-2xl font-bold text-[#222222]">
                    Speed and SEO: compare real pages
                  </h2>
                  <p>
                    Request a representative page with realistic images, forms, and third-party tools. Test it on a phone and a slower connection. Watch for a delayed main image, buttons that move during loading, or a booking form that is difficult to use. Ask what will be measured before launch and who handles performance issues afterward.
                  </p>
                  <p>
                    For search preparation, check that the proposal covers descriptive page titles, meta descriptions, useful headings, internal links, redirects, and a sitemap. These are concrete deliverables you can inspect. <a className="text-[#80613a] underline underline-offset-4 hover:text-foreground" href="https://developers.google.com/search/docs/fundamentals/seo-starter-guide">Google’s SEO Starter Guide</a> explains the basics; its <a className="text-[#80613a] underline underline-offset-4 hover:text-foreground" href="https://developers.google.com/search/docs/appearance/page-experience">page experience guidance</a> also makes clear that good performance scores alone do not guarantee high rankings.
                  </p>
                  <p>
                    Evaluate the implementation rather than accepting a promise attached to a platform name. Ask how the provider will handle your existing URLs, large images, and scripts from outside services. A website’s search work also includes the information it provides. Put content preparation and ongoing updates into the discussion alongside technical setup.
                  </p>
                </div>
                <div className="space-y-4">
                  <h2 className="font-heading border-l-4 border-[#c8a97e] pl-4 text-2xl font-bold text-[#222222]">
                    Ownership and moving the site later
                  </h2>
                  <p>
                    Keep the domain registration in an account your business controls. Document who owns the content, design assets, code, and third-party licenses under the contract. Confirm administrator access and recovery contacts before launch. These questions apply whether you use a platform, work with an agency, or commission a tailored build.
                  </p>
                  <p>
                    Wix states in its <a className="text-[#80613a] underline underline-offset-4 hover:text-foreground" href="https://support.wix.com/en/article/exporting-or-embedding-your-wix-site-elsewhere">guidance on exporting a Wix site</a> that the site needs to operate on Wix’s servers. Moving to another platform therefore requires planning a rebuild rather than assuming the same site can simply be uploaded elsewhere. Ask separately about exporting business data and retaining your domain.
                  </p>
                  <p>
                    With self-hosted WordPress, request a handover plan covering the database, files, media, and configuration. With a custom build, confirm source-code access, deployment instructions, and any services it depends on. Portability still takes work: another provider must understand the setup, and licenses or integrations may have their own transfer conditions.
                  </p>
                </div>
                <div className="space-y-4">
                  <h2 className="font-heading border-l-4 border-[#c8a97e] pl-4 text-2xl font-bold text-[#222222]">
                    Who each option can fit
                  </h2>
                  <p>
                    Consider Wix when your required workflow fits its available tools and your team is comfortable operating within a hosted platform. Consider WordPress when flexible publishing and an extensible setup matter, and you can assign maintenance. Consider a custom build when specific requirements justify tailored work and you have a plan for support and future changes.
                  </p>
                  <p>
                    Compare each option against the same brief: your pages, customer actions, integrations, editing tasks, and handover requirements. For a local planning discussion, explore <Link className="text-[#80613a] underline underline-offset-4 hover:text-foreground" href="/blog/web-design-miami">web design in Miami</Link>. To discuss a tailored scope, review our <Link className="text-[#80613a] underline underline-offset-4 hover:text-foreground" href="/services/technology-solutions">custom websites</Link>. Bring the workflow your business needs so the conversation ends with clear responsibilities and deliverables.
                  </p>
                </div>

                <div className="rounded-xl bg-[#c8a97e] p-8 text-center">
                  <h2 className="font-heading mb-2 text-2xl font-bold text-white">
                    Define what your website needs to do
                  </h2>
                  <p className="mb-6 text-white/90">
                    Bring your current site, required features, and editing needs to a consultation with the Castlestone team.
                  </p>
                  <Link
                    href="/book-demo"
                    className="inline-flex min-h-10 items-center justify-center rounded-sm bg-white px-6 py-2 text-sm font-medium text-[#222222] transition-colors hover:bg-white/90"
                  >
                    Book a website consultation
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
