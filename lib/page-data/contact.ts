// Existing browser validation limits, shared with localized API-error messages.
export const contactFormLimits = {
  name: 120,
  email: 254,
  company: 200,
  phone: 40,
  message: 10000,
} as const
