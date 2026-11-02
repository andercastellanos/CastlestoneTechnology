import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import test from "node:test"
import vm from "node:vm"
import ts from "typescript"

// Compile the real handlers/components with isolated dependencies. No credentials,
// network calls, external test runner, or production database are needed.
function loadSource(path, dependencies, globals = {}) {
  const source = readFileSync(new URL(`../${path}`, import.meta.url), "utf8")
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
      jsx: ts.JsxEmit.ReactJSX,
      esModuleInterop: true,
    },
    fileName: path,
  })
  const loadedModule = { exports: {} }
  vm.runInNewContext(outputText, {
    module: loadedModule,
    exports: loadedModule.exports,
    require(name) {
      assert.ok(Object.hasOwn(dependencies, name), `Unexpected import: ${name}`)
      return dependencies[name]
    },
    console: { error() {} },
    process: { env: {} },
    ...globals,
  }, { filename: path })
  return loadedModule.exports
}

function serverFixture(options = {}) {
  const queries = []
  const sends = []
  const resultFor = (query) => {
    const { table, operation } = query
    if (table === "businesses") return { data: options.business ?? { twilio_number: "+15550001111", whatsapp_number: "+15550002222" } }
    if (table === "contacts") return { data: { id: "contact-1", phone: "+15551234567" } }
    if (table === "conversations" && operation === "select") {
      if (query.columns === "id") return { data: options.existing ? { id: "existing-1" } : null }
      return { data: { id: "conversation-1", contact_id: "contact-1", business_id: "business-1", channel: "sms" } }
    }
    if (table === "conversations" && operation === "insert") {
      return options.conversationError ? { error: { message: "Database unavailable" } } : { data: { id: "conversation-1" } }
    }
    if (table === "messages" && operation === "insert") {
      return options.messageError ? { error: { message: "Database unavailable" } } : { data: { id: "message-1", created_at: "2026-11-02T12:00:00Z" } }
    }
    return { data: null, error: null }
  }
  const supabase = {
    from(table) {
      const query = { table, operation: "select", filters: [] }
      queries.push(query)
      const builder = {
        select(columns) { query.columns = columns; return builder },
        insert(values) { query.operation = "insert"; query.values = values; return builder },
        update(values) { query.operation = "update"; query.values = values; return builder },
        eq(column, value) { query.filters.push([column, value]); return builder },
        single() { return Promise.resolve(resultFor(query)) },
        maybeSingle() { return Promise.resolve(resultFor(query)) },
        then(resolve, reject) { return Promise.resolve(resultFor(query)).then(resolve, reject) },
      }
      return builder
    },
  }
  const dependencies = {
    "@clerk/nextjs/server": { auth: async () => ({ userId: options.unauthorized ? null : "clerk-1" }) },
    "next/server": { NextResponse: { json: (data, init) => Response.json(data, init) } },
    "@/lib/supabase/server": { createServerSupabaseClient: () => supabase },
    "@/lib/twilio": {
      getUserByClerkId: async () => ({ id: "user-1", business_id: "business-1", name: "Owner" }),
      buildOutboundAddressing: ({ business, contactPhone }) => ({ from: business.twilio_number, to: contactPhone }),
      twilioClient: {
        messages: {
          async create(message) {
            sends.push(message)
            if (options.sendError) throw { code: 63016, message: "Send rejected" }
            return { sid: "SM-accepted" }
          },
        },
      },
    },
  }
  const create = loadSource("app/api/conversations/create/route.ts", dependencies).POST
  const reply = loadSource("app/api/conversations/[id]/reply/route.ts", dependencies).POST
  return {
    queries,
    sends,
    create: (body = { phone: "(555) 123-4567", message: "Hello", channel: "sms" }) => create(new Request("https://example.test/api/conversations/create", { method: "POST", body: JSON.stringify(body) })),
    reply: () => reply(new Request("https://example.test/reply", { method: "POST", body: JSON.stringify({ body: "Retry" }) }), { params: Promise.resolve({ id: "conversation-1" }) }),
  }
}

