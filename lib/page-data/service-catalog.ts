import type { Locale } from "@/lib/i18n"
import { hrefForLocale } from "@/lib/i18n"
import { resolveContent } from "@/lib/content"
import { virtualFrontDeskNumbers } from "@/lib/page-data/virtual-front-desk"
import { blogNavigationContent as labelsEn } from "@/content/en/blog-navigation"
import { blogNavigationContent as labelsEs } from "@/content/es/blog-navigation"
import { technologySolutionsContent as technologySolutionsContenten } from "@/content/en/technology-solutions"
import { technologySolutionsContent as technologySolutionsContentes } from "@/content/es/technology-solutions"
import { aiReceptionistContent as aiReceptionistContenten } from "@/content/en/ai-receptionist"
import { aiReceptionistContent as aiReceptionistContentes } from "@/content/es/ai-receptionist"
import { marketingAutomationContent as marketingAutomationContenten } from "@/content/en/marketing-automation"
import { marketingAutomationContent as marketingAutomationContentes } from "@/content/es/marketing-automation"
import { localSeoContent as localSeoContenten } from "@/content/en/local-seo"
import { localSeoContent as localSeoContentes } from "@/content/es/local-seo"
import { onlinePresenceContent as onlinePresenceContenten } from "@/content/en/online-presence"
import { onlinePresenceContent as onlinePresenceContentes } from "@/content/es/online-presence"
import { virtualAssistantContent as virtualAssistantContenten } from "@/content/en/virtual-assistant"
import { virtualAssistantContent as virtualAssistantContentes } from "@/content/es/virtual-assistant"
import { virtualFrontDeskContent as virtualFrontDeskContenten } from "@/content/en/virtual-front-desk"
import { virtualFrontDeskContent as virtualFrontDeskContentes } from "@/content/es/virtual-front-desk"

export const serviceCatalog = [
  { path: "/services/technology-solutions", group: "software", inDevelopment: false, descriptions: { en: technologySolutionsContenten.metadata_description, es: technologySolutionsContentes.metadata_description } },
  { path: "/services/ai-receptionist", group: "ai", inDevelopment: false, descriptions: { en: aiReceptionistContenten.description, es: aiReceptionistContentes.description } },
  { path: "/services/marketing-automation", group: "marketing", inDevelopment: false, descriptions: { en: marketingAutomationContenten.description, es: marketingAutomationContentes.description } },
  { path: "/services/local-seo", group: "marketing", inDevelopment: false, descriptions: { en: localSeoContenten.description, es: localSeoContentes.description } },
  { path: "/services/online-presence-setup", group: "marketing", inDevelopment: false, descriptions: { en: onlinePresenceContenten.metadata_description, es: onlinePresenceContentes.metadata_description } },
  { path: "/services/virtual-assistant", group: "staffing", inDevelopment: false, descriptions: { en: virtualAssistantContenten.metadata_description, es: virtualAssistantContentes.metadata_description } },
  { path: "/services/virtual-front-desk", group: "staffing", inDevelopment: true, descriptions: { en: resolveContent(virtualFrontDeskContenten, virtualFrontDeskNumbers).metadata_description.split(". ").slice(0, 2).join(". ") + ".", es: resolveContent(virtualFrontDeskContentes, virtualFrontDeskNumbers).metadata_description } },
] as const

export function servicesFor(locale: Locale) {
  const labels = locale === "es" ? labelsEs : labelsEn
  return serviceCatalog.map((service) => ({ ...service, href: hrefForLocale(service.path, locale), name: labels.serviceTitles[service.path], description: service.descriptions[locale] }))
}
