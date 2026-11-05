import type { VirtualAssistantContent } from "@/content/types/virtual-assistant"
import { VIRTUAL_ASSISTANT_PRICING, VIRTUAL_ASSISTANT_ROLES } from "@/lib/constants"
import { numericParts } from "@/lib/content"
import {
Cpu,
Globe,
LayoutDashboard,
Share2,
Star,
Users,
type LucideIcon,
} from "lucide-react"

export const virtualAssistantNumbers = {
  "metadata_openGraph_description": [
    "6",
    "60",
    "72"
  ],
  "heroStats_1_value": [
    "60"
  ],
  "heroStats_2_value": [
    "6"
  ],
  "steps_1_description": [
    "15"
  ],
  "steps_2_description": [
    "2",
    "3",
    "48"
  ],
  "steps_3_description": [
    "72"
  ],
  "heroDescription": [
    "6"
  ],
  "rolesDescription": [
    "72"
  ],
  "stepsHeading": [
    "3"
  ],
  "ctaDescription": [
    "15",
    "48"
  ],
  pricing_1_price: numericParts(VIRTUAL_ASSISTANT_PRICING[0].price),
  pricing_1_hours: numericParts(VIRTUAL_ASSISTANT_PRICING[0].hours),
  pricing_1_features_1: numericParts(VIRTUAL_ASSISTANT_PRICING[0].features[0]),
  pricing_1_features_2: numericParts(VIRTUAL_ASSISTANT_PRICING[0].features[1]),
  pricing_2_price: numericParts(VIRTUAL_ASSISTANT_PRICING[1].price),
  pricing_2_hours: numericParts(VIRTUAL_ASSISTANT_PRICING[1].hours),
  pricing_2_features_1: numericParts(VIRTUAL_ASSISTANT_PRICING[1].features[0]),
  pricing_2_features_2: numericParts(VIRTUAL_ASSISTANT_PRICING[1].features[1]),
  pricing_3_price: numericParts(VIRTUAL_ASSISTANT_PRICING[2].price),
  pricing_3_hours: numericParts(VIRTUAL_ASSISTANT_PRICING[2].hours),
  pricing_3_features_1: numericParts(VIRTUAL_ASSISTANT_PRICING[2].features[0]),
  pricing_3_features_2: numericParts(VIRTUAL_ASSISTANT_PRICING[2].features[1]),
} as const

export function getVirtualAssistantData(copy: VirtualAssistantContent) {
  const iconMap: Record<string, LucideIcon> = {
    LayoutDashboard,
    Share2,
    Star,
    Cpu,
    Globe,
    Users,
  }

  const heroStats = [
    { value: copy.heroStats_1_value, label: copy.heroStats_1_label },
    { value: copy.heroStats_2_value, label: copy.heroStats_2_label },
    { value: copy.heroStats_3_value, label: copy.heroStats_3_label },
    { value: copy.heroStats_4_value, label: copy.heroStats_4_label },
  ]

  const steps = [
    {
      number: "01",
      title: copy.steps_1_title,
      description: copy.steps_1_description,
    },
    {
      number: "02",
      title: copy.steps_2_title,
      description: copy.steps_2_description,
    },
    {
      number: "03",
      title: copy.steps_3_title,
      description: copy.steps_3_description,
    },
  ]

  const whyLatAm = [
    {
      icon: "🗣️",
      title: copy.whyLatAm_1_title,
      description: copy.whyLatAm_1_description,
    },
    {
      icon: "🕐",
      title: copy.whyLatAm_2_title,
      description: copy.whyLatAm_2_description,
    },
    {
      icon: "🎓",
      title: copy.whyLatAm_3_title,
      description: copy.whyLatAm_3_description,
    },
    {
      icon: "🤝",
      title: copy.whyLatAm_4_title,
      description: copy.whyLatAm_4_description,
    },
  ]
  const roles = [
    { ...VIRTUAL_ASSISTANT_ROLES[0],
      name: copy.roles_1_name,
      description: copy.roles_1_description,
      skills: [copy.roles_1_skills_1, copy.roles_1_skills_2, copy.roles_1_skills_3, copy.roles_1_skills_4, copy.roles_1_skills_5, copy.roles_1_skills_6],
    },
    { ...VIRTUAL_ASSISTANT_ROLES[1],
      name: copy.roles_2_name,
      description: copy.roles_2_description,
      skills: [copy.roles_2_skills_1, copy.roles_2_skills_2, copy.roles_2_skills_3, copy.roles_2_skills_4, copy.roles_2_skills_5, copy.roles_2_skills_6],
    },
    { ...VIRTUAL_ASSISTANT_ROLES[2],
      name: copy.roles_3_name,
      description: copy.roles_3_description,
      skills: [copy.roles_3_skills_1, copy.roles_3_skills_2, copy.roles_3_skills_3, copy.roles_3_skills_4, copy.roles_3_skills_5, copy.roles_3_skills_6],
    },
    { ...VIRTUAL_ASSISTANT_ROLES[3],
      name: copy.roles_4_name,
      description: copy.roles_4_description,
      skills: [copy.roles_4_skills_1, copy.roles_4_skills_2, copy.roles_4_skills_3, copy.roles_4_skills_4, copy.roles_4_skills_5, copy.roles_4_skills_6],
    },
    { ...VIRTUAL_ASSISTANT_ROLES[4],
      name: copy.roles_5_name,
      description: copy.roles_5_description,
      skills: [copy.roles_5_skills_1, copy.roles_5_skills_2, copy.roles_5_skills_3, copy.roles_5_skills_4, copy.roles_5_skills_5, copy.roles_5_skills_6],
    },
    { ...VIRTUAL_ASSISTANT_ROLES[5],
      name: copy.roles_6_name,
      description: copy.roles_6_description,
      skills: [copy.roles_6_skills_1, copy.roles_6_skills_2, copy.roles_6_skills_3, copy.roles_6_skills_4, copy.roles_6_skills_5, copy.roles_6_skills_6],
    }
  ]
  const pricing = [
    { ...VIRTUAL_ASSISTANT_PRICING[0],
      name: copy.pricing_1_name,
      price: copy.pricing_1_price,
      hours: copy.pricing_1_hours,
      features: [copy.pricing_1_features_1, copy.pricing_1_features_2, copy.pricing_1_features_3, copy.pricing_1_features_4, copy.pricing_1_features_5],
    },
    { ...VIRTUAL_ASSISTANT_PRICING[1],
      name: copy.pricing_2_name,
      price: copy.pricing_2_price,
      hours: copy.pricing_2_hours,
      features: [copy.pricing_2_features_1, copy.pricing_2_features_2, copy.pricing_2_features_3, copy.pricing_2_features_4, copy.pricing_2_features_5, copy.pricing_2_features_6],
    },
    { ...VIRTUAL_ASSISTANT_PRICING[2],
      name: copy.pricing_3_name,
      price: copy.pricing_3_price,
      hours: copy.pricing_3_hours,
      features: [copy.pricing_3_features_1, copy.pricing_3_features_2, copy.pricing_3_features_3, copy.pricing_3_features_4, copy.pricing_3_features_5, copy.pricing_3_features_6],
    }
  ]
  return { iconMap, heroStats, steps, whyLatAm, roles, pricing }
}
