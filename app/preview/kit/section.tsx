import { cn } from "@/lib/utils"

type SectionProps = React.ComponentProps<"section"> & {
  id: string
  label: string
}

function PreviewKitSection({
  id,
  label,
  children,
  className,
  ...props
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn("flex scroll-mt-12 flex-col gap-8", className)}
      {...props}
    >
      <h2 className="text-[11px] font-semibold tracking-[0.12em] text-ink-muted uppercase">
        {label}
      </h2>
      {children}
    </section>
  )
}

type GroupProps = React.ComponentProps<"div"> & { label: string }

function PreviewKitGroup({ label, children, className, ...props }: GroupProps) {
  return (
    <div className="flex flex-col gap-4" {...props}>
      <h3 className="text-xs font-medium text-ink-secondary">{label}</h3>
      <div className={cn("flex flex-wrap items-start gap-10", className)}>
        {children}
      </div>
    </div>
  )
}

type StateProps = React.ComponentProps<"div"> & { caption: string }

function PreviewKitState({
  caption,
  children,
  className,
  ...props
}: StateProps) {
  return (
    <div
      className={cn("flex flex-col items-start gap-3", className)}
      {...props}
    >
      {children}
      <span className="text-xs font-medium text-ink-muted">{caption}</span>
    </div>
  )
}

export { PreviewKitGroup, PreviewKitSection, PreviewKitState }
