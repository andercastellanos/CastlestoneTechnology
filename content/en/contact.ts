import { contactFormStrings } from "./contact-form"
import type { ContactContent } from "@/content/types/contact"
import { formatContactAddress, SITE_CONFIG } from "@/lib/constants"

export const contactContent: ContactContent = {
  "metadata_title": "Contact Us",
  "metadata_description": "Questions about custom software, AI, or virtual support teams? Send us a message and we'll get back to you.",
  "heading": "Get in Touch",
  "introduction": "Tell us what you want to build or improve, from custom software and AI to your website, marketing or support team. We'll reply with next steps and, when it helps, a free consultation.",
  "messageGuidance": "To help us reply with useful next steps, include what your business does, what you need help with, any tools or systems you already use, and your timeline.",
  "emailLabel": "Email",
  "emailAddress": SITE_CONFIG.contact.email,
  "phoneLabel": "Phone",
  "locationLabel": "Location",
  "location": formatContactAddress(),
  form: contactFormStrings
}
