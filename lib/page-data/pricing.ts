import { PRICING } from "@/lib/constants"
import { numericParts, resolveContent } from "@/lib/content"
import type { PricingContent } from "@/content/types/pricing"
import { pricingContent as englishPricingContent } from "@/content/en/pricing"
import { pricingContent as spanishPricingContent } from "@/content/es/pricing"
import type { Locale } from "@/lib/i18n"
import { technologySolutionsNumbers } from "@/lib/page-data/technology-solutions"

const price = (value: number) => [value.toLocaleString("en-US")]

export const pricingNumbers = {
  metadata_description: price(PRICING.frontDesk.basic.price),
  softwareHourly: technologySolutionsNumbers.engagementModels_1_price,
  softwareDedicated: technologySolutionsNumbers.engagementModels_3_price,
  frontDesk1Price: price(PRICING.frontDesk.basic.price),
  frontDesk2Price: price(PRICING.frontDesk.professional.price),
  frontDesk3Price: price(PRICING.frontDesk.enterprise.price),
  frontDesk1Feature1: numericParts(PRICING.frontDesk.basic.features[0]),
  frontDesk2Feature1: numericParts(PRICING.frontDesk.professional.features[0]),
  frontDesk3Feature4: numericParts(PRICING.frontDesk.enterprise.features[4]),
  assistant1Price: price(PRICING.virtualAssistant.personal.price),
  assistant2Price: price(PRICING.virtualAssistant.business.price),
  assistant3Price: price(PRICING.virtualAssistant.specialized.price),
  assistant1Feature1: [String(PRICING.virtualAssistant.personal.hours)],
  assistant2Feature1: [String(PRICING.virtualAssistant.business.hours)],
  assistant3Feature1: [String(PRICING.virtualAssistant.specialized.hours)],
} as const

export type PricingPlan = {
  name: string
  price: string
  hours?: string
  features: string[]
  popular?: boolean
}

export function getPricingPlans(copy: PricingContent) {
  const frontDeskPlans: PricingPlan[] = [
    { name: copy.frontDesk1Name, price: copy.frontDesk1Price, features: [copy.frontDesk1Feature1, copy.frontDesk1Feature2, copy.frontDesk1Feature3, copy.frontDesk1Feature4, copy.frontDesk1Feature5] },
    { name: copy.frontDesk2Name, price: copy.frontDesk2Price, popular: true, features: [copy.frontDesk2Feature1, copy.frontDesk2Feature2, copy.frontDesk2Feature3, copy.frontDesk2Feature4] },
    { name: copy.frontDesk3Name, price: copy.frontDesk3Price, features: [copy.frontDesk3Feature1, copy.frontDesk3Feature2, copy.frontDesk3Feature3, copy.frontDesk3Feature4] },
  ]
  // Virtual Assistant plans have one source: PRICING.virtualAssistant for the numbers and
  // the pricing content files for the copy. /pricing and /services/virtual-assistant both read them here.
  const virtualAssistantPlans: PricingPlan[] = [
    { name: copy.assistant1Name, price: copy.assistant1Price, hours: copy.assistant1Feature1, features: [copy.assistant1Feature2, copy.assistant1Feature3, copy.assistant1Feature4] },
    { name: copy.assistant2Name, price: copy.assistant2Price, hours: copy.assistant2Feature1, features: [copy.assistant2Feature2, copy.assistant2Feature3, copy.assistant2Feature4] },
    { name: copy.assistant3Name, price: copy.assistant3Price, hours: copy.assistant3Feature1, features: [copy.assistant3Feature2, copy.assistant3Feature3, copy.assistant3Feature4] },
  ]
  return { frontDeskPlans, virtualAssistantPlans }
}

export function getVirtualAssistantPlans(locale: Locale): PricingPlan[] {
  const content = locale === "es" ? spanishPricingContent : englishPricingContent
  return getPricingPlans(resolveContent(content, pricingNumbers)).virtualAssistantPlans
}
