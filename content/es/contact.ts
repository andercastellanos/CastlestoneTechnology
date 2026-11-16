import type { ContactContent } from "@/content/types/contact"
import { contactFormStrings } from "./contact-form"
import { formatContactAddress, SITE_CONFIG } from "@/lib/constants"

export const contactContent: ContactContent = {
  metadata_title: "Contacto",
  metadata_description: "¿Tiene preguntas sobre software a medida, IA o equipos de apoyo virtual? Envíenos un mensaje y nos comunicaremos con usted.",
  heading: "Contacto",
  introduction: "Cuéntenos qué desea crear o mejorar, desde software a medida e IA hasta su sitio web, su marketing o su equipo de apoyo. Le responderemos con los próximos pasos y, cuando sea útil, una consulta gratuita.",
  messageGuidance: "Para responderle con próximos pasos útiles, incluya a qué se dedica su negocio, en qué necesita ayuda, las herramientas o sistemas que ya utiliza y sus plazos.",
  emailLabel: "Correo electrónico",
  emailAddress: SITE_CONFIG.contact.email,
  phoneLabel: "Teléfono",
  locationLabel: "Ubicación",
  location: formatContactAddress(),
  form: contactFormStrings,
}
