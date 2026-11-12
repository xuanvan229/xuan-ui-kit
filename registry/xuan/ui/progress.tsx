"use client"

import { Progress as ProgressPrimitive } from "@base-ui/react/progress"

import { cn } from "@/lib/utils"

type ProgressProps = Omit<ProgressPrimitive.Root.Props, "children"> & {
  label?: React.ReactNode
  /** Shows the formatted value next to the label. */
  showValue?: boolean
}

function Progress({
  className,
  label = null,
  showValue = false,
  ...props
}: ProgressProps) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn("flex w-full flex-col gap-2 font-sans", className)}
      {...props}
    >
      {label === null && !showValue ? null : (
        <div className="flex items-baseline justify-between gap-3">
          {label === null ? (
            <span />
          ) : (
            <ProgressPrimitive.Label
              data-slot="progress-label"
              className="text-sm font-medium text-ink"
            >
              {label}
            </ProgressPrimitive.Label>
          )}
          {showValue ? (
            <ProgressPrimitive.Value
              data-slot="progress-value"
              className="text-xs font-medium text-ink-secondary"
            />
          ) : null}
        </div>
      )}
      <ProgressPrimitive.Track
        data-slot="progress-track"
        className="h-2 overflow-hidden rounded-full bg-fill-active"
      >
        <ProgressPrimitive.Indicator
          data-slot="progress-indicator"
          className="h-full rounded-full bg-accent-500 transition-[width] duration-200 ease-out data-indeterminate:w-1/3 data-indeterminate:animate-progress motion-reduce:data-indeterminate:animate-none"
        />
      </ProgressPrimitive.Track>
    </ProgressPrimitive.Root>
  )
}

export { Progress }
