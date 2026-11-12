import type { Metadata } from "next"
import Link from "next/link"
import { Check } from "lucide-react"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import Container from "@/components/shared/Container"
import { SITE_CONFIG, SOCIAL_IMAGES } from "@/lib/constants"
import { alternatesFor } from "@/lib/i18n"

const TITLE = "How to Start a Business in Florida: From LLC to Online"
const DESCRIPTION = "A step-by-step Florida guide: form your LLC, get an EIN, open a bank account, then set up your domain, business email, social accounts, Google profile and website."
const CANONICAL = "/blog/how-to-start-a-business-in-florida"
const PUBLISHED = "2026-11-11T08:00:00Z"
const KEYWORDS = ["how to start a business in florida", "start an llc in florida", "business setup checklist"]

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

const faqs = [
  {
    question: "How much does it cost to start an LLC in Florida?",
    answer: "Florida LLC formation costs $125: a $100 Articles of Organization filing fee and a $25 registered agent designation. The annual report costs $138.75, starting the calendar year after formation.",
  },
  {
    question: "Do I need a business license in Florida?",
    answer: "Florida has no general state business license. Most counties and many cities require a local business tax receipt, and some professions need a state license. Check your county tax collector and Florida DBPR for the requirements that apply to your business.",
  },
  {
    question: "Do I need a business email address?",
    answer: "An email address on your own domain is not required, but it is recommended because it looks more established. A free Gmail address can work to start; use your business domain when you are ready to connect your email and website.",
  },
  {
    question: "Do I still need to file a BOI report?",
    answer: "No, if your company was formed in the United States. FinCEN's August 2026 final rule permanently exempts U.S.-formed companies from beneficial ownership information reporting. Older guides may still list this step.",
  },
]

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

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(({ question, answer }) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: { "@type": "Answer", text: answer },
  })),
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
                  Business Setup
                </span>
                <h1 className="font-heading mt-4 text-4xl font-bold leading-tight text-[#222222] sm:text-5xl">
                  {TITLE}
                </h1>
                <p className="mt-4 text-sm text-[#9ca3af]">
                  By the Castlestone Team &nbsp;·&nbsp; <time dateTime={PUBLISHED}>November 11, 2026</time>
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
                    Most guides on how to start a business in Florida stop at the paperwork. You file the LLC, get a confirmation, and are left to figure out the rest. But a business also needs a name customers recognize, a way to receive money, and places where people can find and contact it.
                  </p>
                  <p>
                    This checklist follows the full path: make your Florida LLC official, organize the accounts, then connect your domain, email, social profiles, Google presence and website. Work through it in order and save the documents and account details as you go. Each step finishes with something concrete to have in hand.
                  </p>
                </div>

                <aside className="rounded-lg border border-[#e6dbc9] bg-[#f8f5ef] p-6 sm:p-8">
                  <p>Prefer to hand this off? Castlestone sets up the online side of a new business — domain, business email, social accounts, Google Business Profile and website — so everything is connected from day one. <Link href="/services/online-presence-setup" className="font-medium text-[#80613a] underline underline-offset-4 hover:text-foreground">See how it works →</Link></p>
                </aside>

                <div className="space-y-4">
                  <p className="text-xs font-semibold uppercase tracking-widest text-[#80613a]">Part 1 — Make it official</p>
                  <h2 className="font-heading border-l-4 border-[#c8a97e] pl-4 text-2xl font-bold text-[#222222]">1. Choose a name and check it three places</h2>
                  <p>
                    Before you commit to a name, check the <a href="https://search.sunbiz.org/Inquiry/CorporationSearch/ByName" rel="noopener" className="text-[#80613a] underline underline-offset-4 hover:text-foreground">Sunbiz name search</a>, domain availability and social handles together. Pick a name available across all three. That keeps you from filing one name, buying an unrelated website address and using a third version on social media.
                  </p>
                  <p>
                    Write a short list of candidates rather than working around the first unavailable choice. Say each name aloud, imagine it in an email address, and check its spelling. Keep a note of the domain and handles you intend to use so the next steps follow the same plan.
                  </p>
                  <p><strong>Before moving on:</strong> have your chosen name, matching available domain and social handles recorded together.</p>
                </div>

                <div className="space-y-4">
                  <h2 className="font-heading border-l-4 border-[#c8a97e] pl-4 text-2xl font-bold text-[#222222]">2. Form your LLC on Sunbiz</h2>
                  <p>
                    File your Articles of Organization through <a href="https://sunbiz.org/" rel="noopener" className="text-[#80613a] underline underline-offset-4 hover:text-foreground">Sunbiz, Florida&apos;s Division of Corporations</a>. The required formation fees are $100 for filing and $25 for the registered agent designation, totaling $125. Every LLC needs a registered agent with a Florida street address.
                  </p>
                  <p>
                    Gather the business information and registered agent details before completing the filing. Review the spelling of your name and addresses carefully. Save the filed Articles of Organization and confirmation where you can find them again; you will use those records while setting up the rest of the business.
                  </p>
                  <p><strong>Before moving on:</strong> have your filed Articles of Organization, filing confirmation and registered agent information in your records.</p>
                </div>

                <div className="space-y-4">
                  <h2 className="font-heading border-l-4 border-[#c8a97e] pl-4 text-2xl font-bold text-[#222222]">3. Get your EIN directly from the IRS</h2>
                  <p>
                    Get your Employer Identification Number, or EIN, from the <a href="https://www.irs.gov/businesses/small-businesses-self-employed/get-an-employer-identification-number" rel="noopener" className="text-[#80613a] underline underline-offset-4 hover:text-foreground">IRS EIN page at irs.gov</a>. It is free. Websites charging for an EIN are not the IRS, even when their design or wording looks official. Check the address before entering your information.
                  </p>
                  <p>
                    Use the LLC information from your formation records so you are not retyping details from memory. Save the EIN confirmation alongside your Articles of Organization. Keep the number and confirmation accessible to you rather than leaving the only copy with someone helping you apply.
                  </p>
                  <p><strong>Before moving on:</strong> have your EIN confirmation saved with your LLC documents.</p>
                </div>

                <div className="space-y-4">
                  <h2 className="font-heading border-l-4 border-[#c8a97e] pl-4 text-2xl font-bold text-[#222222]">4. Open a business bank account</h2>
                  <p>
                    Banks typically ask for your Articles of Organization and EIN. Contact the bank you plan to use and ask what it needs for your particular account before you begin. Bring the saved documents rather than relying on screenshots scattered across your phone.
                  </p>
                  <p>
                    Keep business and personal money separate to help protect the LLC. Decide which account will receive customer payments and pay business expenses. Keeping those activities together also makes the records easier to review with your accountant instead of reconstructing purchases from a personal account later.
                  </p>
                  <p><strong>Before moving on:</strong> have a business account, access to it and a clear plan for handling business money separately.</p>
                </div>

                <div className="space-y-4">
                  <h2 className="font-heading border-l-4 border-[#c8a97e] pl-4 text-2xl font-bold text-[#222222]">5. Check local and state requirements</h2>
                  <p>
                    Florida has no general state business license. Most counties and many cities require a local business tax receipt, though. Inside city limits, you may need both. Fees vary by county, city and business type, so check your county tax collector and ask about your actual location and activity.
                  </p>
                  <p>
                    If you operate under a name other than your LLC&apos;s registered name, you need a fictitious name, also called a DBA. <a href="https://dos.fl.gov/sunbiz/start-business/efile/fl-fictitious-name-registration/" rel="noopener" className="text-[#80613a] underline underline-offset-4 hover:text-foreground">Sunbiz fictitious name registration</a> costs $50 and is valid for five years. If you use the LLC&apos;s registered name, this is not an additional naming step.
                  </p>
                  <p>
                    Some professions need a state license through <a href="https://www2.myfloridalicense.com/services-requiring-a-dbpr-license/" rel="noopener" className="text-[#80613a] underline underline-offset-4 hover:text-foreground">Florida DBPR at myfloridalicense.com</a>. Selling taxable goods or services requires sales tax registration with the <a href="https://floridarevenue.com/taxes/taxesfees/Pages/sales_tax.aspx" rel="noopener" className="text-[#80613a] underline underline-offset-4 hover:text-foreground">Florida Department of Revenue</a>. Describe what you sell when checking which requirements apply.
                  </p>
                  <p><strong>Before moving on:</strong> have the receipts, registrations and licenses that apply to your business, plus a record of the requirements you checked.</p>
                </div>

                <aside className="rounded-lg border border-[#e6dbc9] bg-[#f8f5ef] p-6 sm:p-8">
                  <h3 className="font-heading text-2xl font-bold text-[#222222]">You can skip BOI reporting</h3>
                  <p className="mt-4">
                    U.S.-formed companies are permanently exempt from FinCEN beneficial ownership information reporting under its August 2026 final rule. Older checklists may still tell you to file. For the U.S.-formed LLC covered here, skip that step; <a href="https://www.fincen.gov/boi" rel="noopener" className="text-[#80613a] underline underline-offset-4 hover:text-foreground">FinCEN&apos;s current BOI guidance</a> explains the exemption.
                  </p>
                </aside>

                <div className="space-y-4">
                  <p className="text-xs font-semibold uppercase tracking-widest text-[#80613a]">Part 2 — Get your business online</p>
                  <p>This is the part most new owners put off — and the part we handle for clients.</p>
                  <h2 className="font-heading border-l-4 border-[#c8a97e] pl-4 text-2xl font-bold text-[#222222]">6. Buy a domain you own and control</h2>
                  <p>
                    Choose a short domain that matches your business name. Register it in an account you own and control, with recovery information you can access. Do not put it in your web designer&apos;s account or a relative&apos;s account. Losing control of the domain is the most common setup problem we see later.
                  </p>
                  <p>
                    A helper can work on the setup without becoming the only person who can manage the account. Check that you can sign in yourself and locate the domain&apos;s settings. Save the registrar&apos;s name, the domain and the recovery details in your business records.
                  </p>
                  <p><strong>Before moving on:</strong> have the domain registered in your own account and confirm you can access its settings.</p>
                  <p className="text-sm text-[#6b7280]"><Link href="/services/online-presence-setup" className="text-[#80613a] underline decoration-[#c8a97e] underline-offset-4 hover:text-foreground">We can do this for you</Link></p>
                </div>

                <div className="space-y-4">
                  <h2 className="font-heading border-l-4 border-[#c8a97e] pl-4 text-2xl font-bold text-[#222222]">7. Set up business email on your domain</h2>
                  <p>
                    A free @gmail.com address works to start, but an address such as you@yourbusiness.com looks more established. With Google Workspace, your email uses your business domain while giving you an inbox to send and receive messages. Choose an address customers can recognize and use consistently on your website and profiles.
                  </p>
                  <p>
                    Setup means verifying that you own the domain, then adding the email routing records, called MX records, in your registrar&apos;s DNS settings. Follow the values provided by Google Workspace for your account. After setup, send a message to an outside address and reply to it so you test both directions.
                  </p>
                  <p><strong>Before moving on:</strong> have your domain verified and your business inbox successfully sending and receiving email.</p>
                  <p className="text-sm text-[#6b7280]"><Link href="/services/online-presence-setup" className="text-[#80613a] underline decoration-[#c8a97e] underline-offset-4 hover:text-foreground">We can do this for you</Link></p>
                </div>

                <div className="space-y-4">
                  <h2 className="font-heading border-l-4 border-[#c8a97e] pl-4 text-2xl font-bold text-[#222222]">8. Connect the domain to your website and email</h2>
                  <p>
                    DNS is the set of directions attached to your domain. Some records tell visitors where your website lives; MX records tell incoming messages which email provider to use. Your website host and Google Workspace provide their respective settings. Enter them where your domain&apos;s DNS is managed, keeping the website and email directions together rather than replacing one with the other. Save a copy of the existing settings before making changes, then test your website address and inbox again.
                  </p>
                  <p><strong>Before moving on:</strong> have the website and email records in place, with both destinations tested.</p>
                  <p className="text-sm text-[#6b7280]"><Link href="/services/online-presence-setup" className="text-[#80613a] underline decoration-[#c8a97e] underline-offset-4 hover:text-foreground">We can do this for you</Link></p>
                </div>

                <div className="space-y-4">
                  <h2 className="font-heading border-l-4 border-[#c8a97e] pl-4 text-2xl font-bold text-[#222222]">9. Claim matching social media accounts</h2>
                  <p>
                    Use the same business name and matching handles wherever possible. Set up business or professional accounts, add a clear description of what you do, and link each profile back to your website. Keep the account access under your control, just as you did with the domain.
                  </p>
                  <p>
                    You do not need to fill every profile with posts before continuing. Start with accurate information and a working contact path. Check the spelling of the name, the website address and the phone number across the accounts you have claimed.
                  </p>
                  <p><strong>Before moving on:</strong> have your social accounts claimed, their access recorded and their website links checked.</p>
                  <p className="text-sm text-[#6b7280]"><Link href="/services/online-presence-setup" className="text-[#80613a] underline decoration-[#c8a97e] underline-offset-4 hover:text-foreground">We can do this for you</Link></p>
                </div>

                <div className="space-y-4">
                  <h2 className="font-heading border-l-4 border-[#c8a97e] pl-4 text-2xl font-bold text-[#222222]">10. Create your Google Business Profile</h2>
                  <p>
                    If you serve customers in a local area, check your eligibility and create your Google Business Profile so your business can appear on Google Maps and in local results. Use the same business name, address and phone number across your profile, website and social accounts.
                  </p>
                  <p>
                    Prepare that information once and copy it carefully rather than inventing a different description of your location for each platform. Check the contact details yourself. The goal is a consistent route from finding your business to reaching the person who can help.
                  </p>
                  <p><strong>Before moving on:</strong> have your profile set up if eligible, with your business details and website address checked.</p>
                  <p className="text-sm text-[#6b7280]"><Link href="/services/online-presence-setup" className="text-[#80613a] underline decoration-[#c8a97e] underline-offset-4 hover:text-foreground">We can do this for you</Link></p>
                </div>

                <div className="space-y-4">
                  <h2 className="font-heading border-l-4 border-[#c8a97e] pl-4 text-2xl font-bold text-[#222222]">11. Launch a simple, useful website</h2>
                  <p>
                    Start with the essentials: who you are, what you do, where you serve and how to contact you. A visitor should not have to guess whether you offer their service or how to ask a question. Make the phone number, email address and inquiry form easy to find and use on a phone.
                  </p>
                  <p>
                    For planning, read <Link href="/blog/how-much-does-a-website-cost" className="text-[#80613a] underline underline-offset-4 hover:text-foreground">How much does a website cost?</Link> and <Link href="/blog/how-to-make-your-website-show-up-on-google" className="text-[#80613a] underline underline-offset-4 hover:text-foreground">How to make your website show up on Google</Link>. Before sharing the site, submit its form yourself and confirm the message reaches your inbox. Follow the website links from your social profiles and Google profile too.
                  </p>
                  <p><strong>Before moving on:</strong> have a live website with accurate information and a tested path for calls and inquiries.</p>
                  <p className="text-sm text-[#6b7280]"><Link href="/services/web-design" className="text-[#80613a] underline decoration-[#c8a97e] underline-offset-4 hover:text-foreground">We can do this for you</Link></p>
                </div>

                <div className="space-y-4">
                  <h2 className="font-heading border-l-4 border-[#c8a97e] pl-4 text-2xl font-bold text-[#222222]">Part 3 — Stay in good standing</h2>
                  <p>
                    Put the recurring tasks on a calendar you actually use. Keep the relevant account details and confirmations with the reminder so a future filing does not start with a search through old messages.
                  </p>
                  <ul className="list-disc space-y-3 pl-5">
                    <li><strong>Annual report:</strong> file on Sunbiz between January 1 and May 1 every year, starting the calendar year after formation. The fee is $138.75; filing after May 1 costs $538.75 total. If it remains unfiled by the third Friday in September, the LLC is administratively dissolved on the fourth Friday in September. Check the <a href="https://dos.fl.gov/sunbiz/manage-business/efile/annual-report/" rel="noopener" className="text-[#80613a] underline underline-offset-4 hover:text-foreground">official annual report instructions</a>.</li>
                    <li><strong>Local business tax receipts:</strong> record the renewal requirements given by your county and city. Ask your county tax collector rather than assuming another business&apos;s schedule applies.</li>
                    <li><strong>Fictitious name:</strong> if you have one, add its renewal every five years to the calendar.</li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h2 className="font-heading border-l-4 border-[#c8a97e] pl-4 text-2xl font-bold text-[#222222]">Your Florida business setup checklist</h2>
                  <ul className="list-disc space-y-2 pl-5">
                    <li>Name checked on Sunbiz, as a domain and on social media.</li>
                    <li>LLC formation documents and registered agent details saved.</li>
                    <li>Free IRS EIN confirmation saved.</li>
                    <li>Business bank account open and money kept separate.</li>
                    <li>Local receipts, any DBA, professional license and sales tax registration checked.</li>
                    <li>Domain in an account you own and control.</li>
                    <li>Business email verified, sending and receiving.</li>
                    <li>Website and email DNS settings connected and tested.</li>
                    <li>Matching business social accounts linked to your website.</li>
                    <li>Google Business Profile set up if eligible; contact details consistent.</li>
                    <li>Website live, with working contact paths.</li>
                    <li>Annual report and applicable renewals on your calendar.</li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h2 className="font-heading border-l-4 border-[#c8a97e] pl-4 text-2xl font-bold text-[#222222]">Questions about starting a Florida business</h2>
                  {faqs.map(({ question, answer }) => (
                    <div key={question} className="space-y-3">
                      <h3 className="font-heading text-xl font-bold text-[#222222]">{question}</h3>
                      <p>{answer}</p>
                    </div>
                  ))}
                </div>

                <section className="rounded-lg border border-[#e6dbc9] bg-[#f8f5ef] p-6 sm:p-8">
                  <h2 className="font-heading text-3xl font-bold text-[#222222]">Let Castlestone Set Up Your Business Online</h2>
                  <p className="mt-5">You focus on opening the doors. We set up the pieces customers see first, and make sure they work together.</p>
                  <ul className="mt-6 space-y-4">
                    {[
                      "A domain registered in your name, in an account you control",
                      "Business email on your own domain",
                      "Social media accounts with matching names, linked to your website",
                      "A Google Business Profile so local customers can find you",
                      "A website that tells people what you do and how to reach you",
                    ].map((item) => <li key={item} className="flex gap-3"><Check className="mt-1 h-5 w-5 shrink-0 text-[#80613a]" aria-hidden="true" /><span>{item}</span></li>)}
                  </ul>
                  <p className="mt-6">Start with a free consultation. We&apos;ll review what you already have and give you a written quote before any work starts.</p>
                  <div className="mt-7 flex flex-wrap items-center gap-5">
                    <Link href="/book-demo" className="inline-flex min-h-12 items-center justify-center rounded-sm bg-[#80613a] px-6 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-[#634927]">Book a free consultation</Link>
                    <Link href="/services/online-presence-setup" className="font-medium text-[#80613a] underline underline-offset-4 hover:text-foreground">See Online Presence Setup</Link>
                  </div>
                </section>
                <p className="text-sm text-[#6b7280]">
                  This guide is general information, not legal or tax advice. Fees and rules are as of November 2026 — confirm current requirements on sunbiz.org, irs.gov and with your county tax collector, and talk to an accountant or attorney about your situation.
                </p>
              </div>
            </Container>
          </section>
        </article>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c") }} />
      </main>
      <Footer />
    </>
  )
}
