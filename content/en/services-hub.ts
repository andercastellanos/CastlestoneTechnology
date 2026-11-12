import { webDesignContent } from "@/content/en/web-design"
import { homeContent } from "@/content/en/home"

export type ServicesHubContent = {
  path: string
  title: string
  description: string
  heading: string
  introduction: string
  groups: Record<"software" | "ai" | "marketing" | "staffing", string>
  developmentLabel: string
  webDesignDescription: string
  cityServiceLabel: string
  cityIntroduction: string
  ctaHeading: string
  ctaDescription: string
  ctaLabel: string
}

export const servicesHubContent: ServicesHubContent = {
  path: "/services",
  title: "Web, AI & Marketing Services",
  description: "Explore Castlestone's software, websites, AI, marketing and remote staffing services. Review each service and start with a consultation.",
  heading: "Web, AI & Marketing Services",
  introduction: "Explore our web, AI & marketing services, along with remote staffing options for your business. Review each service’s scope and bring your needs to a consultation.",
  groups: { software: "Software & websites", ai: "AI", marketing: "Marketing", staffing: "Staffing" },
  developmentLabel: homeContent.supportCards_2_status,
  webDesignDescription: webDesignContent.metadata_description,
  cityServiceLabel: "Web design services",
  cityIntroduction: " — see what we build or browse by city: ",
  ctaHeading: "Find the right starting point for your business",
  ctaDescription: "Tell us what you need and which tools you already use. Begin with a consultation with our team.",
  ctaLabel: "Book a consultation about your project",
}
