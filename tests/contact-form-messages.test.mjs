import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import test from "node:test"
import vm from "node:vm"
import ts from "typescript"

function load(file, requireModule = () => { throw new Error("Unexpected import") }) {
  const exports = {}
  const { outputText } = ts.transpileModule(readFileSync(new URL(`../${file}`, import.meta.url), "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  })
  vm.runInNewContext(outputText, { exports, require: requireModule })
  return exports
}
const { contactFormLimits } = load("lib/page-data/contact.ts")
const { contactFormStrings: strings } = load("content/es/contact-form.ts")
const { contactFormError } = load("lib/contact-form-messages.ts", name => {
  assert.equal(name, "@/lib/page-data/contact")
  return { contactFormLimits }
})

test("all explicit contact API error messages have translations", () => {
  const source = ts.createSourceFile("route.ts", readFileSync(new URL("../app/api/contact/route.ts", import.meta.url), "utf8"), ts.ScriptTarget.Latest, true)
  const messages = new Set()
  function visit(node) {
    if (ts.isPropertyAssignment(node) && node.name.getText(source) === "error" && ts.isStringLiteral(node.initializer)) messages.add(node.initializer.text)
    if (ts.isCallExpression(node) && ts.isPropertyAccessExpression(node.expression)) {
      const method = node.expression.name.text
      const message = node.arguments[method === "email" ? 0 : 1]
      if (["min", "max", "email", "regex"].includes(method) && message && ts.isStringLiteral(message)) messages.add(message.text)
    }
    ts.forEachChild(node, visit)
  }
  visit(source)
  assert.ok(messages.size > 0)
  for (const message of messages) assert.ok(Object.hasOwn(strings.apiErrorMessages, message), message)
})

test("translated length errors reuse the form's actual limits", () => {
  for (const [key, message] of Object.entries({
    name: "Name must be 120 characters or fewer.",
    email: "Email must be 254 characters or fewer.",
    company: "Company must be 200 characters or fewer.",
    message: "Message must be 10,000 characters or fewer.",
  })) {
    const translated = contactFormError(message, strings)
    assert.ok(translated.includes(contactFormLimits[key].toLocaleString("en-US")))
    assert.doesNotMatch(translated, /\{\w+\}/)
  }
})

test("unknown, malformed and inherited-property API messages always use the generic translation", () => {
  for (const message of [undefined, null, {}, "Unexpected English failure", "toString", "__proto__"]) {
    assert.equal(contactFormError(message, strings), strings.errorMessage)
  }
})
