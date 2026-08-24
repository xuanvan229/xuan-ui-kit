"use client"

import * as React from "react"
import { Select as SelectPrimitive } from "@base-ui/react/select"

import { cn } from "@/lib/utils"

const SelectMultipleContext = React.createContext(false)

function Select<Value, Multiple extends boolean | undefined = false>(
  props: SelectPrimitive.Root.Props<Value, Multiple>
) {
  return (
    <SelectMultipleContext.Provider value={Boolean(props.multiple)}>
      <SelectPrimitive.Root {...props} />
    </SelectMultipleContext.Provider>
  )
}

function SelectTrigger({
  className,
  children,
  ...props
}: SelectPrimitive.Trigger.Props) {
  const multiple = React.useContext(SelectMultipleContext)
  const multipleProps = multiple ? { render: <div />, nativeButton: false } : {}
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-multiple={multiple ? "true" : null}
      className={cn(
        "group/trigger flex w-full cursor-pointer items-center justify-between gap-2 rounded-[10px] border border-line-control bg-white px-3 font-sans text-[15px] text-ink-strong transition-control outline-none select-none not-data-popup-open:hover:bg-fill-hover focus-visible:border-accent-600 focus-visible:focus-ring aria-invalid:border-error aria-invalid:focus-ring-error data-disabled:cursor-not-allowed data-disabled:border-disabled-line data-disabled:bg-disabled-bg data-disabled:text-ink-disabled data-popup-open:border-accent-600 data-popup-open:focus-ring",
        multiple ? "min-h-10 py-[7px]" : "h-10 pt-2 pb-2.5",
        className
      )}
      {...multipleProps}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon className="shrink-0 text-ink-secondary transition-transform duration-150 ease-out group-data-disabled/trigger:text-ink-disabled group-data-popup-open/trigger:rotate-180">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M6.5 9.5L12 15l5.5-5.5" />
        </svg>
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
}

function SelectValue({ className, ...props }: SelectPrimitive.Value.Props) {
  return (
    <SelectPrimitive.Value
      data-slot="select-value"
      className={cn(
        "flex min-w-0 flex-1 flex-wrap items-center gap-1.5 text-left data-placeholder:text-ink-muted",
        className
      )}
      {...props}
    />
  )
}

type SelectContentProps = SelectPrimitive.Popup.Props &
  Pick<SelectPrimitive.Positioner.Props, "side" | "sideOffset" | "align">

function SelectContent({
  className,
  children,
  side = "bottom",
  sideOffset = 6,
  align = "start",
  ...props
}: SelectContentProps) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignItemWithTrigger={false}
        className="isolate z-50"
      >
        <SelectPrimitive.Popup
          data-slot="select-content"
          className={cn(
            "max-h-(--available-height) w-(--anchor-width) min-w-40 origin-(--transform-origin) overflow-y-auto popup p-[5px] transition-[opacity,transform] duration-100 outline-none data-ending-style:opacity-0 data-starting-style:scale-[0.98] data-starting-style:opacity-0",
            className
          )}
          {...props}
        >
          <SelectPrimitive.List>{children}</SelectPrimitive.List>
        </SelectPrimitive.Popup>
      </SelectPrimitive.Positioner>
    </SelectPrimitive.Portal>
  )
}

export {
  Select,
  SelectContent,
  SelectMultipleContext,
  SelectTrigger,
  SelectValue,
}
