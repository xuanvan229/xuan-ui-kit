"use client"

import { Toast as ToastPrimitive } from "@base-ui/react/toast"

import { cn } from "@/lib/utils"

const toast = ToastPrimitive.createToastManager()
const useToastManager = ToastPrimitive.useToastManager

type ToastType = "success" | "error" | "warning" | "info"

const TOAST_ICON: Record<ToastType, { className: string; path: string }> = {
  success: { className: "bg-success", path: "M4.5 12.5l5 5L19.5 6.5" },
  error: { className: "bg-error", path: "M6 6l12 12M18 6L6 18" },
  warning: { className: "bg-warning", path: "M12 5v9m0 4v.5" },
  info: { className: "bg-accent-500", path: "M12 19v-9m0-4v-.5" },
}

function isToastType(type: string | undefined): type is ToastType {
  return type !== undefined && type in TOAST_ICON
}

function ToastIcon({ type }: { type: ToastType }) {
  const icon = TOAST_ICON[type]
  return (
    <span
      data-slot="toast-icon"
      data-type={type}
      className={cn(
        "mt-px flex size-5 shrink-0 items-center justify-center rounded-full text-white",
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

function ToastList() {
  const { toasts } = useToastManager()
  return toasts.map((item) => (
    <ToastPrimitive.Root
      key={item.id}
      toast={item}
      data-slot="toast"
      className="flex w-[380px] items-start gap-2.5 rounded-xl border border-line-popup bg-white px-3.5 py-3 shadow-toast transition-[translate,scale,opacity] duration-200 ease-out data-ending-style:translate-y-3 data-ending-style:opacity-0 data-starting-style:translate-y-3 data-starting-style:scale-[0.97] data-starting-style:opacity-0"
    >
      {isToastType(item.type) ? <ToastIcon type={item.type} /> : null}
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <ToastPrimitive.Title
          data-slot="toast-title"
          className="font-sans text-sm font-semibold text-ink-heading"
        />
        <ToastPrimitive.Description
          data-slot="toast-description"
          className="font-sans text-[13.5px] text-ink-secondary"
        />
      </div>
      <ToastPrimitive.Close
        data-slot="toast-close"
        aria-label="Close"
        className="flex size-[22px] shrink-0 cursor-pointer items-center justify-center rounded-sm text-ink-muted transition-control outline-none hover:bg-fill-active hover:text-ink focus-visible:focus-ring"
      >
        <svg
          width="10"
          height="10"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </ToastPrimitive.Close>
    </ToastPrimitive.Root>
  ))
}

function Toaster({
  children,
  toastManager = toast,
  timeout = 4000,
  ...props
}: ToastPrimitive.Provider.Props) {
  return (
    <ToastPrimitive.Provider
      toastManager={toastManager}
      timeout={timeout}
      {...props}
    >
      {children}
      <ToastPrimitive.Portal>
        <ToastPrimitive.Viewport
          data-slot="toast-viewport"
          className="fixed right-6 bottom-6 z-50 flex flex-col-reverse gap-2.5 outline-none"
        >
          <ToastList />
        </ToastPrimitive.Viewport>
      </ToastPrimitive.Portal>
    </ToastPrimitive.Provider>
  )
}

export { toast, Toaster, useToastManager }
