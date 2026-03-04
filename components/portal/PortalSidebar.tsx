"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useUser, useClerk } from "@clerk/nextjs"
import { useState } from "react"
import { Inbox, Phone, Users, Settings, Menu, X, LogOut } from "lucide-react"

const navLinks = [
  { label: "Inbox", href: "/portal/inbox", icon: Inbox },
  { label: "Calls", href: "/portal/calls", icon: Phone },
  { label: "Contacts", href: "/portal/contacts", icon: Users },
  { label: "Settings", href: "/portal/settings", icon: Settings },
]

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname()
  const { user } = useUser()
  const { signOut } = useClerk()

  return (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="border-b border-[#e6dbc9] px-5 py-5">
        <Link
          href="/portal/inbox"
          onClick={onNavigate}
          className="flex items-center gap-3 text-xl leading-none tracking-tight text-[#222222] transition-colors hover:text-[#c8a97e] [font-family:var(--font-heading)]"
        >
          <Image
            src="/logo.png"
            alt="Castlestone Technology"
            width={32}
            height={32}
            className="h-8 w-8 object-contain"
          />
          Castlestone
        </Link>
      </div>

      {/* Nav links */}
      <nav className="flex-1 space-y-0.5 px-3 py-4">
        {navLinks.map(({ label, href, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/")
          return (
            <Link
              key={href}
              href={href}
              onClick={onNavigate}
              className={`flex items-center gap-3 rounded-sm px-3 py-2.5 text-sm font-medium transition-colors ${
                active
                  ? "bg-[#f8f5ef] text-[#c8a97e]"
                  : "text-[#555555] hover:bg-[#f8f5ef] hover:text-[#222222]"
              }`}
            >
              <Icon
                className={`h-4 w-4 shrink-0 ${active ? "text-[#c8a97e]" : ""}`}
              />
              {label}
            </Link>
          )
        })}
      </nav>

      {/* User + sign out */}
      <div className="border-t border-[#e6dbc9] px-4 py-4">
        <div className="mb-3 px-1">
          <p className="truncate text-sm font-medium text-[#222222]">
            {user?.fullName ?? user?.firstName ?? "Client"}
          </p>
          <p className="truncate text-xs text-[#555555]">
            {user?.primaryEmailAddress?.emailAddress}
          </p>
        </div>
        <button
          type="button"
          onClick={() => signOut({ redirectUrl: "/" })}
          className="flex w-full items-center gap-2 rounded-sm px-3 py-2 text-sm text-[#555555] transition-colors hover:bg-[#f8f5ef] hover:text-[#222222]"
        >
          <LogOut className="h-4 w-4 shrink-0" />
          Sign out
        </button>
      </div>
    </div>
  )
}

export default function PortalSidebar() {
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden w-60 shrink-0 flex-col border-r border-[#e6dbc9] bg-white lg:flex">
        <SidebarContent />
      </aside>

      {/* Mobile: top bar with hamburger */}
      <div className="fixed inset-x-0 top-0 z-40 flex h-14 items-center border-b border-[#e6dbc9] bg-white px-4 lg:hidden">
        <button
          type="button"
          onClick={() => setDrawerOpen(true)}
          className="inline-flex h-9 w-9 items-center justify-center rounded-sm border border-[#e6dbc9] text-[#222222] transition-colors hover:text-[#c8a97e]"
          aria-label="Open navigation menu"
        >
          <Menu className="h-4 w-4" />
        </button>
        <Link
          href="/portal/inbox"
          className="ml-3 flex items-center gap-2 text-lg leading-none tracking-tight text-[#222222] [font-family:var(--font-heading)]"
        >
          <Image
            src="/logo.png"
            alt="Castlestone Technology"
            width={28}
            height={28}
            className="h-7 w-7 object-contain"
          />
          Castlestone
        </Link>
      </div>

      {/* Mobile: drawer overlay + panel */}
      {drawerOpen ? (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/25 lg:hidden"
            aria-hidden="true"
            onClick={() => setDrawerOpen(false)}
          />
          <aside className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl lg:hidden">
            <div className="flex h-14 items-center justify-end border-b border-[#e6dbc9] px-4">
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-sm border border-[#e6dbc9] text-[#222222] transition-colors hover:text-[#c8a97e]"
                aria-label="Close navigation menu"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <SidebarContent onNavigate={() => setDrawerOpen(false)} />
          </aside>
        </>
      ) : null}
    </>
  )
}
