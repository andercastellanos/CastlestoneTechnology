import type { WebDesignCityContent } from "@/content/types/web-design-city"
import { skyTravelProject } from "@/lib/page-data/projects"
import { skyTravelCopy } from "@/content/en/projects"

export const webDesignMiamiContent: WebDesignCityContent = {
  path: "/blog/web-design-miami",
  city: "Miami",
  region: "FL",
  metadata_title: "Web Design in Miami",
  metadata_description: "Web design in Miami from a Miami-based agency serving U.S. businesses. Projects scoped in Miami and built by our nearshore engineering team.",
  eyebrow: "Websites for Miami businesses",
  heading: "Web Design in Miami",
  introduction: "Web design in Miami starts with how your business serves visitors and local customers: trip details for a Brickell travel agency, menus for a restaurant, or a clear inquiry path for a professional service. Castlestone is a Miami-based agency working with businesses across the U.S. Projects are scoped in Miami and built by our nearshore engineering team.",
  primaryCta: "Book a free consultation",
  projectCta: "Explore a project from our team",
  project: {
    url: skyTravelProject.url,
    eyebrow: "A project from our team",
    heading: skyTravelProject.name,
    description: skyTravelCopy.description,
    featuresHeading: "Explore the website",
    features: [
      "Destination and trip pages",
      "Departures filtered by year",
      "A testimonials page",
      "A blog",
      "WhatsApp contact",
      "A layout that adapts to mobile screens",
    ],
    linkLabel: "Explore the Sky Travel J&M website",
  },
  industries: {
    heading: "Websites for the businesses Miami serves",
    introduction: "We work with travel and hospitality, restaurants, and professional services. The starting point is your business, the information your visitors need, and the next step you want them to take.",
    items: [
      { title: "Travel and hospitality", description: "A Miami travel or hospitality website should distinguish a trip inquiry from a confirmed reservation. Give each experience a page with the itinerary, departure or arrival instructions, what is included, and the details travelers should confirm with your staff. For a business arranging hotel or airport pickups, explain the meeting process using its actual operating instructions. Plan mobile access to those details and a clear route to the existing booking tool or your team. Discuss which information staff need to keep current before defining the build." },
      { title: "Restaurants", description: "Help someone choosing a Miami restaurant move from checking the menu to planning a visit. Present menus as readable pages, with separate information for dining hours, location, reservations, and takeout if those options exist. A private-dining inquiry needs different questions from a table reservation: the proposed date, group size, and type of event can help staff respond. Decide who will maintain menu changes and where a visitor goes when the reservation or ordering process uses another provider." },
      { title: "Professional services", description: "A professional-services website in Miami should help a prospect recognize whether a firm handles their kind of request. Organize pages around the actual services rather than a list of broad promises. Explain what to prepare for an introductory conversation, how to reach the appropriate team, and whether meetings take place at an office or remotely. If a firm serves several types of businesses, use clear inquiry choices so staff can route a request without asking visitors to submit detailed confidential material." },
    ],
  },
  pricing: {
    heading: "How pricing works",
    introduction: "Bring your Miami website’s menus, trip information, or service pages to a free consultation. We use those requirements to define the work and provide a written fixed-scope quote before starting. Booking connections and responsibility for preparing content belong in that discussion.",
    factorsHeading: "What shapes the quote",
    factors: [
      "The number of pages and the content each page needs",
      "Features such as booking or online payments",
      "Connections to tools your business already uses",
      "Content preparation and copywriting",
      "Your timeline",
    ],
    closing: "Use the consultation to define what the project needs to include. The written quote establishes the agreed scope before the work begins.",
  },
  process: {
    heading: "How we work",
    introduction: "Start by walking through a customer’s next step: asking about a trip, reserving a table, or contacting a professional. The free consultation leads to a written fixed-scope quote, followed by design, revisions, build, and launch. We use the agreed content and inquiry paths throughout that sequence.",
    steps: [
      { title: "Discovery call", description: "Discuss your business, your visitors, and what the website needs to do." },
      { title: "Written quote", description: "Review a fixed-scope quote before work starts." },
      { title: "Design", description: "Develop the design around the agreed pages and content." },
      { title: "Revisions", description: "Review the design and work through revisions before the build." },
      { title: "Build", description: "Build the website and the features included in the agreed scope." },
      { title: "Launch", description: "Bring the agreed website through to launch." },
    ],
  },
  faq: {
    heading: "Questions about your Miami website",
    items: [
      { question: "How should a Miami travel website handle an itinerary inquiry?", answer: "Give the visitor enough trip detail to ask a useful question: the experience, departure dates your business publishes, what is included, and any arrangements to confirm. Then decide whether the next step is a booking tool or a request to your staff. An inquiry should not appear to be a confirmed reservation." },
      { question: "What should a restaurant publish besides a menu?", answer: "Discuss dining hours, the exact location, reservation instructions, and any ordering options your restaurant actually offers. If you accept private events, give that request its own path. Agree on who updates each item so a menu change does not leave event or reservation information out of step." },
      { question: "Can private-dining requests use a different form from table reservations?", answer: "Treat those as separate requirements during the consultation. A private event can need a proposed date, group size, and a description of the occasion; a regular reservation may already belong in your existing reservation system. The written quote should state which paths the website will include and how requests reach your staff." },
      { question: "How can a professional-services firm help prospects choose the right contact?", answer: "Write service pages around the requests the firm actually handles, then give visitors a short set of inquiry choices. Explain what an initial conversation covers and how the team responds. Discuss routing those inquiries before adding connections to a calendar or other business tools to the project scope." },
      { question: "Should hotel arrival details and trip-planning information share one page?", answer: "They serve different moments. A traveler comparing an experience needs an overview; someone preparing to arrive needs clear directions and your published meeting or check-in instructions. Decide which information belongs on public pages and which your staff sends directly after a booking. Use your business’s actual process to organize those paths." },
    ],
  },
  final: {
    heading: "Let's define your Miami website",
    description: "Tell us about your business, the website you have in mind, and the tools you already use. Begin with a free consultation and a written fixed-scope quote.",
    contactLabel: "Contact our team about your website",
  },
  related: {
    heading: "Connect your website with the rest of your business",
    introduction: "Explore related services and bring your requirements to the consultation.",
    websites: "websites and landing pages",
    receptionist: "AI receptionist",
    marketing: "SMS marketing",
  },
}
