"use client"

import {
  PreviewKitGroup,
  PreviewKitSection,
  PreviewKitState,
} from "@/app/preview/kit/section"
import { Button } from "@/registry/xuan/ui/button"
import {
  Combobox,
  ComboboxContent,
  ComboboxInput,
  ComboboxItem,
} from "@/registry/xuan/ui/combobox"
import {
  Sheet,
  SheetBody,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/registry/xuan/ui/sheet"

const COMPONENTS = [
  "Accordion",
  "Button",
  "Checkbox",
  "Date Picker",
  "Dialog",
  "Input",
  "Select",
  "Table",
  "Tabs",
]

function PreviewComboboxBox() {
  return (
    <PreviewKitSection id="combobox" label="Combobox & Sheet">
      <PreviewKitGroup label="combobox">
        <PreviewKitState caption="Type to filter" className="w-60 max-w-full">
          <Combobox items={COMPONENTS}>
            <ComboboxInput
              aria-label="Component"
              placeholder="Search components"
            />
            <ComboboxContent empty="No components found">
              {(item: string) => (
                <ComboboxItem key={item} value={item}>
                  {item}
                </ComboboxItem>
              )}
            </ComboboxContent>
          </Combobox>
        </PreviewKitState>
        <PreviewKitState caption="Disabled" className="w-60 max-w-full">
          <Combobox items={COMPONENTS} disabled>
            <ComboboxInput aria-label="Component" placeholder="Search" />
            <ComboboxContent>
              {(item: string) => (
                <ComboboxItem key={item} value={item}>
                  {item}
                </ComboboxItem>
              )}
            </ComboboxContent>
          </Combobox>
        </PreviewKitState>
      </PreviewKitGroup>
      <PreviewKitGroup label="sheet">
        <PreviewKitState caption="From the right">
          <Sheet>
            <SheetTrigger
              render={<Button variant="secondary">Open sheet</Button>}
            />
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Component details</SheetTitle>
                <SheetDescription>
                  Review the settings before publishing.
                </SheetDescription>
              </SheetHeader>
              <SheetBody>
                The sheet shares its header, body and footer with the dialog,
                and slides in from the edge of the screen.
              </SheetBody>
              <SheetFooter>
                <SheetClose render={<Button variant="plain">Cancel</Button>} />
                <SheetClose render={<Button>Publish</Button>} />
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </PreviewKitState>
        <PreviewKitState caption="From the left">
          <Sheet>
            <SheetTrigger render={<Button variant="plain">Open left</Button>} />
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
              </SheetHeader>
              <SheetBody>Filter controls go here.</SheetBody>
            </SheetContent>
          </Sheet>
        </PreviewKitState>
      </PreviewKitGroup>
    </PreviewKitSection>
  )
}

export { PreviewComboboxBox }
