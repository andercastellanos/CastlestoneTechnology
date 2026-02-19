"use client"

import type { ChangeEvent, FormEvent } from "react"
import { useState } from "react"

import Footer from "../components/layout/Footer"
import Header from "../components/layout/Header"

type ContactForm = {
  name: string
  email: string
  company: string
  message: string
}

type SubmissionStatus = {
  type: "success" | "error"
  message: string
} | null

const initialForm: ContactForm = {
  name: "",
  email: "",
  company: "",
  message: "",
}

export default function ContactPage() {
  const [form, setForm] = useState<ContactForm>(initialForm)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<SubmissionStatus>(null)

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus(null)
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })

      const payload = (await response.json()) as {
        success?: boolean
        message?: string
        error?: string
      }

      if (!response.ok || !payload.success) {
        throw new Error(payload.error || "Unable to send message right now.")
      }

      setStatus({
        type: "success",
        message: payload.message || "Message sent successfully.",
      })
      setForm(initialForm)
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unable to send message right now."
      setStatus({ type: "error", message })
    } finally {
      setIsSubmitting(false)
    }
  }

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
                <p className="text-xs uppercase tracking-[0.14em] text-[#555555]">Phone</p>
                <a
                  href="tel:+1305XXXXXXX"
                  className="mt-2 inline-block text-base text-[#222222] transition-colors hover:text-[#c8a97e]"
                >
                  +1 (305) XXX-XXXX
                </a>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-[#555555]">Location</p>
                <p className="mt-2 text-base text-[#222222]">Miami, Florida</p>
              </div>
            </div>
          </section>

          <section className="rounded-sm border border-[#e6dbc9] bg-white p-8 sm:p-10">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="text-sm font-medium text-[#222222]">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="mt-2 block h-11 w-full rounded-sm border border-[#e6dbc9] px-3 text-sm text-[#222222] outline-none transition-colors focus:border-[#c8a97e]"
                />
              </div>

              <div>
                <label htmlFor="email" className="text-sm font-medium text-[#222222]">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="mt-2 block h-11 w-full rounded-sm border border-[#e6dbc9] px-3 text-sm text-[#222222] outline-none transition-colors focus:border-[#c8a97e]"
                />
              </div>

              <div>
                <label htmlFor="company" className="text-sm font-medium text-[#222222]">
                  Company (optional)
                </label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  value={form.company}
                  onChange={handleChange}
                  className="mt-2 block h-11 w-full rounded-sm border border-[#e6dbc9] px-3 text-sm text-[#222222] outline-none transition-colors focus:border-[#c8a97e]"
                />
              </div>

              <div>
                <label htmlFor="message" className="text-sm font-medium text-[#222222]">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="mt-2 block w-full rounded-sm border border-[#e6dbc9] px-3 py-2 text-sm text-[#222222] outline-none transition-colors focus:border-[#c8a97e]"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex h-11 items-center justify-center rounded-sm bg-[#c8a97e] px-6 text-sm font-medium text-white transition-colors hover:bg-[#b69468] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>

            {status ? (
              <p
                className={`mt-5 text-sm ${
                  status.type === "success" ? "text-[#c8a97e]" : "text-red-600"
                }`}
              >
                {status.message}
              </p>
            ) : null}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
