import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

import { buildPaginationPages } from "./pages"
import { Pagination } from "./pagination"

describe("buildPaginationPages", () => {
  it("lists every page when they fit", () => {
    expect(buildPaginationPages(2, 5)).toEqual([1, 2, 3, 4, 5])
    expect(buildPaginationPages(1, 1)).toEqual([1])
    expect(buildPaginationPages(1, 0)).toEqual([])
  })
  it("collapses the far ranges around the current page", () => {
    expect(buildPaginationPages(5, 10)).toEqual([
      1,
      "ellipsis-start",
      4,
      5,
      6,
      "ellipsis-end",
      10,
    ])
    expect(buildPaginationPages(1, 10)).toEqual([
      1,
      2,
      3,
      4,
      5,
      "ellipsis-end",
      10,
    ])
    expect(buildPaginationPages(10, 10)).toEqual([
      1,
      "ellipsis-start",
      6,
      7,
      8,
      9,
      10,
    ])
  })
})

describe("buildPaginationPages ellipsis", () => {
  it("never hides a single page behind an ellipsis", () => {
    expect(buildPaginationPages(4, 8)).toEqual([
      1,
      2,
      3,
      4,
      5,
      "ellipsis-end",
      8,
    ])
    expect(buildPaginationPages(5, 8)).toEqual([
      1,
      "ellipsis-start",
      4,
      5,
      6,
      7,
      8,
    ])
    expect(buildPaginationPages(4, 10)).toEqual([
      1,
      2,
      3,
      4,
      5,
      "ellipsis-end",
      10,
    ])
  })
  it("clamps a page outside the range", () => {
    expect(buildPaginationPages(99, 10)).toEqual(buildPaginationPages(10, 10))
    expect(buildPaginationPages(0, 10)).toEqual(buildPaginationPages(1, 10))
  })
})

describe("Pagination", () => {
  it("marks the current page and moves with previous, next and page buttons", async () => {
    const onPageChange = vi.fn()
    render(<Pagination page={5} count={10} onPageChange={onPageChange} />)
    expect(screen.getByRole("navigation", { name: "Pagination" })).toBeVisible()
    expect(screen.getByRole("button", { name: "Page 5" })).toHaveAttribute(
      "aria-current",
      "page"
    )
    await userEvent.click(screen.getByRole("button", { name: "Next page" }))
    await userEvent.click(screen.getByRole("button", { name: "Previous page" }))
    await userEvent.click(screen.getByRole("button", { name: "Page 10" }))
    expect(onPageChange.mock.calls).toEqual([[6], [4], [10]])
  })

  it("disables previous on the first page and next on the last", () => {
    const { rerender } = render(
      <Pagination page={1} count={3} onPageChange={() => {}} />
    )
    expect(screen.getByRole("button", { name: "Previous page" })).toBeDisabled()
    expect(screen.getByRole("button", { name: "Next page" })).toBeEnabled()
    rerender(<Pagination page={3} count={3} onPageChange={() => {}} />)
    expect(screen.getByRole("button", { name: "Next page" })).toBeDisabled()
  })

  it("takes its strings from labels", () => {
    render(
      <Pagination
        page={1}
        count={2}
        onPageChange={() => {}}
        labels={{ next: "Trang sau", page: (page) => `Trang ${page}` }}
      />
    )
    expect(screen.getByRole("button", { name: "Trang sau" })).toBeEnabled()
    expect(screen.getByRole("button", { name: "Trang 2" })).toBeEnabled()
  })
})
