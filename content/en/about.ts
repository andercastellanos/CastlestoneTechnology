export type AboutContent = {
  path: string
  title: string
  description: string
  breadcrumbLabel: string
  eyebrow: string
  heading: string
  introduction: string
  primaryLabel: string
  secondaryLabel: string
  whoHeading: string
  whoParagraphs: string[]
  growthHeading: string
  growthCards: { title: string; href: string; description: string }[]
  howHeading: string
  steps: { title: string; description: string }[]
  standardsHeading: string
  principles: { title: string; description: string }[]
  locationHeading: string
  locationDescription: string
  cityHeading: string
  ctaHeading: string
  ctaDescription: string
}

export const aboutContent: AboutContent = {
  path: "/company/about",
  title: "About Us | Miami Technology Agency",
  description: "Castlestone Technology is a Miami technology agency helping small businesses grow with websites, local SEO, AI receptionists, automation and custom software.",
  breadcrumbLabel: "About",
  eyebrow: "About Castlestone Technology",
  heading: "We Help Businesses Grow With Technology That Works",
  introduction: "Castlestone Technology is a Miami technology agency. We build websites, AI receptionists, marketing automation and custom software for small and mid-sized businesses — then we stay on as the team that keeps it all running.",
  primaryLabel: "Book a Free Consultation",
  secondaryLabel: "See our services",
  whoHeading: "Who We Are",
  whoParagraphs: [
    "Castlestone Technology is a technology agency headquartered in Brickell, Miami. We work with service businesses — law firms, dental and medical offices, travel agencies and professional firms — that want more customers without building a full in-house tech team.",
    "Most small businesses don't lose customers because of their service. They lose them in the gaps: a website nobody finds, a call that goes to voicemail, a lead nobody follows up with. Castlestone exists to close those gaps, with one team handling the website, the phone line, the follow-up and the software behind it — so nothing falls between vendors.",
  ],
  growthHeading: "How We Help Businesses Grow",
  growthCards: [
    { title: "Get Found", href: "/services/local-seo", description: "Websites, local SEO and AI search visibility so customers find you before they find your competitors." },
    { title: "Never Miss a Lead", href: "/services/ai-receptionist", description: "AI receptionists, online booking and text and email follow-up that answer and respond around the clock." },
    { title: "Automate the Busywork", href: "/services/technology-solutions", description: "Custom software, AI agents and integrations that take repetitive work off your team's plate." },
    { title: "Get Online the Right Way", href: "/services/online-presence-setup", description: "Business email, social profiles and a website that work together from day one." },
  ],
  howHeading: "How We Work",
  steps: [
    { title: "We listen first", description: "A free consultation to understand your business, your customers and what's getting in the way." },
    { title: "We plan in plain English", description: "A clear proposal with scope and timeline before any work starts." },
    { title: "We build and launch", description: "Your project goes live tested, tracked and ready for customers." },
    { title: "We stay on", description: "Ongoing support and improvements as your business grows." },
  ],
  standardsHeading: "What We Stand For",
  principles: [
    { title: "Straight Answers", description: "No jargon and no surprises. You'll know what we're building, why, and what it costs before we start." },
    { title: "Built for Small Business", description: "Tools sized for how a small business actually runs, not enterprise software you'll never use." },
    { title: "Measurable Results", description: "Calls, leads and bookings tracked so you can see what's working." },
  ],
  locationHeading: "Based in Miami, Working Across Florida and Beyond",
  locationDescription: "Our office is in Brickell, and we work with businesses throughout South Florida, Central Florida and across the U.S.",
  cityHeading: "Web design by city",
  ctaHeading: "Let's Talk About Your Business",
  ctaDescription: "Tell us what's slowing you down. We'll show you where technology can help — no pressure, no commitment.",
}
