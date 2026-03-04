"use client"

import { useEffect, useState, useRef } from "react"
import { X, MessageSquare, Phone } from "lucide-react"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"
import type { Contact, Conversation, Call, LeadStatus } from "@/lib/types"

// ─── Config ───────────────────────────────────────────────────────────────────

const LEAD_STATUS_OPTIONS: { value: LeadStatus; label: string }[] = [
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "qualified", label: "Qualified" },
  { value: "customer", label: "Customer" },
]

const LEAD_BADGE: Record<LeadStatus, string> = {
  new: "bg-blue-50 text-blue-600 border border-blue-200",
  contacted: "bg-yellow-50 text-yellow-600 border border-yellow-200",
  qualified: "bg-purple-50 text-purple-600 border border-purple-200",
  customer: "bg-green-50 text-green-700 border border-green-200",
}

// ─── Label/Field components ───────────────────────────────────────────────────

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-[#999999]">
      {children}
    </label>
  )
}

function FieldInput({
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  value: string
  onChange: (v: string) => void
  placeholder?: string
  type?: string
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full rounded-sm border border-[#e6dbc9] bg-white px-3 py-2 text-sm text-[#222222] placeholder-[#aaaaaa] outline-none transition-colors focus:border-[#c8a97e] focus:ring-1 focus:ring-[#c8a97e]/30"
    />
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

interface Props {
  contact: Contact
  onClose: () => void
  onUpdate: (updated: Contact) => void
}

export default function ContactCard({ contact, onClose, onUpdate }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null)

  // Form state
  const [form, setForm] = useState({
    name: contact.name ?? "",
    phone: contact.phone,
    email: contact.email ?? "",
    source: contact.source ?? "",
    lead_status: contact.lead_status ?? ("new" as LeadStatus),
  })
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)

  // Related data
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [calls, setCalls] = useState<Call[]>([])
  const [historyLoading, setHistoryLoading] = useState(true)

  // Check if form is dirty
  const isDirty =
    form.name !== (contact.name ?? "") ||
    form.phone !== contact.phone ||
    form.email !== (contact.email ?? "") ||
    form.source !== (contact.source ?? "") ||
    form.lead_status !== (contact.lead_status ?? "new")

  // ── Keyboard close ───────────────────────────────────────────────────────
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [onClose])

  // ── Fetch related history ────────────────────────────────────────────────
  useEffect(() => {
    const supabase = getSupabaseBrowserClient()

    Promise.all([
      supabase
        .from("conversations")
        .select("*")
        .eq("contact_id", contact.id)
        .order("last_message_at", { ascending: false })
        .limit(5),
      supabase
        .from("calls")
        .select("*")
        .eq("contact_id", contact.id)
        .order("created_at", { ascending: false })
        .limit(5),
    ]).then(([convRes, callRes]) => {
      setConversations((convRes.data as Conversation[]) ?? [])
      setCalls((callRes.data as Call[]) ?? [])
      setHistoryLoading(false)
    })
  }, [contact.id])

  // ── Save changes ─────────────────────────────────────────────────────────
  async function handleSave() {
    setSaving(true)
    setSaveError(null)

    try {
      const res = await fetch(`/api/contacts/${contact.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name || null,
          phone: form.phone,
          email: form.email || null,
          source: form.source || null,
          lead_status: form.lead_status,
        }),
      })
      if (!res.ok) {
        const data = (await res.json()) as { error?: string }
        throw new Error(data.error ?? "Failed to save")
      }
      onUpdate({ ...contact, ...form, name: form.name || null, email: form.email || null })
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : "Failed to save")
    } finally {
      setSaving(false)
    }
  }

  // ── Render ───────────────────────────────────────────────────────────────
  return (
    <>
      {/* Backdrop */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-40 bg-black/20"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <aside
        className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-white shadow-2xl"
        role="dialog"
        aria-label="Contact details"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#e6dbc9] px-5 py-4">
          <div>
            <h2 className="text-lg font-semibold tracking-tight text-[#222222] [font-family:var(--font-heading)]">
              {contact.name ?? contact.phone}
            </h2>
            {contact.lead_status && (
              <span
                className={`mt-1 inline-block rounded-sm px-1.5 py-0.5 text-[10px] font-medium leading-none ${LEAD_BADGE[contact.lead_status]}`}
              >
                {contact.lead_status.charAt(0).toUpperCase() + contact.lead_status.slice(1)}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-sm border border-[#e6dbc9] text-[#555555] transition-colors hover:text-[#222222]"
            aria-label="Close panel"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-5 py-5">
          {/* Contact fields */}
          <section className="mb-6">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#555555]">
              Contact Details
            </p>

            <div className="space-y-3">
              <div>
                <FieldLabel>Name</FieldLabel>
                <FieldInput
                  value={form.name}
                  onChange={(v) => setForm((p) => ({ ...p, name: v }))}
                  placeholder="Full name"
                />
              </div>

              <div>
                <FieldLabel>Phone</FieldLabel>
                <FieldInput
                  value={form.phone}
                  onChange={(v) => setForm((p) => ({ ...p, phone: v }))}
                  placeholder="+1 (555) 000-0000"
                  type="tel"
                />
              </div>

              <div>
                <FieldLabel>Email</FieldLabel>
                <FieldInput
                  value={form.email}
                  onChange={(v) => setForm((p) => ({ ...p, email: v }))}
                  placeholder="email@example.com"
                  type="email"
                />
              </div>

              <div>
                <FieldLabel>Source</FieldLabel>
                <FieldInput
                  value={form.source}
                  onChange={(v) => setForm((p) => ({ ...p, source: v }))}
                  placeholder="e.g. Website, Referral"
                />
              </div>

              <div>
                <FieldLabel>Lead Status</FieldLabel>
                <select
                  value={form.lead_status}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, lead_status: e.target.value as LeadStatus }))
                  }
                  className="w-full rounded-sm border border-[#e6dbc9] bg-white px-3 py-2 text-sm text-[#222222] outline-none transition-colors focus:border-[#c8a97e] focus:ring-1 focus:ring-[#c8a97e]/30"
                >
                  {LEAD_STATUS_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {saveError && <p className="mt-2 text-xs text-red-500">{saveError}</p>}

            {isDirty && (
              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className="mt-4 inline-flex h-9 items-center justify-center rounded-sm bg-[#c8a97e] px-4 text-sm font-medium text-white transition-colors hover:bg-[#b69468] disabled:opacity-50"
              >
                {saving ? "Saving…" : "Save changes"}
              </button>
            )}
          </section>

          {/* Conversation history */}
          <section className="mb-6">
            <div className="mb-3 flex items-center gap-2">
              <MessageSquare className="h-3.5 w-3.5 text-[#aaaaaa]" />
              <p className="text-xs font-semibold uppercase tracking-wider text-[#555555]">
                Conversations
              </p>
            </div>

            {historyLoading ? (
              <div className="space-y-2">
                {[1, 2].map((i) => (
                  <div
                    key={i}
                    className="h-12 animate-pulse rounded-sm bg-[#f0ebe1]"
                  />
                ))}
              </div>
            ) : conversations.length === 0 ? (
              <p className="text-sm text-[#aaaaaa]">No conversations yet</p>
            ) : (
              <ul className="space-y-2">
                {conversations.map((conv) => (
                  <li
                    key={conv.id}
                    className="rounded-sm border border-[#e6dbc9] bg-[#faf8f5] px-3 py-2.5"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`rounded-sm px-1.5 py-0.5 text-[10px] font-medium ${
                          conv.status === "open"
                            ? "bg-[#fdf5e8] text-[#c8a97e] border border-[#e8d4a8]"
                            : "bg-[#f5f5f5] text-[#777777] border border-[#dddddd]"
                        }`}
                      >
                        {conv.status}
                      </span>
                      <span className="text-[11px] text-[#aaaaaa]">
                        {new Date(conv.last_message_at).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    {conv.last_message_preview && (
                      <p className="mt-1 truncate text-xs text-[#555555]">
                        {conv.last_message_preview}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </section>

          {/* Call history */}
          <section>
            <div className="mb-3 flex items-center gap-2">
              <Phone className="h-3.5 w-3.5 text-[#aaaaaa]" />
              <p className="text-xs font-semibold uppercase tracking-wider text-[#555555]">
                Call History
              </p>
            </div>

            {historyLoading ? (
              <div className="space-y-2">
                {[1, 2].map((i) => (
                  <div
                    key={i}
                    className="h-10 animate-pulse rounded-sm bg-[#f0ebe1]"
                  />
                ))}
              </div>
            ) : calls.length === 0 ? (
              <p className="text-sm text-[#aaaaaa]">No calls yet</p>
            ) : (
              <ul className="space-y-2">
                {calls.map((call) => (
                  <li
                    key={call.id}
                    className="flex items-center justify-between rounded-sm border border-[#e6dbc9] bg-[#faf8f5] px-3 py-2.5"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={`rounded-sm px-1.5 py-0.5 text-[10px] font-medium ${
                          call.status === "answered"
                            ? "bg-green-50 text-green-700 border border-green-200"
                            : call.status === "missed"
                              ? "bg-red-50 text-red-600 border border-red-200"
                              : "bg-amber-50 text-amber-600 border border-amber-200"
                        }`}
                      >
                        {call.status}
                      </span>
                      <span className="text-xs text-[#555555]">
                        {call.direction === "inbound" ? "↓ In" : "↑ Out"}
                      </span>
                    </div>
                    <span className="text-[11px] text-[#aaaaaa]">
                      {new Date(call.created_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </aside>
    </>
  )
}
