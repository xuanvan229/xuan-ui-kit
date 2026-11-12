"use client"

import * as React from "react"
import { flushSync } from "react-dom"

import { cn } from "@/lib/utils"
import { DateCell } from "@/registry/xuan/ui/date/cell"
import { buildDateGrid, DATE_GRID_ROWS } from "@/registry/xuan/ui/date/grid"
import { DateHeader } from "@/registry/xuan/ui/date/header"
import { moveDateKey } from "@/registry/xuan/ui/date/keyboard"
import {
  type DateKey,
  dateKeyDiff,
  dateKeyMonth,
  dateKeyYear,
  fromDateKey,
  toDateKey,
} from "@/registry/xuan/ui/date/key"
import { DATE_LABELS, type DateLabels } from "@/registry/xuan/ui/date/labels"
import {
  type DateRangeState,
  dateRangeBand,
  dateRangePreview,
} from "@/registry/xuan/ui/date/range"

type DateCalendarProps = {
  mode: "single" | "range"
  range: DateRangeState
  onSelect: (key: DateKey) => void
  isDateDisabled: (key: DateKey) => boolean
  showOutsideDays: boolean
  locale?: string
  labels?: DateLabels
  className?: string
}

function DateCalendar({
  mode,
  range,
  onSelect,
  isDateDisabled,
  showOutsideDays,
  locale = "en-US",
  labels = DATE_LABELS,
  className,
}: DateCalendarProps) {
  // note: lazy initializer keeps render pure; the popup remounts the calendar on every open.
  const [today] = React.useState(() => toDateKey(new Date()))
  const anchor = range.start ?? today
  const [view, setView] = React.useState({
    year: dateKeyYear(anchor),
    month: dateKeyMonth(anchor),
  })
  const [hover, setHover] = React.useState<DateKey | null>(null)
  const [focusKey, setFocusKey] = React.useState(anchor)
  const gridRef = React.useRef<HTMLDivElement>(null)
  const grid = buildDateGrid(view.year, view.month)
  const viewMonthKey = view.year * 100 + view.month + 1
  const inView = (key: DateKey) => Math.floor(key / 100) === viewMonthKey
  // note: exactly one day is in the tab order. It follows the focused day;
  // when that day is disabled or outside the visible month, the first enabled
  // day of the month takes over, because a disabled button cannot take focus.
  const tabStop =
    inView(focusKey) && !isDateDisabled(focusKey)
      ? focusKey
      : (grid.find((key) => inView(key) && !isDateDisabled(key)) ?? focusKey)

  const shiftMonth = (delta: number) => {
    const next = new Date(view.year, view.month + delta, 1)
    setView({ year: next.getFullYear(), month: next.getMonth() })
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!(event.target instanceof HTMLElement)) return
    const from = Number(event.target.dataset.key)
    if (!from) return
    const target = moveDateKey(from, event.key, isDateDisabled)
    if (target === null) return
    event.preventDefault()
    // note: the target day may be in a month that is not rendered yet, so the
    // view must commit before focus can move to it.
    flushSync(() => {
      setFocusKey(target)
      setView({ year: dateKeyYear(target), month: dateKeyMonth(target) })
    })
    gridRef.current
      ?.querySelector<HTMLElement>(`[data-key="${target}"]`)
      ?.focus()
  }

  const select = (key: DateKey) => {
    onSelect(key)
    setFocusKey(key)
    if (Math.floor(key / 100) !== viewMonthKey)
      setView({ year: dateKeyYear(key), month: dateKeyMonth(key) })
  }

  return (
    <div data-slot="date-calendar" className={cn("w-fit font-sans", className)}>
      <DateHeader
        year={view.year}
        month={view.month}
        locale={locale}
        labels={labels}
        onPrevious={() => shiftMonth(-1)}
        onNext={() => shiftMonth(1)}
        onToday={() =>
          setView({ year: dateKeyYear(today), month: dateKeyMonth(today) })
        }
      />
      <div
        ref={gridRef}
        className="flex flex-col gap-px overflow-hidden rounded-xl bg-calendar-line p-px"
        onKeyDown={handleKeyDown}
      >
        <div className="grid h-8 grid-cols-7 gap-px">
          {labels.weekdays.map((name) => (
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
                  dateKey={key}
                  date={fromDateKey(key)}
                  locale={locale}
                  tabStop={key === tabStop}
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
