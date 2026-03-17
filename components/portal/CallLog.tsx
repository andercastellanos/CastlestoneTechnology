"use client"

import { useEffect, useState, useCallback } from "react"
import { Play, ChevronDown, ChevronUp, PhoneIncoming, PhoneOutgoing } from "lucide-react"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"
import { useBusinessId } from "@/lib/hooks/useBusinessId"
import type { Call, CallStatus, Note } from "@/lib/types"

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatDuration(seconds: number | null): string {
  if (seconds === null || seconds === 0) return "—"
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${s.toString().padStart(2, "0")}`
}

function formatDateTime(dateStr: string): string {
  const date = new Date(dateStr)
  const now = new Date()
  const isToday = date.toDateString() === now.toDateString()
  if (isToday) {
    return date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true })
  }
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })
}

// ─── Badge configs ────────────────────────────────────────────────────────────

const STATUS_STYLES: Record<CallStatus, string> = {
  answered:    "bg-green-50 text-green-700 border border-green-200",
  missed:      "bg-red-50 text-red-600 border border-red-200",
  voicemail:   "bg-amber-50 text-amber-600 border border-amber-200",
  in_progress: "bg-blue-50 text-blue-700 border border-blue-200",
}

const STATUS_LABELS: Record<CallStatus, string> = {
  answered:    "Answered",
  missed:      "Missed",
  voicemail:   "Voicemail",
  in_progress: "In Progress",
}

type FilterTab = "all" | CallStatus

const TABS: { key: FilterTab; label: string }[] = [
  { key: "all", label: "All" },
  { key: "answered", label: "Answered" },
  { key: "missed", label: "Missed" },
  { key: "voicemail", label: "Voicemail" },
]

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function TableRowSkeleton() {
  return (
    <tr className="animate-pulse border-b border-[#f0ebe1]">
      {[40, 28, 22, 16, 32].map((w, i) => (
        <td key={i} className="px-4 py-3.5">
          <div className={`h-3.5 w-${w} rounded bg-[#ede9e0]`} />
        </td>
      ))}
      <td className="px-4 py-3.5">
        <div className="h-3.5 w-16 rounded bg-[#ede9e0]" />
      </td>
    </tr>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function CallLog() {
  const { businessId, loading: bizLoading } = useBusinessId()

  const [calls, setCalls] = useState<Call[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<FilterTab>("all")
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [notesMap, setNotesMap] = useState<Record<string, Note[]>>({})
  const [notesLoading, setNotesLoading] = useState<Record<string, boolean>>({})

  // ── Fetch calls ─────────────────────────────────────────────────────────
  const fetchCalls = useCallback(async () => {
    if (!businessId) return
    const supabase = getSupabaseBrowserClient()
    const { data } = await supabase
      .from("calls")
      .select("*, contact:contacts(*)")
      .eq("business_id", businessId)
      .order("created_at", { ascending: false })

    setCalls((data as Call[]) ?? [])
    setLoading(false)
  }, [businessId])

  useEffect(() => {
    if (bizLoading) return
    if (!businessId) { setLoading(false); return }
    setLoading(true)
    fetchCalls()
  }, [businessId, bizLoading, fetchCalls])

  // ── Expand row → fetch notes ─────────────────────────────────────────────
  async function handleRowClick(callId: string) {
    if (expandedId === callId) {
      setExpandedId(null)
      return
    }
    setExpandedId(callId)

    if (notesMap[callId] !== undefined) return // already fetched
    setNotesLoading((prev) => ({ ...prev, [callId]: true }))

    const supabase = getSupabaseBrowserClient()
    const { data } = await supabase
      .from("notes")
      .select("*")
      .eq("ref_type", "call")
      .eq("ref_id", callId)
      .order("created_at", { ascending: true })

    setNotesMap((prev) => ({ ...prev, [callId]: (data as Note[]) ?? [] }))
    setNotesLoading((prev) => ({ ...prev, [callId]: false }))
  }

  // ── Filtered list ────────────────────────────────────────────────────────
  const filtered = calls.filter((c) => activeTab === "all" || c.status === activeTab)

  const counts = {
    all:         calls.length,
    answered:    calls.filter((c) => c.status === "answered").length,
    missed:      calls.filter((c) => c.status === "missed").length,
    voicemail:   calls.filter((c) => c.status === "voicemail").length,
    in_progress: calls.filter((c) => c.status === "in_progress").length,
  }

  // ── Render ───────────────────────────────────────────────────────────────
  return (
    <div className="flex h-full flex-col overflow-hidden">
      {/* Page header */}
      <div className="border-b border-[#e6dbc9] bg-white px-6 pt-6">
        <h1 className="mb-4 text-2xl font-semibold tracking-tight text-[#222222] [font-family:var(--font-heading)]">
          Calls
        </h1>

        {/* Filter tabs */}
        <div className="flex gap-0">
          {TABS.map(({ key, label }) => (
            <button
              key={key}
              type="button"
              onClick={() => setActiveTab(key)}
              className={`flex items-center gap-1.5 border-b-2 px-4 py-2.5 text-sm font-medium transition-colors ${
                activeTab === key
                  ? "border-[#c8a97e] text-[#c8a97e]"
                  : "border-transparent text-[#555555] hover:text-[#222222]"
              }`}
            >
              {label}
              <span
                className={`rounded-full px-1.5 py-0.5 text-[10px] font-semibold leading-none ${
                  activeTab === key
                    ? "bg-[#fdf5e8] text-[#c8a97e]"
                    : "bg-[#f0ebe1] text-[#777777]"
                }`}
              >
                {counts[key]}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto">
        <table className="w-full min-w-[700px] text-sm">
          <thead className="sticky top-0 z-10 bg-[#faf8f5]">
            <tr className="border-b border-[#e6dbc9]">
              {["Contact", "Direction", "Status", "Duration", "Date & Time", "Actions"].map(
                (h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.08em] text-[#555555]"
                  >
                    {h}
                  </th>
                ),
              )}
            </tr>
          </thead>

          <tbody>
            {loading
              ? Array.from({ length: 8 }).map((_, i) => <TableRowSkeleton key={i} />)
              : filtered.length === 0
                ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-16 text-center">
                      <p className="text-sm font-medium text-[#222222]">No calls found</p>
                      <p className="mt-1 text-xs text-[#999999]">
                        {activeTab !== "all" ? "Try a different filter" : "Calls will appear here"}
                      </p>
                    </td>
                  </tr>
                )
                : filtered.map((call) => {
                    const isExpanded = expandedId === call.id
                    const displayName =
                      call.contact?.name ?? call.contact?.phone ?? call.contact_id ?? "Unknown"

                    return (
                      <>
                        <tr
                          key={call.id}
                          onClick={() => handleRowClick(call.id)}
                          className={`cursor-pointer border-b border-[#f0ebe1] transition-colors hover:bg-[#faf8f5] ${
                            isExpanded ? "bg-[#f8f5ef]" : "bg-white"
                          }`}
                        >
                          {/* Contact */}
                          <td className="px-4 py-3.5">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-[#222222]">{displayName}</span>
                              {call.contact?.phone && call.contact?.name && (
                                <span className="text-xs text-[#aaaaaa]">
                                  {call.contact.phone}
                                </span>
                              )}
                            </div>
                          </td>

                          {/* Direction */}
                          <td className="px-4 py-3.5">
                            <span
                              className={`inline-flex items-center gap-1 rounded-sm px-2 py-0.5 text-[11px] font-medium ${
                                call.direction === "inbound"
                                  ? "bg-blue-50 text-blue-600 border border-blue-200"
                                  : "bg-[#fdf5e8] text-[#c8a97e] border border-[#e8d4a8]"
                              }`}
                            >
                              {call.direction === "inbound" ? (
                                <PhoneIncoming className="h-3 w-3" />
                              ) : (
                                <PhoneOutgoing className="h-3 w-3" />
                              )}
                              {call.direction === "inbound" ? "Inbound" : "Outbound"}
                            </span>
                          </td>

                          {/* Status */}
                          <td className="px-4 py-3.5">
                            <span
                              className={`rounded-sm px-2 py-0.5 text-[11px] font-medium ${STATUS_STYLES[call.status]}`}
                            >
                              {STATUS_LABELS[call.status]}
                            </span>
                          </td>

                          {/* Duration */}
                          <td className="px-4 py-3.5 tabular-nums text-[#555555]">
                            {formatDuration(call.duration)}
                          </td>

                          {/* Date */}
                          <td className="px-4 py-3.5 text-[#555555]">
                            {formatDateTime(call.created_at)}
                          </td>

                          {/* Actions */}
                          <td className="px-4 py-3.5">
                            <div className="flex items-center gap-2">
                              {call.status === "voicemail" && call.voicemail_url && (
                                <a
                                  href={call.voicemail_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  className="inline-flex items-center gap-1 rounded-sm border border-[#e6dbc9] bg-white px-2.5 py-1 text-[11px] font-medium text-[#555555] transition-colors hover:border-[#c8a97e] hover:text-[#c8a97e]"
                                >
                                  <Play className="h-3 w-3" />
                                  Play
                                </a>
                              )}
                              <span className="text-[#cccccc]">
                                {isExpanded ? (
                                  <ChevronUp className="h-4 w-4" />
                                ) : (
                                  <ChevronDown className="h-4 w-4" />
                                )}
                              </span>
                            </div>
                          </td>
                        </tr>

                        {/* Expanded row */}
                        {isExpanded && (
                          <tr key={`${call.id}-expanded`} className="bg-[#faf8f5]">
                            <td colSpan={6} className="border-b border-[#e6dbc9] px-6 py-4">
                              {/* Voicemail transcript */}
                              {call.status === "voicemail" && call.transcript && (
                                <div className="mb-4">
                                  <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-[#999999]">
                                    Transcript
                                  </p>
                                  <p className="rounded-sm border border-[#e6dbc9] bg-white px-3 py-2.5 text-sm text-[#555555]">
                                    {call.transcript}
                                  </p>
                                </div>
                              )}

                              {/* Notes */}
                              <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-[#999999]">
                                Notes
                              </p>
                              {notesLoading[call.id] ? (
                                <div className="h-4 w-40 animate-pulse rounded bg-[#ede9e0]" />
                              ) : !notesMap[call.id] || notesMap[call.id].length === 0 ? (
                                <p className="text-sm text-[#aaaaaa]">No notes for this call</p>
                              ) : (
                                <ul className="space-y-2">
                                  {notesMap[call.id].map((note) => (
                                    <li
                                      key={note.id}
                                      className="rounded-sm border border-[#e6dbc9] bg-white px-3 py-2.5 text-sm text-[#222222]"
                                    >
                                      {note.body}
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </td>
                          </tr>
                        )}
                      </>
                    )
                  })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
