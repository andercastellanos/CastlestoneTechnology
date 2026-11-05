import Link from "next/link"
import { createAdminSupabaseClient } from "@/lib/supabase/server"
import type { AdminClientRow } from "@/lib/types"
import NewClientButton from "@/components/admin/NewClientButton"

export const dynamic = "force-dynamic"

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

export default async function AdminClientsPage() {
  const supabase = createAdminSupabaseClient()

  const [businessesRes, ownersRes] = await Promise.all([
    supabase
      .from("businesses")
      .select("id, name, plan, twilio_number, created_at")
      .order("created_at", { ascending: false }),
    supabase.from("users").select("business_id, email").eq("role", "owner"),
  ])

  // In-memory join: first owner email per business.
  const ownerEmails = new Map<string, string | null>()
  for (const u of (ownersRes.data ?? []) as {
    business_id: string
    email: string | null
  }[]) {
    if (!ownerEmails.has(u.business_id)) {
      ownerEmails.set(u.business_id, u.email)
    }
  }

  type RawBusiness = {
    id: string
    name: string
    plan: string | null
    twilio_number: string | null
    created_at: string
  }

  const clients: AdminClientRow[] = ((businessesRes.data ?? []) as RawBusiness[]).map(
    (b) => ({
      id: b.id,
      name: b.name,
      plan: b.plan,
      twilio_number: b.twilio_number,
      created_at: b.created_at,
      owner_email: ownerEmails.get(b.id) ?? null,
    }),
  )

  return (
    <div className="px-6 py-8 lg:px-10">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-[#222222] [font-family:var(--font-heading)]">
            Clients
          </h1>
          <p className="mt-1 text-sm text-[#777777]">
            {clients.length} {clients.length === 1 ? "business" : "businesses"} on the
            platform.
          </p>
        </div>
        <NewClientButton />
      </div>

      <div className="mt-6 overflow-hidden rounded-lg border border-[#e6dbc9] bg-white shadow-sm">
        {clients.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <p className="text-sm font-medium text-[#222222]">No clients yet</p>
            <p className="mt-1 text-sm text-[#777777]">
              New businesses will appear here once they sign up.
            </p>
          </div>
        ) : (
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-[#e6dbc9] text-xs uppercase tracking-wide text-[#999999]">
                <th className="px-5 py-3 font-medium">Business</th>
                <th className="px-5 py-3 font-medium">Owner email</th>
                <th className="px-5 py-3 font-medium">Plan</th>
                <th className="px-5 py-3 font-medium">Twilio number</th>
                <th className="px-5 py-3 font-medium">Created</th>
                <th className="px-5 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <tr
                  key={client.id}
                  className="border-b border-[#f0e9dc] last:border-0"
                >
                  <td className="px-5 py-3 font-medium text-[#222222]">
                    {client.name}
                  </td>
                  <td className="px-5 py-3 text-[#555555]">
                    {client.owner_email ?? "—"}
                  </td>
                  <td className="px-5 py-3">
                    <span className="inline-flex rounded-full bg-[#c8a97e]/15 px-2.5 py-1 text-xs font-medium capitalize text-[#9a7b4f]">
                      {client.plan ?? "basic"}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-5 py-3 text-[#555555]">
                    {client.twilio_number ?? (
                      <span className="text-[#999999]">Not provisioned</span>
                    )}
                  </td>
                  <td className="whitespace-nowrap px-5 py-3 text-[#555555]">
                    {formatDate(client.created_at)}
                  </td>
                  <td className="px-5 py-3 text-right">
                    <Link
                      href={`/admin/clients/${client.id}`}
                      className="font-medium text-[#c8a97e] transition-colors hover:text-[#9a7b4f]"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
