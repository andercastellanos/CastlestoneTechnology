import { createAdminSupabaseClient } from "@/lib/supabase/server"
import type { SignupRequest } from "@/lib/types"
import RequestActions from "@/components/admin/RequestActions"

export const dynamic = "force-dynamic"

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

// Tolerant of any stored status string (column is free-text); unknown → neutral.
function statusBadge(status: string) {
  const styles: Record<string, string> = {
    pending: "bg-amber-100 text-amber-800",
    approved: "bg-emerald-100 text-emerald-800",
    declined: "bg-rose-100 text-rose-700",
    denied: "bg-rose-100 text-rose-700",
  }
  return styles[status] ?? "bg-[#eee] text-[#666]"
}

export default async function AdminRequestsPage() {
  const supabase = createAdminSupabaseClient()

  const { data, error } = await supabase
    .from("signup_requests")
    .select("id, email, name, status, clerk_user_id, created_at")
    .order("created_at", { ascending: false })

  const requests = (data ?? []) as SignupRequest[]

  return (
    <div className="px-6 py-8 lg:px-10">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-[#222222] [font-family:var(--font-heading)]">
          Requests
        </h1>
        <p className="mt-1 text-sm text-[#777777]">
          Signups captured from the account-pending screen. Approve to provision a
          business + owner, or decline.
        </p>
      </div>

      {error ? (
        <div className="mt-6 rounded-lg border border-rose-200 bg-rose-50 px-6 py-5">
          <p className="text-sm font-medium text-rose-800">
            Couldn&apos;t load requests
          </p>
          <p className="mt-1 text-sm text-rose-700">{error.message}</p>
        </div>
      ) : (
        <div className="mt-6 overflow-hidden rounded-lg border border-[#e6dbc9] bg-white shadow-sm">
          {requests.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <p className="text-sm font-medium text-[#222222]">No requests yet</p>
              <p className="mt-1 text-sm text-[#777777]">
                Captured signups will appear here, newest first.
              </p>
            </div>
          ) : (
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-[#e6dbc9] text-xs uppercase tracking-wide text-[#999999]">
                  <th className="px-5 py-3 font-medium">Email</th>
                  <th className="px-5 py-3 font-medium">Name</th>
                  <th className="px-5 py-3 font-medium">Requested</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((req) => (
                  <tr
                    key={req.id}
                    className="border-b border-[#f0e9dc] last:border-0"
                  >
                    <td className="px-5 py-3 font-medium text-[#222222]">
                      {req.email}
                    </td>
                    <td className="px-5 py-3 text-[#555555]">
                      {req.name ?? "—"}
                    </td>
                    <td className="whitespace-nowrap px-5 py-3 text-[#555555]">
                      {formatDate(req.created_at)}
                    </td>
                    <td className="px-5 py-3">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium capitalize ${statusBadge(
                          req.status,
                        )}`}
                      >
                        {req.status}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-right">
                      {req.status === "pending" ? (
                        <RequestActions
                          requestId={req.id}
                          hasClerkId={Boolean(req.clerk_user_id)}
                        />
                      ) : (
                        <span className="text-[#bbbbbb]">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  )
}
