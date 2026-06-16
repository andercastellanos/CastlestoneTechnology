"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useUser, useClerk } from "@clerk/nextjs"
import { useState } from "react"
import {
  LayoutDashboard,
  Users,
  UserPlus,
  PhoneCall,
  Activity,
  Menu,
  X,
  LogOut,
} from "lucide-react"

const navLinks = [
  { label: "Overview", href: "/admin", icon: LayoutDashboard },
  { label: "Clients", href: "/admin/clients", icon: Users },
  { label: "Requests", href: "/admin/requests", icon: UserPlus },
  { label: "Provision Number", href: "/admin/provision", icon: PhoneCall },
  { label: "SLA Monitor", href: "/admin/sla", icon: Activity },
]

function isActive(pathname: string, href: string) {
  // Overview must match exactly, otherwise it lights up on every /admin/* route.
  if (href === "/admin") return pathname === "/admin"
  return pathname === href || pathname.startsWith(href + "/")
}

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname()
  const { user } = useUser()
  const { signOut } = useClerk()

  return (
    <div className="flex h-full flex-col bg-[#111111] text-white">
      {/* Logo + workspace label */}
      <div className="border-b border-white/10 px-5 py-5">
        <Link
          href="/admin"
          onClick={onNavigate}
          className="flex items-center gap-3 text-xl leading-none tracking-tight text-white transition-colors hover:text-[#c8a97e] [font-family:var(--font-heading)]"
        >
          <Image
            src="/logo.png"
            alt="Castlestone Technology"
            width={32}
            height={32}
            className="h-8 w-8 object-contain"
          />
          Admin
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-0.5 px-3 py-4">
        {navLinks.map(({ label, href, icon: Icon }) => {
          const active = isActive(pathname, href)
          return (
            <Link
              key={href}
              href={href}
              onClick={onNavigate}
              aria-current={active ? "page" : undefined}
              className={`flex items-center gap-3 rounded-sm px-3 py-2.5 text-sm font-medium transition-colors ${
                active
                  ? "bg-[#c8a97e]/15 text-[#c8a97e]"
                  : "text-[#cfcabf] hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon className={`h-4 w-4 shrink-0 ${active ? "text-[#c8a97e]" : ""}`} />
              {label}
            </Link>
          )
        })}
      </nav>

      {/* Switch to client portal */}
      <div className="border-t border-white/10 px-3 py-3">
        <Link
          href="/portal/inbox"
          onClick={onNavigate}
          className="flex items-center gap-2 rounded-sm px-3 py-2 text-xs text-[#888888] transition-colors hover:text-[#cfcabf]"
        >
          ← Client Portal
        </Link>
      </div>

      {/* User + sign out */}
      <div className="border-t border-white/10 px-4 py-4">
        <div className="mb-3 px-1">
          <p className="truncate text-sm font-medium text-white">
            {user?.fullName ?? user?.firstName ?? "Admin"}
          </p>
          <p className="truncate text-xs text-[#888888]">
            {user?.primaryEmailAddress?.emailAddress}
          </p>
        </div>
        <button
          type="button"
          onClick={() => signOut({ redirectUrl: "/" })}
          className="flex w-full items-center gap-2 rounded-sm px-3 py-2 text-sm text-[#cfcabf] transition-colors hover:bg-white/5 hover:text-white"
        >
          <LogOut className="h-4 w-4 shrink-0" />
          Sign out
        </button>
      </div>
    </div>
  )
}

export default function AdminSidebar() {
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden w-60 shrink-0 flex-col lg:flex">
        <SidebarContent />
      </aside>

      {/* Mobile top bar */}
      <div className="fixed inset-x-0 top-0 z-40 flex h-14 items-center bg-[#111111] px-4 lg:hidden">
        <button
          type="button"
          onClick={() => setDrawerOpen(true)}
          className="inline-flex h-9 w-9 items-center justify-center rounded-sm border border-white/15 text-white transition-colors hover:text-[#c8a97e]"
          aria-label="Open navigation menu"
        >
          <Menu className="h-4 w-4" />
        </button>
        <Link
          href="/admin"
          className="ml-3 text-lg leading-none tracking-tight text-white [font-family:var(--font-heading)]"
        >
          Admin
        </Link>
      </div>

      {/* Mobile drawer */}
      {drawerOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/40 lg:hidden"
            aria-hidden="true"
            onClick={() => setDrawerOpen(false)}
          />
          <aside className="fixed inset-y-0 left-0 z-50 w-64 shadow-xl lg:hidden">
            <div className="flex h-14 items-center justify-end bg-[#111111] px-4">
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-sm border border-white/15 text-white transition-colors hover:text-[#c8a97e]"
                aria-label="Close navigation menu"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <SidebarContent onNavigate={() => setDrawerOpen(false)} />
          </aside>
        </>
      )}
    </>
  )
}