test("successful creation records the accepted message before publishing its preview", async () => {
  const f = serverFixture()
  const res = await f.create()
  assert.equal(res.status, 200)
  assert.equal((await res.json()).message_saved, true)
  assert.equal(f.sends[0].to, "+15551234567")
  const inserted = f.queries.find((q) => q.table === "conversations" && q.operation === "insert")
  assert.equal(inserted.values.last_message_preview, null)
  const messageIndex = f.queries.findIndex((q) => q.table === "messages")
  assert.equal(f.queries[messageIndex].values.twilio_message_sid, "SM-accepted")
  const previewIndex = f.queries.findIndex((q) => q.operation === "update")
  assert.ok(previewIndex > messageIndex)
  assert.equal(f.queries[previewIndex].values.last_message_preview, "Hello")
  assert.ok(f.queries[previewIndex].filters.some(([column]) => column === "last_message_at"))
})

test("a rejected send leaves an empty thread and returns its ID for retry", async () => {
  const f = serverFixture({ sendError: true })
  const res = await f.create()
  const data = await res.json()
  assert.equal(res.status, 502)
  assert.equal(data.message_sent, false)
  assert.equal(data.id, "conversation-1")
  assert.match(data.error, /24h/)
  assert.equal(f.queries.some((q) => q.table === "messages" || q.operation === "update"), false)
  assert.equal(f.queries.find((q) => q.operation === "insert").values.last_message_preview, null)
})

for (const handler of ["create", "reply"]) {
  test(`${handler}: an accepted send with a failed history write is explicitly distinguished from an unsent message`, async () => {
    const f = serverFixture({ messageError: true })
    const res = await f[handler]()
    const data = await res.json()
    assert.equal(res.status, 502)
    assert.equal(data.message_sent, true)
    assert.equal(data.message_saved, false)
    assert.equal(data.id, "conversation-1")
    assert.match(data.error, /Do not resend/)
    assert.equal(f.sends.length, 1)
  })
}

test("an existing open conversation is returned without sending the draft", async () => {
  const f = serverFixture({ existing: true })
  const res = await f.create()
  assert.equal(res.status, 409)
  assert.equal((await res.json()).id, "existing-1")
  assert.equal(f.sends.length, 0)
})

test("failed conversation creation never sends a message", async () => {
  const f = serverFixture({ conversationError: true })
  assert.equal((await f.create()).status, 500)
  assert.equal(f.sends.length, 0)
})

test("authentication and validation fail before sending", async () => {
  const unauthorized = serverFixture({ unauthorized: true })
  assert.equal((await unauthorized.create()).status, 401)
  assert.equal(unauthorized.queries.length, 0)
  const f = serverFixture()
  for (const body of [null, { phone: 123 }, { phone: "+15551234567", message: {} }, { phone: "+15551234567", message: "Hello", channel: "email" }]) {
    assert.equal((await f.create(body)).status, 400)
  }
  assert.equal(f.sends.length, 0)
})

test("an unconfigured WhatsApp sender fails before creating a conversation", async () => {
  const f = serverFixture({ business: { twilio_number: "+15550001111", whatsapp_number: null } })
  const res = await f.create({ phone: "+15551234567", message: "Hello", channel: "whatsapp" })
  assert.equal(res.status, 422)
  assert.equal(f.queries.some((q) => q.operation === "insert"), false)
  assert.equal(f.sends.length, 0)
})

