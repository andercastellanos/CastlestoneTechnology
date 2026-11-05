"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

/**
 * Polls the server component by calling router.refresh() on an interval. The
 * /account-pending server page re-runs reconcileUser() on each refresh, so the
 * instant this user's email is provisioned/linked, the page redirects them into
 * the dashboard — no manual reload, no "sign in again".
 */
export default function PendingAutoRefresh({
  intervalMs = 4000,
}: {
  intervalMs?: number
}) {
  const router = useRouter()
  useEffect(() => {
    const id = setInterval(() => router.refresh(), intervalMs)
    return () => clearInterval(id)
  }, [router, intervalMs])
  return null
}
