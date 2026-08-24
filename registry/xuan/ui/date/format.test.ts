import { describe, expect, it } from "vitest"

import { formatDateLabel, formatDateRangeLabel } from "./format"

describe("date labels", () => {
  it("formats single dates", () => {
    expect(formatDateLabel(null)).toBe("Select date")
    expect(formatDateLabel(new Date(2026, 6, 18))).toBe("Jul 18, 2026")
  })
  it("formats ranges", () => {
    expect(formatDateRangeLabel(null, null)).toBe("Select dates")
    expect(formatDateRangeLabel(new Date(2026, 6, 12), null)).toBe("Jul 12 – …")
    expect(
      formatDateRangeLabel(new Date(2026, 6, 12), new Date(2026, 6, 18))
    ).toBe("Jul 12 – 18, 2026")
    expect(
      formatDateRangeLabel(new Date(2026, 6, 12), new Date(2026, 7, 3))
    ).toBe("Jul 12 – Aug 3, 2026")
    expect(
      formatDateRangeLabel(new Date(2025, 11, 30), new Date(2026, 0, 2))
    ).toBe("Dec 30, 2025 – Jan 2, 2026")
  })
})
