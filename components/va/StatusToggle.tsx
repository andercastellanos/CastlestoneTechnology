"use client"

import { useEffect, useState } from "react"
import { Phone, MessageSquare, Clock } from "lucide-react"
import type { UserStatus } from "@/lib/types"

interface TodayStats {
  calls_handled: number
  conversations_replied: number
  avg_response_time: number | null  // seconds
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function StatusToggle() {
  const [status, setStatus] = useState<UserStatus>("offline")
  const [saving, setSaving] = useState(false)
  const [stats, setStats] = useState<TodayStats | null>(null)
  const [loadingStats, setLoadingStats] = useState(true)
  const [now, setNow] = useState(new Date())

  // Live clock — tick every second
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  // Load current status + today's stats
  useEffect(() => {
    fetch("/api/va/status")
      .then((r) => r.json())
      .then((data: { status?: UserStatus; stats?: TodayStats }) => {
        if (data.status) setStatus(data.status)
        if (data.stats) setStats(data.stats)
      })
      .catch(() => {/* stub */})
      .finally(() => setLoadingStats(false))
  }, [])

  async function handleToggle() {
    if (status === "on_call") return  // read-only — system controlled
    const next: UserStatus = status === "online" ? "offline" : "online"
    setSaving(true)
    try {
      await fetch("/api/va/status", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: next }),
      })
      setStatus(next)
    } catch {
      // fail silently
    } finally {
      setSaving(false)
    }
  }

  // ── Derived display values ────────────────────────────────────────────────
  const isOnCall = status === "on_call"
  const isOnline = status === "online"

  const statusLabel = isOnCall ? "On Call" : isOnline ? "Online" : "Offline"
  const statusDot = isOnCall
    ? "bg-blue-500"
    : isOnline
      ? "bg-green-500"
      : "bg-[#d9d4cc]"
  const statusBannerCls = isOnCall
    ? "border-blue-200 bg-blue-50 text-blue-800"
    : isOnline
      ? "border-green-200 bg-green-50 text-green-800"
      : "border-[#e6dbc9] bg-[#faf8f5] text-[#555555]"

  return (
    <div className="flex h-full flex-col overflow-hidden">
      {/* Header */}
      <div className="border-b border-[#e6dbc9] bg-white px-6 py-5">
        <h1 className="text-2xl font-semibold tracking-tight text-[#222222] [font-family:var(--font-heading)]">
          My Status
        </h1>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-sm space-y-6 px-6 py-8">

          {/* Current status banner */}
          <div className={`rounded-sm border px-5 py-4 ${statusBannerCls}`}>
            <div className="flex items-center gap-2">
              <span className={`h-3 w-3 rounded-full ${statusDot} ${isOnline || isOnCall ? "animate-pulse" : ""}`} />
              <span className="text-lg font-semibold">{statusLabel}</span>
            </div>
            {isOnCall && (
              <p className="mt-1 text-sm opacity-80">
                You&apos;re on an active call. Status will update automatically.
              </p>
            )}
          </div>

          {/* Big ONLINE / OFFLINE toggle */}
          {!isOnCall && (
            <button
              type="button"
              onClick={handleToggle}
              disabled={saving}
              className={`relative flex w-full items-center justify-between rounded-sm border px-6 py-5 text-left transition-all disabled:opacity-60 ${
                isOnline
                  ? "border-green-300 bg-green-50 hover:bg-green-100"
                  : "border-[#e6dbc9] bg-white hover:border-[#c8a97e]/40"
              }`}
            >
              <div>
                <p className={`text-xl font-semibold ${isOnline ? "text-green-800" : "text-[#555555]"}`}>
                  {isOnline ? "Go Offline" : "Go Online"}
                </p>
                <p className={`mt-0.5 text-xs ${isOnline ? "text-green-600" : "text-[#aaaaaa]"}`}>
                  {isOnline
                    ? "You are currently receiving calls"
                    : "Calls are not routing to you"}
                </p>
              </div>
              {/* Toggle pill */}
              <div
                className={`relative h-7 w-14 rounded-full transition-colors ${
                  isOnline ? "bg-green-500" : "bg-[#d9d4cc]"
                }`}
              >
                <span
                  className={`absolute top-0.5 h-6 w-6 rounded-full bg-white shadow-sm transition-transform ${
                    isOnline ? "translate-x-7" : "translate-x-0.5"
                  }`}
                />
              </div>
            </button>
          )}

          {/* Reminder */}
          {isOnline && (
            <p className="rounded-sm border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-700">
              <span className="font-semibold">Reminder:</span> Set yourself Offline when your shift
              ends so calls route correctly to other available agents.
            </p>
          )}

          {/* Shift info */}
          <div className="rounded-sm border border-[#e6dbc9] bg-white px-5 py-4">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-wide text-[#555555]">
              Shift Info
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-[#888888]">Today</span>
                <span className="font-medium text-[#222222]">
                  {now.toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#888888]">Current time</span>
                <span className="font-medium tabular-nums text-[#222222]">
                  {now.toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "2-digit",
                    second: "2-digit",
                  })}
                </span>
              </div>
            </div>
          </div>

          {/* Today's stats */}
          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-wide text-[#555555]">
              Today&apos;s Activity
            </p>
            {loadingStats ? (
              <div className="animate-pulse space-y-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-14 rounded-sm bg-[#ede9e0]" />
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex items-center justify-between rounded-sm border border-[#e6dbc9] bg-white px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Phone className="h-3.5 w-3.5 text-[#c8a97e]" />
                    <span className="text-sm text-[#555555]">Calls handled</span>
                  </div>
                  <span className="text-lg font-semibold text-[#222222]">
                    {stats?.calls_handled ?? 0}
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-sm border border-[#e6dbc9] bg-white px-4 py-3">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-3.5 w-3.5 text-[#c8a97e]" />
                    <span className="text-sm text-[#555555]">Conversations replied</span>
                  </div>
                  <span className="text-lg font-semibold text-[#222222]">
                    {stats?.conversations_replied ?? 0}
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-sm border border-[#e6dbc9] bg-white px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Clock className="h-3.5 w-3.5 text-[#c8a97e]" />
                    <span className="text-sm text-[#555555]">Avg response</span>
                  </div>
                  <span className="text-lg font-semibold text-[#222222]">
                    {stats?.avg_response_time != null
                      ? `${Math.round(stats.avg_response_time / 60)}m`
                      : "—"}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
