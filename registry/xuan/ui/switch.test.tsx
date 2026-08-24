import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"

import { Switch } from "./switch"

describe("Switch", () => {
  it("toggles checked state on click", async () => {
    render(<Switch aria-label="Notifications" />)
    const control = screen.getByRole("switch")
    expect(control).toHaveAttribute("data-unchecked")
    await userEvent.click(control)
    expect(control).toHaveAttribute("data-checked")
    expect(control.querySelector("[data-slot=switch-thumb]")).toHaveAttribute("data-checked")
  })

  it("exposes the disabled state", () => {
    render(<Switch disabled aria-label="Off" />)
    expect(screen.getByRole("switch")).toHaveAttribute("data-disabled")
  })
})
