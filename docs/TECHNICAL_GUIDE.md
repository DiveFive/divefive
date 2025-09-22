# DiveFive Webapp – Technical Guide

## Architecture Overview
- Vue 3 single-page application bootstrapped with Vite + TypeScript.
- Vue Router handles existing routes (`/`, `/features`, `/faq`, `/premium`, `/privacy`, `/terms`).
- vue-i18n provides locale resolution, translation loading, and reactive language switching.
- Styling relies on semantic CSS variables layered on Tailwind primitives defined in `src/assets/tailwind.css`.

## Module Responsibilities
- `src/main.ts` mounts the app, registers the router, and injects the i18n instance.
- `src/App.vue` renders the shared header/footer (with `LanguageMenu`) and enforces automatic theming via `useSystemTheme`.
- Page components read short strings from i18n and fetch long-form content through `loadContent`.
- `src/components/AppStoreBadge.vue` swaps localized App Store badges according to locale + `data-theme`.
- `scripts/build-manifests.mjs` materializes `/content` into `/public/_data` for runtime fetches.

## Content Pipeline
1. Non-developers edit Markdown/TXT/JSON files under `/content`.
2. `npm run build:manifests` (run automatically before dev/build) scans the directories and writes locale-specific JSON into `/public/_data`.
3. Pages call `loadContent(key, locale)` which normalizes locale codes, prefixes requests with `import.meta.env.BASE_URL`, and returns JSON payloads.
4. Home pulls hero/feature/showcase/premium copy plus optional `new-features` entries; legal pages display Markdown bodies; screenshots drive the Swiper galleries.

## Internationalization
- Locale priority: `localStorage` → `?lang` query → `navigator.language` → fallback `en`.
- `src/i18n/{locale}.json` holds navigation labels, aria strings, and other short UI phrases.
- Long marketing or legal text must live in `/content` to stay admin-editable.
- `LanguageMenu.vue` keeps layout untouched while allowing locale changes on desktop/mobile.

## Theming
- `useSystemTheme` listens to `matchMedia('(prefers-color-scheme: dark)')` and updates `document.documentElement.dataset.theme`.
- Components read semantic variables (`--bg`, `--surface`, etc.), preventing hard-coded hex values in templates.
- No manual toggle is shipped; theme changes follow the OS setting instantly.

## BASE_URL & Deployment Targets
- `vite.config.ts` sets `base` to `/DiveFive-webapp/` for GitHub Pages; when `VERCEL` env var is present, the base collapses to `/`.
- `loadContent` prefixes fetches with `import.meta.env.BASE_URL` to avoid `/_data` 404s on Pages or custom hosting.
- Screenshots reference `/content/screenshots/...` paths which are served statically from the built site.

## Local Development & Testing
- `npm run dev` regenerates manifests then starts Vite with hot-module reloading.
- `npm run build` runs the manifest builder via `prebuild` followed by a production bundle.
- Validate new locales/content by visiting each route in every language and verifying the automatic theme switch.
- GitHub Actions workflow (`deploy.yml`) installs deps, builds manifests, compiles the app, and publishes to GitHub Pages.

## Quality & Accessibility
- Maintain WCAG AA contrast, keyboard access, and relevant aria labels.
- Preserve the approved layout and spacing—no header/footer alterations, no new navigation routes.
- Keep assets and copy consistent with `docs/DESIGN_RULES.md`, `docs/DESIGN_PHILOSOPHY.md`, and branding references.
