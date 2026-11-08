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
      { title: "Travel and hospitality", description: "Make destinations, experiences, and trip details easy to explore. Our Sky Travel J&M project gives you a concrete example to discuss during your consultation." },
      { title: "Restaurants", description: "Help visitors find your menu, location, and contact details. Discuss whether reservations, online payments, or connections to existing tools belong in your website's scope." },
      { title: "Professional services", description: "Explain what your business does and give prospective customers a clear way to inquire. Define the pages, content, and tool connections around your actual process." },
    ],
  },
  pricing: {
    heading: "How pricing works",
    introduction: "Start with a free consultation. We discuss your website, then provide a written fixed-scope quote before work starts.",
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
      { question: "How much does a website cost?", answer: "We set pricing after a free consultation and provide a written fixed-scope quote before work starts. The quote depends on pages, features, tool connections, content and copywriting, and timeline." },
      { question: "Where is Castlestone based, and where do you work?", answer: "Castlestone is a Miami-based agency working with businesses across the U.S. Projects are scoped in Miami and built by our nearshore engineering team." },
      { question: "Can I see a website your team designed and built?", answer: skyTravelCopy.faqAnswer },
      { question: "Can we discuss booking, payments, or connections to our existing tools?", answer: "Yes. Bring those requirements to the discovery call. Features such as booking or online payments and connections to your existing tools affect the scope and quote." },
      { question: "What happens after the discovery call?", answer: "The process is a written quote, design, revisions, build, and launch. The fixed scope is set out in writing before work starts." },
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
