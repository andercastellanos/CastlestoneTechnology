import type { LegalContent } from "@/content/types/legal"
import { LEGAL_ENTITY, SITE_CONFIG } from "@/lib/constants"

const email = { href: `mailto:${SITE_CONFIG.contact.email}`, label: SITE_CONFIG.contact.email }

export const termsContent: LegalContent = {
  metadata_title: "Términos del servicio",
  metadata_description: "Términos y condiciones para usar los servicios de Castlestone Technology.",
  heading: "Términos del servicio",
  lastUpdated: "Última actualización: 15 de noviembre de 2026",
  sections: [
    {
      heading: "Quiénes somos",
      paragraphs: [[
        `Estos Términos del servicio constituyen un acuerdo entre usted y ${LEGAL_ENTITY.es} (“Castlestone Technology”, “nosotros”).`,
      ]],
    },
    {
      heading: "Aceptación de los términos",
      paragraphs: [["Al acceder a los servicios de Castlestone Technology o utilizarlos, usted acepta quedar sujeto a estos términos. Si no está de acuerdo, le pedimos que no utilice nuestros servicios."]],
    },
    {
      heading: "Servicios",
      paragraphs: [["Castlestone Technology ofrece servicios de asistentes virtuales y de recepción virtual a cargo de profesionales capacitados. El alcance, el horario y los entregables del servicio se definen en su acuerdo de servicio individual."]],
    },
    {
      heading: "Pagos",
      paragraphs: [["Los servicios se facturan mensualmente por adelantado. Ningún cargo es reembolsable, salvo que se haya ofrecido por escrito, de forma expresa, una garantía de devolución del dinero. La falta de pago puede dar lugar a la suspensión del servicio."]],
    },
    {
      heading: "Responsabilidades del cliente",
      paragraphs: [["El cliente es responsable de dar instrucciones claras sobre las tareas, comentarios oportunos y un ambiente de trabajo respetuoso para los miembros de nuestro equipo."]],
    },
    {
      heading: "Confidencialidad",
      paragraphs: [["Ambas partes se comprometen a mantener la confidencialidad de toda información reservada o sensible que se comparta durante la relación de servicio."]],
    },
    {
      heading: "Terminación",
      paragraphs: [["Cualquiera de las partes puede terminar los servicios con un aviso por escrito de 30 días. Castlestone se reserva el derecho de terminarlos de inmediato en caso de falta de pago o de conducta abusiva hacia el personal."]],
    },
    {
      heading: "Limitación de responsabilidad",
      paragraphs: [["Castlestone Technology no es responsable de daños indirectos, incidentales o consecuentes derivados del uso de nuestros servicios. Nuestra responsabilidad total no excederá los cargos pagados en los 30 días anteriores."]],
    },
    {
      heading: "Ley aplicable",
      paragraphs: [["Estos términos se rigen por las leyes del estado de Florida, EE. UU. Cualquier controversia se resolverá en el condado de Miami-Dade."]],
    },
    {
      heading: "Contacto",
      paragraphs: [["¿Tiene preguntas sobre estos términos? Escríbanos a ", email, "."]],
    },
  ],
}
