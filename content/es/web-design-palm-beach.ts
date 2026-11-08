import type { WebDesignCityContent } from "@/content/types/web-design-city"
import { webDesignMiamiContent as shared } from "@/content/es/web-design-miami"
import { palmBeachAreas } from "@/lib/page-data/web-design-cities"

export const webDesignPalmBeachContent: WebDesignCityContent = {
  ...shared,
  path: "/es/blog/diseno-web-palm-beach",
  city: "West Palm Beach & Boca Raton",
  metadata_title: "Diseño web en West Palm Beach y Boca Raton",
  metadata_description: "Diseño web en West Palm Beach y Boca Raton para consultorios médicos, centros de estética y gestión patrimonial. Consulta gratuita y cotización por escrito.",
  eyebrow: "Sitios web para negocios de West Palm Beach y Boca Raton",
  heading: "Diseño web en West Palm Beach y Boca Raton",
  introduction: "El diseño web en West Palm Beach y Boca Raton comienza por las preguntas que una persona hace antes de elegir un consultorio o conversar sobre sus necesidades patrimoniales. Los consultorios médicos y centros de estética necesitan presentar con claridad sus servicios y la información para solicitar una cita. Los negocios de gestión patrimonial deben explicar su enfoque y facilitar una conversación con su equipo. Castlestone es una agencia con sede en Miami que trabaja con negocios de todo Estados Unidos. Definimos los proyectos en Miami y los desarrolla nuestro equipo de ingeniería en Latinoamérica.",
  areasServed: palmBeachAreas,
  citySections: [
  {
    "heading": "Diseño web para negocios de West Palm Beach",
    "description": "Si su consultorio o negocio de gestión patrimonial atiende en West Palm Beach, planifique cómo presentará sus servicios, los datos de contacto y la forma de solicitar una conversación. Comparta durante la llamada inicial las páginas, las necesidades de citas y las herramientas que utiliza."
  },
  {
    "heading": "Diseño web para negocios de Boca Raton",
    "description": "Si su negocio atiende en Boca Raton, defina qué preguntas necesitan resolver sus posibles pacientes o clientes antes de escribirle. El alcance debe partir de sus servicios y de su proceso real de consulta, incluida la información que su equipo necesita para responder."
  }
],
  industries: {
    heading: "Sitios web para los negocios de West Palm Beach y Boca Raton",
    introduction: "Definimos las páginas y las conexiones según las preguntas de sus clientes y el proceso de su equipo.",
    items: [
  {
    "title": "Consultorios médicos y centros de estética",
    "description": "Explique los servicios que ofrece su consultorio y cómo puede una persona solicitar una cita. Defina qué preguntas debe responder el sitio y cuáles conviene atender directamente con su equipo."
  },
  {
    "title": "Gestión patrimonial",
    "description": "Presente el enfoque de su negocio, los servicios que ofrece y el siguiente paso para quien desea conversar con su equipo. Defina qué información debe recoger el formulario de consulta y cómo se dará seguimiento."
  }
],
  },
  faq: { ...shared.faq, heading: "Preguntas sobre su sitio web en West Palm Beach y Boca Raton" },
  final: { ...shared.final, heading: "Definamos su sitio web en West Palm Beach y Boca Raton" },
}
