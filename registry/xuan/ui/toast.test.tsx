import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"

import { toast, Toaster } from "./toast"

describe("Toaster", () => {
  it("shows a typed toast with its description and closes it", async () => {
    render(
      <>
        <button
          type="button"
          onClick={() =>
            toast.success("Saved", { description: "Component published." })
          }
        >
          Fire
        </button>
        <Toaster />
      </>
    )
    await userEvent.click(screen.getByRole("button", { name: "Fire" }))
    const title = await screen.findByText("Saved")
    const root = title.closest("[data-slot=toast]")
    expect(root).not.toBeNull()
    expect(screen.getByText("Component published.")).toBeInTheDocument()
    // note: Sonner does not size custom toasts, so the card takes the width itself.
    expect(root).toHaveClass("w-(--width)", "max-w-full")
    expect(root!.querySelector("[data-slot=toast-icon]")).toHaveAttribute(
      "data-type",
      "success"
    )
    await userEvent.click(screen.getByRole("button", { name: "Close" }))
    await waitFor(() =>
      expect(screen.queryByText("Saved")).not.toBeInTheDocument()
    )
  })

  it("renders each type and a title-only toast", async () => {
    render(<Toaster />)
    toast.error("Failed")
    toast.warning("Careful")
    toast.info("Updated")
    for (const [text, type] of [
      ["Failed", "error"],
      ["Careful", "warning"],
      ["Updated", "info"],
    ] as const) {
      const root = (await screen.findByText(text)).closest("[data-slot=toast]")
      expect(root!.querySelector("[data-slot=toast-icon]")).toHaveAttribute(
        "data-type",
        type
      )
      expect(root!.querySelector("[data-slot=toast-description]")).toBeNull()
    }
  })

  it("takes the close label from the toast options", async () => {
    render(<Toaster />)
    toast.info("Xong", { closeLabel: "Đóng" })
    await screen.findByText("Xong")
    expect(screen.getByRole("button", { name: "Đóng" })).toBeInTheDocument()
  })
})
