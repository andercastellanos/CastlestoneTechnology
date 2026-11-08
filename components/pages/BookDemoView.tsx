import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import Container from "@/components/shared/Container"
import ContactForm from "@/components/forms/ContactForm"
import type { BookDemoContent } from "@/content/types/book-demo"
import type { ContactFormStrings } from "@/content/types/contact-form"
import type { Locale } from "@/lib/i18n"
import { getGoogleBookingLinks } from "@/lib/booking"
import { resolveContent } from "@/lib/content"
import { bookDemoNumbers } from "@/lib/page-data/book-demo"

export default async function BookDemoView({ content, formStrings, locale }: { content: BookDemoContent; formStrings: ContactFormStrings; locale: Locale }) {
  const copy = resolveContent(content, bookDemoNumbers)
  const benefits = [copy.benefit1, copy.benefit2, copy.benefit3, copy.benefit4]
  const trustSignals = [
    { emoji: "🔒", text: copy.trustCommitment },
    { emoji: "⚡", text: copy.trustResponse },
    { emoji: "🌎", text: copy.trustCoverage },
  ]
  const booking = await getGoogleBookingLinks(process.env.NEXT_PUBLIC_BOOKING_URL)
  return (
    <>
      <Header locale={locale} />
      <main>
        {/* Hero */}
        <section className="bg-muted/50 py-16">
          <Container>
            <div className="text-center">
              <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl">
                {copy.heading}
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
                {copy.introduction}
              </p>
            </div>
          </Container>
        </section>

        {/* Booking Section */}
        <section className="bg-background py-20">
          <Container>
            <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:items-start">
              {/* Left — What to expect */}
              <div className="rounded-lg border border-[#c8a97e]/30 bg-white p-8 shadow-sm">
                <h2 className="font-heading text-2xl font-bold mb-6">{copy.benefitsHeading}</h2>
                <ul className="space-y-4 mb-8">
                  {benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-3">
                      <span className="text-primary font-bold mt-0.5">✓</span>
                      <span className="text-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>
                <div className="border-t border-border pt-6 space-y-3">
                  {trustSignals.map((signal) => (
                    <p key={signal.text} className="text-sm text-muted-foreground">
                      {signal.emoji} {signal.text}
                    </p>
                  ))}
                </div>
              </div>

              {/* Right — Appointment booking */}
              <div className="min-w-0">
                <div className="min-w-0 space-y-6">
                  {booking && (
                    <div className="space-y-3">
                      <p className="leading-relaxed text-muted-foreground">
                        {copy.bookingIntroduction}
                      </p>
                      <a
                        href={booking.bookingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-11 items-center rounded-sm border border-[#c8a97e] px-5 py-2 text-sm font-medium text-foreground transition-colors hover:bg-[#c8a97e]/10"
                      >
                        {copy.bookingLink}
                      </a>
                    </div>
                  )}

                  {booking?.embedUrl ? (
                    <iframe
                      src={booking.embedUrl}
                      title={copy.iframeTitle}
                      className="h-[1200px] w-full rounded-lg border-0 sm:h-[700px]"
                      loading="lazy"
                    />
                  ) : (
                    <div className="space-y-6">
                      <div>
                        <h2 className="font-heading mb-4 text-2xl font-bold text-foreground">
                          {copy.fallbackHeading}
                        </h2>
                        <p className="leading-relaxed text-muted-foreground">
                          {copy.fallbackIntroduction}
                        </p>
                      </div>
                      <ContactForm strings={formStrings} locale={locale} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  )
}
