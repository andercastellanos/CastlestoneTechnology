import type { Metadata } from "next"
import Link from "next/link"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import Container from "@/components/shared/Container"
import { SOCIAL_IMAGES } from "@/lib/constants"

export const metadata: Metadata = {
  title: "Blog & Resources",
  description:
    "Insights on virtual assistants, remote work, and business efficiency from the Castlestone Technology team.",
  robots: { index: true, follow: true },
  alternates: { canonical: "/blog" },
  openGraph: {
    type: "website",
    title: "Blog & Resources | Castlestone Technology",
    description:
      "Insights on virtual assistants, remote work, and business efficiency from the Castlestone Technology team.",
    url: "https://castlestonetechnology.com/blog",
    siteName: "Castlestone Technology",
    images: SOCIAL_IMAGES.openGraph,
  },
  twitter: {
    card: "summary_large_image",
    images: SOCIAL_IMAGES.twitter,
    title: "Blog & Resources | Castlestone Technology",
    description:
      "Insights on virtual assistants, remote work, and business efficiency from the Castlestone Technology team.",
  },
}

type BlogEntry = {
  category: string
  title: string
  excerpt: string
  date?: string
  slug: string
  linkLabel?: string
}

const posts: BlogEntry[] = [
  {
    category: "Virtual Assistants",
    title: "5 Tasks You Should Stop Doing Yourself Right Now",
    excerpt:
      "From inbox management to scheduling, here are the recurring tasks that are costing you hours every week — and exactly how a VA can take them off your plate.",
    date: "January 15, 2026",
    slug: "/blog/5-tasks-to-delegate-to-your-va",
  },
  {
    category: "Remote Teams",
    title: "How to Onboard a Virtual Team Member in Under a Week",
    excerpt:
      "A practical checklist for getting a new remote team member up to speed fast, without the confusion or back-and-forth that usually slows things down.",
    date: "January 28, 2026",
    slug: "/blog/how-to-onboard-a-virtual-team-member",
  },
  {
    category: "Business Efficiency",
    title: "The Real Cost of Missed Calls for Small Businesses",
    excerpt:
      "Research shows that 85% of callers who can't reach a business won't call back. Here's what that means for your bottom line and how a virtual front desk changes the math.",
    date: "February 10, 2026",
    slug: "/blog/the-real-cost-of-missed-calls",
  },
  {
    category: "AI Receptionists",
    title: "How Do AI Receptionists Work?",
    excerpt:
      "Learn how AI receptionists answer calls, understand requests, book appointments, take messages, and hand off to your team, plus where their limits matter.",
    date: "November 4, 2026",
    slug: "/blog/how-do-ai-receptionists-work",
  },
  {
    category: "AI Receptionists",
    title: "AI Receptionist vs. Answering Service: An AI Answering Service Guide",
    excerpt:
      "Compare an AI answering service with a human answering service: how calls are handled, billing models, coverage, limitations, and the right fit for your business.",
    date: "November 4, 2026",
    slug: "/blog/ai-receptionist-vs-answering-service",
  },
  {
    category: "Web Design",
    title: "Web Design in Miami",
    excerpt:
      "Explore our team's Sky Travel J&M project, the industries we serve, and how a free consultation leads to a written fixed-scope website quote.",
    slug: "/blog/web-design-miami",
    linkLabel: "Explore web design in Miami →",
  },
  {
    category: "Web Design",
    title: "How Much Does a Website Cost in 2026?",
    excerpt:
      "Understand sourced market ranges, what drives a website's cost, and how to compare the scope of a design and build quote.",
    date: "November 7, 2026",
    slug: "/blog/how-much-does-a-website-cost",
    linkLabel: "Read the website cost guide →",
  },
  {
    category: "SMS Marketing",
    title: "SMS Marketing Platforms vs. Done-for-You SMS",
    excerpt:
      "Compare SMS marketing platforms with a managed service: setup, consent, opt-outs, sending hours, integrations, reporting, and the time your team needs.",
    date: "November 7, 2026",
    slug: "/blog/sms-marketing-platforms-vs-done-for-you",
    linkLabel: "Read the SMS comparison →",
  },
  {
    category: "Web Design",
    title: "WordPress vs Wix vs. a Custom Website",
    excerpt:
      "Compare WordPress, Wix, and a custom website on control, ease of use, maintenance, speed, SEO, ownership, and moving your business site later.",
    date: "November 7, 2026",
    slug: "/blog/wordpress-vs-wix-vs-custom-website",
    linkLabel: "Read the website platform comparison →",
  },
  {
    category: "Local SEO",
    title: "How to Make My Website Show Up on Google",
    excerpt:
      "A practical guide to Search Console, sitemaps, indexing requests, page titles, business details, mobile usability, useful content, and relevant links.",
    date: "November 7, 2026",
    slug: "/blog/how-to-make-your-website-show-up-on-google",
    linkLabel: "Read the Google visibility guide →",
  },
]

export default function BlogPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-[#f9f6f1] py-16">
          <Container>
            <div className="text-center">
              <h1 className="font-heading text-4xl font-bold tracking-tight text-[#222222] sm:text-5xl">
                Insights &amp; Resources
              </h1>
              <p className="mx-auto mt-4 max-w-xl text-lg text-[#6b7280]">
                Tips on virtual assistance, remote teams, and growing your business.
              </p>
            </div>
          </Container>
        </section>

        {/* Post grid */}
        <section className="py-20">
          <Container>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <article
                  key={post.title}
                  className="flex flex-col rounded-lg border border-[#c8a97e]/20 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                >
                  <span
                    className="inline-block self-start rounded-sm px-2 py-1 text-xs font-semibold uppercase tracking-wide"
                    style={{ backgroundColor: "#c8a97e1a", color: "#c8a97e" }}
                  >
                    {post.category}
                  </span>
                  <h2 className="font-heading mt-4 text-lg font-bold leading-snug text-[#222222]">
                    {post.title}
                  </h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-[#6b7280]">
                    {post.excerpt}
                  </p>
                  <div className="mt-5 flex items-center justify-between">
                    {post.date && <span className="text-xs text-[#9ca3af]">{post.date}</span>}
                    <Link
                      href={post.slug}
                      className="text-sm text-[#9ca3af] transition-colors hover:text-[#c8a97e]"
                    >
                      {post.linkLabel ?? "Read More →"}
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  )
}
