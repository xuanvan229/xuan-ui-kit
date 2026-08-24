# xuan-ui-kit — exact values from the .dc.html files (implementation reference)

Shared: page font Geist (spec-sheet only); kit font 'IBM Plex Sans' 400/500/600; Table uses IBM Plex Mono 400/500.
`style-hover/focus/active` attrs in .dc.html → plain CSS :hover/:focus/:active (runtime emits :focus, README says :focus-visible → use :focus-visible).

## Buttons
Base: inline-flex;center;height:40px;radius 10px;font 15px/500;line-height 1.25; padding `8px 10px 10px 12px` (with trailing icon) or `8px 14px 10px` (text only). transition 120ms ease-in.
- Primary: color #FFF; text-shadow 0 1px 1px rgba(9,11,11,0.6); bg hsl(210,100%,45%); border 1px hsl(210,100%,42%); shadow inset 0 1px 0 rgba(51,153,255,0.5), inset 0 -1px 0 1px rgba(0,77,153,0.4), 0 2px 4px rgba(9,11,11,0.1)
  - hover: bg 38%, border 30%, shadow none. active: bg 30%, border 42%, shadow inset 0 1px 0 1px rgba(0,59,117,0.7). focus: outline 3px rgba(0,115,230,0.5) offset 2px. disabled: cursor not-allowed; color #9A9AA5; bg #DADAE1; border #CDCDD6; no shadows.
- Secondary: color hsl(215,15%,12%); bg rgba(232,235,237,0.1); border hsl(210,14%,87%); shadow inset 0 1px 0 1px #fff, inset 0 -1px 0 1px rgba(223,226,231,0.4), 0 1px 2px rgba(223,226,231,0.5). hover bg hsl(215,15%,97%) shadow none; active bg 92% shadow none; disabled color #ACACB8 bg #F0F0F4 border #E2E2E8.
- Outline: color hsl(210,100%,40%); bg #FFF; border hsl(210,70%,75%); shadow inset 0 1px 0 rgba(255,255,255,1), inset 0 -1px 0 1px rgba(0,77,153,0.10), 0 2px 4px rgba(9,11,11,0.08). hover bg hsl(210,100%,97%) border hsl(210,80%,60%) shadow none; active color hsl(210,100%,32%) bg hsl(210,100%,93%) border hsl(210,80%,55%) shadow inset 0 1px 2px rgba(0,59,117,0.15); disabled color #ACACB8 bg #FFF border #DADAE1.
- Ghost: color hsl(210,100%,40%); bg transparent; border 1px transparent. hover bg hsl(210,100%,95%); active color hsl(210,100%,32%) bg hsl(210,100%,90%); disabled color #ACACB8.
- Destructive (Modal file): color #fff; text-shadow 0 1px 1px rgba(9,11,11,0.5); bg hsl(0,72%,48%); border hsl(0,72%,42%); shadow inset 0 1px 0 rgba(255,120,120,0.4), inset 0 -1px 0 1px rgba(120,0,0,0.3), 0 2px 4px rgba(9,11,11,0.1). hover bg hsl(0,72%,40%) shadow none.
- Arrow icon: svg 20x20 viewBox 24, stroke-width 2.4, round, path M9.5 6.5L15 12l-5.5 5.5, in span margin-left 4px inline-flex; hover translateX(2px) transition 0.2s.
- Compact button (Popover footer): height 32px; radius 8px; 13.5px/500; flat (no bevel/text-shadow); primary bg 45% border 42% hover 38%; secondary bg #FFF border hsl(210,14%,87%) hover hsl(215,15%,97%).

## Input
height 40px; padding 8px 12px 10px 12px; radius 10px; border 1px #D0D0D9; bg #FFF; 15px/400 #232329; shadow inset 0 1px 2px rgba(9,11,11,0.06); transition 120ms ease-in. placeholder #9A9AA5.
hover border #A9A9B8. focus border hsl(210,100%,42%) + outline 3px rgba(0,115,230,0.5) offset 2px. error border hsl(0,72%,51%) + outline 3px rgba(220,38,38,0.25) offset 2px; helper 12px/500 hsl(0,72%,45%). disabled border #E2E2E8 bg #F0F0F4 color #ACACB8 cursor not-allowed no inset shadow.
Label 13px/600 #232329 (disabled #9A9AA5); field gap 8px.
Search prefix: svg 16 stroke #9A9AA5 sw 2, abs left 12px; input padding-left 36px. Suffix: abs right 12px, 13px/500 #9A9AA5; input padding-right 44px.

