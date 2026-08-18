/**
 * Contenido del sitio en los dos idiomas.
 *
 * Todo el texto vive aquí y en ningún otro lugar: las plantillas nunca llevan
 * cadenas literales. Al estar tipado con `Content`, TypeScript marca un error
 * si una traducción queda incompleta — es imposible publicar el sitio con una
 * sección a medio traducir.
 */

export type Lang = 'es' | 'en';

export interface Job {
  readonly company: string;
  readonly role: string;
  readonly period: string;
  readonly bullets: readonly string[];
}

export interface Project {
  readonly name: string;
  readonly tagline: string;
  readonly summary: string;
  readonly contributions: readonly string[];
  readonly stack: readonly string[];
  readonly note: string;
  readonly url?: string;
}

export interface TechGroup {
  readonly label: string;
  readonly items: readonly string[];
}

export interface Content {
  readonly htmlLang: string;
  readonly nav: {
    readonly about: string;
    readonly experience: string;
    readonly projects: string;
    readonly stack: string;
    readonly contact: string;
    readonly cv: string;
    readonly skipToContent: string;
    readonly toggleLabel: string;
  };
  readonly hero: {
    readonly eyebrow: string;
    readonly name: string;
    readonly headline: string;
    readonly lead: string;
    readonly ctaPrimary: string;
    readonly ctaSecondary: string;
  };
  readonly about: {
    readonly eyebrow: string;
    readonly title: string;
    readonly paragraphs: readonly string[];
    readonly nowTitle: string;
    readonly now: readonly { readonly label: string; readonly value: string }[];
  };
  readonly experience: {
    readonly eyebrow: string;
    readonly title: string;
    readonly jobs: readonly Job[];
  };
  readonly projects: {
    readonly eyebrow: string;
    readonly title: string;
    readonly intro: string;
    readonly roleLabel: string;
    readonly stackLabel: string;
    readonly items: readonly Project[];
  };
  readonly tech: {
    readonly eyebrow: string;
    readonly title: string;
    readonly groups: readonly TechGroup[];
  };
  readonly contact: {
    readonly eyebrow: string;
    readonly title: string;
    readonly lead: string;
    readonly emailLabel: string;
    readonly cvEs: string;
    readonly cvEn: string;
  };
}

const EMAIL = 'aantoniogm17@gmail.com';

