import type { WebDesignCityContent } from "@/content/types/web-design-city"
import { webDesignProject } from "@/lib/page-data/web-design"

export const webDesignMiamiContent: WebDesignCityContent = {
  path: "/es/blog/diseno-web-miami",
  city: "Miami",
  region: "FL",
  metadata_title: "Diseño web en Miami",
  metadata_description: "Diseño web en Miami para negocios de todo EE. UU. Definimos los proyectos en Miami y los desarrolla nuestro equipo de ingeniería en Latinoamérica.",
  eyebrow: "Sitios web para negocios de Miami",
  heading: "Diseño web en Miami",
  introduction: "El diseño web en Miami parte de cómo su negocio atiende a visitantes y clientes locales: los detalles de un viaje para una agencia de Brickell, el menú de un restaurante o una forma clara de consultar por un servicio profesional. Castlestone es una agencia con sede en Miami que trabaja con negocios de todo Estados Unidos. Definimos los proyectos en Miami y los desarrolla nuestro equipo de ingeniería en Latinoamérica.",
  primaryCta: "Agende una consulta gratuita",
  projectCta: "Conozca un proyecto de nuestro equipo",
  project: {
    url: webDesignProject.url,
    eyebrow: "Un proyecto de nuestro equipo",
    heading: "Sky Travel J&M",
    description: "Sky Travel J&M es nuestra empresa hermana, una agencia de peregrinaciones católicas en Brickell, Miami. Nuestro equipo diseñó y desarrolló su sitio web. Visítelo para conocer cómo presenta sus destinos, viajes y opciones de contacto.",
    featuresHeading: "Conozca el sitio web",
    features: [
      "Páginas de destinos y viajes",
      "Salidas filtradas por año",
      "Una página de testimonios",
      "Un blog",
      "Contacto por WhatsApp",
      "Un diseño que se adapta a las pantallas de los teléfonos",
    ],
    linkLabel: "Visite el sitio web de Sky Travel J&M",
  },
  industries: {
    heading: "Sitios web para los negocios de Miami",
    introduction: "Trabajamos con negocios de turismo y hospitalidad, restaurantes y servicios profesionales. Partimos de su negocio, de la información que buscan sus visitantes y del siguiente paso que usted quiere facilitarles.",
    items: [
      { title: "Turismo y hospitalidad", description: "Facilite la consulta de destinos, experiencias y detalles de viajes. Nuestro proyecto Sky Travel J&M ofrece un ejemplo concreto que podemos revisar durante su consulta." },
      { title: "Restaurantes", description: "Ayude a sus visitantes a encontrar el menú, la ubicación y los datos de contacto. Durante la consulta, revisaremos si su sitio necesita reservas, pagos en línea o conexiones con las herramientas que ya utiliza." },
      { title: "Servicios profesionales", description: "Explique qué hace su negocio y facilite el contacto de posibles clientes. Defina las páginas, el contenido y las conexiones con otras herramientas según su forma de trabajar." },
    ],
  },
  pricing: {
    heading: "Cómo definimos el precio",
    introduction: "Comience con una consulta gratuita. Conversamos sobre su sitio web y le presentamos una cotización por escrito con un alcance fijo antes de iniciar el trabajo.",
    factorsHeading: "Qué influye en la cotización",
    factors: [
      "La cantidad de páginas y el contenido de cada una",
      "Funciones como reservas o pagos en línea",
      "Las conexiones con las herramientas que su negocio ya utiliza",
      "La preparación de contenido y la redacción de textos",
      "El plazo que necesita",
    ],
    closing: "La consulta permite definir qué debe incluir el proyecto. La cotización por escrito establece el alcance acordado antes de comenzar.",
  },
  process: {
    heading: "Cómo trabajamos",
    steps: [
      { title: "Llamada inicial", description: "Conversamos sobre su negocio, sus visitantes y lo que necesita que haga el sitio web." },
      { title: "Cotización por escrito", description: "Usted revisa una cotización con un alcance fijo antes de iniciar el trabajo." },
      { title: "Diseño", description: "Preparamos el diseño a partir de las páginas y el contenido acordados." },
      { title: "Revisiones", description: "Usted revisa el diseño y trabajamos en los ajustes antes del desarrollo." },
      { title: "Desarrollo", description: "Desarrollamos el sitio y las funciones incluidas en el alcance acordado." },
      { title: "Publicación", description: "Llevamos el sitio acordado hasta su publicación." },
    ],
  },
  faq: {
    heading: "Preguntas sobre su sitio web en Miami",
    items: [
      { question: "¿Cuánto cuesta un sitio web?", answer: "Definimos el precio después de una consulta gratuita y entregamos una cotización por escrito con un alcance fijo antes de iniciar el trabajo. La cotización depende de las páginas, funciones, conexiones con otras herramientas, contenido, redacción y plazo." },
      { question: "¿Dónde tiene su sede Castlestone y a qué negocios atiende?", answer: "Castlestone es una agencia con sede en Miami que trabaja con negocios de todo Estados Unidos. Definimos los proyectos en Miami y los desarrolla nuestro equipo de ingeniería en Latinoamérica." },
      { question: "¿Puedo ver un sitio que su equipo haya diseñado y desarrollado?", answer: "Sí. Visite Sky Travel J&M, nuestra empresa hermana en Brickell, Miami. Diseñamos y desarrollamos su sitio de viajes de peregrinación católica, con páginas de destinos y viajes, filtros por año, una página de testimonios, un blog y contacto por WhatsApp." },
      { question: "¿Podemos incluir reservas, pagos o conexiones con nuestras herramientas?", answer: "Comparta esas necesidades durante la llamada inicial. Las funciones como reservas o pagos en línea y las conexiones con las herramientas que ya utiliza influyen en el alcance y la cotización." },
      { question: "¿Qué sigue después de la llamada inicial?", answer: "El proceso continúa con la cotización por escrito, el diseño, las revisiones, el desarrollo y la publicación. El alcance fijo queda establecido por escrito antes de comenzar el trabajo." },
    ],
  },
  final: {
    heading: "Definamos su sitio web en Miami",
    description: "Cuéntenos sobre su negocio, el sitio web que tiene en mente y las herramientas que ya utiliza. Comience con una consulta gratuita y una cotización por escrito con un alcance fijo.",
    contactLabel: "Consulte con nuestro equipo sobre su sitio web",
  },
  related: {
    heading: "Conecte su sitio web con el resto de su negocio",
    introduction: "Conozca nuestros servicios relacionados y comparta sus necesidades durante la consulta.",
    websites: "Sitios web y páginas de destino",
    receptionist: "Recepcionista con IA",
    marketing: "Marketing por SMS",
  },
}
