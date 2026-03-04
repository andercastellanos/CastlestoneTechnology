"use client"

import { useEffect, useState, useCallback } from "react"
import { Search, Plus, X } from "lucide-react"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"
import { useBusinessId } from "@/lib/hooks/useBusinessId"
import ContactCard from "@/components/portal/ContactCard"
import type { Contact, LeadStatus } from "@/lib/types"

// ─── Config ───────────────────────────────────────────────────────────────────

const LEAD_BADGE: Record<LeadStatus, string> = {
  new: "bg-blue-50 text-blue-600 border border-blue-200",
  contacted: "bg-yellow-50 text-yellow-600 border border-yellow-200",
  qualified: "bg-purple-50 text-purple-600 border border-purple-200",
  customer: "bg-green-50 text-green-700 border border-green-200",
}

const LEAD_LABELS: Record<LeadStatus, string> = {
  new: "New",
  contacted: "Contacted",
  qualified: "Qualified",
  customer: "Customer",
}

const LEAD_STATUS_OPTIONS: LeadStatus[] = ["new", "contacted", "qualified", "customer"]

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function TableRowSkeleton() {
  return (
    <tr className="animate-pulse border-b border-[#f0ebe1]">
      {[36, 28, 40, 24, 20, 20].map((w, i) => (
        <td key={i} className="px-4 py-3.5">
          <div className={`h-3.5 rounded bg-[#ede9e0]`} style={{ width: `${w * 3}px` }} />
        </td>
      ))}
    </tr>
  )
}

// ─── Add Contact Modal ────────────────────────────────────────────────────────

interface AddModalProps {
  businessId: string
  onClose: () => void
  onCreated: (c: Contact) => void
}

