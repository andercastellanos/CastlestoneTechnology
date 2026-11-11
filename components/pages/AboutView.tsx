import Link from "next/link"
import Container from "@/components/shared/Container"
import { aboutContent, type AboutContent } from "@/content/en/about"
import { formatContactAddress, SITE_CONFIG } from "@/lib/constants"
import { hrefForLocale, type Locale } from "@/lib/i18n"
import { webDesignCities } from "@/lib/page-data/web-design-cities"

const buttonClass = "inline-flex min-h-12 items-center justify-center rounded-sm bg-[#80613a] px-6 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-[#634927]"
const linkClass = "font-medium text-[#80613a] underline underline-offset-4 transition-colors hover:text-[#c8a97e]"
const headingClass = "font-heading text-3xl font-bold text-[#222222] sm:text-4xl"

export default function AboutView({ content: copy = aboutContent, locale }: { content?: AboutContent; locale: Locale }) {
  return (
    <main>
      <section className="border-b border-[#e6dbc9] bg-[#f8f5ef] py-16 sm:py-24">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#80613a]">{copy.eyebrow}</p>
            <h1 className="font-heading mt-5 text-4xl font-bold leading-tight text-[#222222] sm:text-6xl">{copy.heading}</h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">{copy.introduction}</p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
              <Link href={hrefForLocale("/book-demo", locale)} className={buttonClass}>{copy.primaryLabel}</Link>
              <Link href={hrefForLocale("/services", locale)} className={linkClass}>{copy.secondaryLabel}</Link>
            </div>
          </div>
        </Container>
      </section>

      <div className="py-16 sm:py-20">
        <Container>
          <div className="space-y-14">
            <section aria-labelledby="who-we-are-heading">
              <h2 id="who-we-are-heading" className={headingClass}>{copy.whoHeading}</h2>
              <div className="mt-7 max-w-4xl space-y-4 leading-relaxed text-muted-foreground">
                {copy.whoParagraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            </section>

            <section aria-labelledby="business-growth-heading">
              <h2 id="business-growth-heading" className={headingClass}>{copy.growthHeading}</h2>
              <div className="mt-7 grid gap-6 md:grid-cols-2">
                {copy.growthCards.map((card) => (
                  <article key={card.href} className="rounded-lg border border-[#e6dbc9] bg-white p-6 sm:p-8">
                    <h3 className="font-heading text-2xl font-bold"><Link href={hrefForLocale(card.href, locale)} className={linkClass}>{card.title}</Link></h3>
                    <p className="mt-4 leading-relaxed text-muted-foreground">{card.description}</p>
                  </article>
                ))}
              </div>
            </section>

            <section aria-labelledby="how-we-work-heading">
              <h2 id="how-we-work-heading" className={headingClass}>{copy.howHeading}</h2>
              <ol className="mt-7 grid gap-6 lg:grid-cols-4">
                {copy.steps.map((step, index) => (
                  <li key={step.title} className="border-t border-[#e6dbc9] pt-6">
                    <span className="font-heading text-3xl font-bold text-[#c8a97e]" aria-hidden="true">{index + 1}.</span>
                    <h3 className="font-heading mt-4 text-2xl font-bold text-[#222222]">{step.title}</h3>
                    <p className="mt-4 leading-relaxed text-muted-foreground">{step.description}</p>
                  </li>
                ))}
              </ol>
            </section>

            <section aria-labelledby="standards-heading">
              <h2 id="standards-heading" className={headingClass}>{copy.standardsHeading}</h2>
              <div className="mt-7 grid gap-6 md:grid-cols-3">
                {copy.principles.map((principle) => (
                  <article key={principle.title} className="rounded-lg border border-[#e6dbc9] bg-white p-6 sm:p-8">
                    <h3 className="font-heading text-2xl font-bold text-[#222222]">{principle.title}</h3>
                    <p className="mt-4 leading-relaxed text-muted-foreground">{principle.description}</p>
                  </article>
                ))}
              </div>
            </section>

            <section aria-labelledby="location-heading">
              <h2 id="location-heading" className={headingClass}>{copy.locationHeading}</h2>
              <p className="mt-7 leading-relaxed text-muted-foreground">{copy.locationDescription}</p>
              <address className="mt-6 space-y-2 not-italic leading-relaxed text-muted-foreground">
                <p>{formatContactAddress()}</p>
                <p><a href={`tel:${SITE_CONFIG.contact.phone.e164}`} className={linkClass}>{SITE_CONFIG.contact.phone.display}</a></p>
                <p><a href={`mailto:${SITE_CONFIG.contact.email}`} className={`${linkClass} break-words`}>{SITE_CONFIG.contact.email}</a></p>
              </address>
              <div className="mt-8 flex flex-wrap items-baseline gap-x-5 gap-y-3 border-t border-[#e6dbc9] pt-6 text-sm">
                <p className="font-semibold text-[#222222]">{copy.cityHeading}</p>
                {webDesignCities.map((city) => <Link key={city.path} href={hrefForLocale(city.path, locale)} className={linkClass}>{locale === "es" && "esCity" in city ? city.esCity : city.city}</Link>)}
              </div>
            </section>
          </div>
        </Container>
      </div>

      <section className="border-t border-[#e6dbc9] bg-[#f8f5ef] py-16">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className={headingClass}>{copy.ctaHeading}</h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{copy.ctaDescription}</p>
            <Link href={hrefForLocale("/book-demo", locale)} className={`mt-7 ${buttonClass}`}>{copy.primaryLabel}</Link>
          </div>
        </Container>
      </section>
    </main>
  )
}
