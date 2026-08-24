import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { Textarea, TextareaCounter } from "./textarea"

describe("Textarea", () => {
  it("renders with symmetric 10/12 padding and vertical resize", () => {
    render(<Textarea placeholder="Notes" />)
    const textarea = screen.getByPlaceholderText("Notes")
    expect(textarea).toHaveAttribute("data-slot", "textarea")
    expect(textarea.className).toContain("resize-y")
  })

  it("counter turns red only when strictly over the max", () => {
    const { rerender } = render(<TextareaCounter count={200} max={200} />)
    expect(screen.getByText("200 / 200")).not.toHaveAttribute("data-over")
    rerender(<TextareaCounter count={201} max={200} />)
    expect(screen.getByText("201 / 200")).toHaveAttribute("data-over", "true")
  })
})
