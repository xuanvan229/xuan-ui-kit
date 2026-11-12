"use client"

import { toast as sonnerToast, Toaster as SonnerToaster } from "sonner"

import { cn } from "@/lib/utils"

type ToastType = "success" | "error" | "warning" | "info"

type ToastOptions = {
  description?: React.ReactNode
  /** Milliseconds before the toast closes itself. */
  duration?: number
  closeLabel?: string
}

const TOAST_ICON: Record<ToastType, { className: string; path: string }> = {
  success: { className: "bg-success", path: "M4.5 12.5l5 5L19.5 6.5" },
  error: { className: "bg-error", path: "M6 6l12 12M18 6L6 18" },
  warning: { className: "bg-warning", path: "M12 5v9m0 4v.5" },
  info: { className: "bg-accent-500", path: "M12 19v-9m0-4v-.5" },
}

function ToastIcon({ type }: { type: ToastType }) {
  const icon = TOAST_ICON[type]
  return (
    <span
      data-slot="toast-icon"
      data-type={type}
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
  )
}

type ToastCardProps = {
  type: ToastType
  title: React.ReactNode
  description: React.ReactNode
  closeLabel: string
  onClose: () => void
}

function ToastCard({
  type,
  title,
  description,
  closeLabel,
  onClose,
}: ToastCardProps) {
  return (
    <div
      data-slot="toast"
      data-type={type}
      className="flex w-(--width) max-w-full items-start gap-3 rounded-xl border border-line-popup bg-surface px-4 py-3 shadow-toast"
    >
      <ToastIcon type={type} />
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <div
          data-slot="toast-title"
          className="font-sans text-sm font-semibold text-ink-heading"
        >
          {title}
        </div>
        {description == null ? null : (
          <div
            data-slot="toast-description"
            className="font-sans text-sm text-ink-secondary"
          >
            {description}
          </div>
        )}
      </div>
      <button
        type="button"
        data-slot="toast-close"
        aria-label={closeLabel}
        onClick={onClose}
        className="flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-xs text-ink-muted transition-control outline-none hover:bg-fill-active hover:text-ink focus-visible:focus-ring"
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>
    </div>
  )
}

function show(type: ToastType, title: React.ReactNode, options?: ToastOptions) {
  return sonnerToast.custom(
    (id) => (
      <ToastCard
        type={type}
        title={title}
        description={options?.description ?? null}
        closeLabel={options?.closeLabel ?? "Close"}
        onClose={() => sonnerToast.dismiss(id)}
      />
    ),
    options?.duration == null ? {} : { duration: options.duration }
  )
}

const toast = {
  success: (title: React.ReactNode, options?: ToastOptions) =>
    show("success", title, options),
  error: (title: React.ReactNode, options?: ToastOptions) =>
    show("error", title, options),
  warning: (title: React.ReactNode, options?: ToastOptions) =>
    show("warning", title, options),
  info: (title: React.ReactNode, options?: ToastOptions) =>
    show("info", title, options),
  dismiss: (id?: string | number) => sonnerToast.dismiss(id),
}

// note: Sonner reads its toast width from this custom property.
const TOASTER_STYLE = { "--width": "380px" } as React.CSSProperties

function Toaster({
  style,
  ...props
}: React.ComponentProps<typeof SonnerToaster>) {
  return (
    <SonnerToaster
      position="bottom-right"
      offset={24}
      gap={8}
      duration={4000}
      expand
      style={{ ...TOASTER_STYLE, ...style }}
      {...props}
    />
  )
}

export { toast, Toaster }
export type { ToastOptions, ToastType }
