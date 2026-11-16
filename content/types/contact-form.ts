import type { ContactServiceKey } from "@/lib/contact-services"

export type ContactFormStrings = {
  honeypotLabel: string
  nameLabel: string
  emailLabel: string
  companyLabel: string
  phoneLabel: string
  serviceLabel: string
  servicePlaceholder: string
  serviceOptions: Record<ContactServiceKey, string>
  messageLabel: string
  submittingLabel: string
  submitLabel: string
  successMessage: string
  errorMessage: string
  apiErrorMessages?: Record<string, string>
}
