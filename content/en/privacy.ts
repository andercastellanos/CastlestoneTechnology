import type { LegalContent } from "@/content/types/legal"
import { formatContactAddress, LEGAL_ENTITY, SITE_CONFIG } from "@/lib/constants"

const email = { href: `mailto:${SITE_CONFIG.contact.email}`, label: SITE_CONFIG.contact.email }

export const privacyContent: LegalContent = {
  metadata_title: "Privacy Policy",
  metadata_description: "How Castlestone Technology collects, uses, and protects your personal information, including text message (SMS) consent and opt-out.",
  heading: "Privacy Policy",
  lastUpdated: "Last updated: November 15, 2026",
  sections: [
    {
      heading: "Who We Are",
      paragraphs: [[
        `This Privacy Policy explains how ${LEGAL_ENTITY.en} (“Castlestone Technology,” “we,” “us”) collects, uses and protects your personal information.`,
      ]],
    },
    {
      heading: "Information We Collect",
      paragraphs: [[
        "We collect information you provide directly, including name, email, company name, and phone number when you fill out forms on our site or book a consultation.",
      ]],
    },
    {
      heading: "How We Use Your Information",
      paragraphs: [[
        "We use your information to respond to inquiries, deliver our services, send relevant updates about Castlestone Technology, and improve our website experience. We never sell your data to third parties.",
      ]],
    },
    {
      heading: "Text Messages (SMS)",
      paragraphs: [
        ["If you give us your mobile phone number and agree to receive text messages, we may text you about your inquiry, appointments and the services you use with us. We only send text messages to people who have opted in, and consent to receive text messages is not a condition of any purchase."],
        ["Message frequency varies. Message and data rates may apply."],
        ["You can reply STOP at any time to opt out, and we will send one message confirming that you have been unsubscribed. Reply HELP for help, or contact us at ", email, "."],
        ["We do not share mobile phone numbers or SMS opt-in information with third parties or affiliates for marketing or promotional purposes."],
      ],
    },
    {
      heading: "Cookies",
      paragraphs: [[
        "Our website uses cookies to understand how visitors interact with our pages. You can disable cookies in your browser settings at any time.",
      ]],
    },
    {
      heading: "Data Storage",
      paragraphs: [[
        "Your data is stored securely using industry-standard practices. We use Supabase for database storage, which is hosted on AWS infrastructure with encryption at rest and in transit.",
      ]],
    },
    {
      heading: "Third-Party Services",
      paragraphs: [
        ["We use the following third-party services that may process your data: Google Calendar (appointment booking), Google Analytics (site analytics), Resend (email delivery)."],
        [
          "The appointment calendar on our booking page is provided by Google. When you load or use it, your browser connects to Google, which may use cookies and process booking information under its ",
          { href: "https://policies.google.com/privacy", label: "Privacy Policy", external: true },
          ". You can also open the booking page directly on Google Calendar.",
        ],
      ],
    },
    {
      heading: "Your Rights",
      paragraphs: [[
        "You have the right to request access to, correction of, or deletion of your personal data at any time by contacting us at ",
        email,
        ".",
      ]],
    },
    {
      heading: "Contact",
      paragraphs: [[
        "For any privacy-related questions, email ",
        email,
        ` or write to us at ${LEGAL_ENTITY.en}, ${formatContactAddress()}.`,
      ]],
    },
  ],
}
