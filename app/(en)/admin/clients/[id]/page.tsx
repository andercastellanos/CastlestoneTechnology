import Link from "next/link"
import { notFound } from "next/navigation"
import { createAdminSupabaseClient } from "@/lib/supabase/server"
import type { Business, RoutingRule, User } from "@/lib/types"
import AddUserForm from "@/components/admin/AddUserForm"

export const dynamic = "force-dynamic"

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

const roleLabels: Record<string, string> = {
  owner: "Owner",
  assistant: "Assistant",
  va: "Assistant",
  admin: "Admin",
  castlestone_admin: "Platform admin",
}

const modeLabels: Record<string, string> = {
  assistant_first: "Assistant first",
  simultaneous: "Simultaneous ring",
  owner_only: "Owner only",
}

const afterHoursLabels: Record<string, string> = {
  voicemail: "Voicemail",
  forward: "Forward",
  message: "Auto message",
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

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wide text-[#999999]">{label}</p>
      <p className="mt-1 text-sm text-[#222222]">{value}</p>
    </div>
  )
}

export default async function AdminClientDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = createAdminSupabaseClient()

  // select("*") (not explicit columns) so a not-yet-migrated `twilio_number`
  // column can't crash this page — it simply reads as undefined → "Not provisioned".
  const { data: business } = await supabase
    .from("businesses")
    .select("*")
    .eq("id", id)
    .single()

  if (!business) notFound()
  const biz = business as Business

  const [usersRes, rulesRes, callsCountRes, conversationsCountRes] =
    await Promise.all([
      supabase
        .from("users")
        .select("id, name, email, role, status")
        .eq("business_id", id)
        .order("created_at", { ascending: true }),
      supabase
        .from("routing_rules")
        .select("mode, ring_timeout, after_hours_mode, forward_number")
        .eq("business_id", id)
        .maybeSingle(),
      supabase
        .from("calls")
        .select("*", { count: "exact", head: true })
        .eq("business_id", id),
      supabase
        .from("conversations")
        .select("*", { count: "exact", head: true })
        .eq("business_id", id),
    ])

  const team = (usersRes.data ?? []) as Pick<
    User,
    "id" | "name" | "email" | "role" | "status"
  >[]
  const rules = rulesRes.data as Pick<
    RoutingRule,
    "mode" | "ring_timeout" | "after_hours_mode" | "forward_number"
  > | null
  const totalCalls = callsCountRes.count ?? 0
  const totalConversations = conversationsCountRes.count ?? 0
  const provisioned = Boolean(biz.twilio_number)

  return (
    <div className="px-6 py-8 lg:px-10">
      <Link
        href="/admin/clients"
        className="text-sm text-[#c8a97e] transition-colors hover:text-[#9a7b4f]"
      >
        ← All clients
      </Link>

      {/* Header */}
      <div className="mt-3 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-4xl font-semibold tracking-tight text-[#222222] [font-family:var(--font-heading)]">
            {biz.name}
          </h1>
          <p className="mt-1 text-sm text-[#777777]">
            Created {formatDate(biz.created_at)}
            <span className="mx-2 text-[#cccccc]">·</span>
            {provisioned ? (
              <span className="font-medium text-[#555555]">
                {biz.twilio_number}
              </span>
            ) : (
              <span className="rounded-full bg-[#f0e9dc] px-2.5 py-0.5 text-xs font-medium text-[#9a7b4f]">
                Not provisioned
              </span>
            )}
          </p>
        </div>

        {!provisioned && (
          <Link
            href={`/admin/provision?business_id=${biz.id}`}
            className="rounded-md bg-[#c8a97e] px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#9a7b4f]"
          >
            Provision Number
          </Link>
        )}
      </div>

      {/* Stats */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:max-w-xl">
        <StatCard label="Total calls" value={totalCalls} />
        <StatCard label="Total conversations" value={totalConversations} />
      </div>

      {/* Team */}
      <section className="mt-8">
        <h2 className="text-2xl font-semibold tracking-tight text-[#222222] [font-family:var(--font-heading)]">
          Team
        </h2>
        <div className="mt-3 overflow-hidden rounded-lg border border-[#e6dbc9] bg-white shadow-sm">
          {team.length === 0 ? (
            <div className="px-6 py-12 text-center text-sm text-[#777777]">
              No team members yet.
            </div>
          ) : (
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-[#e6dbc9] text-xs uppercase tracking-wide text-[#999999]">
                  <th className="px-5 py-3 font-medium">Name</th>
                  <th className="px-5 py-3 font-medium">Email</th>
                  <th className="px-5 py-3 font-medium">Role</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {team.map((u) => (
                  <tr key={u.id} className="border-b border-[#f0e9dc] last:border-0">
                    <td className="px-5 py-3 font-medium text-[#222222]">
                      {u.name ?? "—"}
                    </td>
                    <td className="px-5 py-3 text-[#555555]">{u.email ?? "—"}</td>
                    <td className="px-5 py-3 text-[#555555]">
                      {roleLabels[u.role] ?? u.role}
                    </td>
                    <td className="px-5 py-3 text-[#555555]">{u.status ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Provision a new user (pending until they sign up with this email) */}
        <div className="mt-4">
          <AddUserForm businessId={id} />
        </div>
      </section>

      {/* Routing (read-only) */}
      <section className="mt-8">
        <h2 className="text-2xl font-semibold tracking-tight text-[#222222] [font-family:var(--font-heading)]">
          Routing
        </h2>
        <div className="mt-3 rounded-lg border border-[#e6dbc9] bg-white p-6 shadow-sm">
          {rules ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              <Field label="Mode" value={modeLabels[rules.mode] ?? rules.mode} />
              <Field
                label="Ring timeout"
                value={`${rules.ring_timeout}s`}
              />
              <Field
                label="After hours"
                value={
                  afterHoursLabels[rules.after_hours_mode] ??
                  rules.after_hours_mode
                }
              />
              <Field
                label="Fallback phone"
                value={rules.forward_number ?? "—"}
              />
            </div>
          ) : (
            <p className="text-sm text-[#777777]">
              No routing rules configured yet.
            </p>
          )}
        </div>
      </section>
    </div>
  )
}
