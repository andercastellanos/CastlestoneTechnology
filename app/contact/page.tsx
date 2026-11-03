import type { Metadata } from "next"
import Footer from "../components/layout/Footer"
import Header from "../components/layout/Header"
import ContactForm from "./ContactForm"

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Questions about custom software, AI, or bilingual support teams? Send us a message and we'll get back to you.",
  alternates: {
    canonical: "/contact",
  },
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="mx-auto w-full max-w-6xl px-6 pb-24 pt-20 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr]">
          <section>
            <h1 className="text-4xl leading-tight tracking-tight text-[#222222] [font-family:var(--font-heading)] sm:text-5xl">
              Get in Touch
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-[#6b7280]">
              Tell us about your goals and we will recommend the right virtual
              support plan for your business.
            </p>

            <div className="mt-10 space-y-6">
              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-[#555555]">Email</p>
                <a
                  href="mailto:hello@castlestonetechnology.com"
                  className="mt-2 inline-block text-base text-[#222222] transition-colors hover:text-[#c8a97e]"
                >
                  hello@castlestonetechnology.com
                </a>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-[#555555]">Location</p>
                <p className="mt-2 text-base text-[#222222]">Miami, Florida</p>
              </div>
            </div>
          </section>

          <ContactForm />
        </div>
      </main>

      <Footer />
    </div>
  )
}
