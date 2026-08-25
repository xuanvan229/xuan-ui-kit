"use client"

import * as React from "react"
import { MoreHorizontalIcon } from "lucide-react"

import { Avatar, AvatarFallback } from "@/registry/xuan/ui/avatar"
import { Badge } from "@/registry/xuan/ui/badge"
import { Checkbox } from "@/registry/xuan/ui/checkbox"
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableRow,
} from "@/registry/xuan/ui/table"
import {
  PreviewTableHead,
  type PreviewTableSortKey,
} from "@/app/preview/table/head"
import { previewTableBadge, previewTableRows } from "@/app/preview/table/rows"
import { PreviewKitGroup, PreviewKitSection } from "@/app/preview/kit/section"

function PreviewTableBox() {
  const [selected, setSelected] = React.useState<number[]>([1])
  const [sort, setSort] = React.useState<{
    key: PreviewTableSortKey
    dir: 1 | -1
  }>({
    key: "name",
    dir: 1,
  })

  const rows = [...previewTableRows].sort((a, b) =>
    sort.key === "name"
      ? a.name.localeCompare(b.name) * sort.dir
      : (a.sort - b.sort) * sort.dir
  )
  const all = selected.length === previewTableRows.length
  const some = selected.length > 0 && !all
  const toggleSort = (key: PreviewTableSortKey) =>
    setSort((current) => ({
      key,
      dir: current.key === key ? ((current.dir * -1) as 1 | -1) : 1,
    }))
  const directionOf = (key: PreviewTableSortKey) =>
    sort.key === key ? (sort.dir === 1 ? "asc" : "desc") : null

  return (
    <PreviewKitSection id="table" label="Table">
      <PreviewKitGroup label="selectable rows">
        <div className="w-[840px] max-w-full">
          <Table className="table-fixed">
            <PreviewTableHead
              all={all}
              some={some}
              onToggleAll={(checked) =>
                setSelected(
                  checked ? previewTableRows.map((row) => row.id) : []
                )
              }
              directionOf={directionOf}
              onSort={toggleSort}
            />
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id} selected={selected.includes(row.id)}>
                  <TableCell className="px-0 text-center">
                    <Checkbox
                      className="mx-auto"
                      aria-label={`Select ${row.name}`}
                      checked={selected.includes(row.id)}
                      onCheckedChange={(checked) =>
                        setSelected((current) =>
                          checked
                            ? [...current, row.id]
                            : current.filter((id) => id !== row.id)
                        )
                      }
                    />
                  </TableCell>
                  <TableCell mono className="text-sm font-medium">
                    {row.name}
                  </TableCell>
                  <TableCell>
                    <span className="flex items-center gap-2 text-sm text-ink-subtle">
                      <Avatar>
                        <AvatarFallback>{row.initials}</AvatarFallback>
                      </Avatar>
                      {row.owner}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge variant={previewTableBadge[row.status]}>
                      {row.status}
                    </Badge>
                  </TableCell>
                  <TableCell mono align="right" className="text-[13.5px]">
                    {row.updated}
                  </TableCell>
                  <TableCell className="text-center">
                    <button
                      type="button"
                      aria-label={`Actions for ${row.name}`}
                      className="mx-auto flex size-[26px] cursor-pointer items-center justify-center rounded-sm text-ink-secondary transition-control outline-none hover:bg-table-hair hover:text-ink focus-visible:focus-ring"
                    >
                      <MoreHorizontalIcon size={15} />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell className="border-r-0" />
                <TableCell className="border-r-0 py-3 text-[15px] font-semibold text-ink-heading">
                  Total
                </TableCell>
                <TableCell className="border-r-0" />
                <TableCell className="border-r-0" />
                <TableCell
                  mono
                  align="right"
                  className="border-r-0 py-3 text-[13.5px] font-medium text-ink-heading"
                >
                  {selected.length > 0
                    ? `${selected.length} / ${previewTableRows.length} selected`
                    : `${previewTableRows.length} components`}
                </TableCell>
                <TableCell className="border-r-0" />
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </PreviewKitGroup>
    </PreviewKitSection>
  )
}

export { PreviewTableBox }
