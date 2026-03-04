"use client"

import { useState, useCallback } from "react"
import BusinessInfoSection from "@/components/portal/settings/BusinessInfoSection"
import CallRoutingSection from "@/components/portal/settings/CallRoutingSection"
import TeamMembersSection from "@/components/portal/settings/TeamMembersSection"

// ─── Toast ────────────────────────────────────────────────────────────────────

export interface ToastState {
  message: string
  type: "success" | "error"
  id: number
}

export default function SettingsPage() {
  const [toasts, setToasts] = useState<ToastState[]>([])

  const showToast = useCallback((message: string, type: "success" | "error") => {
    const id = Date.now()
    setToasts((prev) => [...prev, { message, type, id }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 4000)
  }, [])

  return (
    <div className="relative flex h-full flex-col overflow-hidden">
      {/* Page header */}
      <div className="flex items-center justify-between border-b border-[#e6dbc9] bg-white px-6 py-5">
        <h1 className="text-2xl font-semibold tracking-tight text-[#222222] [font-family:var(--font-heading)]">
          Settings
        </h1>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-3xl space-y-8 px-6 py-8">
          <BusinessInfoSection showToast={showToast} />
          <CallRoutingSection showToast={showToast} />
          <TeamMembersSection showToast={showToast} />
        </div>
      </div>

      {/* Toast stack */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`flex min-w-[260px] items-center gap-2 rounded-sm border px-4 py-3 text-sm shadow-lg transition-all ${
              t.type === "success"
                ? "border-green-200 bg-green-50 text-green-800"
                : "border-red-200 bg-red-50 text-red-700"
            }`}
          >
            <span className="font-medium">{t.type === "success" ? "✓" : "✕"}</span>
            {t.message}
          </div>
        ))}
      </div>
    </div>
  )
}
