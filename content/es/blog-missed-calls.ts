import type { SpanishBlogPostContent } from "@/content/types/blog-post"

const study = { label: "Fuente: 411 Locals, estudio sobre llamadas sin contestar", url: "https://411locals.us/small-business-owners-dont-answer-62-of-phone-calls/" }

export const blogPostContent: SpanishBlogPostContent = {
  path: "/es/blog/el-costo-real-de-las-llamadas-perdidas",
  title: "El costo real de las llamadas perdidas",
  omitBrandInTitle: true,
  description: "Qué le cuesta a una pequeña empresa cada llamada sin contestar, cómo calcular cuánto pierde al año y cómo una recepción virtual cambia la ecuación.",
  keyword: "costo de las llamadas perdidas",
  category: "Eficiencia del negocio",
  published: "2026-11-15T08:00:00Z",
  introduction: [
    "Para muchas pequeñas empresas, el teléfono sigue siendo el principal canal de ventas. No un formulario ni un chatbot, sino la llamada de alguien que está listo para comprar.",
    "Esto es lo que ocurre cuando esa llamada no se contesta, y cómo calcular cuánto le está costando a su negocio.",
  ],
  sections: [
    {
      heading: "Las llamadas que nadie contesta",
      paragraphs: [
        "En un estudio de 30 días con 85 pequeñas empresas, el 62 % de las llamadas quedó sin contestar. Detrás de cada una hay alguien que se cansó de esperar, dejó un mensaje que se devolverá cuando ya decidió, o llamó directamente a otro negocio que sí contestó.",
        "No es que a los dueños de pequeñas empresas no les importen sus clientes. Es que están en una reunión, en otra llamada, atendiendo a un cliente o simplemente no tienen suficiente personal para el volumen de llamadas que reciben.",
      ],
      sources: [study],
    },
    {
      heading: "Cuánto vale realmente cada llamada",
      paragraphs: [
        "Puede estimar su exposición con una cuenta sencilla. Tome la cantidad de llamadas perdidas al mes y multiplíquela por el valor promedio de un cliente. Multiplique el resultado por 12 meses y luego por la proporción de esas personas que no vuelve a llamar. El total es una estimación de los ingresos que se le escapan cada año.",
        "Use sus propios números: su registro de llamadas, el valor real de sus clientes y lo que observa cuando devuelve llamadas. Si un cliente le compra varias veces o le recomienda a otros, una sola llamada perdida vale más que la primera venta.",
      ],
    },
    {
      heading: "Fuera del horario es donde más se pierde",
      paragraphs: [
        "A muchos dueños les sorprende que el mayor problema no suele estar en el horario de oficina, sino en las noches, los fines de semana y la hora del almuerzo: justo cuando muchos clientes tienen tiempo para llamar.",
        "En servicios para el hogar, salud, servicios legales y financieros, las consultas fuera del horario son oportunidades importantes. Quien tiene una emergencia de plomería a las 7 de la noche no quiere dejar un mensaje de voz; quiere que alguien conteste, y el primer negocio que lo hace se queda con el trabajo. Cada llamada sin contestar fuera del horario es un prospecto que usted ya pagó por atraer, con publicidad, SEO, recomendaciones o la reputación de su negocio, y que termina en manos de quien conteste primero.",
      ],
    },
    {
      heading: "Cómo cambia la ecuación una recepción virtual",
      paragraphs: [
        "Una recepción virtual contesta cada llamada, recibe a cada visitante y dirige cada consulta a la persona adecuada, sin el costo de contratar a una recepcionista en planta.",
        "Lo más importante es que deja de perder ingresos al inicio del proceso de venta. Cada persona que llama a su negocio, en horario de oficina, por la noche o el fin de semana, recibe una respuesta real. Su publicidad pagada convierte y sus recomendaciones no terminan en el buzón de voz. Cuando las llamadas quedan sin contestar, la solución no es gastar más en marketing, sino tener a alguien que conteste.",
      ],
    },
  ],
  ctaHeading: "Deje de enviar prospectos a la competencia",
  ctaDescription: "Vea cómo la recepción virtual de Castlestone mantiene cada llamada atendida.",
  ctaLabel: "Agende una consulta con nuestro equipo",
  servicePath: "/es/servicios/recepcion-virtual",
  serviceLabel: "servicio de recepción virtual",
  serviceIntroduction: "Si quiere que alguien conteste todas sus llamadas, conozca nuestro",
}
