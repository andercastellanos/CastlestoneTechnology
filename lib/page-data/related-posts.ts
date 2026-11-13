export type RelatedPost = { path: string; title: string; related: readonly string[] }

// Article routes only; city landing pages have their own city navigation.
export const relatedPosts: readonly RelatedPost[] = [
  {
    path: "/es/blog/como-abrir-un-negocio-en-florida",
    title: "Cómo abrir un negocio en Florida: de la LLC a tu presencia en línea",
    related: [
      "/es/blog/cuanto-cuesta-una-pagina-web",
      "/es/blog/como-hacer-que-mi-pagina-web-aparezca-en-google",
      "/es/blog/vale-la-pena-el-seo-para-pequenas-empresas",
    ],
  },
  {
    path: "/blog/how-to-start-a-business-in-florida",
    title: "How to Start a Business in Florida: From LLC to Online",
    related: [
      "/blog/how-much-does-a-website-cost",
      "/blog/how-to-make-your-website-show-up-on-google",
      "/blog/is-seo-worth-it-for-small-business",
    ],
  },
  {
    "path": "/blog/5-tasks-to-delegate-to-your-va",
    "title": "5 Tasks You Should Stop Doing Yourself Right Now",
    "related": [
      "/blog/how-to-onboard-a-virtual-team-member",
      "/blog/the-real-cost-of-missed-calls",
      "/blog/how-do-ai-receptionists-work"
    ]
  },
  {
    "path": "/blog/how-to-onboard-a-virtual-team-member",
    "title": "How to Onboard a Virtual Team Member in Under a Week",
    "related": [
      "/blog/5-tasks-to-delegate-to-your-va",
      "/blog/how-do-ai-receptionists-work"
    ]
  },
  {
    "path": "/blog/how-do-ai-receptionists-work",
    "title": "How Do AI Receptionists Work?",
    "related": [
      "/blog/ai-receptionist-vs-answering-service",
      "/blog/the-real-cost-of-missed-calls"
    ]
  },
  {
    "path": "/blog/ai-receptionist-vs-answering-service",
    "title": "AI Receptionist vs. Answering Service: An AI Answering Service Guide",
    "related": [
      "/blog/how-do-ai-receptionists-work",
      "/blog/the-real-cost-of-missed-calls"
    ]
  },
  {
    "path": "/blog/the-real-cost-of-missed-calls",
    "title": "The Real Cost of Missed Calls for Small Businesses",
    "related": [
      "/blog/how-do-ai-receptionists-work",
      "/blog/ai-receptionist-vs-answering-service"
    ]
  },
  {
    "path": "/blog/how-much-does-a-website-cost",
    "title": "How Much Does a Website Cost in 2026?",
    "related": [
      "/blog/how-to-start-a-business-in-florida",
      "/blog/can-ai-build-a-website",
      "/blog/wordpress-vs-wix-vs-custom-website"
    ]
  },
  {
    "path": "/blog/can-ai-build-a-website",
    "title": "Can AI Build a Website?",
    "related": [
      "/blog/wordpress-vs-wix-vs-custom-website",
      "/blog/how-much-does-a-website-cost"
    ]
  },
  {
    "path": "/blog/wordpress-vs-wix-vs-custom-website",
    "title": "WordPress vs Wix vs. a Custom Website",
    "related": [
      "/blog/how-much-does-a-website-cost",
      "/blog/can-ai-build-a-website"
    ]
  },
  {
    "path": "/blog/sms-marketing-platforms-vs-done-for-you",
    "title": "SMS Marketing Platforms vs. Done-for-You SMS",
    "related": [
      "/blog/email-marketing-for-small-business",
      "/blog/how-do-ai-receptionists-work"
    ]
  },
  {
    "path": "/blog/email-marketing-for-small-business",
    "title": "Email Marketing for Small Business",
    "related": [
      "/blog/sms-marketing-platforms-vs-done-for-you",
      "/blog/how-do-ai-receptionists-work"
    ]
  },
  {
    "path": "/blog/geo-vs-seo",
    "title": "GEO vs. SEO: Generative Engine Optimization for ChatGPT",
    "related": [
      "/blog/how-to-make-your-website-show-up-on-google",
      "/blog/is-seo-worth-it-for-small-business"
    ]
  },
  {
    "path": "/blog/how-to-make-your-website-show-up-on-google",
    "title": "How to Make My Website Show Up on Google",
    "related": [
      "/blog/how-to-start-a-business-in-florida",
      "/blog/is-seo-worth-it-for-small-business",
      "/blog/geo-vs-seo"
    ]
  },
  {
    "path": "/blog/is-seo-worth-it-for-small-business",
    "title": "Is SEO Worth It for Small Business?",
    "related": [
      "/blog/how-to-make-your-website-show-up-on-google",
      "/blog/geo-vs-seo"
    ]
  },
  {
    "path": "/es/blog/cuanto-cuesta-una-pagina-web",
    "title": "Cuánto cuesta una página web para su negocio",
    "related": [
      "/es/blog/como-funciona-una-recepcionista-virtual-con-ia",
      "/es/blog/recepcionista-con-ia-vs-servicio-de-contestador"
    ]
  },
  {
    "path": "/es/blog/como-funciona-una-recepcionista-virtual-con-ia",
    "title": "Cómo funciona una recepcionista virtual con IA",
    "related": [
      "/es/blog/cuanto-cuesta-una-pagina-web",
      "/es/blog/recepcionista-con-ia-vs-servicio-de-contestador"
    ]
  },
  {
    "path": "/es/blog/recepcionista-con-ia-vs-servicio-de-contestador",
    "title": "Recepcionista virtual y servicio de contestador con IA: cómo elegir",
    "related": [
      "/es/blog/cuanto-cuesta-una-pagina-web",
      "/es/blog/como-funciona-una-recepcionista-virtual-con-ia"
    ]
  },
  {
    path: "/es/blog/marketing-por-sms-plataforma-o-servicio-gestionado",
    title: "Marketing por SMS: plataforma o servicio gestionado",
    related: [
      "/es/blog/email-marketing-para-pequenas-empresas",
      "/es/blog/como-funciona-una-recepcionista-virtual-con-ia",
    ],
  },
  {
    path: "/es/blog/wordpress-vs-wix-vs-pagina-web-a-medida",
    title: "WordPress vs. Wix vs. una página web a medida",
    related: [
      "/es/blog/cuanto-cuesta-una-pagina-web",
      "/es/blog/puede-la-ia-crear-una-pagina-web",
    ],
  },
  {
    path: "/es/blog/como-hacer-que-mi-pagina-web-aparezca-en-google",
    title: "Cómo hacer que mi página web aparezca en Google",
    related: [
      "/es/blog/como-abrir-un-negocio-en-florida",
      "/es/blog/vale-la-pena-el-seo-para-pequenas-empresas",
      "/es/blog/geo-vs-seo",
    ],
  },
  {
    path: "/es/blog/email-marketing-para-pequenas-empresas",
    title: "Email marketing para pequeñas empresas",
    related: [
      "/es/blog/marketing-por-sms-plataforma-o-servicio-gestionado",
      "/es/blog/como-funciona-una-recepcionista-virtual-con-ia",
    ],
  },
  {
    path: "/es/blog/geo-vs-seo",
    title: "GEO vs. SEO: optimización para búsquedas con IA",
    related: [
      "/es/blog/como-hacer-que-mi-pagina-web-aparezca-en-google",
      "/es/blog/vale-la-pena-el-seo-para-pequenas-empresas",
    ],
  },
  {
    path: "/es/blog/puede-la-ia-crear-una-pagina-web",
    title: "¿Puede la IA crear una página web?",
    related: [
      "/es/blog/wordpress-vs-wix-vs-pagina-web-a-medida",
      "/es/blog/cuanto-cuesta-una-pagina-web",
    ],
  },
  {
    path: "/es/blog/vale-la-pena-el-seo-para-pequenas-empresas",
    title: "¿Vale la pena el SEO para una pequeña empresa?",
    related: [
      "/es/blog/como-hacer-que-mi-pagina-web-aparezca-en-google",
      "/es/blog/geo-vs-seo",
    ],
  }
]
