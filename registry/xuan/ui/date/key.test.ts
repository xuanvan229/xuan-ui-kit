import { describe, expect, it } from "vitest"

import {
  dateKeyDiff,
  dateKeyMonth,
  dateKeyYear,
  fromDateKey,
  toDateKey,
} from "./key"

describe("date keys", () => {
  it("round-trips a date", () => {
    const key = toDateKey(new Date(2026, 6, 18))
    expect(key).toBe(20260718)
    expect(fromDateKey(key)).toEqual(new Date(2026, 6, 18))
    expect(dateKeyYear(key)).toBe(2026)
    expect(dateKeyMonth(key)).toBe(6)
  })

  it("counts whole days between keys", () => {
    expect(dateKeyDiff(20260712, 20260718)).toBe(6)
    expect(dateKeyDiff(20260731, 20260801)).toBe(1)
  })
})
