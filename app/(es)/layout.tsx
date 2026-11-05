import type { ResolvingMetadata } from "next"
import { SiteRoot, generateSiteMetadata } from "@/components/layout/SiteRoot"
import "@/app/globals.css"

export function generateMetadata(_props: unknown, parent: ResolvingMetadata) {
  return generateSiteMetadata("es", parent)
}

export default function SpanishRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <SiteRoot locale="es">{children}</SiteRoot>
}
