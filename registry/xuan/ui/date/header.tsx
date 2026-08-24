type DateHeaderProps = {
  year: number
  month: number
  onPrevious: () => void
  onNext: () => void
  onToday: () => void
}

const NAV_BUTTON =
  "flex size-8 cursor-pointer items-center justify-center rounded-md text-ink outline-none transition-control hover:bg-calendar-nav focus-visible:focus-ring"

function DateHeader({
  year,
  month,
  onPrevious,
  onNext,
  onToday,
}: DateHeaderProps) {
  const monthName = new Date(year, month, 1).toLocaleString("en-US", {
    month: "long",
  })
  return (
    <div
      data-slot="date-header"
      className="mb-3.5 flex items-center justify-between px-1"
    >
      <div className="flex items-baseline gap-2 font-sans text-[22px]">
        <span className="font-bold text-ink-heading">{monthName}</span>
        <span className="font-normal text-ink-subtle">{year}</span>
      </div>
      <div className="flex items-center gap-1">
        <button
          type="button"
          aria-label="Previous month"
          onClick={onPrevious}
          className={NAV_BUTTON}
        >
          <DateHeaderChevron direction="left" />
        </button>
        <button
          type="button"
          onClick={onToday}
          className="cursor-pointer rounded-md px-2 py-1.5 font-sans text-sm font-semibold text-today transition-control outline-none hover:bg-calendar-nav focus-visible:focus-ring"
        >
          Today
        </button>
        <button
          type="button"
          aria-label="Next month"
          onClick={onNext}
          className={NAV_BUTTON}
        >
          <DateHeaderChevron direction="right" />
        </button>
      </div>
    </div>
  )
}

function DateHeaderChevron({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={direction === "left" ? "M14.5 6.5L9 12l5.5 5.5" : "M9.5 6.5L15 12l-5.5 5.5"} />
    </svg>
  )
}

export { DateHeader }