## Switch
track 36x22 radius 999; off bg #D9D9E0 border #CDCDD6; on bg hsl(210,100%,45%) border 42%; transition 120ms ease-in. knob 16px abs top 2 left 2→16 (on), #FFF, shadow 0 1px 2px rgba(9,11,11,0.2), transition left 0.15s ease-out. disabled track bg #F0F0F4 border #E2E2E8, knob #DADAE1 no shadow, label #ACACB8. Label 15px/400 #232329 gap 10px.

## Textarea
padding 10px 12px; radius 10px; border hsl(210,14%,87%); 15px/400; line-height 1.45; resize vertical; transition 120ms. focus/error/disabled same as input (disabled resize none). hover border #A9A9B8. Counter 12px/500 #9A9AA5 (over max → hsl(0,72%,45%)), header row flex baseline space-between.

## Checkbox / Radio
20px; checkbox radius 6px; border #D0D0D9; bg #FFF; transition 120ms. checked border hsl(210,100%,42%) bg 45%. check svg 12x12 stroke #FFF sw 3.5 path M4.5 12.5l5 5L19.5 6.5; draw: dasharray 24, offset 24→0, transition stroke-dashoffset 0.15s ease-out (uncheck instant). indeterminate dash 10x2.5 radius 2 #FFF. focus outline ring. disabled border #E2E2E8 bg #F0F0F4 label #ACACB8; disabled checked border #CDCDD6 bg #DADAE1 check #9A9AA5.
Radio: circle; dot 8px #FFF, scale(0.4)→1 + opacity, transition 120ms; disabled-checked dot #9A9AA5. Label gap 10px 15px/400.

## Select
Trigger: h40; padding 8px 12px 10px 12px; radius 10; border hsl(210,14%,87%); bg #FFF; flex space-between; placeholder 15px/400 #9A9AA5; value color hsl(215,15%,12%). hover bg hsl(215,15%,97%) (not when open). open: border 42% + ring; chevron rotate 180 (transform 0.15s ease-out). chevron svg 16 stroke #55555E sw 2.2 path M6.5 9.5L12 15l5.5-5.5. disabled border #E2E2E8 bg #F0F0F4 text/chevron #ACACB8.
Popup: margin-top 6px; bg #FFF; border #E2E2E8; radius 12; shadow 0 8px 24px rgba(24,24,44,0.10), 0 2px 6px rgba(24,24,44,0.05); padding 5px.
Group label: padding 6px 10px 4px; 11px/600; letter-spacing 0.06em; uppercase; #9A9AA5.
Item: h34; radius 8; padding 0 10px; 14.5px/400 #232329; hover bg hsl(215,15%,95%); transition background 100ms ease-in; selected 500 hsl(210,100%,38%) + check svg 14 stroke hsl(210,100%,42%) sw 3. disabled #ACACB8 not-allowed. Divider 1px #ECECF0 margin 5px 6px.
Multi trigger: min-height 40; padding 7px 12px; gap 8px; chips wrap gap 6px. Chip: h24; padding 0 4px 0 8px; radius 7; bg hsl(210,100%,94%); border hsl(210,80%,86%); 13px/500 hsl(210,100%,35%); × btn 16px radius 5 hover bg hsl(210,80%,86%), icon 9px sw 3. Multi item: 16px checkbox radius 5, check 10px sw 3.5, gap 10px.

