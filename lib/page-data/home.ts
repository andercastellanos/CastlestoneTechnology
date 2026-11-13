import type { HomeContent } from "@/content/types/home"
import {
Bot,
CalendarCheck,
Globe,
LayoutDashboard,
MapPin,
MessageSquareText,
PhoneCall,
ShoppingCart,
Smartphone,
type LucideIcon,
} from "lucide-react"

export const homeNumbers = {} as const

export function getHomeData(copy: HomeContent) {
  const heroCommitments = [
    { value: copy.heroCommitments_1_value, label: copy.heroCommitments_1_label },
    { value: copy.heroCommitments_2_value, label: copy.heroCommitments_2_label },
    { value: copy.heroCommitments_3_value, label: copy.heroCommitments_3_label },
  ]

  const techSolutions: {
    icon: LucideIcon
    title: string
    description: string
    href?: string
  }[] = [
    {
      icon: PhoneCall,
      title: copy.techSolutions_1_title,
      description: copy.techSolutions_1_description,
      href: "/services/ai-receptionist",
    },
    {
      icon: Bot,
      title: copy.techSolutions_2_title,
      description: copy.techSolutions_2_description,
    },
    {
      icon: MessageSquareText,
      title: copy.techSolutions_3_title,
      description: copy.techSolutions_3_description,
      href: "/services/marketing-automation",
    },
    {
      icon: Globe,
      title: copy.techSolutions_4_title,
      description: copy.techSolutions_4_description,
      href: "/services/web-design",
    },
    {
      icon: MapPin,
      title: copy.techSolutions_5_title,
      description: copy.techSolutions_5_description,
      href: "/services/local-seo",
    },
    {
      icon: CalendarCheck,
      title: copy.techSolutions_6_title,
      description: copy.techSolutions_6_description,
    },
    {
      icon: LayoutDashboard,
      title: copy.techSolutions_7_title,
      description: copy.techSolutions_7_description,
    },
    {
      icon: Smartphone,
      title: copy.techSolutions_8_title,
      description: copy.techSolutions_8_description,
    },
    {
      icon: ShoppingCart,
      title: copy.techSolutions_9_title,
      description: copy.techSolutions_9_description,
    },
  ]

  const specialistRoles = [
    copy.specialistRoles_1,
    copy.specialistRoles_2,
    copy.specialistRoles_3,
    copy.specialistRoles_4,
    copy.specialistRoles_5,
    copy.specialistRoles_6,
  ]

  const supportCards: {
    title: string
    description: string
    href: string
    chips: string[]
  }[] = [
    {
      title: copy.supportCards_1_title,
      description: copy.supportCards_1_description,
      href: "/services/virtual-assistant",
      chips: specialistRoles,
    },
    {
      title: copy.supportCards_2_title,
      description: copy.supportCards_2_description,
      href: "/services/virtual-front-desk",
      chips: [copy.supportCards_2_chips_1, copy.supportCards_2_chips_2, copy.supportCards_2_chips_3, copy.supportCards_2_chips_4],
    },
  ]
  return { heroCommitments, techSolutions, specialistRoles, supportCards }
}
