import { cn } from "@/lib/utils"

function Tag({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="tag"
      className={cn(
        "inline-flex h-[26px] items-center gap-[5px] rounded-md border border-accent-line-soft bg-accent-tint-94 pr-[5px] pl-2.5 font-sans text-[13px] font-medium text-accent-deep",
        className
      )}
      {...props}
    />
  )
}

function TagRemove({ className, ...props }: React.ComponentProps<"button">) {
  return (
    <button
      type="button"
      aria-label="Remove"
      data-slot="tag-remove"
      className={cn(
        "inline-flex size-4 cursor-pointer items-center justify-center rounded-[5px] transition-control outline-none hover:bg-accent-line-soft focus-visible:focus-ring",
        className
      )}
      {...props}
    >
      <svg
        width="9"
        height="9"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        aria-hidden="true"
      >
        <path d="M6 6l12 12M18 6L6 18" />
      </svg>
    </button>
  )
}

function TagReset({ className, ...props }: React.ComponentProps<"button">) {
  return (
    <button
      type="button"
      data-slot="tag-reset"
      className={cn(
        "inline-flex h-[26px] cursor-pointer items-center rounded-md border border-dashed border-line-dashed bg-transparent px-2.5 font-sans text-[13px] font-medium text-ink-secondary transition-control outline-none hover:bg-fill-menu focus-visible:focus-ring",
        className
      )}
      {...props}
    />
  )
}

export { Tag, TagRemove, TagReset }
