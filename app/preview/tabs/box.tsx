import { Tabs, TabsList, TabsPanel, TabsTab } from "@/registry/xuan/ui/tabs"
import { PreviewKitGroup, PreviewKitSection } from "@/app/preview/kit/section"

const TABS = [
  {
    value: "overview",
    label: "Overview",
    body: "Palette, radii and the 40px control height.",
  },
  {
    value: "components",
    label: "Components",
    body: "Twenty registry items built on Base UI.",
  },
  {
    value: "tokens",
    label: "Tokens",
    body: "CSS variables exposed through theme.css.",
  },
  { value: "changelog", label: "Changelog", body: "Nothing released yet." },
] as const

function PreviewTabsPanels() {
  return TABS.map((tab) => (
    <TabsPanel
      key={tab.value}
      value={tab.value}
      className="text-sm text-ink-secondary"
    >
      {tab.body}
    </TabsPanel>
  ))
}

function PreviewTabsBox() {
  return (
    <PreviewKitSection id="tabs" label="Tabs">
      <PreviewKitGroup label="segmented">
        <Tabs defaultValue="overview" className="w-[420px]">
          <TabsList>
            {TABS.map((tab) => (
              <TabsTab
                key={tab.value}
                value={tab.value}
                disabled={tab.value === "changelog"}
              >
                {tab.label}
              </TabsTab>
            ))}
          </TabsList>
          <PreviewTabsPanels />
        </Tabs>
      </PreviewKitGroup>
      <PreviewKitGroup label="underline">
        <Tabs
          defaultValue="components"
          variant="underline"
          className="w-[420px]"
        >
          <TabsList>
            {TABS.map((tab) => (
              <TabsTab
                key={tab.value}
                value={tab.value}
                disabled={tab.value === "changelog"}
              >
                {tab.label}
              </TabsTab>
            ))}
          </TabsList>
          <PreviewTabsPanels />
        </Tabs>
      </PreviewKitGroup>
    </PreviewKitSection>
  )
}

export { PreviewTabsBox }
