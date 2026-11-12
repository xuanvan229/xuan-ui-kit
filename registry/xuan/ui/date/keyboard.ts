import {
  type DateKey,
  fromDateKey,
  shiftDateKey,
  shiftDateKeyMonth,
} from "@/registry/xuan/ui/date/key"

const ARROW_STEPS: Record<string, number> = {
  ArrowLeft: -1,
  ArrowRight: 1,
  ArrowUp: -7,
  ArrowDown: 7,
}
const MAX_SKIPS = 366

function weekdayIndex(key: DateKey): number {
  return (fromDateKey(key).getDay() + 6) % 7
}

function jumpDateKey(key: DateKey, eventKey: string): DateKey | null {
  switch (eventKey) {
    case "Home":
      return shiftDateKey(key, -weekdayIndex(key))
    case "End":
      return shiftDateKey(key, 6 - weekdayIndex(key))
    case "PageUp":
      return shiftDateKeyMonth(key, -1)
    case "PageDown":
      return shiftDateKeyMonth(key, 1)
    default:
      return null
  }
}

/**
 * The day a key press moves focus to: `null` when the key is not a navigation
 * key, the starting day when the move is blocked. Arrow keys skip disabled days.
 */
function moveDateKey(
  key: DateKey,
  eventKey: string,
  isDisabled: (key: DateKey) => boolean
): DateKey | null {
  const step = ARROW_STEPS[eventKey] ?? null
  if (step === null) {
    const jump = jumpDateKey(key, eventKey)
    return jump === null ? null : isDisabled(jump) ? key : jump
  }
  let target = shiftDateKey(key, step)
  for (let skips = 0; isDisabled(target); skips++) {
    if (skips === MAX_SKIPS) return key
    target = shiftDateKey(target, step)
  }
  return target
}

export { moveDateKey }
