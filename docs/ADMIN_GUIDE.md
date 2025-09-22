# DiveFive Webapp – Administration Guide

## Legal Copy
- Edit `/content/legal/privacy.{locale}.md|txt` and `/content/legal/terms.{locale}.md|txt`.
- Commit changes to `main`; GitHub Pages will rebuild and publish automatically.

## Home & Marketing Copy
- `/content/appcopy/home-hero.{locale}.md` → hero paragraph under the App Store badge.
- `/content/appcopy/home-features.{locale}.md` → section heading (first line) and optional intro (additional lines) for the features grid.
- `/content/appcopy/home-showcase.{locale}.md` → two blocks separated by blank lines (each block: title on the first line, paragraph afterwards) powering the showcase sections.
- `/content/appcopy/premium-copy.{locale}.md` → premium subtitle beneath the pricing table.
- Additional app copy (FAQ, Features page, etc.) stays in `/content/appcopy/{name}.{locale}.md`.

## Screenshots
- Place PNG/JPG/WebP/AVIF files inside `/content/screenshots/{locale}/`.
- File names become part of the alt text, so keep them descriptive and localized when needed.

## New Features Section
- Preferred format: `/content/new-features/{locale}.json` with an array of objects `{ "title", "date", "body", "image"? }` (image optional).
- If the array is empty, the “New Features” section is hidden.
- Alternative: `/content/new-features/new-features.{locale}.md` produces a simple text block (rendered as sanitized paragraphs).

## UI Translations
- Short UI strings live in `src/i18n/en.json`, `es-MX.json`, and `fr.json`.
- Coordinate with the dev team before editing these files to avoid breaking imports.

## Deployment Workflow
- `npm run dev` and `npm run build` run the manifest builder automatically; no extra steps are required locally.
- Every push to `main` triggers the GitHub Pages workflow (`.github/workflows/deploy.yml`).

## Best Practices
- Keep all three locales in sync; fallbacks only cover missing entries temporarily.
- Use clear file names for images; avoid embedding text inside screenshots.
- Respect the approved layout—do not add routes, buttons, or change header/footer spacing.
