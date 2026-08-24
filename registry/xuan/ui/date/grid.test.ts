import { describe, expect, it } from "vitest"

import { buildDateGrid } from "./grid"

describe("buildDateGrid", () => {
  it("always returns six Monday-first weeks", () => {
    const grid = buildDateGrid(2026, 6) // July 2026 starts on a Wednesday
    expect(grid).toHaveLength(42)
    expect(grid[0]).toBe(20260629)
    expect(grid[2]).toBe(20260701)
    expect(grid[41]).toBe(20260809)
  })
})
