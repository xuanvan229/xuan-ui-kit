"use client"

import { Dialog as DialogPrimitive } from "@base-ui/react/dialog"

import { cn } from "@/lib/utils"

function Dialog(props: DialogPrimitive.Root.Props) {
  return <DialogPrimitive.Root {...props} />
}

function DialogTrigger(props: DialogPrimitive.Trigger.Props) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
}

function DialogClose(props: DialogPrimitive.Close.Props) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />
}

function DialogContent({ className, ...props }: DialogPrimitive.Popup.Props) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Backdrop
        data-slot="dialog-overlay"
        className="fixed inset-0 z-50 bg-overlay transition-opacity duration-150 ease-out data-ending-style:opacity-0 data-starting-style:opacity-0"
      />
      <DialogPrimitive.Popup
        data-slot="dialog-content"
        className={cn(
          "fixed top-1/2 left-1/2 z-50 flex max-h-[calc(100dvh-48px)] w-[440px] max-w-[calc(100vw-48px)] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-xl border border-line-popup bg-surface shadow-modal transition-[opacity,translate,scale] duration-[180ms] ease-out outline-none data-ending-style:translate-y-[calc(-50%+10px)] data-ending-style:scale-[0.97] data-ending-style:opacity-0 data-starting-style:translate-y-[calc(-50%+10px)] data-starting-style:scale-[0.97] data-starting-style:opacity-0",
          className
        )}
        {...props}
      />
    </DialogPrimitive.Portal>
  )
}

function DialogHeader({
  className,
  children,
  showClose = true,
  ...props
}: React.ComponentProps<"div"> & { showClose?: boolean }) {
  return (
    <div
      data-slot="dialog-header"
      className={cn(
        "flex shrink-0 items-start justify-between gap-3 px-5 pt-5",
        className
      )}
      {...props}
    >
      <div className="flex min-w-0 flex-col gap-1">{children}</div>
      {showClose ? (
        <DialogPrimitive.Close
          data-slot="dialog-close"
          aria-label="Close"
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
        </DialogPrimitive.Close>
      ) : null}
    </div>
  )
}

function DialogTitle({ className, ...props }: DialogPrimitive.Title.Props) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn(
        "font-sans text-[17px] font-semibold text-ink-heading",
        className
      )}
      {...props}
    />
  )
}

function DialogDescription({
  className,
  ...props
}: DialogPrimitive.Description.Props) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn(
        "font-sans text-sm leading-normal text-ink-secondary",
        className
      )}
      {...props}
    />
  )
}

function DialogBody({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-body"
      className={cn(
        "flex min-h-0 flex-col gap-2 overflow-y-auto p-5",
        className
      )}
      {...props}
    />
  )
}

function DialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "flex shrink-0 justify-end gap-2 border-t border-line-hair bg-fill-hover px-5 py-4",
        className
      )}
      {...props}
    />
  )
}

function DialogIconTile({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-icon-tile"
      className={cn(
        "flex size-8 shrink-0 items-center justify-center rounded-md bg-error-bg text-error-text [&_svg]:size-4",
        className
      )}
      {...props}
    />
  )
}

export {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogIconTile,
  DialogTitle,
  DialogTrigger,
}
