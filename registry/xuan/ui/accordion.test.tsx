import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"

import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
} from "./accordion"

describe("Accordion", () => {
  it("opens one item at a time", async () => {
    render(
      <Accordion defaultValue={["one"]}>
        <AccordionItem value="one">
          <AccordionTrigger>One</AccordionTrigger>
          <AccordionPanel>Body one</AccordionPanel>
        </AccordionItem>
        <AccordionItem value="two">
          <AccordionTrigger>Two</AccordionTrigger>
          <AccordionPanel>Body two</AccordionPanel>
        </AccordionItem>
      </Accordion>
    )
    expect(screen.getByRole("button", { name: "One" })).toHaveAttribute(
      "data-panel-open"
    )
    await userEvent.click(screen.getByRole("button", { name: "Two" }))
    expect(screen.getByRole("button", { name: "Two" })).toHaveAttribute(
      "data-panel-open"
    )
    expect(screen.getByRole("button", { name: "One" })).not.toHaveAttribute(
      "data-panel-open"
    )
  })
})
