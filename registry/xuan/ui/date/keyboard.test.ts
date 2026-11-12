import { describe, expect, it } from "vitest"

import { toDateKey } from "./key"
import { moveDateKey } from "./keyboard"

const day = (date: number, month = 6) => toDateKey(new Date(2026, month, date))
const none = () => false

describe("moveDateKey", () => {
  it("ignores keys that do not navigate", () => {
    expect(moveDateKey(day(15), "a", none)).toBeNull()
  })

  it("moves by day, week, week edge and month", () => {
    expect(moveDateKey(day(15), "ArrowLeft", none)).toBe(day(14))
    expect(moveDateKey(day(15), "ArrowDown", none)).toBe(day(22))
    expect(moveDateKey(day(15), "Home", none)).toBe(day(13))
    expect(moveDateKey(day(15), "End", none)).toBe(day(19))
    expect(moveDateKey(day(31), "PageDown", none)).toBe(day(31, 7))
    expect(moveDateKey(day(31, 0), "PageDown", none)).toBe(day(28, 1))
  })

  it("skips disabled days with the arrow keys", () => {
    const weekend = (key: number) => key === day(18) || key === day(19)
    expect(moveDateKey(day(17), "ArrowRight", weekend)).toBe(day(20))
  })

  it("lands on the nearest enabled day when a jump target is disabled", () => {
    const early = (key: number) => key <= day(13)
    expect(moveDateKey(day(16), "Home", early)).toBe(day(14))
    const late = (key: number) => key >= day(18)
    expect(moveDateKey(day(15), "End", late)).toBe(day(17))
    const august = (key: number) => key >= day(1, 7) && key <= day(20, 7)
    expect(moveDateKey(day(15), "PageDown", august)).toBe(day(31))
    const allBut = (key: number) => key !== day(15)
    expect(moveDateKey(day(15), "PageUp", allBut)).toBe(day(15))
  })
})
