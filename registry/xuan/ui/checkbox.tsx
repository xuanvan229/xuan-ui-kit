"use client"

import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox"

import { cn } from "@/lib/utils"

type CheckboxProps = CheckboxPrimitive.Root.Props & { size?: "default" | "sm" }

function Checkbox({ className, size = "default", ...props }: CheckboxProps) {
  const iconSize = size === "default" ? 12 : 10
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      data-size={size}
      className={cn(
        "peer flex shrink-0 cursor-pointer items-center justify-center border border-line-input bg-white outline-none transition-control focus-visible:focus-ring data-checked:border-accent-600 data-checked:bg-accent-500 data-indeterminate:border-accent-600 data-indeterminate:bg-accent-500 data-disabled:cursor-not-allowed data-disabled:border-disabled-line data-disabled:bg-disabled-bg data-disabled:data-checked:border-disabled-fill-line data-disabled:data-checked:bg-disabled-fill data-disabled:data-indeterminate:border-disabled-fill-line data-disabled:data-indeterminate:bg-disabled-fill",
        size === "default" ? "size-5 rounded-md" : "size-4 rounded-[5px]",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="group/indicator flex items-center justify-center text-white data-disabled:text-ink-muted"
      >
        <svg
          width={iconSize}
          height={iconSize}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="group-data-indeterminate/indicator:hidden"
        >
          <path
            d="M4.5 12.5l5 5L19.5 6.5"
            className="[stroke-dasharray:24] [stroke-dashoffset:0] transition-[stroke-dashoffset] duration-150 ease-out group-data-starting-style/indicator:[stroke-dashoffset:24]"
          />
        </svg>
        <span
          data-slot="checkbox-dash"
          className={cn(
            "hidden rounded-[2px] bg-current group-data-indeterminate/indicator:block",
            size === "default" ? "h-[2.5px] w-2.5" : "h-0.5 w-2"
          )}
        />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
