import type { WebDesignCityContent } from "@/content/types/web-design-city"
import { webDesignMiamiContent as shared } from "@/content/en/web-design-miami"

export const webDesignOrlandoContent: WebDesignCityContent = {
  ...shared,
  path: "/blog/web-design-orlando",
  city: "Orlando",
  metadata_title: "Web Design in Orlando",
  metadata_description: "Web design in Orlando for tourism, hospitality and home services. Meet our Miami-based agency and start with a free consultation and written fixed-scope quote.",
  eyebrow: "Websites for Orlando businesses",
  heading: "Web Design in Orlando",
  introduction: "Web design in Orlando needs to work for visitors planning a trip and residents choosing a service for their home. A tourism website can explain an experience before someone arrives, a hospitality site can organize stay details, and a home-services site can make coverage and inquiries clear. Castlestone is a Miami-based agency working with businesses across the U.S. Projects are scoped in Miami and built by our nearshore engineering team.",
  industries: {
    heading: "Websites for Orlando tourism, hospitality and home services",
    introduction: "Plan the website around the questions people ask before a visit, a stay, or a service request. During the consultation, we define the pages and connections your business needs.",
    items: [
      { title: "Tourism", description: "Help people planning a visit to Orlando understand your experiences, schedules, and meeting details. Discuss how visitors should ask a question or request a booking, and which information they need before arriving." },
      { title: "Hospitality", description: "Make stay details, location information, and contact options easy to find on a phone. Bring your reservation requirements and existing tools to the consultation so their role is clear in the website scope." },
      { title: "Home services", description: "Explain the services you provide and the Orlando areas you actually cover. Give residents a clear way to describe their job and request a quote, with an inquiry process shaped around how your team works." },
    ],
  },
  faq: {
    ...shared.faq,
    heading: "Questions about your Orlando website",
  },
  final: {
    ...shared.final,
    heading: "Let's define your Orlando website",
  },
}
