# tafreeman — Design System

The GitHub profile and portfolio surfaces run on **Console** — a vendored, IBM Carbon
v11-derived design system (near-black canvas, one horizon-cyan interactive hue, square
corners everywhere). Console shipped to the live profile in #23 and replaced the earlier
"ember" token system entirely; there is no accent or light-theme picker anymore, by design.

- **Live profile** → [`index.html`](index.html) (this is the GitHub Pages site)
- **Living reference** → [`styleguide.html`](styleguide.html) (every token, rendered from the live cascade)
- **Token source of truth** → [`console-ds/tokens/`](console-ds/tokens/) (vendored)
- **Legacy-name bridge** → [`tokens.css`](tokens.css)
- **Components** → [`console-ds/_ds_bundle.js`](console-ds/_ds_bundle.js) (vendored)

---

## Principles

1. **One source of truth, two layers.** `console-ds/tokens/*.css` (colors, typography,
   spacing, elevation, motion, fonts) is the vendored, canonical Console token set — the
   same one used across the rest of the portfolio. `tokens.css` at the repo root is a
   **compatibility bridge**: it re-maps the profile's older token names (`--fg-1`, `--sp-*`,
   `--fs-*`, `--radius-sm/md/lg/xl`, …) onto the same Console values, so `profile.jsx`'s
   inline styles — written against the older names — resolve correctly without a rewrite.
   New work should prefer the `console-ds/tokens` names directly; `tokens.css` exists so the
   older names keep working, not as a second place to define color.
2. **One fixed palette. No theme picker.** Console ships a single dark surface (Carbon g100)
   and a single interactive hue (horizon cyan `#33b1ff`) — permanently. `data-mode` and
   `data-accent` attributes are still set on `<html>` (`dark` / `console`) purely so a stray
   attribute from an older page resolves to the same tokens instead of falling through to
   unstyled defaults. They are not a live switch; nothing on the profile changes appearance
   when they change.
3. **Square, flat, hairline.** Corners are `0` everywhere except pills (status dots, tags).
   Depth comes from layer color and 1px borders, not shadows — the only shadow in the system
   is the modal/overlay one.

---

## Retired: the ember/light theme

Before #23, this repo ran a different token file (also named `tokens.css`) with a **selectable**
`data-accent` axis (`ember` / `indigo` / `cobalt` / `mint`) and a light mode (`Paper & Ink`). That
system, `styles.css`, `site.css`, and the standalone `landing.jsx`/`landing.html` surfaces they
styled are gone. The current `tokens.css` keeps a `:root[data-accent="ember"], …` block as a
documented no-op — any of those four legacy attribute values still resolves to the current cyan
values rather than breaking — but there is no ramp to opt into anymore. If you find `ember`,
`indigo`, `cobalt`, or `mint` referenced as if they were live options outside that no-op block,
it's stale; file it.

---

## Tokens

Full names live in `console-ds/tokens/*.css`; the table below is the shape, not the whole file.

### Color (`console-ds/tokens/colors.css`)

| Group | Tokens |
|---|---|
| Base scales | `--gray-10…100`, `--horizon-20…70` (the cyan accent ramp), red/green/yellow/blue/purple/teal support hues |
| Backgrounds & layers | `--background`, `--layer-01/02`, `--layer-hover-*`, `--field-01`, `--overlay` |
| Text | `--text-primary`, `--text-secondary`, `--text-helper`, `--text-disabled`, `--text-accent`, `--text-on-color` |
| Borders | `--border-subtle-00/01`, `--border-strong-01`, `--border-interactive` |
| Status | `--support-error/success/warning/info` |
| Tiers | `--tier-l1` (gray, primitives), `--tier-l2` (teal, platform), `--tier-l3` (green, applied) — the runtime axis only; verification-axis Tiles render without a tier |
| Syntax | `--syntax-comment/keyword/string/function/variable/type/attribute/number/punctuation/invalid` |

`tokens.css` exposes the same palette under the legacy names (`--bg`, `--surface`, `--fg-1/2/3`,
`--accent`, `--border`, `--success/danger/warning/info`) so `profile.jsx` doesn't need Console's
raw scale names in its inline styles.

