# Handoff: UI Kit — Design System Components

## Overview
A complete component library spec: 15 components with full state coverage (default / hover / focus / active / disabled / error), interactive behaviors, and micro-animations. Built around a hue-210 blue accent, IBM Plex Sans, a shared 40px control height and 10px radius. Intended implementation target: **Base UI (unstyled primitives) + your styling layer** — the anatomy of every component maps 1:1 onto Base UI parts.

## About the Design Files
The `.dc.html` files in this bundle are **design references created in HTML** — prototypes showing intended look and behavior, not production code to copy directly. Recreate them in your target codebase (React + Base UI was the stated plan) using its established patterns. Open any file in a browser to inspect the live component.

## Fidelity
**High-fidelity.** Colors, typography, spacing, radii, shadows and animations are final. Recreate pixel-perfectly.

## Design Tokens

### Colors
Accent (hue 210):
- `--accent-500: hsl(210,100%,45%)` — primary fill, checked states, selected
- `--accent-600: hsl(210,100%,42%)` — primary border, checkmarks in menus
- `--accent-hover: hsl(210,100%,38%)` — primary hover fill; also selected-text color in menus
- `--accent-active: hsl(210,100%,30%)` — primary pressed fill
- `--accent-tint-94: hsl(210,100%,94%)` — chips, avatar bg, tinted badge bg
- `--accent-tint-96: hsl(210,100%,96%)` — selected table row
- `--focus-ring: rgba(0,115,230,0.5)` — 3px outline, offset 2px (universal focus treatment, paired with 1px `--accent-600` border)

Neutrals (hue 215/210 grays):
- Text primary: `#1B1B1F` (headings), `#232329` (body/controls), `hsl(215,15%,12%)` (secondary-button label)
- Text secondary: `#55555E`; muted: `#9A9AA5`; disabled: `#ACACB8`
- Borders: `hsl(210,14%,87%)` (controls), `#E2E2E8` (popups), `#ECECF0` / `hsl(215,15%,94%)` (hairlines/dividers)
- Hover fills: `hsl(215,15%,97%)`; active: `hsl(215,15%,92%)`; menu-item hover: `hsl(215,15%,95%)`
- Disabled: bg `#F0F0F4`, border `#E2E2E8`; disabled control fill `#DADAE1` / border `#CDCDD6`
- Table (warm grays): header/footer bg `#F7F7F2`, hairlines `#ECECE4`, container border `#E4E4DC`, selected-hover `#EFEFEA`

Semantic:
- Success: bg `#DFF2E4`, text `#1F5B32`, border `#A9D8B5`, dot `hsl(145,55%,42%)`
- Warning: bg `#FBEFC7`, text `#7A5410`, border `#EBD285`, dot `hsl(38,92%,50%)`
- Error: `hsl(0,72%,51%)` border / `hsl(0,72%,45%)` text / bg tint `hsl(0,72%,95-96%)`; destructive button fill `hsl(0,72%,48%)`
- Neutral badge: bg `#EBEBE5`, text `#3E3E47`, border `#D5D5CB`

### Typography
- UI font: **IBM Plex Sans** (400/500/600). Numeric/ID cells in tables: **IBM Plex Mono** (400/500). Spec-sheet section labels: Geist 11px/600 uppercase (not part of the kit).
- Scale: control text 15px/500 (buttons) or 15px/400 (inputs); labels 13px/600; menu items 14.5px; table body 13.5–14px; badges 13px/500 (11.5px in dense table); helper/error 12px/500; modal title 17px/600; calendar month 22px (700 month + 400 year).

### Metrics
- Control height: **40px**; radius **10px**; padding **8px 12px 10px 12px** (top 8 / bottom 10 — the 2px offset is intentional, creates the 3D feel on buttons)
- Popups/panels: radius **12px**, border `#E2E2E8`, padding 5px, item height 34px, item radius 8px, shadow `0 8px 24px rgba(24,24,44,0.10), 0 2px 6px rgba(24,24,44,0.05)`
- Modal: radius 14px, width 400–440px, shadow `0 16px 48px rgba(24,24,44,0.16), 0 4px 12px rgba(24,24,44,0.06)`, footer bg `hsl(215,15%,97%)` + hairline top
- Checkbox 20px / radius 6px; radio 20px circle; switch 36×22 track, 16px knob; table checkbox 20px (16px in dense select-menu context)
- Badges: height 24px, pill (999px), 12px horizontal padding
- Transitions: `120ms ease-in` for color/fill; 0.15–0.2s ease-out for movement (knob, chevron, underline, check draw)

## Components & Files

| File | Contents |
|---|---|
| `Buttons.dc.html` | Primary / Secondary / Outline / Ghost, each with Default/Hover/Pressed/Focus/Disabled + live interactive row |
| `Inputs.dc.html` | Text input states, icon variants (search prefix, USD suffix) |
| `Switch & Textarea.dc.html` | Switch states + interactive; textarea states + char counter |
| `Checkbox & Radio.dc.html` | All states incl. indeterminate; check draw-on animation |
| `Select.dc.html` | Single select (trigger + popup anatomy with groups/disabled) + multiple select with removable chips |
| `Date Picker.dc.html` | Single + range, fully interactive (see below) |
| `Tabs.dc.html` | Primary (segmented tray) + Secondary (underline) |
| `Table.dc.html` | Warm-gray table: sort, row select, badges, avatars, Total footer |
| `Toast.dc.html` | 4 variants + fire-and-auto-dismiss demo |
| `Modal.dc.html` | Form modal + destructive confirm + interactive open/close |
| `Dropdown & Popover.dc.html` | Action menu (shortcuts, divider, danger item) + info popover |
| `Accordion.dc.html` | Single-open accordion with height animation |
| `Breadcrumb & Badge.dc.html` | Breadcrumb (+ collapsed variant), tinted/dot badges, removable tags |

