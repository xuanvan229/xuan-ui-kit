import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { Field, FieldError, FieldLabel } from "./field"
import { Input } from "./input"
import { Label } from "./label"

describe("Field", () => {
  it("wires label, control and error together", () => {
    render(
      <Field invalid>
        <FieldLabel>Email</FieldLabel>
        <Input />
        <FieldError match>Enter a valid email</FieldError>
      </Field>
    )
    const input = screen.getByLabelText("Email")
    expect(input).toHaveAttribute("aria-invalid", "true")
    expect(screen.getByText("Enter a valid email")).toHaveAttribute("data-slot", "field-error")
  })
})

describe("Label", () => {
  it("renders an inline control label", () => {
    render(<Label>Remember me</Label>)
    expect(screen.getByText("Remember me")).toHaveAttribute("data-slot", "label")
  })
})
