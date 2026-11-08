export type AiReceptionistContent = {
  title: string
  description: string
  heroEyebrow: string
  heroHeading: string
  heroDescription: string
  demoCta: string
  missedCallsHeading: string
  missedCallsDescription: string
  missedCallsStat: string
  missedCallsCredit: string
  missedCallsLink: string
  capabilitiesHeading: string
  capabilitiesDescription: string
  industriesHeading: string
  dentalHeading: string
  dentalDescription: string
  salonsHeading: string
  salonsDescription: string
  homeServicesHeading: string
  homeServicesDescription: string
  bookingHeading: string
  bookingDescription: string
  pricingHeading: string
  pricingLabel: string
  pricingDescription: string
  comparisonHeading: string
  aiHeading: string
  aiDescription: string
  frontDeskHeading: string
  frontDeskDescription: string
  frontDeskLink: string
  faqHeading: string
  faqWorkQuestion: string
  faqWorkAnswer: string
  faqBookingQuestion: string
  faqBookingAnswer: string
  faqPricingQuestion: string
  faqPricingAnswer: string
  faqFrontDeskQuestion: string
  faqFrontDeskAnswer: string
  finalHeading: string
  finalDescription: string
  webDesignDescription: string
  webDesignLink: string
}

export const aiReceptionistStudy = {
  days: 30,
  businesses: 85,
  unansweredPercent: 62,
  sourceUrl: "https://411locals.us/small-business-owners-dont-answer-62-of-phone-calls/",
} as const

export const aiReceptionistNumbers = {
  missedCallsStat: [
    String(aiReceptionistStudy.days),
    String(aiReceptionistStudy.businesses),
    String(aiReceptionistStudy.unansweredPercent),
  ],
} as const

export const aiReceptionistLinks = {
  en: "/services/ai-receptionist",
  es: "/es/servicios/recepcionista-virtual-ia",
  demo: "/book-demo",
  missedCalls: "/blog/the-real-cost-of-missed-calls",
  frontDesk: "/services/virtual-front-desk",
} as const

export function getAiReceptionistData(copy: AiReceptionistContent) {
  return {
    industries: [
      { heading: copy.dentalHeading, description: copy.dentalDescription },
      { heading: copy.salonsHeading, description: copy.salonsDescription },
      { heading: copy.homeServicesHeading, description: copy.homeServicesDescription },
    ],
    faqs: [
      { question: copy.faqWorkQuestion, answer: copy.faqWorkAnswer },
      { question: copy.faqBookingQuestion, answer: copy.faqBookingAnswer },
      { question: copy.faqPricingQuestion, answer: copy.faqPricingAnswer },
      { question: copy.faqFrontDeskQuestion, answer: copy.faqFrontDeskAnswer },
    ],
  }
}
