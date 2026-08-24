import registry from "@/registry.json"

// note: Next.js App Router requires a default export for page files.
export default function HomePage() {
  return (
    <main className="mx-auto flex max-w-2xl flex-col gap-6 p-10 font-sans text-ink">
      <h1 className="text-2xl font-semibold text-ink-heading">@xuan registry</h1>
      <pre className="rounded-xl border border-line-popup bg-fill-hover p-4 text-sm">
        {`pnpm dlx shadcn@latest registry add @xuan=https://xuan-ui-kit.vercel.app/r/{name}.json\npnpm dlx shadcn@latest add @xuan/xuan @xuan/button`}
      </pre>
      <ul className="flex flex-col gap-1 text-sm">
        {registry.items.map((item) => (
          <li key={item.name} className="flex justify-between">
            <span className="font-medium">{item.name}</span>
            <span className="text-ink-muted">{item.type}</span>
          </li>
        ))}
      </ul>
    </main>
  )
}
