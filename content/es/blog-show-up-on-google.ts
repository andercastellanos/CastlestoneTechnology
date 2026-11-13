import type { SpanishBlogPostContent } from "@/content/types/blog-post"

export const blogPostContent: SpanishBlogPostContent = {
  path: "/es/blog/como-hacer-que-mi-pagina-web-aparezca-en-google",
  title: "Cómo hacer que mi página web aparezca en Google",
  description: "Guía práctica de Search Console, sitemaps, solicitudes de indexación, títulos, datos del negocio, versión móvil y contenido útil para aparecer en Google.",
  keyword: "cómo hacer que mi página web aparezca en Google",
  category: "SEO local",
  published: "2026-11-13T08:00:00Z",
  introduction: "Para que su página web aparezca en Google, primero compruebe que sus páginas se puedan encontrar y entender. Si ha buscado “cómo hacer que mi página web aparezca en Google”, empiece con las revisiones de esta guía. Separe los problemas técnicos de acceso del trabajo de hacer que sus páginas sean útiles para los clientes que quiere atraer.",
  sections: [
    {
      heading: "Revise la página en Search Console",
      paragraphs: [
        "Configure Google Search Console y verifique el acceso a la propiedad de su sitio web. Inspeccione la dirección completa de una página importante, como la página de inicio o su página de servicio principal. Anote lo que la inspección indica sobre la indexación y el acceso. Entregue a su proveedor la URL exacta y el problema reportado, en lugar de una solicitud general de “arreglar el SEO”.",
        "La guía de Google para solicitar un nuevo rastreo explica que la herramienta de inspección de URL sirve para pedir el rastreo de páginas individuales que usted administra. Una solicitud no garantiza la inclusión en los resultados de búsqueda. Repetir la solicitud para la misma página no acelera el rastreo, así que investigue cualquier problema reportado antes de enviarla de nuevo.",
      ],
      sources: [
        { label: "Fuente: Google Search Console", url: "https://search.google.com/search-console/about" },
        { label: "Fuente: Google, cómo pedir a Google que vuelva a rastrear sus URL", url: "https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl" },
      ],
    },
    {
      heading: "Envíe un mapa del sitio que refleje su sitio publicado",
      paragraphs: [
        "Pida a su proveedor la dirección del mapa del sitio (sitemap); no suponga un nombre de archivo sin abrirlo. Revise si incluye sus páginas públicas actuales. Elimine las referencias a páginas que ya no deberían estar y asegúrese de que las páginas de servicio importantes tengan enlaces que funcionen desde el menú o desde contenido relacionado.",
        "Envíe el mapa del sitio en Search Console y revise los errores de procesamiento. La documentación de Google sobre sitemaps explica cómo crear y enviar uno, incluido el uso de URL completas. Un mapa del sitio le da un inventario manejable para revisar con su proveedor. Manténgalo al día cuando agregue servicios, reemplace páginas o cambie la estructura del sitio.",
      ],
      sources: [
        { label: "Fuente: Google, cómo crear y enviar un sitemap", url: "https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap" },
      ],
    },
    {
      heading: "Resuelva los problemas de acceso antes de reescribirlo todo",
      paragraphs: [
        "Abra la página en una ventana privada del navegador, sin iniciar sesión. Compruebe que cargue, que muestre el contenido previsto y que no envíe a los visitantes a otro lugar. Pida a su proveedor que revise bloqueos de indexación accidentales, páginas no disponibles y configuraciones canónicas cuando Search Console identifique un problema. Guarde un registro de la corrección y de la dirección afectada.",
        "La guía de introducción al SEO de Google explica cómo las restricciones de acceso pueden afectar el descubrimiento y la indexación. Use esa guía junto con el informe de inspección, en lugar de cambiar configuraciones técnicas al azar. Después de una corrección, vuelva a probar la página publicada y solicite la indexación cuando corresponda. Mantenga el trabajo técnico de acceso separado de las decisiones sobre el mensaje de la página.",
      ],
      sources: [
        { label: "Fuente: Google, guía de introducción al SEO", url: "https://developers.google.com/search/docs/fundamentals/seo-starter-guide" },
      ],
    },
    {
      heading: "Escriba títulos y descripciones para cada página",
      paragraphs: [
        "Dé a cada página importante un título que describa su servicio y, cuando corresponda, su ubicación real. Un taller de reparaciones hipotético podría usar un título que describa la reparación de electrodomésticos en su zona de servicio y luego escribir una página que respalde esa promesa. Evite poner el mismo título genérico en todas las páginas o llenarlo con variaciones de una misma frase.",
        "La documentación de Google sobre los títulos en los resultados explica que usa varias fuentes para generarlos, incluido el elemento de título y los encabezados. Su guía sobre fragmentos explica que estos suelen salir del contenido de la página y pueden usar la metadescripción. Escriba una descripción breve y exacta, pero espere que el texto mostrado cambie según la búsqueda.",
      ],
      sources: [
        { label: "Fuente: Google, enlaces de título en los resultados", url: "https://developers.google.com/search/docs/appearance/title-link" },
        { label: "Fuente: Google, fragmentos y metadescripciones", url: "https://developers.google.com/search/docs/appearance/snippet" },
      ],
    },
    {
      heading: "Mantenga los datos del negocio claros y consistentes",
      paragraphs: [
        "Cree un registro de referencia con el nombre de su negocio, la dirección pública cuando corresponda, el teléfono, el sitio web y el horario. Compárelo con su página de contacto, sus páginas de ubicación, sus perfiles de negocio y los directorios relevantes. Corrija los datos desactualizados después de una mudanza o un cambio de número. Use su zona de servicio y su forma real de operar; no agregue una dirección solo para apuntar a una ciudad.",
        "Para el marcado técnico, la documentación de Google sobre LocalBusiness describe cómo los datos estructurados pueden comunicar detalles como el horario y la ubicación. Pregunte a su proveedor si encaja con su sitio y si coincide con lo que los clientes pueden leer. Trate la información de contacto exacta también como una tarea de servicio al cliente: llame al número y pruebe las indicaciones.",
      ],
      sources: [
        { label: "Fuente: Google, datos estructurados de LocalBusiness", url: "https://developers.google.com/search/docs/appearance/structured-data/local-business" },
      ],
    },
    {
      heading: "Pruebe las páginas en el celular y la velocidad de carga",
      paragraphs: [
        "Abra sus páginas principales en un celular y complete la acción que quiere que haga el cliente. ¿Puede leer los detalles del servicio, usar el menú, llamar al negocio y enviar el formulario? Fíjese en imágenes demasiado grandes, botones que se mueven y ventanas que tapan contenido útil. Pruebe el proceso de reserva hasta la confirmación final, incluida cualquier herramienta externa.",
        "La guía de Google sobre la indexación centrada en dispositivos móviles indica que usa la versión móvil del contenido para indexar y clasificar. Su guía sobre la experiencia en la página recomienda evaluar la experiencia en conjunto y explica que unas buenas métricas no garantizan posiciones altas. Use los informes de rendimiento para identificar correcciones concretas y vuelva a probar el recorrido real del cliente.",
      ],
      sources: [
        { label: "Fuente: Google, indexación centrada en dispositivos móviles", url: "https://developers.google.com/search/docs/crawling-indexing/mobile/mobile-sites-mobile-first-indexing" },
        { label: "Fuente: Google, experiencia en la página", url: "https://developers.google.com/search/docs/appearance/page-experience" },
      ],
    },
    {
      heading: "Publique respuestas a preguntas reales de sus clientes",
      paragraphs: [
        "Reúna las preguntas que hacen los clientes antes de reservar o pedir una cotización. Explique qué incluye su servicio, en qué zonas trabaja, cómo funcionan las citas y qué debe preparar el cliente. Dé a cada servicio principal suficiente detalle para apoyar una decisión. Use ejemplos solo cuando pueda identificarlos con exactitud y publique logros de proyectos solo cuando pueda respaldarlos.",
        "La guía de Google sobre contenido útil describe un enfoque en información creada para beneficiar a las personas. Úsela como criterio de edición: ¿la página seguiría ayudando a un cliente si llegara a ella por un enlace directo? Elimine párrafos repetitivos y promesas sin respaldo. Asigne a alguien para actualizar la página cuando cambien sus servicios o su proceso.",
      ],
      sources: [
        { label: "Fuente: Google, cómo crear contenido útil, fiable y centrado en las personas", url: "https://developers.google.com/search/docs/fundamentals/creating-helpful-content" },
      ],
    },
    {
      heading: "Consiga enlaces relevantes y mida el progreso útil",
      paragraphs: [
        "Busque lugares legítimos donde la gente ya busca información sobre negocios como el suyo, como el directorio de una asociación del sector o la página de socios de un proveedor cuando usted califique. Aporte información útil a través de relaciones reales. La guía de introducción al SEO de Google habla sobre cómo promocionar un sitio, y sus políticas sobre spam de enlaces prohíben los esquemas diseñados para manipular las posiciones. Evite comprar paquetes de enlaces para posicionarse.",
        "Lleve un registro sencillo de las páginas inspeccionadas, las correcciones, el contenido publicado y las consultas reales. Revise Search Console junto con sus registros de reservas o contactos para que el trabajo de visibilidad siga conectado con el negocio. Si necesita ayuda para ordenar los siguientes pasos, lleve su sitio web actual y sus servicios prioritarios a una consulta.",
      ],
      sources: [
        { label: "Fuente: Google, cómo promocionar su sitio web", url: "https://developers.google.com/search/docs/fundamentals/seo-starter-guide#promoting" },
        { label: "Fuente: Google, políticas sobre spam de enlaces", url: "https://developers.google.com/search/docs/essentials/spam-policies#link-spam" },
      ],
      serviceLink: { label: "Si su trabajo de visibilidad empieza con un sitio nuevo o un rediseño, conozca nuestros servicios de diseño web.", href: "/es/servicios/diseno-web" },
    },
  ],
  ctaHeading: "Convierta estas revisiones en un plan práctico",
  ctaDescription: "Revise sus páginas, la información de su negocio y sus prioridades de búsqueda con el equipo de Castlestone.",
  ctaLabel: "Agende una consulta sobre SEO local",
  servicePath: "/es/servicios/seo-local",
  serviceLabel: "servicios de SEO local",
  serviceIntroduction: "Para ordenar los siguientes pasos con nuestro equipo, conozca nuestros",
}
