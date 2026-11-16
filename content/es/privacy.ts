import type { LegalContent } from "@/content/types/legal"
import { formatContactAddress, LEGAL_ENTITY, SITE_CONFIG } from "@/lib/constants"

const email = { href: `mailto:${SITE_CONFIG.contact.email}`, label: SITE_CONFIG.contact.email }

export const privacyContent: LegalContent = {
  metadata_title: "Política de privacidad",
  metadata_description: "Cómo Castlestone Technology recopila, usa y protege su información personal, incluidos el consentimiento y la cancelación de mensajes de texto (SMS).",
  heading: "Política de privacidad",
  lastUpdated: "Última actualización: 15 de noviembre de 2026",
  sections: [
    {
      heading: "Quiénes somos",
      paragraphs: [[
        `Esta Política de privacidad explica cómo ${LEGAL_ENTITY.es} (“Castlestone Technology”, “nosotros”) recopila, usa y protege su información personal.`,
      ]],
    },
    {
      heading: "Información que recopilamos",
      paragraphs: [[
        "Recopilamos la información que usted nos proporciona directamente, como su nombre, correo electrónico, nombre de la empresa y número de teléfono cuando completa formularios en nuestro sitio o agenda una consulta.",
      ]],
    },
    {
      heading: "Cómo usamos su información",
      paragraphs: [[
        "Usamos su información para responder a sus consultas, prestar nuestros servicios, enviarle novedades relevantes sobre Castlestone Technology y mejorar la experiencia en nuestro sitio web. Nunca vendemos sus datos a terceros.",
      ]],
    },
    {
      heading: "Mensajes de texto (SMS)",
      paragraphs: [
        ["Si nos proporciona su número de teléfono móvil y acepta recibir mensajes de texto, podemos enviarle mensajes sobre su consulta, sus citas y los servicios que utiliza con nosotros. Solo enviamos mensajes de texto a quienes han dado su consentimiento, y aceptar recibirlos no es una condición para realizar ninguna compra."],
        ["La frecuencia de los mensajes varía. Pueden aplicarse tarifas de mensajes y datos."],
        ["Puede responder STOP en cualquier momento para dejar de recibir mensajes, y le enviaremos un mensaje para confirmar la cancelación. Responda HELP para obtener ayuda o escríbanos a ", email, "."],
        ["No compartimos números de teléfono móvil ni información de consentimiento para recibir SMS con terceros ni con empresas afiliadas con fines de marketing o promoción."],
      ],
    },
    {
      heading: "Cookies",
      paragraphs: [[
        "Nuestro sitio web utiliza cookies para entender cómo interactúan los visitantes con nuestras páginas. Puede desactivar las cookies en la configuración de su navegador en cualquier momento.",
      ]],
    },
    {
      heading: "Almacenamiento de datos",
      paragraphs: [[
        "Sus datos se almacenan de forma segura con prácticas estándar del sector. Usamos Supabase para el almacenamiento de la base de datos, alojada en infraestructura de AWS con cifrado en reposo y en tránsito.",
      ]],
    },
    {
      heading: "Servicios de terceros",
      paragraphs: [
        ["Usamos los siguientes servicios de terceros que pueden procesar sus datos: Google Calendar (reserva de citas), Google Analytics (analítica del sitio) y Resend (envío de correos electrónicos)."],
        [
          "El calendario de citas de nuestra página de reservas lo proporciona Google. Cuando lo carga o lo utiliza, su navegador se conecta con Google, que puede usar cookies y procesar la información de la reserva según su ",
          { href: "https://policies.google.com/privacy?hl=es", label: "Política de privacidad", external: true },
          ". También puede abrir la página de reservas directamente en Google Calendar.",
        ],
      ],
    },
    {
      heading: "Sus derechos",
      paragraphs: [[
        "Tiene derecho a solicitar el acceso, la corrección o la eliminación de sus datos personales en cualquier momento escribiéndonos a ",
        email,
        ".",
      ]],
    },
    {
      heading: "Contacto",
      paragraphs: [[
        "Si tiene preguntas sobre privacidad, escríbanos a ",
        email,
        ` o envíenos una carta a ${LEGAL_ENTITY.es}, ${formatContactAddress()}.`,
      ]],
    },
  ],
}
