"use client"

import { Dialog as DialogPrimitive } from "@base-ui/react/dialog"

import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/registry/xuan/ui/dialog"

const SHEET_SIDE = {
  right:
    "right-0 border-l data-ending-style:translate-x-full data-starting-style:translate-x-full",
  left: "left-0 border-r data-ending-style:-translate-x-full data-starting-style:-translate-x-full",
} as const

type SheetContentProps = DialogPrimitive.Popup.Props & {
  side?: keyof typeof SHEET_SIDE
}

function SheetContent({
  className,
  side = "right",
  ...props
}: SheetContentProps) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Backdrop
        data-slot="sheet-overlay"
        className="fixed inset-0 z-50 bg-overlay transition-opacity duration-200 ease-out data-ending-style:opacity-0 data-starting-style:opacity-0"
      />
      <DialogPrimitive.Popup
        data-slot="sheet-content"
        data-side={side}
        className={cn(
          "fixed inset-y-0 z-50 flex w-[400px] max-w-[calc(100vw-48px)] flex-col overflow-hidden border-line-popup bg-surface shadow-modal transition-[translate] duration-200 ease-out outline-none",
          SHEET_SIDE[side],
          className
        )}
        {...props}
      />
    </DialogPrimitive.Portal>
  )
}

function SheetBody({
  className,
  ...props
}: React.ComponentProps<typeof DialogBody>) {
  return <DialogBody className={cn("flex-1", className)} {...props} />
}

export {
  Dialog as Sheet,
  DialogClose as SheetClose,
  DialogDescription as SheetDescription,
  DialogFooter as SheetFooter,
  DialogHeader as SheetHeader,
  DialogTitle as SheetTitle,
  DialogTrigger as SheetTrigger,
  SheetBody,
  SheetContent,
}
