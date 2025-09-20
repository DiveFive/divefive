# DiveFive Webapp
Estado: i18n (en/es-MX/fr) • theming auto (light/dark) • contenido administrable • GitHub Pages

## Objetivo
Sitio de DiveFive con contenido en `/content` (MD/TXT + imgs) que se compila a `/public/_data` en build.

## Stack
Vue 3 + Vite + TS • vue-i18n • CSS Vars + prefers-color-scheme • GitHub Actions (Pages)

## Quick Start
npm ci && npm run dev

## Build & Deploy
node scripts/build-manifests.mjs && npm run build  
El push a `main` publica en Pages (ver `.github/workflows/deploy.yml`).

## Estructura
src/ • content/ (legal, appcopy, screenshots) • public/_data • scripts/ • docs/

## i18n
UI corta: `src/i18n/*.json` • Textos largos: `/content/appcopy` y `/content/legal`

## Theming
Automático (sin botón). Tokens semánticos. No cambia layout ni colores aprobados.

## App Store Badge
Cambia según idioma/tema (negro en light, blanco en dark). Ver `src/components/AppStoreBadge.vue`.

## Documentación
docs/TECHNICAL_GUIDE.md • docs/ADMIN_GUIDE.md • docs/DESIGN_RULES.md • docs/DESIGN_PHILOSOPHY.md • docs/BRAND_REFERENCES.md

## Calidad
WCAG AA • aria • E2E smoke locales/temas • lint i18n
