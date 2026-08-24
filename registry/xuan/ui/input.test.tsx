import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { Input, InputGroup, InputPrefix, InputSuffix } from "./input"

describe("Input", () => {
  it("renders a 40px control with the input border", () => {
    render(<Input placeholder="Name" />)
    const input = screen.getByPlaceholderText("Name")
    expect(input).toHaveAttribute("data-slot", "input")
    expect(input.className).toContain("control")
    expect(input.className).toContain("border-line-input")
  })

  it("marks invalid inputs", () => {
    render(<Input aria-invalid placeholder="Email" />)
    expect(screen.getByPlaceholderText("Email")).toHaveAttribute("aria-invalid", "true")
  })

  it("renders prefix and suffix slots inside a group", () => {
    render(
      <InputGroup>
        <InputPrefix>
          <svg data-testid="icon" />
        </InputPrefix>
        <Input placeholder="Search" />
        <InputSuffix>USD</InputSuffix>
      </InputGroup>
    )
    expect(screen.getByTestId("icon").closest("[data-slot=input-prefix]")).not.toBeNull()
    expect(screen.getByText("USD")).toHaveAttribute("data-slot", "input-suffix")
  })
})
