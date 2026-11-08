import Link from "next/link"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import Container from "@/components/shared/Container"
import WebDesignCityLinks from "@/components/shared/WebDesignCityLinks"
import type { ServicesHubContent } from "@/content/en/services-hub"
import { servicesFor } from "@/lib/page-data/service-catalog"
import { alternatesFor, hrefForLocale, type Locale } from "@/lib/i18n"

export default function ServicesHubView({ content: copy, locale }: { content: ServicesHubContent; locale: Locale }) {
  const services = servicesFor(locale)
  const list = {
    "@context": "https://schema.org", "@type": "ItemList",
    "@id": `${alternatesFor(copy.path).canonical}#services`, name: copy.heading,
    url: alternatesFor(copy.path).canonical,
    itemListElement: services.map((service, index) => ({ "@type": "ListItem", position: index + 1, name: service.name, url: alternatesFor(service.href).canonical })),
  }
  return (
    <>
      <Header locale={locale} />
      <main>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(list).replace(/</g, "\\u003c") }} />
        <section className="border-b border-[#e6dbc9] bg-[#f8f5ef] py-16 sm:py-24"><Container><div className="mx-auto max-w-4xl text-center">
          <h1 className="font-heading text-4xl font-bold leading-tight text-[#222222] sm:text-6xl">{copy.heading}</h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">{copy.introduction}</p>
        </div></Container></section>
        <div className="py-16 sm:py-20"><Container><div className="space-y-14">
          {(Object.keys(copy.groups) as Array<keyof typeof copy.groups>).map((group) => <section key={group} data-service-group={group}>
            <h2 className="font-heading text-3xl font-bold text-[#222222] sm:text-4xl">{copy.groups[group]}</h2>
            <div className="mt-7 grid gap-6 lg:grid-cols-3">
              {services.filter((service) => service.group === group).map((service) => <article key={service.path} data-service-card className="rounded-lg border border-[#e6dbc9] bg-white p-6 sm:p-8">
                <h3 className="font-heading text-2xl font-bold"><Link href={service.href} className="text-[#80613a] underline underline-offset-4 hover:text-foreground">{service.name}</Link></h3>
                {service.inDevelopment && <p className="mt-4 inline-block rounded-sm border border-[#c8a97e] bg-[#f8f5ef] px-3 py-1 text-sm font-semibold text-[#80613a]">{copy.developmentLabel}</p>}
                <p className="mt-4 leading-relaxed text-muted-foreground">{service.description}</p>
              </article>)}
            </div>
          </section>)}
          <p className="border-t border-[#e6dbc9] pt-8 leading-relaxed text-muted-foreground"><span className="font-semibold text-[#222222]">{copy.cityHeading}:</span>{" "}<WebDesignCityLinks locale={locale} className="font-medium text-[#80613a] underline underline-offset-4 hover:text-foreground" />.</p>
        </div></Container></div>
        <section className="border-t border-[#e6dbc9] bg-[#f8f5ef] py-16"><Container><div className="mx-auto max-w-3xl text-center">
          <h2 className="font-heading text-3xl font-bold text-[#222222] sm:text-4xl">{copy.ctaHeading}</h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{copy.ctaDescription}</p>
          <Link href={hrefForLocale("/book-demo", locale)} className="mt-7 inline-flex min-h-12 items-center justify-center rounded-sm bg-[#80613a] px-6 py-3 text-center text-sm font-semibold text-white hover:bg-[#634927]">{copy.ctaLabel}</Link>
        </div></Container></section>
      </main>
      <Footer locale={locale} />
    </>
  )
}
