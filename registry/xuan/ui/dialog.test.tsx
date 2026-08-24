import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./alert/dialog"
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog"

describe("Dialog", () => {
  it("opens from its trigger and closes with the header button", async () => {
    render(
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New component</DialogTitle>
            <DialogDescription>
              Add a component to the library.
            </DialogDescription>
          </DialogHeader>
          <DialogBody>Body</DialogBody>
          <DialogFooter>Footer</DialogFooter>
        </DialogContent>
      </Dialog>
    )
    await userEvent.click(screen.getByRole("button", { name: "Open" }))
    const dialog = await screen.findByRole("dialog", { name: "New component" })
    expect(dialog).toHaveAttribute("data-slot", "dialog-content")
    await userEvent.click(screen.getByRole("button", { name: "Close" }))
    expect(screen.queryByRole("dialog")).toBeNull()
  })
})

describe("AlertDialog", () => {
  it("renders an alertdialog role", async () => {
    render(
      <AlertDialog>
        <AlertDialogTrigger>Delete</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogTitle>Delete component?</AlertDialogTitle>
        </AlertDialogContent>
      </AlertDialog>
    )
    await userEvent.click(screen.getByRole("button", { name: "Delete" }))
    expect(
      await screen.findByRole("alertdialog", { name: "Delete component?" })
    ).toBeInTheDocument()
  })
})
