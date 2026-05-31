# tafreeman — Design System

A small, single-source design system for the GitHub profile and portfolio surfaces.
Everything visual derives from one file — [`tokens.css`](tokens.css) — and is exercised
in a living reference page, [`styleguide.html`](styleguide.html).

- **Live profile** → [`index.html`](index.html) (this is the GitHub Pages site)
- **Living reference** → [`styleguide.html`](styleguide.html) (open it to see every token + component, with a working mode/accent switcher)
- **Token source of truth** → [`tokens.css`](tokens.css)
- **Component styles** → [`styles.css`](styles.css)

---

## Principles

1. **One source of truth.** Colors, type, spacing, radius, shadows and motion are CSS
   custom properties defined once in `tokens.css`. No component file (or JS file) redefines
   a palette. If a value needs to change, it changes in exactly one place.
2. **Theme by attribute, not by code.** Appearance is switched by two attributes on
   `<html>` — `data-mode` and `data-accent`. No JavaScript writes color values at runtime.
3. **Dark is primary.** The Console dark surface is the brand default; Paper & Ink light is
   the secondary/editorial surface.

---

## Theming

Two independent axes, both set on the root element:

| Attribute | Values | Default | Controls |
|---|---|---|---|
| `data-mode` | `dark`, `light` | `dark` | Surfaces, borders, text (Console ↔ Paper & Ink) |
| `data-accent` | `ember`, `indigo`, `cobalt`, `mint` | `ember` | The accent ramp (`--accent*`, `--gradient-brand`) |

```html
<html lang="en" data-mode="dark" data-accent="ember">
```

The two axes compose freely — e.g. light + mint is valid. Accent blocks are scoped to
`:root[data-accent="…"]` (specificity 0,2,0) so an explicit accent always wins over the
light theme's default cobalt, regardless of source order, while leaving surfaces and text
untouched.

**To change the default**, edit the `<html>` attributes and the `TWEAK_DEFAULTS` block in
[`index.html`](index.html) so the no-JS render and the React default agree (this avoids a
theme flash before the app mounts).

---

## Tokens

### Color

| Group | Tokens |
|---|---|
| Surfaces | `--bg`, `--bg-deep`, `--surface`, `--surface-2`, `--surface-deep` |
| Borders | `--border`, `--border-soft` |
| Text | `--fg-1` (primary), `--fg-2` (muted), `--fg-3` (dim), `--fg-on-accent` |
| Accent | `--accent`, `--accent-hover`, `--accent-press`, `--accent-2`, `--accent-soft`, `--accent-glow`, `--gradient-brand` |
| Semantic | `--success`, `--danger`, `--warning`, `--info` |

Derive tints with `color-mix` rather than new hexes, e.g.
`color-mix(in srgb, var(--accent) 20%, transparent)` — this is how the contribution-grid
heat levels and badge backgrounds stay accent-aware.

### Typography

Fonts: **JetBrains Mono** (display + body + mono), **DM Serif Display** (`--font-serif`,
editorial accents only).

| Token | px | Use |
|---|---|---|
| `--fs-stat` | 48 | Big numbers |
| `--fs-hero` | 44 | Page hero / `h1` |
| `--fs-title` | 32 | `h2` |
| `--fs-section` | 24 | `h3` |
| `--fs-card` | 18 | `h4` / card titles |
| `--fs-body` | 16 | Body |
| `--fs-caption` | 13 | Captions |
| `--fs-eyebrow` | 11 | Eyebrow labels |

Weights `--fw-light…--fw-black`, line-heights `--lh-tight…--lh-body`, and tracking
(`--tracking-hero/title/eyebrow/label`) round out the scale.

### Spacing — 8px grid

`--sp-xs` 8 · `--sp-sm` 16 · `--sp-md` 24 · `--sp-lg` 32 · `--sp-xl` 48 · `--sp-2xl` 64 · `--sp-3xl` 80

### Radius

`--radius-xs` 2 · `--radius-sm` 3 · `--radius-md` 4 · `--radius-lg` 6 (card default) · `--radius-xl` 10 · `--radius-pill` 999

### Elevation

`--shadow-soft` (resting), `--shadow-glow` (accent focus), `--shadow-pop` (lifted/hover).

### Motion

Easing `--ease-out`, `--ease-in-out`; durations `--dur-fast` 120ms · `--dur-base` 200ms · `--dur-slow` 320ms.

---

## Components

The profile composes these from the tokens (see [`styles.css`](styles.css)); the
[`styleguide.html`](styleguide.html) page renders standalone versions of the core ones.

- **Buttons** — `.btn.primary` (accent fill), `.btn.ghost` (surface)
- **Badges / status** — accent and semantic variants
- **Eyebrow** — `.eyebrow` mono uppercase section label
- **Stat** — `--fs-stat` number + mono caption label
- **Repo card / map card / contribution grid / activity ledger** — profile-specific
  compositions in `styles.css`, all token-driven; the contribution heat and the
  architecture-map nodes follow the active accent.
- **Terminal line** — `.term` with accent left-stripe

---

## Conventions

- **Never hardcode a hex** in a component or JSX file. Reference a token, or `color-mix`
  from one. (SVG presentation attributes don't accept `var()` — apply token colors via the
  `style` prop instead, as the architecture map does.)
- **Reach for the scale**, not arbitrary px — spacing, radius and type all have tokens.
- **Keep the two theme defaults in sync** between `<html>` attributes and `TWEAK_DEFAULTS`.

---

## File map

| File | Role |
|---|---|
| `tokens.css` | **Source of truth** — all design tokens + theme/accent blocks |
| `styles.css` | Profile component styles (token-driven) |
| `index.html` | Live profile / GitHub Pages entry |
| `profile.jsx` | Profile React components |
| `tweaks-panel.jsx` | Reusable in-page Tweaks panel (mode/accent/section toggles) |
| `styleguide.html` | Living design-system reference |
| `DESIGN-SYSTEM.md` | This document |
