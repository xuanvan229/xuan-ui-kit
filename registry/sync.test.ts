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
@layer base { body { font-family: var(--font-sans); } }
`
    const result = themeToRegistryFields(css)
    expect(result.cssVars.light).toEqual({ "accent-500": "hsl(210 100% 45%)", radius: "10px" })
    expect(result.cssVars.dark).toEqual({ "accent-500": "hsl(210 100% 45%)" })
    expect(result.cssVars.theme).toEqual({
      "color-accent-500": "var(--accent-500)",
      "font-sans": "var(--font-plex-sans), sans-serif",
    })
    expect(result.css).toEqual({
      "@utility focus-ring": { outline: "3px solid var(--focus-ring)", "outline-offset": "2px" },
      "@keyframes toast-in": { from: { opacity: "0" }, to: { opacity: "1" } },
      "@layer base": { body: { "font-family": "var(--font-sans)" } },
    })
    expect(result.css).not.toHaveProperty(".dark")
  })
})
