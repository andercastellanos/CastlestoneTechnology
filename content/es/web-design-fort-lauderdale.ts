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
      { title: "Negocios del sector náutico", description: "Un sitio de servicios náuticos en Fort Lauderdale debe facilitar que el propietario o capitán describa la embarcación y el trabajo antes de que su personal lo evalúe. Organice las páginas por los servicios reales y explique si el primer paso es una conversación, una solicitud de inspección u otra revisión. Defina qué datos de la embarcación, ubicación de atraque o servicio y acceso necesita la consulta. Si trabaja en sus instalaciones y donde se encuentra la embarcación, distinga ambas opciones sin dar a entender que cubre cualquier marina o tipo de barco." },
      { title: "Servicios para el hogar", description: "Para un servicio del hogar en Fort Lauderdale, una consulta útil comienza por la propiedad y el trabajo. Describa lo que realiza y permita que el residente o administrador indique si se trata de una casa, un condominio u otra propiedad que usted atiende. Defina qué datos de acceso necesita el personal antes de coordinar una visita. Publique la cobertura y el proceso de respuesta reales, distinguiendo una solicitud de una cita confirmada. Incluya fotografías o archivos solo cuando ayuden a evaluar el trabajo." },
      { title: "Bienes raíces", description: "Un sitio de bienes raíces en Fort Lauderdale debe distinguir a quien consulta una propiedad de quien desea vender o encargar su administración. Prepare opciones de contacto distintas, con información de propiedades proporcionada y mantenida por su negocio. Si necesita una conexión con un sistema de listados, revise su origen, quién lo mantiene y qué sucede cuando la consulta corresponde a una propiedad que ya no está disponible. Explique qué persona o equipo recibe cada solicitud para que el visitante entienda el siguiente paso." },
    ],
  },
  pricing: {
    ...shared.pricing,
    introduction: "En una consulta gratuita, explique cómo recibe hoy una solicitud de servicio náutico, una visita a una propiedad o una consulta de bienes raíces en Fort Lauderdale. Definimos el sitio según los requisitos acordados y entregamos una cotización por escrito con un alcance fijo antes de comenzar, incluidas las conexiones necesarias con sus herramientas.",
  },
  process: {
    ...shared.process,
    introduction: "Comparta un ejemplo de solicitud náutica, trabajo en una propiedad o consulta de bienes raíces en la conversación inicial. Esa consulta gratuita permite definir qué incluirá la cotización por escrito con un alcance fijo. Después seguimos con diseño, revisiones, desarrollo y publicación, a partir de la recepción de solicitudes y la respuesta acordadas.",
  },
  faq: {
    heading: "Preguntas sobre su sitio web en Fort Lauderdale",
    items: [
      { question: "¿Qué datos debe preparar el propietario de una embarcación al solicitar un servicio?", answer: "Defina con su personal qué características de la embarcación, ubicación y descripción del trabajo sirven para una primera evaluación. El formulario puede orientar la solicitud sin presentarla como un trabajo aceptado o un horario confirmado. Explique cómo revisará su equipo la información y acordará el siguiente paso." },
      { question: "¿Cómo puede un negocio náutico aclarar dónde realiza los trabajos?", answer: "Distinga los trabajos en sus propias instalaciones de los que realiza donde se encuentra la embarcación, si ofrece ambas opciones. Publique las ubicaciones y condiciones de acceso que realmente atiende. Para otra marina o punto de atraque, facilite una consulta al personal en lugar de sugerir una cobertura sin límites." },
      { question: "¿Puede un administrador de propiedades o condominios compartir datos de acceso?", answer: "Revise qué necesita su equipo para coordinar una visita y cómo debe compartirlo el administrador. La consulta inicial puede identificar el tipo de propiedad y a la persona que organiza el acceso. Decida qué datos corresponden al formulario público y cuáles recogerá el personal después mediante su proceso habitual." },
      { question: "¿En qué debe diferenciarse la consulta de una propiedad de la de un vendedor?", answer: "La primera debe identificar la propiedad sobre la que pregunta el visitante. Quien desea vender necesita otra conversación sobre su inmueble y el servicio que busca. Defina opciones distintas y quién atiende cada una. Si los listados provienen de otro sistema, revise esa conexión antes de incluirla en la cotización." },
      { question: "¿Qué ocurre cuando una propiedad publicada deja de estar disponible?", answer: "Acuerde quién mantiene la información y qué mostrará el sitio cuando cambie el estado de una propiedad. Si los datos llegan de otra fuente, defina su función dentro del alcance. Ofrezca una forma de consultar otras necesidades sin dejar que una página desactualizada sugiera que la propiedad sigue disponible." },
    ],
  },
  final: { ...shared.final, heading: "Definamos su sitio web en Fort Lauderdale" },
}
