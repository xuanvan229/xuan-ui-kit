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
    expect(screen.getByRole("button").className).not.toContain(
      "bevel-secondary"
    )
  })

  it("renders the trailing arrow slot", () => {
    render(
      <Button>
        Continue
        <ButtonArrow />
      </Button>
    )
    expect(
      screen.getByRole("button").querySelector("[data-slot=button-arrow] svg")
    ).not.toBeNull()
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

  it("keeps each variant recognisable when disabled", () => {
    render(
      <>
        <Button disabled>Primary</Button>
        <Button disabled variant="destructive">
          Delete
        </Button>
        <Button disabled variant="plain">
          Plain
        </Button>
      </>
    )
    expect(screen.getByRole("button", { name: "Primary" })).toHaveClass(
      "data-disabled:bg-accent-disabled",
      "data-disabled:text-accent-disabled-ink"
    )
    expect(screen.getByRole("button", { name: "Delete" })).toHaveClass(
      "data-disabled:bg-destructive-disabled"
    )
    expect(screen.getByRole("button", { name: "Plain" })).toHaveClass(
      "data-disabled:bg-surface"
    )
  })

  it("styles the disabled state when it stays focusable", () => {
    render(
      <Button disabled focusableWhenDisabled>
        Save
      </Button>
    )
    const button = screen.getByRole("button", { name: "Save" })
    expect(button).not.toBeDisabled()
    expect(button).toHaveAttribute("data-disabled")
    expect(button).toHaveClass("data-disabled:cursor-not-allowed")
  })

  it("rests on a neutral border in the outline variant", () => {
    render(<Button variant="outline">Outline</Button>)
    expect(screen.getByRole("button", { name: "Outline" })).toHaveClass(
      "border-line-control"
    )
  })
})
