import { readFileSync } from "node:fs"
import { describe, expect, it } from "vitest"

import { themeToRegistryFields } from "../sync.mjs"

// note: the path is read into a variable (not a string literal) so Vite's
// static `new URL("...", import.meta.url)` asset-URL rewrite does not
// intercept this at build time and turn it into a dev-server URL.
const themeCssPath = "./theme.css"
const css = readFileSync(new URL(themeCssPath, import.meta.url), "utf8")
const { cssVars, css: cssRules } = themeToRegistryFields(css)

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

  it("defines the table head band as cool gray in light mode", () => {
    expect(cssVars.light).toMatchObject({ "table-head": "hsl(215 15% 97%)" })
    expect(cssVars.dark).toHaveProperty("table-head")
    expect(cssVars.theme).toMatchObject({
      "color-table-head": "var(--table-head)",
    })
  })

  it("keeps the light table neutrals on the cool-gray family", () => {
    expect(cssVars.light).toMatchObject({
      "table-band": "hsl(215 15% 97%)",
      "table-hair": "hsl(215 15% 94%)",
      "table-line": "hsl(210 14% 87%)",
    })
  })

  it("uses the blue accent for every selection, including the calendar", () => {
    for (const mode of [cssVars.light, cssVars.dark])
      expect(mode).toMatchObject({
        "calendar-selected": "var(--accent-500)",
        "calendar-selected-ink": "var(--on-accent)",
        today: "var(--accent-700)",
      })
  })

  it("fills the secondary button so it reads apart from plain", () => {
    for (const mode of [cssVars.light, cssVars.dark])
      expect(mode).toMatchObject({ "secondary-fill": "var(--fill-menu)" })
  })

  it("keeps the neutral badge on the cool gray of the other neutrals", () => {
    expect(cssVars.light).toMatchObject({
      "neutral-bg": expect.stringMatching(/^hsl\(215 /),
      "neutral-line": expect.stringMatching(/^hsl\(215 /),
    })
  })

  it("draws the outline button without a blue inner rim", () => {
    for (const mode of [cssVars.light, cssVars.dark])
      expect(mode).toMatchObject({
        "outline-bevel": expect.not.stringContaining("0 77 153"),
      })
  })

  it("gives the skeleton its own fill in both modes", () => {
    expect(cssVars.light).toHaveProperty("skeleton")
    expect(cssVars.dark).toHaveProperty("skeleton")
    expect(cssVars.theme).toMatchObject({ "color-skeleton": "var(--skeleton)" })
  })

  it("ships the progress animation with its keyframes", () => {
    expect(cssVars.theme).toHaveProperty("animate-progress")
    expect(cssRules).toHaveProperty("@keyframes progress-slide")
  })

  it("exposes a 4/8/12px radius scale", () => {
    expect(cssVars.theme).toMatchObject({
      "radius-xs": "4px",
      "radius-sm": "4px",
      "radius-md": "8px",
      "radius-lg": "8px",
      "radius-xl": "12px",
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
