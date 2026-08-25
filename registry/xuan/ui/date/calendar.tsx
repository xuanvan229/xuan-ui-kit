"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { DateCell } from "@/registry/xuan/ui/date/cell"
import { buildDateGrid, DATE_GRID_ROWS } from "@/registry/xuan/ui/date/grid"
import { DateHeader } from "@/registry/xuan/ui/date/header"
import {
  type DateKey,
  dateKeyDiff,
  dateKeyMonth,
  dateKeyYear,
  fromDateKey,
  toDateKey,
} from "@/registry/xuan/ui/date/key"
import {
  type DateRangeState,
  dateRangeBand,
  dateRangePreview,
} from "@/registry/xuan/ui/date/range"

const WEEKDAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"]

type DateCalendarProps = {
  mode: "single" | "range"
  range: DateRangeState
  onSelect: (key: DateKey) => void
  isDateDisabled: (key: DateKey) => boolean
  showOutsideDays: boolean
  className?: string
}

function DateCalendar({
  mode,
  range,
  onSelect,
  isDateDisabled,
  showOutsideDays,
  className,
}: DateCalendarProps) {
  const today = toDateKey(new Date())
  const anchor = range.start ?? today
  const [view, setView] = React.useState({
    year: dateKeyYear(anchor),
    month: dateKeyMonth(anchor),
  })
  const [hover, setHover] = React.useState<DateKey | null>(null)
  const grid = buildDateGrid(view.year, view.month)
  const viewMonthKey = view.year * 100 + view.month + 1

  const shiftMonth = (delta: number) => {
    const next = new Date(view.year, view.month + delta, 1)
    setView({ year: next.getFullYear(), month: next.getMonth() })
  }

  const select = (key: DateKey) => {
    onSelect(key)
    if (Math.floor(key / 100) !== viewMonthKey)
      setView({ year: dateKeyYear(key), month: dateKeyMonth(key) })
  }

  return (
    <div data-slot="date-calendar" className={cn("font-sans", className)}>
      <DateHeader
        year={view.year}
        month={view.month}
        onPrevious={() => shiftMonth(-1)}
        onNext={() => shiftMonth(1)}
        onToday={() =>
          setView({ year: dateKeyYear(today), month: dateKeyMonth(today) })
        }
      />
      <div className="flex flex-col gap-px overflow-hidden rounded-xl bg-calendar-line p-px">
        <div className="grid h-[35px] grid-cols-7 gap-px">
          {WEEKDAYS.map((name) => (
            <div
              key={name}
              className="flex items-center justify-center bg-surface text-xs font-semibold text-ink-weekday first:rounded-tl-[11px] last:rounded-tr-[11px]"
            >
              {name}
            </div>
          ))}
        </div>
        {Array.from({ length: DATE_GRID_ROWS }, (_, row) => (
          <div
            key={row}
            className="grid grid-cols-7 gap-px"
            onMouseLeave={() => setHover(null)}
          >
            {grid.slice(row * 7, row * 7 + 7).map((key, column) => {
              const outside = Math.floor(key / 100) !== viewMonthKey
              const hidden = outside && !showOutsideDays
              const disabled = isDateDisabled(key)
              const band = dateRangeBand(range, key)
              const preview =
                mode === "range" && dateRangePreview(range, hover, key)
              const lastRow = row === DATE_GRID_ROWS - 1
              return (
                <DateCell
                  key={key}
                  day={key % 100}
                  date={fromDateKey(key)}
                  selected={!hidden && (band === "start" || band === "end")}
                  band={!hidden && (band === "band" || preview)}
                  today={key === today}
                  outside={outside}
                  disabled={disabled}
                  hidden={hidden}
                  corner={
                    lastRow && column === 0
                      ? "bl"
                      : lastRow && column === 6
                        ? "br"
                        : null
                  }
                  previewDelay={
                    preview && range.start !== null
                      ? Math.min(dateKeyDiff(range.start, key) * 30, 400)
                      : 0
                  }
                  onSelect={() => select(key)}
                  onHover={() => {
                    if (mode === "range" && !disabled) setHover(key)
                  }}
                />
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}

export { DateCalendar }
