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
    expect(screen.getAllByRole("button", { name: /^\d+$/ })).toHaveLength(42)
    await userEvent.click(screen.getByRole("button", { name: "20" }))
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
    await userEvent.click(await screen.findByRole("button", { name: "10" }))
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
    expect(await screen.findByRole("button", { name: "14" })).toBeDisabled()
    expect(screen.getByRole("button", { name: "15" })).toBeEnabled()
  })
})
