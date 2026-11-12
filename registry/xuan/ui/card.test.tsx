import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import {
  Card,
  CardBody,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card"
import { Empty, EmptyDescription, EmptyIcon, EmptyTitle } from "./empty"
import { Skeleton } from "./skeleton"

describe("Card", () => {
  it("renders a titled surface with body and footer", () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Usage</CardTitle>
          <CardDescription>Last 30 days</CardDescription>
        </CardHeader>
        <CardBody>1,204 installs</CardBody>
        <CardFooter>Footer</CardFooter>
      </Card>
    )
    expect(screen.getByRole("heading", { name: "Usage" })).toBeInTheDocument()
    expect(screen.getByText("Last 30 days")).toBeInTheDocument()
    expect(
      screen.getByText("1,204 installs").closest("[data-slot=card]")
    ).toHaveClass("rounded-xl", "border")
    expect(screen.getByText("Footer")).toHaveAttribute(
      "data-slot",
      "card-footer"
    )
  })
})

describe("Skeleton", () => {
  it("is hidden from assistive tech and stops pulsing for reduced motion", () => {
    render(<Skeleton className="h-4 w-40" />)
    const skeleton = document.querySelector("[data-slot=skeleton]")
    expect(skeleton).toHaveAttribute("aria-hidden", "true")
    expect(skeleton).toHaveClass(
      "animate-pulse",
      "motion-reduce:animate-none",
      "w-40"
    )
  })
})

describe("Empty", () => {
  it("renders an icon tile, a heading and a description", () => {
    render(
      <Empty>
        <EmptyIcon>
          <svg />
        </EmptyIcon>
        <EmptyTitle>No components yet</EmptyTitle>
        <EmptyDescription>Add one to get started.</EmptyDescription>
      </Empty>
    )
    expect(
      screen.getByRole("heading", { name: "No components yet" })
    ).toBeInTheDocument()
    expect(screen.getByText("Add one to get started.")).toBeInTheDocument()
    expect(document.querySelector("[data-slot=empty-icon]")).toHaveAttribute(
      "aria-hidden",
      "true"
    )
  })
})
