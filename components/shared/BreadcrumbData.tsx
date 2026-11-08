"use client"

import { usePathname } from "next/navigation"
import { breadcrumbFor } from "@/lib/page-data/breadcrumbs"

export default function BreadcrumbData() {
  const pathname = usePathname()
  const data = pathname ? breadcrumbFor(pathname) : null
  return data ? <script data-breadcrumbs type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} /> : null
}