function clientFixture(responses, source = "components/portal/NewConversationModal.tsx") {
  const states = []
  let cursor = 0
  const requests = []
  const navigations = []
  const jsx = (type, props) => ({ type, props })
  const { default: Component } = loadSource(source, {
    "react": {
      useState(initial) {
        const index = cursor++
        if (!(index in states)) states[index] = initial
        return [states[index], (value) => { states[index] = typeof value === "function" ? value(states[index]) : value }]
      },
      useRef: () => ({ current: null }),
      useEffect() {},
      useCallback: (callback) => callback,
    },
    "react/jsx-runtime": { jsx, jsxs: jsx },
    "next/navigation": { useRouter: () => ({ push: (path) => navigations.push(path) }) },
    "lucide-react": { X: "icon", ArrowLeft: "icon", Send: "icon" },
    "@/lib/hooks/useSupabaseBrowserClient": { useSupabaseBrowserClient: () => ({}) },
    "@/components/portal/ChannelBadge": { __esModule: true, default: "badge" },
  }, {
    async fetch(url, init) {
      requests.push({ url, body: JSON.parse(init.body) })
      assert.ok(responses.length, "Unexpected extra send")
      const { status = 200, ...data } = responses.shift()
      return Response.json(data, { status })
    },
  })
  let tree
  const render = () => {
    cursor = 0
    tree = Component({ isOpen: true, onClose() {}, inboxBasePath: "/va/inbox", conversationId: "conversation-1" })
  }
  const find = (predicate) => {
    function visit(node) {
      if (!node || typeof node !== "object") return undefined
      if (Array.isArray(node)) return node.map(visit).find(Boolean)
      return predicate(node) ? node : visit(node.props?.children)
    }
    return visit(tree)
  }
  render()
  return {
    requests,
    navigations,
    find,
    edit(type, value) {
      const element = find((n) => n.type === type)
      assert.ok(!element.props.disabled)
      element.props.onChange({ target: { value, style: {} } })
      render()
    },
    async submit() {
      await find((n) => n.type === "form").props.onSubmit({ preventDefault() {} })
      render()
    },
    async click(predicate) {
      await find(predicate).props.onClick()
      render()
    },
  }
}

test("modal retries a rejected first send through the existing thread", async () => {
  const f = clientFixture([
    { status: 502, id: "conversation-1", message_sent: false, error: "Failed to send" },
    { success: true, message_id: "message-1" },
  ])
  f.edit("input", "+15551234567")
  f.edit("textarea", "Hello")
  await f.submit()
  assert.equal(f.find((n) => n.props?.type === "submit").props.children, "Retry send")
  assert.equal(f.find((n) => n.props?.type === "tel").props.disabled, true)
  await f.submit()
  assert.equal(f.requests[1].url, "/api/conversations/conversation-1/reply")
  assert.equal(f.requests[1].body.body, "Hello")
  assert.deepEqual(f.navigations, ["/va/inbox?id=conversation-1"])
})

test("modal blocks resending when Twilio accepted a message that could not be saved", async () => {
  const f = clientFixture([{ status: 502, id: "conversation-1", message_sent: true, message_saved: false, error: "Do not resend it." }])
  f.edit("input", "+15551234567")
  f.edit("textarea", "Hello")
  await f.submit()
  assert.equal(f.find((n) => n.props?.type === "submit"), undefined)
  assert.equal(f.find((n) => n.type === "textarea").props.disabled, true)
  await f.submit() // Even a repeated form event cannot resend.
  assert.equal(f.requests.length, 1)
  assert.match(f.find((n) => n.props?.role === "alert").props.children, /Do not resend/)
  await f.click((n) => n.type === "button" && n.props.children === "Open conversation")
  assert.deepEqual(f.navigations, ["/va/inbox?id=conversation-1"])
})

test("modal opens an existing conversation without sending a second request", async () => {
  const f = clientFixture([{ status: 409, id: "existing-1" }])
  f.edit("input", "+15551234567")
  f.edit("textarea", "Hello")
  await f.submit()
  assert.equal(f.requests.length, 1)
  assert.deepEqual(f.navigations, ["/va/inbox?id=existing-1"])
})

test("thread does not restore the draft after an accepted send fails to save", async () => {
  const f = clientFixture([{ status: 502, message_sent: true, error: "Do not resend it." }], "components/portal/MessageThread.tsx")
  f.edit("textarea", "Hello")
  await f.click((n) => n.props?.["aria-label"] === "Send reply")
  assert.equal(f.find((n) => n.type === "textarea").props.value, "")
  assert.equal(f.find((n) => n.props?.["aria-label"] === "Send reply").props.disabled, true)
  assert.ok(f.find((n) => n.type === "p" && n.props.children === "Do not resend it."))
})

test("thread preserves the draft when sending was rejected", async () => {
  const f = clientFixture([{ status: 502, error: "Failed to send" }], "components/portal/MessageThread.tsx")
  f.edit("textarea", "Hello")
  await f.click((n) => n.props?.["aria-label"] === "Send reply")
  assert.equal(f.find((n) => n.type === "textarea").props.value, "Hello")
})
