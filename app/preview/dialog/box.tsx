"use client"

import { Trash2Icon } from "lucide-react"

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogClose,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogIconTile,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/registry/xuan/ui/alert/dialog"
import { Button } from "@/registry/xuan/ui/button"
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/registry/xuan/ui/dialog"
import { Field, FieldLabel } from "@/registry/xuan/ui/field"
import { Input } from "@/registry/xuan/ui/input"
import {
  PreviewKitGroup,
  PreviewKitSection,
  PreviewKitState,
} from "@/app/preview/kit/section"

function PreviewDialogBox() {
  return (
    <PreviewKitSection id="dialog" label="Dialog">
      <PreviewKitGroup label="modal">
        <PreviewKitState caption="Form dialog">
          <Dialog>
            <DialogTrigger
              render={<Button variant="secondary">Open modal</Button>}
            />
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Rename component</DialogTitle>
                <DialogDescription>
                  This will update every instance in the library.
                </DialogDescription>
              </DialogHeader>
              <DialogBody>
                <Field>
                  <FieldLabel>Name</FieldLabel>
                  <Input defaultValue="Date Picker" />
                </Field>
              </DialogBody>
              <DialogFooter>
                <DialogClose render={<Button variant="plain">Cancel</Button>} />
                <Button>Save changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </PreviewKitState>
        <PreviewKitState caption="Destructive confirm">
          <AlertDialog>
            <AlertDialogTrigger
              render={<Button variant="secondary">Delete component</Button>}
            />
            <AlertDialogContent>
              <AlertDialogBody>
                <AlertDialogIconTile>
                  <Trash2Icon strokeWidth={2.2} />
                </AlertDialogIconTile>
                <div className="flex min-w-0 flex-col gap-[3px]">
                  <AlertDialogTitle>Delete component?</AlertDialogTitle>
                  <AlertDialogDescription>
                    &ldquo;Tabs&rdquo; will be removed from the library. This
                    action cannot be undone.
                  </AlertDialogDescription>
                </div>
              </AlertDialogBody>
              <AlertDialogFooter>
                <AlertDialogClose
                  render={<Button variant="plain">Cancel</Button>}
                />
                <Button variant="destructive">Delete</Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </PreviewKitState>
      </PreviewKitGroup>
    </PreviewKitSection>
  )
}

export { PreviewDialogBox }
