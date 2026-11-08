import type { WebDesignCityContent } from "@/content/types/web-design-city"
import { webDesignMiamiContent as shared } from "@/content/es/web-design-miami"

export const webDesignOrlandoContent: WebDesignCityContent = {
  ...shared,
  path: "/es/blog/diseno-web-orlando",
  city: "Orlando",
  metadata_title: "Diseño web en Orlando",
  metadata_description: "Diseño web en Orlando para turismo, hospitalidad y servicios para el hogar. Agencia con sede en Miami. Consulta gratuita y cotización por escrito con alcance fijo.",
  eyebrow: "Sitios web para negocios de Orlando",
  heading: "Diseño web en Orlando",
  introduction: "El diseño web en Orlando debe servir tanto a quienes preparan un viaje como a los residentes que buscan un servicio para su hogar. Un sitio de turismo puede explicar una experiencia antes de la llegada; uno de hospitalidad puede organizar los detalles de una estadía; y uno de servicios para el hogar debe aclarar la cobertura y facilitar las consultas. Castlestone es una agencia con sede en Miami que trabaja con negocios de todo Estados Unidos. Definimos los proyectos en Miami y los desarrolla nuestro equipo de ingeniería en Latinoamérica.",
  industries: {
    heading: "Sitios web para turismo, hospitalidad y servicios para el hogar en Orlando",
    introduction: "Partimos de las preguntas que sus clientes hacen antes de una visita, una estadía o una solicitud de servicio. Durante la consulta, definimos las páginas y las conexiones que necesita su negocio.",
    items: [
      { title: "Turismo", description: "Ayude a quienes planean visitar Orlando a conocer sus experiencias, horarios y puntos de encuentro. Defina cómo podrán hacer preguntas o solicitar una reserva y qué información necesitan antes de llegar." },
      { title: "Hospitalidad", description: "Facilite la consulta desde el teléfono de los detalles de la estadía, la ubicación y las opciones de contacto. Comparta sus necesidades de reservas y las herramientas que ya utiliza para definir su función dentro del sitio web." },
      { title: "Servicios para el hogar", description: "Explique qué servicios ofrece y qué zonas de Orlando atiende realmente. Facilite que los residentes describan el trabajo que necesitan y soliciten una cotización, con un proceso de consulta acorde con la operación de su equipo." },
    ],
  },
  faq: {
    ...shared.faq,
    heading: "Preguntas sobre su sitio web en Orlando",
  },
  final: {
    ...shared.final,
    heading: "Definamos su sitio web en Orlando",
  },
}
