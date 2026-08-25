# xuan-ui-kit

Design-system components on Base UI + Tailwind v4, published as a shadcn registry.

## Use in a project

```bash
pnpm dlx shadcn@latest init -t next -b base           # once, if the project is new
pnpm dlx shadcn@latest registry add "@xuan=https://xuan-ui-kit.vercel.app/r/{name}.json"
pnpm dlx shadcn@latest add @xuan/xuan                 # tokens, fonts, utilities — install first
pnpm dlx shadcn@latest add @xuan/button @xuan/select  # any component
```

Wrap the app root in a `<div className="isolate">` (Base UI portals) and mount `<Toaster>` once.

## Dark mode

The kit ships both light and dark tokens — installing `@xuan/xuan` writes a `.dark { … }`
block into the consumer's `globals.css` alongside the light `:root` tokens. The app owns the
switch: add the `dark` class to `<html>` to render the dark theme, e.g. with
[`next-themes`](https://github.com/pacocoursey/next-themes) using `attribute="class"`. This
repo's own `/preview` page has a light/dark toggle for browsing every component in both themes.

## Develop

```bash
pnpm install
pnpm dev              # serves /r/*.json, the item index and /preview (every component + state)
pnpm test             # vitest
pnpm registry:build   # theme.css → registry.json → public/r
```

Design references: `docs/*.dc.html`; exact values: `docs/plans/2026-08-25-ui-kit-values.md`.
