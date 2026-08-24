"use client"

import { Separator as SeparatorPrimitive } from "@base-ui/react/separator"

import { cn } from "@/lib/utils"

function Separator({
  className,
  orientation = "horizontal",
  variant = "default",
  ...props
}: SeparatorPrimitive.Props & { variant?: "default" | "popup" }) {
  return (
    <SeparatorPrimitive
      data-slot="separator"
      data-variant={variant}
      orientation={orientation}
      className={cn(
        "shrink-0 bg-line-hair data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-px data-[orientation=vertical]:self-stretch",
        variant === "popup" &&
          "mx-1.5 my-[5px] data-[orientation=horizontal]:w-auto",
        className
      )}
      {...props}
    />
  )
}

export { Separator }
