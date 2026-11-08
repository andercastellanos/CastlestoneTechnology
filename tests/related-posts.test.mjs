import assert from "node:assert/strict"
import { readdirSync, readFileSync } from "node:fs"
import test from "node:test"
import vm from "node:vm"
import ts from "typescript"

const exports = {}
vm.runInNewContext(ts.transpileModule(readFileSync(new URL("../lib/page-data/related-posts.ts", import.meta.url), "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS },
}).outputText, { exports })
const posts = Array.from(exports.relatedPosts)

test("every article route has shared related-post navigation", () => {
  for (const [directory, prefix] of [["../app/(en)/blog/", "/blog/"], ["../app/(es)/es/blog/", "/es/blog/"]]) {
    const routes = readdirSync(new URL(directory, import.meta.url), { withFileTypes: true }).filter(entry => entry.isDirectory() && !/^(web-design-|diseno-web-)/.test(entry.name)).map(entry => prefix + entry.name)
    for (const route of routes) assert(posts.some(post => post.path === route), route)
  }
})

test("related links are unique, published, same-locale articles without self-links", () => {
  const paths = new Set(posts.map(post => post.path))
  assert.equal(paths.size, posts.length)
  for (const post of posts) {
    assert(post.related.length >= 2 && post.related.length <= 3, post.path)
    assert.equal(new Set(post.related).size, post.related.length)
    for (const target of post.related) {
      assert(paths.has(target), target)
      assert.notEqual(target, post.path)
      assert.equal(target.startsWith("/es/"), post.path.startsWith("/es/"))
    }
  }
})