function AddContactModal({ businessId, onClose, onCreated }: AddModalProps) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    source: "",
    lead_status: "new" as LeadStatus,
  })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [onClose])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.phone.trim()) { setError("Phone number is required"); return }
    setSubmitting(true)
    setError(null)

    try {
      const res = await fetch("/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, business_id: businessId }),
      })
      if (!res.ok) {
        const data = (await res.json()) as { error?: string }
        throw new Error(data.error ?? "Failed to create contact")
      }
      const data = (await res.json()) as { contact?: Contact }
      // Optimistic: build a local contact if API returns stub
      const created: Contact = data.contact ?? {
        id: `local-${Date.now()}`,
        business_id: businessId,
        name: form.name || null,
        phone: form.phone,
        email: form.email || null,
        source: form.source || null,
        lead_status: form.lead_status,
        created_at: new Date().toISOString(),
      }
      onCreated(created)
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create")
    } finally {
      setSubmitting(false)
    }
  }

  const inputClass =
    "w-full rounded-sm border border-[#e6dbc9] bg-white px-3 py-2 text-sm text-[#222222] placeholder-[#aaaaaa] outline-none transition-colors focus:border-[#c8a97e] focus:ring-1 focus:ring-[#c8a97e]/30"
  const labelClass = "mb-1 block text-[11px] font-semibold uppercase tracking-wide text-[#555555]"

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/25"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-sm border border-[#e6dbc9] bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-[#e6dbc9] px-5 py-4">
          <h2 className="text-base font-semibold text-[#222222] [font-family:var(--font-heading)]">
            Add Contact
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="flex h-7 w-7 items-center justify-center rounded-sm border border-[#e6dbc9] text-[#555555] transition-colors hover:text-[#222222]"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 px-5 py-5">
          <div>
            <label className={labelClass}>Name</label>
            <input
              className={inputClass}
              value={form.name}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
              placeholder="Full name"
            />
          </div>
          <div>
            <label className={labelClass}>Phone *</label>
            <input
              className={inputClass}
              value={form.phone}
              onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
              placeholder="+1 (555) 000-0000"
              type="tel"
              required
            />
          </div>
          <div>
            <label className={labelClass}>Email</label>
            <input
              className={inputClass}
              value={form.email}
              onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
              placeholder="email@example.com"
              type="email"
            />
          </div>
          <div>
            <label className={labelClass}>Source</label>
            <input
              className={inputClass}
              value={form.source}
              onChange={(e) => setForm((p) => ({ ...p, source: e.target.value }))}
              placeholder="e.g. Website, Referral"
            />
          </div>
          <div>
            <label className={labelClass}>Lead Status</label>
            <select
              className={inputClass}
              value={form.lead_status}
              onChange={(e) =>
                setForm((p) => ({ ...p, lead_status: e.target.value as LeadStatus }))
              }
            >
              {LEAD_STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  {LEAD_LABELS[s]}
                </option>
              ))}
            </select>
          </div>

          {error && <p className="text-xs text-red-500">{error}</p>}

          <div className="flex justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="h-9 rounded-sm border border-[#e6dbc9] px-4 text-sm text-[#555555] transition-colors hover:text-[#222222]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="h-9 rounded-sm bg-[#c8a97e] px-4 text-sm font-medium text-white transition-colors hover:bg-[#b69468] disabled:opacity-50"
            >
              {submitting ? "Adding…" : "Add Contact"}
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function ContactList() {
  const { businessId, loading: bizLoading } = useBusinessId()

  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
  const [showAddModal, setShowAddModal] = useState(false)

  // ── Fetch contacts ────────────────────────────────────────────────────────
  const fetchContacts = useCallback(async () => {
    if (!businessId) return
    const supabase = getSupabaseBrowserClient()
    const { data } = await supabase
      .from("contacts")
      .select("*")
      .eq("business_id", businessId)
      .order("created_at", { ascending: false })

    setContacts((data as Contact[]) ?? [])
    setLoading(false)
  }, [businessId])

  useEffect(() => {
    if (bizLoading) return
    if (!businessId) { setLoading(false); return }
    setLoading(true)
    fetchContacts()
  }, [businessId, bizLoading, fetchContacts])

  // ── Client-side search filter ─────────────────────────────────────────────
  const filtered = contacts.filter((c) => {
    if (!search.trim()) return true
    const q = search.toLowerCase()
    return (
      (c.name?.toLowerCase().includes(q) ?? false) ||
      c.phone.toLowerCase().includes(q)
    )
  })

  // ── Handle updates from ContactCard ──────────────────────────────────────
  function handleContactUpdate(updated: Contact) {
    setContacts((prev) => prev.map((c) => (c.id === updated.id ? updated : c)))
    setSelectedContact(updated)
  }

  function handleContactCreated(created: Contact) {
    setContacts((prev) => [created, ...prev])
  }

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="flex h-full flex-col overflow-hidden">
      {/* Page header */}
      <div className="flex items-center justify-between border-b border-[#e6dbc9] bg-white px-6 py-5">
        <h1 className="text-2xl font-semibold tracking-tight text-[#222222] [font-family:var(--font-heading)]">
          Contacts
        </h1>

        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#aaaaaa]" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or phone…"
              className="h-9 w-64 rounded-sm border border-[#e6dbc9] bg-white pl-8 pr-3 text-sm text-[#222222] placeholder-[#aaaaaa] outline-none transition-colors focus:border-[#c8a97e] focus:ring-1 focus:ring-[#c8a97e]/30"
            />
          </div>

          {/* Add Contact */}
          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="inline-flex h-9 items-center gap-1.5 rounded-sm bg-[#c8a97e] px-4 text-sm font-medium text-white transition-colors hover:bg-[#b69468]"
          >
            <Plus className="h-4 w-4" />
            Add Contact
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto">
        <table className="w-full min-w-[700px] text-sm">
          <thead className="sticky top-0 z-10 bg-[#faf8f5]">
            <tr className="border-b border-[#e6dbc9]">
              {["Name", "Phone", "Email", "Lead Status", "Source", "Date Added"].map((h) => (
                <th
                  key={h}
                  className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.08em] text-[#555555]"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {loading
              ? Array.from({ length: 8 }).map((_, i) => <TableRowSkeleton key={i} />)
              : filtered.length === 0
                ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-16 text-center">
                      <p className="text-sm font-medium text-[#222222]">
                        {search ? "No contacts found" : "No contacts yet"}
                      </p>
                      <p className="mt-1 text-xs text-[#999999]">
                        {search
                          ? "Try a different name or phone number"
                          : "Add your first contact to get started"}
                      </p>
                    </td>
                  </tr>
                )
                : filtered.map((contact) => (
                  <tr
                    key={contact.id}
                    onClick={() => setSelectedContact(contact)}
                    className="cursor-pointer border-b border-[#f0ebe1] bg-white transition-colors hover:bg-[#faf8f5]"
                  >
                    <td className="px-4 py-3.5 font-medium text-[#222222]">
                      {contact.name ?? <span className="text-[#aaaaaa]">—</span>}
                    </td>
                    <td className="px-4 py-3.5 text-[#555555]">{contact.phone}</td>
                    <td className="px-4 py-3.5 text-[#555555]">
                      {contact.email ?? <span className="text-[#cccccc]">—</span>}
                    </td>
                    <td className="px-4 py-3.5">
                      {contact.lead_status ? (
                        <span
                          className={`rounded-sm px-2 py-0.5 text-[11px] font-medium ${LEAD_BADGE[contact.lead_status]}`}
                        >
                          {LEAD_LABELS[contact.lead_status]}
                        </span>
                      ) : (
                        <span className="text-[#cccccc]">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3.5 text-[#555555]">
                      {contact.source ?? <span className="text-[#cccccc]">—</span>}
                    </td>
                    <td className="px-4 py-3.5 text-[#555555]">
                      {new Date(contact.created_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>

      {/* Slide-out ContactCard */}
      {selectedContact && (
        <ContactCard
          contact={selectedContact}
          onClose={() => setSelectedContact(null)}
          onUpdate={handleContactUpdate}
        />
      )}

      {/* Add Contact modal */}
      {showAddModal && businessId && (
        <AddContactModal
          businessId={businessId}
          onClose={() => setShowAddModal(false)}
          onCreated={handleContactCreated}
        />
      )}
    </div>
  )
}
