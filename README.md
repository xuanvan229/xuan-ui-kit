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

## Develop

```bash
pnpm install
pnpm dev              # serves /r/*.json, the item index and /preview (every component + state)
pnpm test             # vitest
pnpm registry:build   # theme.css → registry.json → public/r
```

Design references: `docs/*.dc.html`; exact values: `docs/plans/2026-08-25-ui-kit-values.md`.
