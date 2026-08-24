import { Checkbox } from "@/registry/xuan/ui/checkbox"
import { Label } from "@/registry/xuan/ui/label"
import { Radio, RadioGroup } from "@/registry/xuan/ui/radio"
import {
  PreviewKitGroup,
  PreviewKitSection,
  PreviewKitState,
} from "@/app/preview/kit/section"

function PreviewCheckboxBox() {
  return (
    <PreviewKitSection id="checkbox" label="Checkbox & Radio">
      <PreviewKitGroup label="checkbox — states">
        <PreviewKitState caption="Unchecked">
          <Label>
            <Checkbox />
            Show weekends
          </Label>
        </PreviewKitState>
        <PreviewKitState caption="Checked">
          <Label>
            <Checkbox defaultChecked />
            Highlight today
          </Label>
        </PreviewKitState>
        <PreviewKitState caption="Indeterminate">
          <Label>
            <Checkbox indeterminate />
            Disable past dates
          </Label>
        </PreviewKitState>
        <PreviewKitState caption="Disabled">
          <Label>
            <Checkbox disabled />
            Show weekends
          </Label>
        </PreviewKitState>
        <PreviewKitState caption="Disabled checked">
          <Label>
            <Checkbox disabled defaultChecked />
            Highlight today
          </Label>
        </PreviewKitState>
      </PreviewKitGroup>
      <PreviewKitGroup label="radio — states">
        <PreviewKitState caption="Group">
          <RadioGroup defaultValue="range">
            <Label>
              <Radio value="single" />
              Single date
            </Label>
            <Label>
              <Radio value="range" />
              Date range
            </Label>
            <Label>
              <Radio value="multiple" disabled />
              Multiple dates
            </Label>
          </RadioGroup>
        </PreviewKitState>
        <PreviewKitState caption="Disabled checked">
          <RadioGroup defaultValue="single" disabled>
            <Label>
              <Radio value="single" />
              Single date
            </Label>
            <Label>
              <Radio value="range" />
              Date range
            </Label>
          </RadioGroup>
        </PreviewKitState>
      </PreviewKitGroup>
    </PreviewKitSection>
  )
}

export { PreviewCheckboxBox }
