import type { Metadata } from "next"
import Link from "next/link"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import Container from "@/components/shared/Container"

export const metadata: Metadata = {
  title: "Blog & Resources | Castlestone Technology",
  description:
    "Insights on virtual assistants, remote work, and business efficiency from the Castlestone Technology team.",
  robots: { index: true, follow: true },
  alternates: { canonical: "https://castlestonetechnology.com/blog" },
  openGraph: {
    type: "website",
    title: "Blog & Resources | Castlestone Technology",
    description:
      "Insights on virtual assistants, remote work, and business efficiency from the Castlestone Technology team.",
    url: "https://castlestonetechnology.com/blog",
    siteName: "Castlestone Technology",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Castlestone Technology Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog & Resources | Castlestone Technology",
    description:
      "Insights on virtual assistants, remote work, and business efficiency from the Castlestone Technology team.",
    images: ["/og-image.png"],
  },
}

const posts = [
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
                    <span className="text-xs text-[#9ca3af]">{post.date}</span>
                    <Link
                      href={post.slug}
                      className="text-sm text-[#9ca3af] transition-colors hover:text-[#c8a97e]"
                    >
                      Read More →
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
