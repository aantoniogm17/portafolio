# Portafolio

Sitio personal de una sola página, bilingüe
(español / inglés), tema oscuro, con un grafo de tecnologías interactivo
dibujado en canvas.

## Requisitos

- Node.js 20.19+ o 22.12+ (verifica con `node --version`)
- npm 10+

## Desarrollo local

```bash
npm install
npm start
```

Abre `http://localhost:4200`. Los cambios se recargan solos.

## Compilar para producción

```bash
npm run build
```

El resultado queda en `dist/portafolio/browser`.

## Antes de publicar — edita estos datos

Todo el contenido vive en **`src/app/core/content.ts`**. No hay texto suelto en
las plantillas; ahí cambias todo.

1. **Enlaces** (al final del archivo, objeto `LINKS`): reemplaza `TU-USUARIO`
   por tu usuario real de GitHub y de LinkedIn.
2. **Proyectos** (`items` dentro de `projects`, en las dos versiones ES y EN):
   agrega más entradas copiando la estructura de SimónVa.
3. **CV**: los PDF viven en `public/cv/`. Si actualizas el CV, reemplaza esos
   archivos con el mismo nombre.

## Estructura

```
src/app/
├─ core/
│  ├─ content.ts          Todo el texto, en ES y EN, tipado.
│  ├─ i18n.service.ts     Cambio de idioma con signals.
│  └─ reveal.directive.ts Animación al hacer scroll (IntersectionObserver).
└─ components/
   ├─ skill-graph.ts      Grafo de fuerzas en canvas.
   ├─ nav.ts  hero.ts  about.ts  experience.ts
   ├─ projects.ts  tech.ts  contact.ts
```
