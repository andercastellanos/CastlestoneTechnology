import ContactForm from "@/components/forms/ContactForm"
import { getGoogleBookingLinks } from "@/lib/booking"

export default async function GoogleBookingEmbed() {
  const booking = await getGoogleBookingLinks(process.env.NEXT_PUBLIC_BOOKING_URL)

  return (
    <div className="min-w-0 space-y-6">
      {booking && (
        <div className="space-y-3">
          <p className="leading-relaxed text-muted-foreground">
            Choose a time for your consultation. You can also open the booking page in a new tab.
          </p>
          <a
            href={booking.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center rounded-sm border border-[#c8a97e] px-5 py-2 text-sm font-medium text-foreground transition-colors hover:bg-[#c8a97e]/10"
          >
            Open booking page
          </a>
        </div>
      )}

      {booking?.embedUrl ? (
        <iframe
          src={booking.embedUrl}
          title="Book a consultation with Castlestone Technology"
          className="h-[1200px] w-full rounded-lg border-0 sm:h-[700px]"
          loading="lazy"
        />
      ) : (
        <div className="space-y-6">
          <div>
            <h2 className="font-heading mb-4 text-2xl font-bold text-foreground">
              Request a Consultation
            </h2>
            <p className="leading-relaxed text-muted-foreground">
              Share the service you&apos;re interested in and your preferred
              availability.
            </p>
          </div>
          <ContactForm />
        </div>
      )}
    </div>
  )
}
