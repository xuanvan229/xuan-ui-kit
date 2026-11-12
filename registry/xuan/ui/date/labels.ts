type DateLabels = {
  today: string
  previousMonth: string
  nextMonth: string
  placeholder: string
  rangePlaceholder: string
  /** Seven names, Monday first. */
  weekdays: readonly string[]
}

const DATE_LABELS: DateLabels = {
  today: "Today",
  previousMonth: "Previous month",
  nextMonth: "Next month",
  placeholder: "Select date",
  rangePlaceholder: "Select dates",
  weekdays: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
}

/** Fills missing or undefined labels with the English defaults. */
function resolveDateLabels(labels: Partial<DateLabels> | null): DateLabels {
  return {
    today: labels?.today ?? DATE_LABELS.today,
    previousMonth: labels?.previousMonth ?? DATE_LABELS.previousMonth,
    nextMonth: labels?.nextMonth ?? DATE_LABELS.nextMonth,
    placeholder: labels?.placeholder ?? DATE_LABELS.placeholder,
    rangePlaceholder: labels?.rangePlaceholder ?? DATE_LABELS.rangePlaceholder,
    weekdays: labels?.weekdays ?? DATE_LABELS.weekdays,
  }
}

export { DATE_LABELS, resolveDateLabels }
export type { DateLabels }
