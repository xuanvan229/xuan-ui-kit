import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"

import { Radio, RadioGroup } from "./radio"

describe("Radio", () => {
  it("selects one option at a time", async () => {
    render(
      <RadioGroup aria-label="Plan">
        <Radio value="a" aria-label="A" />
        <Radio value="b" aria-label="B" />
      </RadioGroup>
    )
    const [a, b] = screen.getAllByRole("radio")
    await userEvent.click(b!)
    expect(b).toHaveAttribute("data-checked")
    expect(a).toHaveAttribute("data-unchecked")
    expect(b!.querySelector("[data-slot=radio-indicator]")).not.toBeNull()
  })
})