### Typography (`console-ds/tokens/typography.css`)

IBM Plex Sans (`--font-sans`, display + body), IBM Plex Mono (`--font-mono`, labels/data/nav —
mono leads in Console), IBM Plex Serif (`--font-serif`, the stance quotation only). Composite
`--type-*` tokens bundle family/size/weight/line-height/tracking as a single CSS `font` shorthand
value (`--type-body-01`, `--type-heading-06`, `--type-display-01`, `--type-quotation`, …) rather
than separate size/weight/leading tokens. `tokens.css` mirrors the scale under the older
`--fs-stat/hero/title/section/card/body/caption/eyebrow` + `--fw-*` + `--tracking-*` names.

### Spacing — Carbon scale (`console-ds/tokens/spacing.css`)

`--spacing-01` 2px · `-02` 4px · `-03` 8px · `-04` 12px · `-05` 16px · `-06` 24px · `-07` 32px ·
`-08` 40px · `-09` 48px · `-10` 64px · `-11` 80px · `-12` 96px · `-13` 160px, plus `--size-xs…xl`
control heights and `--container-max/content/prose` widths. `tokens.css` mirrors the rhythm under
`--sp-xs/sm/md/lg/xl/2xl/3xl`.

### Radius & elevation (`console-ds/tokens/elevation.css`)

`--radius-0` (the default — Console is square) and `--radius-full` (999px, pills only). No other
radius steps exist at the Console layer; `tokens.css`'s `--radius-sm/md/lg/xl` all resolve to `0`
for the same reason (`--radius-lg` is kept as a *name* for card-default call sites, not because it
renders differently from the others). Shadows: `--shadow-overlay` is the only real one; glow
tokens are kept as names that resolve to `none` — do not reintroduce a glow.

### Motion (`console-ds/tokens/motion.css`)

Productive, short durations — see the file for exact easing/duration tokens; `tokens.css` mirrors
them as `--ease-out/in-out` and `--dur-fast/base/slow`.

---

## Components

Vendored in [`console-ds/_ds_bundle.js`](console-ds/_ds_bundle.js) under the
`window.ConsoleDesignSystem_e08854` namespace (generated — do not hand-edit; it lists its own
source hashes in a header comment). `profile.jsx` destructures what it needs:
`Button`, `IconButton`, `Tile`, `Tag`, `Tabs`, `InlineNotification`, `Tooltip`. The bundle also
ships `CodeSnippet`, `Modal`, `Checkbox`, `RadioGroup`, `Select`, `TextInput`, and `Toggle` for
surfaces that need them. Each component injects its own scoped CSS the first time it mounts
(`useInjectedCss`), reading the Console token names directly — not `tokens.css`.

---

## Conventions

- **Never hardcode a hex** in a component or JSX file. Reference a token, or `color-mix` from
  one. (SVG presentation attributes don't accept `var()` — apply token colors via the `style`
  prop instead, as the vendored icon `filter` treatments do.)
- **Reach for the scale**, not arbitrary px — spacing, radius and type all have tokens.
- **New Console-layer work reads `console-ds/tokens/*` directly.** Reach for `tokens.css`'s
  legacy names only when extending `profile.jsx` code that already uses them, to stay consistent
  within that file.

---

## File map

| File | Role |
|---|---|
| `console-ds/tokens/*.css` | **Source of truth** — vendored Console design tokens |
| `console-ds/styles.css` | Imports the token files + component CSS entry point |
| `console-ds/_ds_bundle.js` | Vendored component primitives (generated — do not hand-edit) |
| `tokens.css` | Legacy-name bridge onto the same Console values; also loaded standalone by `styleguide.html` |
| `index.html` | Live profile / GitHub Pages entry |
| `profile.jsx` | Profile React components (Header, Hero, SystemsIndex, Stance, SystemDetail, Footer) |
| `tweaks-panel.jsx` | Reusable in-page Tweaks panel (mode/accent/section toggles) |
| `styleguide.html` | Living design-system reference |
| `DESIGN-SYSTEM.md` | This document |
