import type { LegalContent } from "@/content/types/legal"
import { LEGAL_ENTITY, SITE_CONFIG } from "@/lib/constants"

const email = { href: `mailto:${SITE_CONFIG.contact.email}`, label: SITE_CONFIG.contact.email }

export const termsContent: LegalContent = {
  metadata_title: "Terms of Service",
  metadata_description: "Terms and conditions for using Castlestone Technology services.",
  heading: "Terms of Service",
  lastUpdated: "Last updated: November 15, 2026",
  sections: [
    {
      heading: "Who We Are",
      paragraphs: [[
        `These Terms of Service are an agreement between you and ${LEGAL_ENTITY.en} (“Castlestone Technology,” “we,” “us”).`,
      ]],
    },
    {
      heading: "Acceptance of Terms",
      paragraphs: [["By accessing or using Castlestone Technology services, you agree to be bound by these terms. If you do not agree, please do not use our services."]],
    },
    {
      heading: "Services",
      paragraphs: [["Castlestone Technology provides virtual assistant and virtual front desk services staffed by trained professionals. Service scope, hours, and deliverables are defined in your individual service agreement."]],
    },
    {
      heading: "Payment",
      paragraphs: [["Services are billed monthly in advance. All fees are non-refundable except where a money-back guarantee has been explicitly offered in writing. Failure to pay may result in service suspension."]],
    },
    {
      heading: "Client Responsibilities",
      paragraphs: [["Clients are responsible for providing clear task instructions, timely feedback, and a respectful working environment for our team members."]],
    },
    {
      heading: "Confidentiality",
      paragraphs: [["Both parties agree to keep confidential any proprietary or sensitive information shared during the course of the engagement."]],
    },
    {
      heading: "Termination",
      paragraphs: [["Either party may terminate services with 30 days written notice. Castlestone reserves the right to terminate immediately in cases of payment default or abusive conduct toward staff."]],
    },
    {
      heading: "Limitation of Liability",
      paragraphs: [["Castlestone Technology is not liable for indirect, incidental, or consequential damages arising from use of our services. Our total liability shall not exceed the fees paid in the prior 30 days."]],
    },
    {
      heading: "Governing Law",
      paragraphs: [["These terms are governed by the laws of the State of Florida, USA. Any disputes shall be resolved in Miami-Dade County."]],
    },
    {
      heading: "Contact",
      paragraphs: [["Questions about these terms? Email ", email, "."]],
    },
  ],
}
