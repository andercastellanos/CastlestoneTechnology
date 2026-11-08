import { blogNavigationContent as en } from "@/content/en/blog-navigation"
import { blogNavigationContent as es } from "@/content/es/blog-navigation"
import { alternatesFor, hrefForLocale, routeMap } from "@/lib/i18n"
import { relatedPosts } from "@/lib/page-data/related-posts"
import { webDesignCities } from "@/lib/page-data/web-design-cities"

export function breadcrumbFor(pathname: string) {
  const path = pathname.split(/[?#]/, 1)[0].replace(/\/+$/, "") || "/"
  const locale = path.startsWith("/es/") ? "es" : "en"
  const copy = locale === "es" ? es : en
  const post = relatedPosts.find((entry) => entry.path === path)
  const city = webDesignCities.find((entry) => entry.path === path || hrefForLocale(entry.path, "es") === path)
  const servicePath = routeMap.find((pair) => pair.es === path)?.en ?? path
  const serviceName = copy.serviceTitles[servicePath]
  if (!post && !city && !serviceName) return null

  const canonical = alternatesFor(path).canonical
  const home = alternatesFor(locale === "es" ? "/es" : "/").canonical
  const trail = [{ name: copy.home, item: home }]
  let title: string
  if (post) {
    trail.push({ name: copy.blog, item: alternatesFor(locale === "es" ? "/es/blog" : "/blog").canonical })
    title = post.title
  } else if (city) {
    const name = locale === "es" && "esCity" in city ? city.esCity : city.city
    title = `${copy.cityPrefix} ${name}`
  } else {
    title = serviceName
  }
  trail.push({ name: title, item: canonical })
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${canonical}#breadcrumb`,
    itemListElement: trail.map((item, index) => ({ "@type": "ListItem", position: index + 1, ...item })),
  }
}
