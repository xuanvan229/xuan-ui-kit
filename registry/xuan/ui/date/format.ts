const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
]
const DASH = " – "

function monthDay(date: Date): string {
  return `${MONTHS[date.getMonth()] ?? ""} ${date.getDate()}`
}

function formatDateLabel(date: Date | null): string {
  return date === null
    ? "Select date"
    : `${monthDay(date)}, ${date.getFullYear()}`
}

function formatDateRangeLabel(start: Date | null, end: Date | null): string {
  if (start === null) return "Select dates"
  if (end === null) return `${monthDay(start)}${DASH}…`
  if (start.getFullYear() !== end.getFullYear()) {
    return `${monthDay(start)}, ${start.getFullYear()}${DASH}${monthDay(end)}, ${end.getFullYear()}`
  }
  if (start.getMonth() !== end.getMonth()) {
    return `${monthDay(start)}${DASH}${monthDay(end)}, ${end.getFullYear()}`
  }
  return `${monthDay(start)}${DASH}${end.getDate()}, ${end.getFullYear()}`
}

export { formatDateLabel, formatDateRangeLabel }
