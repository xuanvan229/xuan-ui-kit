import { type DateKey, toDateKey } from "@/registry/xuan/ui/date/key"

const DATE_GRID_ROWS = 6

function buildDateGrid(year: number, month: number): DateKey[] {
  const offset = (new Date(year, month, 1).getDay() + 6) % 7
  return Array.from({ length: DATE_GRID_ROWS * 7 }, (_, index) =>
    toDateKey(new Date(year, month, index - offset + 1))
  )
}

export { buildDateGrid, DATE_GRID_ROWS }