## Date picker
Trigger: w360 h40 bg #FFF border #D0D0D9 radius 10 inset shadow; value 15px/500 #232329; calendar icon 18 stroke #55555E sw 1.8. Open ring = overlay (inset -1px, border 42%, outline ring).
Panel: w400; margin-top 12; bg #EFEFF3; radius 12; padding 16; border #E2E2E8; shadow 0 6px 16px rgba(24,24,44,0.06).
Header: margin-bottom 14; padding 0 4px; month 22px/700 #1B1B1F; year 22px/400 #3E3E47; baseline gap 8. Nav btn 32px radius 8 hover #E9E9EE; chevrons 18 stroke #232329 sw 2. Today btn #6366F1 14px/600 padding 6px 8px radius 8 hover #E9E9EE.
Grid shell: bg #D9D9E0 padding 1px radius 12 overflow hidden; gap 1px. Weekday row h35; cells #FFF 12px/600 #7C7C89; first radius 11px 0 0 0, last 0 11px 0 0. Mo-first. Always 6 weeks.
Day cell: h46 #FFF (band/preview #E4E4EA); transition background 0.18s ease; preview delay min(dist*30,400)ms; bottom corners 11px on last row. Inner square 36px radius 10; selected → 100% radius 0 bg #1B1B1F text #FFF 700. Text 15px/500 #232329; outside #B9B9C4; disabled #8E8E9B + diagonal strike linear-gradient(to bottom right, transparent calc(50% - 0.5px), #C2C2CC calc(50% - 0.5px), #C2C2CC calc(50% + 0.5px), transparent calc(50% + 0.5px)). Today bar 14x2 radius 1 #232329 bottom 3px.
Range machine: no start or complete → start=k,end=null; k<start → start=k; else end=k. Hover preview only when start && !end. Labels: "Jul 12 – 18, 2026", "Jul 12 – Aug 3, 2026", "Select date(s)".

## Tabs
Segmented tray: inline-flex gap 4 padding 4 bg hsl(215,15%,97%) border hsl(210,14%,87%) radius 12. Tab: h32 padding 0 14px radius 8 14px/500 #55555E; hover bg hsl(215,15%,92%) #232329; active bg hsl(210,100%,45%) #FFF text-shadow 0 1px 1px rgba(9,11,11,0.4) shadow inset 0 1px 0 rgba(51,153,255,0.5), inset 0 -1px 0 1px rgba(0,77,153,0.4); focus ring; disabled #ACACB8. transition background/color 120ms.
Underline: flex gap 28 border-bottom hsl(210,14%,87%). Tab: padding 10px 2px 12px; 15px/500 #55555E; hover #232329; active 600 hsl(210,100%,40%); focus ring radius 6; bar h2 radius 1 hsl(210,100%,45%) scaleX 0→1 origin left 0.15s ease-out.

## Table
Container w840 border #E4E4DC radius 14 overflow hidden. Grid 52px 2fr 1.4fr 1fr 1fr 64px. Header bg #F7F7F2 border-bottom #ECECE4; cell border-right #ECECE4 padding 12px 14px 14px/400 #55555E, sortable hover #232329, gap 4, arrows ↑↓. Row bg #FFF hover #F7F7F2, selected hsl(210,100%,96%) (no hover change), border-bottom #ECECE4, transition 120ms. Name cell Plex Mono 14px/500; padding 10px 14px. Date cell Plex Mono 13.5px/400 right. Owner cell gap 8. Action btn 26px radius 6 hover bg #ECECE4 #232329; dots 15px. Avatar 24px #EBEBE5 #3E3E47 10px/600. Badge h24 padding 0 12 pill 13px/500 border. Table checkbox 20 (check 11 sw 3.5, dash 9x2.5). Footer bg #F7F7F2 border-top #ECECE4; Total 15px/600 #1B1B1F padding 12px 14px; value Mono 13.5/500 right.

## Toast
w380 flex gap 10 padding 12px 14px bg #FFF border #E2E2E8 radius 12 shadow popup-shadow. anim toast-in 0.2s ease-out (opacity 0 translateY(12px) scale(0.97)). Icon 20px circle colored, svg 12 stroke #FFF sw 3. Title 14px/600 #1B1B1F; message 13.5px/400 #55555E; gap 2. Close 22px radius 6 #9A9AA5 hover bg hsl(215,15%,92%) #232329, icon 10 sw 2.5. Stack fixed bottom 24 right 24 gap 10. Colors success hsl(145,55%,42%), error hsl(0,72%,51%), warning hsl(38,92%,50%), info hsl(210,100%,45%). Icons: check / × / warning M12 5v9m0 4v.5 / info M12 19v-9m0-4v-.5. TTL 4s.

