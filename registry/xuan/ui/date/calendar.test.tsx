import { render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"

import { DateCalendar } from "./calendar"
import { toDateKey } from "./key"

describe("DateCalendar", () => {
  it("renders hidden non-interactive cells for outside days when showOutsideDays is false", () => {
    const anchor = toDateKey(new Date(2026, 6, 1))
    render(
      <DateCalendar
        mode="single"
        range={{ start: anchor, end: anchor }}
        onSelect={vi.fn()}
        isDateDisabled={() => false}
        showOutsideDays={false}
      />
    )
    const cells = document.querySelectorAll("[data-slot=date-cell]")
    expect(cells).toHaveLength(42)
    const hidden = document.querySelectorAll(
      "[data-slot=date-cell][data-hidden=true]"
    )
    expect(hidden.length).toBeGreaterThan(0)
    hidden.forEach((cell) => {
      expect(cell.tagName).toBe("DIV")
      expect(cell).toHaveAttribute("aria-hidden", "true")
      expect(cell.className).not.toContain("strike-diagonal")
    })
  })

  it("marks a selected day button with aria-pressed", () => {
    const anchor = toDateKey(new Date(2026, 6, 20))
    render(
      <DateCalendar
        mode="single"
        range={{ start: anchor, end: anchor }}
        onSelect={vi.fn()}
        isDateDisabled={() => false}
        showOutsideDays
      />
    )
    const selected = screen.getByRole("button", { name: /July 20, 2026/ })
    expect(selected).toHaveAttribute("aria-pressed", "true")
  })
})
