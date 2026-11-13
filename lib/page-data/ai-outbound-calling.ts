export type AiOutboundCallingContent = {
  title: string
  description: string
  heroEyebrow: string
  heroHeading: string
  heroDescription: string
  startCta: string
  consultCta: string
  stepsHeading: string
  step1Heading: string
  step1Description: string
  step2Heading: string
  step2Description: string
  step3Heading: string
  step3Description: string
  step4Heading: string
  step4Description: string
  step5Heading: string
  step5Description: string
  outcomesHeading: string
  outcomesDescription: string
  outcome1: string
  outcome2: string
  outcome3: string
  outcome4: string
  outcome5: string
  consentHeading: string
  consentDescription: string
  pricingHeading: string
  pricingDescription: string
  pricingSetupQuestion: string
  pricingLink: string
  comparisonHeading: string
  outboundHeading: string
  outboundDescription: string
  receptionistHeading: string
  receptionistDescription: string
  receptionistLink: string
  faqHeading: string
  faqColdCallingQuestion: string
  faqColdCallingAnswer: string
  faqTransferQuestion: string
  faqTransferAnswer: string
  faqResultsQuestion: string
  faqResultsAnswer: string
  faqPriceQuestion: string
  faqPriceAnswer: string
  faqSetupQuestion: string
  faqSetupAnswer: string
  finalHeading: string
}

/** The Lead Caller's published pay-as-you-go rates, shared by both locales. */
export const aiOutboundCallingPricing = {
  perConnectedMinute: "0.20",
  minimumRecharge: "10",
} as const

export const aiOutboundCallingNumbers = {
  description: [aiOutboundCallingPricing.perConnectedMinute],
  pricingDescription: [aiOutboundCallingPricing.perConnectedMinute, aiOutboundCallingPricing.minimumRecharge],
  faqPriceAnswer: [aiOutboundCallingPricing.perConnectedMinute],
} as const

export const aiOutboundCallingLinks = {
  en: "/services/ai-outbound-calling",
  es: "/es/servicios/llamadas-salientes-con-ia",
  product: "https://theleadcaller.com",
  demo: "/book-demo",
  receptionist: "/services/ai-receptionist",
} as const

export function getAiOutboundCallingData(copy: AiOutboundCallingContent) {
  return {
    steps: [
      { heading: copy.step1Heading, description: copy.step1Description },
      { heading: copy.step2Heading, description: copy.step2Description },
      { heading: copy.step3Heading, description: copy.step3Description },
      { heading: copy.step4Heading, description: copy.step4Description },
      { heading: copy.step5Heading, description: copy.step5Description },
    ],
    outcomes: [copy.outcome1, copy.outcome2, copy.outcome3, copy.outcome4, copy.outcome5],
    faqs: [
      { question: copy.faqColdCallingQuestion, answer: copy.faqColdCallingAnswer },
      { question: copy.faqTransferQuestion, answer: copy.faqTransferAnswer },
      { question: copy.faqResultsQuestion, answer: copy.faqResultsAnswer },
      { question: copy.faqPriceQuestion, answer: copy.faqPriceAnswer },
      { question: copy.faqSetupQuestion, answer: copy.faqSetupAnswer },
    ],
  }
}
