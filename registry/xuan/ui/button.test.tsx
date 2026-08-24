import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

import { Button, ButtonArrow } from "./button"

describe("Button", () => {
  it("renders the primary bevelled variant by default", () => {
    render(<Button>Save</Button>)
    const button = screen.getByRole("button", { name: "Save" })
    expect(button).toHaveAttribute("data-slot", "button")
    expect(button).toHaveAttribute("data-variant", "primary")
    expect(button).toHaveAttribute("data-size", "default")
    expect(button.className).toContain("bevel-primary")
  })

  it("drops the bevel for the compact size", () => {
    render(
      <Button size="compact" variant="secondary">
        Edit
      </Button>
    )
    expect(screen.getByRole("button").className).not.toContain("bevel-secondary")
  })

  it("renders the trailing arrow slot", () => {
    render(
      <Button>
        Continue
        <ButtonArrow />
      </Button>
    )
    expect(screen.getByRole("button").querySelector("[data-slot=button-arrow] svg")).not.toBeNull()
  })

  it("does not fire clicks when disabled", async () => {
    const onClick = vi.fn()
    render(
      <Button disabled onClick={onClick}>
        Save
      </Button>
    )
    await userEvent.click(screen.getByRole("button"))
    expect(onClick).not.toHaveBeenCalled()
  })
})
