import type { SpanishBlogPostContent } from "@/content/types/blog-post"

const fccRule = "https://www.ecfr.gov/current/title-47/chapter-I/subchapter-B/part-64/subpart-L/section-64.1200"

export const blogPostContent: SpanishBlogPostContent = {
  path: "/es/blog/marketing-por-sms-plataforma-o-servicio-gestionado",
  title: "Marketing por SMS: plataforma o servicio gestionado",
  description: "Compare una plataforma de marketing por SMS con un servicio gestionado: configuración, consentimiento, bajas, horarios de envío, integraciones e informes.",
  keyword: "plataformas de marketing por SMS",
  category: "Marketing por SMS",
  published: "2026-11-13T08:00:00Z",
  introduction: "Las plataformas de marketing por SMS le dan a su negocio herramientas para crear y enviar campañas de mensajes de texto. Un servicio gestionado suma personas que planifican, preparan y ejecutan esas campañas dentro de un alcance acordado. En ambos casos, alguien dentro de su negocio debe aprobar las ofertas, confirmar los permisos de los clientes y tomar decisiones. La comparación útil es cuánto trabajo queda en manos de su equipo después de contratar.",
  sections: [
    {
      heading: "Empiece por la tarea que necesita que cumplan los SMS",
      paragraphs: [
        "Elija un caso de uso concreto antes de comparar proveedores: una promoción para suscriptores, un recordatorio ligado a una cita o un seguimiento después de una consulta. Son procesos distintos, con audiencias y requisitos de permiso diferentes. Anote qué activa el mensaje, qué debe decir y qué debe pasar cuando alguien responde.",
        "En un negocio hipotético de reparaciones, una oferta de temporada podría requerir una audiencia seleccionada y una aprobación antes del envío. Un recordatorio de cita necesita información de reserva exacta y una forma de detener el mensaje si la cita cambia. Use su proceso real como guía para la demostración, en lugar de juzgar un producto por su galería de plantillas.",
      ],
    },
    {
      heading: "Configuración: acceso al software frente a un proceso que funciona",
      paragraphs: [
        "Con un software de autoservicio, asigne a alguien para configurar la cuenta, preparar los registros de suscriptores, redactar los mensajes, crear segmentos y probar la campaña. Pregunte a la plataforma qué pasos de registro o verificación del remitente aplican, quién entrega la información y qué debe aprobarse antes de enviar. Tener acceso a la cuenta no termina la configuración.",
        "Un servicio gestionado puede encargarse de parte de ese trabajo, pero revise el alcance con cuidado. Pregunte si la incorporación incluye revisar la lista existente, configurar formularios, redactar campañas, probar conexiones y documentar aprobaciones. Su negocio sigue aportando datos exactos y decidiendo qué ofertas puede cumplir. Acuerden qué significa estar listo para lanzar.",
      ],
    },
    {
      heading: "El consentimiento y las bajas necesitan un responsable",
      paragraphs: [
        "No trate una hoja de cálculo con teléfonos de clientes como una lista de marketing lista para usar. Primero confirme qué aceptó recibir cada persona y dónde consta ese permiso. Separe las audiencias promocionales de las notificaciones de citas o de cuenta. Revise el texto de inscripción propuesto frente a las normas y políticas que aplican a su campaña.",
        "Revise las normas que aplican a su campaña antes de elegir un proceso de consentimiento. Las disposiciones de la FCC sobre consentimiento en 47 CFR § 64.1200(a)(2) y sobre revocación en el párrafo (a)(10) cubren actividades específicas e incluyen condiciones y excepciones. Confirme qué requisitos aplican a sus mensajes, incluida la forma de documentar el permiso y de atender las bajas. Pregunte a su proveedor cómo sus políticas y su software apoyan ese proceso. No suponga que una configuración de la plataforma o un servicio gestionado resuelve el cumplimiento.",
        "En una configuración de autoservicio, pregunte quién vigila las solicitudes de baja y mantiene las exclusiones sincronizadas entre listas y automatizaciones. En un servicio gestionado, haga la misma pregunta y deje la responsabilidad por escrito. Compruebe que una baja impida que otra campaña llegue a ese contacto. Revise cómo atiende su personal a un cliente que pide dejar de recibir mensajes por otro canal.",
      ],
      sources: [
        { label: "Fuente: FCC, 47 CFR § 64.1200(a)(2), consentimiento", url: `${fccRule}#p-64.1200(a)(2)` },
        { label: "Fuente: FCC, 47 CFR § 64.1200(a)(10), revocación del consentimiento", url: `${fccRule}#p-64.1200(a)(10)` },
      ],
    },
    {
      heading: "Horarios de envío: pruebe el calendario, incluidas las automatizaciones",
      paragraphs: [
        "Pregunte cómo determina el sistema la zona horaria de cada destinatario y cómo aplica los horarios de envío permitidos. Revise por separado las campañas programadas y los mensajes que se activan por un evento: un formulario enviado tarde en la noche podría iniciar una automatización aunque su personal no esté disponible. Decida qué pasa cuando falta la información de ubicación y cómo se maneja un mensaje retrasado.",
        "Revise las normas que le aplican antes de definir los horarios de envío. La regla de horarios de la FCC para solicitudes telefónicas en 47 CFR § 64.1200(c)(1) es una de las disposiciones que conviene revisar; confirme si cubre su campaña, junto con los requisitos estatales y las políticas del proveedor que correspondan. Pida que confirmen esos requisitos antes del lanzamiento. Contratar a alguien para operar el software no reemplaza esa revisión ni aclara registros de consentimiento incompletos.",
      ],
      sources: [
        { label: "Fuente: FCC, 47 CFR § 64.1200(c)(1), horarios de llamadas y mensajes", url: `${fccRule}#p-64.1200(c)(1)` },
      ],
    },
    {
      heading: "Conexiones con sus herramientas: siga el recorrido de los datos",
      paragraphs: [
        "Haga una lista de las herramientas que su negocio ya usa para contactos, citas, ventas y formularios. Luego describa la información que debe transportar cada conexión. Una conexión que copia un número de teléfono puede dejar fuera los datos de consentimiento, el estado de una cancelación o la persona responsable de responder. Pida a los proveedores que demuestren el recorrido completo.",
        "Con una plataforma, su equipo quizá deba configurar la conexión e investigar los errores. Con un servicio gestionado, confirme si la supervisión y las reparaciones están incluidas. Pruebe contactos duplicados, citas modificadas, envíos fallidos y bajas. Decida qué sistema tiene el registro oficial para que las actualizaciones contradictorias no dejen a su equipo adivinando.",
      ],
    },
    {
      heading: "Informes: relacione la actividad con resultados del negocio",
      paragraphs: [
        "Pida un informe de ejemplo antes de elegir cualquiera de los dos modelos. Busque fallas de entrega, respuestas, actividad en enlaces cuando se mida y bajas, junto con la audiencia y el propósito de la campaña. Un mensaje entregado no demuestra que alguien lo leyó o compró algo. Pregunte cómo distingue el informe un evento de la plataforma de un resultado confirmado del negocio.",
        "Si le importan las citas o las ventas, defina dónde se registran esas acciones y cómo se asociarán con una campaña. Anote las limitaciones, incluidas las compras hechas por otro canal. Con un software de autoservicio, asigne a alguien para interpretar el informe. Con un servicio gestionado, acuerden cuándo explicará el equipo los hallazgos y propondrá el siguiente cambio.",
      ],
    },
    {
      heading: "El tiempo del dueño: cuente también la revisión y el seguimiento",
      paragraphs: [
        "El autoservicio puede funcionar en un negocio con un empleado al que le guste el trabajo de campañas y que tenga un espacio fijo para hacerlo en su agenda. Incluya en esa agenda la revisión de listas, la redacción, las aprobaciones, las pruebas, las respuestas y los informes. Pregunte quién cubre el trabajo durante una ausencia. Una bandeja de respuestas desatendida puede arruinar una campaña bien organizada.",
        "Un servicio gestionado le conviene a un dueño que quiere que un equipo se encargue de la ejecución y puede dar aprobaciones a tiempo. Aclare quién responde a los clientes, qué preguntas requieren a su personal y cuándo debe pausarse una campaña. Usted sigue teniendo que confirmar la disponibilidad, aprobar la oferta e informar al servicio sobre cambios que afecten a los clientes.",
      ],
    },
    {
      heading: "Compare el alcance completo antes de decidir",
      paragraphs: [
        "Pida un desglose por escrito del acceso a la plataforma, el uso de mensajes, el registro, el trabajo de integración, la producción de campañas y el soporte continuo. Verifique directamente con el proveedor cualquier cargo de terceros. Compare las responsabilidades incluidas en lugar de suponer que una suscripción de software y un servicio gestionado cubren el mismo trabajo. Pregunte también por la cancelación, la exportación de datos y el acceso al historial de campañas.",
        "Lleve un resumen real de campaña a cada conversación. Pregunte quién la preparará, quién la aprueba, cómo se atienden las bajas y qué mostrará el siguiente informe. Elija el esquema que su negocio pueda operar de manera constante, con responsabilidades claras desde la inscripción hasta el seguimiento del cliente.",
      ],
    },
  ],
  ctaHeading: "Planifique un proceso de SMS que su equipo pueda manejar",
  ctaDescription: "Hable con el equipo de Castlestone sobre su audiencia, sus herramientas actuales, las responsabilidades de cada campaña y su proceso de seguimiento.",
  ctaLabel: "Agende una consulta sobre marketing por SMS",
  servicePath: "/es/servicios/marketing-por-sms",
  serviceLabel: "servicios de marketing por SMS",
  serviceIntroduction: "Para conversar sobre un enfoque gestionado, conozca nuestros",
}
