# xuan-ui-kit — Design

Date: 2026-08-25

## Why

One source of truth for the brand look (hue-210 blue, IBM Plex Sans, 40px controls, bevelled buttons) so every future project shares the exact same components by installing them from a single registry, instead of re-styling shadcn defaults per project.

## How (principles)

- **Consumed as a shadcn registry (copy-in)** — projects run `npx shadcn registry add @xuan=https://<host>/r/{name}.json` then `npx shadcn add @xuan/button`. Source is copied into each app and stays editable there.
- **Base UI primitives + Tailwind v4 + cva** — the standard shadcn 4.x shape (`style: "base-*"`). Accessibility, keyboard handling, focus management and positioning come from Base UI; the prototypes had none.
- **The `.dc.html` files are the pixel spec.** `docs/README.md` is the overview; where it disagrees with a file, the file wins (see conflicts below). Exact values are in `2026-08-25-ui-kit-values.md`.
- **Light-only, tokenised.** All colours are CSS variables under `:root` so a `.dark` block can be designed later.
- **Minimal repo.** A Next.js shell exists only to run `shadcn build` and serve `public/r`. No docs site, no preview routes (a scratch page is used during development and deleted).
- **Ship only what is designed.** Missing components/states are listed for the designer, not invented.
- Follows the global coding rules: named exports, lowercase single-word file names (folders for multi-word concepts), ≤100-line files split by folder, `null` over `undefined`, no `useEffect` without a `// note:`.

## What

### Repo layout

```
registry.json                    # manifest; `pnpm registry:build` → public/r/*.json
registry/xuan/
  theme.css                      # tokens (:root + @theme inline) and @utility helpers
  ui/
    button.tsx  input.tsx  textarea.tsx  label.tsx  field.tsx
    switch.tsx  checkbox.tsx  radio.tsx
    select.tsx  tabs.tsx  table.tsx  toast.tsx  dialog.tsx
    menu.tsx  popover.tsx  accordion.tsx
    breadcrumb.tsx  badge.tsx  tag.tsx  avatar.tsx  separator.tsx
    date/ picker.tsx calendar.tsx header.tsx grid.tsx cell.tsx range.ts
app/                             # Next.js shell: layout + index page listing items
components.json                  # style base-xuan, aliases, registries
```
Files that outgrow ~100 lines are split into a folder named after the component (e.g. `ui/select/` with `select.tsx`, `trigger.tsx`, `item.tsx`, `chip.tsx`).

### Registry items

| name | type | contents |
|---|---|---|
| `xuan` | `registry:style` | `dependencies`: `@base-ui/react`, `class-variance-authority`, `clsx`, `tailwind-merge`; `registryDependencies`: `utils`, `@xuan/font-plex-sans`, `@xuan/font-plex-mono`; `cssVars`/`css` generated from `theme.css` by `registry/sync.mjs`; no `config` |
| `font-plex` | `registry:font` | two items, `font-plex-sans` and `font-plex-mono` — IBM Plex Sans 400/500/600 + IBM Plex Mono 400/500 from Google, `--font-sans` / `--font-mono` |
| one per component | `registry:ui` | `files[]` under `registry/xuan/ui/…`; `registryDependencies` on `utils` and sibling `@xuan/*` items |

Namespace `@xuan`; hosted on Vercel at a placeholder `https://xuan-ui-kit.vercel.app` (replace at deploy).

### Tokens (`theme.css`)

`:root` defines the design's own names (`--accent-500/600/hover/active`, `--accent-tint-94/96`, `--focus-ring`, `--text-primary/body/secondary/muted/disabled`, `--border-control/popup/hairline`, `--fill-hover/active/menu-hover`, `--disabled-bg/border`, `--table-band/hairline/border`, `--success-*`, `--warning-*`, `--error-*`, `--neutral-badge-*`, `--popup-shadow`, `--modal-shadow`) **and** shadcn's semantic aliases (`--background`, `--foreground`, `--primary`, `--primary-foreground`, `--secondary`, `--muted`, `--muted-foreground`, `--border`, `--input`, `--ring`, `--destructive`, `--popover`, `--card`, `--radius`) mapped onto them, so third-party shadcn components look coherent. `@theme inline` exposes both sets as Tailwind colours; fonts via `--font-sans` / `--font-mono`.

