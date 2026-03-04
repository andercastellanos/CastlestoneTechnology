"use client"

import { useEffect, useState } from "react"
import type { RoutingRule, RoutingMode, AfterHoursMode } from "@/lib/types"
import type { ToastState } from "@/components/portal/SettingsPage"

// ─── Routing mode options ─────────────────────────────────────────────────────

const ROUTING_MODES: { value: RoutingMode; label: string; description: string }[] = [
  {
    value: "round_robin",
    label: "Round Robin",
    description: "Rotate calls evenly across all available agents.",
  },
  {
    value: "first_available",
    label: "First Available",
    description: "Route to the first agent who picks up.",
  },
  {
    value: "broadcast",
    label: "Broadcast",
    description: "Ring all agents simultaneously.",
  },
]

const AFTER_HOURS_OPTIONS: { value: AfterHoursMode; label: string }[] = [
  { value: "voicemail", label: "Send to Voicemail" },
  { value: "forward", label: "Forward to Number" },
  { value: "ivr", label: "Play IVR Menu" },
]

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function Skeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="grid grid-cols-3 gap-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-20 rounded-sm bg-[#ede9e0]" />
        ))}
      </div>
      <div className="h-9 rounded-sm bg-[#ede9e0]" />
    </div>
  )
}

// ─── Component ────────────────────────────────────────────────────────────────

interface Props {
  showToast: (message: string, type: ToastState["type"]) => void
}

export default function CallRoutingSection({ showToast }: Props) {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const [mode, setMode] = useState<RoutingMode>("first_available")
  const [ringTimeout, setRingTimeout] = useState(30)
  const [afterHoursMode, setAfterHoursMode] = useState<AfterHoursMode>("voicemail")
  const [forwardNumber, setForwardNumber] = useState("")
  const [ivrEnabled, setIvrEnabled] = useState(false)

  useEffect(() => {
    fetch("/api/portal/routing")
      .then((r) => r.json())
      .then((data: { routing?: RoutingRule }) => {
        if (data.routing) {
          const r = data.routing
          setMode(r.mode ?? "first_available")
          setRingTimeout(r.ring_timeout ?? 30)
          setAfterHoursMode(r.after_hours_mode ?? "voicemail")
          setForwardNumber(r.forward_number ?? "")
          setIvrEnabled(r.ivr_enabled ?? false)
        }
      })
      .catch(() => {/* stub, ignore */})
      .finally(() => setLoading(false))
  }, [])

  async function handleSave() {
    setSaving(true)
    try {
      const res = await fetch("/api/portal/routing", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode,
          ring_timeout: ringTimeout,
          after_hours_mode: afterHoursMode,
          forward_number: afterHoursMode === "forward" ? forwardNumber : null,
          ivr_enabled: ivrEnabled,
        }),
      })
      if (!res.ok) throw new Error("Failed to save")
      showToast("Call routing saved", "success")
    } catch {
      showToast("Failed to save call routing", "error")
    } finally {
      setSaving(false)
    }
  }

  return (
    <section className="rounded-sm border border-[#e6dbc9] bg-white">
      <div className="border-b border-[#e6dbc9] px-5 py-4">
        <h2 className="text-base font-semibold text-[#222222] [font-family:var(--font-heading)]">
          Call Routing
        </h2>
        <p className="mt-0.5 text-xs text-[#888888]">
          Control how incoming calls are distributed to your team.
        </p>
      </div>

      <div className="px-5 py-5">
        {loading ? (
          <Skeleton />
        ) : (
          <div className="space-y-6">
            {/* Routing mode cards */}
            <div>
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-[#555555]">
                Routing Mode
              </p>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {ROUTING_MODES.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setMode(opt.value)}
                    className={`rounded-sm border p-3 text-left transition-colors ${
                      mode === opt.value
                        ? "border-[#c8a97e] bg-[#fdf5e8]"
                        : "border-[#e6dbc9] bg-white hover:border-[#c8a97e]/50"
                    }`}
                  >
                    <p
                      className={`text-sm font-semibold ${
                        mode === opt.value ? "text-[#c8a97e]" : "text-[#222222]"
                      }`}
                    >
                      {opt.label}
                    </p>
                    <p className="mt-1 text-xs text-[#888888]">{opt.description}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Ring timeout */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-[#555555]">
                  Ring Timeout
                </p>
                <span className="text-sm font-medium text-[#c8a97e]">{ringTimeout}s</span>
              </div>
              <input
                type="range"
                min={10}
                max={60}
                step={5}
                value={ringTimeout}
                onChange={(e) => setRingTimeout(Number(e.target.value))}
                className="w-full accent-[#c8a97e]"
              />
              <div className="mt-1 flex justify-between text-[10px] text-[#aaaaaa]">
                <span>10s</span>
                <span>60s</span>
              </div>
            </div>

            {/* After-hours mode */}
            <div>
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-[#555555]">
                After-Hours Behavior
              </p>
              <select
                value={afterHoursMode}
                onChange={(e) => setAfterHoursMode(e.target.value as AfterHoursMode)}
                className="w-full rounded-sm border border-[#e6dbc9] bg-white px-3 py-2 text-sm text-[#222222] outline-none transition-colors focus:border-[#c8a97e] focus:ring-1 focus:ring-[#c8a97e]/30"
              >
                {AFTER_HOURS_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>

              {afterHoursMode === "forward" && (
                <div className="mt-3">
                  <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-[#555555]">
                    Forward To
                  </p>
                  <input
                    type="tel"
                    value={forwardNumber}
                    onChange={(e) => setForwardNumber(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="w-full rounded-sm border border-[#e6dbc9] bg-white px-3 py-2 text-sm text-[#222222] placeholder-[#aaaaaa] outline-none transition-colors focus:border-[#c8a97e] focus:ring-1 focus:ring-[#c8a97e]/30"
                  />
                </div>
              )}
            </div>

            {/* IVR toggle */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#222222]">IVR Menu</p>
                <p className="text-xs text-[#888888]">Play an automated menu before routing</p>
              </div>
              <button
                type="button"
                onClick={() => setIvrEnabled((v) => !v)}
                className={`relative h-6 w-11 rounded-full transition-colors ${
                  ivrEnabled ? "bg-[#c8a97e]" : "bg-[#d9d4cc]"
                }`}
              >
                <span
                  className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
                    ivrEnabled ? "translate-x-5" : "translate-x-0.5"
                  }`}
                />
              </button>
            </div>
          </div>
        )}
      </div>

      {!loading && (
        <div className="border-t border-[#e6dbc9] px-5 py-4">
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="h-9 rounded-sm bg-[#c8a97e] px-5 text-sm font-medium text-white transition-colors hover:bg-[#b69468] disabled:opacity-50"
          >
            {saving ? "Saving…" : "Save Routing"}
          </button>
        </div>
      )}
    </section>
  )
}
