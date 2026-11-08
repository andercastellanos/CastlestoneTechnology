import type { WebDesignCityContent } from "@/content/types/web-design-city"
import { skyTravelProject } from "@/lib/page-data/projects"
import { skyTravelCopy } from "@/content/es/projects"

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
    url: skyTravelProject.url,
    eyebrow: "Un proyecto de nuestro equipo",
    heading: skyTravelProject.name,
    description: skyTravelCopy.description,
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
      { title: "Turismo y hospitalidad", description: "Un sitio de turismo u hospitalidad en Miami debe distinguir una consulta sobre un viaje de una reserva confirmada. Presente cada experiencia con su itinerario, las instrucciones de salida o llegada, lo que incluye y los detalles que su personal debe confirmar. Si su negocio coordina traslados desde un hotel o aeropuerto, explique el punto de encuentro según su operación real. Facilite la consulta desde el teléfono y defina cómo se pasa al sistema de reservas o al equipo que atiende las preguntas." },
      { title: "Restaurantes", description: "Ayude a quien busca un restaurante en Miami a pasar del menú a la planificación de su visita. Publique menús legibles, horarios de atención, ubicación e instrucciones de reserva; incluya pedidos para llevar solo si su negocio los ofrece. Una consulta sobre un evento privado necesita datos distintos de una reserva de mesa, como la fecha, la cantidad de personas y el tipo de ocasión. Defina quién actualizará el menú y cómo llegará el visitante al proveedor externo de reservas o pedidos, si lo utiliza." },
      { title: "Servicios profesionales", description: "Un sitio de servicios profesionales en Miami debe ayudar al visitante a reconocer si la empresa atiende su tipo de solicitud. Organice las páginas por servicios concretos y explique qué conviene preparar para una primera conversación. Aclare cómo contactar al equipo adecuado y si las reuniones son en la oficina o a distancia. Cuando atienda distintos tipos de negocios, ofrezca opciones de consulta que permitan asignar cada solicitud sin pedir información confidencial detallada en el formulario inicial." },
    ],
  },
  pricing: {
    heading: "Cómo definimos el precio",
    introduction: "Traiga a una consulta gratuita los menús, la información de viajes o las páginas de servicios que necesita su negocio en Miami. Con esos requisitos definimos el trabajo y le entregamos una cotización por escrito con un alcance fijo antes de comenzar. Las conexiones con reservas y la preparación del contenido forman parte de esa conversación.",
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
    introduction: "Comenzamos por el siguiente paso de su cliente: consultar un viaje, reservar una mesa o contactar a un profesional. Después de la consulta gratuita, usted revisa la cotización por escrito con un alcance fijo. Seguimos con diseño, revisiones, desarrollo y publicación a partir del contenido y las formas de contacto acordadas.",
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
      { question: "¿Qué necesita una consulta sobre un itinerario de viaje desde Miami?", answer: "Presente la experiencia, las fechas que publica su negocio, lo que incluye y los detalles que su equipo debe confirmar. Luego defina si el visitante pasará al sistema de reservas o enviará una solicitud al personal. Una consulta debe identificarse como tal, sin parecer una reserva confirmada." },
      { question: "¿Qué información debe publicar un restaurante además del menú?", answer: "Revise los horarios, la ubicación exacta, las instrucciones de reserva y las opciones de pedidos que realmente ofrece. Si acepta eventos privados, prepare una forma de consulta específica. Asigne quién mantendrá cada dato para que un cambio en el menú no deje desactualizada la información de reservas o eventos." },
      { question: "¿Conviene separar las consultas de eventos privados de las reservas de mesa?", answer: "Incluya esa diferencia en la consulta inicial. Para un evento pueden ser útiles la fecha propuesta, la cantidad de personas y el motivo de la reunión; una mesa puede reservarse mediante el sistema que ya utiliza. La cotización por escrito debe indicar qué opciones incluirá el sitio y cómo llegarán las solicitudes a su personal." },
      { question: "¿Cómo orientamos al posible cliente hacia el contacto profesional adecuado?", answer: "Describa los servicios según las solicitudes que su empresa atiende y ofrezca unas pocas opciones claras de consulta. Explique qué se conversa al inicio y cómo responde el equipo. Defina la asignación de solicitudes antes de incluir conexiones con calendarios u otras herramientas en el alcance del proyecto." },
      { question: "¿La información de llegada a un hotel debe compartir página con la de planificación de viajes?", answer: "Responde a momentos distintos. Quien compara una experiencia necesita conocerla; quien se prepara para llegar busca indicaciones y las instrucciones de encuentro o ingreso que publica su negocio. Decida qué información estará disponible en el sitio y cuál enviará el personal después de una reserva, según su proceso real." },
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
