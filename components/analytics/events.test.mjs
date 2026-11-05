import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import test from "node:test"
import vm from "node:vm"
import ts from "typescript"

const { outputText } = ts.transpileModule(
  readFileSync(new URL("./events.ts", import.meta.url), "utf8"),
  { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } },
)

function load(gaId, pathname = "/contact", server = false) {
  const events = []
  const exports = {}
  const window = { location: { pathname } }
  vm.runInNewContext(outputText, {
    exports,
    process: { env: { NEXT_PUBLIC_GA_ID: gaId } },
    ...(server ? {} : { window }),
    require(name) {
      assert.equal(name, "@next/third-parties/google")
      return { sendGAEvent: (...args) => events.push(JSON.parse(JSON.stringify(args))) }
    },
  })
  return { analytics: exports, events, window }
}

test("analytics is inert without a valid configured ID or outside the browser", () => {
  for (const gaId of [undefined, "", " ", "G-'invalid'"]) {
    const { analytics, events } = load(gaId)
    analytics.trackMarketingEvent({ name: "generate_lead", language: "en" })
    assert.equal(analytics.analyticsEnabled(), false)
    assert.equal(events.length, 0)
  }
  const { analytics, events } = load("G-TESTONLY", "/contact", true)
  assert.doesNotThrow(() => analytics.trackMarketingEvent({ name: "phone_click" }))
  assert.equal(events.length, 0)
})

test("every application route, descendant and localized variant rejects events", () => {
  const { analytics, events, window } = load("G-TESTONLY")
  for (const prefix of ["", "/es"]) {
    for (const route of ["portal", "va", "admin", "dashboard", "sign-in", "sign-up", "account-pending", "client-login", "api", "_next"]) {
      for (const suffix of ["", "/", "/nested"]) {
        window.location.pathname = `${prefix}/${route}${suffix}`
        assert.equal(analytics.isMarketingPath(window.location.pathname), false)
        analytics.trackMarketingEvent({ name: "phone_click" })
      }
    }
  }
  assert.equal(events.length, 0)
  for (const path of ["/", "/es", "/contact", "/es/contacto", "/book-demo", "/services/virtual-assistant", "/es/servicios/recepcion-virtual"]) {
    assert.equal(analytics.isMarketingPath(path), true)
  }
})

test("event parameters are allowlisted and use the current path after navigation", () => {
  const { analytics, events, window } = load(" G-TESTONLY ")
  analytics.trackMarketingEvent({ name: "generate_lead", language: "en", email: "private@example.test", nameValue: "Private", form: { message: "Private" } })
  window.location.pathname = "/es/contacto"
  analytics.trackMarketingEvent({ name: "generate_lead", language: "es" })
  analytics.trackMarketingEvent({ name: "book_demo_click", link_text: "Agende una consulta gratis" })
  analytics.trackMarketingEvent({ name: "phone_click", phone: "private" })
  window.location.pathname = "/book-demo"
  analytics.trackMarketingEvent({ name: "calendly_scheduled", payload: { invitee: "private" } })
  assert.deepEqual(events, [
    ["event", "generate_lead", { page_path: "/contact", language: "en" }],
    ["event", "generate_lead", { page_path: "/es/contacto", language: "es" }],
    ["event", "book_demo_click", { page_path: "/es/contacto", link_text: "Agende una consulta gratis" }],
    ["event", "phone_click", { page_path: "/es/contacto" }],
    ["event", "calendly_scheduled", { page_path: "/book-demo" }],
  ])
})
