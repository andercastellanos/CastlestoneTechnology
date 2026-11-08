// Only approved, published city pages belong here, with both page routes
// registered in lib/i18n.ts. A local project is not required for an approved page.
export const webDesignCities = [
  { city: "Miami", path: "/blog/web-design-miami" },
  { city: "Orlando", path: "/blog/web-design-orlando" },
  { city: "Fort Lauderdale", path: "/blog/web-design-fort-lauderdale" },
  { city: "West Palm Beach & Boca Raton", esCity: "West Palm Beach y Boca Raton", path: "/blog/web-design-palm-beach" },
] as const

export const palmBeachAreas = [
  { city: "West Palm Beach", region: "FL" },
  { city: "Boca Raton", region: "FL" },
] as const
