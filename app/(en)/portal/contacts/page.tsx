import { Metadata } from "next"
import ContactList from "@/components/portal/ContactList"

export const metadata: Metadata = { title: "Contacts" }

export default function ContactsPage() {
  return <ContactList />
}
