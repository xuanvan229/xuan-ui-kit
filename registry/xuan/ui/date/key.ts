type DateKey = number

const DAY_MS = 86_400_000

function toDateKey(date: Date): DateKey {
  return (
    date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate()
  )
}

function dateKeyYear(key: DateKey): number {
  return Math.floor(key / 10000)
}

function dateKeyMonth(key: DateKey): number {
  return Math.floor((key % 10000) / 100) - 1
}

function fromDateKey(key: DateKey): Date {
  return new Date(dateKeyYear(key), dateKeyMonth(key), key % 100)
}

function dateKeyDiff(from: DateKey, to: DateKey): number {
  return Math.round(
    (fromDateKey(to).getTime() - fromDateKey(from).getTime()) / DAY_MS
  )
}

function shiftDateKey(key: DateKey, days: number): DateKey {
  return toDateKey(
    new Date(dateKeyYear(key), dateKeyMonth(key), (key % 100) + days)
  )
}

/** Same day in another month, clamped to that month's last day. */
function shiftDateKeyMonth(key: DateKey, months: number): DateKey {
  const year = dateKeyYear(key)
  const month = dateKeyMonth(key) + months
  const lastDay = new Date(year, month + 1, 0).getDate()
  return toDateKey(new Date(year, month, Math.min(key % 100, lastDay)))
}

export {
  dateKeyDiff,
  dateKeyMonth,
  dateKeyYear,
  fromDateKey,
  shiftDateKey,
  shiftDateKeyMonth,
  toDateKey,
}
export type { DateKey }
