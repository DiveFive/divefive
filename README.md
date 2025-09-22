# DiveFive Webapp

DiveFive marketing site with localized UI (en, es-MX, fr), automatic light/dark theming, and admin-editable content sourced from `/content`.

## Tech Stack
- Vue 3 + Vite + TypeScript
- Vue Router + vue-i18n
- CSS variables + `prefers-color-scheme`
- GitHub Actions (Pages) + optional Vercel deploys

## Getting Started
1. `npm ci`
2. `npm run dev` (runs the manifest builder before starting Vite)

## Internationalization
- Short UI strings live in `src/i18n/{locale}.json`.
- Long-form marketing and legal copy lives in `/content` and is compiled to `/public/_data` at build time.
- Language preference resolves from `localStorage`, `?lang`, and the browser locale with `en` fallback.

## Automatic Theming
- `useSystemTheme` sets `data-theme="light|dark"` from `prefers-color-scheme` with live updates.
- Components consume semantic CSS variables; no manual toggle is rendered.

## Editable Content Model
- `/content/appcopy` → hero, features intro, showcase copy, premium copy, FAQ, etc.
- `/content/legal` → privacy/terms (per locale).
- `/content/screenshots/{locale}` → marketing screenshots.
- `/content/new-features/{locale}.json` → optional cards for the “New Features” section.
- `npm run build:manifests` emits locale JSON into `/public/_data` for runtime fetches.

## Deployment
- `npm run build` uses `prebuild` to refresh manifests automatically.
- GitHub Pages deploys from `main` via `.github/workflows/deploy.yml`.
- `vite.config.ts` sets `base` to `/DiveFive-webapp/` for Pages; set `VERCEL=1` to use `/` in Vercel previews.

## Troubleshooting
- 404s for `/_data/*.json` → rerun `npm run build:manifests` (dev server already does this) and ensure `import.meta.env.BASE_URL` is respected in fetches.
- Missing locale copy → check `/content` files for the locale key or ensure fallback text exists in `src/i18n`.

## Contribution Rules
- Preserve approved layout, spacing, and palette (zero visual diffs for header/footer).
- No hard-coded UI strings; use i18n or content manifests.
- Respect accessibility guidelines (WCAG AA, keyboard focus, aria labels).

## Branding
- Use “DiveFive” and `divefive.app` consistently.
- App Store badges swap automatically via `AppStoreBadge.vue` for locale + theme combinations.
