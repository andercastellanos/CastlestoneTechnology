import type { Metadata } from "next"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import Container from "@/components/shared/Container"

export const metadata: Metadata = {
  title: "Privacy Policy - Castlestone Technology",
  description:
    "How Castlestone Technology collects, uses, and protects your personal information.",
  alternates: { canonical: "https://castlestonetechnology.com/privacy" },
}

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-muted/50 py-12">
          <Container>
            <h1 className="font-heading text-4xl font-bold tracking-tight">Privacy Policy</h1>
            <p className="mt-2 text-muted-foreground">Last updated: February 2026</p>
          </Container>
        </section>

        {/* Content */}
        <section className="py-16">
          <Container>
            <div className="mx-auto max-w-3xl">
              <h2 className="font-heading text-xl font-bold mt-10 mb-3">
                Information We Collect
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We collect information you provide directly, including name, email, company name,
                and phone number when you fill out forms on our site or book a consultation.
              </p>

              <h2 className="font-heading text-xl font-bold mt-10 mb-3">
                How We Use Your Information
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We use your information to respond to inquiries, deliver our services, send relevant
                updates about Castlestone Technology, and improve our website experience. We never
                sell your data to third parties.
              </p>

              <h2 className="font-heading text-xl font-bold mt-10 mb-3">Cookies</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Our website uses cookies to understand how visitors interact with our pages. You can
                disable cookies in your browser settings at any time.
              </p>

              <h2 className="font-heading text-xl font-bold mt-10 mb-3">Data Storage</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Your data is stored securely using industry-standard practices. We use Supabase for
                database storage, which is hosted on AWS infrastructure with encryption at rest and
                in transit.
              </p>

              <h2 className="font-heading text-xl font-bold mt-10 mb-3">Third-Party Services</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We use the following third-party services that may process your data: Calendly
                (appointment booking), Google Analytics (site analytics), Resend (email delivery).
              </p>

              <h2 className="font-heading text-xl font-bold mt-10 mb-3">Your Rights</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You have the right to request access to, correction of, or deletion of your
                personal data at any time by contacting us at{" "}
                <a
                  href="mailto:hello@castlestonetechnology.com"
                  className="text-foreground underline underline-offset-4 hover:text-primary"
                >
                  hello@castlestonetechnology.com
                </a>
                .
              </p>

              <h2 className="font-heading text-xl font-bold mt-10 mb-3">Contact</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                For any privacy-related questions, email{" "}
                <a
                  href="mailto:hello@castlestonetechnology.com"
                  className="text-foreground underline underline-offset-4 hover:text-primary"
                >
                  hello@castlestonetechnology.com
                </a>{" "}
                or write to us at Castlestone Technology, Miami, FL, USA.
              </p>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  )
}
