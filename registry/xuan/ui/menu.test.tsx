import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

import {
  Menu,
  MenuContent,
  MenuItem,
  MenuSeparator,
  MenuShortcut,
  MenuTrigger,
} from "./menu"

describe("Menu", () => {
  it("renders items, shortcuts and a danger item", async () => {
    const onDelete = vi.fn()
    render(
      <Menu defaultOpen>
        <MenuTrigger>Actions</MenuTrigger>
        <MenuContent>
          <MenuItem>
            Edit
            <MenuShortcut>⌘E</MenuShortcut>
          </MenuItem>
          <MenuSeparator />
          <MenuItem variant="danger" onClick={onDelete}>
            Delete
          </MenuItem>
        </MenuContent>
      </Menu>
    )
    expect(await screen.findByRole("menu")).toBeInTheDocument()
    expect(screen.getByText("⌘E")).toHaveAttribute("data-slot", "menu-shortcut")
    const remove = screen.getByRole("menuitem", { name: "Delete" })
    expect(remove).toHaveAttribute("data-variant", "danger")
    await userEvent.click(remove)
    expect(onDelete).toHaveBeenCalledTimes(1)
  })
})
