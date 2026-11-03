import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import test from "node:test"
import vm from "node:vm"
import ts from "typescript"
import { z } from "zod"

const valid = {
  name: "  Alex Rivera  ",
  email: "  alex@example.test  ",
  company: "  Example Team  ",
  message: "  Please help us plan our next project.  ",
  source_page: "/book-demo",
  website: "",
}
const emailConfig = {
  RESEND_API_KEY: "test-key",
  CONTACT_NOTIFY_EMAIL: "team@example.test",
  CONTACT_FROM_EMAIL: "Notifications <notifications@castlestonetechnology.com>",
}

function fixture(options = {}) {
  const writes = []
  const notifications = []
  const logs = []
  const events = []
  let saveStarted
  const started = new Promise(resolve => { saveStarted = resolve })
  const source = readFileSync(new URL("../app/api/contact/route.ts", import.meta.url), "utf8")
  const { outputText } = ts.transpileModule(source, {
    fileName: "route.ts",
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  })
  const exports = {}
  const dependencies = {
    "zod": { z },
    "next/server": { NextResponse: { json: (data, init) => Response.json(data, init) } },
    "@/lib/supabase/server": {
      createServerSupabaseClient() {
        if (options.clientError) throw new Error("Missing configuration")
        return {
          from(table) {
            assert.equal(table, "contact_submissions")
            return {
              insert(row) {
                writes.push(row)
                return {
                  select(columns) {
                    assert.equal(columns, "id")
                    return {
                      async single() {
                        events.push("save-started")
                        saveStarted()
                        if (options.saveGate) await options.saveGate
                        if (options.saveThrows) throw new Error("Database unavailable")
                        if (options.saveError) return { data: null, error: { code: "42P01", message: "Internal database details" } }
                        if (options.noReceipt) return { data: null, error: null }
                        events.push("saved")
                        return { data: { id: "submission-1" }, error: null }
                      },
                    }
                  },
                }
              },
            }
          },
        }
      },
    },
  }
  vm.runInNewContext(outputText, {
    exports,
    require(name) {
      assert.ok(Object.hasOwn(dependencies, name), `Unexpected import: ${name}`)
      return dependencies[name]
    },
    AbortSignal,
    process: { env: options.env ?? {} },
    console: { error: (...args) => logs.push(args) },
    async fetch(url, init) {
      assert.ok(events.includes("saved"), "Email must follow confirmed database storage")
      notifications.push({ url, init, body: JSON.parse(init.body) })
      events.push("email")
      if (options.emailThrows) throw new Error("Email timeout")
      return new Response(null, { status: options.emailStatus ?? 200 })
    },
  })
  return {
    writes, notifications, logs, events, started,
    post: (body = valid) => exports.POST(new Request("https://local.test/api/contact", {
      method: "POST", body: JSON.stringify(body),
    })),
    raw: (body) => exports.POST(new Request("https://local.test/api/contact", { method: "POST", body })),
  }
}

test("a confirmed database row is required before returning success", async () => {
  let release
  const saveGate = new Promise(resolve => { release = resolve })
  const f = fixture({ saveGate, env: emailConfig })
  let returned = false
  const pending = f.post().then(response => { returned = true; return response })
  await f.started
  assert.equal(returned, false)
  assert.equal(f.notifications.length, 0)
  release()
  const response = await pending
  assert.equal(response.status, 201)
  assert.deepEqual(await response.json(), {
    success: true,
    id: "submission-1",
    message: "Thanks for reaching out. We will get back to you shortly.",
  })
  assert.deepEqual(f.events, ["save-started", "saved", "email"])
  assert.equal(f.writes[0].name, "Alex Rivera")
  assert.equal(f.writes[0].email, "alex@example.test")
  assert.equal(f.writes[0].company, "Example Team")
  assert.equal(f.writes[0].message, "Please help us plan our next project.")
  assert.equal(f.writes[0].source_page, "/book-demo")
  assert.equal(Object.hasOwn(f.writes[0], "website"), false)
})

test("optional fields become null and unknown fields cannot override stored columns", async () => {
  const f = fixture()
  const response = await f.post({ name: "Alex", email: "alex@example.test", message: "Hello", id: "untrusted-id", created_at: "untrusted-date" })
  assert.equal(response.status, 201)
  assert.equal(f.writes[0].company, null)
  assert.equal(f.writes[0].source_page, null)
  assert.equal(Object.hasOwn(f.writes[0], "id"), false)
  assert.equal(Object.hasOwn(f.writes[0], "created_at"), false)
})

for (const [name, options] of [
  ["database error (including a missing table)", { saveError: true }],
  ["database transport exception", { saveThrows: true }],
  ["missing saved-row receipt", { noReceipt: true }],
  ["missing database configuration", { clientError: true }],
]) {
  test(`${name} returns an error and never sends a notification`, async () => {
    const f = fixture({ ...options, env: emailConfig })
    const response = await f.post()
    assert.equal(response.status, 500)
    const data = await response.json()
    assert.equal(data.success, false)
    assert.match(data.error, /couldn't save/)
    assert.doesNotMatch(data.error, /Internal database details/)
    assert.equal(f.notifications.length, 0)
  })
}

test("malformed JSON and invalid values fail before storage", async () => {
  const f = fixture({ env: emailConfig })
  assert.equal((await f.raw("{broken")).status, 400)
  for (const body of [
    null, [], {},
    { ...valid, name: "  " },
    { ...valid, name: 42 },
    { ...valid, email: "not-an-email" },
    { ...valid, email: {} },
    { ...valid, message: "  " },
    { ...valid, company: [] },
    { ...valid, source_page: "https://outside.test/contact" },
  ]) {
    const response = await f.post(body)
    assert.equal(response.status, 400)
    assert.equal((await response.json()).success, false)
  }
  assert.equal(f.writes.length, 0)
  assert.equal(f.notifications.length, 0)
})

test("a populated honeypot is rejected without saving or sending email", async () => {
  const f = fixture({ env: emailConfig })
  for (const website of ["https://spam.test", " "]) {
    const response = await f.post({ ...valid, website })
    assert.equal(response.status, 400)
    assert.equal((await response.json()).success, false)
  }
  assert.equal(f.writes.length, 0)
  assert.equal(f.notifications.length, 0)
})

test("all field length limits are enforced without silently truncating messages", async () => {
  const f = fixture()
  for (const [field, value] of [
    ["name", "n".repeat(121)],
    ["email", "e".repeat(255) + "@example.test"],
    ["company", "c".repeat(201)],
    ["message", "m".repeat(10001)],
    ["source_page", "/" + "p".repeat(2048)],
  ]) {
    assert.equal((await f.post({ ...valid, [field]: value })).status, 400, field)
  }
  assert.equal(f.writes.length, 0)
  const response = await f.post({ ...valid, name: "n".repeat(120), company: "c".repeat(200), message: "m".repeat(10000), source_page: "/" + "p".repeat(2047) })
  assert.equal(response.status, 201)
  assert.equal(f.writes[0].message.length, 10000)
})

for (const missing of [null, "RESEND_API_KEY", "CONTACT_NOTIFY_EMAIL", "CONTACT_FROM_EMAIL"]) {
  test(`notification is skipped silently when ${missing ?? "all email settings"} is unset`, async () => {
    const env = missing ? { ...emailConfig, [missing]: "  " } : {}
    const f = fixture({ env })
    assert.equal((await f.post()).status, 201)
    assert.equal(f.writes.length, 1)
    assert.equal(f.notifications.length, 0)
    assert.equal(f.logs.length, 0)
  })
}

test("notification uses the configured sender/recipient and the visitor as reply-to", async () => {
  const f = fixture({ env: emailConfig })
  assert.equal((await f.post()).status, 201)
  const notification = f.notifications[0]
  assert.equal(notification.url, "https://api.resend.com/emails")
  assert.equal(notification.init.headers.Authorization, "Bearer test-key")
  assert.ok(notification.init.signal instanceof AbortSignal)
  assert.equal(notification.body.from, emailConfig.CONTACT_FROM_EMAIL)
  assert.deepEqual(notification.body.to, [emailConfig.CONTACT_NOTIFY_EMAIL])
  assert.equal(notification.body.reply_to, "alex@example.test")
  assert.match(notification.body.text, /submission-1/)
  assert.match(notification.body.text, /Source page: \/book-demo/)
  assert.match(notification.body.text, /Please help us plan our next project\./)
})

for (const [label, options] of [["provider rejection", { emailStatus: 503 }], ["network error or timeout", { emailThrows: true }]]) {
  test(`${label} cannot turn a saved submission into a failed submission`, async () => {
    const f = fixture({ ...options, env: emailConfig })
    const response = await f.post()
    assert.equal(response.status, 201)
    assert.equal((await response.json()).success, true)
    assert.ok(f.events.includes("saved"))
    assert.equal(f.notifications.length, 1)
    assert.equal(f.logs.length, 1)
  })
}
