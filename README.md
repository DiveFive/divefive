# DiveFive Webapp

Localized (en · es-MX · fr) DiveFive marketing site with automatic light/dark theming and admin-editable content sourced from `/content` and compiled into `/public/_data`.

## Tech Stack
- Vue 3 + Vite + TypeScript
- Vue Router + vue-i18n
- Tailwind primitives with semantic CSS variables
- GitHub Actions → GitHub Pages (with optional Vercel deploys)

## Getting Started
1. `npm ci`
2. `npm run dev` (runs `predev` → `npm run build:manifests`, then launches Vite)
3. Edit localized copy under `/content` and refresh the page—manifests regenerate automatically for each run.

## Content Model & Manifests
- `/content/legal/privacy|terms.{locale}.md|txt` → legal pages (Markdown preferred).
- `/content/appcopy/{section}.{locale}.md|txt` → long-form marketing copy (hero, features intro, showcase, FAQ, premium, etc.).
- `/content/screenshots/{locale}/*.{png|jpg|webp|avif}` → localized marketing captures.
- `/content/features/{locale}/{date-slug}.md` → one file per “New Feature” card (first heading = title; body converted to sanitized HTML).
- `/content/brand/appStoreLink.{locale}.txt` → App Store deeplink per locale (falls back to the official listing if empty).
- `npm run build:manifests` (triggered by `predev`/`prebuild`) writes locale-specific JSON into `public/_data/{key}.{locale}.json` for runtime fetches via `import.meta.env.BASE_URL` aware URLs.

## Deployment
- `npm run build` executes `prebuild` to refresh manifests, then bundles the site.
- `.github/workflows/deploy.yml` builds on pushes to `main` and publishes to GitHub Pages (Repository settings → Pages → Source: GitHub Actions).
- `vite.config.ts` serves at `/DiveFive-webapp/` for Pages; set `VERCEL=1` to serve from `/` in Vercel previews.

## Troubleshooting
- **404 loading `/_data/*.json`:** re-run `npm run build:manifests` or ensure the workflow executed before deploying. Fetches include `import.meta.env.BASE_URL` so the path adapts to GitHub Pages and Vercel.
- **Missing copy or empty sections:** confirm locale files exist under `/content`; blank features folders hide the “New Features” section automatically.
- **Stale App Store link:** update `/content/brand/appStoreLink.{locale}.txt` and redeploy.

## Contribution Rules
- Preserve approved header/footer layout, palette, and spacing (visual zero-diff).
- Keep short UI strings inside `src/i18n/{locale}.json`; move long copy to `/content`.
- Follow accessibility requirements (WCAG AA contrast, keyboard focus, aria labels).

## Branding
- Use the “DiveFive” name and `divefive.app` domain consistently.
- App Store badges swap automatically via `AppStoreBadge.vue` according to locale and system theme.
- Reference `docs/DESIGN_RULES.md`, `docs/DESIGN_PHILOSOPHY.md`, and `docs/BRAND_REFERENCES.md` before modifying assets.
