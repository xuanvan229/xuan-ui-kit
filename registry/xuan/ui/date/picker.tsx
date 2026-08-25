"use client"

import * as React from "react"
import { Popover as PopoverPrimitive } from "@base-ui/react/popover"

import { cn } from "@/lib/utils"
import { DateCalendar } from "@/registry/xuan/ui/date/calendar"
import {
  formatDateLabel,
  formatDateRangeLabel,
} from "@/registry/xuan/ui/date/format"
import {
  type DateKey,
  fromDateKey,
  toDateKey,
} from "@/registry/xuan/ui/date/key"
import {
  type DateRangeState,
  reduceDateRange,
} from "@/registry/xuan/ui/date/range"

type DateRangeValue = { start: Date | null; end: Date | null }

type DatePickerModeProps =
  | {
      mode?: "single"
      value: Date | null
      onValueChange: (value: Date | null) => void
    }
  | {
      mode: "range"
      value: DateRangeValue
      onValueChange: (value: DateRangeValue) => void
    }

type DatePickerProps = DatePickerModeProps & {
  min?: Date | null
  max?: Date | null
  isDateDisabled?: (date: Date) => boolean
  showOutsideDays?: boolean
  disabled?: boolean
  className?: string
  triggerProps?: PopoverPrimitive.Trigger.Props
}

function keyOf(date: Date | null): DateKey | null {
  return date === null ? null : toDateKey(date)
}

function dateOf(key: DateKey | null): Date | null {
  return key === null ? null : fromDateKey(key)
}

function DatePicker(props: DatePickerProps) {
  const {
    min = null,
    max = null,
    isDateDisabled,
    showOutsideDays = true,
    disabled = false,
    className,
    triggerProps,
  } = props
  const [open, setOpen] = React.useState(false)
  const isRange = props.mode === "range"
  const range: DateRangeState = isRange
    ? { start: keyOf(props.value.start), end: keyOf(props.value.end) }
    : { start: keyOf(props.value), end: keyOf(props.value) }
  const label = isRange
    ? formatDateRangeLabel(props.value.start, props.value.end)
    : formatDateLabel(props.value)

  const isKeyDisabled = (key: DateKey) => {
    if (min !== null && key < toDateKey(min)) return true
    if (max !== null && key > toDateKey(max)) return true
    return isDateDisabled ? isDateDisabled(fromDateKey(key)) : false
  }

  const handleSelect = (key: DateKey) => {
    if (props.mode === "range") {
      const next = reduceDateRange(range, key)
      props.onValueChange({ start: dateOf(next.start), end: dateOf(next.end) })
      return
    }
    props.onValueChange(fromDateKey(key))
    setOpen(false)
  }

  return (
    <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
      <PopoverPrimitive.Trigger
        disabled={disabled}
        data-slot="date-picker-trigger"
        className={cn(
          "control flex w-[360px] cursor-pointer items-center justify-between border border-line-input bg-surface font-sans font-medium text-ink inset-input transition-control outline-none select-none hover:border-line-input-hover focus-visible:border-accent-600 focus-visible:focus-ring disabled:cursor-not-allowed disabled:border-disabled-line disabled:bg-disabled-bg disabled:text-ink-disabled disabled:shadow-flat data-popup-open:border-accent-600 data-popup-open:focus-ring",
          className
        )}
        {...triggerProps}
      >
        <span
          data-slot="date-picker-value"
          className={cn(range.start === null && "text-ink-muted")}
        >
          {label}
        </span>
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          className="shrink-0 text-ink-secondary"
          aria-hidden="true"
        >
          <rect x="3.5" y="5" width="17" height="15.5" rx="3" />
          <path d="M3.5 9.5h17M8 3v3.5M16 3v3.5" />
        </svg>
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Positioner
          side="bottom"
          align="start"
          sideOffset={12}
          className="isolate z-50"
        >
          <PopoverPrimitive.Popup
            data-slot="date-picker-content"
            className="w-[400px] rounded-xl border border-line-popup bg-calendar p-4 shadow-panel transition-[opacity,translate] duration-150 ease-out outline-none data-ending-style:opacity-0 data-starting-style:-translate-y-1 data-starting-style:opacity-0"
          >
            <DateCalendar
              mode={isRange ? "range" : "single"}
              range={range}
              onSelect={handleSelect}
              isDateDisabled={isKeyDisabled}
              showOutsideDays={showOutsideDays}
            />
          </PopoverPrimitive.Popup>
        </PopoverPrimitive.Positioner>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  )
}

export { DatePicker }
export type { DateRangeValue }
