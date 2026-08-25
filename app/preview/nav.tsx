import { PreviewTheme } from "@/app/preview/theme"

const PREVIEW_SECTIONS = [
  { id: "button", label: "Button" },
  { id: "input", label: "Input" },
  { id: "switch", label: "Switch & Textarea" },
  { id: "checkbox", label: "Checkbox & Radio" },
  { id: "select", label: "Select" },
  { id: "date", label: "Date picker" },
  { id: "tabs", label: "Tabs" },
  { id: "table", label: "Table" },
  { id: "toast", label: "Toast" },
  { id: "dialog", label: "Dialog" },
  { id: "menu", label: "Menu & Popover" },
  { id: "accordion", label: "Accordion" },
  { id: "badge", label: "Breadcrumb, Badge & Tag" },
] as const

function PreviewNav() {
  return (
    <nav
      aria-label="Components"
      className="sticky top-0 hidden h-screen w-56 shrink-0 flex-col gap-3 overflow-y-auto border-r border-line-hair px-6 py-12 lg:flex"
    >
      <PreviewTheme />
      <span className="text-[11px] font-semibold tracking-[0.12em] text-ink-muted uppercase">
        Components
      </span>
      <ul className="flex flex-col gap-0.5">
        {PREVIEW_SECTIONS.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              className="block rounded-md px-2 py-1.5 text-sm text-ink-secondary transition-control outline-none hover:bg-fill-menu hover:text-ink focus-visible:focus-ring"
            >
              {section.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export { PreviewNav }
