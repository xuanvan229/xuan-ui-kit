const DASH = " – "

function monthDay(date: Date, locale: string): string {
  return date.toLocaleDateString(locale, { month: "short", day: "numeric" })
}

function formatDateLabel(
  date: Date | null,
  locale: string,
  placeholder: string
): string {
  return date === null
    ? placeholder
    : `${monthDay(date, locale)}, ${date.getFullYear()}`
}

// note: the range pattern keeps the English order (month day – day, year);
// only month names follow the locale.
function formatDateRangeLabel(
  start: Date | null,
  end: Date | null,
  locale: string,
  placeholder: string
): string {
  if (start === null) return placeholder
  if (end === null) return `${monthDay(start, locale)}${DASH}…`
  if (start.getFullYear() !== end.getFullYear()) {
    return `${monthDay(start, locale)}, ${start.getFullYear()}${DASH}${monthDay(end, locale)}, ${end.getFullYear()}`
  }
  if (start.getMonth() !== end.getMonth()) {
    return `${monthDay(start, locale)}${DASH}${monthDay(end, locale)}, ${end.getFullYear()}`
  }
  return `${monthDay(start, locale)}${DASH}${end.getDate()}, ${end.getFullYear()}`
}

export { formatDateLabel, formatDateRangeLabel }
