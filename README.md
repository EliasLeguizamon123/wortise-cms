# Wortise CMS

Este proyecto es un **CMS (Content Management System)** desarrollado como challenge técnico para la empresa Wortise. Está construido utilizando [Next.js](https://nextjs.org/) y se conecta a una base de datos **MongoDB Atlas** en la nube.

## Introducción

Wortise CMS permite la gestión de artículos y usuarios, ofreciendo una experiencia moderna y optimizada tanto para desarrolladores como para usuarios finales. El sistema aprovecha las últimas características de Next.js y una arquitectura modular para facilitar su mantenimiento y escalabilidad.

## Tecnologías utilizadas

Las principales tecnologías y librerías empleadas en este proyecto (ver `package.json`) son:

- **Next.js** 14 (App Router)
- **React** (con Server y Client Components)
- **TypeScript**
- **MongoDB Atlas** (base de datos en la nube)
- **Zod** (validación de esquemas)
- **tRPC** (API type-safe para comunicación cliente-servidor)
- **React Hook Form** + **Zod Resolver**
- **TanStack Query** (data fetching con cache)
- **Tailwind CSS** (estilado)
- **Sonner** (notificaciones)
- **ESLint** y **Prettier** (calidad y formato de código)
- **PostCSS**
- **next/font** (optimización de fuentes)
- **Geist** (fuente principal de UI)
- **BetterAuth** (autenticación basada en cookies)

## Estructura de carpetas

La estructura principal del proyecto es la siguiente:

```
wortise-cms/
├── .env
├── .gitignore
├── components.json
├── eslint.config.mjs
├── next-env.d.ts
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── README.md
├── tsconfig.json
├── public/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── articles/
│   │       └── [authorId]/
│   │           ├── page.tsx
│   │           └── [articleId]/edit/page.tsx
│   ├── components/
│   ├── lib/
│   ├── models/
│   ├── trpc/
│   └── middleware.ts
├── .vscode/
│   └── settings.json
└── .next/
```

### Descripción de carpetas importantes

- **public/**: Archivos estáticos y recursos públicos.
- **src/app/**: Rutas y páginas principales de la aplicación.
- **src/components/**: Componentes reutilizables de React.
- **src/lib/**: Librerías y utilidades (por ejemplo, validaciones con Zod).
- **src/models/**: Definición de modelos y tipos.
- **src/trpc/**: Routers y configuración de tRPC para la API.
- **.next/**: Archivos generados tras el build (no editar manualmente).

## Autenticación

El sistema utiliza `better-auth` para manejar autenticación basada en cookies. El middleware protege rutas específicas, y los tokens de sesión se almacenan y consultan desde MongoDB. Solo el autor de un artículo puede editarlo.

## Conexión a la base de datos

La aplicación está conectada a una instancia de **MongoDB Atlas** en la nube, lo que permite almacenar y consultar los datos de manera segura y escalable.

## Cosas que mejoraría o implementaría

- Agregar paginación a la lista de artículos.
- Mejorar accesibilidad (a11y) en formularios y botones.
- SEO básico con metadatos dinámicos por artículo.
- Soporte para imágenes en los artículos.
- Versión mobile mejorada y navegación offline-first.
- Tests automatizados (unitarios y end-to-end con Playwright).
- Que usuarios no registrados puedan dar Like a los posts
- Tener un boton para compartir un post por redes sociales


## IA Utilizada

- [ChatGPT](https://chatgpt.com/share/687ff393-03fc-8010-83f2-a58113c8168b)
- [V0](https://v0.dev/chat/combined-react-login-form-cbUkKVEhpwZ)

---

_Desarrollado con ❤️ por Elias como parte del challenge técnico para Wortise._
