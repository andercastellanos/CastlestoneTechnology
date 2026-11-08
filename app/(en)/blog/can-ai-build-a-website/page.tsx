import type { Metadata } from "next"
import Link from "next/link"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import Container from "@/components/shared/Container"
import { SITE_CONFIG, SOCIAL_IMAGES } from "@/lib/constants"

const TITLE = "Can AI Build a Website?"
const DESCRIPTION = "Learn where AI website builders help, what to test before launch, and how custom features, integrations, content and ownership affect the decision."
const CANONICAL = "/blog/can-ai-build-a-website"
const PUBLISHED = "2026-11-08T08:00:00Z"
const KEYWORDS = ["can ai build a website"]

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
                    Can AI build a website? Yes, AI tools can help produce layouts, page drafts, images, or code, depending on the tool you choose. That can make a first version easier to explore. It does not establish that the result supports your business process or is ready to publish. Judge the website by the tasks it handles, the information it contains, and the control your business retains after launch.
                  </p>
                </div>
                <div className="space-y-4">
                  <h2 className="font-heading border-l-4 border-[#c8a97e] pl-4 text-2xl font-bold text-[#222222]">Start with the job, not the generated homepage</h2>
                  <p>
                    Write down what a visitor needs to do: understand a service, request a quote, view a menu, book a consultation, or buy something. Then list what must happen inside your business after that action. A form that looks finished may still send messages to an unmonitored inbox. A booking button may lead to an account that belongs to the person who made the prototype. The whole journey belongs in the brief.
                  </p>
                  <p>
                    Use that brief when trying a builder. Ask it to create a representative service page and show the proposed next step. Review the wording with someone who handles real customer questions. If the prototype includes a testimonial, project, certification, or statistic you cannot substantiate, remove it. Generated material is a draft for review. It should never become the source of facts about your business.
                  </p>
                </div>
                <div className="space-y-4">
                  <h2 className="font-heading border-l-4 border-[#c8a97e] pl-4 text-2xl font-bold text-[#222222]">Use fast drafts to clarify decisions</h2>
                  <p>
                    AI tools can be useful for exploring a page structure, trying alternative headings, or preparing an initial layout. Ask for specific changes so you can compare the results: simplify the navigation, move service details before the form, or make the appointment instructions clearer. Keep the work grounded in actual content. An attractive sample with imaginary offers does not tell you whether the website will work for your customers.
                  </p>
                  <p>
                    Review the mobile version early. Replace sample images with assets your business has permission to use. Check heading order, readable text, button labels, and the information shown when an image does not load. Ask a staff member to find an important detail without coaching. These checks help you decide whether the draft is useful before you spend time polishing decorative details or building additional pages around it.
                  </p>
                </div>
                <div className="space-y-4">
                  <h2 className="font-heading border-l-4 border-[#c8a97e] pl-4 text-2xl font-bold text-[#222222]">Test custom features as real workflows</h2>
                  <p>
                    A standard contact form and a custom quoting process have different requirements. A tailored workflow might need conditional questions, different approval steps, or different access for staff and customers. Ask whether the selected tool supports the exact behavior. Request a demonstration with realistic sample information, including incomplete entries and unusual requests. A working example should show both the visitor experience and what staff receive afterward.
                  </p>
                  <p>
                    For a hypothetical service company, a quote request might need to route to different teams according to the job type. Test that routing instead of assuming a generated form has implemented it. Identify which decisions need a person and how that person is notified. Record the limits and required manual steps. If the builder cannot support a requirement, simplify the workflow or investigate a different approach before launch.
                  </p>
                </div>
                <div className="space-y-4">
                  <h2 className="font-heading border-l-4 border-[#c8a97e] pl-4 text-2xl font-bold text-[#222222]">Connections to other tools need more than a button</h2>
                  <p>
                    List the systems your business uses for scheduling, contacts, payments, and email. Describe what information must move between them and which system holds the authoritative record. Ask who configures each connection and investigates failures. A visible integration name does not explain whether a cancelled appointment, changed email address, or duplicate contact is handled correctly. Have the provider show the behavior your staff depend on.
                  </p>
                  <p>
                    Use test data and the provider’s test mode where available. Confirm what happens when a connection fails, when an account permission expires, and when someone enters an invalid value. Keep credentials in the appropriate account controls rather than page content or shared documents. Document the person responsible for support. If your team cannot recognize a failed workflow, an apparently successful launch can still leave inquiries unattended.
                  </p>
                </div>
                <div className="space-y-4">
                  <h2 className="font-heading border-l-4 border-[#c8a97e] pl-4 text-2xl font-bold text-[#222222]">Content strategy still requires business knowledge</h2>
                  <p>
                    Your website needs to explain the services you actually offer, the customers you serve, and the next step you can fulfill. AI can help draft language from a clear brief, but somebody inside the business must check scope, terminology, and promises. Separate similar services when customers need different information. Avoid publishing many repetitive pages merely because the tool can produce them quickly. Each page should answer a useful customer question.
                  </p>
                  <p>
                    Google’s <a className="text-[#80613a] underline underline-offset-4 hover:text-foreground" href="https://developers.google.com/search/docs/fundamentals/creating-helpful-content">people-first content guidance</a> emphasizes material that benefits readers. Use that as a review question rather than treating generated text as a shortcut to rankings. Would a prospective customer understand your process and limitations after reading the page? Are examples real and labeled accurately? Keep an owner for content updates when your services, hours, or contact details change.
                  </p>
                </div>
                <div className="space-y-4">
                  <h2 className="font-heading border-l-4 border-[#c8a97e] pl-4 text-2xl font-bold text-[#222222]">Clarify ownership before committing to a platform</h2>
                  <p>
                    Ask whose account holds the domain, hosting subscription, business email, and connected tools. Read the provider’s terms for generated assets, commercial use, code access, and cancellation. These arrangements vary, so do not assume that paying for a site gives you a portable copy of every feature. Request a handover plan and an explanation of what moving elsewhere would require. Keep recovery contacts under your business’s control.
                  </p>
                  <p>
                    Distinguish editing access from the ability to export or redeploy the site. A business may be able to change text while still depending on a particular platform or developer for important functions. Confirm which assets and records can be transferred, and which licenses or services require separate arrangements. Put those answers in writing before the website becomes essential to your daily operations. Ownership questions are easier to settle before a deadline.
                  </p>
                </div>
                <div className="space-y-4">
                  <h2 className="font-heading border-l-4 border-[#c8a97e] pl-4 text-2xl font-bold text-[#222222]">Decide when a team makes sense</h2>
                  <p>
                    A builder can suit a straightforward site when someone in your business can review content, configure the required tools, and maintain the result. A team deserves consideration when custom workflows, technical connections, content planning, or ongoing support exceed that capacity. Compare the responsibilities included in each approach. Ask who tests the full journey, who fixes a problem, and how staff receive the information needed to keep the site current.
                  </p>
                  <p>
                    Bring the same brief to every conversation. Include your pages, visitor actions, existing tools, access requirements, and handover questions. To discuss a scoped project with Castlestone, explore <Link className="text-[#80613a] underline underline-offset-4 hover:text-foreground" href="/blog/web-design-miami">web design in Miami</Link>. A useful decision comes from matching the approach to the work your business needs, with an agreed process for review, launch, and maintenance. The generated homepage is only the beginning of that assessment.
                  </p>
                </div>
                <div className="rounded-xl bg-[#c8a97e] p-8 text-center">
                  <h2 className="font-heading mb-2 text-2xl font-bold text-white">Define the website your business needs</h2>
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
