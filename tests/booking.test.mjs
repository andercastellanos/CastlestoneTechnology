import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import test from "node:test"
import vm from "node:vm"
import ts from "typescript"

const { outputText } = ts.transpileModule(
  readFileSync(new URL("../lib/booking.ts", import.meta.url), "utf8"),
  { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } },
)

const shortUrl = "https://calendar.app.google/testBooking"
const scheduleUrl = "https://calendar.google.com/calendar/appointments/schedules/testSchedule"

function fixture(response) {
  const calls = []
  const exports = {}
  vm.runInNewContext(outputText, {
    exports,
    URL,
    AbortSignal,
    fetch: async (url, options) => {
      calls.push({ url, options })
      if (response instanceof Error) throw response
      return response
    },
  })
  return { resolve: exports.getGoogleBookingLinks, calls }
}

test("missing, invalid, and non-Google configuration leaves booking unconfigured", async () => {
  const { resolve, calls } = fixture()
  for (const value of [undefined, "", " ", "invalid", "http://calendar.app.google/test", "https://example.com/book", "https://calendar.google.com/", "https://calendar.google.com.evil.test/calendar/appointments/schedules/test", "https://user:password@calendar.app.google/test", "https://calendar.app.google:444/test"]) {
    assert.equal(await resolve(value), null)
  }
  assert.equal(calls.length, 0)
})

test("a full Google schedule embeds directly without requesting the short-link service", async () => {
  const { resolve, calls } = fixture()
  for (const value of [scheduleUrl, `${scheduleUrl}?gv=false#section`, ` ${scheduleUrl}?gv=true `]) {
    const links = await resolve(value)
    assert.equal(links.bookingUrl, scheduleUrl)
    assert.equal(links.embedUrl, `${scheduleUrl}?gv=true`)
  }
  const accountSchedule = scheduleUrl.replace("/calendar/", "/calendar/u/0/")
  assert.equal((await resolve(accountSchedule)).embedUrl, `${accountSchedule}?gv=true`)
  assert.equal(calls.length, 0)
})

test("a Google short link resolves to the full appointment embed and direct booking link", async () => {
  const { resolve, calls } = fixture(new Response(null, { status: 302, headers: { location: scheduleUrl } }))
  const links = await resolve(shortUrl)
  assert.equal(links.bookingUrl, scheduleUrl)
  assert.equal(links.embedUrl, `${scheduleUrl}?gv=true`)
  assert.equal(calls.length, 1)
  assert.equal(calls[0].url, shortUrl)
  assert.equal(calls[0].options.redirect, "manual")
  assert(calls[0].options.signal instanceof AbortSignal)
})

test("failed resolution keeps the public booking link usable without embedding an error page", async () => {
  for (const response of [new Error("network failure"), new DOMException("Timed out", "TimeoutError"), new Response(null, { status: 503 }), new Response(null, { status: 200 })]) {
    const { resolve } = fixture(response)
    const links = await resolve(shortUrl)
    assert.equal(links.bookingUrl, shortUrl)
    assert.equal(links.embedUrl, null)
  }
})

test("unexpected redirects are never followed or embedded", async () => {
  for (const location of ["https://example.com/booking", "https://accounts.google.com/", "http://calendar.google.com/calendar/appointments/schedules/test", "https://calendar.google.com/calendar/not-a-schedule"]) {
    const { resolve, calls } = fixture(new Response(null, { status: 302, headers: { location } }))
    const links = await resolve(shortUrl)
    assert.equal(links.bookingUrl, shortUrl)
    assert.equal(links.embedUrl, null)
    assert.equal(calls.length, 1)
  }
})
