"use client"

import { Checkbox } from "@/registry/xuan/ui/checkbox"
import { TableHead, TableHeader, TableRow } from "@/registry/xuan/ui/table"

type PreviewTableSortKey = "name" | "updated"

type PreviewTableHeadProps = {
  all: boolean
  some: boolean
  onToggleAll: (checked: boolean) => void
  directionOf: (key: PreviewTableSortKey) => "asc" | "desc" | null
  onSort: (key: PreviewTableSortKey) => void
}

function PreviewTableHead({
  all,
  some,
  onToggleAll,
  directionOf,
  onSort,
}: PreviewTableHeadProps) {
  return (
    <TableHeader>
      <TableRow>
        <TableHead className="w-[52px] px-0 text-center">
          <Checkbox
            className="mx-auto"
            aria-label="Select all rows"
            checked={all}
            indeterminate={some}
            onCheckedChange={onToggleAll}
          />
        </TableHead>
        <TableHead
          className="w-[268px]"
          sortable
          direction={directionOf("name")}
          onClick={() => onSort("name")}
        >
          Component
        </TableHead>
        <TableHead>Owner</TableHead>
        <TableHead className="w-[134px]">Status</TableHead>
        <TableHead
          className="w-[134px] [&>span]:justify-end"
          align="right"
          sortable
          direction={directionOf("updated")}
          onClick={() => onSort("updated")}
        >
          Updated
        </TableHead>
        <TableHead className="w-16" />
      </TableRow>
    </TableHeader>
  )
}

export { PreviewTableHead }
export type { PreviewTableSortKey }
