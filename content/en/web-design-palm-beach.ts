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
    { heading: "Web design for West Palm Beach businesses", description: "For a West Palm Beach practice, organize the journey from choosing a service to requesting an appointment. Visitors should be able to identify the office, see the services provided there, and find your published arrival and contact instructions. If the practice has other locations, keep the West Palm Beach information distinct rather than making visitors work out where a service is offered. A wealth management office needs a different path: explain the work it takes on, introduce the team using approved information, and describe an introductory conversation. Bring the office’s appointment or client-contact tools to the consultation so the website scope reflects how staff handle requests. Decide who will keep each office’s service information current when staff, contact details, or appointment routes change." },
    { heading: "Web design for Boca Raton businesses", description: "For a Boca Raton business, make it easy to distinguish an initial inquiry from an existing patient or client request. A medical or aesthetic practice can explain appointment requests while directing existing patients to the practice’s established contact or portal process. A wealth management firm can describe its approach without asking a prospective client to put detailed financial information into a general website form. If your business also has a West Palm Beach office, give each office its actual services, contact details, and request route; help visitors recognize which office will handle their request. Discuss who owns updates for the Boca Raton office and how staff will keep its contact and appointment information current when services overlap between locations." },
  ],
  industries: {
    heading: "Websites for businesses in West Palm Beach & Boca Raton",
    introduction: "Define the pages and connections around the questions your customers ask and the process your team actually follows.",
    items: [
      { title: "Medical and aesthetic practices", description: "Help someone considering a West Palm Beach or Boca Raton practice understand which services it offers, who provides them, and how to request a conversation or appointment. Use service descriptions and practitioner information supplied and approved by the practice. Discuss whether appointment requests belong in an existing scheduling tool and how current patients reach the practice through its established channels. Your practice’s own compliance team reviews the content before publication." },
      { title: "Wealth management", description: "A wealth management website for West Palm Beach or Boca Raton should explain the firm’s actual services, its approach to an introductory conversation, and how prospects reach the appropriate office. Use team information and service descriptions supplied by the firm. Separate a general inquiry from an existing client’s established portal or contact process. Decide what a brief first-contact form needs without requesting a detailed financial history there. Your firm’s own compliance team reviews the content before publication." },
    ],
  },
  pricing: {
    ...shared.pricing,
    introduction: "For your West Palm Beach or Boca Raton website, begin with a free consultation about office-specific pages, appointment or inquiry paths, and the content your business will provide and approve. You receive a written fixed-scope quote before work begins; the agreed requirements determine that scope.",
  },
  process: {
    ...shared.process,
    introduction: "Identify which office, services, and contact route each page represents during the free consultation. We provide the written fixed-scope quote before moving through design, revisions, build, and launch. Plan your own compliance team’s content review within that sequence so publication uses the material your business has approved.",
  },
  faq: {
    heading: "Questions about your website in West Palm Beach & Boca Raton",
    items: [
      { question: "How do we give West Palm Beach and Boca Raton offices distinct pages?", answer: "Give each office the services, staff information, contact details, and appointment or inquiry route that actually apply there. Explain any differences a visitor needs to choose the right office. If both offices share information, retain that common material where useful instead of manufacturing local differences or changing only a city name." },
      { question: "Can a practice direct appointment requests to its existing scheduling tool?", answer: "Bring the practice’s current appointment process and tool to the consultation. Define whether the website links to that tool or needs another agreed connection, and distinguish an appointment request from a confirmation. Your staff determine how requests are reviewed and when an appointment is confirmed." },
      { question: "Who reviews medical, aesthetic, and wealth management content?", answer: "Your practice or firm supplies the service information and its own compliance team reviews the content before publication. Use the review to decide which material the business approves for the website. Include the approved material in the agreed service pages and appointment information." },
      { question: "What should a wealth management prospect submit in an initial inquiry?", answer: "Discuss a short first-contact path with the firm: contact details and the general reason for a conversation may be enough to route the request. Use the firm’s established process for any later exchange of detailed financial information. Explain the next step in the form so a prospect knows how the firm will respond." },
      { question: "Should existing patients and wealth management clients use the general contact form?", answer: "Explain the business’s established contact or portal route for existing patients and clients, separately from the first-inquiry path. Bring those destinations to the scope discussion so visitors can find the right next step. The practice or firm decides which routes to publish and who keeps those directions current." },
    ],
  },
  final: { ...shared.final, heading: "Let's define your website in West Palm Beach & Boca Raton" },
}
