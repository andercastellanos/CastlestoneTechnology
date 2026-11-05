import type { MarketingAutomationContent } from "@/content/types/marketing-automation"
import {
BarChart3,
BriefcaseBusiness,
CalendarDays,
ClipboardList,
House,
Mail,
MessageSquare,
Plug,
Rocket,
ShieldCheck,
SlidersHorizontal,
Store,
UserCheck,
UserRoundMinus,
Workflow
} from "lucide-react"

export const marketingAutomationNumbers = {} as const

export function getMarketingAutomationData(copy: MarketingAutomationContent) {
  const capabilities = [
    {
      icon: MessageSquare,
      title: copy.capabilities_1_title,
      description: copy.capabilities_1_description,
    },
    {
      icon: Mail,
      title: copy.capabilities_2_title,
      description: copy.capabilities_2_description,
    },
    {
      icon: Workflow,
      title: copy.capabilities_3_title,
      description: copy.capabilities_3_description,
    },
    {
      icon: UserCheck,
      title: copy.capabilities_4_title,
      description: copy.capabilities_4_description,
    },
    {
      icon: Plug,
      title: copy.capabilities_5_title,
      description: copy.capabilities_5_description,
    },
    {
      icon: BarChart3,
      title: copy.capabilities_6_title,
      description: copy.capabilities_6_description,
    },
  ]

  const steps = [
    {
      icon: ClipboardList,
      number: "01",
      title: copy.steps_1_title,
      description: copy.steps_1_description,
    },
    {
      icon: Workflow,
      number: "02",
      title: copy.steps_2_title,
      description: copy.steps_2_description,
    },
    {
      icon: Rocket,
      number: "03",
      title: copy.steps_3_title,
      description: copy.steps_3_description,
    },
  ]

  const compliancePillars = [
    {
      icon: ShieldCheck,
      title: copy.compliancePillars_1_title,
      description: copy.compliancePillars_1_description,
    },
    {
      icon: UserRoundMinus,
      title: copy.compliancePillars_2_title,
      description: copy.compliancePillars_2_description,
    },
    {
      icon: SlidersHorizontal,
      title: copy.compliancePillars_3_title,
      description: copy.compliancePillars_3_description,
    },
  ]

  const audiences = [
    {
      icon: House,
      title: copy.audiences_1_title,
      description: copy.audiences_1_description,
    },
    {
      icon: Store,
      title: copy.audiences_2_title,
      description: copy.audiences_2_description,
    },
    {
      icon: CalendarDays,
      title: copy.audiences_3_title,
      description: copy.audiences_3_description,
    },
    {
      icon: BriefcaseBusiness,
      title: copy.audiences_4_title,
      description: copy.audiences_4_description,
    },
  ]

  const faqs = [
    {
      question: copy.faqs_1_question,
      answer:
        copy.faqs_1_answer,
    },
    {
      question: copy.faqs_2_question,
      answer:
        copy.faqs_2_answer,
    },
    {
      question: copy.faqs_3_question,
      answer:
        copy.faqs_3_answer,
    },
    {
      question: copy.faqs_4_question,
      answer:
        copy.faqs_4_answer,
    },
    {
      question: copy.faqs_5_question,
      answer:
        copy.faqs_5_answer,
    },
    {
      question: copy.faqs_6_question,
      answer:
        copy.faqs_6_answer,
    },
  ]
  return { capabilities, steps, compliancePillars, audiences, faqs }
}
