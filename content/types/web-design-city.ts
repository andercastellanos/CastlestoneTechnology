export type WebDesignCityContent = {
  path: string
  city: string
  region: string
  areasServed?: readonly { city: string; region: string }[]
  citySections?: readonly { heading: string; description: string }[]
  metadata_title: string
  metadata_description: string
  eyebrow: string
  heading: string
  introduction: string
  primaryCta: string
  projectCta: string
  project: {
    url: string
    eyebrow: string
    heading: string
    description: string
    featuresHeading: string
    features: readonly string[]
    linkLabel: string
  }
  industries: {
    heading: string
    introduction: string
    items: readonly { title: string; description: string }[]
  }
  pricing: {
    heading: string
    introduction: string
    factorsHeading: string
    factors: readonly string[]
    closing: string
  }
  process: {
    heading: string
    introduction: string
    steps: readonly { title: string; description: string }[]
  }
  faq: {
    heading: string
    items: readonly { question: string; answer: string }[]
  }
  final: {
    heading: string
    description: string
    contactLabel: string
  }
  related: {
    heading: string
    introduction: string
    websites: string
    receptionist: string
    marketing: string
  }
}
