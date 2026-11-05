import type { Metadata } from "next"
import Link from "next/link"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import Container from "@/components/shared/Container"
import { SITE_CONFIG, SOCIAL_IMAGES } from "@/lib/constants"

const TITLE = "How Do AI Receptionists Work?"
const DESCRIPTION =
  "Learn how AI receptionists answer calls, understand requests, book appointments, take messages, and hand off to your team, plus where their limits matter."
const CANONICAL = "/blog/how-do-ai-receptionists-work"
const PUBLISHED = "2026-11-04T08:00:00Z"
const KEYWORDS = [
  "how do ai receptionists work",
  "AI receptionist for small business",
  "AI call handling",
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

export default function HowAiReceptionistsWorkPost() {
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
                    How do AI receptionists work when someone calls your business? They answer through your phone system, listen to the request, and use instructions you provide to decide what happens next. Depending on the setup, that might mean answering a routine question, checking appointment availability, taking a message, or connecting the caller with a person.
                  </p>
                  <p>
                    For a small business owner, the useful question is what happens between the greeting and the follow-up. A pleasant voice is only part of the job. The call needs to end with an accurate answer, a confirmed action, or a clear next step your team can actually carry out.
                  </p>
                </div>

                <div className="space-y-4">
                  <h2 className="font-heading border-l-4 border-[#c8a97e] pl-4 text-2xl font-bold text-[#222222]">
                    Answering the call
                  </h2>
                  <p>
                    The process starts with routing. Your phone provider sends the call to the AI receptionist according to rules you choose. You might route unanswered calls, calls outside your opening hours, or all incoming calls. Ask your provider which options work with your existing number before changing anything.
                  </p>
                  <p>
                    The receptionist then delivers a greeting that identifies your business and explains how it can help. Write that greeting around the tasks callers actually need. A repair shop might offer appointment requests and messages for the service desk. Clear expectations at the start help callers understand what to ask for.
                  </p>
                </div>

                <div className="space-y-4">
                  <h2 className="font-heading border-l-4 border-[#c8a97e] pl-4 text-2xl font-bold text-[#222222]">
                    Understanding what the caller needs
                  </h2>
                  <p>
                    The system processes the spoken request so it can identify the task. Some systems convert speech into text before deciding on a response; others work more directly with audio. Either way, they need to connect what the caller says with a task you have allowed, such as scheduling or leaving a message.
                  </p>
                  <p>
                    A caller rarely uses your internal labels. Someone might say they need to move a visit rather than ask to reschedule an appointment. A conversational system can interpret that request and ask for missing details. If it is unsure, the useful response is a clarifying question or a handoff, rather than a confident guess.
                  </p>
                </div>

                <div className="space-y-4">
                  <h2 className="font-heading border-l-4 border-[#c8a97e] pl-4 text-2xl font-bold text-[#222222]">
                    Answering routine questions from your information
                  </h2>
                  <p>
                    You supply the information the receptionist is allowed to use: opening hours, location, service descriptions, and approved answers to common questions. This gives the conversation a practical boundary. For example, it can explain your appointment process without making an unsupported promise about when a particular job will be finished.
                  </p>
                  <p>
                    Someone on your team needs to keep that information current. If your hours change but the instructions do not, the receptionist may repeat an outdated answer. Assign an owner for updates and make clear which questions should always go to staff, especially requests for exceptions or commitments you have not approved.
                  </p>
                </div>

                <div className="space-y-4">
                  <h2 className="font-heading border-l-4 border-[#c8a97e] pl-4 text-2xl font-bold text-[#222222]">
                    Booking an appointment
                  </h2>
                  <p>
                    Booking requires a working connection to your scheduling system. When that connection is supported and configured, the receptionist can ask what service the caller needs, check available slots, collect the required details, and request a booking. Your rules determine which appointment types, staff calendars, and times it may offer.
                  </p>
                  <p>
                    The important distinction is between an appointment request and a confirmed booking. A confirmation should follow a successful calendar entry, rather than just a conversation about a time. If the calendar cannot be reached or the request falls outside the rules, the receptionist should explain that staff must follow up.
                  </p>
                </div>

                <div className="space-y-4">
                  <h2 className="font-heading border-l-4 border-[#c8a97e] pl-4 text-2xl font-bold text-[#222222]">
                    Taking a message your team can use
                  </h2>
                  <p>
                    When the caller does not need an immediate transfer, message taking can be the right outcome. Decide what your team needs to respond: the caller&apos;s name, a callback number, the reason for calling, and any relevant scheduling preference. Collect only information needed for that task.
                  </p>
                  <p>
                    Have the receptionist repeat important details, particularly names and phone numbers, so the caller can correct mistakes. Decide where the message should go and who owns the response. A message delivered to an inbox nobody checks still leaves the customer waiting, even if the call itself sounded smooth.
                  </p>
                </div>

                <div className="space-y-4">
                  <h2 className="font-heading border-l-4 border-[#c8a97e] pl-4 text-2xl font-bold text-[#222222]">
                    Handing the caller to a person
                  </h2>
                  <p>
                    A handoff needs its own instructions. Specify which requests require a person, which number or team should receive them, and when those people are available. Where supported, a transfer can connect the caller during the conversation. Other setups may send a message for a callback instead.
                  </p>
                  <p>
                    Plan for an unanswered transfer as carefully as a successful one. The receptionist should explain the next step and offer an approved way to leave details. It should also recognize a direct request to speak with someone, rather than keep pushing the caller through a task they do not want to complete.
                  </p>
                </div>

                <div className="space-y-4">
                  <h2 className="font-heading border-l-4 border-[#c8a97e] pl-4 text-2xl font-bold text-[#222222]">
                    What an AI receptionist cannot do on its own
                  </h2>
                  <p>
                    An AI receptionist cannot perform a business action merely because it can describe one. It needs the relevant tool connection and permission. Access to your appointment calendar does not automatically give it access to customer accounts, invoices, or job status. Confirm each capability separately instead of assuming the systems are connected.
                  </p>
                  <p>
                    It can also misunderstand speech, miss context, or produce an incorrect answer. Background noise, an unfamiliar name, and a complicated request can all expose weak spots. Set boundaries around refunds, complaints, professional advice, and unusual commitments. Those calls need an appropriate person and a clear escalation route.
                  </p>
                </div>

                <div className="space-y-4">
                  <h2 className="font-heading border-l-4 border-[#c8a97e] pl-4 text-2xl font-bold text-[#222222]">
                    Testing the full call before you rely on it
                  </h2>
                  <p>
                    Start with the calls your business already receives. Try a routine appointment, a change of mind, an unclear request, and a caller asking for staff. Include a case where the calendar is unavailable and a transfer nobody answers. These are practical tests of your setup, rather than proof of how every future call will go.
                  </p>
                  <p>
                    Check the result outside the conversation too. Did the appointment appear correctly? Did the message reach its owner? Did the caller hear an accurate next step? Review early calls where review tools are available, correct the instructions, and keep a person responsible for problems that need judgment.
                  </p>
                </div>

                <div className="space-y-4 border-t border-[#e6dbc9] pt-10">
                  <p>
                    An AI receptionist works best when its instructions, connected tools, and human backup agree. Define the tasks it may complete, give it current information, and test what happens when it reaches a limit. That gives you a concrete way to judge whether it fits the calls your business receives.
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
                    Map out your call handling
                  </h3>
                  <p className="mb-6 text-white/90">
                    Bring your common call types and current booking process. We can discuss the setup and the questions to resolve before choosing a service.
                  </p>
                  <Link
                    href="/book-demo"
                    className="inline-flex h-10 items-center justify-center rounded-sm bg-white px-6 text-sm font-medium text-[#222222] transition-colors hover:bg-white/90"
                  >
                    Discuss your receptionist needs
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
