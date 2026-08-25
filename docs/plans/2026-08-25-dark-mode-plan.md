# Dark Mode Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship the designed dark theme (`docs/dark/*.dc.html`) as a `.dark` token set in the `@xuan` registry, with a toggle on `/preview`, without changing light rendering.

**Architecture:** Dark mode is purely a CSS-variable swap. Task 1 removes the last colour literals from components by introducing a few more tokens (light rendering unchanged). Task 2 adds the `.dark { … }` block to `theme.css` and teaches `registry/sync.mjs` to ship it as `cssVars.dark`, which the shadcn CLI writes into consumers' `.dark` selector. Task 3 adds a class-based toggle to the preview. Task 4 verifies both modes by screenshot; Task 5 re-runs the consumer install and deploys.

**Tech Stack:** unchanged (Next 16, Tailwind v4, Base UI 1.7, Vitest).

**Spec:** `docs/plans/2026-08-25-dark-mode-design.md`; exact values `docs/plans/2026-08-25-dark-mode-values.md` (the token map there is authoritative, including its six rulings).

## Global Constraints
- Same coding rules as the base plan (named exports; `null` not `undefined`; no `useEffect`; no `any`; double quotes/no semicolons; `// note:` on unavoidable exceptions; no Co-Authored-By trailers).
- **No `dark:` variant in any registry component.** Every colour goes through a token.
- Light output must be pixel-identical after Task 1 (verified by screenshots in Task 4 against the existing light references).
- Every token defined as a literal in `:root` must have a value in `.dark` (enforced by a test).

---

### Task 1: Tokenise the remaining colour literals (light unchanged)

**Files:**
- Modify: `registry/xuan/theme.css`, `registry/xuan/ui/{button,input,textarea,switch,checkbox,radio,tabs,table,toast,dialog,accordion,badge,breadcrumb}.tsx`, `registry/xuan/ui/alert/dialog.tsx`, `registry/xuan/ui/select/{select,item}.tsx`, `registry/xuan/ui/date/{cell,calendar,picker}.tsx`
- Test: `registry/xuan/theme.test.ts` (new), existing component tests

**Interfaces:**
- Produces Tailwind names: `bg-surface`, `text-on-accent`, `bg-on-accent`, `bg-secondary-fill`, `text-accent-selected`, `text-line-chevron`, `text-calendar-selected-ink`, `bg-calendar-today`; utilities `bevel-secondary`, `bevel-outline`, `inset-input` now read `var(--secondary-bevel)`, `var(--outline-bevel)`, `var(--inset-input)`; `popup` uses `var(--surface)`; switch thumb uses `shadow-(--knob-shadow)`.

- [ ] **Step 1: Write the failing theme test** — `registry/xuan/theme.test.ts`
```ts
import { readFileSync } from "node:fs"
import { describe, expect, it } from "vitest"

import { themeToRegistryFields } from "../sync.mjs"

const css = readFileSync(new URL("./theme.css", import.meta.url), "utf8")
const { cssVars } = themeToRegistryFields(css)

describe("theme tokens", () => {
  it("defines the surface and accent-text tokens", () => {
    for (const name of [
      "surface", "on-accent", "secondary-fill", "secondary-bevel", "outline-bevel", "inset-input",
      "knob-shadow", "accent-selected", "line-chevron", "calendar-selected-ink", "calendar-today",
    ]) expect(cssVars.light, name).toHaveProperty(name)
    expect(cssVars.theme).toMatchObject({
      "color-surface": "var(--surface)",
      "color-on-accent": "var(--on-accent)",
      "color-secondary-fill": "var(--secondary-fill)",
      "color-accent-selected": "var(--accent-selected)",
      "color-line-chevron": "var(--line-chevron)",
      "color-calendar-selected-ink": "var(--calendar-selected-ink)",
      "color-calendar-today": "var(--calendar-today)",
    })
  })
})
```
Run `pnpm test registry/xuan/theme.test.ts` → FAIL (missing properties).

- [ ] **Step 2: Add the tokens to `theme.css`**
In `:root` (light values):
```css
  --surface: #ffffff;
  --on-accent: #ffffff;
  --secondary-fill: rgb(232 235 237 / 0.1);
  --secondary-bevel: inset 0 1px 0 1px #fff, inset 0 -1px 0 1px rgb(223 226 231 / 0.4), 0 1px 2px rgb(223 226 231 / 0.5);
  --outline-bevel: inset 0 1px 0 rgb(255 255 255 / 1), inset 0 -1px 0 1px rgb(0 77 153 / 0.1), 0 2px 4px rgb(9 11 11 / 0.08);
  --inset-input: inset 0 1px 2px rgb(9 11 11 / 0.06);
  --knob-shadow: 0 1px 2px rgb(9 11 11 / 0.2);
  --accent-selected: hsl(210 100% 38%);
  --line-chevron: #c2c2cc;
  --calendar-selected-ink: #ffffff;
  --calendar-today: #232329;
```
In `@theme inline`: `--color-surface`, `--color-on-accent`, `--color-secondary-fill`, `--color-accent-selected`, `--color-line-chevron`, `--color-calendar-selected-ink`, `--color-calendar-today` each `var(--<name>)`.
Utilities: `@utility bevel-secondary { box-shadow: var(--secondary-bevel); }`, `@utility bevel-outline { box-shadow: var(--outline-bevel); }`, `@utility inset-input { box-shadow: var(--inset-input); }`, and in `@utility popup` replace `background: #fff;` with `background: var(--surface);`. Also `--background: var(--surface)`? No — keep `--background: #ffffff` literal (page), `--card`/`--popover`: `var(--surface)`.

