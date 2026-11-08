import type { Metadata } from "next"
import Link from "next/link"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import Container from "@/components/shared/Container"
import { SITE_CONFIG, SOCIAL_IMAGES } from "@/lib/constants"

const TITLE = "Email Marketing for Small Business"
const DESCRIPTION = "Plan consent-based list building, welcome emails, newsletters, automated follow-ups, sending frequency, and reports that connect email activity with sales."
const CANONICAL = "/blog/email-marketing-for-small-business"
const PUBLISHED = "2026-11-08T08:00:00Z"
const KEYWORDS = ["email marketing for small business"]

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
                  Email Marketing
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
                    Email marketing for small business works best when it gives people a useful reason to hear from you again. That might be advice before an appointment, news about a service they requested, or a reminder to return when they are ready. Start with a purpose, a permission process, and someone responsible for replies. Software can deliver messages, but your business must decide what deserves a place in a customer inbox.
                  </p>
                </div>
                <div className="space-y-4">
                  <h2 className="font-heading border-l-4 border-[#c8a97e] pl-4 text-2xl font-bold text-[#222222]">Build a list people deliberately join</h2>
                  <p>
                    Invite customers to subscribe through a clear website form, an inquiry follow-up, or a conversation where they can choose. Explain what you plan to send and how to stop receiving it. Keep a record of where the signup happened and what the person agreed to receive. A receipt address or business card should not automatically become a newsletter subscription. Avoid purchased lists whose recipients have no relationship with your business.
                  </p>
                  <p>
                    Separate your signup process from your legal review. The <a className="text-[#80613a] underline underline-offset-4 hover:text-foreground" href="https://www.ftc.gov/business-guidance/resources/can-spam-act-compliance-guide-business">FTC’s CAN-SPAM compliance guide</a> describes requirements for commercial email, including accurate sender information, truthful subject lines, a postal address, and an opt-out method. It also explains that hiring another company does not remove your responsibility. Confirm the requirements that apply to your audience before launching; permission records are an operating habit, not a substitute for that review.
                  </p>
                </div>
                <div className="space-y-4">
                  <h2 className="font-heading border-l-4 border-[#c8a97e] pl-4 text-2xl font-bold text-[#222222]">Make the welcome email useful immediately</h2>
                  <p>
                    A welcome email should remind the subscriber why they joined, identify your business, and deliver whatever the signup promised. If the form offered a preparation checklist, provide that checklist before introducing another offer. Tell the person what kind of messages to expect and where to ask a question. Use a reply address someone actually monitors, then check the message on a phone before activating it.
                  </p>
                  <p>
                    Decide what happens when an existing customer subscribes again. Your system should not restart an unsuitable introductory sequence after every form submission. Test the signup, delivery, links, unsubscribe action, and any promised download using a test contact. Record who can change the welcome email when your services or process change. A short, accurate message is more useful than an elaborate sequence that nobody maintains.
                  </p>
                </div>
                <div className="space-y-4">
                  <h2 className="font-heading border-l-4 border-[#c8a97e] pl-4 text-2xl font-bold text-[#222222]">Give newsletters and automated follow-ups different jobs</h2>
                  <p>
                    A newsletter is an editorial message sent to an appropriate audience at a chosen time. It can explain a seasonal service, answer a common question, or share a relevant update. An automated follow-up starts because something happened, such as a subscriber joining a list or requesting information. Define the trigger, the recipient, the message, and the condition that stops it. Automation needs an exit as well as a starting point.
                  </p>
                  <p>
                    For a hypothetical home-service business, a newsletter could explain how to prepare for an upcoming season. An inquiry sequence could help someone gather details for a quote. Once that person has booked, the inquiry reminders should stop or change. Check where booking status comes from and what happens if staff update it manually. Treat these as workflows to test with your own tools, rather than assuming every platform connection carries the necessary information.
                  </p>
                </div>
                <div className="space-y-4">
                  <h2 className="font-heading border-l-4 border-[#c8a97e] pl-4 text-2xl font-bold text-[#222222]">Choose a frequency you can sustain</h2>
                  <p>
                    Begin with the expectations set at signup and the amount of useful information your business can produce. Do not invent reasons to send because a calendar has an empty slot. Assign time for writing, approval, testing, replies, and reporting. If staff cannot maintain that routine, reduce the scope before building more sequences. Subscribers experience all your messages together, including newsletters, promotions, and automated follow-ups.
                  </p>
                  <p>
                    Review complaints, unsubscribes, replies, and meaningful website actions after each campaign. Ask whether messages are arriving at a sensible point in the customer relationship. If a newsletter overlaps an inquiry sequence, consider suppressing one message. Avoid changing timing, subject line, audience, and offer simultaneously when you want to learn which change mattered. Keep a simple campaign log so decisions reflect evidence rather than memory.
                  </p>
                </div>
                <div className="space-y-4">
                  <h2 className="font-heading border-l-4 border-[#c8a97e] pl-4 text-2xl font-bold text-[#222222]">Measure opens carefully, then follow the customer action</h2>
                  <p>
                    An open is a tracking signal, not proof that someone read your message. <a className="text-[#80613a] underline underline-offset-4 hover:text-foreground" href="https://support.apple.com/en-nz/guide/iphone/iphf084865c7/26/ios/26">Apple’s Mail Privacy Protection guidance</a> explains that the feature prevents senders from seeing whether a recipient opened an email. Treat open reports as limited indicators. Ask your provider how its reports handle privacy features and automated activity before using opens to decide who is interested.
                  </p>
                  <p>
                    Clicks bring you closer to a customer action, but a clicked link still does not establish a sale. Compare campaign links with completed inquiries, confirmed appointments, or orders in the systems that record them. Agree on what counts as a sale and how you handle cancellations or purchases through another channel. Keep delivery problems, clicks, replies, unsubscribes, and confirmed outcomes separate in the report. That makes it easier to identify the actual problem.
                  </p>
                </div>
                <div className="space-y-4">
                  <h2 className="font-heading border-l-4 border-[#c8a97e] pl-4 text-2xl font-bold text-[#222222]">Coordinate email with text messages</h2>
                  <p>
                    Choose the channel according to the message and the permission you hold. Email can carry a longer explanation or a preparation guide. A text can suit a brief, relevant update when the recipient has agreed to receive it. Do not assume email permission covers text campaigns. Record the preferences for each channel and decide how staff handle a request to stop messages that arrives by phone or in person.
                  </p>
                  <p>
                    Map the complete conversation before adding another touchpoint. If a customer receives an email and a text about the same offer, each message needs a clear purpose. Confirm that staff know who handles replies and where customer decisions are recorded. If you want help defining that process, explore our <Link className="text-[#80613a] underline underline-offset-4 hover:text-foreground" href="/services/marketing-automation">SMS and email marketing services</Link>. Bring your signup form, current messages, and the customer action you want to support.
                  </p>
                </div>
                <div className="rounded-xl bg-[#c8a97e] p-8 text-center">
                  <h2 className="font-heading mb-2 text-2xl font-bold text-white">Plan your email and text-message workflow</h2>
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
