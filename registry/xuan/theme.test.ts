import { readFileSync } from "node:fs"
import { describe, expect, it } from "vitest"

import { themeToRegistryFields } from "../sync.mjs"

// note: the path is read into a variable (not a string literal) so Vite's
// static `new URL("...", import.meta.url)` asset-URL rewrite does not
// intercept this at build time and turn it into a dev-server URL.
const themeCssPath = "./theme.css"
const css = readFileSync(new URL(themeCssPath, import.meta.url), "utf8")
const { cssVars } = themeToRegistryFields(css)

describe("theme tokens", () => {
  it("defines the surface and accent-text tokens", () => {
    for (const name of [
      "surface",
      "on-accent",
      "secondary-fill",
      "secondary-bevel",
      "outline-bevel",
      "inset-input",
      "knob-shadow",
      "accent-selected",
      "line-chevron",
      "calendar-selected-ink",
      "calendar-today",
    ])
      expect(cssVars.light, name).toHaveProperty(name)
    expect(cssVars.theme).toMatchObject({
      "color-surface": "var(--surface)",
      "color-on-accent": "var(--on-accent)",
      "color-secondary-fill": "var(--secondary-fill)",
      "color-accent-selected": "var(--accent-selected)",
      "color-line-chevron": "var(--line-chevron)",
      "color-calendar-selected-ink": "var(--calendar-selected-ink)",
      "color-calendar-today": "var(--calendar-today)",
    })
  })

  it("gives every :root token (literal and var()) a dark value, with no dark-only tokens", () => {
    const lightNames = Object.keys(cssVars.light)
    const darkNames = Object.keys(cssVars.dark)
    const missingInDark = lightNames.filter((name) => !(name in cssVars.dark))
    const extraInDark = darkNames.filter((name) => !(name in cssVars.light))
    expect(missingInDark).toEqual([])
    expect(extraInDark).toEqual([])
  })
})
