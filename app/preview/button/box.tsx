import { Button, ButtonArrow } from "@/registry/xuan/ui/button"
import {
  PreviewKitGroup,
  PreviewKitSection,
  PreviewKitState,
} from "@/app/preview/kit/section"

const LABEL = "Discover the Core libraries"

const VARIANTS = [
  "primary",
  "secondary",
  "outline",
  "ghost",
  "plain",
  "destructive",
] as const

function PreviewButtonBox() {
  return (
    <PreviewKitSection id="button" label="Button">
      {VARIANTS.map((variant) => (
        <PreviewKitGroup key={variant} label={variant}>
          <PreviewKitState caption="Default">
            <Button variant={variant}>
              {LABEL}
              {variant === "primary" ? <ButtonArrow /> : null}
            </Button>
          </PreviewKitState>
          <PreviewKitState caption="Disabled">
            <Button variant={variant} disabled>
              {LABEL}
            </Button>
          </PreviewKitState>
        </PreviewKitGroup>
      ))}
      <PreviewKitGroup label="compact">
        <PreviewKitState caption="Primary">
          <Button size="compact">Open in editor</Button>
        </PreviewKitState>
        <PreviewKitState caption="Secondary">
          <Button variant="secondary" size="compact">
            View docs
          </Button>
        </PreviewKitState>
      </PreviewKitGroup>
    </PreviewKitSection>
  )
}

export { PreviewButtonBox }
