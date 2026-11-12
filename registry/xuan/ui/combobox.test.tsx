import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

import {
  Combobox,
  ComboboxContent,
  ComboboxInput,
  ComboboxItem,
} from "./combobox"

const ITEMS = ["Button", "Input", "Table"]

function Example({
  onValueChange,
}: {
  onValueChange: (value: unknown) => void
}) {
  return (
    <Combobox items={ITEMS} onValueChange={onValueChange}>
      <ComboboxInput aria-label="Component" placeholder="Search" />
      <ComboboxContent empty="Nothing found">
        {(item: string) => (
          <ComboboxItem key={item} value={item}>
            {item}
          </ComboboxItem>
        )}
      </ComboboxContent>
    </Combobox>
  )
}

describe("Combobox", () => {
  it("filters as you type and reports the picked item", async () => {
    const onValueChange = vi.fn()
    render(<Example onValueChange={onValueChange} />)
    const input = screen.getByRole("combobox", { name: "Component" })
    await userEvent.click(input)
    await userEvent.type(input, "inp")
    expect(await screen.findByRole("option", { name: "Input" })).toBeVisible()
    expect(screen.queryByRole("option", { name: "Button" })).toBeNull()
    await userEvent.click(screen.getByRole("option", { name: "Input" }))
    expect(onValueChange.mock.calls[0]?.[0]).toBe("Input")
  })

  it("shows the empty message when nothing matches", async () => {
    render(<Example onValueChange={() => {}} />)
    const input = screen.getByRole("combobox", { name: "Component" })
    await userEvent.click(input)
    await userEvent.type(input, "zzz")
    expect(await screen.findByText("Nothing found")).toBeVisible()
  })
})
