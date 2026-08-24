import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"

import { Tabs, TabsList, TabsPanel, TabsTab } from "./tabs"

function Example({ variant }: { variant: "segmented" | "underline" }) {
  return (
    <Tabs defaultValue="one" variant={variant}>
      <TabsList>
        <TabsTab value="one">One</TabsTab>
        <TabsTab value="two">Two</TabsTab>
        <TabsTab value="three" disabled>
          Three
        </TabsTab>
      </TabsList>
      <TabsPanel value="one">Panel one</TabsPanel>
      <TabsPanel value="two">Panel two</TabsPanel>
    </Tabs>
  )
}

describe("Tabs", () => {
  it("activates a tab on click", async () => {
    render(<Example variant="segmented" />)
    expect(screen.getByRole("tablist")).toHaveAttribute("data-variant", "segmented")
    await userEvent.click(screen.getByRole("tab", { name: "Two" }))
    expect(screen.getByRole("tab", { name: "Two" })).toHaveAttribute("data-active")
    expect(screen.getByText("Panel two")).toBeVisible()
    expect(screen.getByRole("tab", { name: "Three" })).toHaveAttribute("data-disabled")
  })

  it("supports the underline variant", () => {
    render(<Example variant="underline" />)
    expect(screen.getByRole("tablist")).toHaveAttribute("data-variant", "underline")
  })
})
