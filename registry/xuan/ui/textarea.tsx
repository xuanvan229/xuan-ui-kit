import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "w-full min-w-0 resize-y rounded-[10px] border border-line-control bg-white px-3 py-2.5 font-sans text-[15px] leading-[1.45] font-normal text-ink outline-none transition-control placeholder:text-ink-muted hover:border-line-input-hover focus-visible:border-accent-600 focus-visible:focus-ring aria-invalid:border-error aria-invalid:focus-ring-error aria-invalid:focus-visible:focus-ring-error disabled:cursor-not-allowed disabled:resize-none disabled:border-disabled-line disabled:bg-disabled-bg disabled:text-ink-disabled",
        className
      )}
      {...props}
    />
  )
}

type TextareaCounterProps = React.ComponentProps<"span"> & { count: number; max: number }

function TextareaCounter({ count, max, className, ...props }: TextareaCounterProps) {
  return (
    <span
      data-slot="textarea-counter"
      data-over={count > max ? "true" : null}
      className={cn("font-sans text-xs font-medium text-ink-muted data-over:text-error-text", className)}
      {...props}
    >
      {count} / {max}
    </span>
  )
}

export { Textarea, TextareaCounter }
