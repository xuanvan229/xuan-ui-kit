import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { Alert, AlertDescription, AlertTitle } from "./alert"
import { Progress } from "./progress"
import { Spinner } from "./spinner"

describe("Alert", () => {
  it("announces errors as an alert and shows the matching icon", () => {
    render(
      <Alert variant="error">
        <AlertTitle>Payment failed</AlertTitle>
        <AlertDescription>Check the card number.</AlertDescription>
      </Alert>
    )
    const alert = screen.getByRole("alert")
    expect(alert).toHaveTextContent("Payment failed")
    expect(alert).toHaveTextContent("Check the card number.")
    expect(alert.querySelector("[data-slot=alert-icon]")).toHaveAttribute(
      "data-variant",
      "error"
    )
  })

  it("uses a polite status role for info and success", () => {
    render(
      <Alert variant="success">
        <AlertTitle>Saved</AlertTitle>
      </Alert>
    )
    expect(screen.getByRole("status")).toHaveTextContent("Saved")
    expect(screen.queryByRole("alert")).toBeNull()
  })
})

describe("Spinner", () => {
  it("is a status with a default and a custom label", () => {
    const { rerender } = render(<Spinner />)
    expect(screen.getByRole("status", { name: "Loading" })).toHaveAttribute(
      "data-size",
      "default"
    )
    expect(document.querySelector("[data-slot=spinner-track]")).toHaveClass(
      "stroke-line-control"
    )
    rerender(<Spinner size="sm" label="Đang tải" />)
    expect(screen.getByRole("status", { name: "Đang tải" })).toHaveAttribute(
      "data-size",
      "sm"
    )
  })
})

describe("Progress", () => {
  it("exposes its value, label and percentage", () => {
    render(<Progress value={40} label="Uploading" showValue />)
    const bar = screen.getByRole("progressbar", { name: "Uploading" })
    expect(bar).toHaveAttribute("aria-valuenow", "40")
    expect(screen.getByText("40%")).toBeInTheDocument()
  })

  it("renders an indeterminate bar when the value is null", () => {
    render(<Progress value={null} aria-label="Working" />)
    const bar = screen.getByRole("progressbar", { name: "Working" })
    expect(bar).not.toHaveAttribute("aria-valuenow")
    const indicator = bar.querySelector("[data-slot=progress-indicator]")
    expect(indicator).toHaveAttribute("data-indeterminate")
    expect(indicator).toHaveClass(
      "data-indeterminate:animate-progress",
      "motion-reduce:data-indeterminate:animate-none"
    )
  })
})