## Key Component Specs

### Button (MUI-style bevel)
- **Primary**: fill `hsl(210,100%,45%)`, border 1px `hsl(210,100%,42%)`, white text with `text-shadow: 0 1px 1px rgba(9,11,11,0.6)`, bevel `inset 0 1px 0 rgba(51,153,255,0.5), inset 0 -1px 0 1px rgba(0,77,153,0.4), 0 2px 4px rgba(9,11,11,0.1)`. Hover: fill 38%, border 30%, **shadow: none** (flatten). Active: fill 30%, `inset 0 1px 0 1px rgba(0,59,117,0.7)` (pressed-in).
- **Secondary**: text `hsl(215,15%,12%)`, bg `rgba(232,235,237,0.1)`, border `hsl(210,14%,87%)`, light bevel `inset 0 1px 0 1px #fff, inset 0 -1px 0 1px rgba(223,226,231,0.4), 0 1px 2px rgba(223,226,231,0.5)`. Hover `hsl(215,15%,97%)` flatten; active `92%`.
- **Outline**: white bg + blue border/text. **Ghost**: transparent, blue text, tint on hover.
- Arrow icon in `<span>` slides `translateX(2px)` on hover, `transition: 0.2s`.
- Destructive variant (in Modal): same bevel structure on `hsl(0,72%,48%)`.

### Select
- Trigger = input metrics, **flat** (no bevel/shadow): white bg, border `hsl(210,14%,87%)`, hover fill `hsl(215,15%,97%)`, open = focus ring + chevron rotates 180° (0.15s).
- Popup: group labels (11px/600 uppercase muted), selected item = blue text + check; multiple select = 16px checkboxes in items, selected values as removable chips (24px, radius 7px, tint-94 bg) in the trigger, which grows (min-height 40px).

### Date Picker
- Trigger reuses input spec. Panel: bg `#EFEFF3`, radius 12px, border `#E2E2E8`.
- Grid: gray gap-lines via 1px background + 1px gaps; weekday header row is part of the same grid (white cells, top corners 11px); cells 46px white; week starts **Monday**.
- Today: 14×2px underline bar. Selected: near-black `#1B1B1F` fills the **entire cell** (no radius, white 700 text). Range: cells between endpoints `#E4E4EA`.
- Disabled dates: full-cell diagonal strike (top-left → bottom-right, `#C2C2CC`, 1px, via linear-gradient), not clickable.
- Range hover preview: after picking start, hovering tints candidate cells with a staggered 30ms-per-day delay (wave effect). Second click sets end; clicking before start moves start; clicking with a complete range starts over.
- Header: month 700 + year 400, chevron buttons + "Today" text button (indigo `#6366F1`).

### Table (warm palette)
- Vertical + horizontal hairlines `#ECECE4`; container radius 8–14px; header/footer bands `#F7F7F2`; IBM Plex Mono for name/date columns; sortable headers with ↑↓; select-all with indeterminate dash; selected row `hsl(210,100%,96%)`; status pill badges; 24px initial avatars; "Total" footer row.

### Animations
- Checkbox check: SVG stroke draw left→right — `stroke-dasharray: 24; stroke-dashoffset: 24→0`, 0.15s ease-out (uncheck = instant hide).
- Switch knob: `left 2px→16px`, 0.15s ease-out.
- Tabs underline: `scaleX(0→1)` from left, 0.15s. Segmented active: fill + bevel like primary button.
- Toast: enter `translateY(12px) scale(0.97)→none` + fade, 0.2s; auto-dismiss 4s; stack bottom-right.
- Modal: overlay fade 0.15s; dialog `translateY(10px) scale(0.97)→none` 0.18s.
- Accordion: `grid-template-rows 0fr→1fr`, 0.2s ease-out; chevron rotates 180°.

## Interactions & State
- Select/multi-select, dropdown, popover, date pickers: click-outside should close (prototypes toggle via trigger only — add outside-click + Escape in production).
- Date range state machine: `{start, end, hover}` — documented above.
- Toasts: queue with id + 4s TTL, manual close.
- Focus: **every** control uses border `--accent-600` + 3px `--focus-ring` outline at 2px offset (`:focus-visible`).
- Error inputs: red border + red 3px ring + 12px helper text below.

## Assets
No external assets. All icons are inline SVG (24×24 viewBox, stroke-based, round caps, stroke-width 1.8–3.5 by size). Fonts from Google Fonts: IBM Plex Sans, IBM Plex Mono.

## Suggested Implementation Notes
- Base UI mapping: Select → `Select.Trigger/Popup/Item/ItemIndicator/Group`; Dropdown → `Menu.*`; Modal → `Dialog.*`; Popover → `Popover.*`; Accordion → `Accordion.*`; Switch/Checkbox/Radio/Tabs → matching primitives. Date picker and table are custom.
- The 8/10 asymmetric vertical padding on 40px controls is deliberate — keep it.
- Toast/Modal keyframes are in each file's `<style>` block; everything else is inline styles on the elements.
