import VirtualFrontDeskView from "@/components/pages/VirtualFrontDeskView"
import { virtualFrontDeskContent } from "@/content/en/virtual-front-desk"
import { resolveContent } from "@/lib/content"
import { alternatesFor } from "@/lib/i18n"
import { virtualFrontDeskNumbers } from "@/lib/page-data/virtual-front-desk"
import type { Metadata } from "next"

const copy = resolveContent(virtualFrontDeskContent, virtualFrontDeskNumbers)

export const metadata: Metadata = {
  title: copy.metadata_title,
  description: copy.metadata_description,
  alternates: alternatesFor("/services/virtual-front-desk"),
}

export default function VirtualFrontDeskPage() {
  return <VirtualFrontDeskView content={virtualFrontDeskContent} locale="en" />
}
