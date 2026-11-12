import { describe, expect, it } from "vitest"

import { formatDateLabel, formatDateRangeLabel } from "./format"

const range = (start: Date | null, end: Date | null) =>
  formatDateRangeLabel(start, end, "en-US", "Select dates")

describe("date labels", () => {
  it("formats single dates", () => {
    expect(formatDateLabel(null, "en-US", "Select date")).toBe("Select date")
    expect(formatDateLabel(new Date(2026, 6, 18), "en-US", "Select date")).toBe(
      "Jul 18, 2026"
    )
  })
  it("formats ranges", () => {
    expect(range(null, null)).toBe("Select dates")
    expect(range(new Date(2026, 6, 12), null)).toBe("Jul 12 – …")
    expect(range(new Date(2026, 6, 12), new Date(2026, 6, 18))).toBe(
      "Jul 12 – 18, 2026"
    )
    expect(range(new Date(2026, 6, 12), new Date(2026, 7, 3))).toBe(
      "Jul 12 – Aug 3, 2026"
    )
    expect(range(new Date(2025, 11, 30), new Date(2026, 0, 2))).toBe(
      "Dec 30, 2025 – Jan 2, 2026"
    )
  })
  it("takes month names from the locale", () => {
    expect(formatDateLabel(new Date(2026, 6, 18), "de-DE", "")).toContain(
      "Juli"
    )
  })
})
