import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const alertVariants = cva(
  "flex items-start gap-3 rounded-md border px-4 py-3 font-sans",
  {
    variants: {
      variant: {
        info: "border-accent-line-soft bg-accent-tint-96",
        success: "border-success-line bg-success-bg",
        warning: "border-warning-line bg-warning-bg",
        error: "border-error-line bg-error-bg",
      },
    },
    defaultVariants: { variant: "info" },
  }
)

type AlertVariant = NonNullable<VariantProps<typeof alertVariants>["variant"]>

const ALERT_ICON: Record<AlertVariant, { className: string; path: string }> = {
  info: { className: "bg-accent-500", path: "M12 19v-9m0-4v-.5" },
  success: { className: "bg-success", path: "M4.5 12.5l5 5L19.5 6.5" },
  warning: { className: "bg-warning", path: "M12 5v9m0 4v.5" },
  error: { className: "bg-error", path: "M6 6l12 12M18 6L6 18" },
}

type AlertProps = React.ComponentProps<"div"> & { variant?: AlertVariant }

function Alert({
  className,
  variant = "info",
  children,
  ...props
}: AlertProps) {
  const icon = ALERT_ICON[variant]
  return (
    <div
      data-slot="alert"
      data-variant={variant}
      // note: errors and warnings interrupt; info and success wait their turn.
      role={variant === "error" || variant === "warning" ? "alert" : "status"}
      className={cn(alertVariants({ variant }), className)}
      {...props}
    >
      <span
        data-slot="alert-icon"
        data-variant={variant}
        className={cn(
          "flex size-5 shrink-0 items-center justify-center rounded-full text-on-accent",
          icon.className
        )}
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d={icon.path} />
        </svg>
      </span>
      <div className="flex min-w-0 flex-1 flex-col gap-1">{children}</div>
    </div>
  )
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn("text-sm font-semibold text-ink-heading", className)}
      {...props}
    />
  )
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn("text-sm text-ink-secondary", className)}
      {...props}
    />
  )
}

export { Alert, AlertDescription, AlertTitle }
