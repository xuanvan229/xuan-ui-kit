import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

import { Field, FieldLabel } from "./field"
import { Textarea, TextareaCounter } from "./textarea"

describe("Textarea", () => {
  it("renders with symmetric 10/12 padding and vertical resize", () => {
    render(<Textarea placeholder="Notes" />)
    const textarea = screen.getByPlaceholderText("Notes")
    expect(textarea).toHaveAttribute("data-slot", "textarea")
    expect(textarea.className).toContain("resize-y")
  })

  it("is labelled by FieldLabel and reflects the field's invalid state", () => {
    render(
      <Field invalid>
        <FieldLabel>Bio</FieldLabel>
        <Textarea rows={3} />
      </Field>
    )
    const textarea = screen.getByLabelText("Bio")
    expect(textarea.tagName).toBe("TEXTAREA")
    expect(textarea).toHaveAttribute("rows", "3")
    expect(textarea).toHaveAttribute("aria-invalid", "true")
    expect(textarea).toHaveAttribute("data-invalid")
  })

  it("still works standalone: aria-invalid, disabled and onChange pass through", async () => {
    const onChange = vi.fn()
    const { rerender } = render(
      <Textarea aria-label="Note" aria-invalid onChange={onChange} />
    )
    const textarea = screen.getByLabelText("Note")
    expect(textarea).toHaveAttribute("aria-invalid", "true")
    await userEvent.type(textarea, "hi")
    expect(onChange).toHaveBeenCalledTimes(2)
    expect(textarea).toHaveValue("hi")
    rerender(<Textarea aria-label="Note" disabled />)
    expect(screen.getByLabelText("Note")).toBeDisabled()
  })

  it("counter turns red only when strictly over the max", () => {
    const { rerender } = render(<TextareaCounter count={200} max={200} />)
    expect(screen.getByText("200 / 200")).not.toHaveAttribute("data-over")
    rerender(<TextareaCounter count={201} max={200} />)
    expect(screen.getByText("201 / 200")).toHaveAttribute("data-over", "true")
  })
})
