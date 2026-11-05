import type { ResolvingMetadata } from "next"
import { SiteRoot, generateSiteMetadata } from "@/components/layout/SiteRoot"
import "@/app/globals.css"

export function generateMetadata(_props: unknown, parent: ResolvingMetadata) {
  return generateSiteMetadata("en", parent)
}

export default function EnglishRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <SiteRoot locale="en">{children}</SiteRoot>
}
