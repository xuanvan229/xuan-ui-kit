"use client"

import { Button } from "@/registry/xuan/ui/button"
import { toast } from "@/registry/xuan/ui/toast"
import { PreviewKitGroup, PreviewKitSection } from "@/app/preview/kit/section"

const TOASTS = [
  {
    type: "success",
    title: "Saved",
    description: "Component published to the library.",
  },
  {
    type: "error",
    title: "Something went wrong",
    description: "Changes could not be saved. Try again.",
  },
  {
    type: "warning",
    title: "Heads up",
    description: "This component has unpublished changes.",
  },
  {
    type: "info",
    title: "New version",
    description: "v2.4 of the design system is available.",
  },
] as const

function PreviewToastBox() {
  return (
    <PreviewKitSection id="toast" label="Toast">
      <PreviewKitGroup label="types">
        {TOASTS.map((item) => (
          <Button
            key={item.type}
            variant="secondary"
            onClick={() =>
              toast.add({
                title: item.title,
                description: item.description,
                type: item.type,
              })
            }
          >
            Fire {item.type}
          </Button>
        ))}
      </PreviewKitGroup>
    </PreviewKitSection>
  )
}

export { PreviewToastBox }
