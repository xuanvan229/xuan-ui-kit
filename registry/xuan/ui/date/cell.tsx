import { cn } from "@/lib/utils"

type DateCellProps = {
  day: number
  selected: boolean
  band: boolean
  today: boolean
  outside: boolean
  disabled: boolean
  corner: "bl" | "br" | null
  previewDelay: number
  onSelect: () => void
  onHover: () => void
}

function DateCell({
  day,
  selected,
  band,
  today,
  outside,
  disabled,
  corner,
  previewDelay,
  onSelect,
  onHover,
}: DateCellProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      data-slot="date-cell"
      data-selected={selected ? "true" : null}
      className={cn(
        "relative flex h-[46px] cursor-pointer items-center justify-center font-sans text-[15px] font-medium text-ink transition-[background-color] duration-[180ms] outline-none focus-visible:z-10 focus-visible:[outline:3px_solid_var(--focus-ring)] focus-visible:-outline-offset-[3px] disabled:cursor-not-allowed disabled:strike-diagonal disabled:text-calendar-disabled",
        selected
          ? "bg-calendar-selected font-bold text-white"
          : band
            ? "bg-calendar-band"
            : "bg-white",
        outside && !selected && "text-calendar-outside",
        corner === "bl" && "rounded-bl-[11px]",
        corner === "br" && "rounded-br-[11px]"
      )}
      style={{ transitionDelay: `${previewDelay}ms` }}
      onClick={onSelect}
      onMouseEnter={onHover}
    >
      {day === 0 ? "" : day}
      {today && !selected ? (
        <span
          data-slot="date-today"
          className="absolute bottom-[3px] left-1/2 h-0.5 w-3.5 -translate-x-1/2 rounded-[1px] bg-ink"
        />
      ) : null}
    </button>
  )
}

export { DateCell }
