"use client"

import { Switch as SwitchPrimitive } from "@base-ui/react/switch"

import { cn } from "@/lib/utils"

function Switch({ className, ...props }: SwitchPrimitive.Root.Props) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "peer relative inline-flex h-6 w-10 shrink-0 cursor-pointer rounded-full bg-switch-off inset-ring inset-ring-switch-off-line transition-control outline-none focus-visible:focus-ring data-checked:bg-accent-500 data-checked:inset-ring-accent-600 data-disabled:cursor-not-allowed data-disabled:bg-disabled-bg data-disabled:inset-ring-disabled-line",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className="absolute top-0.5 left-0.5 block size-5 rounded-full bg-on-accent shadow-(--knob-shadow) transition-[translate] duration-150 ease-out data-checked:translate-x-4 data-disabled:bg-disabled-fill data-disabled:shadow-none"
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
