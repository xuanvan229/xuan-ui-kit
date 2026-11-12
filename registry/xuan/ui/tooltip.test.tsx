import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"

import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip"

describe("Tooltip", () => {
  it("shows its content when the trigger is hovered or focused", async () => {
    render(
      <Tooltip>
        <TooltipTrigger delay={0}>Copy</TooltipTrigger>
        <TooltipContent>Copy link</TooltipContent>
      </Tooltip>
    )
    expect(screen.queryByText("Copy link")).not.toBeInTheDocument()
    await userEvent.hover(screen.getByRole("button", { name: "Copy" }))
    expect(await screen.findByText("Copy link")).toBeInTheDocument()
    expect(
      screen.getByText("Copy link").closest("[data-slot=tooltip-content]")
    ).toHaveClass("bg-tooltip", "text-tooltip-ink")
  })
})
