import type { TechnologySolutionsContent } from "@/content/types/technology-solutions"

export const technologySolutionsNumbers = {
  "stats_1_value": [
    "70"
  ],
  "stats_2_value": [
    "5"
  ],
  "stats_3_value": [
    "10"
  ],
  "engagementModels_1_price": [
    "45"
  ],
  "engagementModels_3_price": [
    "3,500"
  ],
  "engagementModels_3_features_1": [
    "1",
    "3"
  ],
  "qualityPillars_1_title": [
    "5"
  ]
} as const

export function getTechnologySolutionsData(copy: TechnologySolutionsContent) {
  const stats = [
    { value: copy.stats_1_value, label: copy.stats_1_label },
    { value: copy.stats_2_value, label: copy.stats_2_label },
    { value: copy.stats_3_value, label: copy.stats_3_label },
    { value: copy.stats_4_value, label: copy.stats_4_label },
  ]

  const capabilities: {
    icon: string
    title: string
    description: string
    href?: string
  }[] = [
    {
      icon: "☎️",
      title: copy.capabilities_1_title,
      description: copy.capabilities_1_description,
      href: "/services/ai-receptionist",
    },
    {
      icon: "💬",
      title: copy.capabilities_2_title,
      description: copy.capabilities_2_description,
      href: "/services/marketing-automation",
    },
    {
      icon: "📍",
      title: copy.capabilities_3_title,
      description: copy.capabilities_3_description,
      href: "/services/local-seo",
    },
    {
      icon: "🖥️",
      title: copy.capabilities_4_title,
      description: copy.capabilities_4_description,
    },
    {
      icon: "🤖",
      title: copy.capabilities_5_title,
      description: copy.capabilities_5_description,
    },
    {
      icon: "🌐",
      title: copy.capabilities_6_title,
      description: copy.capabilities_6_description,
    },
    {
      icon: "📅",
      title: copy.capabilities_7_title,
      description: copy.capabilities_7_description,
    },
    {
      icon: "📱",
      title: copy.capabilities_8_title,
      description: copy.capabilities_8_description,
    },
    {
      icon: "🛒",
      title: copy.capabilities_9_title,
      description: copy.capabilities_9_description,
    },
    {
      icon: "📊",
      title: copy.capabilities_10_title,
      description: copy.capabilities_10_description,
    },
    {
      icon: "🔗",
      title: copy.capabilities_11_title,
      description: copy.capabilities_11_description,
    },
    {
      icon: "⚙️",
      title: copy.capabilities_12_title,
      description: copy.capabilities_12_description,
    },
    {
      icon: "🛠️",
      title: copy.capabilities_13_title,
      description: copy.capabilities_13_description,
    },
    {
      icon: "⚡",
      title: copy.capabilities_14_title,
      description: copy.capabilities_14_description,
    },
    {
      icon: "🏗️",
      title: copy.capabilities_15_title,
      description: copy.capabilities_15_description,
    },
  ]

  const engagementModels = [
    {
      label: copy.engagementModels_1_label,
      price: copy.engagementModels_1_price,
      bestFor: copy.engagementModels_1_bestFor,
      features: [
        copy.engagementModels_1_features_1,
        copy.engagementModels_1_features_2,
        copy.engagementModels_1_features_3,
      ],
      cta: copy.engagementModels_1_cta,
      popular: false,
    },
    {
      label: copy.engagementModels_2_label,
      price: copy.engagementModels_2_price,
      bestFor: copy.engagementModels_2_bestFor,
      features: [
        copy.engagementModels_2_features_1,
        copy.engagementModels_2_features_2,
        copy.engagementModels_2_features_3,
        copy.engagementModels_2_features_4,
      ],
      cta: copy.engagementModels_2_cta,
      popular: true,
    },
    {
      label: copy.engagementModels_3_label,
      price: copy.engagementModels_3_price,
      bestFor: copy.engagementModels_3_bestFor,
      features: [
        copy.engagementModels_3_features_1,
        copy.engagementModels_3_features_2,
        copy.engagementModels_3_features_3,
        copy.engagementModels_3_features_4,
      ],
      cta: copy.engagementModels_3_cta,
      popular: false,
    },
  ]

  const qualityPillars = [
    {
      icon: "🏆",
      title: copy.qualityPillars_1_title,
      description: copy.qualityPillars_1_description,
    },
    {
      icon: "🌎",
      title: copy.qualityPillars_2_title,
      description: copy.qualityPillars_2_description,
    },
    {
      icon: "💬",
      title: copy.qualityPillars_3_title,
      description: copy.qualityPillars_3_description,
    },
  ]
  return { stats, capabilities, engagementModels, qualityPillars }
}
