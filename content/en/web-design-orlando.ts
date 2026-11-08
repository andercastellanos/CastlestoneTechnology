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
      { title: "Tourism", description: "For an Orlando experience, help a visitor decide whether it fits the day they are planning. Describe the duration, meeting arrangements, what guests should bring, and any participation information your business provides. Separate a request about a private group from an individual booking. If weather can change your own operating plans, explain where guests find your published updates and how to contact staff. Review the handoff to your current ticketing or reservation tool instead of assuming the website can show live availability." },
      { title: "Hospitality", description: "An Orlando hospitality site can support a stay before and after a reservation. Group room or accommodation details separately from arrival instructions, parking information, and the contact path for an existing guest. Make your own location clear so visitors can plan travel to the places on their itinerary without unsupported travel-time promises. Discuss how reservation changes are handled and whether group-stay inquiries should go to another team. The website should identify when a visitor is leaving for an external booking provider." },
      { title: "Home services", description: "Residents looking for a home service in Orlando need to know whether you cover their address and handle their type of job. Use the actual service area and describe the work included in each service. A request form can ask for the property location, the problem, and a preferred way to respond, with photos only if your team wants them. For a rental property, explain how an owner or manager should arrange access. Keep a request for an appointment distinct from a confirmed visit." },
    ],
  },
  pricing: {
    ...shared.pricing,
    introduction: "Use a free consultation to map what happens before an Orlando visitor buys a ticket, books a stay, or requests work at a property. We turn the agreed pages, content, and tool connections into a written fixed-scope quote before the project begins.",
  },
  process: {
    ...shared.process,
    introduction: "We first separate the paths for trip planning, an existing guest, or a property-service request. After that free consultation, you review the written fixed-scope quote. Design, revisions, build, and launch follow the same agreed scope, with the booking or inquiry handoff considered at each stage.",
  },
  faq: {
    heading: "Questions about your Orlando website",
    items: [
      { question: "How can guests tell whether an Orlando experience fits their plans?", answer: "Present the schedule information your business publishes, the expected duration, the meeting arrangement, and what participation involves. Give guests a place to ask about their circumstances before buying. If a separate ticketing tool handles reservations, make that next step clear rather than suggesting the website itself guarantees a place." },
      { question: "What should the site say when weather affects an activity?", answer: "Use the operating instructions and policies your business has approved. Discuss where staff will post changes, which contact option guests should use, and what information belongs in booking communications. The website should point to that process without inventing a cancellation promise or suggesting it can predict whether an activity will run." },
      { question: "How do we separate new reservations from questions about an existing stay?", answer: "Give each visitor a clear route. Someone comparing accommodation needs room details and a booking option; an existing guest may need arrival information or the contact channel for changes. Bring your reservation provider and guest-support process to the consultation so those handoffs can be included in the agreed scope." },
      { question: "Can rental-property managers request home services without confirming a visit?", answer: "Plan a request flow that asks for the property address, the work needed, and the person coordinating access. Explain that your staff will review the request and arrange the next step. Any connection to a calendar or job-management tool should reflect that review rather than display an unconfirmed appointment as booked." },
      { question: "How should we explain which Orlando addresses a home-service business covers?", answer: "Publish only the areas your team actually serves, alongside the services available there. When coverage depends on the job or address, direct the resident to a short inquiry instead of implying every request is accepted. Decide who updates those coverage details when your operating area changes." },
    ],
  },
  final: {
    ...shared.final,
    heading: "Let's define your Orlando website",
  },
}
