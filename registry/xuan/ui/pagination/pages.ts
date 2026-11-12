type PaginationEntry = number | "ellipsis-start" | "ellipsis-end"

function range(from: number, to: number): number[] {
  return Array.from({ length: Math.max(to - from + 1, 0) }, (_, i) => from + i)
}

/**
 * Pages to show for `page` of `count`: first, last, the current page with
 * `siblings` on each side, and an ellipsis for each range that hides two or
 * more pages. The list keeps the same length for every page.
 */
function buildPaginationPages(
  page: number,
  count: number,
  siblings = 1
): PaginationEntry[] {
  const window = siblings * 2
  if (count <= window + 5) return range(1, count)
  const current = Math.min(Math.max(page, 1), count)
  const start = Math.max(Math.min(current - siblings, count - window - 2), 3)
  const end = Math.min(Math.max(current + siblings, window + 3), count - 2)
  return [
    1,
    start > 3 ? "ellipsis-start" : 2,
    ...range(start, end),
    end < count - 2 ? "ellipsis-end" : count - 1,
    count,
  ]
}

export { buildPaginationPages }
