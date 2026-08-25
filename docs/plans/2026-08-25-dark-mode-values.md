# Dark mode — exact values from `docs/dark/*.dc.html` (implementation reference)

Source: line diffs of the 13 `docs/dark/*.dc.html` files against `docs/*.dc.html` (`/usr/bin/diff`; same line counts, colour-only changes; `support.js` identical). Page background `#141519`; section labels/captions keep `#9A9AA5`.

## Token map (light → dark)

| Token | Light | Dark | Roles |
|---|---|---|---|
| `--background` | `#ffffff` | `#141519` | page |
| `--surface` (new) | `#ffffff` | `#1E1F25` | input/textarea/select/popup/menu/dialog/toast/table row/accordion/checkbox off/calendar cell/outline button bg |
| `--calendar` | `#EFEFF3` | `#1B1C21` | calendar panel |
| `--table-band` | `#F7F7F2` | `#25262B` | table header/footer band + row hover |
| `--fill-hover` | `hsl(215 15% 97%)` | `#26272E` | secondary/ghost hover, select trigger hover, segmented tray, dialog/popover footer |
| `--fill-menu` | `hsl(215 15% 95%)` | `#2A2B32` | menu/select item hover, breadcrumb link hover, reset hover |
| `--fill-active` | `hsl(215 15% 92%)` | `#30313A` | secondary active, segmented tab hover, close-button hover |
| `--calendar-nav` | `#E9E9EE` | `#2A2B32` | nav/Today hover |
| `--disabled-bg` | `#F0F0F4` | `#22232A` | disabled controls bg |
| `--disabled-fill` | `#DADAE1` | `#2E2F37` | primary disabled bg, disabled-checked box, disabled knob |
| `--neutral-bg` | `#EBEBE5` | `#2E2F35` | neutral badge bg, warm avatar bg |
| `--calendar-band` | `#E4E4EA` | `#2E3038` | range band / preview |
| `--secondary-fill` (new) | `rgb(232 235 237 / 0.1)` | `rgb(255 255 255 / 0.04)` | secondary button base fill |
| `--line-control` | `hsl(210 14% 87%)` | `#3A3B44` | control borders |
| `--line-input` | `#D0D0D9` | `#3A3B44` | input/date trigger/checkbox borders |
| `--line-input-hover` | `#A9A9B8` | `#4A4B55` | |
| `--line-popup` | `#E2E2E8` | `#34353D` | popup/dialog/toast/panel borders |
| `--disabled-line` | `#E2E2E8` | `#34353D` | |
| `--line-hair` | `#ECECF0` | `#2A2B32` | separators, footer top borders |
| `--line-hair-soft` | `hsl(215 15% 94%)` | `#2A2B32` | accordion dividers |
| `--disabled-fill-line` | `#CDCDD6` | `#3A3B44` | |
| `--switch-off-line` | `#CDCDD6` | `#3A3B44` | |
| `--switch-off` | `#D9D9E0` | `#34353D` | |
| `--calendar-line` | `#D9D9E0` | `#34353D` | grid gutter |
| `--line-dashed` | `hsl(210 14% 80%)` | `#4A4B55` | |
| `--line-chevron` (new) | `#C2C2CC` | `#4A4B55` | breadcrumb separator |
| `--calendar-strike` | `#C2C2CC` | `#4A4B55` | |
| `--table-line` | `#E4E4DC` | `#3A3B44` | container border (file says `#3A3B42` — typo, ruled) |
| `--table-hair` | `#ECECE4` | `#2E2F35` | |
| `--neutral-line` | `#D5D5CB` | `#454650` | |
| `--ink-heading` | `#1B1B1F` | `#F2F2F5` | |
| `--ink` | `#232329` | `#E8E8EC` | |
| `--ink-strong` | `hsl(215 15% 12%)` | `#E8E8EC` | |
| `--ink-subtle` | `#3E3E47` | `#B8B8C0` | badge/owner/avatar/year text |
| `--ink-secondary` | `#55555E` | `#A5A5B0` | |
| `--ink-muted` | `#9A9AA5` | `#9A9AA5` | unchanged |
| `--ink-disabled` | `#ACACB8` | `#5F5F6B` | |
| `--ink-weekday` | `#7C7C89` | `#8B8B98` | |
| `--calendar-outside` | `#B9B9C4` | `#565764` | |
| `--calendar-disabled` | `#8E8E9B` | `#6A6B76` | |
| `--calendar-selected` | `#1B1B1F` | `#F2F2F5` | selected cell fill (inverts) |
| `--calendar-selected-ink` (new) | `#ffffff` | `#16171C` | selected cell text |
| `--calendar-today` (new) | `#232329` | `#E8E8EC` | today bar |
| `--on-accent` (new) | `#ffffff` | `#ffffff` | text on primary/destructive/active tab, check, dot, knob |
| `--accent-500/600/hover/active` | 45/42/38/30% | unchanged | fills (file's primary-hover `hsl(210,90%,70%)` / destructive-hover `hsl(0,75%,68%)` are defects — keep light values) |
| `--accent-selected` (new) | `hsl(210 100% 38%)` | `hsl(210 90% 70%)` | select item selected text |
| `--accent-700` | `hsl(210 100% 40%)` | `hsl(210 90% 68%)` | outline/ghost text, underline tab active |
| `--accent-deep` | `hsl(210 100% 35%)` | `hsl(210 90% 72%)` | chip/tag/info badge text, tint avatar text |
| `--accent-800` | `hsl(210 100% 32%)` | `hsl(210 90% 75%)` | outline/ghost active text |
| `--accent-line` | `hsl(210 70% 75%)` | `hsl(210 50% 40%)` | outline border |
| `--accent-line-hover` | `hsl(210 80% 60%)` | `hsl(210 60% 48%)` | |
| `--accent-line-active` | `hsl(210 80% 55%)` | `hsl(210 60% 50%)` | |
| `--accent-line-soft` | `hsl(210 80% 86%)` | `hsl(210 50% 32%)` | chip border / ✕ hover |
| `--accent-line-badge` | `hsl(210 80% 84%)` | `hsl(210 50% 32%)` | |
| `--accent-tint-97` | `hsl(210 100% 97%)` | `hsl(210 40% 16%)` | outline hover bg |
| `--accent-tint-96` | `hsl(210 100% 96%)` | `hsl(210 50% 18%)` | selected table row |
| `--accent-tint-95` | `hsl(210 100% 95%)` | `hsl(210 45% 18%)` | ghost hover (unconverted in file — derived) |
| `--accent-tint-94` | `hsl(210 100% 94%)` | `hsl(210 55% 20%)` | chip/tag/info badge bg, tint avatar |
| `--accent-tint-93` | `hsl(210 100% 93%)` | `hsl(210 45% 22%)` | outline active bg |
| `--accent-tint-90` | `hsl(210 100% 90%)` | `hsl(210 45% 24%)` | ghost active bg |
| `--today` | `#6366F1` | `#818CF8` | Today button / links |
| `--focus-ring`, `--error-ring` | | unchanged | |
| `--success-bg/-text/-line` | `#DFF2E4`/`#1F5B32`/`#A9D8B5` | `hsl(145 35% 15%)`/`hsl(145 45% 62%)`/`hsl(145 30% 30%)` | |
| `--warning-bg/-text/-line` | `#FBEFC7`/`#7A5410`/`#EBD285` | `hsl(44 45% 15%)`/`hsl(42 70% 62%)`/`hsl(42 40% 32%)` | |
| `--error-bg/-badge-text/-line` | `hsl(0 72% 95%)`/`hsl(0 72% 40%)`/`hsl(0 60% 84%)` | `hsl(0 40% 16%)`/`hsl(0 75% 68%)`/`hsl(0 35% 32%)` | |
| `--error-text` | `hsl(0 72% 45%)` | `hsl(0 75% 65%)` | helper text, danger item, over-limit counter, trash icon |
| `--error-bg-soft` | `hsl(0 72% 96%)` | `hsl(0 40% 16%)` | danger item hover |
| `--error`, `--success`, `--warning`, `--destructive`, `--destructive-line`, `--destructive-hover` | | unchanged | dots, toast icons, destructive fill/border/hover |
| `--neutral-text` | `#3E3E47` | `#B8B8C0` | |
| `--overlay` | `rgb(20 22 28 / 0.45)` | `rgb(0 0 0 / 0.6)` | |
| `--shadow-popup/-toast/-modal/-panel` | `rgb(24 24 44 / a)` | `rgb(0 0 0 / a)` same alphas | |
| `--inset-input` (new) | `inset 0 1px 2px rgb(9 11 11 / 0.06)` | `inset 0 1px 2px rgb(0 0 0 / 0.35)` | |
| `--secondary-bevel` (new) | `inset 0 1px 0 1px #fff, inset 0 -1px 0 1px rgb(223 226 231 / 0.4), 0 1px 2px rgb(223 226 231 / 0.5)` | `inset 0 1px 0 rgb(255 255 255 / 0.08), 0 1px 2px rgb(0 0 0 / 0.4)` | bottom bevel removed in dark |
| `--outline-bevel` (new) | `inset 0 1px 0 rgb(255 255 255 / 1), inset 0 -1px 0 1px rgb(0 77 153 / 0.1), 0 2px 4px rgb(9 11 11 / 0.08)` | `inset 0 1px 0 rgb(255 255 255 / 0.06), inset 0 -1px 0 1px rgb(0 77 153 / 0.1), 0 2px 4px rgb(0 0 0 / 0.4)` | |
| `--knob-shadow` (new) | `0 1px 2px rgb(9 11 11 / 0.2)` | `0 1px 2px rgb(0 0 0 / 0.5)` | file's JS knob unconverted — ruled |
| primary/destructive/tab bevels + text-shadows | | unchanged | |

## Defects in the dark files and rulings
1. Primary hover `hsl(210,90%,70%)` (Buttons only; Modal/Dropdown keep 38%) — accent-text value applied to a fill → keep `hsl(210 100% 38%)`.
2. Destructive hover `hsl(0,75%,68%)` — same bug → keep `hsl(0 72% 40%)`.
3. Ghost hover `hsl(210,100%,95%)` unconverted → `hsl(210 45% 18%)`.
4. Switch JS knob shadow unconverted → `0 1px 2px rgb(0 0 0 / 0.5)` (the static specimens).
5. Table container border `#3A3B42` → `#3A3B44` (typo).
6. Toast icons keep light colours (design choice) → keep.
