import { SITE_CONFIG } from "@/lib/constants"
import { alternatesFor, type Locale } from "@/lib/i18n"

export type LocalSeoContent = Record<
  | "title" | "description" | "heroEyebrow" | "heroHeading" | "heroDescription"
  | "primaryCta" | "secondaryCta" | "numbersHeading" | "currentStat"
  | "sourceLabel" | "sourceTitle" | "includedHeading" | "includedDescription"
  | "siteTitle" | "siteDescription" | "reviewsTitle" | "reviewsDescription"
  | "aiTitle" | "aiDescription" | "reportingDescription" | "stepsHeading"
  | "auditTitle" | "auditDescription" | "buildTitle" | "buildDescription"
  | "reportTitle" | "reportDescription" | "pricingHeading" | "pricingDescription"
  | "pricingRate" | "pricingMultipleLocations"
  | "pricingCta" | "faqHeading" | "faqWorthQuestion" | "faqWorthAnswer"
  | "faqAiQuestion" | "faqAiAnswer" | "faqIncludedQuestion" | "faqIncludedAnswer"
  | "faqReportingQuestion" | "faqReportingAnswer" | "faqPricingQuestion" | "faqPricingAnswer"
  | "ctaHeading" | "ctaDescription",
  string
>

// BrightLocal, Local Consumer Review Survey 2026 (AI findings).
// https://www.brightlocal.com/research/lcrs-ai-trust/
const aiSearchSurvey = {
  currentPercent: "45",
  previousPercent: "6",
  year: "2026",
  previousYear: "2025",
  url: "https://www.brightlocal.com/research/lcrs-ai-trust/",
} as const

export const localSeoPricing = { monthlyPerLocation: 750 } as const

export const localSeoNumbers = {
  currentStat: [aiSearchSurvey.currentPercent, aiSearchSurvey.previousPercent, aiSearchSurvey.previousYear],
  sourceTitle: [aiSearchSurvey.year],
  pricingRate: [String(localSeoPricing.monthlyPerLocation)],
  faqPricingAnswer: [String(localSeoPricing.monthlyPerLocation)],
} as const

export const localSeoSourceUrl = aiSearchSurvey.url

export function getLocalSeoData(copy: LocalSeoContent) {
  return {
    included: [
      { title: copy.siteTitle, description: copy.siteDescription },
      { title: copy.reviewsTitle, description: copy.reviewsDescription },
      { title: copy.aiTitle, description: copy.aiDescription },
    ],
    steps: [
      { number: "01", title: copy.auditTitle, description: copy.auditDescription },
      { number: "02", title: copy.buildTitle, description: copy.buildDescription },
      { number: "03", title: copy.reportTitle, description: copy.reportDescription },
    ],
    faqs: [
      { question: copy.faqWorthQuestion, answer: copy.faqWorthAnswer },
      { question: copy.faqAiQuestion, answer: copy.faqAiAnswer },
      { question: copy.faqIncludedQuestion, answer: copy.faqIncludedAnswer },
      { question: copy.faqReportingQuestion, answer: copy.faqReportingAnswer },
      { question: copy.faqPricingQuestion, answer: copy.faqPricingAnswer },
    ],
  }
}

export function localSeoServiceSchema(copy: LocalSeoContent, locale: Locale) {
  const path = locale === "en" ? "/services/local-seo" : "/es/servicios/seo-local"
  const { canonical } = alternatesFor(path)
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${canonical}#service`,
    name: copy.heroHeading,
    serviceType: copy.heroHeading,
    description: copy.description,
    url: canonical,
    provider: {
      "@id": SITE_CONFIG.organizationId,
    },
  }
}
