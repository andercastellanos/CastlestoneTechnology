"use client"

import { useEffect, useState } from "react"
import type { Business, BusinessHours } from "@/lib/types"
import type { ToastState } from "@/components/portal/SettingsPage"

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

const DEFAULT_HOURS: BusinessHours[] = DAYS.map((_, day) => ({
  day,
  open: day >= 1 && day <= 5,
  start: "09:00",
  end: "17:00",
}))

const TIMEZONES = [
  "America/New_York",
  "America/Chicago",
  "America/Denver",
  "America/Los_Angeles",
  "America/Phoenix",
  "America/Anchorage",
  "Pacific/Honolulu",
  "UTC",
]

// ─── Shared input / label styles ──────────────────────────────────────────────

const inputCls =
  "w-full rounded-sm border border-[#e6dbc9] bg-white px-3 py-2 text-sm text-[#222222] placeholder-[#aaaaaa] outline-none transition-colors focus:border-[#c8a97e] focus:ring-1 focus:ring-[#c8a97e]/30"

const labelCls = "mb-1 block text-[11px] font-semibold uppercase tracking-wide text-[#555555]"

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function Skeleton() {
  return (
    <div className="animate-pulse space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="space-y-1">
          <div className="h-3 w-20 rounded bg-[#ede9e0]" />
          <div className="h-9 rounded-sm bg-[#ede9e0]" />
        </div>
      ))}
    </div>
  )
}

// ─── Component ────────────────────────────────────────────────────────────────

interface Props {
  showToast: (message: string, type: ToastState["type"]) => void
}

export default function BusinessInfoSection({ showToast }: Props) {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [timezone, setTimezone] = useState("America/New_York")
  const [voicemailEnabled, setVoicemailEnabled] = useState(true)
  const [hours, setHours] = useState<BusinessHours[]>(DEFAULT_HOURS)

  useEffect(() => {
    fetch("/api/portal/settings")
      .then((r) => r.json())
      .then((data: { business?: Business }) => {
        if (data.business) {
          const b = data.business
          setName(b.name ?? "")
          setPhone(b.phone ?? "")
          setTimezone(b.timezone ?? "America/New_York")
          setVoicemailEnabled(b.voicemail_enabled ?? true)
          setHours(
            b.business_hours?.length ? b.business_hours : DEFAULT_HOURS,
          )
        }
      })
      .catch(() => {/* stub returns 200, ignore errors */})
      .finally(() => setLoading(false))
  }, [])

  function toggleDay(day: number) {
    setHours((prev) =>
      prev.map((h) => (h.day === day ? { ...h, open: !h.open } : h)),
    )
  }

  function updateHour(day: number, field: "start" | "end", value: string) {
    setHours((prev) =>
      prev.map((h) => (h.day === day ? { ...h, [field]: value } : h)),
    )
  }

  async function handleSave() {
    setSaving(true)
    try {
      const res = await fetch("/api/portal/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, timezone, voicemail_enabled: voicemailEnabled, business_hours: hours }),
      })
      if (!res.ok) throw new Error("Failed to save")
      showToast("Business info saved", "success")
    } catch {
      showToast("Failed to save business info", "error")
    } finally {
      setSaving(false)
    }
  }

  return (
    <section className="rounded-sm border border-[#e6dbc9] bg-white">
      <div className="border-b border-[#e6dbc9] px-5 py-4">
        <h2 className="text-base font-semibold text-[#222222] [font-family:var(--font-heading)]">
          Business Info
        </h2>
        <p className="mt-0.5 text-xs text-[#888888]">
          Basic details and operating hours for your business.
        </p>
      </div>

      <div className="px-5 py-5">
        {loading ? (
          <Skeleton />
        ) : (
          <div className="space-y-5">
            {/* Name */}
            <div>
              <label className={labelCls}>Business Name</label>
              <input
                className={inputCls}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Castlestone Technology"
              />
            </div>

            {/* Phone */}
            <div>
              <label className={labelCls}>Business Phone</label>
              <input
                className={inputCls}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 (555) 000-0000"
                type="tel"
              />
            </div>

            {/* Timezone */}
            <div>
              <label className={labelCls}>Timezone</label>
              <select
                className={inputCls}
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
              >
                {TIMEZONES.map((tz) => (
                  <option key={tz} value={tz}>
                    {tz.replace("_", " ")}
                  </option>
                ))}
              </select>
            </div>

            {/* Voicemail toggle */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#222222]">Voicemail</p>
                <p className="text-xs text-[#888888]">Accept voicemail when unavailable</p>
              </div>
              <button
                type="button"
                onClick={() => setVoicemailEnabled((v) => !v)}
                className={`relative h-6 w-11 rounded-full transition-colors ${
                  voicemailEnabled ? "bg-[#c8a97e]" : "bg-[#d9d4cc]"
                }`}
              >
                <span
                  className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
                    voicemailEnabled ? "translate-x-5" : "translate-x-0.5"
                  }`}
                />
              </button>
            </div>

            {/* Business hours */}
            <div>
              <label className={labelCls}>Business Hours</label>
              <div className="space-y-2">
                {hours.map((h) => (
                  <div key={h.day} className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => toggleDay(h.day)}
                      className={`flex h-7 w-12 flex-shrink-0 items-center justify-center rounded-sm border text-[11px] font-semibold transition-colors ${
                        h.open
                          ? "border-[#c8a97e] bg-[#fdf5e8] text-[#c8a97e]"
                          : "border-[#e6dbc9] bg-white text-[#aaaaaa]"
                      }`}
                    >
                      {DAYS[h.day]}
                    </button>
                    {h.open ? (
                      <div className="flex flex-1 items-center gap-2">
                        <input
                          type="time"
                          value={h.start}
                          onChange={(e) => updateHour(h.day, "start", e.target.value)}
                          className="rounded-sm border border-[#e6dbc9] px-2 py-1 text-xs text-[#222222] outline-none focus:border-[#c8a97e]"
                        />
                        <span className="text-xs text-[#aaaaaa]">–</span>
                        <input
                          type="time"
                          value={h.end}
                          onChange={(e) => updateHour(h.day, "end", e.target.value)}
                          className="rounded-sm border border-[#e6dbc9] px-2 py-1 text-xs text-[#222222] outline-none focus:border-[#c8a97e]"
                        />
                      </div>
                    ) : (
                      <span className="text-xs text-[#aaaaaa]">Closed</span>
                    )}
                  </div>
                ))}
              </div>
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
            {saving ? "Saving…" : "Save Business Info"}
          </button>
        </div>
      )}
    </section>
  )
}