- [ ] **Step 3: Replace literals in components** (only these substitutions; keep everything else byte-identical)
- `bg-white` → `bg-surface` in: button (outline + plain variants, incl. `disabled:bg-white`), input, textarea, switch thumb, checkbox, radio, select/select trigger (`data-popup-open:bg-white` too), select/item checkbox, date/cell (`"bg-white"` and the hidden cell), date/calendar weekday cells, date/picker trigger, table container, toast root, dialog + alert/dialog popup, accordion root + trigger, badge `outline` variant.
- `text-white` → `text-on-accent` in: button primary/destructive, tabs segmented `data-active:text-white`, checkbox indicator, select/item checkbox, toast icon. Radio indicator and switch thumb `bg-white` → `bg-on-accent`; select/item checkbox `bg-white` (box) → `bg-surface`.
- button secondary `bg-[rgb(232_235_237/0.1)]` → `bg-secondary-fill`.
- switch thumb `shadow-[0_1px_2px_rgb(9_11_11/0.2)]` → `shadow-(--knob-shadow)`.
- select/item single-mode `data-[selected]:text-accent-hover` → `data-[selected]:text-accent-selected`.
- breadcrumb separator `text-calendar-strike` → `text-line-chevron`.
- date/cell selected: `bg-calendar-selected font-bold text-white` → `bg-calendar-selected font-bold text-calendar-selected-ink`; today bar `bg-ink` → `bg-calendar-today`.
After editing: `grep -rn "bg-white\|text-white\|#fff\b\|rgb(232_235" registry/xuan/ui` must return nothing.

- [ ] **Step 4: Verify** — `pnpm prettier --write registry/xuan`, `pnpm typecheck && pnpm lint && pnpm test && pnpm registry:build`. Update any test that asserted an old class string (e.g. `toContain("bevel-primary")` is unaffected; check `small.test.tsx`/`button.test.tsx`).

- [ ] **Step 5: Commit** — `git commit -m "refactor(ui): tokenise surface, on-accent and bevel colours"`.

---

### Task 2: `.dark` token block + registry `cssVars.dark`

**Files:**
- Modify: `registry/xuan/theme.css`, `registry/sync.mjs`, `registry/sync.test.ts`, `registry/xuan/theme.test.ts`, `registry.json` (via sync), `app/globals.css`

- [ ] **Step 1: Failing tests**
`registry/sync.test.ts`: extend the fixture with `.dark { --accent-500: hsl(210 100% 45%); }` and assert `result.cssVars.dark` equals `{ "accent-500": "hsl(210 100% 45%)" }` and that `.dark` is NOT present in `result.css`.
`registry/xuan/theme.test.ts`: add
```ts
  it("gives every literal light token a dark value", () => {
    const literal = Object.entries(cssVars.light)
      .filter(([, value]) => !value.startsWith("var("))
      .map(([name]) => name)
    const missing = literal.filter((name) => !(name in cssVars.dark))
    expect(missing).toEqual([])
  })
```
Run → FAIL.

- [ ] **Step 2: `registry/sync.mjs`** — initialise `cssVars = { theme: {}, light: {}, dark: {} }` and add `else if (node.type === "rule" && node.selector === ".dark") Object.assign(cssVars.dark, declsToVars(node))` before the generic `rule` branch.

- [ ] **Step 3: Add the `.dark` block to `theme.css`** (after `:root`), one line per token in the values file's Dark column — every literal token, including the shadcn aliases `--background: #141519`, `--foreground`, `--card`/`--popover` (`#1E1F25`), `--primary-foreground` (`#ffffff`), `--border`, `--input`, `--muted`, `--secondary`, `--accent` (keep them as `var()` refs where they already are refs — those need no dark line). Unchanged tokens (`--accent-500/600/hover/active`, `--focus-ring`, `--error-ring`, `--ink-muted`, `--on-accent`, `--error`, `--success`, `--warning`, `--destructive*`, `--today`? no — `--today` changes to `#818CF8`) must STILL be listed with their light value so the drift test passes and consumers get a complete block. Also add `color-scheme: dark;` to `.dark` and `color-scheme: light;` to `:root`.

