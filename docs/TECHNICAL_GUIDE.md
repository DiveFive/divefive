# DiveFive Webapp – Guía Técnica

## 1. Arquitectura

- **Framework:** Vue 3 + Vite + JavaScript
- **Internacionalización:** Store reactivo personalizada (`src/i18n/`)
- **Theming:** Variables CSS con `prefers-color-scheme`
- **Contenido administrable:** Archivos Markdown e imágenes en `/content/` → compilados a JSON en `/public/_data`
- **Hosting:** GitHub Pages con deploy automático vía GitHub Actions

## 2. Estructura de carpetas

```
src/                # Código principal Vue
content/            # Archivos editables por cliente
├── legal/         # privacy.{locale}.md, terms.{locale}.md
├── appcopy/       # features.{locale}.md, faq.{locale}.md...
└── screenshots/   # screenshots/{locale}/
public/_data/       # JSON generado desde /content
scripts/            # Scripts utilitarios
docs/               # Documentación técnica y administrativa
```

## 3. Scripts

- `npm run dev` → entorno local
- `npm run build` → build de producción (ejecuta `scripts/build-manifests.mjs`)
- `scripts/build-manifests.mjs` → convierte `/content/*.md` a `/public/_data/*.json`
- `scripts/check-hardcoded.js` → lint para detectar strings sin i18n
- `npm run check:i18n` → valida llaves por locale y produce `scripts/i18n-report.json`

## 4. Convenciones de código

- **No hardcodear strings** → usar `t('clave')` o `.md` de `/content`.
- **Tokens semánticos** para colores/espaciados (`--color-surface-primary`).
- **Accesibilidad**: cumplir WCAG AA, roles y aria-labels.
- **Naming i18n**: `scope.subscope.purpose.name`.

## 5. Deploy en GitHub Pages

- Configuración en `vite.config.js` (`base: '/DiveFive-webapp/'`).
- Workflow en `.github/workflows/deploy.yml`:
  - Instala dependencias.
  - Corre `scripts/build-manifests.mjs`.
  - Ejecuta `npm run build` con `GITHUB_PAGES=1`.
  - Publica en Pages.
