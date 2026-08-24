import { SearchIcon } from "lucide-react"

import { Field, FieldError, FieldLabel } from "@/registry/xuan/ui/field"
import {
  Input,
  InputGroup,
  InputPrefix,
  InputSuffix,
} from "@/registry/xuan/ui/input"
import {
  PreviewKitGroup,
  PreviewKitSection,
  PreviewKitState,
} from "@/app/preview/kit/section"

function PreviewInputBox() {
  return (
    <PreviewKitSection id="input" label="Input">
      <PreviewKitGroup label="text — states">
        <PreviewKitState caption="Default">
          <Field className="w-[260px]">
            <FieldLabel>Label</FieldLabel>
            <Input placeholder="Placeholder" />
          </Field>
        </PreviewKitState>
        <PreviewKitState caption="Filled">
          <Field className="w-[260px]">
            <FieldLabel>Label</FieldLabel>
            <Input defaultValue="Input value" />
          </Field>
        </PreviewKitState>
        <PreviewKitState caption="Error">
          <Field className="w-[260px]" invalid>
            <FieldLabel>Label</FieldLabel>
            <Input defaultValue="Wrong value" />
            <FieldError match>This field is required</FieldError>
          </Field>
        </PreviewKitState>
        <PreviewKitState caption="Disabled">
          <Field className="w-[260px]" disabled>
            <FieldLabel>Label</FieldLabel>
            <Input defaultValue="Input value" />
          </Field>
        </PreviewKitState>
      </PreviewKitGroup>
      <PreviewKitGroup label="with icon">
        <PreviewKitState caption="Search prefix">
          <Field className="w-[260px]">
            <FieldLabel>Search</FieldLabel>
            <InputGroup>
              <InputPrefix>
                <SearchIcon strokeWidth={2} />
              </InputPrefix>
              <Input placeholder="Search components" />
            </InputGroup>
          </Field>
        </PreviewKitState>
        <PreviewKitState caption="Unit suffix">
          <Field className="w-[260px]">
            <FieldLabel>Amount</FieldLabel>
            <InputGroup>
              <Input placeholder="0.00" inputMode="decimal" />
              <InputSuffix>USD</InputSuffix>
            </InputGroup>
          </Field>
        </PreviewKitState>
      </PreviewKitGroup>
    </PreviewKitSection>
  )
}

export { PreviewInputBox }
