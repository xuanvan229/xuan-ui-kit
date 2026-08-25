import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border font-sans font-medium whitespace-nowrap",
  {
    variants: {
      variant: {
        neutral: "border-neutral-line bg-neutral-bg text-neutral-text",
        info: "border-accent-line-badge bg-accent-tint-94 text-accent-deep",
        success: "border-success-line bg-success-bg text-success-text",
        warning: "border-warning-line bg-warning-bg text-warning-text",
        error: "border-error-line bg-error-bg text-error-badge-text",
        outline: "border-line-control bg-surface text-ink-subtle",
      },
      size: {
        default: "h-6 px-3 text-[13px]",
        sm: "h-5 px-2 text-[11.5px]",
      },
    },
    defaultVariants: { variant: "neutral", size: "default" },
  }
)

type BadgeProps = React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants>

function Badge({
  className,
  variant = "neutral",
  size = "default",
  ...props
}: BadgeProps) {
  return (
    <span
      data-slot="badge"
      data-variant={variant}
      data-size={size}
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  )
}

const DOT_TONE = {
  neutral: "bg-ink-muted",
  warning: "bg-warning",
  success: "bg-success",
  error: "bg-error",
} as const

function BadgeDot({
  tone = "neutral",
  className,
}: {
  tone?: keyof typeof DOT_TONE
  className?: string
}) {
  return (
    <span
      data-slot="badge-dot"
      data-tone={tone}
      aria-hidden="true"
      className={cn(
        "size-[7px] shrink-0 rounded-full",
        DOT_TONE[tone],
        className
      )}
    />
  )
}

export { Badge, BadgeDot }
