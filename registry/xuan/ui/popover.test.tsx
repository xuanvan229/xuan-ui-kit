import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import {
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverDescription,
  PopoverFooter,
  PopoverTitle,
  PopoverTrigger,
} from "./popover"

describe("Popover", () => {
  it("renders titled content when open", async () => {
    render(
      <Popover defaultOpen>
        <PopoverTrigger>Info</PopoverTrigger>
        <PopoverContent>
          <PopoverBody>
            <PopoverTitle>Date picker</PopoverTitle>
            <PopoverDescription>Single and range selection.</PopoverDescription>
          </PopoverBody>
          <PopoverFooter>
            <button type="button">Docs</button>
          </PopoverFooter>
        </PopoverContent>
      </Popover>
    )
    const dialog = await screen.findByRole("dialog", { name: "Date picker" })
    expect(dialog).toHaveAttribute("data-slot", "popover-content")
    expect(screen.getByText("Docs").parentElement).toHaveAttribute(
      "data-slot",
      "popover-footer"
    )
  })
})
