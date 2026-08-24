import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

import { SelectChip } from "./chip"
import {
  SelectGroup,
  SelectGroupLabel,
  SelectItem,
  SelectSeparator,
} from "./item"
import { Select, SelectContent, SelectTrigger, SelectValue } from "./select"

describe("Select", () => {
  it("lists grouped items and reports the picked value", async () => {
    const onValueChange = vi.fn()
    render(
      <Select defaultOpen onValueChange={onValueChange}>
        <SelectTrigger>
          <SelectValue placeholder="Pick one" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectGroupLabel>Layout</SelectGroupLabel>
            <SelectItem value="grid">Grid</SelectItem>
            <SelectItem value="stack" disabled>
              Stack
            </SelectItem>
          </SelectGroup>
          <SelectSeparator />
          <SelectItem value="list">List</SelectItem>
        </SelectContent>
      </Select>
    )
    expect(await screen.findByRole("listbox")).toBeInTheDocument()
    expect(screen.getByText("Layout")).toHaveAttribute(
      "data-slot",
      "select-group-label"
    )
    expect(screen.getByRole("option", { name: "Stack" })).toHaveAttribute(
      "data-disabled"
    )
    await userEvent.click(screen.getByRole("option", { name: "Grid" }))
    expect(onValueChange).toHaveBeenCalledWith("grid", expect.anything())
  })

  it("renders chips inside a non-button trigger in multiple mode", async () => {
    const onRemove = vi.fn()
    render(
      <Select multiple value={["button", "input"]}>
        <SelectTrigger>
          <SelectValue>
            {(selected: string[]) =>
              selected.map((name) => (
                <SelectChip key={name} onRemove={onRemove}>
                  {name}
                </SelectChip>
              ))
            }
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="button">button</SelectItem>
          <SelectItem value="input">input</SelectItem>
        </SelectContent>
      </Select>
    )
    const trigger = screen.getByRole("combobox")
    expect(trigger.tagName).toBe("DIV")
    expect(trigger).toHaveAttribute("data-multiple", "true")
    await userEvent.click(screen.getAllByRole("button", { name: "Remove" })[0]!)
    expect(onRemove).toHaveBeenCalledTimes(1)
  })
})
