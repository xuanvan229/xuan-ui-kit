import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
} from "@/registry/xuan/ui/accordion"
import { PreviewKitGroup, PreviewKitSection } from "@/app/preview/kit/section"

const ITEMS = [
  {
    value: "what",
    title: "What is this design system?",
    body: "A component library built on a hue-210 blue palette with IBM Plex Sans, 10px radii and a consistent 40px control height. It covers form controls, overlays, navigation and data display.",
  },
  {
    value: "included",
    title: "Which components are included?",
    body: "Button, Input, Textarea, Checkbox, Radio, Switch, Select, Date Picker, Tabs, Table, Toast, Modal, Dropdown, Popover, Accordion, Breadcrumb and Badge — each with full state specs.",
  },
  {
    value: "focus",
    title: "How do focus states work?",
    body: "Every interactive control uses the same focus treatment: a 1px hue-210 border plus a 3px outline at rgba(0,115,230,0.5) with 2px offset. This keeps keyboard navigation visually consistent.",
  },
  {
    value: "base-ui",
    title: "Can I use it with Base UI?",
    body: "Yes. The anatomy of each component maps 1:1 to Base UI parts — triggers, popups, items and indicators — so the styles drop straight onto the unstyled primitives.",
  },
] as const

function PreviewAccordionBox() {
  return (
    <PreviewKitSection id="accordion" label="Accordion">
      <PreviewKitGroup label="single open">
        <Accordion defaultValue={["what"]} className="w-[520px] max-w-full">
          {ITEMS.map((item) => (
            <AccordionItem key={item.value} value={item.value}>
              <AccordionTrigger>{item.title}</AccordionTrigger>
              <AccordionPanel>{item.body}</AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </PreviewKitGroup>
    </PreviewKitSection>
  )
}

export { PreviewAccordionBox }
