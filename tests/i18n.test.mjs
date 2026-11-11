import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import test from "node:test"
import vm from "node:vm"
import ts from "typescript"

const source = readFileSync(new URL("../lib/i18n.ts", import.meta.url), "utf8")
const { outputText } = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
})
const i18n = {}
vm.runInNewContext(outputText, {
  exports: i18n,
  require(name) {
    assert.equal(name, "@/lib/constants")
    return { SITE_CONFIG: { url: "https://castlestonetechnology.com///" } }
  },
})

test("the route map covers the paired English pages without duplicate URLs", () => {
  assert.deepEqual(Array.from(i18n.routeMap, pair => pair.en), [
    "/", "/contact", "/services/virtual-front-desk", "/services/virtual-assistant",
    "/services/technology-solutions", "/services/marketing-automation",
    "/services/ai-receptionist",
    "/services/local-seo",
    "/blog/web-design-miami",
    "/book-demo",
    "/pricing",
    "/services/online-presence-setup",
    "/blog/web-design-orlando",
    "/blog/web-design-fort-lauderdale",
    "/blog/web-design-palm-beach",
    "/blog/how-much-does-a-website-cost",
    "/blog/how-do-ai-receptionists-work",
    "/blog/ai-receptionist-vs-answering-service",
    "/blog",
    "/services",
    "/company/about",
  ])
  const urls = Array.from(i18n.routeMap).flatMap(pair => [pair.en, pair.es])
  assert.equal(new Set(urls).size, i18n.routeMap.length * 2)
})

test("every mapped page switches in both directions, including normalized URLs", () => {
  for (const pair of i18n.routeMap) {
    for (const suffix of ["", "/", "///?campaign=one#form", "#form?ignored=yes"]) {
      assert.equal(i18n.twinOf(`${pair.en}${suffix}`), pair.es)
      assert.equal(i18n.twinOf(`${pair.es}${suffix}`), pair.en)
      for (const locale of ["en", "es"]) {
        assert.equal(i18n.switcherHref(`${pair.en}${suffix}`, locale), pair[locale])
        assert.equal(i18n.switcherHref(`${pair.es}${suffix}`, locale), pair[locale])
      }
    }
  }
})

test("unpaired pages use home-page switcher fallbacks and have no invented twins", () => {
  for (const path of ["/pricing", "/book-demo", "/blog", "/privacy", "/terms", "/client-login", "/unknown"]) {
    if (i18n.twinOf(path)) continue
    assert.equal(i18n.twinOf(`${path}/?from=nav#top`), null)
    assert.equal(i18n.switcherHref(path, "en"), i18n.routeMap[0].en)
    assert.equal(i18n.switcherHref(path, "es"), i18n.routeMap[0].es)
  }
})

test("paired alternates are reciprocal and x-default always points to the English page", () => {
  const absolute = path => `https://castlestonetechnology.com${path === "/" ? "" : path}`
  for (const pair of i18n.routeMap) {
    for (const path of [pair.en, pair.es]) {
      const alternates = i18n.alternatesFor(`${path}///?source=test#content`)
      assert.equal(alternates.canonical, absolute(path))
      assert.deepEqual(Object.keys(alternates.languages), ["en-US", "es-US", "x-default"])
      assert.equal(alternates.languages["en-US"], absolute(pair.en))
      assert.equal(alternates.languages["es-US"], absolute(pair.es))
      assert.equal(alternates.languages["x-default"], absolute(pair.en))
    }
  }
})

test("unpaired alternates contain only their normalized canonical", () => {
  const alternates = i18n.alternatesFor("/privacy///?plan=va#plans")
  assert.deepEqual(Object.keys(alternates), ["canonical"])
  assert.equal(alternates.canonical, "https://castlestonetechnology.com/privacy")
})

test("localized internal links preserve queries and anchors without changing unpaired or external URLs", () => {
  for (const pair of i18n.routeMap) {
    for (const suffix of ["", "?campaign=one#details", "#details"]) {
      assert.equal(i18n.hrefForLocale(pair.en + suffix, "es"), pair.es + suffix)
      assert.equal(i18n.hrefForLocale(pair.en + suffix, "en"), pair.en + suffix)
      assert.equal(i18n.hrefForLocale(pair.es + suffix, "es"), pair.es + suffix)
    }
    if (pair.en !== "/") assert.equal(i18n.hrefForLocale(pair.en + "/?from=card#details", "es"), pair.es + "?from=card#details")
  }
  for (const href of ["/book-demo", "/pricing?plan=one#plans", "/services/virtual-assistant/general", "#how-it-works", "mailto:hello@example.com", "https://example.com/contact", "//example.com/contact"]) {
    if (i18n.twinOf(href)) continue
    assert.equal(i18n.hrefForLocale(href, "es"), href)
    assert.equal(i18n.hrefForLocale(href, "en"), href)
  }
})

test("the sitemap includes both About pages with reciprocal alternates and monthly priority 0.7", () => {
  const sitemap = {}
  vm.runInNewContext(ts.transpileModule(readFileSync(new URL("../app/sitemap.ts", import.meta.url), "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
  }).outputText, {
    exports: sitemap,
    require(name) {
      if (name === "@/lib/constants") return { SITE_CONFIG: { url: "https://castlestonetechnology.com" } }
      assert.equal(name, "@/lib/i18n")
      return i18n
    },
    URL,
  })
  const entries = Array.from(sitemap.default()).filter(entry => ["/company/about", "/es/nosotros"].includes(new URL(entry.url).pathname))
  assert.equal(entries.length, 2)
  for (const path of ["/company/about", "/es/nosotros"]) {
    const entry = entries.find(entry => new URL(entry.url).pathname === path)
    assert.equal(entry.changeFrequency, "monthly")
    assert.equal(entry.priority, 0.7)
    assert.equal(entry.alternates.languages["en-US"], "https://castlestonetechnology.com/company/about")
    assert.equal(entry.alternates.languages["es-US"], "https://castlestonetechnology.com/es/nosotros")
    assert.equal(entry.alternates.languages["x-default"], "https://castlestonetechnology.com/company/about")
  }
})
