"use client"

import { Input as InputPrimitive } from "@base-ui/react/input"

import { cn } from "@/lib/utils"

function Input({ className, ...props }: InputPrimitive.Props) {
  return (
    <InputPrimitive
      data-slot="input"
      className={cn(
        "control w-full min-w-0 border border-line-input bg-white font-sans font-normal text-ink inset-input outline-none transition-control placeholder:text-ink-muted hover:border-line-input-hover focus-visible:border-accent-600 focus-visible:focus-ring aria-invalid:border-error aria-invalid:focus-ring-error aria-invalid:focus-visible:focus-ring-error data-invalid:border-error data-invalid:focus-ring-error disabled:cursor-not-allowed disabled:border-disabled-line disabled:bg-disabled-bg disabled:text-ink-disabled disabled:shadow-flat",
        className
      )}
      {...props}
    />
  )
}

function InputGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-group"
      className={cn(
        "relative flex w-full items-center has-[[data-slot=input-prefix]]:[&_[data-slot=input]]:pl-9 has-[[data-slot=input-suffix]]:[&_[data-slot=input]]:pr-11",
        className
      )}
      {...props}
    />
  )
}

function InputPrefix({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="input-prefix"
      className={cn(
        "pointer-events-none absolute left-3 flex items-center text-ink-muted [&_svg]:size-4",
        className
      )}
      {...props}
    />
  )
}

function InputSuffix({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="input-suffix"
      className={cn(
        "pointer-events-none absolute right-3 font-sans text-[13px] font-medium text-ink-muted",
        className
      )}
      {...props}
    />
  )
}

export { Input, InputGroup, InputPrefix, InputSuffix }
