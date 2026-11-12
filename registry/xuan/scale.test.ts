import { readdirSync, readFileSync } from "node:fs"
import { join } from "node:path"
import { describe, expect, it } from "vitest"

const UI_DIR = join(process.cwd(), "registry/xuan/ui")

// note: 13/15/17/22 sit beside Tailwind's text-xs (12) and text-sm (14);
// 10 is the initials inside a 22–24px avatar.
const FONT_SIZES = new Set([10, 13, 15, 17, 22])
// note: 4/8/12 come from rounded-xs/md/xl; 11 is the calendar's inner corner
// (12px panel radius minus its 1px grid line), the only value off the 4px grid.
const RADII = new Set([11])
// note: the calendar draws its 1px grid lines with gap and padding.
const SPACING_EXCEPTIONS = new Set([
  "date/calendar.tsx: gap-px",
  "date/calendar.tsx: p-px",
])
const SPACING =
  /(?<![\w-])-?(?:p[xytblrse]?|m[xytblrse]?|gap(?:-[xy])?|space-[xy])-(?:\[([\d.]+)px\]|(px)|(\d+(?:\.\d+)?))(?![\w.])/g

function spacingPx(match: RegExpMatchArray): number {
  if (match[1] != null) return Number(match[1])
  if (match[2] != null) return 1
  return Number(match[3]) * 4
}

// note: the date trigger matches its popup (7 × 44px cells + grid lines + padding).
const SIZE_EXCEPTIONS = new Set(["date/picker.tsx: w-[350px]"])

function sources(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) return sources(path)
    return /\.tsx?$/.test(entry.name) && !/\.test\./.test(entry.name)
      ? [path]
      : []
  })
}

function offScale(pattern: RegExp, allowed: Set<number>): string[] {
  return sources(UI_DIR).flatMap((path) =>
    [...readFileSync(path, "utf8").matchAll(pattern)]
      .filter((match) => !allowed.has(Number(match[1])))
      .map((match) => `${path.slice(UI_DIR.length + 1)}: ${match[0]}`)
  )
}

function offGrid(pattern: RegExp): string[] {
  return sources(UI_DIR).flatMap((path) =>
    [...readFileSync(path, "utf8").matchAll(pattern)]
      .filter((match) => Number(match[1]) % 4 !== 0)
      .map((match) => `${path.slice(UI_DIR.length + 1)}: ${match[0]}`)
  )
}

describe("design scales", () => {
  it("uses only the type scale 10/12/13/14/15/17/22px", () => {
    expect(offScale(/text-\[([\d.]+)px\]/g, FONT_SIZES)).toEqual([])
  })

  it("uses only the radius scale 4/8/12px", () => {
    expect(offScale(/rounded(?:-[a-z]{1,2})?-\[([\d.]+)px\]/g, RADII)).toEqual(
      []
    )
    expect(
      offScale(/rounded(?:-[a-z]{1,2})?-(?:sm|lg)(?![\w-])()/g, new Set())
    ).toEqual([])
  })

  it("keeps padding, margin and gap on the 4px grid", () => {
    const offGrid = sources(UI_DIR).flatMap((path) =>
      [...readFileSync(path, "utf8").matchAll(SPACING)]
        .filter((match) => spacingPx(match) % 4 !== 0)
        .map((match) => `${path.slice(UI_DIR.length + 1)}: ${match[0]}`)
        .filter((entry) => !SPACING_EXCEPTIONS.has(entry))
    )
    expect(offGrid).toEqual([])
  })

  it("keeps fixed sizes and icons on the 4px grid", () => {
    const sizes = offGrid(/(?:size|h|w|min-h|min-w)-\[([\d.]+)px\]/g).filter(
      (entry) => !SIZE_EXCEPTIONS.has(entry)
    )
    const icons = offGrid(/<svg\s+width="(\d+)"/g)
    expect([...sizes, ...icons]).toEqual([])
  })

  it("shows the error ring only while the control has focus", () => {
    expect(
      offScale(
        /(?<![\w:-])(?:aria|data)-invalid:focus-ring-error()/g,
        new Set()
      )
    ).toEqual([])
  })
})
