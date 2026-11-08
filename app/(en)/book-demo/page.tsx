import type { Metadata } from "next"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import Container from "@/components/shared/Container"
import GoogleBookingEmbed from "@/components/shared/GoogleBookingEmbed"

export const metadata: Metadata = {
  title: "Book a Free Consultation",
  description:
    "Book a free 30-minute consultation. Get a custom quote for software, AI, marketing automation, or virtual support teams—no commitment.",
  alternates: {
    canonical: "/book-demo",
  },
}

const benefits = [
  "A walkthrough of the service you're interested in",
  "A custom quote for your business",
  "Honest recommendations on where to start",
  "Answers to any questions you have",
]

const trustSignals = [
  { emoji: "🔒", text: "No commitment required" },
  { emoji: "⚡", text: "Response within 1 business day" },
  { emoji: "🌎", text: "Serving clients across the US" },
]

export default function DemoPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-muted/50 py-16">
          <Container>
            <div className="text-center">
              <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl">
                Book Your Free Consultation
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
                Schedule a free 30-minute call. Tell us what you need, and
                we&apos;ll show you how we&apos;d approach it. No commitment required.
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
                <h2 className="font-heading text-2xl font-bold mb-6">What to Expect on the Call</h2>
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
                <GoogleBookingEmbed />
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  )
}
