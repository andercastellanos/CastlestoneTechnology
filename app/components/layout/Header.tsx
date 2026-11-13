"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import LanguageSwitcher from "@/components/layout/LanguageSwitcher"
import { twinOf, type Locale } from "@/lib/i18n"

const services = [
  { name: "Virtual Front Desk", esName: "Recepción virtual", href: "/services/virtual-front-desk" },
  { name: "Virtual Assistants", esName: "Asistentes virtuales", href: "/services/virtual-assistant" },
  { name: "Technology Solutions", esName: "Desarrollo de software", href: "/services/technology-solutions" },
  { name: "SMS & Email Marketing", esName: "Marketing por SMS y email", href: "/services/marketing-automation" },
  { name: "Web Design", esName: "Diseño web", href: "/services/web-design" },
  { name: "AI Receptionist", esName: "Recepcionista con IA", href: "/services/ai-receptionist" },
  { name: "AI Outbound Calling", esName: "Llamadas salientes con IA", href: "/services/ai-outbound-calling" },
  { name: "Local SEO", esName: "SEO local", href: "/services/local-seo" },
  { name: "Online Presence Setup", esName: "Presencia en línea", href: "/services/online-presence-setup" },
  { name: "All services", esName: "Todos los servicios", href: "/services" },
]

const navigationLabels = {
  en: {
    services: "Services",
    pricing: "Pricing",
    contact: "Contact",
    clientLogin: "Client Login",
    consultation: "Book a Free Consultation",
    openMenu: "Open navigation menu",
    closeMenu: "Close navigation menu",
  },
  es: {
    services: "Servicios",
    pricing: "Precios",
    contact: "Contacto",
    clientLogin: "Acceso clientes",
    consultation: "Agende una consulta gratis",
    openMenu: "Abrir menú de navegación",
    closeMenu: "Cerrar menú de navegación",
  },
}

export default function Header({ locale = "en" }: { locale?: Locale }) {
  const labels = navigationLabels[locale]
  const localizedHref = (href: string) => locale === "es" ? twinOf(href) ?? href : href
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
          href={localizedHref("/")}
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
              {labels.services}
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
                  href={localizedHref(item.href)}
                  className="block rounded-sm px-3 py-2 text-sm text-[#222222] transition-colors hover:bg-[#f8f5ef] hover:text-[#c8a97e]"
                >
                  {locale === "es" ? item.esName : item.name}
                </Link>
              ))}
            </div>
          </div>

          <Link
            href={localizedHref("/pricing")}
            className="text-sm font-medium tracking-wide text-[#222222] transition-colors hover:text-[#c8a97e]"
          >
            {labels.pricing}
          </Link>
          <Link
            href={localizedHref("/contact")}
            className="text-sm font-medium tracking-wide text-[#222222] transition-colors hover:text-[#c8a97e]"
          >
            {labels.contact}
          </Link>
          {locale === "es" && <Link href="/es/blog" className="text-sm font-medium tracking-wide text-[#222222] transition-colors hover:text-[#c8a97e]">Blog</Link>}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <LanguageSwitcher locale={locale} />
          <Link
            href="/client-login"
            className="inline-flex h-10 items-center justify-center rounded-sm border border-[#c8a97e] px-4 text-sm font-medium text-[#c8a97e] transition-colors hover:bg-[#c8a97e] hover:text-white"
          >
            {labels.clientLogin}
          </Link>
          <Link
            href={localizedHref("/book-demo")}
            className="inline-flex h-10 items-center justify-center rounded-sm bg-[#c8a97e] px-4 text-sm font-medium text-white transition-colors hover:bg-[#b69468]"
          >
            {labels.consultation}
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-[#e6dbc9] text-[#222222] transition-colors hover:text-[#c8a97e] md:hidden"
          aria-label={mobileMenuOpen ? labels.closeMenu : labels.openMenu}
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
              {labels.services}
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
                    href={localizedHref(item.href)}
                    onClick={closeMobileMenu}
                    className="py-2 text-sm text-[#555555] transition-colors hover:text-[#c8a97e]"
                  >
                    {locale === "es" ? item.esName : item.name}
                  </Link>
                ))}
              </div>
            ) : null}

            <Link
              href={localizedHref("/pricing")}
              onClick={closeMobileMenu}
              className="py-3 text-sm font-medium tracking-wide text-[#222222] transition-colors hover:text-[#c8a97e]"
            >
              {labels.pricing}
            </Link>
            <Link
              href={localizedHref("/contact")}
              onClick={closeMobileMenu}
              className="py-3 text-sm font-medium tracking-wide text-[#222222] transition-colors hover:text-[#c8a97e]"
            >
              {labels.contact}
            </Link>

            {locale === "es" && <Link href="/es/blog" onClick={closeMobileMenu} className="py-3 text-sm font-medium tracking-wide text-[#222222] transition-colors hover:text-[#c8a97e]">Blog</Link>}

            <div className="py-3">
              <LanguageSwitcher locale={locale} onNavigate={closeMobileMenu} />
            </div>

            <div className={locale === "es"
              ? "mt-3 grid grid-cols-1 gap-3 border-t border-[#e6dbc9] pt-4"
              : "mt-3 grid grid-cols-2 gap-3 border-t border-[#e6dbc9] pt-4"}>
              <Link
                href="/client-login"
                onClick={closeMobileMenu}
                className="inline-flex h-10 items-center justify-center rounded-sm border border-[#c8a97e] px-3 text-sm font-medium text-[#c8a97e] transition-colors hover:bg-[#c8a97e] hover:text-white"
              >
                {labels.clientLogin}
              </Link>
              <Link
                href={localizedHref("/book-demo")}
                onClick={closeMobileMenu}
                className="inline-flex h-10 items-center justify-center rounded-sm bg-[#c8a97e] px-3 text-sm font-medium text-white transition-colors hover:bg-[#b69468]"
              >
                {labels.consultation}
              </Link>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  )
}
