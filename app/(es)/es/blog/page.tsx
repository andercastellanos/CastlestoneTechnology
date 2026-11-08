import type { ResolvingMetadata } from "next"
import Link from "next/link"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import Container from "@/components/shared/Container"
import { blogContent as copy, spanishBlogEntries } from "@/content/es/blog"
import { spanishPageMetadata } from "@/lib/spanish-metadata"

export function generateMetadata(_props: unknown, parent: ResolvingMetadata) {
  return spanishPageMetadata({ path: copy.path, title: copy.title, description: copy.description }, parent)
}

export default function SpanishBlogPage() {
  return (
    <>
      <Header locale="es" />
      <main>
        <section className="bg-[#f9f6f1] py-16"><Container><div className="text-center">
          <h1 className="font-heading text-4xl font-bold tracking-tight text-[#222222] sm:text-5xl">{copy.heading}</h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-[#6b7280]">{copy.introduction}</p>
        </div></Container></section>
        <section className="py-20"><Container><div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {spanishBlogEntries.map((post) => <article key={post.path} className="rounded-sm border border-[#e6dbc9] bg-white p-6 transition-colors hover:border-[#c8a97e]">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#80613a]">{post.category}</p>
            <h2 className="font-heading mt-4 text-2xl font-bold text-[#222222]">{post.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-[#6b7280]">{post.description}</p>
            <Link href={post.path} className="mt-5 inline-block text-sm font-medium text-[#80613a] underline underline-offset-4">{post.kind === "city" ? copy.cityLabel : copy.readLabel}</Link>
          </article>)}
        </div></Container></section>
      </main>
      <Footer locale="es" />
    </>
  )
}
