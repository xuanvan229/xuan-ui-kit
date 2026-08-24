import { cn } from "@/lib/utils"

function Label({ className, ...props }: React.ComponentProps<"label">) {
  return (
    <label
      data-slot="label"
      className={cn(
        "inline-flex cursor-pointer items-center gap-2.5 font-sans text-[15px] font-normal text-ink select-none has-[[data-disabled]]:cursor-not-allowed has-[[data-disabled]]:text-ink-disabled",
        className
      )}
      {...props}
    />
  )
}

export { Label }
