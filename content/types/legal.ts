export type LegalLink = { href: string; label: string; external?: boolean }
export type LegalSegment = string | LegalLink
export type LegalSection = { heading: string; paragraphs: LegalSegment[][] }

export type LegalContent = {
  metadata_title: string
  metadata_description: string
  heading: string
  lastUpdated: string
  sections: LegalSection[]
}
