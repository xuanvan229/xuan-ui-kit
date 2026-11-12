"use client"

import * as React from "react"

import {
  PreviewKitGroup,
  PreviewKitSection,
  PreviewKitState,
} from "@/app/preview/kit/section"
import { Button } from "@/registry/xuan/ui/button"
import { Pagination } from "@/registry/xuan/ui/pagination/pagination"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/registry/xuan/ui/tooltip"

function PreviewPaginationBox() {
  const [page, setPage] = React.useState(5)
  return (
    <PreviewKitSection id="pagination" label="Pagination & Tooltip">
      <PreviewKitGroup label="pagination">
        <PreviewKitState caption="Collapsed ranges">
          <Pagination page={page} count={10} onPageChange={setPage} />
        </PreviewKitState>
        <PreviewKitState caption="Few pages">
          <Pagination page={1} count={3} onPageChange={() => {}} />
        </PreviewKitState>
      </PreviewKitGroup>
      <PreviewKitGroup label="tooltip">
        <PreviewKitState caption="Hover or focus">
          <Tooltip>
            <TooltipTrigger
              render={<Button variant="secondary">Copy link</Button>}
            />
            <TooltipContent>Copy to clipboard</TooltipContent>
          </Tooltip>
        </PreviewKitState>
        <PreviewKitState caption="Below the trigger">
          <Tooltip>
            <TooltipTrigger render={<Button variant="plain">Archive</Button>} />
            <TooltipContent side="bottom">Hide from the library</TooltipContent>
          </Tooltip>
        </PreviewKitState>
      </PreviewKitGroup>
    </PreviewKitSection>
  )
}

export { PreviewPaginationBox }
