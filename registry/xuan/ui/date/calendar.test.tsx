import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
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

  it("reads the clock once on mount, not on every render", () => {
    vi.useFakeTimers({ toFake: ["Date"] })
    try {
      vi.setSystemTime(new Date(2026, 6, 10, 12))
      const anchor = toDateKey(new Date(2026, 6, 20))
      const props = {
        mode: "single" as const,
        range: { start: anchor, end: anchor },
        onSelect: vi.fn(),
        isDateDisabled: () => false,
        showOutsideDays: true,
      }
      const { rerender } = render(<DateCalendar {...props} />)
      const marker = () =>
        document.querySelector("[data-slot=date-today]")?.closest("button")
      expect(marker()).toHaveAccessibleName(/July 10, 2026/)
      vi.setSystemTime(new Date(2026, 6, 11, 12))
      rerender(<DateCalendar {...props} />)
      expect(marker()).toHaveAccessibleName(/July 10, 2026/)
    } finally {
      vi.useRealTimers()
    }
  })

  it("moves focus across days, weeks and months with the keyboard", async () => {
    const anchor = toDateKey(new Date(2026, 6, 20))
    render(
      <DateCalendar
        mode="single"
        range={{ start: anchor, end: anchor }}
        onSelect={vi.fn()}
        isDateDisabled={(key) => key === toDateKey(new Date(2026, 6, 21))}
        showOutsideDays
      />
    )
    const day = (name: RegExp) => screen.getByRole("button", { name })
    expect(
      document.querySelectorAll('[data-slot=date-cell][tabindex="0"]')
    ).toHaveLength(1)
    day(/July 20, 2026/).focus()
    await userEvent.keyboard("{ArrowRight}")
    expect(day(/July 22, 2026/)).toHaveFocus()
    await userEvent.keyboard("{ArrowDown}")
    expect(day(/July 29, 2026/)).toHaveFocus()
    await userEvent.keyboard("{Home}")
    expect(day(/July 27, 2026/)).toHaveFocus()
    await userEvent.keyboard("{PageDown}")
    expect(day(/August 27, 2026/)).toHaveFocus()
    expect(screen.getByText("August")).toBeInTheDocument()
    expect(
      document.querySelectorAll('[data-slot=date-cell][tabindex="0"]')
    ).toHaveLength(1)
  })

  it("takes its strings and month names from labels and locale", () => {
    const anchor = toDateKey(new Date(2026, 6, 20))
    render(
      <DateCalendar
        mode="single"
        range={{ start: anchor, end: anchor }}
        onSelect={vi.fn()}
        isDateDisabled={() => false}
        showOutsideDays
        locale="fr-FR"
        labels={{
          today: "Aujourd’hui",
          previousMonth: "Mois précédent",
          nextMonth: "Mois suivant",
          placeholder: "Choisir une date",
          rangePlaceholder: "Choisir des dates",
          weekdays: ["Lu", "Ma", "Me", "Je", "Ve", "Sa", "Di"],
        }}
      />
    )
    expect(
      screen.getByRole("button", { name: "Aujourd’hui" })
    ).toBeInTheDocument()
    expect(
      screen.getByRole("button", { name: "Mois suivant" })
    ).toBeInTheDocument()
    expect(screen.getByText("juillet")).toBeInTheDocument()
    expect(screen.getByText("Lu")).toBeInTheDocument()
    expect(screen.queryByText("Today")).not.toBeInTheDocument()
  })

  it("keeps an enabled day in the tab order when the anchor day is disabled", () => {
    const anchor = toDateKey(new Date(2026, 6, 20))
    render(
      <DateCalendar
        mode="single"
        range={{ start: anchor, end: anchor }}
        onSelect={vi.fn()}
        isDateDisabled={(key) => key <= anchor}
        showOutsideDays
      />
    )
    const stops = document.querySelectorAll(
      '[data-slot=date-cell][tabindex="0"]'
    )
    expect(stops).toHaveLength(1)
    expect(stops[0]).toBeEnabled()
    expect(stops[0]).toHaveAccessibleName(/July 21, 2026/)
  })
})
