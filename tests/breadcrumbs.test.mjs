import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import test from "node:test"
import vm from "node:vm"
import ts from "typescript"

const cache = new Map()
function load(path) {
  if (cache.has(path)) return cache.get(path)
  const exports = {}
  cache.set(path, exports)
  vm.runInNewContext(ts.transpileModule(readFileSync(new URL("../" + path, import.meta.url), "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
  }).outputText, {
    exports,
    require(name) {
      if (name === "@/lib/constants") return { SITE_CONFIG: { url: "https://castlestonetechnology.com" } }
      return load(name.replace("@/", "") + ".ts")
    },
  })
  return exports
}
const { breadcrumbFor } = load("lib/page-data/breadcrumbs.ts")

test("breadcrumb trails use the correct hierarchy, locale and normalized canonical", () => {
  for (const [path, names] of [
    ["/blog/geo-vs-seo", ["Home", "Blog"]],
    ["/blog/how-to-start-a-business-in-florida", ["Home", "Blog"]],
    ["/es/blog/como-abrir-un-negocio-en-florida", ["Inicio", "Blog"]],
    ["/es/blog/cuanto-cuesta-una-pagina-web", ["Inicio", "Blog"]],
    ["/blog/web-design-miami", ["Home", "Services", "Web Design"]],
    ["/es/blog/diseno-web-palm-beach", ["Inicio", "Servicios", "Diseño web"]],
    ["/services", ["Home"]],
    ["/es/servicios", ["Inicio"]],
    ["/services/local-seo", ["Home", "Services"]],
    ["/es/servicios/seo-local", ["Inicio", "Servicios"]],
    ["/services/web-design", ["Home", "Services"]],
    ["/es/servicios/diseno-web", ["Inicio", "Servicios"]],
  ]) {
    const data = breadcrumbFor(path + "/?campaign=one#details")
    const items = Array.from(data.itemListElement)
    assert.deepEqual(items.slice(0, -1).map(item => item.name), names)
    assert.equal(items.at(-1).item, "https://castlestonetechnology.com" + path)
    assert.deepEqual(items.map(item => item.position), items.map((_, index) => index + 1))
    if (path.startsWith("/es/")) assert(items.every(item => item.item.startsWith("https://castlestonetechnology.com/es")))
  }
})

test("every city trail uses the localized web design parent and service hub", () => {
  const { webDesignCities } = load("lib/page-data/web-design-cities.ts")
  const { hrefForLocale } = load("lib/i18n.ts")
  for (const locale of ["en", "es"]) {
    for (const city of webDesignCities) {
      const path = hrefForLocale(city.path, locale)
      const name = locale === "es" && "esCity" in city ? city.esCity : city.city
      const items = Array.from(breadcrumbFor(path).itemListElement)
      assert.deepEqual(items.map(item => item.name), locale === "es"
        ? ["Inicio", "Servicios", "Diseño web", `Diseño web en ${name}`]
        : ["Home", "Services", "Web Design", `Web Design in ${name}`])
      assert.deepEqual(items.map(item => item.item), [
        locale === "es" ? "https://castlestonetechnology.com/es" : "https://castlestonetechnology.com",
        locale === "es" ? "https://castlestonetechnology.com/es/servicios" : "https://castlestonetechnology.com/services",
        locale === "es" ? "https://castlestonetechnology.com/es/servicios/diseno-web" : "https://castlestonetechnology.com/services/web-design",
        `https://castlestonetechnology.com${path}`,
      ])
      assert.deepEqual(items.map(item => item.position), [1, 2, 3, 4])
    }
  }
})

test("non-target pages receive no breadcrumb and service trails use canonical service hubs", () => {
  for (const path of ["/", "/es", "/blog", "/es/blog", "/book-demo", "/pricing", "/privacy", "/unknown"]) assert.equal(breadcrumbFor(path), null)
  assert.equal(breadcrumbFor("/services/ai-receptionist").itemListElement.length, 3)
  assert.equal(breadcrumbFor("/es/servicios/recepcionista-virtual-ia").itemListElement.length, 3)
})

test("About routes share a Home to About trail with the canonical About URL", () => {
  for (const path of ["/company/about", "/about", "/company/about/?campaign=one#details"]) {
    const data = breadcrumbFor(path)
    assert.equal(data["@id"], "https://castlestonetechnology.com/company/about#breadcrumb")
    assert.deepEqual(Array.from(data.itemListElement, item => ({ name: item.name, item: item.item, position: item.position })), [
      { name: "Home", item: "https://castlestonetechnology.com", position: 1 },
      { name: "About", item: "https://castlestonetechnology.com/company/about", position: 2 },
    ])
  }
})

test("the Spanish About page has a localized trail and canonical URL", () => {
  for (const path of ["/es/nosotros", "/es/nosotros/?campaign=one#details"]) {
    const data = breadcrumbFor(path)
    assert.equal(data["@id"], "https://castlestonetechnology.com/es/nosotros#breadcrumb")
    assert.deepEqual(Array.from(data.itemListElement, item => ({ name: item.name, item: item.item, position: item.position })), [
      { name: "Inicio", item: "https://castlestonetechnology.com/es", position: 1 },
      { name: "Nosotros", item: "https://castlestonetechnology.com/es/nosotros", position: 2 },
    ])
  }
})
