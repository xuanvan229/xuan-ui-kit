"use client"

import * as React from "react"

import { Badge, BadgeDot } from "@/registry/xuan/ui/badge"
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/registry/xuan/ui/breadcrumb"
import { Tag, TagRemove, TagReset } from "@/registry/xuan/ui/tag"
import {
  PreviewKitGroup,
  PreviewKitSection,
  PreviewKitState,
} from "@/app/preview/kit/section"

const TINTED = ["neutral", "info", "success", "warning", "error"] as const

const DOTS = [
  { tone: "neutral", label: "Draft" },
  { tone: "warning", label: "In review" },
  { tone: "success", label: "Stable" },
  { tone: "error", label: "Deprecated" },
] as const

const ALL_TAGS = ["datepicker", "range", "calendar", "form"]

function PreviewBadgeBox() {
  const [tags, setTags] = React.useState(ALL_TAGS)

  return (
    <PreviewKitSection id="badge" label="Breadcrumb, Badge & Tag">
      <PreviewKitGroup
        label="breadcrumb"
        className="flex-col items-start gap-6"
      >
        <PreviewKitState caption="Full trail">
          <Breadcrumb>
            <BreadcrumbItem>
              <BreadcrumbLink href="#badge">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="#badge">Design system</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="#badge">Components</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Date Picker</BreadcrumbPage>
            </BreadcrumbItem>
          </Breadcrumb>
        </PreviewKitState>
        <PreviewKitState caption="Collapsed">
          <Breadcrumb>
            <BreadcrumbItem>
              <BreadcrumbLink href="#badge">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbEllipsis />
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="#badge">Components</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Date Picker</BreadcrumbPage>
            </BreadcrumbItem>
          </Breadcrumb>
        </PreviewKitState>
      </PreviewKitGroup>
      <PreviewKitGroup label="badge — tinted" className="gap-3">
        {TINTED.map((variant) => (
          <Badge key={variant} variant={variant} className="capitalize">
            {variant}
          </Badge>
        ))}
      </PreviewKitGroup>
      <PreviewKitGroup label="badge — with dot" className="gap-3">
        {DOTS.map((dot) => (
          <Badge key={dot.tone} variant="outline">
            <BadgeDot tone={dot.tone} />
            {dot.label}
          </Badge>
        ))}
      </PreviewKitGroup>
      <PreviewKitGroup label="tag — removable" className="gap-2">
        {tags.map((tag) => (
          <Tag key={tag}>
            {tag}
            <TagRemove
              aria-label={`Remove ${tag}`}
              onClick={() =>
                setTags((current) => current.filter((item) => item !== tag))
              }
            />
          </Tag>
        ))}
        {tags.length === ALL_TAGS.length ? null : (
          <TagReset onClick={() => setTags(ALL_TAGS)}>Reset</TagReset>
        )}
      </PreviewKitGroup>
    </PreviewKitSection>
  )
}

export { PreviewBadgeBox }
