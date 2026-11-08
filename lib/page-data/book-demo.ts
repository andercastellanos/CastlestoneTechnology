// Preserve the consultation duration and response wording of the existing page.
const consultationMinutes = "30"
const responseBusinessDays = "1"

export const bookDemoNumbers = {
  metadata_description: [consultationMinutes],
  introduction: [consultationMinutes],
  trustResponse: [responseBusinessDays],
} as const
