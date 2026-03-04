"use client"

import { useEffect, useState, useCallback } from "react"
import { ChevronDown, ChevronUp, Plus } from "lucide-react"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"
import { useVAUser } from "@/lib/hooks/useVAUser"
import type { Call, Note } from "@/lib/types"

// ─── Config ───────────────────────────────────────────────────────────────────

const STATUS_BADGE: Record<string, string> = {
  answered: "bg-green-50 text-green-700 border border-green-200",
  missed: "bg-red-50 text-red-600 border border-red-200",
  voicemail: "bg-amber-50 text-amber-600 border border-amber-200",
}

type TabKey = "all" | "mine" | "missed" | "voicemail"

const TABS: { key: TabKey; label: string }[] = [
  { key: "all", label: "All" },
  { key: "mine", label: "Mine" },
  { key: "missed", label: "Missed" },
  { key: "voicemail", label: "Voicemail" },
]

/** ISO string for start of today (UTC midnight) */
function todayStart() {
  const d = new Date()
  d.setUTCHours(0, 0, 0, 0)
  return d.toISOString()
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function RowSkeleton() {
  return (
    <tr className="animate-pulse border-b border-[#f0ebe1]">
      {[28, 20, 20, 20, 16].map((w, i) => (
        <td key={i} className="px-4 py-3.5">
          <div className="h-3.5 rounded bg-[#ede9e0]" style={{ width: `${w * 3}px` }} />
        </td>
      ))}
    </tr>
  )
}

// ─── Inline note form ─────────────────────────────────────────────────────────

function NoteForm({ callId, onAdded }: { callId: string; onAdded: (note: Note) => void }) {
  const [text, setText] = useState("")
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!text.trim()) return
    setSubmitting(true)
    try {
      const res = await fetch(`/api/calls/${callId}/notes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body: text }),
      })
      if (res.ok) {
        const data = (await res.json()) as { note?: Note }
        const note: Note = data.note ?? {
          id: `local-${Date.now()}`,
          business_id: "",
          ref_type: "call",
          ref_id: callId,
          body: text,
          created_at: new Date().toISOString(),
        }
        onAdded(note)
        setText("")
      }
    } catch {
      // fail silently
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 pt-2">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a note…"
        className="flex-1 rounded-sm border border-[#e6dbc9] bg-white px-3 py-1.5 text-xs text-[#222222] placeholder-[#aaaaaa] outline-none focus:border-[#c8a97e] focus:ring-1 focus:ring-[#c8a97e]/30"
      />
      <button
        type="submit"
        disabled={submitting || !text.trim()}
        className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-sm bg-[#c8a97e] text-white disabled:opacity-50"
      >
        <Plus className="h-3.5 w-3.5" />
      </button>
    </form>
  )
}

// ─── Extended Call type with answered_by ──────────────────────────────────────

interface CallWithAnsweredBy extends Call {
  answered_by?: string | null
}

// ─── Expanded row ─────────────────────────────────────────────────────────────

function ExpandedRow({
  call,
  notes,
  onNoteAdded,
}: {
  call: CallWithAnsweredBy
  notes: Note[]
  onNoteAdded: (note: Note) => void
}) {
  return (
    <tr className="bg-[#faf8f5]">
      <td colSpan={6} className="px-8 pb-4 pt-2">
        {call.transcript && (
          <div className="mb-3">
            <p className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-[#999999]">
              Transcript
            </p>
            <p className="text-xs text-[#555555]">{call.transcript}</p>
          </div>
        )}
        {call.voicemail_url && (
          <div className="mb-3">
            <p className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-[#999999]">
              Voicemail
            </p>
            <audio controls src={call.voicemail_url} className="h-8 w-full" />
          </div>
        )}
        <div>
          <p className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-[#999999]">
            Notes
          </p>
          {notes.length === 0 ? (
            <p className="text-xs text-[#aaaaaa]">No notes yet</p>
          ) : (
            <ul className="space-y-1">
              {notes.map((n) => (
                <li key={n.id} className="text-xs text-[#555555]">
                  <span className="text-[#aaaaaa]">
                    {new Date(n.created_at).toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "2-digit",
                    })}{" "}
                    —{" "}
                  </span>
                  {n.body}
                </li>
              ))}
            </ul>
          )}
          <NoteForm callId={call.id} onAdded={onNoteAdded} />
        </div>
      </td>
    </tr>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function VACallList() {
  const { userId, businessId, loading: userLoading } = useVAUser()

  const [calls, setCalls] = useState<CallWithAnsweredBy[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<TabKey>("all")
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [notesMap, setNotesMap] = useState<Record<string, Note[]>>({})

  const fetchCalls = useCallback(async () => {
    if (!businessId) return
    const supabase = getSupabaseBrowserClient()
    const { data } = await supabase
      .from("calls")
      .select("*, contact:contacts(*)")
      .eq("business_id", businessId)
      .gte("created_at", todayStart())
      .order("created_at", { ascending: false })

    setCalls((data as CallWithAnsweredBy[]) ?? [])
    setLoading(false)
  }, [businessId])

  useEffect(() => {
    if (userLoading) return
    if (!businessId) { setLoading(false); return }
    setLoading(true)
    fetchCalls()
  }, [businessId, userLoading, fetchCalls])

  // ── Tab filter ────────────────────────────────────────────────────────────
  const filtered = calls.filter((c) => {
    if (activeTab === "mine") return c.answered_by === userId
    if (activeTab === "missed") return c.status === "missed"
    if (activeTab === "voicemail") return c.status === "voicemail"
    return true
  })

  // ── Tab counts ────────────────────────────────────────────────────────────
  const counts: Record<TabKey, number> = {
    all: calls.length,
    mine: calls.filter((c) => c.answered_by === userId).length,
    missed: calls.filter((c) => c.status === "missed").length,
    voicemail: calls.filter((c) => c.status === "voicemail").length,
  }

  async function handleExpand(call: CallWithAnsweredBy) {
    if (expandedId === call.id) { setExpandedId(null); return }
    setExpandedId(call.id)

    if (!notesMap[call.id]) {
      const supabase = getSupabaseBrowserClient()
      const { data } = await supabase
        .from("notes")
        .select("*")
        .eq("ref_type", "call")
        .eq("ref_id", call.id)
        .order("created_at", { ascending: true })
      setNotesMap((prev) => ({ ...prev, [call.id]: (data as Note[]) ?? [] }))
    }
  }

  function handleNoteAdded(callId: string, note: Note) {
    setNotesMap((prev) => ({ ...prev, [callId]: [...(prev[callId] ?? []), note] }))
  }

  return (
    <div className="flex h-full flex-col overflow-hidden">
      {/* Header */}
      <div className="border-b border-[#e6dbc9] bg-white px-6 py-5">
        <h1 className="text-2xl font-semibold tracking-tight text-[#222222] [font-family:var(--font-heading)]">
          Calls
        </h1>
        <p className="mt-0.5 text-xs text-[#888888]">Today&apos;s calls for your business</p>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-0 border-b border-[#e6dbc9] bg-white px-6">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-1.5 border-b-2 px-4 py-3 text-xs font-semibold transition-colors ${
              activeTab === tab.key
                ? "border-[#c8a97e] text-[#c8a97e]"
                : "border-transparent text-[#888888] hover:text-[#555555]"
            }`}
          >
            {tab.label}
            {counts[tab.key] > 0 && (
              <span
                className={`rounded-full px-1.5 py-0.5 text-[10px] ${
                  activeTab === tab.key
                    ? "bg-[#fdf5e8] text-[#c8a97e]"
                    : "bg-[#f0ebe1] text-[#888888]"
                }`}
              >
                {counts[tab.key]}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto">
        <table className="w-full min-w-[640px] text-sm">
          <thead className="sticky top-0 z-10 bg-[#faf8f5]">
            <tr className="border-b border-[#e6dbc9]">
              {["Contact", "Direction", "Status", "Duration", "Time", ""].map((h) => (
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
              ? Array.from({ length: 8 }).map((_, i) => <RowSkeleton key={i} />)
              : filtered.length === 0
                ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-16 text-center">
                      <p className="text-sm text-[#aaaaaa]">
                        {activeTab === "mine"
                          ? "No calls answered by you today"
                          : "No calls today"}
                      </p>
                    </td>
                  </tr>
                )
                : filtered.flatMap((call) => {
                  const contact = call.contact
                  const contactLabel =
                    contact?.name ?? contact?.phone ?? call.contact_id ?? "—"
                  const isExpanded = expandedId === call.id
                  const isAnsweredByMe = call.answered_by === userId

                  const durationLabel = call.duration != null
                    ? call.duration >= 60
                      ? `${Math.floor(call.duration / 60)}m ${call.duration % 60}s`
                      : `${call.duration}s`
                    : "—"

                  return [
                    <tr
                      key={call.id}
                      className={`cursor-pointer border-b border-[#f0ebe1] transition-colors hover:bg-[#faf8f5] ${
                        isAnsweredByMe ? "bg-[#fdfaf5]" : "bg-white"
                      }`}
                      onClick={() => handleExpand(call)}
                    >
                      <td className="px-4 py-3.5">
                        <p className="font-medium text-[#222222]">{contactLabel}</p>
                        {isAnsweredByMe && (
                          <p className="mt-0.5 text-[10px] font-semibold text-[#c8a97e]">
                            You answered
                          </p>
                        )}
                      </td>
                      <td className="px-4 py-3.5 text-[#555555]">
                        {call.direction === "inbound" ? "↓ Inbound" : "↑ Outbound"}
                      </td>
                      <td className="px-4 py-3.5">
                        <span
                          className={`rounded-sm px-2 py-0.5 text-[11px] font-medium ${STATUS_BADGE[call.status] ?? ""}`}
                        >
                          {call.status}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-[#555555]">{durationLabel}</td>
                      <td className="px-4 py-3.5 text-[#555555]">
                        {new Date(call.created_at).toLocaleTimeString("en-US", {
                          hour: "numeric",
                          minute: "2-digit",
                        })}
                      </td>
                      <td className="px-4 py-3.5 text-right">
                        {isExpanded ? (
                          <ChevronUp className="ml-auto h-4 w-4 text-[#aaaaaa]" />
                        ) : (
                          <ChevronDown className="ml-auto h-4 w-4 text-[#aaaaaa]" />
                        )}
                      </td>
                    </tr>,
                    isExpanded && (
                      <ExpandedRow
                        key={`${call.id}-exp`}
                        call={call}
                        notes={notesMap[call.id] ?? []}
                        onNoteAdded={(note) => handleNoteAdded(call.id, note)}
                      />
                    ),
                  ].filter(Boolean)
                })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
