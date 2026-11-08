export type OnlinePresenceContent = {
  path: string
  metadata_title: string
  metadata_description: string
  eyebrow: string
  heading: string
  introduction: string
  primaryCta: string
  setupHeading: string
  setupIntroduction: string
  setupItems: readonly { title: string; description: string }[]
  processHeading: string
  processSteps: readonly { title: string; description: string }[]
  ownershipHeading: string
  ownershipDescription: string
  audienceHeading: string
  audienceIntroduction: string
  audienceItems: readonly string[]
  faqHeading: string
  faqItems: readonly { question: string; answer: string }[]
  finalHeading: string
  finalDescription: string
  nextStepDescription: string
  nextStepLabel: string
}

export const onlinePresenceContent: OnlinePresenceContent = {
  path: "/services/online-presence-setup",
  metadata_title: "Online Presence Setup for Small Businesses",
  metadata_description: "Online presence setup for new or newly online businesses: social accounts connected to your website, Google visibility, and email on your domain. Request a quote.",
  eyebrow: "A starting point for your business online",
  heading: "Online Presence Setup",
  introduction: "Online presence setup helps new or newly online small businesses bring their website, social accounts, Google presence, and business email together. Start with a free consultation so we can understand what you already have and provide a written quote for the setup you need.",
  primaryCta: "Book a free setup consultation",
  setupHeading: "What we set up",
  setupIntroduction: "The service focuses on the essentials that connect your business with people looking for it online.",
  setupItems: [
    { title: "Social accounts connected to your website", description: "Bring your business social media accounts and website together, so visitors can move between your site and the profiles that represent your business. We discuss your existing accounts and the connections you need during the consultation." },
    { title: "Your business presence on Google", description: "Help people find clear information about your business on Google and reach your website. We review the starting point for your business and define the setup in the written quote. Setup does not promise a particular search position or a volume of inquiries." },
    { title: "Professional email on your domain", description: "Use a business email address connected to your own domain. Bring your current website, domain, and email details to the consultation so the quote reflects what needs to be set up." },
  ],
  processHeading: "How it works",
  processSteps: [
    { title: "Discovery call", description: "Tell us about your business and the website, accounts, domain, and email you already use. We discuss which parts of your online presence need to be set up." },
    { title: "Written quote", description: "Review a written quote based on the setup discussed during your free consultation. The quote defines the work before setup begins." },
    { title: "Setup", description: "We carry out the agreed setup for your social accounts and website connections, Google presence, and professional business email." },
    { title: "Handover", description: "Review the completed setup and access to the business accounts included in your quote. Your business keeps control of its domain and accounts." },
  ],
  ownershipHeading: "Your business, your accounts",
  ownershipDescription: "Your domain and business accounts remain yours. During the consultation, we review existing access and define what is included in the handover. The written quote records the agreed setup, so you know which items your business will receive.",
  audienceHeading: "Who it is for",
  audienceIntroduction: "This service is for small businesses starting their online presence or bringing existing pieces together.",
  audienceItems: [
    "New businesses preparing their website, social accounts, and business email",
    "Established businesses going online for the first time",
    "Businesses with a website that still need connected social accounts, a Google presence, or email on their own domain",
  ],
  faqHeading: "Questions about getting started",
  faqItems: [
    { question: "What does Online Presence Setup cover?", answer: "The service covers social media accounts connected to your website, helping your business show up on Google, and professional business email on your own domain. Your free consultation and written quote define the setup for your business." },
    { question: "How much does it cost?", answer: "Start with a free consultation. We discuss what your business needs and provide a written quote for the agreed setup." },
    { question: "Is this for a business that is already operating?", answer: "Yes. It is for new businesses and businesses that are newly going online. We review the website, accounts, domain, and email you already have during the consultation." },
    { question: "Who owns the domain and business accounts?", answer: "Your domain and business accounts remain yours. We review access and define the setup and handover in the written quote." },
    { question: "What should I bring to the consultation?", answer: "Bring your business details and information about your existing website, social accounts, domain, and email. These give us a starting point for the written setup quote." },
  ],
  finalHeading: "Bring your online presence together",
  finalDescription: "Tell us where your business is starting. Begin with a free consultation and a written quote for the setup you need.",
  nextStepDescription: "After setup, discuss ongoing local visibility with our",
  nextStepLabel: "local SEO services",
}
