# Guía de Administración – DiveFive Webapp

Este manual explica cómo tu equipo puede actualizar **textos e imágenes** sin tocar código.

---

## 1. Textos legales

- Archivos en `/content/legal/`
  - `privacy.es-MX.md`, `privacy.en.md`, `privacy.fr.md`
  - `terms.es-MX.md`, `terms.en.md`, `terms.fr.md`

👉 Edita el archivo, guarda y haz push a `main`. La web se actualiza sola.

---

## 2. Textos de la app

- Archivos en `/content/appcopy/`
  - Ejemplo: `features.es-MX.md`, `faq.fr.md`, `pressKit.en.md`
- Puedes agregar nuevos `.md` para otras secciones usando el patrón `nombre.locale.md`.

👉 Edita, guarda y haz push. El contenido aparecerá en la app según idioma.

---

## 3. Screenshots

- Carpeta: `/content/screenshots/{locale}/`
  - Ejemplo: `/content/screenshots/es-MX/`
- Coloca ahí tus imágenes (`.png`, `.jpg`, `.webp`).

👉 En el próximo build, se mostrarán automáticamente en la galería de la app.

---

## 4. Traducciones de UI

- Para **textos cortos de botones o menús**:
  - Editar `src/i18n/en.json`, `es-MX.json`, `fr.json`.
- Para **párrafos o textos largos**:
  - Usar archivos `.md` de `/content`.

---

## 5. Deploy automático

- Cada vez que haces **push a `main`**:
  - Se ejecuta el build en GitHub Actions.
  - La app se publica automáticamente en **GitHub Pages**.

👉 No es necesario hacer nada más.

---

## 6. Buenas prácticas

- Mantén consistencia: edita todos los idiomas cuando agregues nuevo texto.
- Usa nombres claros en screenshots (`home-light.png`, `stats-dark.png`).
- Revisa accesibilidad: evita imágenes con texto incrustado.