- [ ] **Step 4: Host parity** — `app/globals.css` add `@custom-variant dark (&:is(.dark *));` after the imports (matches what shadcn writes for consumers; kit components do not use it).

- [ ] **Step 5: Verify** — `pnpm registry:sync && pnpm typecheck && pnpm lint && pnpm test && pnpm registry:build`; `git diff registry.json` shows a new `cssVars.dark` with the same key count as `cssVars.light` minus the `var()` aliases.

- [ ] **Step 6: Commit** — `git commit -m "feat(theme): add dark mode tokens"`.

---

### Task 3: Preview theme toggle

**Files:**
- Create: `app/preview/theme.tsx` (`PreviewTheme`)
- Modify: `app/layout.tsx` (pre-paint script + `suppressHydrationWarning`), `app/preview/nav.tsx` (render `<PreviewTheme />` at the top of the nav)

- [ ] **Step 1: `app/preview/theme.tsx`**
```tsx
"use client"

import * as React from "react"

import { Button } from "@/registry/xuan/ui/button"

const STORAGE_KEY = "xuan-theme"

type Theme = "light" | "dark"

function currentTheme(): Theme {
  if (typeof document === "undefined") return "light"
  return document.documentElement.classList.contains("dark") ? "dark" : "light"
}

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark")
  try {
    localStorage.setItem(STORAGE_KEY, theme)
  } catch {
    // note: storage can be unavailable (private mode); the class still applies for this page view.
  }
}

function PreviewTheme() {
  const [theme, setTheme] = React.useState<Theme>(currentTheme)
  const next: Theme = theme === "dark" ? "light" : "dark"
  return (
    <Button
      variant="secondary"
      size="compact"
      suppressHydrationWarning
      onClick={() => {
        applyTheme(next)
        setTheme(next)
      }}
    >
      {theme === "dark" ? "Light mode" : "Dark mode"}
    </Button>
  )
}

export { PreviewTheme }
```
- [ ] **Step 2: `app/layout.tsx`** — add `suppressHydrationWarning` to `<html>` and, as the first child of `<body>` (before `<Toaster>`), an inline script that runs before hydration:
```tsx
<script
  // note: applies the stored theme before first paint; an effect would flash light first.
  dangerouslySetInnerHTML={{
    __html: "try{if(localStorage.getItem('xuan-theme')==='dark')document.documentElement.classList.add('dark')}catch(e){}",
  }}
/>
```
- [ ] **Step 3: `app/preview/nav.tsx`** — render `<PreviewTheme />` above the anchor list. Make the preview page's own chrome token-based (`bg-background`, `text-ink`, `border-line-hair`) so it darkens too.
- [ ] **Step 4: Verify** — `pnpm typecheck && pnpm lint && pnpm test && pnpm build`; in the browser, toggle persists across reload, no hydration warning in the console.
- [ ] **Step 5: Commit** — `git commit -m "feat(preview): add dark mode toggle"`.

---

### Task 4: Visual verification (light regression + dark vs design)

- [ ] Start `pnpm dev`; with `agent-browser`, screenshot every `/preview` section in **light** and compare to the existing light screenshots / `docs/*.dc.html` — must be unchanged.
- [ ] Toggle dark; screenshot every section and compare to `docs/dark/<Name>.dc.html` (open each in the browser). Check specifically: secondary button bevel (two layers), input inset depth, calendar selected cell inverted, table bands, badge palettes, chip/tag, overlay opacity, popup borders `#34353D`.
- [ ] Fix divergences in `theme.css` (`.dark` values) or, if a component still carries a literal, in the component; never in the preview. Re-run `pnpm test`.
- [ ] Commit `fix(theme): align dark tokens with design references` if anything changed.

---

### Task 5: Consumer re-test, docs, deploy

- [ ] Re-run the consumer install (Task 21 recipe of the base plan) against `http://localhost:3000`; confirm the consumer's `app/globals.css` gains a `.dark { … }` block with our tokens and that adding `class="dark"` to `<html>` renders the dark kit (screenshot).
- [ ] README: add a "Dark mode" section — toggle the `dark` class on `<html>` (e.g. with `next-themes`, `attribute="class"`); the kit ships the tokens, the app owns the switch.
- [ ] Design doc `2026-08-25-ui-kit-design.md`: mark dark mode as shipped in "Implementation status"; remove it from "Missing from the design".
- [ ] `pnpm typecheck && pnpm lint && pnpm test && pnpm registry:validate && pnpm build`; commit `docs: dark mode`; push `feat/dark-mode`; merge into `main`; push (Vercel deploys); probe `https://xuan-ui-kit.vercel.app/r/xuan.json` for `cssVars.dark`.
