# DiveFive Design Rules

1. **Semantic tokens** — All colours, typography, radii, and spacing values originate from `src/styles/tokens.css`. Components never reference raw hex values or pixel constants.
2. **Utility-first layout** — Layout primitives (`stack`, `grid-2`, `grid-3`, `surface-card`) provide consistent spacing and elevation. Custom flex or grid declarations must align with these utilities.
3. **Accessible contrast** — Text foreground and background combinations meet WCAG AA (≥ 4.5:1) in both light and dark themes. The theme toggle enforces `data-theme` on `<html>`.
4. **Action affordances** — Primary actions use the `button-primary` style (accent background). Secondary actions use the bordered pill variant.
5. **Typography hierarchy** — Use `heading-xl`, `heading-lg`, `heading-md`, `body-lg`, `body-sm`, and `caption` utility classes to maintain consistent rhythm.
6. **Interactive targets** — Buttons, selects, and links maintain a minimum touch size of 44×44 px through padding tokens.
7. **Brand language** — The product name is always rendered as “DiveFive” and the canonical domain is `divefive.app`.
8. **Content sourcing** — All user-facing copy is sourced from i18n JSON dictionaries or Markdown manifests in `/content`.
