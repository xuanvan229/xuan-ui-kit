import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

import { DatePicker } from "./picker"

describe("DatePicker", () => {
  it("shows the placeholder, opens and selects a day", async () => {
    const onValueChange = vi.fn()
    render(
      <DatePicker value={new Date(2026, 6, 18)} onValueChange={onValueChange} />
    )
    const trigger = screen.getByRole("button", { name: /Jul 18, 2026/ })
    await userEvent.click(trigger)
    expect(await screen.findByText("July")).toBeInTheDocument()
    expect(
      document.querySelectorAll("button[data-slot=date-cell]")
    ).toHaveLength(42)
    await userEvent.click(screen.getByRole("button", { name: /July 20, 2026/ }))
    expect(onValueChange).toHaveBeenCalledWith(new Date(2026, 6, 20))
  })

  it("moves the range start when clicking before it", async () => {
    const onValueChange = vi.fn()
    render(
      <DatePicker
        mode="range"
        value={{ start: new Date(2026, 6, 12), end: null }}
        onValueChange={onValueChange}
      />
    )
    await userEvent.click(screen.getByRole("button", { name: /Jul 12/ }))
    await userEvent.click(
      await screen.findByRole("button", { name: /July 10, 2026/ })
    )
    expect(onValueChange).toHaveBeenCalledWith({
      start: new Date(2026, 6, 10),
      end: null,
    })
  })

  it("disables dates outside min/max", async () => {
    render(
      <DatePicker
        value={new Date(2026, 6, 18)}
        onValueChange={() => {}}
        min={new Date(2026, 6, 15)}
      />
    )
    await userEvent.click(screen.getByRole("button", { name: /Jul 18/ }))
    expect(
      await screen.findByRole("button", { name: /July 14, 2026/ })
    ).toBeDisabled()
    expect(screen.getByRole("button", { name: /July 15, 2026/ })).toBeEnabled()
  })

  it("spreads triggerProps onto the trigger", () => {
    render(
      <DatePicker
        value={new Date(2026, 6, 18)}
        onValueChange={() => {}}
        triggerProps={{ id: "start", "aria-label": "Start date" }}
      />
    )
    const trigger = screen.getByRole("button", { name: "Start date" })
    expect(trigger).toHaveAttribute("id", "start")
  })
})
