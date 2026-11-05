import { createAdminSupabaseClient } from "@/lib/supabase/server"
import ProvisionClient from "@/components/admin/ProvisionClient"

export const dynamic = "force-dynamic"

/**
 * Server wrapper (the "pass server-fetched list as a prop" option from the spec):
 * the businesses list needs the service-role client, which can't run in a client
 * component, so we fetch it here (behind the admin layout gate) and hand it to the
 * interactive client component.
 */
export default async function ProvisionPage({
  searchParams,
}: {
  searchParams: Promise<{ business_id?: string }>
}) {
  const { business_id } = await searchParams
  const supabase = createAdminSupabaseClient()

  const { data } = await supabase
    .from("businesses")
    .select("id, name")
    .order("name", { ascending: true })

  const businesses = (data ?? []) as { id: string; name: string }[]
  const selected = business_id
    ? businesses.find((b) => b.id === business_id) ?? null
    : null

  return (
    <div className="px-6 py-8 lg:px-10">
      <h1 className="text-3xl font-semibold tracking-tight text-[#222222] [font-family:var(--font-heading)]">
        Provision Number
      </h1>
      <p className="mt-1 text-sm text-[#777777]">
        Search for an available US number and assign it to a client.
      </p>

      <ProvisionClient
        businesses={businesses}
        initialBusinessId={selected?.id ?? business_id ?? null}
        initialBusinessName={selected?.name ?? null}
      />
    </div>
  )
}
