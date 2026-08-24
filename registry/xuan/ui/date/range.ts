import type { DateKey } from "@/registry/xuan/ui/date/key"

type DateRangeState = { start: DateKey | null; end: DateKey | null }

function reduceDateRange(state: DateRangeState, key: DateKey): DateRangeState {
  if (state.start === null || state.end !== null)
    return { start: key, end: null }
  if (key < state.start) return { start: key, end: null }
  return { start: state.start, end: key }
}

function dateRangeBand(
  state: DateRangeState,
  key: DateKey
): "start" | "end" | "band" | null {
  if (state.start === key) return "start"
  if (state.end === key) return "end"
  if (
    state.start !== null &&
    state.end !== null &&
    key > state.start &&
    key < state.end
  )
    return "band"
  return null
}

function dateRangePreview(
  state: DateRangeState,
  hover: DateKey | null,
  key: DateKey
): boolean {
  if (state.start === null || state.end !== null || hover === null) return false
  return key > state.start && key <= hover
}

export { dateRangeBand, dateRangePreview, reduceDateRange }
export type { DateRangeState }
