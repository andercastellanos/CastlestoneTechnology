"use client"

import type { ChangeEvent, FormEvent } from "react"
import { useState } from "react"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"

type CareersForm = {
  name: string
  email: string
  country: string
  role: string
  linkedin: string
  message: string
}

type SubmissionStatus = {
  type: "success" | "error"
  message: string
} | null

const initialForm: CareersForm = {
  name: "",
  email: "",
  country: "",
  role: "",
  linkedin: "",
  message: "",
}

const roles = [
  "Virtual Front Desk Agent",
  "Virtual Assistant",
  "Bilingual Customer Support",
  "Administrative Assistant",
  "Other",
]

const perks = [
  {
    emoji: "🏠",
    title: "100% Remote",
    description: "Work from anywhere in Latin America with a stable internet connection.",
  },
  {
    emoji: "💵",
    title: "USD Compensation",
    description: "Earn in US dollars — competitive rates that reflect your skills.",
  },
  {
    emoji: "📅",
    title: "US Business Hours",
    description: "Monday–Friday schedules aligned with your time zone.",
  },
  {
    emoji: "📈",
    title: "Growth & Training",
    description: "Ongoing training, feedback, and a clear path to grow your career.",
  },
]

export default function CareersPage() {
  const [form, setForm] = useState<CareersForm>(initialForm)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<SubmissionStatus>(null)

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus(null)
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/careers", {
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
        throw new Error(payload.error || "Unable to send your application right now.")
      }

      setStatus({
        type: "success",
        message: payload.message || "Application received. We'll be in touch soon.",
      })
      setForm(initialForm)
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unable to send your application right now."
      setStatus({ type: "error", message })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        {/* Hero */}
        <section className="bg-[#f9f6f1] py-16">
          <div className="mx-auto w-full max-w-6xl px-6 lg:px-10">
            <div className="text-center">
              <h1 className="font-heading text-4xl font-bold tracking-tight text-[#222222] sm:text-5xl">
                Work With US Companies — From Home
              </h1>
              <p className="mx-auto mt-4 max-w-xl text-lg text-[#6b7280]">
                We connect bilingual professionals across Latin America with growing US businesses.
                If you speak English and want to build a remote career, we want to hear from you.
              </p>
            </div>
          </div>
        </section>

        {/* Why work with us */}
        <section className="py-20">
          <div className="mx-auto w-full max-w-6xl px-6 lg:px-10">
            <h2 className="text-center font-heading text-3xl font-bold text-[#222222]">
              Why Join Castlestone?
            </h2>
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {perks.map((perk) => (
                <article
                  key={perk.title}
                  className="rounded-sm border border-[#e6dbc9] bg-white p-6"
                >
                  <div className="mb-3 text-3xl">{perk.emoji}</div>
                  <h3 className="font-heading text-base font-semibold text-[#222222]">
                    {perk.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#6b7280]">
                    {perk.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Application form */}
        <section className="bg-[#f9f6f1] py-20">
          <div className="mx-auto w-full max-w-6xl px-6 lg:px-10">
            <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr]">
              <div>
                <h2 className="font-heading text-3xl font-bold text-[#222222]">
                  Apply Now
                </h2>
                <p className="mt-4 max-w-sm text-base leading-relaxed text-[#6b7280]">
                  Fill out the form and our team will review your application. We respond
                  to every submission within 3–5 business days.
                </p>

                <div className="mt-10 space-y-6">
                  <div>
                    <p className="text-xs uppercase tracking-[0.14em] text-[#555555]">
                      We're Looking For
                    </p>
                    <ul className="mt-3 space-y-2">
                      {roles.slice(0, -1).map((role) => (
                        <li key={role} className="flex items-center gap-2 text-sm text-[#222222]">
                          <span className="text-[#c8a97e]">→</span>
                          {role}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-[0.14em] text-[#555555]">
                      Requirements
                    </p>
                    <ul className="mt-3 space-y-2">
                      {[
                        "Conversational to fluent English",
                        "Reliable internet connection",
                        "Based in Latin America",
                        "Professional attitude",
                      ].map((req) => (
                        <li key={req} className="flex items-center gap-2 text-sm text-[#222222]">
                          <span className="text-[#c8a97e]">✓</span>
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-[0.14em] text-[#555555]">Email</p>
                    <a
                      href="mailto:careers@castlestonetechnology.com"
                      className="mt-2 inline-block text-base text-[#222222] transition-colors hover:text-[#c8a97e]"
                    >
                      careers@castlestonetechnology.com
                    </a>
                  </div>
                </div>
              </div>

              <section className="rounded-sm border border-[#e6dbc9] bg-white p-8 sm:p-10">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="name" className="text-sm font-medium text-[#222222]">
                      Full Name
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
                    <label htmlFor="country" className="text-sm font-medium text-[#222222]">
                      Country
                    </label>
                    <input
                      id="country"
                      name="country"
                      type="text"
                      placeholder="e.g. Colombia, Mexico, Argentina…"
                      value={form.country}
                      onChange={handleChange}
                      required
                      className="mt-2 block h-11 w-full rounded-sm border border-[#e6dbc9] px-3 text-sm text-[#222222] outline-none transition-colors placeholder:text-[#9ca3af] focus:border-[#c8a97e]"
                    />
                  </div>

                  <div>
                    <label htmlFor="role" className="text-sm font-medium text-[#222222]">
                      Role You're Interested In
                    </label>
                    <select
                      id="role"
                      name="role"
                      value={form.role}
                      onChange={handleChange}
                      required
                      className="mt-2 block h-11 w-full rounded-sm border border-[#e6dbc9] px-3 text-sm text-[#222222] outline-none transition-colors focus:border-[#c8a97e]"
                    >
                      <option value="" disabled>
                        Select a role…
                      </option>
                      {roles.map((role) => (
                        <option key={role} value={role}>
                          {role}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="linkedin" className="text-sm font-medium text-[#222222]">
                      LinkedIn Profile{" "}
                      <span className="font-normal text-[#9ca3af]">(optional)</span>
                    </label>
                    <input
                      id="linkedin"
                      name="linkedin"
                      type="url"
                      placeholder="https://linkedin.com/in/yourprofile"
                      value={form.linkedin}
                      onChange={handleChange}
                      className="mt-2 block h-11 w-full rounded-sm border border-[#e6dbc9] px-3 text-sm text-[#222222] outline-none transition-colors placeholder:text-[#9ca3af] focus:border-[#c8a97e]"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="text-sm font-medium text-[#222222]">
                      Tell Us About Yourself
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="Your experience, English level, and why you'd like to join Castlestone…"
                      className="mt-2 block w-full rounded-sm border border-[#e6dbc9] px-3 py-2 text-sm text-[#222222] outline-none transition-colors placeholder:text-[#9ca3af] focus:border-[#c8a97e]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex h-11 items-center justify-center rounded-sm bg-[#c8a97e] px-6 text-sm font-medium text-white transition-colors hover:bg-[#b69468] disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isSubmitting ? "Sending…" : "Submit Application"}
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
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
