import type { VirtualFrontDeskContent } from "@/content/types/virtual-front-desk"

export const virtualFrontDeskNumbers = {
  "metadata_description": [
    "1,200"
  ],
  "pricingPlans_1_price": [
    "1,200"
  ],
  "pricingPlans_1_features_1": [
    "40"
  ],
  "pricingPlans_2_price": [
    "1,800"
  ],
  "pricingPlans_2_features_1": [
    "55"
  ],
  "pricingPlans_3_price": [
    "2,500"
  ],
  "pricingPlans_3_features_4": [
    "24",
    "7"
  ],
  "heroDescription": [
    "70"
  ]
} as const

export function getVirtualFrontDeskData(copy: VirtualFrontDeskContent) {
  const features = [
    {
      title: copy.features_1_title,
      description: copy.features_1_description,
    },
    {
      title: copy.features_2_title,
      description: copy.features_2_description,
    },
    {
      title: copy.features_3_title,
      description: copy.features_3_description,
    },
  ]

  const pricingPlans = [
    {
      name: copy.pricingPlans_1_name,
      price: copy.pricingPlans_1_price,
      features: [
        copy.pricingPlans_1_features_1,
        copy.pricingPlans_1_features_2,
        copy.pricingPlans_1_features_3,
        copy.pricingPlans_1_features_4,
        copy.pricingPlans_1_features_5,
      ],
    },
    {
      name: copy.pricingPlans_2_name,
      price: copy.pricingPlans_2_price,
      features: [
        copy.pricingPlans_2_features_1,
        copy.pricingPlans_2_features_2,
        copy.pricingPlans_2_features_3,
        copy.pricingPlans_2_features_4,
      ],
    },
    {
      name: copy.pricingPlans_3_name,
      price: copy.pricingPlans_3_price,
      features: [
        copy.pricingPlans_3_features_1,
        copy.pricingPlans_3_features_2,
        copy.pricingPlans_3_features_3,
        copy.pricingPlans_3_features_4,
      ],
    },
  ]
  return { features, pricingPlans }
}