## Modal
Overlay rgba(20,22,28,0.45) fade 0.15s. Dialog w440 (confirm 400) max-width calc(100vw - 48px); bg #FFF border #E2E2E8 radius 14 shadow 0 16px 48px rgba(24,24,44,0.16), 0 4px 12px rgba(24,24,44,0.06); anim modal-in 0.18s ease-out (translateY(10px) scale(0.97)). Header padding 18px 20px 0; title 17px/600 #1B1B1F; subtitle 13.5px/400 #55555E line-height 1.5; gap 3. Close 26px radius 6 #9A9AA5 hover bg hsl(215,15%,92%), icon 11 sw 2.5. Body padding 18px 20px gap 8. Footer flex end gap 10 padding 14px 20px bg hsl(215,15%,97%) border-top #ECECF0. Cancel = flat secondary (bg #FFF border hsl(210,14%,87%) hover 97%). Destructive icon tile 34px radius 10 bg hsl(0,72%,95%), trash 16 stroke hsl(0,72%,45%) sw 2.2; confirm body gap 12.

## Dropdown menu / Popover
Trigger: secondary button, while open stays in hover look (bg 97%, shadow none), gap 8.
Menu popup: margin-top 6; w220; popup chrome; padding 5. Item: h34 radius 8 gap 10 padding 0 10 14.5px/400 #232329; hover hsl(215,15%,95%); danger color hsl(0,72%,45%) hover bg hsl(0,72%,96%); transition background 100ms. Shortcut 12px/400 #9A9AA5 plain. Icon 15 sw 2 currentColor. Divider 1px #ECECF0 margin 5px 6px.
Popover: margin-top 8; w300; popup chrome; overflow hidden. Body padding 14px 16px gap 6; title 15px/600 #1B1B1F; desc 13.5px/400 #55555E lh 1.5; small badge h20 padding 0 8 11.5px/500; avatar 22px hsl(210,100%,94%)/hsl(210,100%,35%) 10px/600; meta 12.5px #9A9AA5. Footer gap 8 padding 10px 16px bg 97% border-top #ECECF0; compact 32px buttons.

## Accordion
Container w520 border hsl(210,14%,87%) radius 12 bg #FFF. Item border-top hsl(215,15%,94%). Header padding 14px 16px gap 12 hover bg hsl(215,15%,97%) transition 120ms; title 15px/500 (600 open) #1B1B1F; chevron 16 stroke #55555E sw 2.2 rotate 180 0.18s ease-out. Body grid-template-rows 0fr→1fr 0.2s ease-out, inner overflow hidden. Content padding 0 16px 14px 14px/400 #55555E lh 1.55.

## Breadcrumb / Badge / Tag
Breadcrumb: gap 8 14px; link 400 #55555E padding 2px 4px radius 6 hover bg hsl(215,15%,95%) #232329; current 600 #1B1B1F; separator chevron 13 stroke #C2C2CC sw 2.2; ellipsis btn 24px radius 6.
Badge tinted: h24 padding 0 12 pill 13px/500. Neutral #EBEBE5/#3E3E47/#D5D5CB; Info hsl(210,100%,94%)/hsl(210,100%,35%)/hsl(210,80%,84%); Success #DFF2E4/#1F5B32/#A9D8B5; Warning #FBEFC7/#7A5410/#EBD285; Error hsl(0,72%,95%)/hsl(0,72%,40%)/hsl(0,60%,84%). Dot badge: bg #FFF #3E3E47 border hsl(210,14%,87%) gap 6 dot 7px (#9A9AA5, hsl(38,92%,50%), hsl(145,55%,42%), hsl(0,72%,51%)). Small badge h20 padding 0 8 11.5px.
Tag: h26 padding 0 5px 0 10px radius 8 (same colors as chip). Reset btn h26 padding 0 10 radius 8 border 1px dashed hsl(210,14%,80%) 13px/500 #55555E hover hsl(215,15%,95%).

## Gaps (no file): tooltip, alert, sheet, card, avatar standalone, skeleton, pagination, progress, spinner, slider, combobox, number field, form field wrapper, separator, kbd, toggle group, scroll area, etc. Cross-cutting: no loading, no dark, no a11y in prototypes, no exit animations for toast/modal.
