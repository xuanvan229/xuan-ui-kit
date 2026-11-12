import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"

import {
  Sheet,
  SheetBody,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./sheet"

describe("Sheet", () => {
  it("opens a side panel from its trigger and closes with the header button", async () => {
    render(
      <Sheet>
        <SheetTrigger>Open</SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>Filters</SheetTitle>
          </SheetHeader>
          <SheetBody>Body</SheetBody>
        </SheetContent>
      </Sheet>
    )
    await userEvent.click(screen.getByRole("button", { name: "Open" }))
    const panel = await screen.findByRole("dialog", { name: "Filters" })
    expect(panel).toHaveAttribute("data-slot", "sheet-content")
    expect(panel).toHaveAttribute("data-side", "left")
    await userEvent.click(screen.getByRole("button", { name: "Close" }))
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull())
  })
})
