"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

const services = [
  { name: "Virtual Front Desk", href: "/services/virtual-front-desk" },
  { name: "Virtual Assistants", href: "/services/virtual-assistant" },
  { name: "Technology Solutions", href: "/services/technology-solutions" },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
    setMobileServicesOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-[#e6dbc9] bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-6 lg:px-10">
        <Link
          href="/"
          className="flex items-center gap-3 text-2xl leading-none tracking-tight text-[#222222] transition-colors hover:text-[#c8a97e] [font-family:var(--font-heading)] sm:text-3xl"
        >
          <Image
            src="/logo.png"
            alt="Castlestone Technology"
            width={52}
            height={52}
            className="h-[52px] w-[52px] object-contain"
            priority
          />
          Castlestone Technology
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <div className="group relative">
            <button
              type="button"
              className="inline-flex items-center gap-1 text-sm font-medium tracking-wide text-[#222222] transition-colors hover:text-[#c8a97e]"
              aria-haspopup="menu"
            >
              Services
              <svg
                className="h-4 w-4 transition-transform group-hover:translate-y-[1px]"
                viewBox="0 0 20 20"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M5 7.5L10 12.5L15 7.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <div className="invisible absolute left-0 top-full z-50 mt-3 w-56 translate-y-1 rounded-sm border border-[#e6dbc9] bg-white p-2 opacity-0 shadow-[0_14px_34px_rgba(0,0,0,0.08)] transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
              {services.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block rounded-sm px-3 py-2 text-sm text-[#222222] transition-colors hover:bg-[#f8f5ef] hover:text-[#c8a97e]"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          <Link
            href="/pricing"
            className="text-sm font-medium tracking-wide text-[#222222] transition-colors hover:text-[#c8a97e]"
          >
            Pricing
          </Link>
          <Link
            href="/contact"
            className="text-sm font-medium tracking-wide text-[#222222] transition-colors hover:text-[#c8a97e]"
          >
            Contact
          </Link>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/client-login"
            className="inline-flex h-10 items-center justify-center rounded-sm border border-[#c8a97e] px-4 text-sm font-medium text-[#c8a97e] transition-colors hover:bg-[#c8a97e] hover:text-white"
          >
            Client Login
          </Link>
          <Link
            href="/book-demo"
            className="inline-flex h-10 items-center justify-center rounded-sm bg-[#c8a97e] px-4 text-sm font-medium text-white transition-colors hover:bg-[#b69468]"
          >
            Book a Free Consultation
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-[#e6dbc9] text-[#222222] transition-colors hover:text-[#c8a97e] md:hidden"
          aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen((open) => !open)}
        >
          <span className="relative block h-4 w-5">
            <span
              className={`absolute left-0 top-0 block h-[1.5px] w-5 bg-current transition-transform duration-200 ${
                mobileMenuOpen ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-[7px] block h-[1.5px] w-5 bg-current transition-opacity duration-200 ${
                mobileMenuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 top-[14px] block h-[1.5px] w-5 bg-current transition-transform duration-200 ${
                mobileMenuOpen ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      {mobileMenuOpen ? (
        <div className="border-t border-[#e6dbc9] bg-white md:hidden">
          <nav className="mx-auto flex w-full max-w-7xl flex-col px-6 py-4">
            <button
              type="button"
              onClick={() => setMobileServicesOpen((open) => !open)}
              className="flex items-center justify-between py-3 text-left text-sm font-medium tracking-wide text-[#222222] transition-colors hover:text-[#c8a97e]"
              aria-expanded={mobileServicesOpen}
            >
              Services
              <svg
                className={`h-4 w-4 transition-transform ${
                  mobileServicesOpen ? "rotate-180" : ""
                }`}
                viewBox="0 0 20 20"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M5 7.5L10 12.5L15 7.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {mobileServicesOpen ? (
              <div className="mb-2 ml-3 flex flex-col border-l border-[#e6dbc9] pl-4">
                {services.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeMobileMenu}
                    className="py-2 text-sm text-[#555555] transition-colors hover:text-[#c8a97e]"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            ) : null}

            <Link
              href="/pricing"
              onClick={closeMobileMenu}
              className="py-3 text-sm font-medium tracking-wide text-[#222222] transition-colors hover:text-[#c8a97e]"
            >
              Pricing
            </Link>
            <Link
              href="/contact"
              onClick={closeMobileMenu}
              className="py-3 text-sm font-medium tracking-wide text-[#222222] transition-colors hover:text-[#c8a97e]"
            >
              Contact
            </Link>

            <div className="mt-3 grid grid-cols-2 gap-3 border-t border-[#e6dbc9] pt-4">
              <Link
                href="/client-login"
                onClick={closeMobileMenu}
                className="inline-flex h-10 items-center justify-center rounded-sm border border-[#c8a97e] px-3 text-sm font-medium text-[#c8a97e] transition-colors hover:bg-[#c8a97e] hover:text-white"
              >
                Client Login
              </Link>
              <Link
                href="/book-demo"
                onClick={closeMobileMenu}
                className="inline-flex h-10 items-center justify-center rounded-sm bg-[#c8a97e] px-3 text-sm font-medium text-white transition-colors hover:bg-[#b69468]"
              >
                Book a Free Consultation
              </Link>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  )
}
