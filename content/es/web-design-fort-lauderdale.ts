import type { WebDesignCityContent } from "@/content/types/web-design-city"
import { webDesignMiamiContent as shared } from "@/content/es/web-design-miami"

export const webDesignFortLauderdaleContent: WebDesignCityContent = {
  ...shared,
  path: "/es/blog/diseno-web-fort-lauderdale",
  city: "Fort Lauderdale",
  metadata_title: "Diseño web en Fort Lauderdale",
  metadata_description: "Diseño web en Fort Lauderdale para negocios del sector náutico, servicios para el hogar y bienes raíces. Consulta gratuita y cotización por escrito con alcance fijo.",
  eyebrow: "Sitios web para negocios de Fort Lauderdale",
  heading: "Diseño web en Fort Lauderdale",
  introduction: "El diseño web en Fort Lauderdale debe facilitar que el propietario de una embarcación explique lo que necesita, que un residente encuentre un servicio para su propiedad o que un posible cliente de bienes raíces sepa cómo consultar. Los negocios del sector náutico, los servicios para el hogar y las empresas de bienes raíces necesitan información y procesos distintos. Castlestone es una agencia con sede en Miami que trabaja con negocios de todo Estados Unidos. Definimos los proyectos en Miami y los desarrolla nuestro equipo de ingeniería en Latinoamérica.",
  industries: {
    heading: "Sitios web para los negocios de Fort Lauderdale",
    introduction: "Definimos las páginas y las conexiones según las preguntas de sus clientes y el proceso de su equipo.",
    items: [
  {
    "title": "Negocios del sector náutico",
    "description": "Explique los servicios náuticos que ofrece, la información que debe preparar el propietario de una embarcación y cómo evalúa su equipo cada solicitud. Durante la consulta, revisamos las funciones de los formularios, la información de los servicios y las herramientas que ya utiliza."
  },
  {
    "title": "Servicios para el hogar",
    "description": "Aclare qué servicios ofrece y qué zonas atiende realmente. Ayude a los residentes a describir el trabajo que necesitan, compartir los datos pertinentes de la propiedad y contactar a la persona adecuada, sin prometer una disponibilidad que su equipo no pueda cumplir."
  },
  {
    "title": "Bienes raíces",
    "description": "Organice la información que sus posibles clientes necesitan antes de contactar a su negocio. Incluya en la conversación los datos de las propiedades, la asignación de consultas y las conexiones con las herramientas que ya utiliza para definir el alcance por escrito."
  }
],
  },
  faq: { ...shared.faq, heading: "Preguntas sobre su sitio web en Fort Lauderdale" },
  final: { ...shared.final, heading: "Definamos su sitio web en Fort Lauderdale" },
}
