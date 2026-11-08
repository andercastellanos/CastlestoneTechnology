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
      { title: "Turismo", description: "Para una experiencia en Orlando, ayude al visitante a decidir si encaja en el día que está organizando. Explique la duración, el punto de encuentro, qué debe llevar y las condiciones de participación que informa su negocio. Distinga una consulta para un grupo privado de una reserva individual. Si el clima puede modificar su operación, indique dónde publica las novedades y cómo contactar al personal. Revise el paso a su sistema de entradas o reservas sin suponer que el sitio mostrará disponibilidad en tiempo real." },
      { title: "Hospitalidad", description: "Un sitio de hospitalidad en Orlando puede orientar al huésped antes y después de reservar. Separe los detalles del alojamiento de las instrucciones de llegada, el estacionamiento y el contacto para quienes ya tienen una reserva. Presente con claridad la ubicación para que cada visitante organice sus traslados sin promesas de tiempos de viaje. Defina cómo se consultan los cambios de reserva y quién atiende las estadías de grupos. Si utiliza un proveedor externo para reservar, el sitio debe dejar claro cuándo se pasa a ese servicio." },
      { title: "Servicios para el hogar", description: "Quien busca un servicio para su hogar en Orlando necesita saber si usted atiende su dirección y realiza ese tipo de trabajo. Publique la cobertura real y detalle qué incluye cada servicio. El formulario puede pedir la ubicación, una descripción del problema y la forma de contacto; agregue fotografías solo si ayudan a su equipo a evaluar la solicitud. En una propiedad de alquiler, explique cómo debe coordinar el acceso el propietario o administrador. Distinga la solicitud de una visita de una cita confirmada." },
    ],
  },
  pricing: {
    ...shared.pricing,
    introduction: "Use la consulta gratuita para definir qué debe ocurrir antes de comprar una entrada, reservar una estadía o solicitar un trabajo en una propiedad de Orlando. Las páginas, el contenido y las conexiones acordadas quedan en una cotización por escrito con un alcance fijo antes de iniciar el proyecto.",
  },
  process: {
    ...shared.process,
    introduction: "Primero diferenciamos las consultas de quien planea un viaje, quien ya es huésped y quien necesita un servicio en una propiedad. Tras la consulta gratuita, usted revisa la cotización por escrito con un alcance fijo. Diseño, revisiones, desarrollo y publicación siguen ese alcance, con atención al paso hacia la reserva o la solicitud correspondiente.",
  },
  faq: {
    heading: "Preguntas sobre su sitio web en Orlando",
    items: [
      { question: "¿Cómo puede saber el visitante si una experiencia en Orlando encaja en sus planes?", answer: "Presente los horarios que publica su negocio, la duración prevista, el punto de encuentro y lo que implica participar. Facilite una consulta antes de comprar cuando la persona necesite aclarar su situación. Si otra herramienta gestiona las entradas, identifique ese paso sin sugerir que el sitio garantiza por sí solo un lugar." },
      { question: "¿Qué debe decir el sitio cuando el clima afecta una actividad?", answer: "Utilice las instrucciones de operación y las políticas aprobadas por su negocio. Defina dónde publicará los cambios, qué contacto deben usar los visitantes y qué información se envía con la reserva. El sitio debe explicar ese proceso sin inventar una promesa de cancelación ni anticipar si la actividad se realizará." },
      { question: "¿Cómo separamos una nueva reserva de las preguntas sobre una estadía ya reservada?", answer: "Ofrezca opciones claras para cada caso. Quien compara alojamientos necesita sus características y la forma de reservar; un huésped puede buscar instrucciones de llegada o ayuda con un cambio. Comparta su proveedor de reservas y el proceso de atención para incluir esos pasos en el alcance acordado." },
      { question: "¿Puede un administrador de alquileres solicitar un servicio sin confirmar una visita?", answer: "Prepare una solicitud con la dirección, el trabajo necesario y la persona que coordina el acceso. Explique que el personal revisará la información y acordará el siguiente paso. Las conexiones con calendarios o herramientas de trabajo deben respetar esa revisión, sin presentar como confirmada una visita que aún no lo está." },
      { question: "¿Cómo explicamos qué direcciones de Orlando cubre un servicio para el hogar?", answer: "Publique solo las zonas que atiende y los servicios disponibles allí. Si la cobertura depende de la dirección o del trabajo, facilite una consulta breve en lugar de dar por aceptada cualquier solicitud. Defina quién actualizará esa información cuando cambie su área de atención." },
    ],
  },
  final: {
    ...shared.final,
    heading: "Definamos su sitio web en Orlando",
  },
}
