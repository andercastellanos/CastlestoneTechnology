"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { switcherHref, type Locale } from "@/lib/i18n"

export default function LanguageSwitcher({
  locale,
  onNavigate,
}: {
  locale: Locale
  onNavigate?: () => void
}) {
  const pathname = usePathname() || "/"

  return (
    <div className="inline-flex items-center gap-2 text-sm text-[#222222]">
      {(["en", "es"] as const).map((target, index) => (
        <span key={target} className="inline-flex items-center gap-2">
          {index > 0 && <span aria-hidden="true">|</span>}
          {target === locale ? (
            <span aria-current="true" lang={target} className="font-bold text-[#c8a97e]">
              {target.toUpperCase()}
            </span>
          ) : (
            <Link
              href={switcherHref(pathname, target)}
              hrefLang={target}
              lang={target}
              prefetch={false}
              onClick={onNavigate}
              className="transition-colors hover:text-[#c8a97e]"
            >
              {target.toUpperCase()}
            </Link>
          )}
        </span>
      ))}
    </div>
  )
}
