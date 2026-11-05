import type { ContactFormStrings } from "@/content/types/contact-form"
import { contactFormLimits } from "@/lib/page-data/contact"

export function contactFormError(message: unknown, strings: ContactFormStrings): string {
  const translations = strings.apiErrorMessages
  const translated = typeof message === "string" && translations &&
    Object.prototype.hasOwnProperty.call(translations, message)
    ? translations[message]
    : strings.errorMessage
  const values: Record<string, string> = Object.fromEntries(
    Object.entries(contactFormLimits).map(([key, value]) => [
      `${key}Limit`, value.toLocaleString("en-US"),
    ]),
  )
  return translated.replace(/\{(\w+)\}/g, (placeholder, key: string) => values[key] ?? placeholder)
}
