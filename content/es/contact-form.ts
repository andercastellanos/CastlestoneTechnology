import type { ContactFormStrings } from "@/content/types/contact-form"

export const contactFormStrings: ContactFormStrings = {
  honeypotLabel: "Deje este campo vacío",
  nameLabel: "Nombre",
  emailLabel: "Correo electrónico",
  companyLabel: "Empresa (opcional)",
  messageLabel: "Mensaje",
  submittingLabel: "Enviando...",
  submitLabel: "Enviar mensaje",
  successMessage: "Gracias por contactarnos. Nos comunicaremos con usted pronto.",
  errorMessage: "No pudimos enviar su mensaje. Inténtelo de nuevo.",
  apiErrorMessages: {
    "Invalid JSON body.": "La solicitud no tiene un formato válido. Inténtelo de nuevo.",
    "Name is required.": "Ingrese su nombre.",
    "Name must be 120 characters or fewer.": "El nombre debe tener como máximo {nameLimit} caracteres.",
    "Email is required.": "Ingrese su correo electrónico.",
    "Email must be 254 characters or fewer.": "El correo electrónico debe tener como máximo {emailLimit} caracteres.",
    "Enter a valid email address.": "Ingrese un correo electrónico válido.",
    "Company must be 200 characters or fewer.": "El nombre de la empresa debe tener como máximo {companyLimit} caracteres.",
    "Message is required.": "Ingrese su mensaje.",
    "Message must be 10,000 characters or fewer.": "El mensaje debe tener como máximo {messageLimit} caracteres.",
    "Invalid source page.": "La página de origen no es válida. Recargue la página e inténtelo de nuevo.",
    "Unable to submit this form.": "No se pudo enviar el formulario. Inténtelo de nuevo.",
    "We couldn't save your message. Please try again.": "No pudimos guardar su mensaje. Inténtelo de nuevo.",
  },
}
