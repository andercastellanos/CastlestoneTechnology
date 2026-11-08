import type { WebDesignCityContent } from "@/content/types/web-design-city"
import { webDesignMiamiContent as shared } from "@/content/en/web-design-miami"

export const webDesignFortLauderdaleContent: WebDesignCityContent = {
  ...shared,
  path: "/blog/web-design-fort-lauderdale",
  city: "Fort Lauderdale",
  metadata_title: "Web Design in Fort Lauderdale",
  metadata_description: "Web design in Fort Lauderdale for marine businesses, home services and real estate. Miami-based agency, free consultation and written fixed-scope quote.",
  eyebrow: "Websites for businesses in Fort Lauderdale",
  heading: "Web Design in Fort Lauderdale",
  introduction: "Web design in Fort Lauderdale should help a vessel owner explain a service request, a resident find help for a property, or a prospective real estate client understand the next step. Marine businesses, home services and real estate need different information and inquiry processes. Castlestone is a Miami-based agency working with businesses across the U.S. Projects are scoped in Miami and built by our nearshore engineering team.",
  industries: {
    heading: "Websites for businesses in Fort Lauderdale",
    introduction: "Define the pages and connections around the questions your customers ask and the process your team actually follows.",
    items: [
  {
    "title": "Marine businesses",
    "description": "Explain the marine services you actually provide, the information a vessel owner should prepare, and how your team assesses a request. Discuss the role of forms, service details and existing tools during the consultation."
  },
  {
    "title": "Home services",
    "description": "Make your services and genuine coverage clear. Help residents describe the work they need, share the relevant property details and reach the right person without promising availability your team cannot fulfill."
  },
  {
    "title": "Real estate",
    "description": "Organize the information prospective clients need before contacting your business. Discuss property information, inquiry routing and any connections to tools you already use as part of the written website scope."
  }
],
  },
  faq: { ...shared.faq, heading: "Questions about your website in Fort Lauderdale" },
  final: { ...shared.final, heading: "Let's define your website in Fort Lauderdale" },
}
