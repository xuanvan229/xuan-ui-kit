# xuan-ui-kit — Dark mode design

Date: 2026-08-25. Extends `2026-08-25-ui-kit-design.md`. Values: `2026-08-25-dark-mode-values.md` (from `docs/dark/*.dc.html`).

## Why

The kit is the single source of truth for the brand look; apps built on it need a dark theme that is _designed_ (now done in `docs/dark/`), not derived, and that consumers get for free from the same registry.

## How

- **Dark mode is a token swap only.** The dark files change colours/shadows exclusively (verified: identical markup, JS and animations). So components must reference tokens for every colour, and `.dark` re-assigns the tokens. No `dark:` utility classes in components.
- **shadcn convention for switching:** a `.dark` class on `<html>` (consumers toggle it with `next-themes` or their own script; the shadcn CLI writes our `cssVars.dark` into their `.dark { … }` block automatically). No `prefers-color-scheme` auto-switch inside the kit — that is the app's decision.
- **Resolve design defects explicitly** (six, listed in the values file) instead of copying them.
- Light rendering must not change: the tokenisation step is verified by screenshot against the existing light references before any dark value is added.

## What

1. **New tokens** (both modes): `--surface`, `--on-accent`, `--secondary-fill`, `--secondary-bevel`, `--outline-bevel`, `--inset-input`, `--knob-shadow`, `--accent-selected`, `--line-chevron`, `--calendar-selected-ink`, `--calendar-today`; Tailwind names `bg-surface`, `text-on-accent`, `bg-secondary-fill`, `text-accent-selected`, `text-line-chevron`, `bg-calendar-selected`/`text-calendar-selected-ink`, `bg-calendar-today`. Utilities `bevel-secondary`, `bevel-outline`, `inset-input` read their `var()`.
2. **Component edits:** replace `bg-white` → `bg-surface`, `text-white` → `text-on-accent`, the secondary fill literal → `bg-secondary-fill`, switch thumb shadow → `shadow-(--knob-shadow)`, select selected text → `text-accent-selected`, breadcrumb separator → `text-line-chevron`, calendar selected text/today bar → new tokens. Nothing else changes.
3. **`.dark` block in `registry/xuan/theme.css`** with every value from the token map; `registry/sync.mjs` maps `.dark` → `cssVars.dark` (shadcn schema) so `pnpm registry:build` ships it; host `app/globals.css` gains `@custom-variant dark (&:is(.dark *))` for parity with consumers (unused by kit components).
4. **Preview toggle:** `app/preview/theme.tsx` (`PreviewTheme`) — a button that toggles `document.documentElement.classList` and persists to `localStorage`; a tiny inline script in `app/layout.tsx` applies the stored class before paint (no `useEffect`). `color-scheme` is set in `@layer base` for `:root`/`.dark` and ships in the registry.
5. **Verification:** screenshot every `/preview` section in dark against `docs/dark/*.dc.html`; light screenshots unchanged; consumer install re-test confirms `.dark` vars land in the consumer's globals; tests assert the `.dark` block contains every light token (drift guard).

## Out of scope

System-preference auto-switching, per-component dark overrides, and the still-undesigned components.
