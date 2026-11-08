import type { WebDesignCityContent } from "@/content/types/web-design-city"
import { webDesignMiamiContent as shared } from "@/content/en/web-design-miami"
import { palmBeachAreas } from "@/lib/page-data/web-design-cities"

export const webDesignPalmBeachContent: WebDesignCityContent = {
  ...shared,
  path: "/blog/web-design-palm-beach",
  city: "West Palm Beach & Boca Raton",
  metadata_title: "Web Design in West Palm Beach & Boca Raton",
  metadata_description: "Web design in West Palm Beach & Boca Raton for medical and aesthetic practices and wealth management. Free consultation and written fixed-scope quote.",
  eyebrow: "Websites for businesses in West Palm Beach & Boca Raton",
  heading: "Web Design in West Palm Beach & Boca Raton",
  introduction: "Web design in West Palm Beach & Boca Raton starts with the questions people ask before choosing a practice or discussing their financial needs. Medical and aesthetic practices need clear service and appointment information; wealth management businesses need to explain their approach and provide an appropriate path to a conversation. Castlestone is a Miami-based agency working with businesses across the U.S. Projects are scoped in Miami and built by our nearshore engineering team.",
  areasServed: palmBeachAreas,
  citySections: [
  {
    "heading": "Web design for West Palm Beach businesses",
    "description": "For a West Palm Beach practice or wealth management business, plan how a visitor will understand your services, find the right contact details and request a conversation. Bring the pages, appointment requirements and existing tools you need to the discovery call."
  },
  {
    "heading": "Web design for Boca Raton businesses",
    "description": "For a Boca Raton business, define the questions a prospective patient or client needs answered before reaching out. Build the scope around your actual services and inquiry process, including the information your team needs to respond appropriately."
  }
],
  industries: {
    heading: "Websites for businesses in West Palm Beach & Boca Raton",
    introduction: "Define the pages and connections around the questions your customers ask and the process your team actually follows.",
    items: [
  {
    "title": "Medical and aesthetic practices",
    "description": "Explain the services your practice offers and how a prospective patient should request an appointment. Decide which questions belong on the website and which should be handled directly by your team."
  },
  {
    "title": "Wealth management",
    "description": "Present your business approach, the services you provide and the next step for someone considering a conversation. Define the information an inquiry form should collect and how your team follows up."
  }
],
  },
  faq: { ...shared.faq, heading: "Questions about your website in West Palm Beach & Boca Raton" },
  final: { ...shared.final, heading: "Let's define your website in West Palm Beach & Boca Raton" },
}
