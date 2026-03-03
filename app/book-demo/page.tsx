import type { Metadata } from "next"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import Container from "@/components/shared/Container"
import CalendlyEmbed from "@/components/shared/CalendlyEmbed"

export const metadata: Metadata = {
  title: "Book a Free Consultation | Castlestone Technology",
  description:
    "Schedule a free 30-minute consultation with the Castlestone team. No commitment required — get a custom quote and see how we can reduce your staffing costs by 60%.",
  alternates: {
    canonical: "https://castlestonetechnology.com/book-demo",
  },
}

const benefits = [
  "Live demo of the virtual front desk",
  "Custom pricing quote for your business",
  "VA matching based on your specific needs",
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
                Schedule a 30-minute call to see how Castlestone can reduce your staffing costs by{" "}
                <span className="text-primary font-semibold">60%</span>. No commitment required.
              </p>
            </div>
          </Container>
        </section>

        {/* Booking Section */}
        <section className="bg-background py-20">
          <Container>
            <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
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

              {/* Right — Calendly embed */}
              <div>
                <CalendlyEmbed />
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  )
}
