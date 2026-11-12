import { buildPaginationPages } from "@/registry/xuan/ui/pagination/pages"

type PaginationLabels = {
  navigation: string
  previous: string
  next: string
  page: (page: number) => string
}

const PAGINATION_LABELS: PaginationLabels = {
  navigation: "Pagination",
  previous: "Previous page",
  next: "Next page",
  page: (page) => `Page ${page}`,
}

const PAGE_BUTTON =
  "flex size-8 cursor-pointer items-center justify-center rounded-md font-sans text-sm font-medium text-ink transition-control outline-none hover:bg-fill-active focus-visible:focus-ring disabled:cursor-not-allowed disabled:text-ink-disabled disabled:hover:bg-transparent aria-[current=page]:bg-accent-500 aria-[current=page]:text-on-accent"

type PaginationProps = Omit<React.ComponentProps<"nav">, "children"> & {
  /** Current page, starting at 1. */
  page: number
  count: number
  onPageChange: (page: number) => void
  siblings?: number
  labels?: Partial<PaginationLabels>
}

function Pagination({
  page,
  count,
  onPageChange,
  siblings = 1,
  labels: labelOverrides,
  className,
  ...props
}: PaginationProps) {
  // note: explicit fallbacks, so a label passed as undefined keeps its default.
  const labels: PaginationLabels = {
    navigation: labelOverrides?.navigation ?? PAGINATION_LABELS.navigation,
    previous: labelOverrides?.previous ?? PAGINATION_LABELS.previous,
    next: labelOverrides?.next ?? PAGINATION_LABELS.next,
    page: labelOverrides?.page ?? PAGINATION_LABELS.page,
  }
  return (
    <nav
      data-slot="pagination"
      aria-label={labels.navigation}
      className={className}
      {...props}
    >
      <ul className="flex items-center gap-1">
        <li>
          <button
            type="button"
            aria-label={labels.previous}
            disabled={page <= 1}
            onClick={() => onPageChange(page - 1)}
            className={PAGE_BUTTON}
          >
            <PaginationChevron direction="left" />
          </button>
        </li>
        {buildPaginationPages(page, count, siblings).map((entry) => (
          <li key={entry}>
            {typeof entry === "number" ? (
              <button
                type="button"
                aria-label={labels.page(entry)}
                aria-current={entry === page ? "page" : undefined}
                onClick={() => onPageChange(entry)}
                className={PAGE_BUTTON}
              >
                {entry}
              </button>
            ) : (
              <span
                aria-hidden="true"
                className="flex size-8 items-center justify-center text-sm text-ink-muted"
              >
                …
              </span>
            )}
          </li>
        ))}
        <li>
          <button
            type="button"
            aria-label={labels.next}
            disabled={page >= count}
            onClick={() => onPageChange(page + 1)}
            className={PAGE_BUTTON}
          >
            <PaginationChevron direction="right" />
          </button>
        </li>
      </ul>
    </nav>
  )
}

function PaginationChevron({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path
        d={
          direction === "left"
            ? "M14.5 6.5L9 12l5.5 5.5"
            : "M9.5 6.5L15 12l-5.5 5.5"
        }
      />
    </svg>
  )
}

export { Pagination }
export type { PaginationLabels }
