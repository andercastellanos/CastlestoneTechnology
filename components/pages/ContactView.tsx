import ContactForm from "@/components/forms/ContactForm"
import Footer from "@/components/layout/Footer"
import Header from "@/components/layout/Header"
import type { ContactContent } from "@/content/types/contact"
import type { Locale } from "@/lib/i18n"
import { SITE_CONFIG } from "@/lib/constants"

export default function ContactView({ content, locale }: { content: ContactContent; locale: Locale }) {
  const copy = content
  return (
    <div className="min-h-screen bg-white">
      <Header locale={locale} />

      <main className="mx-auto w-full max-w-6xl px-6 pb-24 pt-20 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr]">
          <section>
            <h1 className="text-4xl leading-tight tracking-tight text-[#222222] [font-family:var(--font-heading)] sm:text-5xl">
              {copy.heading}
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-[#6b7280]">
              {copy.introduction}
            </p>

            <div className="mt-10 space-y-6">
              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-[#555555]">{copy.emailLabel}</p>
                <a
                  href={`mailto:${SITE_CONFIG.contact.email}`}
                  className="mt-2 inline-block text-base text-[#222222] transition-colors hover:text-[#c8a97e]"
                >
                  {copy.emailAddress}
                </a>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-[#555555]">{copy.phoneLabel}</p>
                <a
                  href={`tel:${SITE_CONFIG.contact.phone.e164}`}
                  className="mt-2 inline-block text-base text-[#222222] transition-colors hover:text-[#c8a97e]"
                >
                  {SITE_CONFIG.contact.phone.display}
                </a>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-[#555555]">{copy.locationLabel}</p>
                <p className="mt-2 text-base text-[#222222]">{copy.location}</p>
              </div>
            </div>
          </section>

          <ContactForm strings={content.form} locale={locale} />
        </div>
      </main>

      <Footer locale={locale} />
    </div>
  )
}
