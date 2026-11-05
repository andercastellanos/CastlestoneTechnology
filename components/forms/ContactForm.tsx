"use client"

import type { ChangeEvent, FormEvent } from "react"
import { useState } from "react"
import { contactFormStrings } from "@/content/en/contact-form"
import type { ContactFormStrings } from "@/content/types/contact-form"
import type { Locale } from "@/lib/i18n"
import { contactFormLimits } from "@/lib/page-data/contact"
import { contactFormError } from "@/lib/contact-form-messages"
import { trackMarketingEvent } from "@/components/analytics/events"

type ContactFormValues = {
  name: string
  email: string
  company: string
  message: string
  website: string
}

type SubmissionStatus = {
  type: "success" | "error"
  message: string
} | null

const initialForm: ContactFormValues = {
  name: "",
  email: "",
  company: "",
  message: "",
  website: "",
}

export default function ContactForm({
  strings = contactFormStrings,
  locale = "en",
}: { strings?: ContactFormStrings; locale?: Locale }) {
  const [form, setForm] = useState<ContactFormValues>(initialForm)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<SubmissionStatus>(null)

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (isSubmitting) return
    setStatus(null)
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source_page: window.location.pathname }),
      })

      const payload = (await response.json()) as {
        success?: boolean
        message?: string
        error?: string
      }

      if (!response.ok || !payload.success) {
        if (locale === "es") {
          setStatus({ type: "error", message: contactFormError(payload.error, strings) })
          return
        }
        throw new Error(payload.error || strings.errorMessage)
      }

      trackMarketingEvent({ name: "generate_lead", language: locale })
      setStatus({
        type: "success",
        message: locale === "es" ? strings.successMessage : payload.message || strings.successMessage,
      })
      setForm(initialForm)
    } catch (error) {
      const message =
        locale === "es" ? strings.errorMessage : error instanceof Error ? error.message : strings.errorMessage
      setStatus({ type: "error", message })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="rounded-sm border border-[#e6dbc9] bg-white p-8 sm:p-10">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="absolute -left-[10000px] h-px w-px overflow-hidden" aria-hidden="true">
          <label htmlFor="contact-website">{strings.honeypotLabel}</label>
          <input
            id="contact-website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={form.website}
            onChange={handleChange}
            disabled={isSubmitting}
          />
        </div>
        <div>
          <label htmlFor="name" className="text-sm font-medium text-[#222222]">
            {strings.nameLabel}
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            required
            maxLength={contactFormLimits.name}
            disabled={isSubmitting}
            className="mt-2 block h-11 w-full rounded-sm border border-[#e6dbc9] px-3 text-sm text-[#222222] outline-none transition-colors focus:border-[#c8a97e]"
          />
        </div>

        <div>
          <label htmlFor="email" className="text-sm font-medium text-[#222222]">
            {strings.emailLabel}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            maxLength={contactFormLimits.email}
            disabled={isSubmitting}
            className="mt-2 block h-11 w-full rounded-sm border border-[#e6dbc9] px-3 text-sm text-[#222222] outline-none transition-colors focus:border-[#c8a97e]"
          />
        </div>

        <div>
          <label htmlFor="company" className="text-sm font-medium text-[#222222]">
            {strings.companyLabel}
          </label>
          <input
            id="company"
            name="company"
            type="text"
            value={form.company}
            onChange={handleChange}
            maxLength={contactFormLimits.company}
            disabled={isSubmitting}
            className="mt-2 block h-11 w-full rounded-sm border border-[#e6dbc9] px-3 text-sm text-[#222222] outline-none transition-colors focus:border-[#c8a97e]"
          />
        </div>

        <div>
          <label htmlFor="message" className="text-sm font-medium text-[#222222]">
            {strings.messageLabel}
          </label>
          <textarea
            id="message"
            name="message"
            value={form.message}
            onChange={handleChange}
            required
            maxLength={contactFormLimits.message}
            disabled={isSubmitting}
            rows={5}
            className="mt-2 block w-full rounded-sm border border-[#e6dbc9] px-3 py-2 text-sm text-[#222222] outline-none transition-colors focus:border-[#c8a97e]"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex h-11 items-center justify-center rounded-sm bg-[#c8a97e] px-6 text-sm font-medium text-white transition-colors hover:bg-[#b69468] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? strings.submittingLabel : strings.submitLabel}
        </button>
      </form>

      {status ? (
        <p
          role={status.type === "error" ? "alert" : "status"}
          className={`mt-5 text-sm ${
            status.type === "success" ? "text-[#c8a97e]" : "text-red-600"
          }`}
        >
          {status.message}
        </p>
      ) : null}
    </section>
  )
}
