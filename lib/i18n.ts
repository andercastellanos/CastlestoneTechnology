import { SITE_CONFIG } from "@/lib/constants"

export type Locale = "en" | "es"

export const routeMap = [
  { en: "/", es: "/es" },
  { en: "/contact", es: "/es/contacto" },
  { en: "/services/virtual-front-desk", es: "/es/servicios/recepcion-virtual" },
  { en: "/services/virtual-assistant", es: "/es/servicios/asistentes-virtuales" },
  { en: "/services/technology-solutions", es: "/es/servicios/desarrollo-de-software" },
  { en: "/services/marketing-automation", es: "/es/servicios/marketing-por-sms" },
  { en: "/services/ai-receptionist", es: "/es/servicios/recepcionista-virtual-ia" },
  { en: "/services/local-seo", es: "/es/servicios/seo-local" },
  { en: "/blog/web-design-miami", es: "/es/blog/diseno-web-miami" },
  { en: "/book-demo", es: "/es/agendar-consulta" },
  { en: "/pricing", es: "/es/precios" },
  { en: "/services/online-presence-setup", es: "/es/servicios/presencia-en-linea" },
  { en: "/blog/web-design-orlando", es: "/es/blog/diseno-web-orlando" },
  { en: "/blog/web-design-fort-lauderdale", es: "/es/blog/diseno-web-fort-lauderdale" },
  { en: "/blog/web-design-palm-beach", es: "/es/blog/diseno-web-palm-beach" },
  { en: "/blog/how-much-does-a-website-cost", es: "/es/blog/cuanto-cuesta-una-pagina-web" },
  { en: "/blog/how-do-ai-receptionists-work", es: "/es/blog/como-funciona-una-recepcionista-virtual-con-ia" },
  { en: "/blog/ai-receptionist-vs-answering-service", es: "/es/blog/recepcionista-con-ia-vs-servicio-de-contestador" },
  { en: "/blog", es: "/es/blog" },
  { en: "/services", es: "/es/servicios" },
  { en: "/company/about", es: "/es/nosotros" },
  { en: "/services/web-design", es: "/es/servicios/diseno-web" },
  { en: "/blog/how-to-start-a-business-in-florida", es: "/es/blog/como-abrir-un-negocio-en-florida" },
  { en: "/services/ai-outbound-calling", es: "/es/servicios/llamadas-salientes-con-ia" },
  { en: "/blog/sms-marketing-platforms-vs-done-for-you", es: "/es/blog/marketing-por-sms-plataforma-o-servicio-gestionado" },
  { en: "/blog/wordpress-vs-wix-vs-custom-website", es: "/es/blog/wordpress-vs-wix-vs-pagina-web-a-medida" },
  { en: "/blog/how-to-make-your-website-show-up-on-google", es: "/es/blog/como-hacer-que-mi-pagina-web-aparezca-en-google" },
  { en: "/blog/email-marketing-for-small-business", es: "/es/blog/email-marketing-para-pequenas-empresas" },
  { en: "/blog/geo-vs-seo", es: "/es/blog/geo-vs-seo" },
  { en: "/blog/can-ai-build-a-website", es: "/es/blog/puede-la-ia-crear-una-pagina-web" },
  { en: "/blog/is-seo-worth-it-for-small-business", es: "/es/blog/vale-la-pena-el-seo-para-pequenas-empresas" },
] as const satisfies readonly Record<Locale, string>[]

function normalizePath(path: string): string {
  return path.split(/[?#]/, 1)[0].replace(/\/+$/, "") || "/"
}

function pairFor(path: string) {
  const normalized = normalizePath(path)
  return routeMap.find((pair) => pair.en === normalized || pair.es === normalized)
}

export function twinOf(path: string): string | null {
  const pair = pairFor(path)
  if (!pair) return null
  return normalizePath(path) === pair.en ? pair.es : pair.en
}

export function switcherHref(path: string, target: Locale): string {
  const pair = pairFor(path)
  return pair ? pair[target] : routeMap[0][target]
}

type PageAlternates = {
  canonical: string
  languages?: {
    "en-US": string
    "es-US": string
    "x-default": string
  }
}

export function alternatesFor(path: string): PageAlternates {
  const baseUrl = SITE_CONFIG.url.replace(/\/+$/, "")
  const absolute = (pathname: string) => `${baseUrl}${pathname === "/" ? "" : pathname}`
  const canonical = absolute(normalizePath(path))
  const pair = pairFor(path)

  if (!pair) return { canonical }

  return {
    canonical,
    languages: {
      "en-US": absolute(pair.en),
      "es-US": absolute(pair.es),
      "x-default": absolute(pair.en),
    },
  }
}

/** Localize paired internal links while preserving anchors, queries and unpaired URLs. */
export function hrefForLocale(href: string, locale: Locale): string {
  if (locale === "en" || !href.startsWith("/") || href.startsWith("//")) return href
  const pair = pairFor(href)
  if (!pair) return href
  const suffixAt = href.search(/[?#]/)
  return pair[locale] + (suffixAt < 0 ? "" : href.slice(suffixAt))
}
