import type { ContactContent } from "@/content/types/contact"
import { contactFormStrings } from "./contact-form"
import { formatContactAddress, SITE_CONFIG } from "@/lib/constants"

export const contactContent: ContactContent = {
  metadata_title: "Contacto",
  metadata_description: "¿Tiene preguntas sobre software a medida, IA o equipos de apoyo virtual? Envíenos un mensaje y nos comunicaremos con usted.",
  heading: "Contacto",
  introduction: "Cuéntenos sus objetivos y le recomendaremos el plan de apoyo virtual adecuado para su negocio.",
  emailLabel: "Correo electrónico",
  emailAddress: SITE_CONFIG.contact.email,
  phoneLabel: "Teléfono",
  locationLabel: "Ubicación",
  location: formatContactAddress(),
  form: contactFormStrings,
}
