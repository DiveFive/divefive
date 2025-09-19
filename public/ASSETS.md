# DiveFive Assets

El flujo actualizado administra las imágenes desde `/content/screenshots/{locale}/`. Ejecuta `npm run build:content` para copiar los archivos a `public/content/` y generar `/_data/screenshots.{locale}.json`.

Los nombres sugeridos son:
- `add-new-dive.png`
- `dive-log-list.png`
- `dive-detail.png`
- `dive-site-detail.png`

Los assets de branding de la App Store se encuentran en `src/assets/app-store/` y se seleccionan automáticamente por idioma y tema.
