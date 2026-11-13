import { blogPostContent as websiteCost } from "@/content/es/blog-website-cost"
import { blogPostContent as businessFlorida } from "@/content/es/blog-business-florida"
import { blogPostContent as aiWork } from "@/content/es/blog-ai-work"
import { blogPostContent as aiComparison } from "@/content/es/blog-ai-comparison"
import { blogPostContent as smsPlatforms } from "@/content/es/blog-sms-platforms"
import { blogPostContent as wordpressWix } from "@/content/es/blog-wordpress-wix"
import { blogPostContent as showUpOnGoogle } from "@/content/es/blog-show-up-on-google"
import { blogPostContent as emailMarketing } from "@/content/es/blog-email-marketing"
import { blogPostContent as geoVsSeo } from "@/content/es/blog-geo-vs-seo"
import { blogPostContent as aiWebsite } from "@/content/es/blog-ai-website"
import { blogPostContent as seoWorthIt } from "@/content/es/blog-seo-worth-it"
import { webDesignMiamiContent } from "@/content/es/web-design-miami"
import { webDesignOrlandoContent } from "@/content/es/web-design-orlando"
import { webDesignFortLauderdaleContent } from "@/content/es/web-design-fort-lauderdale"
import { webDesignPalmBeachContent } from "@/content/es/web-design-palm-beach"

export const blogContent = {
  path: "/es/blog",
  title: "Blog de Castlestone",
  description: "Guías para evaluar sitios web y atención de llamadas con IA, y páginas de diseño web para Miami, Orlando, Fort Lauderdale, West Palm Beach y Boca Raton.",
  heading: "Blog de Castlestone",
  introduction: "En el blog de Castlestone encontrará guías para evaluar las herramientas de su negocio y páginas para planificar su sitio web según lo que necesita.",
  readLabel: "Lea la guía",
  cityLabel: "Conozca el servicio de diseño web",
  cityCategory: "Diseño web por ciudad",
  author: "Por el equipo de Castlestone",
  articleLabel: "Contenido del artículo",
  relatedServices: "Servicios relacionados",
  miamiLabel: "Diseño web en Miami",
  contactLabel: "Consulte con nuestro equipo",
  sourceLabel: "Fuente:",
}

export const spanishBlogEntries = [
  ...[businessFlorida, seoWorthIt, aiWebsite, geoVsSeo, emailMarketing, showUpOnGoogle, wordpressWix, smsPlatforms, websiteCost, aiWork, aiComparison].map((post) => ({ path: post.path, title: post.title, description: post.description, category: post.category, kind: "article" as const })),
  ...[webDesignMiamiContent, webDesignOrlandoContent, webDesignFortLauderdaleContent, webDesignPalmBeachContent].map((city) => ({ path: city.path, title: city.heading, description: city.metadata_description, category: blogContent.cityCategory, kind: "city" as const })),
]
