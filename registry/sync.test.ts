import { describe, expect, it } from "vitest"

import { themeToRegistryFields } from "./sync.mjs"

describe("themeToRegistryFields", () => {
  it("splits :root vars, @theme inline vars and the rest", () => {
    const css = `
:root { --accent-500: hsl(210 100% 45%); --radius: 10px; }
.dark { --accent-500: hsl(210 100% 45%); }
@theme inline { --color-accent-500: var(--accent-500); --font-sans: var(--font-plex-sans), sans-serif; }
@utility focus-ring { outline: 3px solid var(--focus-ring); outline-offset: 2px; }
@keyframes toast-in { from { opacity: 0; } to { opacity: 1; } }
@layer base { :root { color-scheme: light; } .dark { color-scheme: dark; } body { font-family: var(--font-sans); } }
`
    const result = themeToRegistryFields(css)
    expect(result.cssVars.light).toEqual({
      "accent-500": "hsl(210 100% 45%)",
      radius: "10px",
    })
    expect(result.cssVars.dark).toEqual({ "accent-500": "hsl(210 100% 45%)" })
    expect(result.cssVars.light).not.toHaveProperty("color-scheme")
    expect(result.cssVars.dark).not.toHaveProperty("color-scheme")
    expect(result.cssVars.theme).toEqual({
      "color-accent-500": "var(--accent-500)",
      "font-sans": "var(--font-plex-sans), sans-serif",
    })
    expect(result.css).toEqual({
      "@utility focus-ring": {
        outline: "3px solid var(--focus-ring)",
        "outline-offset": "2px",
      },
      "@keyframes toast-in": { from: { opacity: "0" }, to: { opacity: "1" } },
      "@layer base": {
        ":root": { "color-scheme": "light" },
        ".dark": { "color-scheme": "dark" },
        body: { "font-family": "var(--font-sans)" },
      },
    })
    expect(result.css).not.toHaveProperty(".dark")
  })

  it("normalises multi-line declaration values onto one line", () => {
    const css = `
:root {
  --shadow-popup:
    0 8px 24px rgb(24 24 44 / 0.1),
    0 2px 6px rgb(24 24 44 / 0.05);
}
`
    const result = themeToRegistryFields(css)
    expect(result.cssVars.light).toEqual({
      "shadow-popup":
        "0 8px 24px rgb(24 24 44 / 0.1), 0 2px 6px rgb(24 24 44 / 0.05)",
    })
  })

  it("throws if a top-level :root rule contains a non-custom-property declaration", () => {
    const css = `:root { --accent-500: hsl(210 100% 45%); color-scheme: light; }`
    expect(() => themeToRegistryFields(css)).toThrow(/non-custom-property/)
  })

  it("throws if a top-level .dark rule contains a non-custom-property declaration", () => {
    const css = `.dark { --accent-500: hsl(210 100% 45%); color-scheme: dark; }`
    expect(() => themeToRegistryFields(css)).toThrow(/non-custom-property/)
  })
})
