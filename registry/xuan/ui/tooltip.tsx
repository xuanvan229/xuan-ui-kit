"use client"

import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip"

import { cn } from "@/lib/utils"

function TooltipProvider(props: TooltipPrimitive.Provider.Props) {
  return <TooltipPrimitive.Provider {...props} />
}

function Tooltip(props: TooltipPrimitive.Root.Props) {
  return <TooltipPrimitive.Root {...props} />
}

function TooltipTrigger({
  delay = 400,
  ...props
}: TooltipPrimitive.Trigger.Props) {
  return (
    <TooltipPrimitive.Trigger
      data-slot="tooltip-trigger"
      delay={delay}
      {...props}
    />
  )
}

type TooltipContentProps = TooltipPrimitive.Popup.Props &
  Pick<TooltipPrimitive.Positioner.Props, "side" | "sideOffset" | "align">

function TooltipContent({
  className,
  children,
  side = "top",
  sideOffset = 8,
  align = "center",
  ...props
}: TooltipContentProps) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        className="isolate z-50"
      >
        <TooltipPrimitive.Popup
          data-slot="tooltip-content"
          className={cn(
            "max-w-64 origin-(--transform-origin) rounded-xs bg-tooltip px-2 py-1 font-sans text-xs font-medium text-tooltip-ink transition-[opacity,transform] duration-100 data-ending-style:opacity-0 data-starting-style:scale-[0.98] data-starting-style:opacity-0",
            className
          )}
          {...props}
        >
          {children}
          <TooltipPrimitive.Arrow
            data-slot="tooltip-arrow"
            className="text-tooltip data-[side=bottom]:-top-1 data-[side=bottom]:rotate-180 data-[side=left]:-right-1.5 data-[side=left]:-rotate-90 data-[side=right]:-left-1.5 data-[side=right]:rotate-90 data-[side=top]:-bottom-1"
          >
            <svg
              width="8"
              height="4"
              viewBox="0 0 8 4"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M0 0h8L4 4z" />
            </svg>
          </TooltipPrimitive.Arrow>
        </TooltipPrimitive.Popup>
      </TooltipPrimitive.Positioner>
    </TooltipPrimitive.Portal>
  )
}

export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger }
