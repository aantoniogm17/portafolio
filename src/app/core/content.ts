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
    readonly graphHint: string;
    readonly graphAlt: string;
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
    readonly locationLabel: string;
    readonly location: string;
    readonly cvEs: string;
    readonly cvEn: string;
  };
  readonly footer: {
    readonly built: string;
    readonly year: string;
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
    eyebrow: 'Desarrollador de software · Tampico, México',
    name: 'Antonio García Morán',
    headline: 'Construyo el backend, la base de datos y la interfaz — y me aseguro de que las tres se entiendan.',
    lead:
      'Ingeniero en Sistemas Computacionales y estudiante de maestría en Ciencias de la Computación. ' +
      'Trabajé el ciclo completo de una aplicación de delivery: arquitectura, modelo de datos, módulos en C# y Angular, ' +
      'y las pruebas funcionales antes de cada entrega.',
    ctaPrimary: 'Ver proyectos',
    ctaSecondary: 'Descargar CV',
    graphHint: 'Pasa el cursor sobre un nodo',
    graphAlt:
      'Grafo interactivo que conecta las tecnologías que utilizo, agrupadas en desarrollo, datos y nube, y herramientas.',
  },
  about: {
    eyebrow: 'Quién',
    title: 'Sobre mí',
    paragraphs: [
      'Empecé a programar en el CBTIS y no me he despegado desde entonces. Estudié Ingeniería en Sistemas Computacionales en el Instituto Tecnológico de Ciudad Madero y ahí mismo curso la maestría.',
      'En SoftTam trabajé en una aplicación de delivery de comida. Participé en las decisiones de arquitectura y modelo de datos, desarrollé módulos web y móviles con Angular e Ionic sobre un backend en C#, diseñé la base en SQL Server e integré servicios de AWS y Firebase.',
      'Antes de dedicarme al desarrollo estuve del otro lado del mostrador: soporte técnico en 3M Informática, sistemas internos en CFE y tres años supervisando un equipo en Starbucks. De ahí traigo algo que no se aprende en un curso — entender qué necesita quien va a usar el software, y sostener la calma cuando algo se rompe a media operación.',
      'Busco integrarme a un equipo de desarrollo, en remoto o en la zona de Tampico, Madero y Altamira.',
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
        company: 'Starbucks',
        role: 'Supervisor',
        period: 'Nov 2022 — Ene 2026',
        bullets: [
          'Lideré un equipo de trabajo y supervisé el cumplimiento de procedimientos operativos.',
          'Generé reportes operativos y di seguimiento a métricas de desempeño de sucursal.',
          'Resolví problemas y tomé decisiones bajo presión, en operación continua.',
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
        name: 'SoftTam',
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
    locationLabel: 'Ubicación',
    location: 'Tampico, Tamaulipas, México',
    cvEs: 'CV en español',
    cvEn: 'CV en inglés',
  },
  footer: {
    built: 'Hecho con Angular. Código en GitHub.',
    year: '2026',
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
    eyebrow: 'Software developer · Tampico, Mexico',
    name: 'Antonio García Morán',
    headline: 'I build the backend, the database and the interface — and make sure all three agree.',
    lead:
      'Computer Systems Engineer and M.Sc. in Computer Science candidate. ' +
      'I worked across the full cycle of a food delivery application: architecture, data model, C# and Angular modules, ' +
      'and the functional testing before each release.',
    ctaPrimary: 'See projects',
    ctaSecondary: 'Download CV',
    graphHint: 'Hover a node',
    graphAlt:
      'Interactive graph connecting the technologies I work with, grouped into development, data and cloud, and tools.',
  },
  about: {
    eyebrow: 'Who',
    title: 'About me',
    paragraphs: [
      'I started programming in high school and never stopped. I studied Computer Systems Engineering at Instituto Tecnológico de Ciudad Madero, where I am now doing my master\u2019s degree.',
      'At SoftTam I worked on a food delivery application. I took part in architecture and data model decisions, built web and mobile modules with Angular and Ionic on a C# backend, designed the SQL Server database and integrated AWS and Firebase.',
      'Before moving into development I was on the other side of the counter: technical support at 3M Informática, internal systems at CFE, and three years supervising a team at Starbucks. That taught me something a course cannot — how to understand what the person using the software actually needs, and how to stay calm when something breaks mid-operation.',
      'I am looking to join a development team, either remotely or in the Tampico area.',
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
        company: 'Starbucks',
        role: 'Shift Supervisor',
        period: 'Nov 2022 — Jan 2026',
        bullets: [
          'Led a work team and supervised compliance with operating procedures.',
          'Produced operational reports and tracked store performance metrics.',
          'Solved problems and made decisions under pressure, in continuous operation.',
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
        name: 'SoftTam',
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
    locationLabel: 'Location',
    location: 'Tampico, Tamaulipas, Mexico',
    cvEs: 'CV in Spanish',
    cvEn: 'CV in English',
  },
  footer: {
    built: 'Built with Angular. Source on GitHub.',
    year: '2026',
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