export const ES: Content = {
  htmlLang: 'es',
  nav: {
    about: 'Sobre mí',
    experience: 'Experiencia',
    projects: 'Proyectos',
    stack: 'Tecnologías',
    contact: 'Contacto',
    cv: 'CV',
    skipToContent: 'Saltar al contenido',
    toggleLabel: 'Cambiar a inglés',
  },
  hero: {
    eyebrow: 'Desarrollador de software',
    name: 'Antonio García Morán',
    headline: 'Construyo el backend, la base de datos y la interfaz. Priorizando la calidad, integridad y seguridad',
    lead:
      'Ingeniero en Sistemas Computacionales y estudiante de Maestría en Ciencias de la Computación. ' +
      'Cuento con la capacidad de diseñar la arquitectura, establecer un modelo de datos, crear módulos de trabajo ' +
      'y realizar las pruebas funcionales antes de cada entrega.',
    ctaPrimary: 'Ver proyectos',
    ctaSecondary: 'Descargar CV',
  },
  about: {
    eyebrow: 'Quién',
    title: 'Sobre mí',
    paragraphs: [
      'Lo que más me gusta de programar no es escribir código, es resolver problemas: entender qué necesita alguien, pensar cómo debería funcionar el sistema, y no soltarlo hasta que quede bien hecho, no solo que corra, sino que aguante. Eso incluye meterme a un sistema que ya existe, entender por qué se comporta como se comporta, y corregirlo sin romper nada más.',
      'Prefiero estar en la conversación desde que se decide la arquitectura, no solo ejecutando tareas ya definidas. Me gusta cuestionar el porqué de una decisión técnica antes de escribir la primera línea, y verificar que los datos digan lo que deberían decir antes de confiar en ellos.',
    ],
    nowTitle: 'Ahora mismo',
    now: [
      { label: 'Estudiando', value: 'Maestría en Ciencias de la Computación — ITCM' },
      { label: 'Investigando', value: 'Sistemas de recomendación con LLM y redes neuronales de grafos' },
      { label: 'Disponible', value: 'Medio tiempo o tiempo completo · Remoto o híbrido' },
    ],
  },
  experience: {
    eyebrow: 'Trayectoria',
    title: 'Experiencia',
    jobs: [
      {
        company: 'SoftTam',
        role: 'Desarrollador Jr',
        period: 'Sep 2025 — May 2026',
        bullets: [
          'Participé en la definición de la arquitectura de una aplicación de delivery de comida, en decisiones de estructura de backend y modelo de datos.',
          'Desarrollé funcionalidades web y móviles con Angular e Ionic sobre backend en C#.',
          'Diseñé y administré la base de datos relacional en SQL Server, con modelado de esquemas y consultas optimizadas.',
          'Integré AWS y Google Firebase para almacenamiento y autenticación, con manejo seguro de sesiones.',
        ],
      },
      {
        company: 'CFE — División de Distribución Golfo Centro',
        role: 'Residente Profesional',
        period: 'May 2024 — Sep 2024',
        bullets: [
          'Desarrollé y mantuve páginas web internas y sistemas de información institucionales para la gestión y el seguimiento de procesos operativos.',
          'Administré servidores: direccionamiento IP y control de accesos de usuarios.',
          'Elaboré reportes técnicos, inventarios de hardware y documentación de procesos.',
        ],
      },
      {
        company: '3M Informática',
        role: 'Técnico en Soporte',
        period: 'Ene 2017 — Ago 2018',
        bullets: [
          'Mantenimiento preventivo y correctivo de equipos de cómputo.',
          'Soporte técnico a usuarios de forma local y remota; instalación y configuración de software.',
          'Elaboración de documentación técnica y administrativa.',
        ],
      },
    ],
  },
  projects: {
    eyebrow: 'Trabajo',
    title: 'Proyectos',
    intro: 'Lo que he construido y qué parte me tocó.',
    roleLabel: 'Mi participación',
    stackLabel: 'Stack',
    items: [
      {
        name: 'SimonVa',
        tagline: 'Aplicación de delivery de comida — web y móvil',
        summary:
          'Plataforma de pedidos a domicilio con aplicación para el cliente, panel administrativo y backend propio. ' +
          'Entré al proyecto en la etapa de definición y me quedé hasta las pruebas previas a liberación.',
        contributions: [
          'Decisiones de arquitectura: estructura del backend y modelo de datos.',
          'Módulos web y móviles con Angular e Ionic sobre backend en C#.',
          'Diseño y administración de la base de datos en SQL Server.',
          'Autenticación y manejo seguro de sesiones de usuario.',
          'Integración de AWS y Firebase para almacenamiento y autenticación.',
          'Pruebas funcionales y validación de módulos antes de cada entrega.',
        ],
        stack: ['C#', 'Angular', 'Ionic', 'SQL Server', 'AWS', 'Firebase', 'Git'],
        note: 'Producto interno de SoftTam. El código no es público.',
        url: 'https://simonva.com/home',
      },
    ],
  },
  tech: {
    eyebrow: 'Herramientas',
    title: 'Tecnologías',
    groups: [
      { label: 'Desarrollo', items: ['C#', 'JavaScript', 'Java', 'Python', 'HTML', 'CSS', 'Angular', 'Ionic', 'ASP.NET'] },
      { label: 'Datos y nube', items: ['SQL Server', 'Oracle', 'AWS', 'Google Firebase'] },
      { label: 'Herramientas', items: ['Git', 'GitHub', 'Visual Studio', 'VS Code', 'Android Studio'] },
    ],
  },
  contact: {
    eyebrow: 'Siguiente paso',
    title: 'Hablemos',
    lead: 'Si buscas a alguien para tu equipo de desarrollo, escríbeme. Respondo el mismo día.',
    emailLabel: 'Correo',
    cvEs: 'CV en español',
    cvEn: 'CV en inglés',
  },
};

