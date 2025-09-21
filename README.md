DiveFive Webapp


Internacionalización completa (en / es-MX / fr), tema automático (light/dark), contenido administrable vía archivos, y deploy continuo en GitHub Pages.

Objetivo

Sitio web de DiveFive con:

i18n para toda la UI (botones, menús, mensajes).

Theming automático según el sistema (sin botón).

Contenido administrable por no-desarrolladores desde /content (MD/TXT + imágenes) → compilado a JSON en /public/_data durante el build.

Deploy automático a GitHub Pages en cada push a main.

Stack

Framework: Vue 3 + Vite + TypeScript

i18n: vue-i18n

Theming: CSS variables + prefers-color-scheme

CI/CD: GitHub Actions → GitHub Pages

Características clave

Respeta el diseño aprobado (no se alteran header/footer/layout).

Selector de idioma integrado en el header existente (sin cambiar alturas o espaciados).

Badge de App Store dinámico (negro en light / blanco en dark) y localizado (EN/ES-MX/FR).

Administración sin necesidad de programar: textos legales, copys y screenshots se actualizan con commits a /content.

Estructura de carpetas
src/                   # Código principal (Vue 3 + TS)
content/               # EDITABLE por el cliente (no-dev)
├─ legal/              # privacy.{locale}.md|txt, terms.{locale}.md|txt
├─ appcopy/            # home.{locale}.md|txt, about.{locale}.md|txt, ...
└─ screenshots/
   ├─ en/              # Imágenes para EN
   ├─ es-MX/           # Imágenes para ES-MX
   └─ fr/              # Imágenes para FR
public/_data/          # JSON generado desde /content (build)
scripts/               # Utilidades (manifests, checks)
docs/                  # Guías y referencias (técnica / admin / diseño)

Modelo de contenido
Tipo	Dónde editar	Cómo se consume en runtime
Textos legales	`/content/legal/*.md	txt`
Copys de página	`/content/appcopy/*.md	txt`
Screenshots	/content/screenshots/{locale}	/_data/screenshots.{locale}.json
UI corta (botones, labels)	src/i18n/{en,es-MX,fr}.json	t('clave') en componentes

Los .md|.txt se transforman a JSON con el script scripts/build-manifests.mjs en cada build.

Convenciones de i18n

Claves: scope.subscope.purpose.name
Ejemplo: nav.profile.title, home.hero.cta, legal.privacy.title

Interpolación: {{variable}} (nativa de vue-i18n)

Pluralización: reglas nativas por idioma

Fallback: en (solo si falta la traducción)

Theming (auto, sin botón)

Se aplica el tema light/dark por sistema operativo usando:

matchMedia('(prefers-color-scheme: dark)')

Atributo global: :root[data-theme="light|dark"]

Los componentes consumen tokens semánticos (no hex directos).

Badge de App Store (dinámico)

Localizado (EN/ES-MX/FR) y sin cambiar el layout existente.

Light → negro, Dark → blanco (según tema del sistema).

Ver src/components/AppStoreBadge.vue.

Quick Start
# 1) Instalar
npm ci

# 2) Desarrollo local
npm run dev

Build & Deploy
# Generar JSON desde /content y compilar
node scripts/build-manifests.mjs
npm run build


Cada push a main:

Ejecuta scripts/build-manifests.mjs

Compila la app (vite build)

Publica dist/ en GitHub Pages

Deploy a GitHub Pages

Asegura vite.config.ts con base correcto si publicas bajo /ORG/REPO/:

// vite.config.ts (ejemplo)
export default defineConfig({
  base: '/<REPO>/', // o '/' si usas dominio raíz
})


El workflow está en .github/workflows/deploy.yml.

Scripts útiles
{
  "scripts": {
    "dev": "vite",
    "prebuild": "node ./scripts/build-manifests.mjs",
    "build": "vite build"
  }
}


prebuild: transforma /content → /public/_data

build: compila la SPA

Calidad y Accesibilidad

WCAG AA (contraste ≥ 4.5:1)

aria-label/roles semánticos

E2E smoke tests por idioma/tema

Linter para detectar strings sin i18n (opcional en scripts/)

Guías y documentación

Guía técnica: docs/TECHNICAL_GUIDE.md

Guía de administración (no-dev): docs/ADMIN_GUIDE.md

Diseño: docs/DESIGN_RULES.md • docs/DESIGN_PHILOSOPHY.md • docs/BRAND_REFERENCES.md

Flujo de administración (para tu compañero)

Editar contenido:

Textos largos → /content/appcopy/*.md|txt

Legales → /content/legal/*.md|txt

Screenshots → /content/screenshots/{locale}/*.{png|jpg|webp|avif}

Hacer commit y push a main.

GitHub Actions hace el build y publica en Pages.

No es necesario tocar código para actualizar textos o imágenes.

Troubleshooting

No aparecen cambios de contenido
Verifica que los archivos están en /content con el locale correcto y que el workflow corrió bien. Ejecuta localmente:

node scripts/build-manifests.mjs && npm run dev


Rutas rotas en Pages
Ajusta base en vite.config.ts a '/<REPO>/' y vuelve a hacer push.

Badge no cambia en dark
Confirma que :root[data-theme] se actualiza (ver useSystemTheme / matchMedia).

Contribuir

Mantener cero-diff visual (no mover header/footer/layout).

No introducir botones nuevos (el tema es automático).

Toda la UI sin literales: usar t('...') o /content.

Licencia y marca

DiveFive es la marca oficial (no “Dive Five”).

Sitio: divefive.app

Ver docs/BRAND_REFERENCES.md para usos correctos.