"use client"

import { Combobox as ComboboxPrimitive } from "@base-ui/react/combobox"

import { cn } from "@/lib/utils"

const Combobox = ComboboxPrimitive.Root

function ComboboxInput({ className, ...props }: ComboboxPrimitive.Input.Props) {
  return (
    <div data-slot="combobox-control" className="relative flex w-full">
      <ComboboxPrimitive.Input
        data-slot="combobox-input"
        className={cn(
          "control w-full min-w-0 border border-line-input bg-surface pr-10 font-sans font-normal text-ink inset-input transition-control outline-none placeholder:text-ink-muted hover:border-line-input-hover focus-visible:border-accent-600 focus-visible:focus-ring disabled:cursor-not-allowed disabled:border-disabled-line disabled:bg-disabled-bg disabled:text-ink-disabled disabled:shadow-flat aria-invalid:border-error aria-invalid:focus-visible:focus-ring-error",
          className
        )}
        {...props}
      />
      <ComboboxPrimitive.Trigger
        data-slot="combobox-trigger"
        tabIndex={-1}
        className="absolute top-1/2 right-2 flex size-6 -translate-y-1/2 cursor-pointer items-center justify-center rounded-xs text-ink-secondary transition-control outline-none hover:bg-fill-active hover:text-ink data-disabled:cursor-not-allowed data-disabled:text-ink-disabled"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M6.5 9.5L12 15l5.5-5.5" />
        </svg>
      </ComboboxPrimitive.Trigger>
    </div>
  )
}

type ComboboxContentProps = Omit<ComboboxPrimitive.Popup.Props, "children"> &
  Pick<ComboboxPrimitive.Positioner.Props, "side" | "sideOffset" | "align"> & {
    children: ComboboxPrimitive.List.Props["children"]
    /** Shown when no item matches the query. */
    empty?: React.ReactNode
  }

function ComboboxContent({
  className,
  children,
  empty = "No results",
  side = "bottom",
  sideOffset = 8,
  align = "start",
  ...props
}: ComboboxContentProps) {
  return (
    <ComboboxPrimitive.Portal>
      <ComboboxPrimitive.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        className="isolate z-50"
      >
        <ComboboxPrimitive.Popup
          data-slot="combobox-content"
          className={cn(
            "max-h-(--available-height) w-(--anchor-width) min-w-40 origin-(--transform-origin) overflow-y-auto popup p-1 transition-[opacity,transform] duration-100 outline-none data-ending-style:opacity-0 data-starting-style:scale-[0.98] data-starting-style:opacity-0",
            className
          )}
          {...props}
        >
          <ComboboxPrimitive.Empty
            data-slot="combobox-empty"
            className="px-2 py-2 font-sans text-sm text-ink-muted empty:hidden"
          >
            {empty}
          </ComboboxPrimitive.Empty>
          <ComboboxPrimitive.List data-slot="combobox-list">
            {children}
          </ComboboxPrimitive.List>
        </ComboboxPrimitive.Popup>
      </ComboboxPrimitive.Positioner>
    </ComboboxPrimitive.Portal>
  )
}

function ComboboxItem({
  className,
  children,
  ...props
}: ComboboxPrimitive.Item.Props) {
  return (
    <ComboboxPrimitive.Item
      data-slot="combobox-item"
      className={cn(
        "flex h-8 cursor-pointer items-center justify-between gap-2 rounded-md px-2 font-sans text-sm text-ink transition-[background-color] duration-100 ease-in outline-none select-none data-disabled:cursor-not-allowed data-disabled:text-ink-disabled data-highlighted:bg-fill-menu data-disabled:data-highlighted:bg-transparent data-[selected]:font-medium data-[selected]:text-accent-selected",
        className
      )}
      {...props}
    >
      <span className="flex-1 truncate">{children}</span>
      <ComboboxPrimitive.ItemIndicator className="flex shrink-0 items-center text-accent-600">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M4.5 12.5l5 5L19.5 6.5" />
        </svg>
      </ComboboxPrimitive.ItemIndicator>
    </ComboboxPrimitive.Item>
  )
}

export { Combobox, ComboboxContent, ComboboxInput, ComboboxItem }
