import { describe, expect, it } from "vitest"

import { dateRangeBand, dateRangePreview, reduceDateRange } from "./range"

describe("reduceDateRange", () => {
  it("starts, extends, moves start and restarts", () => {
    const empty = { start: null, end: null }
    const started = reduceDateRange(empty, 20260712)
    expect(started).toEqual({ start: 20260712, end: null })
    expect(reduceDateRange(started, 20260710)).toEqual({
      start: 20260710,
      end: null,
    })
    const complete = reduceDateRange(started, 20260718)
    expect(complete).toEqual({ start: 20260712, end: 20260718 })
    expect(reduceDateRange(complete, 20260720)).toEqual({
      start: 20260720,
      end: null,
    })
  })
})

describe("dateRangeBand / dateRangePreview", () => {
  const range = { start: 20260712, end: 20260718 }
  it("classifies cells", () => {
    expect(dateRangeBand(range, 20260712)).toBe("start")
    expect(dateRangeBand(range, 20260715)).toBe("band")
    expect(dateRangeBand(range, 20260718)).toBe("end")
    expect(dateRangeBand(range, 20260719)).toBeNull()
  })
  it("previews only after the start while the end is unset", () => {
    const open = { start: 20260712, end: null }
    expect(dateRangePreview(open, 20260716, 20260714)).toBe(true)
    expect(dateRangePreview(open, 20260716, 20260711)).toBe(false)
    expect(dateRangePreview(range, 20260720, 20260719)).toBe(false)
  })
})
