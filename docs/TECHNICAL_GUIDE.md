# DiveFive Webapp – Guía Técnica
## Arquitectura
Vue 3 + Vite + TS • vue-i18n • CSS vars + prefers-color-scheme • Pages

## Flujo de contenido
/content -> scripts/build-manifests.mjs -> /public/_data -> consumo por vistas

## Carpetas
content/{legal, appcopy, screenshots/{locale}} • public/_data/*.json

## i18n
Claves en src/i18n/{en,es-MX,fr}.json • Convención: scope.subscope.name

## Theming
:root[data-theme="light|dark"] • no botón • matchMedia

## App Store Badge
Selección por locale+tema, sin mover layout

## CI/CD
deploy.yml corre manifests + build y publica Pages

## Dev local
npm ci && npm run dev

## Buenas prácticas
Accesibilidad, cero-diff visual, respetar Design Rules/Philosophy/Brand
