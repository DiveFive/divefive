# DiveFive Marketing Webapp

DiveFive is the operational marketing site for the DiveFive dive logging platform. The site highlights mission-critical features, supports three languages (English, Español (México), Français), and exposes markdown-driven legal and marketing copy for GitHub Pages hosting.

## Stack

- [Vue 3](https://vuejs.org/) with the Composition API
- Vite bundler (ESM, static export ready)
- Semantic design tokens (`src/styles/tokens.css`) with utility classes in `src/styles/base.css`
- Localised JSON dictionaries (`src/i18n/locales/*.json`)
- Markdown content pipeline (`/content` → `scripts/build-manifests.mjs` → `/public/_data`)

## Getting Started

```bash
npm install
npm run dev
```

The dev server automatically rebuilds content manifests before launching. Visit `http://localhost:5173` during development.

### Commands

| Command | Description |
| --- | --- |
| `npm run dev` | Build markdown manifests and start Vite dev server |
| `npm run build:content` | Rebuild JSON manifests and i18n report without starting the dev server |
| `npm run build` | Build manifests and generate the static production bundle |
| `npm run preview` | Preview the production bundle |
| `npm test` | Run unit and smoke tests with Node’s built-in test runner |

## GitHub Pages Deployment

The site is configured for the repository slug `DiveFive-webapp`:

1. GitHub Action (`.github/workflows/deploy.yml`) builds the project on pushes to `main`.
2. `vite.config.ts` sets `base` to `'/DiveFive-webapp/'` during production builds.
3. Static output (`dist/`) is published to the `gh-pages` branch via `actions/upload-pages-artifact` and `actions/deploy-pages`.

Update the base path if the repository name changes.

## Internationalisation (i18n)

- All UI strings live in `src/i18n/locales/{en,es-MX,fr}.json`.
- Locale detection order: `?lang=` query, `localStorage`, `navigator.languages`.
- `scripts/generate-i18n-report.mjs` scans `src/` for `t('…')` usages and outputs `scripts/i18n-report.json`.
- Markdown-driven sections (home story, features, FAQ, press kit, legal docs) live under `/content/{appcopy,legal}` with one file per locale.
- Long-form copy is rendered via the `MarkdownSection` component and fetched from `/public/_data`.

See [docs/i18n-coverage.md](docs/i18n-coverage.md) for the latest coverage snapshot.

## Theme System

- Semantic tokens for light/dark themes are defined in `src/styles/tokens.css`.
- `useTheme()` reads/writes `divefive:theme` in `localStorage` and sets `data-theme` on `<html>`.
- `LanguageMenu` and `ThemeToggle` controls live in the persistent header.
- Theme and locale smoke tests run in `tests/smoke.test.js`.

Details are documented in [docs/theme-audit.md](docs/theme-audit.md).

## Content Administration

All editable marketing copy is kept in `/content` and versioned alongside the codebase.

```
content/
  appcopy/
    home.en.md
    features.es-MX.md
    ...
  legal/
    privacy.fr.md
    terms.en.md
  screenshots/
    en/overview-1.svg
    es-MX/overview-1.svg
    fr/overview-2.svg
```

Run `npm run build:content` after editing markdown or adding screenshots. The script sanitises markdown, copies screenshots to `/public/assets/screenshots`, and generates locale-specific manifests in `/public/_data`.

## Design System

- [Design Rules](docs/DESIGN_RULES.md)
- [Brand References](docs/BRAND_REFERENCES.md)
- [Design Philosophy](docs/DESIGN_PHILOSOPHY.md)

Tokens, typography, and utilities are defined in `src/styles/base.css`. Components consume these semantic classes to guarantee consistency.

## Testing

Node’s built-in test runner validates internationalisation, theme toggling, and badge selection.

```bash
npm test
```

### Test Suite

- `tests/i18n.test.js` — i18n helper coverage
- `tests/appStoreBadge.test.js` — locale/theme badge selection logic
- `tests/smoke.test.js` — light/dark and multilingual smoke checks

## Troubleshooting

| Issue | Resolution |
| --- | --- |
| Theme does not switch | Clear `localStorage` entry `divefive:theme` and reload. Ensure `document.documentElement` retains `data-theme`. |
| Content missing | Re-run `npm run build:content` and verify corresponding markdown exists for the active locale. |
| Paths incorrect on GitHub Pages | Confirm `base` in `vite.config.ts` matches the repository slug. |

## Contributing

1. Create content updates under `/content` and regenerate manifests (`npm run build:content`).
2. Ensure translations exist in all three locale JSON files.
3. Run `npm test` before opening a pull request.

## License

MIT © DiveFive
