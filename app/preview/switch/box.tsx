"use client"

import * as React from "react"

import { Field, FieldError, FieldLabel } from "@/registry/xuan/ui/field"
import { Label } from "@/registry/xuan/ui/label"
import { Switch } from "@/registry/xuan/ui/switch"
import { Textarea, TextareaCounter } from "@/registry/xuan/ui/textarea"
import {
  PreviewKitGroup,
  PreviewKitSection,
  PreviewKitState,
} from "@/app/preview/kit/section"

const MAX = 200

function PreviewSwitchBox() {
  const [note, setNote] = React.useState("")

  return (
    <PreviewKitSection id="switch" label="Switch & Textarea">
      <PreviewKitGroup label="switch — states">
        <PreviewKitState caption="Off">
          <Label>
            <Switch />
            Email notifications
          </Label>
        </PreviewKitState>
        <PreviewKitState caption="On">
          <Label>
            <Switch defaultChecked />
            Public profile
          </Label>
        </PreviewKitState>
        <PreviewKitState caption="Disabled">
          <Label>
            <Switch disabled />
            Weekly digest
          </Label>
        </PreviewKitState>
      </PreviewKitGroup>
      <PreviewKitGroup label="textarea — states">
        <PreviewKitState caption="Default">
          <Field className="w-[280px]">
            <FieldLabel>Label</FieldLabel>
            <Textarea rows={3} placeholder="Type something…" />
          </Field>
        </PreviewKitState>
        <PreviewKitState caption="Error">
          <Field className="w-[280px]" invalid>
            <FieldLabel>Label</FieldLabel>
            <Textarea rows={3} defaultValue="Too short" />
            <FieldError match>Minimum 20 characters</FieldError>
          </Field>
        </PreviewKitState>
        <PreviewKitState caption="Disabled">
          <Field className="w-[280px]" disabled>
            <FieldLabel>Label</FieldLabel>
            <Textarea rows={3} disabled defaultValue="Type something…" />
          </Field>
        </PreviewKitState>
        <PreviewKitState caption="With counter">
          <Field className="w-[280px]">
            <div className="flex items-baseline justify-between">
              <FieldLabel>Description</FieldLabel>
              <TextareaCounter count={note.length} max={MAX} />
            </div>
            <Textarea
              rows={3}
              value={note}
              placeholder="Type something…"
              onChange={(event) => setNote(event.target.value)}
            />
          </Field>
        </PreviewKitState>
      </PreviewKitGroup>
    </PreviewKitSection>
  )
}

export { PreviewSwitchBox }
