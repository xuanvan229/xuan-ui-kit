import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

import { Avatar, AvatarFallback } from "./avatar"
import { Badge, BadgeDot } from "./badge"
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./breadcrumb"
import { Separator } from "./separator"
import { Tag, TagRemove, TagReset } from "./tag"

describe("Breadcrumb", () => {
  it("renders links, a current page and an ellipsis", () => {
    render(
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbEllipsis />
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Select</BreadcrumbPage>
        </BreadcrumbItem>
      </Breadcrumb>
    )
    expect(
      screen.getByRole("navigation", { name: "Breadcrumb" })
    ).toBeInTheDocument()
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute(
      "href",
      "/"
    )
    expect(screen.getByText("Select")).toHaveAttribute("aria-current", "page")
    expect(screen.getByRole("button", { name: "More" })).toHaveAttribute(
      "data-slot",
      "breadcrumb-ellipsis"
    )
  })
})

describe("Badge", () => {
  it("applies variant, size and dot tone", () => {
    render(
      <Badge variant="outline" size="sm">
        <BadgeDot tone="success" />
        Stable
      </Badge>
    )
    const badge = screen.getByText("Stable")
    expect(badge).toHaveAttribute("data-variant", "outline")
    expect(badge).toHaveAttribute("data-size", "sm")
    expect(badge.querySelector("[data-slot=badge-dot]")).toHaveAttribute(
      "data-tone",
      "success"
    )
  })
})

describe("Tag", () => {
  it("removes and resets", async () => {
    const onRemove = vi.fn()
    const onReset = vi.fn()
    render(
      <>
        <Tag>
          datepicker
          <TagRemove onClick={onRemove} />
        </Tag>
        <TagReset onClick={onReset}>Reset</TagReset>
      </>
    )
    await userEvent.click(screen.getByRole("button", { name: "Remove" }))
    await userEvent.click(screen.getByRole("button", { name: "Reset" }))
    expect(onRemove).toHaveBeenCalledTimes(1)
    expect(onReset).toHaveBeenCalledTimes(1)
  })
})

describe("Avatar", () => {
  it("shows initials with a tone", () => {
    render(
      <Avatar tone="tint">
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
    )
    expect(
      screen.getByText("JD").closest("[data-slot=avatar]")
    ).toHaveAttribute("data-tone", "tint")
  })
})

describe("Separator", () => {
  it("renders a horizontal separator", () => {
    render(<Separator variant="popup" />)
    const separator = screen.getByRole("separator")
    expect(separator).toHaveAttribute("data-variant", "popup")
    expect(separator).toHaveAttribute("data-orientation", "horizontal")
    expect(separator.className).toContain("data-[orientation=horizontal]:h-px")
  })
})
