"use client"

import { Switch as SwitchPrimitive } from "@base-ui/react/switch"

import { cn } from "@/lib/utils"

function Switch({ className, ...props }: SwitchPrimitive.Root.Props) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "peer relative inline-flex h-[22px] w-9 shrink-0 cursor-pointer rounded-full border border-switch-off-line bg-switch-off transition-control outline-none focus-visible:focus-ring data-checked:border-accent-600 data-checked:bg-accent-500 data-disabled:cursor-not-allowed data-disabled:border-disabled-line data-disabled:bg-disabled-bg",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className="absolute top-0.5 left-0.5 block size-4 rounded-full bg-on-accent shadow-(--knob-shadow) transition-[left] duration-150 ease-out data-checked:left-4 data-disabled:bg-disabled-fill data-disabled:shadow-none"
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
