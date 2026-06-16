# Signal — Brand & Design System

> Working title. The umbrella brand name is still being chosen; replace "Signal"
> here and in token file headers once decided. The token *values* don't depend on the name.

## What this is

The shared visual identity for the whole ecosystem — every app, tool, CLI, and
site draws from one source so they read as products of the same company.

**Personality (the four words every decision answers to):** precise · engineered ·
quietly confident · unfussy. When a design choice is ambiguous, pick the option
that better fits those four words.

**Aesthetic:** clean, minimal, modern-SaaS. Near-monochrome neutral base, one
indigo accent doing the work, generous whitespace, a mono for technical surfaces.
The discipline is *restraint* — resist adding a second accent.

## Files

| File | Role |
|------|------|
| `tokens.css` | What apps import. CSS custom properties, light + dark. |
| `tokens.json` | Machine-readable source of truth (Tailwind presets, native apps, codegen). |
| `brand.md` | This document — travels with the tokens. |

## Install

The simplest path: import `tokens.css` once at the root of each project.

```css
/* global.css */
@import "./tokens.css";
```

Recommended longer term: publish as a tiny internal package (e.g.
`@<brand>/tokens`) that ships `tokens.css` + `tokens.json`, and have every
project depend on it. Bump the version to roll a change across the ecosystem.

## The one rule

Two layers exist:

- **Primitives** (`--p-neutral-600`, `--p-indigo-600`, …) — raw values.
- **Semantic** (`--color-primary`, `--color-text`, `--color-surface`, …) — roles.

**Build components against the semantic layer only.** Never reference a `--p-*`
primitive in app code. This is what lets you re-theme (or ship a new sub-brand
accent) by editing one file instead of hunting through components.

## Color roles

| Token | Use |
|-------|-----|
| `--color-bg` | Page background |
| `--color-surface` | Default panel / section background |
| `--color-surface-raised` | Cards, popovers, anything "above" the surface |
| `--color-surface-sunken` | Wells, code blocks, inset areas |
| `--color-border` / `--color-border-strong` | Hairlines / emphasized dividers |
| `--color-text` | Primary text |
| `--color-text-muted` | Secondary text, labels, captions |
| `--color-text-subtle` | Hints, placeholders, disabled |
| `--color-primary` / `-hover` / `-active` | Primary actions |
| `--color-primary-subtle` + `--color-on-primary-subtle` | Tinted backgrounds + text on them |
| `--color-on-primary` | Text/icons on a solid primary fill |
| `--color-accent` | Optional secondary signal — data viz & sparing highlights only |
| `--color-success` / `-warning` / `-danger` / `-info` (+ `-subtle`, `-on-*-subtle`) | Status |
| `--color-focus-ring` | Keyboard focus outline |

Note: `--color-info` intentionally maps to indigo (same family as primary), since
the brand accent is already in the blue range. Don't introduce a separate "info
blue."

## Typography

- **Inter** for UI and headings. **JetBrains Mono** for code, configs, logs, CLI output, IDs.
- (Optional distinctive swap: Geist + Geist Mono — same brief, more personality.)
- Load via the font provider of your choice, or self-host. Example with Google Fonts:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

Scale tokens: `--text-xs … --text-5xl`, weights `--font-regular/medium/semibold/bold`,
line-heights `--leading-*`, tracking `--tracking-*` (use `--tracking-tight` on
large headings).

## Dark mode

Three behaviors, all supported by `tokens.css`:

- **Auto** — follows the OS when no theme is set (`prefers-color-scheme`).
- **Manual** — set `data-theme="dark"` or `data-theme="light"` on `<html>`.

To support a user toggle without a flash of the wrong theme, set the attribute
before paint:

```html
<script>
  const t = localStorage.getItem("theme");
  if (t) document.documentElement.setAttribute("data-theme", t);
</script>
```

## Usage examples

```css
.btn-primary {
  background: var(--color-primary);
  color: var(--color-on-primary);
  font: var(--font-medium) var(--text-sm)/1 var(--font-sans);
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-md);
  transition: background var(--duration-fast) var(--ease-standard);
}
.btn-primary:hover { background: var(--color-primary-hover); }
.btn-primary:focus-visible { outline: 2px solid var(--color-focus-ring); outline-offset: 2px; }

.card {
  background: var(--color-surface-raised);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-5);
  box-shadow: var(--shadow-sm);
}
.badge-success {
  background: var(--color-success-subtle);
  color: var(--color-on-success-subtle);
  border-radius: var(--radius-sm);
  padding: var(--space-1) var(--space-2);
  font: var(--font-medium) var(--text-xs)/1 var(--font-sans);
}
```

## Do / don't

- Do build against semantic tokens; don't hardcode hex or reach for `--p-*` primitives.
- Do let one accent lead; don't add a second brand color "for variety."
- Do use the mono for anything machine-flavored (logs, configs, IDs); don't set body copy in it.
- Do keep radii consistent (`md` for controls, `lg` for cards); don't mix arbitrary values.
- Do test every screen in both themes; don't ship a component that only works in light.

## Onboarding a new product

1. Import `tokens.css` at the root.
2. Load Inter + JetBrains Mono.
3. Set `data-theme` handling (snippet above).
4. Build UI against semantic tokens. That's the whole brand, inherited for free.
