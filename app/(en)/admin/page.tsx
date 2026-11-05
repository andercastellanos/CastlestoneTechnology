import { createAdminSupabaseClient } from "@/lib/supabase/server"
import type { AdminStats, AdminRecentCall, CallStatus } from "@/lib/types"

export const dynamic = "force-dynamic"

/** UTC midnight today, as an ISO string for `created_at >= ...` filters. */
function startOfUtcTodayIso() {
  const now = new Date()
  return new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()),
  ).toISOString()
}

function formatDateTime(iso: string) {
  return new Date(iso).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  })
}

function formatDuration(seconds: number | null) {
  if (seconds === null || seconds < 0) return "—"
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${String(s).padStart(2, "0")}`
}

const statusStyles: Record<CallStatus, string> = {
  answered: "bg-emerald-50 text-emerald-700",
  missed: "bg-rose-50 text-rose-700",
  voicemail: "bg-amber-50 text-amber-700",
  in_progress: "bg-[#c8a97e]/15 text-[#9a7b4f]",
}

const statusLabels: Record<CallStatus, string> = {
  answered: "Answered",
  missed: "Missed",
  voicemail: "Voicemail",
  in_progress: "In progress",
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border border-[#e6dbc9] bg-white p-6 shadow-sm">
      <p className="text-sm font-medium text-[#777777]">{label}</p>
      <p className="mt-2 text-4xl font-semibold tracking-tight text-[#222222]">
        {value.toLocaleString()}
      </p>
      <span className="mt-3 inline-block h-1 w-10 rounded-full bg-[#c8a97e]" />
    </div>
  )
}

export default async function AdminOverviewPage() {
  const supabase = createAdminSupabaseClient()
  const todayIso = startOfUtcTodayIso()

  const [
    totalRes,
    activeRes,
    callsTodayRes,
    messagesTodayRes,
    recentCallsRes,
    businessesRes,
  ] = await Promise.all([
    supabase.from("businesses").select("*", { count: "exact", head: true }),
    // "Active" = on a paid plan. `plan` defaults to 'basic', so this counts
    // businesses that have upgraded past the free tier. See AdminStats.active_clients.
    supabase
      .from("businesses")
      .select("*", { count: "exact", head: true })
      .neq("plan", "basic"),
    supabase
      .from("calls")
      .select("*", { count: "exact", head: true })
      .gte("created_at", todayIso),
    supabase
      .from("messages")
      .select("*", { count: "exact", head: true })
      .gte("created_at", todayIso),
    supabase
      .from("calls")
      .select("id, created_at, from_number, status, duration, business_id")
      .order("created_at", { ascending: false })
      .limit(10),
    supabase.from("businesses").select("id, name"),
  ])

  const stats: AdminStats = {
    total_clients: totalRes.count ?? 0,
    active_clients: activeRes.count ?? 0,
    calls_today_platform: callsTodayRes.count ?? 0,
    messages_today_platform: messagesTodayRes.count ?? 0,
  }

  // In-memory join: map business_id → name, then enrich the recent calls.
  const businessNames = new Map<string, string>()
  for (const b of (businessesRes.data ?? []) as { id: string; name: string }[]) {
    businessNames.set(b.id, b.name)
  }

  type RawCall = {
    id: string
    created_at: string
    from_number: string | null
    status: CallStatus
    duration: number | null
    business_id: string
  }

  const recentCalls: AdminRecentCall[] = ((recentCallsRes.data ?? []) as RawCall[]).map(
    (c) => ({
      id: c.id,
      created_at: c.created_at,
      from_number: c.from_number,
      status: c.status,
      duration: c.duration,
      business_name: businessNames.get(c.business_id) ?? "Unknown",
    }),
  )

  return (
    <div className="px-6 py-8 lg:px-10">
      <h1 className="text-3xl font-semibold tracking-tight text-[#222222] [font-family:var(--font-heading)]">
        Platform Overview
      </h1>

      {/* Stat cards — 2x2 grid */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <StatCard label="Total clients" value={stats.total_clients} />
        <StatCard label="Active clients" value={stats.active_clients} />
        <StatCard label="Calls today (platform)" value={stats.calls_today_platform} />
        <StatCard
          label="Messages today (platform)"
          value={stats.messages_today_platform}
        />
      </div>

      {/* Recent activity */}
      <section className="mt-10">
        <h2 className="text-lg font-semibold text-[#222222]">Recent activity</h2>
        <p className="mt-1 text-sm text-[#777777]">
          Last 10 calls across all businesses.
        </p>

        <div className="mt-4 overflow-hidden rounded-lg border border-[#e6dbc9] bg-white shadow-sm">
          {recentCalls.length === 0 ? (
            <p className="px-6 py-10 text-center text-sm text-[#777777]">
              No calls yet.
            </p>
          ) : (
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-[#e6dbc9] text-xs uppercase tracking-wide text-[#999999]">
                  <th className="px-5 py-3 font-medium">Time</th>
                  <th className="px-5 py-3 font-medium">Business</th>
                  <th className="px-5 py-3 font-medium">From</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium">Duration</th>
                </tr>
              </thead>
              <tbody>
                {recentCalls.map((call) => (
                  <tr
                    key={call.id}
                    className="border-b border-[#f0e9dc] last:border-0"
                  >
                    <td className="whitespace-nowrap px-5 py-3 text-[#555555]">
                      {formatDateTime(call.created_at)}
                    </td>
                    <td className="px-5 py-3 font-medium text-[#222222]">
                      {call.business_name}
                    </td>
                    <td className="whitespace-nowrap px-5 py-3 text-[#555555]">
                      {call.from_number ?? "—"}
                    </td>
                    <td className="px-5 py-3">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[call.status]}`}
                      >
                        {statusLabels[call.status]}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-5 py-3 text-[#555555]">
                      {formatDuration(call.duration)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>
    </div>
  )
}
