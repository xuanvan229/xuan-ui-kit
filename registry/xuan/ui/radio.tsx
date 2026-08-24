"use client"

import { Radio as RadioPrimitive } from "@base-ui/react/radio"
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group"

import { cn } from "@/lib/utils"

function RadioGroup({ className, ...props }: RadioGroupPrimitive.Props) {
  return (
    <RadioGroupPrimitive
      data-slot="radio-group"
      className={cn("flex flex-col gap-3.5", className)}
      {...props}
    />
  )
}

function Radio({ className, ...props }: RadioPrimitive.Root.Props) {
  return (
    <RadioPrimitive.Root
      data-slot="radio"
      className={cn(
        "peer flex size-5 shrink-0 cursor-pointer items-center justify-center rounded-full border border-line-input bg-white outline-none transition-control focus-visible:focus-ring data-checked:border-accent-600 data-checked:bg-accent-500 data-disabled:cursor-not-allowed data-disabled:border-disabled-line data-disabled:bg-disabled-bg data-disabled:data-checked:border-disabled-fill-line data-disabled:data-checked:bg-disabled-fill",
        className
      )}
      {...props}
    >
      <RadioPrimitive.Indicator
        data-slot="radio-indicator"
        className="size-2 rounded-full bg-white transition-[transform,opacity] duration-[120ms] ease-in data-disabled:bg-ink-muted data-starting-style:scale-[0.4] data-starting-style:opacity-0"
      />
    </RadioPrimitive.Root>
  )
}

export { Radio, RadioGroup }
