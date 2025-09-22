# DiveFive Webapp – Technical Guide

## Architecture Overview
- Vue 3 single-page application bootstrapped with Vite + TypeScript.
- Vue Router serves the existing routes (`/`, `/features`, `/faq`, `/premium`, `/privacy`, `/terms`).
- vue-i18n handles locale detection (query → localStorage → navigator) with `en` fallback and hot-swappable translations.
- Styling relies on Tailwind utility classes mapped to semantic CSS variables defined in `src/assets/tailwind.css`.

## Module Responsibilities
- `src/main.ts` mounts the SPA, registers the router, and installs the i18n instance.
- `src/App.vue` renders the shared header/footer, wires the `LanguageMenu`, and applies automatic theming via `useSystemTheme`.
- Page components fetch long-form copy through `loadContent` while reading short strings from i18n message files.
- `src/components/AppStoreBadge.vue` swaps localized App Store artwork based on locale and the current system theme.
- `src/components/NewFeatures.vue` lazily loads the features manifest and hides the section when no items are present.
- `scripts/build-manifests.mjs` converts `/content` into locale-specific JSON under `public/_data` for runtime consumption.

## Content Pipeline
1. Non-developers edit Markdown/TXT files and screenshots under `/content`.
2. `npm run build:manifests` (invoked by `predev` and `prebuild`) scans:
   - `/content/legal` → `{ privacy|terms }.{locale}.json` with `{ body }`.
   - `/content/appcopy` → `appcopy.{locale}.json` where keys mirror the source filenames (e.g., `home-hero`).
   - `/content/screenshots/{locale}` → `screenshots.{locale}.json` arrays `{ file, alt }`.
   - `/content/features/{locale}` → `features.{locale}.json` arrays `{ id, title?, body, date? }` generated from dated Markdown files.
   - `/content/brand/appStoreLink.{locale}.txt` → `appstore.{locale}.json` with `{ url }` and a fallback to the official listing.
3. The manifests are written to `public/_data` and shipped with the build for `fetch` requests scoped by locale.

## Internationalization
- Locale priority: `?lang` / `?locale` → `localStorage` → `navigator.language` → fallback `en`.
- `src/i18n/{locale}.json` contains short UI strings (navigation, aria labels, buttons). Long copy belongs in `/content`.
- `LanguageMenu.vue` integrates into the approved header/footer spacing without modifying layout.

## Theming
- `useSystemTheme` listens to `matchMedia('(prefers-color-scheme: dark)')`, updates `data-theme="light|dark"`, and mirrors the state for components that need it.
- Components read semantic color tokens (`--bg`, `--surface`, `--content-primary`, etc.) to maintain design fidelity.
- No manual theme toggle is exposed; the UI follows the operating system preference automatically.

## BASE_URL & Deployment Targets
- `vite.config.ts` sets `base` to `/DiveFive-webapp/` when building for GitHub Pages and `/` when `process.env.VERCEL` is truthy.
- `loadContent` normalizes locale codes and prefixes requests with `import.meta.env.BASE_URL` to avoid `/_data` 404s across environments.
- Static assets referenced in manifests (screenshots, feature images) are served from the published `/content` directory.

## Local Development & Testing
- `npm run dev` triggers the manifest build via `predev` before starting Vite with HMR.
- `npm run build` runs the same manifest step through `prebuild` and produces the production bundle.
- Smoke test each locale after editing content: hero copy, features intro, showcase blocks, premium table, legal pages, screenshots, and the optional New Features section.
- Verify automatic theming by toggling the OS theme; App Store badges and CSS tokens should update without layout shifts.
- `.github/workflows/deploy.yml` uses Node 20, runs the manifest builder, builds the bundle, and deploys to GitHub Pages via the Pages actions.

## Quality & Accessibility
- Maintain WCAG AA contrast, keyboard navigability, and meaningful aria labels.
- Preserve the approved layout—no new routes, tabs, or header/footer changes.
- Follow `docs/DESIGN_RULES.md`, `docs/DESIGN_PHILOSOPHY.md`, and `docs/BRAND_REFERENCES.md` when touching visuals or branding assets.
