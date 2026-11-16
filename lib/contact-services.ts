// Options for the contact form's "What do you need help with?" field, in the same order and
// with the same names as the header Services menu.
// Keys are what the form submits; the English labels are what the notification email shows.
export const contactServices = {
  "virtual-front-desk": "Virtual Front Desk",
  "virtual-assistants": "Virtual Assistants",
  "technology-solutions": "Technology Solutions",
  "sms-email-marketing": "SMS & Email Marketing",
  "web-design": "Web Design",
  "ai-receptionist": "AI Receptionist",
  "ai-outbound-calling": "AI Outbound Calling",
  "local-seo": "Local SEO",
  "online-presence-setup": "Online Presence Setup",
  other: "Something else",
} as const

export type ContactServiceKey = keyof typeof contactServices

export const contactServiceKeys = Object.keys(contactServices) as [ContactServiceKey, ...ContactServiceKey[]]
