import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import test from "node:test"
import vm from "node:vm"
import ts from "typescript"

const { outputText } = ts.transpileModule(
  readFileSync(new URL("../lib/content.ts", import.meta.url), "utf8"),
  { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } },
)
const content = {}
vm.runInNewContext(outputText, { exports: content })

test("localized templates can reorder and repeat shared numeric values", () => {
  const copy = { price: "${0}/mo", delivery: "{1} hours, {0} candidates; within {1} hours" }
  const result = content.resolveContent(copy, { price: ["1,200"], delivery: ["3", "48"] })
  assert.equal(result.price, "$1,200/mo")
  assert.equal(result.delivery, "48 hours, 3 candidates; within 48 hours")
  assert.equal(copy.price, "${0}/mo")
})

test("non-numeric copy is preserved character for character", () => {
  const text = "Latin America — customer's team & tools. "
  assert.equal(content.resolveContent({ text }, {}).text, text)
})

test("numeric extraction preserves formatted prices and limits without splitting product names", () => {
  assert.deepEqual(Array.from(content.numericParts("B2B: $1,200/mo, 40 hrs, 24/7, 2–3 roles, $45.50")),
    ["1,200", "40", "24", "7", "2", "3", "45.50"])
})
