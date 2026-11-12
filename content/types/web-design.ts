export type WebDesignText = readonly (string | { text: string; href: string })[]

export type WebDesignContent = {
  path: string
  metadata_title: string
  metadata_description: string
  eyebrow: string
  heading: string
  introduction: string
  primaryCta: string
  secondaryCta: string
  websites: {
    heading: string
    introduction: string
    items: readonly { title: string; description: string }[]
  }
  included: {
    heading: string
    items: readonly { title: string; description: string }[]
  }
  connected: {
    heading: string
    description: WebDesignText
  }
  pricing: {
    heading: string
    introduction: string
    factorsHeading: string
    factors: readonly string[]
    closing: WebDesignText
  }
  process: {
    heading: string
    steps: readonly { title: string; description: string }[]
  }
  cities: {
    heading: string
    introduction: string
  }
  faq: {
    heading: string
    items: readonly { question: string; answer: WebDesignText }[]
  }
  final: {
    heading: string
    description: string
    contactLabel: string
  }
}
