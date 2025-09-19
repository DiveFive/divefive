# DiveFive Marketing Webapp

DiveFive es la landing oficial de la app de bitácoras de buceo **DiveFive**. El sitio prioriza rendimiento, accesibilidad y mantenimiento: todo el contenido es internacionalizable, los temas siguen los tokens de marca y cualquier persona del equipo puede actualizar textos o screenshots editando archivos locales.

## Tabla de contenidos
1. [Características](#características)
2. [Requisitos](#requisitos)
3. [Instalación y entorno local](#instalación-y-entorno-local)
4. [Comandos disponibles](#comandos-disponibles)
5. [Administración de contenido](#administración-de-contenido)
6. [Internacionalización](#internacionalización)
7. [Theming y accesibilidad](#theming-y-accesibilidad)
8. [Deploy y CI/CD](#deploy-y-cicd)
9. [Pruebas y QA](#pruebas-y-qa)
10. [Guías adicionales](#guías-adicionales)
11. [Soporte y contribución](#soporte-y-contribución)

## Características
- 🌐 **Triple idioma (en, es-MX, fr)** con fallback automático.
- 🌓 **Tema claro/oscuro automático** según `prefers-color-scheme`.
- 🖼️ **Screenshots gestionados desde `/content/`** y compilados en build.
- 📦 **Deploy continuo a GitHub Pages** vía GitHub Actions.
- 🛡️ **Accesibilidad AA**: contraste, focus ring y targets de 44×44 px.
- 📝 **Documentación profesional** para equipo técnico y operativo.

## Requisitos
- Node.js 20+
- npm 10+
- Git

## Instalación y entorno local
```bash
npm install
npm run build:content   # opcional, genera los JSON iniciales
npm run dev             # inicia Vite en http://localhost:5173
```

## Comandos disponibles
| Comando | Descripción |
| ------- | ----------- |
| `npm run dev` | Servidor local con hot reload. |
| `npm run build` | Compila contenido y genera `dist/` listo para producción. |
| `npm run build:content` | Sólo compila los manifiestos de `/content`. |
| `npm run preview` | Sirve la build localmente. |
| `npm run check:i18n` | Valida que todos los locales tengan las mismas llaves y produce `scripts/i18n-report.json`. |
| `npm run check:hardcoded` | Linter que detecta textos sin pasar por i18n. |

## Administración de contenido
Todo el material editable vive en `/content/`:

- `content/legal/` → `privacy.{locale}.md`, `terms.{locale}.md`.
- `content/appcopy/` → marketing extendido (`features.es-MX.md`, `faq.fr.md`, `pressKit.en.md`, etc.).
- `content/screenshots/{locale}/` → imágenes (`.png`, `.jpg`, `.webp`).

Durante el build, `scripts/build-manifests.mjs` genera JSON en `public/_data/` y copia las imágenes a `public/content/`. Cualquier cambio en `/content/` se refleja automáticamente tras `npm run build` o en el deploy.

## Internacionalización
- Traducciones cortas se gestionan en `src/i18n/locales/*.json`.
- `useI18n()` detecta idioma vía `?lang=`, `localStorage` o `navigator.language`.
- Las páginas consumen Markdown localizado desde `/_data/appcopy.{locale}.json` o `/_data/privacy.{locale}.json`.
- Ejecuta `npm run check:i18n` antes de subir cambios para asegurarte de que todos los locales están sincronizados.

## Theming y accesibilidad
- Variables semánticas en `src/styles/tokens.css` controlan superficies, textos y acentos.
- Overrides en `src/styles/theme.css` vinculan utilidades de Tailwind a los tokens.
- `useSystemTheme()` reacciona a `prefers-color-scheme` y actualiza `data-theme`.
- El componente `AppStoreBadge` escucha cambios de tema y de idioma para servir el SVG correcto.

## Deploy y CI/CD
- El repositorio se publica en GitHub Pages mediante `.github/workflows/deploy.yml`.
- El workflow instala dependencias, ejecuta `node scripts/build-manifests.mjs`, construye la SPA (`GITHUB_PAGES=1 npm run build`) y sube el artefacto.
- `vite.config.js` usa `base: '/DiveFive-webapp/'` cuando `GITHUB_PAGES=1`.

## Pruebas y QA
- `npm run check:hardcoded` evita cadenas sin i18n.
- `npm run check:i18n` asegura cobertura de llaves.
- `npm run build` sirve como verificación de integración (incluye generación de contenido).
- Revisa `docs/theme-audit.md` e `docs/i18n-coverage.md` para auditorías manuales.

## Guías adicionales
- [docs/TECHNICAL_GUIDE.md](docs/TECHNICAL_GUIDE.md)
- [docs/ADMIN_GUIDE.md](docs/ADMIN_GUIDE.md)
- [docs/i18n-coverage.md](docs/i18n-coverage.md)
- [docs/theme-audit.md](docs/theme-audit.md)

## Soporte y contribución
1. Abre un issue describiendo el cambio propuesto o bug.
2. Crea una rama desde `main` y sigue la checklist del PR template.
3. Ejecuta los comandos de QA antes de abrir la PR.
4. El equipo de diseño (`@andrea`) revisará cualquier cambio en estilos/páginas gracias a `CODEOWNERS`.

¿Preguntas? Escribe a [support@divefive.app](mailto:support@divefive.app) o revisa la guía administrativa.
