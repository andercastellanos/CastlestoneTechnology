"use client"

import { useState } from "react"

interface BusinessOption {
  id: string
  name: string
}

interface AvailableNumber {
  phoneNumber: string
  locality: string | null
  region: string | null
}

export default function ProvisionClient({
  businesses,
  initialBusinessId,
  initialBusinessName,
}: {
  businesses: BusinessOption[]
  initialBusinessId: string | null
  initialBusinessName: string | null
}) {
  const [businessId, setBusinessId] = useState<string>(initialBusinessId ?? "")
  const [areaCode, setAreaCode] = useState("")
  const [results, setResults] = useState<AvailableNumber[]>([])
  const [searching, setSearching] = useState(false)
  // The phoneNumber currently being purchased (null = none in flight).
  const [buying, setBuying] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [provisioned, setProvisioned] = useState<string | null>(null)

  const selectedName =
    initialBusinessName ??
    businesses.find((b) => b.id === businessId)?.name ??
    null

  async function search() {
    if (!/^\d{3}$/.test(areaCode)) {
      setError("Enter a 3-digit area code.")
      return
    }
    setError(null)
    setResults([])
    setSearching(true)
    try {
      const res = await fetch("/api/admin/provision/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ areaCode }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error ?? "Search failed.")
        return
      }
      setResults(data as AvailableNumber[])
      if ((data as AvailableNumber[]).length === 0) {
        setError("No numbers found for that area code.")
      }
    } catch {
      setError("Network error while searching.")
    } finally {
      setSearching(false)
    }
  }

  async function buy(phoneNumber: string) {
    if (!businessId) {
      setError("Select a business first.")
      return
    }
    setError(null)
    setBuying(phoneNumber)
    try {
      const res = await fetch("/api/admin/provision/buy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber, businessId }),
      })
      const data = await res.json()
      if (!res.ok || !data.success) {
        setError(data.error ?? "Provisioning failed.")
        return
      }
      setProvisioned(data.phoneNumber as string)
    } catch {
      setError("Network error while provisioning.")
    } finally {
      setBuying(null)
    }
  }

  // Success state — number assigned.
  if (provisioned) {
    return (
      <div className="mt-6 rounded-lg border border-emerald-200 bg-emerald-50 p-6">
        <p className="text-sm font-medium text-emerald-800">
          Number provisioned
        </p>
        <p className="mt-2 text-2xl font-semibold tracking-tight text-emerald-900">
          {provisioned}
        </p>
        <p className="mt-1 text-sm text-emerald-700">
          Assigned to {selectedName ?? "the selected business"} and wired to the
          voice + messaging webhooks.
        </p>
      </div>
    )
  }

  return (
    <div className="mt-6 max-w-2xl">
      {/* Business selection */}
      {initialBusinessId && selectedName ? (
        <p className="text-sm text-[#222222]">
          Provisioning number for:{" "}
          <span className="font-semibold">{selectedName}</span>
        </p>
      ) : (
        <label className="block">
          <span className="text-xs uppercase tracking-wide text-[#999999]">
            Business
          </span>
          <select
            value={businessId}
            onChange={(e) => setBusinessId(e.target.value)}
            className="mt-1 block w-full rounded-md border border-[#e6dbc9] bg-white px-3 py-2 text-sm text-[#222222] focus:border-[#c8a97e] focus:outline-none"
          >
            <option value="">Select a business…</option>
            {businesses.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </select>
        </label>
      )}

      {/* Area code search */}
      <div className="mt-5 flex items-end gap-3">
        <label className="block">
          <span className="text-xs uppercase tracking-wide text-[#999999]">
            Area code
          </span>
          <input
            type="text"
            inputMode="numeric"
            maxLength={3}
            value={areaCode}
            onChange={(e) =>
              setAreaCode(e.target.value.replace(/\D/g, "").slice(0, 3))
            }
            placeholder="305"
            className="mt-1 block w-28 rounded-md border border-[#e6dbc9] bg-white px-3 py-2 text-sm text-[#222222] focus:border-[#c8a97e] focus:outline-none"
          />
        </label>
        <button
          type="button"
          onClick={search}
          disabled={searching}
          className="rounded-md bg-[#c8a97e] px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#9a7b4f] disabled:opacity-50"
        >
          {searching ? "Searching…" : "Search Numbers"}
        </button>
      </div>

      {error && <p className="mt-3 text-sm text-rose-600">{error}</p>}

      {/* Results */}
      {results.length > 0 && (
        <ul className="mt-5 divide-y divide-[#f0e9dc] overflow-hidden rounded-lg border border-[#e6dbc9] bg-white shadow-sm">
          {results.map((n) => (
            <li
              key={n.phoneNumber}
              className="flex items-center justify-between gap-4 px-5 py-3"
            >
              <div>
                <p className="font-medium text-[#222222]">{n.phoneNumber}</p>
                <p className="text-xs text-[#777777]">
                  {[n.locality, n.region].filter(Boolean).join(", ") || "—"}
                </p>
              </div>
              <button
                type="button"
                onClick={() => buy(n.phoneNumber)}
                disabled={buying !== null || !businessId}
                className="rounded-md border border-[#c8a97e] px-3 py-1.5 text-sm font-medium text-[#9a7b4f] transition-colors hover:bg-[#c8a97e] hover:text-white disabled:opacity-50"
              >
                {buying === n.phoneNumber ? "Provisioning…" : "Provision"}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
