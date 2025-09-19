# Theme Audit

## Token summary

| Token | Light value | Dark value | Usage |
| ----- | ----------- | ---------- | ----- |
| `--color-surface-primary` | `#ffffff` | `#0f172a` | Page background, cards |
| `--color-surface-muted` | `#f3f4f6` | `#0b1120` | Section backgrounds |
| `--color-text-primary` | `#1f2937` | `#e2e8f0` | Body copy |
| `--color-text-muted` | `#4b5563` | `#cbd5f5` | Secondary text |
| `--color-accent-primary` | `#0891b2` | `#22d3ee` | Links, highlights |
| `--color-cta-primary` | `#2563eb` | `#38bdf8` | CTA backgrounds |
| `--color-hero-gradient-from` | `#0f172a` | `#0b1120` | Hero gradient start |
| `--color-hero-gradient-to` | `#0e7490` | `#155e75` | Hero gradient end |

## Behavior
- Theme follows `prefers-color-scheme`; `useSystemTheme` updates `data-theme` on `<html>`.
- CSS overrides in `src/styles/theme.css` map Tailwind utility colors to the semantic tokens to maintain zero visual drift.
- App Store badge component listens to theme changes and swaps assets accordingly.

## QA checklist
- Contrast meets WCAG AA (`text-primary` on `surface-primary` ratio ≥ 5:1).
- Interactive controls keep 44px hit targets and ring focus states.
- No manual theme toggles remain; system preference wins.
