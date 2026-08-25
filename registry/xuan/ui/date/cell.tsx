import { cn } from "@/lib/utils"

type DateCellProps = {
  day: number
  date: Date
  selected: boolean
  band: boolean
  today: boolean
  outside: boolean
  disabled: boolean
  hidden: boolean
  corner: "bl" | "br" | null
  previewDelay: number
  onSelect: () => void
  onHover: () => void
}

function DateCell({
  day,
  date,
  selected,
  band,
  today,
  outside,
  disabled,
  hidden,
  corner,
  previewDelay,
  onSelect,
  onHover,
}: DateCellProps) {
  if (hidden)
    return (
      <div
        data-slot="date-cell"
        data-hidden="true"
        aria-hidden="true"
        className={cn(
          "h-[46px] bg-surface",
          corner === "bl" && "rounded-bl-[11px]",
          corner === "br" && "rounded-br-[11px]"
        )}
      />
    )

  const label = date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  })

  return (
    <button
      type="button"
      disabled={disabled}
      data-slot="date-cell"
      data-selected={selected ? "true" : null}
      aria-label={label}
      aria-pressed={selected}
      className={cn(
        "relative flex h-[46px] cursor-pointer items-center justify-center font-sans text-[15px] font-medium text-ink transition-[background-color] duration-[180ms] outline-none focus-visible:z-10 focus-visible:[outline:3px_solid_var(--focus-ring)] focus-visible:-outline-offset-[3px] disabled:cursor-not-allowed disabled:strike-diagonal disabled:text-calendar-disabled",
        selected
          ? "bg-calendar-selected font-bold text-calendar-selected-ink"
          : band
            ? "bg-calendar-band"
            : "bg-surface",
        outside && !selected && "text-calendar-outside",
        corner === "bl" && "rounded-bl-[11px]",
        corner === "br" && "rounded-br-[11px]"
      )}
      style={{ transitionDelay: `${previewDelay}ms` }}
      onClick={onSelect}
      onMouseEnter={onHover}
    >
      {day}
      {today && !selected ? (
        <span
          data-slot="date-today"
          className="absolute bottom-[3px] left-1/2 h-0.5 w-3.5 -translate-x-1/2 rounded-[1px] bg-calendar-today"
        />
      ) : null}
    </button>
  )
}

export { DateCell }
