"use client"

import * as React from "react"

import { DatePicker, type DateRangeValue } from "@/registry/xuan/ui/date/picker"
import {
  PreviewKitGroup,
  PreviewKitSection,
  PreviewKitState,
} from "@/app/preview/kit/section"

const BLOCKED = [4, 5, 25, 26]

// note: July is month index 6; the design blocks Jul 4–5 and Jul 25–26, 2026.
function isPreviewDateDisabled(date: Date) {
  return (
    date.getFullYear() === 2026 &&
    date.getMonth() === 6 &&
    BLOCKED.includes(date.getDate())
  )
}

function PreviewDateBox() {
  const [day, setDay] = React.useState<Date | null>(new Date(2026, 6, 18))
  const [range, setRange] = React.useState<DateRangeValue>({
    start: new Date(2026, 6, 12),
    end: new Date(2026, 6, 18),
  })

  return (
    <PreviewKitSection id="date" label="Date picker">
      <PreviewKitGroup label="single">
        <PreviewKitState caption="Selected day">
          <DatePicker
            value={day}
            onValueChange={setDay}
            isDateDisabled={isPreviewDateDisabled}
          />
        </PreviewKitState>
        <PreviewKitState caption="Disabled">
          <DatePicker value={day} onValueChange={setDay} disabled />
        </PreviewKitState>
      </PreviewKitGroup>
      <PreviewKitGroup label="range">
        <PreviewKitState caption="Selected range">
          <DatePicker
            mode="range"
            value={range}
            onValueChange={setRange}
            isDateDisabled={isPreviewDateDisabled}
          />
        </PreviewKitState>
      </PreviewKitGroup>
    </PreviewKitSection>
  )
}

export { PreviewDateBox }
