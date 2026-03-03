import Image from "next/image"
import Link from "next/link"

const footerColumns = [
  {
    title: "Services",
    links: [
      { label: "Virtual Front Desk", href: "/services/virtual-front-desk" },
      { label: "Virtual Assistants", href: "/services/virtual-assistant" },
      { label: "Technology Solutions", href: "/services/technology-solutions" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "/blog" },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="border-t border-[#e6dbc9] bg-white">
      <div className="mx-auto w-full max-w-7xl px-6 py-14 lg:px-10">
        <Link
          href="/"
          className="flex items-center gap-3 text-3xl leading-none tracking-tight text-[#222222] transition-colors hover:text-[#c8a97e] [font-family:var(--font-heading)] sm:text-4xl"
        >
          <Image
            src="/logo.png"
            alt="Castlestone Technology"
            width={44}
            height={44}
            className="h-[44px] w-[44px] object-contain"
          />
          Castlestone Technology
        </Link>

        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {footerColumns.map((column) => (
            <div key={column.title}>
              <h3 className="text-xs uppercase tracking-[0.14em] text-[#555555]">
                {column.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-[#222222] transition-colors hover:text-[#c8a97e]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-[#e6dbc9] pt-6 text-sm text-[#555555] sm:flex-row sm:items-center sm:justify-between">
          <p>© 2025 Castlestone Technology. All rights reserved.</p>
          <p>Made in Miami, FL</p>
        </div>
      </div>
    </footer>
  )
}
