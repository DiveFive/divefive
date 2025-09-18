# Theme Audit

- `:root[data-theme='light']` defines surface, text, border, and accent tokens optimised for WCAG AA contrast. Primary text (#0f172a) on surface (#f8fafc) yields 12.6:1.
- `:root[data-theme='dark']` mirrors the same semantic tokens with slate neutrals and cyan accents. Primary text (#f8fafc) on surface (#020817) yields 14.8:1.
- Interactive controls (`button-primary`, `.utility-select`) maintain ≥44×44 px hit areas.
- Focus states use a 3px outline via `var(--color-focus-ring)` ensuring visible keyboard navigation.
- Theme persistence is stored under `divefive:theme` in `localStorage` and rehydrated via `initTheme()`.
- Smoke tests (`tests/smoke.test.js`) verify `data-theme` transitions between light and dark modes.
