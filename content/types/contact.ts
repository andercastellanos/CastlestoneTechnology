import type { ContactFormStrings } from "./contact-form"

export type ContactContent = {
  metadata_title: string
  metadata_description: string
  heading: string
  introduction: string
  emailLabel: string
  emailAddress: string
  phoneLabel: string
  locationLabel: string
  location: string
  form: ContactFormStrings
}
