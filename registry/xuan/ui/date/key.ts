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

export { dateKeyDiff, dateKeyMonth, dateKeyYear, fromDateKey, toDateKey }
export type { DateKey }
