import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"

import { toast, Toaster } from "./toast"

describe("Toaster", () => {
  it("shows a typed toast and closes it", async () => {
    render(
      <Toaster>
        <button
          type="button"
          onClick={() =>
            toast.add({
              title: "Saved",
              description: "Component published.",
              type: "success",
            })
          }
        >
          Fire
        </button>
      </Toaster>
    )
    await userEvent.click(screen.getByRole("button", { name: "Fire" }))
    const title = await screen.findByText("Saved")
    const root = title.closest("[data-slot=toast]")
    expect(root).not.toBeNull()
    expect(root!.querySelector("[data-slot=toast-icon]")).toHaveAttribute(
      "data-type",
      "success"
    )
    // note: Base UI's ToastClose is aria-hidden until the viewport is
    // hovered/focused (it declutters stacked close affordances); hover first
    // so it is reachable by role, matching how a real user reveals it.
    await userEvent.hover(root!)
    await userEvent.click(screen.getByRole("button", { name: "Close" }))
    expect(root).toHaveAttribute("data-ending-style")
  })
})
