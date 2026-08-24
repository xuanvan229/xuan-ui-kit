"use client"

import { cn } from "@/lib/utils"

type SelectChipProps = React.ComponentProps<"span"> & {
  onRemove: () => void
  removeLabel?: string
}

function SelectChip({
  className,
  children,
  onRemove,
  removeLabel = "Remove",
  ...props
}: SelectChipProps) {
  return (
    <span
      data-slot="select-chip"
      className={cn(
        "inline-flex h-6 items-center gap-[5px] rounded-[7px] border border-accent-line-soft bg-accent-tint-94 pr-1 pl-2 font-sans text-[13px] font-medium text-accent-deep",
        className
      )}
      {...props}
    >
      {children}
      <button
        type="button"
        aria-label={removeLabel}
        data-slot="select-chip-remove"
        className="inline-flex size-4 cursor-pointer items-center justify-center rounded-[5px] transition-control outline-none hover:bg-accent-line-soft focus-visible:focus-ring"
        onPointerDown={(event) => event.stopPropagation()}
        onKeyDown={(event) => event.stopPropagation()}
        onClick={(event) => {
          event.stopPropagation()
          onRemove()
        }}
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
    </span>
  )
}

export { SelectChip }
