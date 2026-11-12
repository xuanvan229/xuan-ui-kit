import { cn } from "@/lib/utils"

type Align = "left" | "center" | "right"

function Table({ className, ...props }: React.ComponentProps<"table">) {
  return (
    <div
      data-slot="table-container"
      className="w-full overflow-x-auto rounded-xl border border-table-line bg-surface"
    >
      <table
        data-slot="table"
        className={cn(
          "w-full border-collapse font-sans text-sm text-ink",
          className
        )}
        {...props}
      />
    </div>
  )
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return (
    <thead
      data-slot="table-header"
      className={cn("bg-table-head", className)}
      {...props}
    />
  )
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return <tbody data-slot="table-body" className={cn(className)} {...props} />
}

function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        "bg-table-band [&_tr]:border-t [&_tr]:border-b-0",
        className
      )}
      {...props}
    />
  )
}

function TableRow({
  className,
  selected = false,
  ...props
}: React.ComponentProps<"tr"> & { selected?: boolean }) {
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

type TableHeadProps = Omit<React.ComponentProps<"th">, "onClick"> & {
  align?: Align
  sortable?: boolean
  direction?: "asc" | "desc" | null
  /** Runs on the sort button when sortable, on the cell otherwise. */
  onClick?: React.MouseEventHandler<HTMLElement>
}

const HEAD_CONTENT =
  "inline-flex items-center gap-1 group-data-[align=center]/head:justify-center group-data-[align=right]/head:justify-end"

function TableHead({
  className,
  children,
  align = "left",
  sortable = false,
  direction = null,
  onClick,
  ...props
}: TableHeadProps) {
  const content = (
    <>
      {children}
      {direction === null ? null : (
        <span aria-hidden="true">{direction === "asc" ? "↑" : "↓"}</span>
      )}
    </>
  )
  return (
    <th
      data-slot="table-head"
      data-align={align}
      data-sortable={sortable ? "true" : null}
      {...(sortable
        ? {
            "aria-sort":
              direction === "asc"
                ? "ascending"
                : direction === "desc"
                  ? "descending"
                  : "none",
          }
        : {})}
      className={cn(
        "group/head border-r border-table-hair p-3 text-left align-middle text-sm font-semibold text-ink-secondary transition-colors duration-[120ms] last:border-r-0 data-sortable:hover:text-ink data-[align=center]:text-center data-[align=right]:text-right",
        className
      )}
      onClick={sortable ? undefined : onClick}
      {...props}
    >
      {sortable ? (
        <button
          type="button"
          data-slot="table-sort"
          onClick={onClick}
          className={cn(
            HEAD_CONTENT,
            "flex w-full cursor-pointer rounded-xs font-semibold outline-none select-none focus-visible:focus-ring"
          )}
        >
          {content}
        </button>
      ) : (
        <span className={HEAD_CONTENT}>{content}</span>
      )}
    </th>
  )
}

type TableCellProps = React.ComponentProps<"td"> & {
  align?: Align
  mono?: boolean
}

function TableCell({
  className,
  align = "left",
  mono = false,
  ...props
}: TableCellProps) {
  return (
    <td
      data-slot="table-cell"
      data-align={align}
      data-mono={mono ? "true" : null}
      className={cn(
        "border-r border-table-hair p-3 align-middle last:border-r-0 data-mono:font-mono data-[align=center]:text-center data-[align=right]:text-right",
        className
      )}
      {...props}
    />
  )
}

export {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
}
