export const SITE_CONFIG = {
  name: "Castlestone Technology",
  description: "Custom software, AI agents, and automation built by a nearshore engineering team in U.S. time zones—plus virtual support teams for growing businesses.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://castlestonetechnology.com",
  organizationId: "https://castlestonetechnology.com/#organization",
  ogImage: "/opengraph-image",
  twitterImage: "/twitter-image",
  links: {
    linkedin: "https://linkedin.com/company/castlestone-technology",
  },
  contact: {
    email: "contact@castlestonetechnology.com",
    phone: {
      display: "(305) 697-0368",
      e164: "+13056970368",
    },
    address: {
      street: "1000 Brickell Ave",
      suite: "Ste 715",
      city: "Miami",
      region: "FL",
      postalCode: "33131",
      country: "US",
    },
  },
}

export function formatContactAddress(): string {
  const { street, suite, city, region, postalCode } = SITE_CONFIG.contact.address
  return `${street}, ${suite}, ${city}, ${region} ${postalCode}`
}

export const SERVICE_AREAS = [
  SITE_CONFIG.contact.address.city,
  "Fort Lauderdale",
  "Palm Beach",
  "Orlando",
] as const

const socialImageDetails = {
  width: 1200,
  height: 630,
  alt: "Castlestone Technology — Custom software & AI for growing businesses",
}

// Pages that define their own social metadata must also specify their images;
// nested metadata replaces those fields inherited from the root layout.
export const SOCIAL_IMAGES = {
  openGraph: [{ url: SITE_CONFIG.ogImage, ...socialImageDetails }],
  twitter: [{ url: SITE_CONFIG.twitterImage, ...socialImageDetails }],
}

export const BRAND = {
  gold: "#c8a97e",
  goldLight: "#d9c09f",
  goldDark: "#b69468",
  white: "#ffffff",
  offWhite: "#fafaf8",
  charcoal: "#222222",
  gray: "#555555",
}

export const LEGAL_ENTITY = {
  en: "Investment and Ideas LLC, doing business as Castlestone Technology",
  es: "Investment and Ideas LLC, que opera como Castlestone Technology",
} as const

export const PRICING = {
  frontDesk: {
    basic: {
      name: "Basic",
      price: 1200,
      description: "8am-5pm, Mon-Fri",
      features: [
        "40 hours/week coverage",
        "Live video greeting",
        "Call forwarding",
        "Visitor logging",
        "Email support",
      ],
    },
    professional: {
      name: "Professional",
      price: 1800,
      description: "8am-7pm, Mon-Fri",
      features: [
        "55 hours/week coverage",
        "All Basic features",
        "Call transfer to staff",
        "Package management",
        "Priority support",
      ],
    },
    enterprise: {
      name: "Enterprise",
      price: 2500,
      description: "Custom hours",
      features: [
        "Custom coverage hours",
        "All Professional features",
        "Multiple locations",
        "Dedicated VA",
        "24/7 support",
      ],
    },
  },
  virtualAssistant: {
    personal: {
      name: "Personal",
      price: 1500,
      hours: 80,
    },
    business: {
      name: "Business",
      price: 2000,
      hours: 120,
    },
    specialized: {
      name: "Specialized",
      price: 2500,
      hours: 160,
    },
  },
}

export const VIRTUAL_ASSISTANT_ROLES = [
  {
    slug: "virtual-assistant",
    name: "Virtual Assistant (General)",
    icon: "LayoutDashboard",
    description:
      "Versatile professionals managing your calendar, email, data entry, travel coordination, and day-to-day administrative tasks.",
    skills: [
      "Calendar & inbox management",
      "Data entry & research",
      "Travel & expense coordination",
      "CRM updates",
      "Document preparation",
      "Customer follow-up",
    ],
  },
  {
    slug: "social-media-manager",
    name: "Social Media Manager",
    icon: "Share2",
    description:
      "Content creators and community managers who grow your brand across Instagram, LinkedIn, Facebook, TikTok, and X.",
    skills: [
      "Content calendar planning",
      "Caption writing",
      "Reel & post scheduling",
      "Community engagement",
      "Analytics reporting",
      "Influencer outreach",
    ],
  },
  {
    slug: "social-media-executive-assistant",
    name: "Social Media Executive Assistant",
    icon: "Star",
    description:
      "A hybrid role combining executive-level support with social media oversight — ideal for founders and executives who manage their personal brand.",
    skills: [
      "Executive calendar management",
      "Personal brand strategy support",
      "LinkedIn ghostwriting",
      "Brand voice consistency",
      "DM management",
      "Coordination with marketing teams",
    ],
  },
  {
    slug: "technology-manager",
    name: "Technology Manager / IT Coordinator",
    icon: "Cpu",
    description:
      "Remote tech coordinators who manage software subscriptions, onboard tools, liaise with vendors, and keep your tech stack running smoothly.",
    skills: [
      "SaaS subscription management",
      "IT vendor coordination",
      "Tool onboarding & documentation",
      "Basic troubleshooting triage",
      "Security audit support",
      "Internal tech documentation",
    ],
  },
  {
    slug: "website-manager",
    name: "Website Manager",
    icon: "Globe",
    description:
      "Dedicated website managers who handle content updates, SEO monitoring, plugin maintenance, and performance reporting for your site.",
    skills: [
      "WordPress / Webflow / Shopify updates",
      "Blog publishing & formatting",
      "SEO metadata updates",
      "Plugin & security updates",
      "Google Analytics reporting",
      "Landing page QA",
    ],
  },
  {
    slug: "human-resources-manager",
    name: "Human Resources Manager",
    icon: "Users",
    description:
      "Remote HR coordinators who streamline your hiring pipeline, onboarding, compliance tracking, and employee experience.",
    skills: [
      "Job posting & candidate screening",
      "Interview scheduling",
      "Onboarding documentation",
      "PTO & compliance tracking",
      "Employee handbook management",
      "Benefits coordination support",
    ],
  },
] as const

export const NAVIGATION = {
  main: [
    {
      name: "Services",
      items: [
        { name: "Virtual Front Desk", href: "/services/virtual-front-desk" },
        { name: "Virtual Assistants", href: "/services/virtual-assistant" },
      ],
    },
    { name: "Pricing", href: "/pricing" },
    { name: "Contact", href: "/contact" },
  ],
}
