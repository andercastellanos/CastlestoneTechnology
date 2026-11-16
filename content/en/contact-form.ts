import type { ContactFormStrings } from "@/content/types/contact-form"
import { contactServices } from "@/lib/contact-services"

export const contactFormStrings: ContactFormStrings = {
  honeypotLabel: "Leave this field empty",
  nameLabel: "Name",
  emailLabel: "Email",
  companyLabel: "Company (optional)",
  phoneLabel: "Phone (optional)",
  serviceLabel: "What do you need help with?",
  servicePlaceholder: "Select a service",
  serviceOptions: contactServices,
  messageLabel: "Message",
  submittingLabel: "Sending...",
  submitLabel: "Send Message",
  successMessage: "Message sent successfully.",
  errorMessage: "Unable to send message right now.",
}
