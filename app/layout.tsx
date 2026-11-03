import type { Metadata } from "next"
import { Cormorant_Garamond, DM_Sans } from "next/font/google"
import { ClerkProvider } from "@clerk/nextjs"
import "./globals.css"

const headingFont = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
})

const bodyFont = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const siteName = "Castlestone Technology"
const siteDescription =
  "Custom software, AI agents, and automation built by a nearshore engineering team in U.S. time zones—plus bilingual support teams for growing businesses."
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://castlestonetechnology.com"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  applicationName: siteName,
  referrer: "origin-when-cross-origin",
  keywords: [
    "Castlestone Technology",
    "virtual assistants",
    "AI receptionist",
    "virtual front desk",
    "Latin America staffing",
    "remote staffing",
    "business support",
  ],
  authors: [{ name: siteName }],
  creator: siteName,
  publisher: siteName,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName,
    title: siteName,
    description: siteDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: siteDescription,
    creator: "@castlestonetech",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [{ url: "/favicon.ico" }],
    shortcut: ["/favicon.ico"],
    apple: [{ url: "/favicon.ico" }],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${bodyFont.variable} ${headingFont.variable} antialiased`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
