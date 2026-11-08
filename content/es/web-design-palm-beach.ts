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
    { heading: "Diseño web para negocios de West Palm Beach", description: "Para un consultorio en West Palm Beach, organice el recorrido desde la elección de un servicio hasta la solicitud de una cita. La persona debe identificar la sede, conocer los servicios disponibles allí y encontrar las indicaciones de llegada y contacto que publica su negocio. Si tiene otras sedes, distinga la información de West Palm Beach para que nadie deba deducir dónde se ofrece cada servicio. Un negocio de gestión patrimonial necesita otra presentación: explique qué trabajo realiza, presente al equipo con información aprobada y describa la conversación inicial. Comparta las herramientas de citas o contacto de esa oficina para que el alcance refleje cómo atiende las solicitudes su personal. Defina quién mantendrá la información de cada sede cuando cambien el personal, los datos de contacto o la forma de solicitar citas." },
    { heading: "Diseño web para negocios de Boca Raton", description: "Para un negocio en Boca Raton, distinga la primera consulta de las solicitudes de pacientes o clientes actuales. Un consultorio o centro de estética puede explicar cómo pedir una cita y dirigir a sus pacientes al contacto o portal que ya utiliza. Una empresa de gestión patrimonial puede presentar su enfoque sin pedir datos financieros detallados en un formulario general. Si también tiene sede en West Palm Beach, publique los servicios, datos de contacto y pasos que corresponden a cada oficina; facilite que el visitante identifique qué sede atenderá su solicitud. Defina quién actualizará la información de contacto y citas de Boca Raton cuando ambas sedes compartan servicios, para que cada solicitud llegue al personal correspondiente." },
  ],
  industries: {
    heading: "Sitios web para los negocios de West Palm Beach y Boca Raton",
    introduction: "Definimos las páginas y las conexiones según las preguntas de sus clientes y el proceso de su equipo.",
    items: [
      { title: "Consultorios médicos y centros de estética", description: "Ayude a quien considera un consultorio en West Palm Beach o Boca Raton a conocer sus servicios, quién los presta y cómo solicitar una conversación o cita. Use las descripciones de servicios y la información del personal que proporcione y apruebe el consultorio. Defina si las solicitudes pasarán a su herramienta de citas y cómo contactan los pacientes actuales mediante sus canales habituales. El equipo de cumplimiento del propio consultorio revisa el contenido antes de publicarlo." },
      { title: "Gestión patrimonial", description: "Un sitio de gestión patrimonial en West Palm Beach o Boca Raton debe explicar los servicios reales de la empresa, cómo es la conversación inicial y a qué oficina contactar. Presente al equipo y los servicios con información proporcionada por la empresa. Separe la consulta general del portal o contacto habitual de los clientes actuales. Defina qué datos necesita el primer formulario sin pedir allí un historial financiero detallado. El equipo de cumplimiento de la propia empresa revisa el contenido antes de publicarlo." },
    ],
  },
  pricing: {
    ...shared.pricing,
    introduction: "Comience con una consulta gratuita sobre las páginas de cada sede en West Palm Beach o Boca Raton, la forma de solicitar citas o conversaciones y el contenido que proporcionará y aprobará su negocio. Antes del trabajo, recibe una cotización por escrito con un alcance fijo definido por los requisitos acordados.",
  },
  process: {
    ...shared.process,
    introduction: "Durante la consulta gratuita, identifique qué sede, servicios y opción de contacto representa cada página. Entregamos la cotización por escrito con un alcance fijo antes de pasar a diseño, revisiones, desarrollo y publicación. Organice la revisión del contenido por su propio equipo de cumplimiento dentro de esa secuencia para publicar el material aprobado por su negocio.",
  },
  faq: {
    heading: "Preguntas sobre su sitio web en West Palm Beach y Boca Raton",
    items: [
      { question: "¿Cómo damos contenido distinto a las sedes de West Palm Beach y Boca Raton?", answer: "Publique los servicios, el personal, los datos de contacto y la forma de solicitar citas o conversaciones que realmente corresponden a cada sede. Explique las diferencias que ayudan a elegir la oficina adecuada. Conserve la información común cuando sea útil, sin inventar diferencias locales ni limitarse a cambiar el nombre de la ciudad." },
      { question: "¿Puede un consultorio dirigir las solicitudes a la herramienta de citas que ya utiliza?", answer: "Comparta su proceso de citas y la herramienta actual durante la consulta. Defina si el sitio la enlazará o necesita otra conexión acordada, y distinga una solicitud de una confirmación. Su personal decide cómo revisa las solicitudes y cuándo se confirma una cita." },
      { question: "¿Quién revisa el contenido médico, estético y de gestión patrimonial?", answer: "Su consultorio o empresa proporciona la información y su propio equipo de cumplimiento revisa el contenido antes de publicarlo. Esa revisión determina qué material aprueba el negocio para el sitio. Incluya el material aprobado en las páginas de servicios y en la información de citas acordadas." },
      { question: "¿Qué debe enviar un posible cliente de gestión patrimonial en la primera consulta?", answer: "Defina con la empresa un contacto inicial breve: los datos de contacto y el motivo general pueden bastar para asignar la solicitud. Para cualquier intercambio posterior de información financiera detallada, use el proceso establecido por la empresa. Explique el siguiente paso en el formulario para que la persona sepa cómo responderá la empresa." },
      { question: "¿Los pacientes y clientes actuales deben usar el formulario general?", answer: "Explique el contacto o portal que su negocio ya utiliza para pacientes y clientes actuales, separado de la primera consulta. Comparta esos destinos al definir el alcance para facilitar el siguiente paso. El consultorio o la empresa decide qué opciones de contacto publica y quién mantiene las instrucciones actualizadas." },
    ],
  },
  final: { ...shared.final, heading: "Definamos su sitio web en West Palm Beach y Boca Raton" },
}
