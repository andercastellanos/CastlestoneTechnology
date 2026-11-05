import { Metadata } from "next"
import CallLog from "@/components/portal/CallLog"

export const metadata: Metadata = { title: "Calls" }

export default function CallsPage() {
  return <CallLog />
}
