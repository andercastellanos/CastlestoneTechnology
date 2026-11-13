import { alternatesFor } from "@/lib/i18n"
import type { Metadata } from "next"
import Link from "next/link"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import Container from "@/components/shared/Container"
import { SITE_CONFIG, SOCIAL_IMAGES } from "@/lib/constants"

const TITLE = "SMS Marketing Platforms vs. Done-for-You SMS"
const DESCRIPTION = "Compare SMS marketing platforms with a managed service: setup, consent, opt-outs, sending hours, integrations, reporting, and the time your team needs."
const CANONICAL = "/blog/sms-marketing-platforms-vs-done-for-you"
const PUBLISHED = "2026-11-07T08:00:00Z"
const KEYWORDS = ["sms marketing platforms", "done-for-you SMS", "SMS marketing services"]

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
                  SMS Marketing
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
                    SMS marketing platforms give your business tools to build and send text campaigns. A done-for-you service adds people who plan, build, and run those campaigns within an agreed scope. Both approaches still need an owner inside your business who approves offers, confirms customer permissions, and handles decisions. The useful comparison is how much work stays with your team after you sign up.
                  </p>
                </div>
                <div className="space-y-4">
                  <h2 className="font-heading border-l-4 border-[#c8a97e] pl-4 text-2xl font-bold text-[#222222]">
                    Start with the job you need SMS to do
                  </h2>
                  <p>
                    Choose a specific use case before comparing providers: a promotion for subscribers, a reminder tied to a booking, or a follow-up after an inquiry. These are different workflows, with different audiences and permission requirements. Write down what starts the message, what it should say, and what should happen when someone replies.
                  </p>
                  <p>
                    For a hypothetical repair business, a seasonal offer might require a selected audience and an approval before sending. An appointment reminder needs accurate booking information and a way to stop the message if the appointment changes. Use your actual workflow as the demonstration brief rather than judging a product by its template gallery.
                  </p>
                </div>
                <div className="space-y-4">
                  <h2 className="font-heading border-l-4 border-[#c8a97e] pl-4 text-2xl font-bold text-[#222222]">
                    Setup work: software access versus a working process
                  </h2>
                  <p>
                    With self-serve software, assign someone to configure the account, prepare subscriber records, write messages, build segments, and test the campaign. Ask the platform which sender registration or verification steps apply, who supplies the information, and what must be approved before sending. A login alone does not finish setup.
                  </p>
                  <p>
                    A managed service can take on parts of that work, but check the scope carefully. Ask whether onboarding includes reviewing the existing list, setting up forms, writing campaigns, testing connections, and documenting approvals. Your business still supplies accurate details and decides which offers it can fulfill. Agree on what qualifies as ready to launch.
                  </p>
                </div>
                <div className="space-y-4">
                  <h2 className="font-heading border-l-4 border-[#c8a97e] pl-4 text-2xl font-bold text-[#222222]">
                    Consent and opt-outs need a named owner
                  </h2>
                  <p>
                    Do not treat a spreadsheet of customer phone numbers as a ready-to-send marketing list. First establish what each person agreed to receive and where that permission is recorded. Separate promotional audiences from appointment or account notifications. Review the proposed signup wording against the rules and policies that apply to your campaign.
                  </p>
                  <p>
                    Check the rules that apply to your campaign before choosing a consent process. The <a className="text-[#80613a] underline underline-offset-4 hover:text-foreground" href="https://www.ecfr.gov/current/title-47/chapter-I/subchapter-B/part-64/subpart-L/section-64.1200#p-64.1200(a)(2)">FCC’s consent provisions in 47 CFR § 64.1200(a)(2)</a> and <a className="text-[#80613a] underline underline-offset-4 hover:text-foreground" href="https://www.ecfr.gov/current/title-47/chapter-I/subchapter-B/part-64/subpart-L/section-64.1200#p-64.1200(a)(10)">revocation provisions in paragraph (a)(10)</a> cover specific activities and include conditions and exceptions. Confirm which requirements apply to your messages, including how to document permission and handle opt-outs. Ask your provider how its policies and software support that process. Do not assume a platform setting or a managed service settles compliance.
                  </p>
                  <p>
                    For a self-serve setup, ask who monitors requests and keeps exclusions synchronized across lists and automations. For a managed service, ask the same question and put the responsibility in writing. Test that an unsubscribe prevents another campaign from reaching that contact. Check how staff handle a customer who asks to stop through another channel.
                  </p>
                </div>
                <div className="space-y-4">
                  <h2 className="font-heading border-l-4 border-[#c8a97e] pl-4 text-2xl font-bold text-[#222222]">
                    Sending hours: test the schedule, including automations
                  </h2>
                  <p>
                    Ask how the system determines recipient time zones and applies permitted sending windows. Review scheduled campaigns and event-triggered messages separately: a late-night form submission could start an automation even when your staff are offline. Decide what happens when location information is missing and how a delayed message is handled.
                  </p>
                  <p>
                    Check the rules that apply to you before setting sending windows. The <a className="text-[#80613a] underline underline-offset-4 hover:text-foreground" href="https://www.ecfr.gov/current/title-47/chapter-I/subchapter-B/part-64/subpart-L/section-64.1200#p-64.1200(c)(1)">FCC’s telephone-solicitation timing rule in 47 CFR § 64.1200(c)(1)</a> is one provision to review; confirm whether it covers your campaign, alongside any applicable state requirements and provider policies. Have those requirements confirmed before launch. Hiring someone to operate software does not replace that review or resolve unclear consent records.
                  </p>
                </div>
                <div className="space-y-4">
                  <h2 className="font-heading border-l-4 border-[#c8a97e] pl-4 text-2xl font-bold text-[#222222]">
                    Connections to existing tools: follow the data
                  </h2>
                  <p>
                    List the tools your business already uses for contacts, scheduling, sales, and forms. Then describe the information each connection must carry. A connection that copies a phone number may still leave out consent details, cancellation status, or the staff member responsible for a reply. Ask providers to demonstrate the complete path.
                  </p>
                  <p>
                    With a platform, your team may need to configure the connection and investigate errors. With a managed service, confirm whether monitoring and repairs are included. Test duplicate contacts, changed bookings, failed submissions, and opt-outs. Decide which system holds the authoritative record so conflicting updates do not leave your team guessing.
                  </p>
                </div>
                <div className="space-y-4">
                  <h2 className="font-heading border-l-4 border-[#c8a97e] pl-4 text-2xl font-bold text-[#222222]">
                    Reporting: connect activity with business outcomes
                  </h2>
                  <p>
                    Request a sample report before choosing either model. Look for delivery failures, replies, link activity where tracked, and opt-outs, alongside the audience and campaign purpose. A delivered message does not establish that someone read it or bought something. Ask how the report distinguishes a platform event from a confirmed business outcome.
                  </p>
                  <p>
                    If bookings or sales matter, define where those actions are recorded and how they will be associated with a campaign. Record limitations, including purchases made through another channel. With self-serve software, assign someone to interpret the report. With a managed service, agree on when the team explains findings and proposes the next change.
                  </p>
                </div>
                <div className="space-y-4">
                  <h2 className="font-heading border-l-4 border-[#c8a97e] pl-4 text-2xl font-bold text-[#222222]">
                    The owner’s time: count review and follow-up too
                  </h2>
                  <p>
                    Self-serve can fit a business with a staff member who enjoys campaign work and has a recurring place for it in their schedule. Include list checks, writing, approvals, testing, replies, and reporting in that schedule. Ask who covers the work during an absence. An unattended inbox can undermine an otherwise organized campaign.
                  </p>
                  <p>
                    A done-for-you arrangement fits an owner who wants execution handled by a team and can provide timely approvals. Clarify who answers customer replies, which questions require your staff, and when a campaign must pause. You still need to confirm availability, approve the offer, and tell the service about changes that affect customers.
                  </p>
                </div>
                <div className="space-y-4">
                  <h2 className="font-heading border-l-4 border-[#c8a97e] pl-4 text-2xl font-bold text-[#222222]">
                    Compare the full scope before you decide
                  </h2>
                  <p>
                    Request a written breakdown of platform access, messaging usage, registration, integration work, campaign production, and ongoing support. Check any third-party charges directly with the provider. Compare the responsibilities included rather than assuming a software subscription and a managed engagement cover the same work. Also ask about cancellation, data exports, and access to campaign history.
                  </p>
                  <p>
                    Bring a real campaign brief to each conversation. Ask who will build it, who approves it, how opt-outs are handled, and what the next report will show. To discuss a managed approach, explore our <Link className="text-[#80613a] underline underline-offset-4 hover:text-foreground" href="/services/marketing-automation">SMS marketing services</Link>. Choose the arrangement your business can operate consistently, with clear responsibilities from signup through customer follow-up.
                  </p>
                </div>

                <div className="rounded-xl bg-[#c8a97e] p-8 text-center">
                  <h2 className="font-heading mb-2 text-2xl font-bold text-white">
                    Plan an SMS workflow your team can manage
                  </h2>
                  <p className="mb-6 text-white/90">
                    Talk with the Castlestone team about your audience, existing tools, campaign responsibilities, and follow-up process.
                  </p>
                  <Link
                    href="/book-demo"
                    className="inline-flex min-h-10 items-center justify-center rounded-sm bg-white px-6 py-2 text-sm font-medium text-[#222222] transition-colors hover:bg-white/90"
                  >
                    Book an SMS marketing consultation
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
