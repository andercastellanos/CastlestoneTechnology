import { Fragment } from "react"
import Link from "next/link"
import { webDesignCityLinksContent as en } from "@/content/en/web-design-cities"
import { webDesignCityLinksContent as es } from "@/content/es/web-design-cities"
import { hrefForLocale, type Locale } from "@/lib/i18n"
import { webDesignCities } from "@/lib/page-data/web-design-cities"

function citiesExcept(locale: Locale, excludePath?: string) {
  return webDesignCities.filter((city) => city.path !== excludePath && hrefForLocale(city.path, locale) !== excludePath)
}

export default function WebDesignCityLinks({ locale, className, excludePath }: { locale: Locale; className: string; excludePath?: string }) {
  const copy = locale === "es" ? es : en
  return (
    <>
      {citiesExcept(locale, excludePath).map((city, index) => (
        <Fragment key={city.path}>
          {index > 0 ? ", " : null}
          <Link href={hrefForLocale(city.path, locale)} className={className}>{copy.linkTemplate.replace("{city}", (locale === "es" && "esCity" in city ? city.esCity : city.city))}</Link>
        </Fragment>
      ))}
    </>
  )
}

export function OtherWebDesignCities({ locale, currentPath, className }: { locale: Locale; currentPath: string; className: string }) {
  if (citiesExcept(locale, currentPath).length === 0) return null
  const copy = locale === "es" ? es : en
  return (
    <p className="mt-8 leading-relaxed text-muted-foreground">
      {copy.otherCities}:{" "}<WebDesignCityLinks locale={locale} className={className} excludePath={currentPath} />.
    </p>
  )
}
