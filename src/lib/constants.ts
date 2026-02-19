export const SITE_CONFIG = {
  name: "Castlestone Technology",
  description: "Elite virtual assistants and AI-powered reception from Latin America. Save 60% on staffing costs.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://castlestonetechnology.com",
  ogImage: "/og-image.png",
  links: {
    twitter: "https://twitter.com/castlestonetech",
    linkedin: "https://linkedin.com/company/castlestone-technology",
  },
  contact: {
    email: "hello@castlestonetechnology.com",
    phone: "+1 (305) XXX-XXXX",
  },
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
      features: [
        "80 hours/month",
        "Calendar management",
        "Email management",
        "Personal errands",
        "Travel booking",
      ],
    },
    business: {
      name: "Business",
      price: 2000,
      hours: 120,
      features: [
        "120 hours/month",
        "All Personal features",
        "Client communications",
        "CRM management",
        "Meeting coordination",
      ],
    },
    specialized: {
      name: "Specialized",
      price: 2500,
      hours: 160,
      features: [
        "160 hours/month",
        "All Business features",
        "Bookkeeping",
        "Social media management",
        "Sales support",
      ],
    },
  },
}

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
