import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table"

describe("Table", () => {
  it("renders sortable headers, mono cells and selected rows", () => {
    render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead sortable direction="asc">
              Name
            </TableHead>
            <TableHead align="right">Updated</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow selected>
            <TableCell mono>button</TableCell>
            <TableCell align="right">Aug 24, 2026</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    )
    const name = screen.getByRole("columnheader", { name: /Name/ })
    expect(name).toHaveAttribute("aria-sort", "ascending")
    expect(name).toHaveTextContent("↑")
    const updated = screen.getByRole("columnheader", { name: "Updated" })
    expect(updated).toHaveAttribute("data-align", "right")
    expect(updated).not.toHaveAttribute("aria-sort")
    expect(screen.getByText("button").closest("tr")).toHaveAttribute(
      "data-selected",
      "true"
    )
    expect(screen.getByText("button")).toHaveAttribute("data-mono")
  })

  it("renders the header band on the cool-gray head token with semibold labels", () => {
    render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Merchant</TableHead>
          </TableRow>
        </TableHeader>
      </Table>
    )
    const head = screen.getByRole("columnheader", { name: "Merchant" })
    expect(head.className).toContain("font-semibold")
    expect(head.className).not.toContain("font-normal")
    expect(head.closest("thead")?.className).toContain("bg-table-head")
  })

  it("sorts from the keyboard through a button inside the header", async () => {
    const onSort = vi.fn()
    render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead sortable direction={null} onClick={onSort}>
              Name
            </TableHead>
            <TableHead>Owner</TableHead>
          </TableRow>
        </TableHeader>
      </Table>
    )
    const button = screen.getByRole("button", { name: "Name" })
    expect(button.closest("th")).toHaveAttribute("aria-sort", "none")
    button.focus()
    await userEvent.keyboard("{Enter}")
    expect(onSort).toHaveBeenCalledTimes(1)
    expect(
      screen
        .getByRole("columnheader", { name: "Owner" })
        .querySelector("button")
    ).toBeNull()
  })
})