export const EN: Content = {
  htmlLang: 'en',
  nav: {
    about: 'About',
    experience: 'Experience',
    projects: 'Projects',
    stack: 'Stack',
    contact: 'Contact',
    cv: 'CV',
    skipToContent: 'Skip to content',
    toggleLabel: 'Switch to Spanish',
  },
  hero: {
    eyebrow: 'Software developer',
    name: 'Antonio García Morán',
    headline: 'I build the backend, the database and the interface, prioritizing quality, integrity and security',
    lead:
      'Computer Systems Engineer and Master’s student in Computer Science. ' +
      'I’m able to design the architecture, establish a data model, create work modules, ' +
      'and run functional testing before each release.',
    ctaPrimary: 'See projects',
    ctaSecondary: 'Download CV',
  },
  about: {
    eyebrow: 'Who',
    title: 'About me',
    paragraphs: [
      'What I like most about programming isn’t writing code, it’s solving problems: understanding what someone needs, thinking through how the system should work, and not letting go until it’s properly done, not just that it runs, but that it holds up. That includes digging into a system that already exists, understanding why it behaves the way it does, and fixing it without breaking anything else.',
      'I prefer being part of the conversation from the moment the architecture gets decided, not just executing tasks that are already defined. I like questioning the reasoning behind a technical decision before writing the first line, and verifying that the data says what it should before trusting it.',
    ],
    nowTitle: 'Right now',
    now: [
      { label: 'Studying', value: 'M.Sc. in Computer Science — ITCM' },
      { label: 'Researching', value: 'Recommender systems with LLMs and graph neural networks' },
      { label: 'Available', value: 'Part-time or full-time · Remote or hybrid' },
    ],
  },
  experience: {
    eyebrow: 'Track record',
    title: 'Experience',
    jobs: [
      {
        company: 'SoftTam',
        role: 'Junior Developer',
        period: 'Sep 2025 — May 2026',
        bullets: [
          'Contributed to the architecture definition of a food delivery application, in backend structure and data model decisions.',
          'Built web and mobile features with Angular and Ionic on a C# backend.',
          'Designed and administered the relational database in SQL Server, with schema modeling and query optimization.',
          'Integrated AWS and Google Firebase for storage and authentication, with secure session handling.',
        ],
      },
      {
        company: 'CFE — Golfo Centro Distribution Division',
        role: 'Professional Residency (Internship)',
        period: 'May 2024 — Sep 2024',
        bullets: [
          'Developed and maintained internal web pages and institutional information systems for managing and tracking operational processes.',
          'Server administration: IP addressing and user access control.',
          'Produced technical reports, hardware inventories and process documentation.',
        ],
      },
      {
        company: '3M Informática',
        role: 'IT Support Technician',
        period: 'Jan 2017 — Aug 2018',
        bullets: [
          'Preventive and corrective maintenance of computer equipment.',
          'On-site and remote user support; software installation and configuration.',
          'Technical and administrative documentation.',
        ],
      },
    ],
  },
  projects: {
    eyebrow: 'Work',
    title: 'Projects',
    intro: 'What I have built, and which part was mine.',
    roleLabel: 'My contribution',
    stackLabel: 'Stack',
    items: [
      {
        name: 'SimonVa',
        tagline: 'Food delivery application — web and mobile',
        summary:
          'Food ordering platform with a customer app, an admin panel and its own backend. ' +
          'I joined at the definition stage and stayed through the testing that preceded each release.',
        contributions: [
          'Architecture decisions: backend structure and data model.',
          'Web and mobile modules with Angular and Ionic on a C# backend.',
          'Design and administration of the SQL Server database.',
          'Authentication and secure user session handling.',
          'AWS and Firebase integration for storage and authentication.',
          'Functional testing and module validation before each release.',
        ],
        stack: ['C#', 'Angular', 'Ionic', 'SQL Server', 'AWS', 'Firebase', 'Git'],
        note: 'Internal SoftTam product. The source code is not public.',
        url: 'https://simonva.com/home',
      },
    ],
  },
  tech: {
    eyebrow: 'Toolkit',
    title: 'Technologies',
    groups: [
      { label: 'Development', items: ['C#', 'JavaScript', 'Java', 'Python', 'HTML', 'CSS', 'Angular', 'Ionic', 'ASP.NET'] },
      { label: 'Data and cloud', items: ['SQL Server', 'Oracle', 'AWS', 'Google Firebase'] },
      { label: 'Tools', items: ['Git', 'GitHub', 'Visual Studio', 'VS Code', 'Android Studio'] },
    ],
  },
  contact: {
    eyebrow: 'Next step',
    title: 'Let\u2019s talk',
    lead: 'If you are looking for someone to join your development team, write to me. I reply the same day.',
    emailLabel: 'Email',
    cvEs: 'CV in Spanish',
    cvEn: 'CV in English',
  },
};

export const DICTIONARY: Readonly<Record<Lang, Content>> = { es: ES, en: EN };

export const LINKS = {
  email: EMAIL,
  mailto: `mailto:${EMAIL}`,
  github: 'https://github.com/aantoniogm17',
  linkedin: 'https://www.linkedin.com/in/antonio-garc%C3%ADa-968b16311/',
  cvEs: 'cv/CV_Antonio_Garcia_Moran_ES.pdf',
  cvEn: 'cv/CV_Antonio_Garcia_Moran_EN.pdf',
} as const;
