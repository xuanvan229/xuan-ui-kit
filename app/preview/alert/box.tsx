import {
  PreviewKitGroup,
  PreviewKitSection,
  PreviewKitState,
} from "@/app/preview/kit/section"
import { Alert, AlertDescription, AlertTitle } from "@/registry/xuan/ui/alert"
import { Progress } from "@/registry/xuan/ui/progress"
import { Spinner } from "@/registry/xuan/ui/spinner"

const ALERTS = [
  {
    variant: "info",
    title: "New version available",
    description: "v2.4 of the design system is ready to install.",
  },
  {
    variant: "success",
    title: "Component published",
    description: "Date Picker is now live in the library.",
  },
  {
    variant: "warning",
    title: "Unpublished changes",
    description: "This component differs from the published version.",
  },
  {
    variant: "error",
    title: "Publish failed",
    description: "The registry did not accept the build. Try again.",
  },
] as const

function PreviewAlertBox() {
  return (
    <PreviewKitSection id="alert" label="Alert, Spinner & Progress">
      <PreviewKitGroup label="alert" className="flex-col gap-3">
        {ALERTS.map((item) => (
          <Alert
            key={item.variant}
            variant={item.variant}
            className="w-[440px] max-w-full"
          >
            <AlertTitle>{item.title}</AlertTitle>
            <AlertDescription>{item.description}</AlertDescription>
          </Alert>
        ))}
      </PreviewKitGroup>
      <PreviewKitGroup label="spinner">
        <PreviewKitState caption="Small">
          <Spinner size="sm" />
        </PreviewKitState>
        <PreviewKitState caption="Default">
          <Spinner />
        </PreviewKitState>
        <PreviewKitState caption="Large">
          <Spinner size="lg" />
        </PreviewKitState>
      </PreviewKitGroup>
      <PreviewKitGroup label="progress">
        <PreviewKitState
          caption="With label and value"
          className="w-80 max-w-full"
        >
          <Progress value={40} label="Uploading" showValue />
        </PreviewKitState>
        <PreviewKitState caption="Bar only" className="w-80 max-w-full">
          <Progress value={72} aria-label="Storage used" />
        </PreviewKitState>
        <PreviewKitState caption="Indeterminate" className="w-80 max-w-full">
          <Progress value={null} aria-label="Working" />
        </PreviewKitState>
      </PreviewKitGroup>
    </PreviewKitSection>
  )
}

export { PreviewAlertBox }
