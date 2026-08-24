"use client"

import * as React from "react"
import { Select as SelectPrimitive } from "@base-ui/react/select"

import { cn } from "@/lib/utils"
import { SelectMultipleContext } from "@/registry/xuan/ui/select/select"

function SelectGroup({ className, ...props }: SelectPrimitive.Group.Props) {
  return (
    <SelectPrimitive.Group
      data-slot="select-group"
      className={cn(className)}
      {...props}
    />
  )
}

function SelectGroupLabel({
  className,
  ...props
}: SelectPrimitive.GroupLabel.Props) {
  return (
    <SelectPrimitive.GroupLabel
      data-slot="select-group-label"
      className={cn(
        "px-2.5 pt-1.5 pb-1 font-sans text-[11px] font-semibold tracking-[0.06em] text-ink-muted uppercase",
        className
      )}
      {...props}
    />
  )
}

function SelectItemCheckbox() {
  return (
    <span
      aria-hidden="true"
      data-slot="select-item-checkbox"
      className="flex size-4 shrink-0 items-center justify-center rounded-[5px] border border-line-input bg-white text-white transition-control group-data-[selected]/item:border-accent-600 group-data-[selected]/item:bg-accent-500"
    >
      <svg
        width="10"
        height="10"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M4.5 12.5l5 5L19.5 6.5"
          className="transition-none [stroke-dasharray:24] [stroke-dashoffset:24] group-data-[selected]/item:transition-[stroke-dashoffset] group-data-[selected]/item:duration-150 group-data-[selected]/item:ease-out group-data-[selected]/item:[stroke-dashoffset:0]"
        />
      </svg>
    </span>
  )
}

function SelectItem({
  className,
  children,
  ...props
}: SelectPrimitive.Item.Props) {
  const multiple = React.useContext(SelectMultipleContext)
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "group/item flex h-[34px] cursor-pointer items-center rounded-lg px-2.5 font-sans text-[14.5px] text-ink transition-[background-color] duration-100 ease-in outline-none select-none data-disabled:cursor-not-allowed data-disabled:text-ink-disabled data-highlighted:bg-fill-menu data-disabled:data-highlighted:bg-transparent",
        multiple
          ? "gap-2.5"
          : "justify-between data-[selected]:font-medium data-[selected]:text-accent-hover",
        className
      )}
      {...props}
    >
      {multiple ? <SelectItemCheckbox /> : null}
      <SelectPrimitive.ItemText className="flex-1 truncate">
        {children}
      </SelectPrimitive.ItemText>
      {multiple ? null : (
        <SelectPrimitive.ItemIndicator className="ml-2 flex shrink-0 items-center text-accent-600">
          <svg
            width="14"
            height="14"
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
        </SelectPrimitive.ItemIndicator>
      )}
    </SelectPrimitive.Item>
  )
}

function SelectSeparator({
  className,
  ...props
}: SelectPrimitive.Separator.Props) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn("mx-1.5 my-[5px] h-px bg-line-hair", className)}
      {...props}
    />
  )
}

export { SelectGroup, SelectGroupLabel, SelectItem, SelectSeparator }
