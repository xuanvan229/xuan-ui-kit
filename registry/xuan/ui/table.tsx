import { cn } from "@/lib/utils"

type Align = "left" | "center" | "right"

function Table({ className, ...props }: React.ComponentProps<"table">) {
  return (
    <div
      data-slot="table-container"
      className="w-full overflow-x-auto rounded-[14px] border border-table-line bg-white"
    >
      <table
        data-slot="table"
        className={cn("w-full border-collapse font-sans text-sm text-ink", className)}
        {...props}
      />
    </div>
  )
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return <thead data-slot="table-header" className={cn("bg-table-band", className)} {...props} />
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return <tbody data-slot="table-body" className={cn(className)} {...props} />
}

function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn("bg-table-band [&_tr]:border-t [&_tr]:border-b-0", className)}
      {...props}
    />
  )
}

function TableRow({ className, selected = false, ...props }: React.ComponentProps<"tr"> & { selected?: boolean }) {
  return (
    <tr
      data-slot="table-row"
      data-selected={selected ? "true" : null}
      className={cn(
        "border-b border-table-hair transition-[background-color] duration-[120ms] ease-in last:border-b-0 hover:bg-table-band data-selected:bg-accent-tint-96 data-selected:hover:bg-accent-tint-96",
        className
      )}
      {...props}
    />
  )
}

type TableHeadProps = React.ComponentProps<"th"> & {
  align?: Align
  sortable?: boolean
  direction?: "asc" | "desc" | null
}

function TableHead({ className, children, align = "left", sortable = false, direction = null, ...props }: TableHeadProps) {
  return (
    <th
      data-slot="table-head"
      data-align={align}
      data-sortable={sortable ? "true" : null}
      aria-sort={direction === "asc" ? "ascending" : direction === "desc" ? "descending" : "none"}
      className={cn(
        "border-r border-table-hair px-3.5 py-3 text-left align-middle text-sm font-normal text-ink-secondary transition-colors duration-[120ms] last:border-r-0 data-[align=center]:text-center data-[align=right]:text-right data-sortable:cursor-pointer data-sortable:select-none data-sortable:hover:text-ink",
        className
      )}
      {...props}
    >
      <span className="inline-flex items-center gap-1">
        {children}
        {direction === null ? null : <span aria-hidden="true">{direction === "asc" ? "↑" : "↓"}</span>}
      </span>
    </th>
  )
}

type TableCellProps = React.ComponentProps<"td"> & { align?: Align; mono?: boolean }

function TableCell({ className, align = "left", mono = false, ...props }: TableCellProps) {
  return (
    <td
      data-slot="table-cell"
      data-align={align}
      data-mono={mono ? "true" : null}
      className={cn(
        "border-r border-table-hair px-3.5 py-2.5 align-middle last:border-r-0 data-[align=center]:text-center data-[align=right]:text-right data-mono:font-mono",
        className
      )}
      {...props}
    />
  )
}

export { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow }
