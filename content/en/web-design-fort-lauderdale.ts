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
      { title: "Marine businesses", description: "A Fort Lauderdale marine-service website should help an owner or captain describe a vessel and the work requested before staff assess it. Organize pages by the services you actually provide and explain whether the first step is a conversation, an inspection request, or another review. Discuss which vessel details, berth or service location, and access arrangements the inquiry needs. If your business works both at a facility and at a vessel’s location, explain those options without implying every marina or type of boat is covered." },
      { title: "Home services", description: "For a Fort Lauderdale home-service business, a useful inquiry starts with the property and the job. Describe the types of work you take on and let a resident or property manager explain whether the request concerns a house, a condominium, or another property you serve. Agree on which access details staff need before arranging a visit. Show your real coverage and response process, with separate wording for requesting service and receiving a confirmed appointment. Include photos or attachments only if they help your team assess the work." },
      { title: "Real estate", description: "A Fort Lauderdale real estate site should distinguish someone exploring a property from an owner asking about selling or managing one. Use separate contact paths for those needs, with property information supplied and maintained by your business. If your team wants a listing connection, review the existing source, who maintains it, and what should happen when an inquiry names a property no longer available. Make it clear which person or team receives each request rather than sending every visitor to an unexplained generic form." },
    ],
  },
  pricing: {
    ...shared.pricing,
    introduction: "During a free consultation, explain how a vessel-service inquiry, a property visit, or a real estate request reaches your team today. We define the website around the agreed requirements and issue a written fixed-scope quote before work starts, including any connections to existing tools.",
  },
  process: {
    ...shared.process,
    introduction: "Bring a sample marine-service request, property job, or real estate inquiry to the initial conversation. That free consultation establishes what to include in the written fixed-scope quote. The project then moves through design, revisions, build, and launch, keeping the agreed intake and response process in view.",
  },
  faq: {
    heading: "Questions about your website in Fort Lauderdale",
    items: [
      { question: "What details should a vessel owner prepare before requesting marine service?", answer: "Decide with your staff which vessel characteristics, service location, and description of the work are useful for an initial review. A form can guide that request without presenting it as an accepted job or a confirmed service slot. Explain how your team will assess the information and discuss the next step." },
      { question: "How can a marine business explain where it performs work?", answer: "Distinguish work at your own facility from services performed at a vessel’s location, if your business offers both. Publish the locations and access arrangements you actually support. For a request involving another marina or berth, offer a way to ask staff rather than implying unrestricted coverage." },
      { question: "Can a condominium or property manager provide access details for a service request?", answer: "Discuss what your team needs to arrange a visit and how the manager should share it. The initial form can identify the property type and the person coordinating access. Decide which details belong in that public inquiry and which staff will collect later through the business’s usual process." },
      { question: "How should property-listing inquiries differ from seller inquiries?", answer: "A listing inquiry should identify the property the visitor is asking about. A seller’s request needs a different conversation about the property and the service sought. Define separate routes and the staff responsible for each. If listings come from another system, discuss that connection before including it in the quote." },
      { question: "What happens when a property shown on the website is no longer available?", answer: "Agree on who keeps property information current and what the site should display when an item changes status. If an external source supplies that information, review its role in the project scope. Offer an inquiry path for related needs without leaving an outdated page to imply the property is still available." },
    ],
  },
  final: { ...shared.final, heading: "Let's define your website in Fort Lauderdale" },
}
