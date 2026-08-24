import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"

import { Checkbox } from "./checkbox"

describe("Checkbox", () => {
  it("draws the check when clicked", async () => {
    render(<Checkbox aria-label="Accept" />)
    const box = screen.getByRole("checkbox")
    expect(box.querySelector("[data-slot=checkbox-indicator]")).toBeNull()
    await userEvent.click(box)
    expect(box).toHaveAttribute("data-checked")
    expect(box.querySelector("[data-slot=checkbox-indicator] path")).not.toBeNull()
  })

  it("shows the dash for indeterminate", () => {
    render(<Checkbox indeterminate aria-label="Some" />)
    const box = screen.getByRole("checkbox")
    expect(box).toHaveAttribute("data-indeterminate")
    expect(box.querySelector("[data-slot=checkbox-dash]")).not.toBeNull()
  })

  it("supports the 16px size", () => {
    render(<Checkbox size="sm" aria-label="Small" />)
    expect(screen.getByRole("checkbox")).toHaveAttribute("data-size", "sm")
  })
})
