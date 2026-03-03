import type { Metadata } from "next"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import Container from "@/components/shared/Container"

export const metadata: Metadata = {
  title: "Terms of Service - Castlestone Technology",
  description: "Terms and conditions for using Castlestone Technology services.",
  alternates: { canonical: "https://castlestonetechnology.com/terms" },
}

export default function TermsPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-muted/50 py-12">
          <Container>
            <h1 className="font-heading text-4xl font-bold tracking-tight">Terms of Service</h1>
            <p className="mt-2 text-muted-foreground">Last updated: February 2026</p>
          </Container>
        </section>

        {/* Content */}
        <section className="py-16">
          <Container>
            <div className="mx-auto max-w-3xl">
              <h2 className="font-heading text-xl font-bold mt-10 mb-3">Acceptance of Terms</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                By accessing or using Castlestone Technology services, you agree to be bound by
                these terms. If you do not agree, please do not use our services.
              </p>

              <h2 className="font-heading text-xl font-bold mt-10 mb-3">Services</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Castlestone Technology provides virtual assistant and virtual front desk services
                staffed by bilingual professionals. Service scope, hours, and deliverables are
                defined in your individual service agreement.
              </p>

              <h2 className="font-heading text-xl font-bold mt-10 mb-3">Payment</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Services are billed monthly in advance. All fees are non-refundable except where a
                money-back guarantee has been explicitly offered in writing. Failure to pay may
                result in service suspension.
              </p>

              <h2 className="font-heading text-xl font-bold mt-10 mb-3">
                Client Responsibilities
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Clients are responsible for providing clear task instructions, timely feedback, and
                a respectful working environment for our team members.
              </p>

              <h2 className="font-heading text-xl font-bold mt-10 mb-3">Confidentiality</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Both parties agree to keep confidential any proprietary or sensitive information
                shared during the course of the engagement.
              </p>

              <h2 className="font-heading text-xl font-bold mt-10 mb-3">Termination</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Either party may terminate services with 30 days written notice. Castlestone
                reserves the right to terminate immediately in cases of payment default or abusive
                conduct toward staff.
              </p>

              <h2 className="font-heading text-xl font-bold mt-10 mb-3">
                Limitation of Liability
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Castlestone Technology is not liable for indirect, incidental, or consequential
                damages arising from use of our services. Our total liability shall not exceed the
                fees paid in the prior 30 days.
              </p>

              <h2 className="font-heading text-xl font-bold mt-10 mb-3">Governing Law</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                These terms are governed by the laws of the State of Florida, USA. Any disputes
                shall be resolved in Miami-Dade County.
              </p>

              <h2 className="font-heading text-xl font-bold mt-10 mb-3">Contact</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Questions about these terms? Email{" "}
                <a
                  href="mailto:hello@castlestonetechnology.com"
                  className="text-foreground underline underline-offset-4 hover:text-primary"
                >
                  hello@castlestonetechnology.com
                </a>
                .
              </p>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  )
}
