# DiveFive Webapp – Administration Guide

## Legal Copy
- Edit `/content/legal/privacy.{locale}.md|txt` and `/content/legal/terms.{locale}.md|txt`.
- Markdown is preferred; plain text is also supported. English copies publish as-is—Spanish (`es-MX`) and French (`fr`) can use “Coming soon” placeholders until translations arrive.
- Commit to `main` and GitHub Pages will rebuild automatically.

## Marketing Copy
- `/content/appcopy/home-hero.{locale}.md` → paragraph beneath the App Store badge on the landing page.
- `/content/appcopy/home-features.{locale}.md` → first line = section heading; remaining lines = intro sentence above the feature grid.
- `/content/appcopy/home-showcase.{locale}.md` → two blocks separated by blank lines (each block: title on first line, description below) powering the showcase components.
- `/content/appcopy/premium-copy.{locale}.md` → subtitle displayed under the Premium comparison table.
- Additional sections (FAQ page, Features page, etc.) live in `/content/appcopy/{section}.{locale}.md` and render as plain text blocks.

## Screenshots
- Drop PNG/JPG/WebP/AVIF assets into `/content/screenshots/{locale}/`.
- File names become part of the generated alt text—use localized, human-friendly names.
- Keep device bezels and layout consistent with approved design references.

## New Features Section
- Create one Markdown file per announcement inside `/content/features/{locale}/` named `YYYY-MM-DD-title.md`.
- The first Markdown heading (`# Title`) becomes the card title; the remaining body converts to sanitized HTML and supports bullet lists.
- Include one file per locale. If a locale folder is empty, the “New Features” section disappears automatically for that language.

## App Store Link
- Update `/content/brand/appStoreLink.{locale}.txt` to point to the localized App Store listing (leave blank to fall back to the default: `https://apps.apple.com/mx/app/divefive-be-a-better-diver/id6749786184?l=en-GB`).
- The link powers all App Store badges on the site.

## UI Translations
- Short UI strings live in `src/i18n/en.json`, `es-MX.json`, and `fr.json`.
- Coordinate with the development team before editing these files to keep keys aligned with the codebase.

## Deployment Workflow
- `npm run dev` and `npm run build` both run the manifest builder automatically; no manual steps are required before previewing or deploying.
- Every push to `main` triggers `.github/workflows/deploy.yml`, which builds manifests, bundles the site, and publishes to GitHub Pages (Repository settings → Pages → Source: GitHub Actions).

## Best Practices
- Keep all three locales in sync and avoid long-lived placeholders.
- Use descriptive file names without spaces; prefer lowercase and hyphenated slugs.
- Avoid embedding copy in images—text should remain editable.
- Preserve the approved layout: do not add routes, buttons, or change header/footer spacing.
