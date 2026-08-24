"use client"

import * as React from "react"

import { SelectChip } from "@/registry/xuan/ui/select/chip"
import {
  SelectGroup,
  SelectGroupLabel,
  SelectItem,
  SelectSeparator,
} from "@/registry/xuan/ui/select/item"
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/registry/xuan/ui/select/select"
import {
  PreviewKitGroup,
  PreviewKitSection,
  PreviewKitState,
} from "@/app/preview/kit/section"

function PreviewSelectOptions() {
  return (
    <>
      <SelectGroup>
        <SelectGroupLabel>Form</SelectGroupLabel>
        <SelectItem value="Button">Button</SelectItem>
        <SelectItem value="Input">Input</SelectItem>
        <SelectItem value="Date Picker">Date Picker</SelectItem>
      </SelectGroup>
      <SelectSeparator />
      <SelectGroup>
        <SelectGroupLabel>Data</SelectGroupLabel>
        <SelectItem value="Table">Table</SelectItem>
        <SelectItem value="Charts" disabled>
          Charts (soon)
        </SelectItem>
      </SelectGroup>
    </>
  )
}

function PreviewSelectBox() {
  const [picked, setPicked] = React.useState<string[]>(["Button", "Input"])

  return (
    <PreviewKitSection id="select" label="Select">
      <PreviewKitGroup label="single">
        <PreviewKitState caption="Placeholder">
          <Select>
            <SelectTrigger className="w-[240px]">
              <SelectValue placeholder="Select a component" />
            </SelectTrigger>
            <SelectContent>
              <PreviewSelectOptions />
            </SelectContent>
          </Select>
        </PreviewKitState>
        <PreviewKitState caption="Selected">
          <Select defaultValue="Date Picker">
            <SelectTrigger className="w-[240px]">
              <SelectValue placeholder="Select a component" />
            </SelectTrigger>
            <SelectContent>
              <PreviewSelectOptions />
            </SelectContent>
          </Select>
        </PreviewKitState>
        <PreviewKitState caption="Disabled">
          <Select defaultValue="Date Picker" disabled>
            <SelectTrigger className="w-[240px]">
              <SelectValue placeholder="Select a component" />
            </SelectTrigger>
            <SelectContent>
              <PreviewSelectOptions />
            </SelectContent>
          </Select>
        </PreviewKitState>
      </PreviewKitGroup>
      <PreviewKitGroup label="multiple">
        <PreviewKitState caption="Chips">
          <Select multiple value={picked} onValueChange={setPicked}>
            <SelectTrigger className="w-[280px]">
              <SelectValue>
                {(value: string[]) =>
                  value.length === 0
                    ? "Select components"
                    : value.map((item) => (
                        <SelectChip
                          key={item}
                          removeLabel={`Remove ${item}`}
                          onRemove={() =>
                            setPicked((current) =>
                              current.filter((entry) => entry !== item)
                            )
                          }
                        >
                          {item}
                        </SelectChip>
                      ))
                }
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <PreviewSelectOptions />
            </SelectContent>
          </Select>
        </PreviewKitState>
      </PreviewKitGroup>
    </PreviewKitSection>
  )
}

export { PreviewSelectBox }
