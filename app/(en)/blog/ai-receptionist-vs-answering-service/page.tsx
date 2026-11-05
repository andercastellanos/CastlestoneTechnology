import type { Metadata } from "next"
import Link from "next/link"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import Container from "@/components/shared/Container"
import { SITE_CONFIG, SOCIAL_IMAGES } from "@/lib/constants"

const TITLE = "AI Receptionist vs. Answering Service: An AI Answering Service Guide"
const DESCRIPTION =
  "Compare an AI answering service with a human answering service: how calls are handled, billing models, coverage, limitations, and the right fit for your business."
const CANONICAL = "/blog/ai-receptionist-vs-answering-service"
const PUBLISHED = "2026-11-04T08:00:00Z"
const KEYWORDS = [
  "ai answering service",
  "AI receptionist vs answering service",
  "small business call answering",
]

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: KEYWORDS,
  authors: [{ name: "Castlestone Technology", url: "https://castlestonetechnology.com" }],
  robots: { index: true, follow: true },
  alternates: { canonical: CANONICAL },
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
    "@id": new URL(CANONICAL, SITE_CONFIG.url).href,
  },
  image: new URL(SITE_CONFIG.ogImage, SITE_CONFIG.url).href,
  keywords: KEYWORDS.join(", "),
}

export default function AiReceptionistVsAnsweringServicePost() {
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
                  AI Receptionists
                </span>
                <h1 className="font-heading mt-4 text-4xl font-bold leading-tight text-[#222222] sm:text-5xl">
                  {TITLE}
                </h1>
                <p className="mt-4 text-sm text-[#9ca3af]">
                  By the Castlestone Team &nbsp;·&nbsp; November 4, 2026 &nbsp;·&nbsp; 6 min read
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
                    An AI answering service and a human answering service can both handle calls when your team cannot pick up. The difference is who handles the conversation and how that service reaches an outcome. An AI receptionist uses software and configured tools; a human answering service uses people working from your instructions.
                  </p>
                  <p>
                    For a small business, the choice depends on the calls you receive, the actions callers need, and the backup you can provide. Compare those details before choosing a provider. A low monthly fee or a friendly greeting tells you little about whether a customer can book correctly or reach the right person.
                  </p>
                </div>

                <div className="space-y-4">
                  <h2 className="font-heading border-l-4 border-[#c8a97e] pl-4 text-2xl font-bold text-[#222222]">
                    How an AI answering service handles calls
                  </h2>
                  <p>
                    An AI receptionist receives a routed call, processes the spoken request, and responds using your business information and instructions. Depending on its configured connections, it may answer routine questions, check a calendar, create an appointment, collect a message, or transfer the caller. Each action needs to be supported by the service you select.
                  </p>
                  <p>
                    The owner supplies the boundaries: what information is approved, which tasks are allowed, and when to involve staff. If a caller asks for something outside those boundaries, the service needs a fallback. That might be taking a message or offering a transfer, rather than attempting to resolve an unfamiliar issue.
                  </p>
                </div>

                <div className="space-y-4">
                  <h2 className="font-heading border-l-4 border-[#c8a97e] pl-4 text-2xl font-bold text-[#222222]">
                    How a human answering service handles calls
                  </h2>
                  <p>
                    A human answering service routes calls to receptionists who use your greeting, reference information, and call instructions. They can ask follow-up questions and respond to the conversation as it develops. The scope varies: some arrangements focus on messages, while others include scheduling, screening, or transfers.
                  </p>
                  <p>
                    A person still needs accurate instructions and access to the right tools. A receptionist cannot confirm a booking without an approved scheduling process, and cannot authorize an exception you have not delegated. Ask how agents learn your procedures, how updates reach them, and what happens when the answer is not in the instructions.
                  </p>
                </div>

                <div className="space-y-4">
                  <h2 className="font-heading border-l-4 border-[#c8a97e] pl-4 text-2xl font-bold text-[#222222]">
                    Compare the billing model, not just the headline fee
                  </h2>
                  <p>
                    AI services may offer flat monthly software plans. Check whether the charge includes a usage allowance and whether extra calls or minutes create additional charges. Ask about setup, supported integrations, and any separate human assistance. Avoid treating a subscription as unlimited coverage unless the agreement actually says so.
                  </p>
                  <p>
                    For a human answering service, ask whether billing is per minute, per call, or a package with an allowance. Find out what counts as a billable interaction, how transfers are treated, and what happens when usage exceeds the package. Request the full terms rather than estimating from an advertised starting point.
                  </p>
                  <p>
                    Use the same sample of your recent call activity for both quotes. Include the types of calls, approximate length, and tasks required. Then compare the likely bill alongside the work your staff will still handle. A service that only collects details and one that completes bookings are doing different amounts of work.
                  </p>
                </div>

                <div className="space-y-4">
                  <h2 className="font-heading border-l-4 border-[#c8a97e] pl-4 text-2xl font-bold text-[#222222]">
                    Availability means more than picking up
                  </h2>
                  <p>
                    Check the actual coverage offered by each provider, including evenings, weekends, holidays, and busy periods. Software can be configured to answer outside office hours, but that does not make your staff or scheduling tools available. Human services also have specific coverage arrangements. Confirm the hours and backup procedures in the plan you are considering.
                  </p>
                  <p>
                    Ask what happens when calls arrive together, a transfer goes unanswered, or a connected system is unavailable. Can the provider collect a message? Who receives it? What will the caller be told about a response? A clear next step matters even when the original request cannot be completed during the call.
                  </p>
                </div>

                <div className="space-y-4">
                  <h2 className="font-heading border-l-4 border-[#c8a97e] pl-4 text-2xl font-bold text-[#222222]">
                    When an AI receptionist may fit
                  </h2>
                  <p>
                    Consider AI when a substantial share of your calls follow a process you can explain clearly. Examples include callers asking about hours, requesting a standard appointment, or leaving details for a callback. These tasks give you specific outcomes to test before deciding whether the service meets your needs.
                  </p>
                  <p>
                    You also need someone to maintain the information and review problems. Changes to services, appointment rules, or contact numbers should reach the receptionist promptly. If the owner is the only person who can approve every next step, automation may simply move the interruption from the phone to an inbox.
                  </p>
                </div>

                <div className="space-y-4">
                  <h2 className="font-heading border-l-4 border-[#c8a97e] pl-4 text-2xl font-bold text-[#222222]">
                    When a human answering service may fit
                  </h2>
                  <p>
                    Consider a human service when callers often need help explaining an unusual situation, discussing a complaint, or deciding which person should handle their request. A conversation that requires careful judgment may benefit from a trained person, provided the service gives that person the time, information, and authority needed.
                  </p>
                  <p>
                    Listen to sample calls and test the actual workflow. The label human does not guarantee familiarity with your business, and a scripted message service may have narrow limits. Ask how a receptionist handles a request that falls between categories and whether they can reach staff without making the caller repeat everything.
                  </p>
                </div>

                <div className="space-y-4">
                  <h2 className="font-heading border-l-4 border-[#c8a97e] pl-4 text-2xl font-bold text-[#222222]">
                    When combining the two makes sense
                  </h2>
                  <p>
                    You may decide to use AI for defined routine tasks and people for exceptions. That arrangement needs a clear handoff rule. For example, an appointment request can stay with the automated process, while a disputed charge goes to staff. A caller who asks for a person should have an approved route to one.
                  </p>
                  <p>
                    Confirm who provides that human support and when it is available. A transfer to your own phone is different from access to a staffed answering team. Check which call details travel with the handoff and how any added work is billed. The combined process needs testing just as much as either service on its own.
                  </p>
                </div>

                <div className="space-y-4">
                  <h2 className="font-heading border-l-4 border-[#c8a97e] pl-4 text-2xl font-bold text-[#222222]">
                    Make the decision with your own calls
                  </h2>
                  <p>
                    Write down your common call types and the outcome each needs. Separate questions that have an approved answer from requests that need a booking, a callback, or a decision by staff. Use those scenarios in a demonstration of each service, including a confusing request and an unanswered transfer.
                  </p>
                  <p>
                    Evaluate what happened after the greeting: was the information accurate, was the task completed, and was the next step clear? Choose the arrangement that handles those outcomes within a cost model you understand. Revisit the setup when your services or call patterns change, rather than leaving the original instructions in place indefinitely.
                  </p>
                </div>

                <div className="space-y-4 border-t border-[#e6dbc9] pt-10">
                  <p>
                    The right choice follows your call requirements. An AI answering service needs defined tasks, reliable tool connections, and human backup. A human answering service needs trained staff, current instructions, and clear authority. Compare both against the same real scenarios so the decision reflects how your business operates.
                  </p>
                </div>

                {/* Related Services */}
                <aside className="border-t border-[#e6dbc9] pt-8">
                  <p className="text-xs font-semibold uppercase tracking-widest text-[#9ca3af] mb-4">
                    Related Services
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Link
                      href="/services/ai-receptionist"
                      className="text-sm font-medium text-[#c8a97e] transition-colors hover:text-[#b69468]"
                    >
                      Our AI receptionist service →
                    </Link>
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
                    Choose a call process that fits your business
                  </h3>
                  <p className="mb-6 text-white/90">
                    Bring examples of routine calls and difficult exceptions. We can discuss what to automate and where a person should take over.
                  </p>
                  <Link
                    href="/book-demo"
                    className="inline-flex h-10 items-center justify-center rounded-sm bg-white px-6 text-sm font-medium text-[#222222] transition-colors hover:bg-white/90"
                  >
                    Discuss your call coverage
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
