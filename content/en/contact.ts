import { contactFormStrings } from "./contact-form"
import type { ContactContent } from "@/content/types/contact"
import { formatContactAddress, SITE_CONFIG } from "@/lib/constants"

export const contactContent: ContactContent = {
  "metadata_title": "Contact Us",
  "metadata_description": "Questions about custom software, AI, or virtual support teams? Send us a message and we'll get back to you.",
  "heading": "Get in Touch",
  "introduction": "Tell us about your goals and we will recommend the right virtual support plan for your business.",
  "emailLabel": "Email",
  "emailAddress": SITE_CONFIG.contact.email,
  "phoneLabel": "Phone",
  "locationLabel": "Location",
  "location": formatContactAddress(),
  form: contactFormStrings
}