`@utility` helpers used across components: `bevel-primary`, `bevel-primary-active`, `bevel-secondary`, `bevel-outline`, `bevel-outline-active`, `bevel-destructive`, `focus-ring`, `focus-ring-error`, `popup` (radius 12 / border / shadow / padding 5), `control` (h-10, radius 10, padding 8/12/10/12, 15px). Keyframes: `toast-in`, `toast-out`, `modal-in`, `modal-out`, `overlay-in`, `overlay-out`.

### Components → Base UI

| Item | Base UI | Notes |
|---|---|---|
| button | `Button` | `variant`: primary · secondary · outline · ghost · destructive; `size`: default (40px) · compact (32px, flat, used in popover footers); `ButtonArrow` trailing icon slides 2px on hover |
| input, textarea | `Input`, native `<textarea>` | `InputGroup` with `InputPrefix`/`InputSuffix` slots (search icon, "USD"); error via `aria-invalid`/`data-invalid`; `TextareaCounter` (12px, red when over max) |
| label, field | `Field` | `Field.Root/Label/Description/Error` — label 13/600, error 12/500 red |
| switch | `Switch` | 36×22 track, knob `left 2→16` 0.15s ease-out |
| checkbox | `Checkbox` | 20px, radius 6; check path draws (`stroke-dashoffset 24→0` 0.15s ease-out) on check, instant on uncheck; indeterminate dash; `size="sm"` (16px) for select items |
| radio | `Radio` + `RadioGroup` | dot `scale(0.4)→1` + opacity 120ms |
| select | `Select` (`multiple`) | `SelectTrigger` (flat, chevron rotates on `data-open`), `SelectContent` = Portal › Positioner › Popup with `popup` chrome, `SelectGroup/GroupLabel/Item/Separator`; `SelectChip` renders chosen values in the trigger when `multiple` |
| date/* | `Popover` + custom calendar | `DatePicker` (`mode: "single" \| "range"`, `value`, `onValueChange`, `min`, `max`, `isDateDisabled`); `DateCalendar` grid: Monday-first, fixed 6 rows, 1px gap-lines, today bar, full-cell selected fill, range band, diagonal strike for disabled; range state `{start, end, hover}` machine with hover-preview stagger `min(dist×30, 400)ms` |
| tabs | `Tabs` | `variant="segmented" \| "underline"`; `TabsList`, `TabsTab`, `TabsPanel`; underline bar scaleX 0→1 |
| table | semantic `<table>` | `Table`, `TableHeader`, `TableBody`, `TableFooter`, `TableRow` (`data-selected`), `TableHead` (`sortable`, `direction`), `TableCell` (`mono`, `align`); warm palette; app owns data/sort/selection state |
| toast | `Toast` | `ToastProvider`, `ToastViewport` (fixed bottom-right stack), `Toast` with `variant` success/error/warning/info; 4s timeout; enter + exit animation via `data-starting-style`/`data-ending-style` |
| dialog | `Dialog`, `AlertDialog` | `DialogContent` (Portal › Backdrop › Popup), `DialogHeader/Title/Description/Close/Body/Footer`, `DialogIconTile` (destructive confirm); overlay fade 0.15s, popup 0.18s |
| menu | `Menu` | `MenuTrigger`, `MenuContent`, `MenuItem` (`variant="danger"`), `MenuItemIcon`, `MenuShortcut`, `MenuSeparator` |
| popover | `Popover` | `PopoverContent`, `PopoverBody`, `PopoverTitle`, `PopoverDescription`, `PopoverFooter` |
| accordion | `Accordion` | `AccordionItem/Trigger/Panel`; height via `grid-template-rows 0fr→1fr`; chevron 0.18s; title weight 500→600 when open |
| breadcrumb | plain | `Breadcrumb`, `BreadcrumbItem`, `BreadcrumbLink` (render prop for `<Link>`), `BreadcrumbPage`, `BreadcrumbSeparator`, `BreadcrumbEllipsis` |
| badge | plain | `variant`: neutral · info · success · warning · error; `dot` colour option; `size`: default (24) · sm (20, 11.5px) |
| tag | plain | removable chip 26px (`Tag` + `TagRemove`) |
| avatar | `Avatar` | 24px initials; `tone="warm" \| "tint"` |
| separator | `Separator` | popup divider (`1px #ECECF0`, margin 5px 6px) and plain hairline |

### Spec conflicts and resolutions

| Conflict | Resolution |
|---|---|
| Button padding: README `8/12/10/12`; files `8/10/10/12` (with arrow) and `8/14/10` (text only) | Text-only buttons `8px 14px 10px`; the `ButtonArrow` variant reduces right padding to 10px |
| Input border `#D0D0D9` + inset shadow (Inputs, Date Picker) vs `hsl(210,14%,87%)` flat (Modal input) | Use the Inputs file values everywhere inputs appear |
| Toast/modal shadow: static vs live (darker) values | Use the live values (they are what users see when the component animates in) |
| Chip 24px/r7 (Select) vs tag 26px/r8 (Breadcrumb & Badge) | Both kept: `SelectChip` inside triggers, `Tag` standalone |
| `style-focus` compiles to `:focus`; README says `:focus-visible` | `:focus-visible` (Base UI `data-focus-visible` where available) |
| Table "selected-hover `#EFEFEA`" in README, absent in file | Not implemented; selected rows keep their tint on hover |
| Segmented active tab bevel "like primary button" | Use the tab file's values (no drop shadow, text-shadow α 0.4) |
| Accordion chevron 0.18s vs select 0.15s | Keep each file's own duration |

### Missing from the design (to be designed, not invented)

**New components:** Tooltip · Alert/banner · Card · Skeleton · Spinner/loading · Progress · Pagination · Slider · Combobox / search-in-select · Number field · Sheet/Drawer · Kbd · Toggle group (standalone) · Scroll area · Empty state.

**States/variants on existing components:** button loading, icon-only, sizes, leading icon; hover for checkbox/radio/switch; switch on+disabled; select error and empty/no-results; date trigger error/disabled, month/year jump, two-month range, presets; tabs with icons/counts, vertical; table pagination, empty, loading, dense; toast action button; dialog sizes, scrollable body; menu submenu, checkbox/radio items, disabled item; breadcrumb collapsed-expand menu; dark mode for everything.

### Verification

- `pnpm typecheck` and `pnpm lint` pass.
- `pnpm registry:validate` (`shadcn registry validate`) and `pnpm registry:build` produce `public/r/*.json`.
- A throw-away consumer Next.js app (in the scratchpad) runs `npx shadcn init http://localhost:3000/r/xuan.json` and `npx shadcn add @xuan/<every item>`, then typechecks.
- Each component is rendered on a scratch page and screenshotted next to its `.dc.html` for visual comparison; the scratch page is deleted before finishing.

## Implementation status (2026-08-25)

All 24 registry items shipped:

| Item | Type | Source |
|---|---|---|
| xuan | registry:base | `registry/xuan/theme.css` |
| font-plex-sans | registry:font | Google Fonts (IBM Plex Sans 400/500/600) |
| font-plex-mono | registry:font | Google Fonts (IBM Plex Mono 400/500) |
| button | registry:ui | `registry/xuan/ui/button.tsx` |
| input | registry:ui | `registry/xuan/ui/input.tsx` |
| textarea | registry:ui | `registry/xuan/ui/textarea.tsx` |
| label | registry:ui | `registry/xuan/ui/label.tsx` |
| field | registry:ui | `registry/xuan/ui/field.tsx` |
| switch | registry:ui | `registry/xuan/ui/switch.tsx` |
| checkbox | registry:ui | `registry/xuan/ui/checkbox.tsx` |
| radio | registry:ui | `registry/xuan/ui/radio.tsx` |
| select | registry:ui | `registry/xuan/ui/select/` |
| date-picker | registry:ui | `registry/xuan/ui/date/picker.tsx` |
| tabs | registry:ui | `registry/xuan/ui/tabs.tsx` |
| table | registry:ui | `registry/xuan/ui/table.tsx` |
| toast | registry:ui | `registry/xuan/ui/toast.tsx` |
| dialog | registry:ui | `registry/xuan/ui/dialog.tsx` |
| alert-dialog | registry:ui | `registry/xuan/ui/alert-dialog.tsx` |
| menu | registry:ui | `registry/xuan/ui/menu.tsx` |
| popover | registry:ui | `registry/xuan/ui/popover.tsx` |
| accordion | registry:ui | `registry/xuan/ui/accordion.tsx` |
| breadcrumb | registry:ui | `registry/xuan/ui/breadcrumb.tsx` |
| badge | registry:ui | `registry/xuan/ui/badge.tsx` |
| tag | registry:ui | `registry/xuan/ui/tag.tsx` |
| avatar | registry:ui | `registry/xuan/ui/avatar.tsx` |
| separator | registry:ui | `registry/xuan/ui/separator.tsx` |

Preview page: `/preview` (`app/preview/`) — renders every component with all documented states.

Missing from the design — unchanged, still to be designed (see the section above).
