type PreviewTableStatus = "Stable" | "Review" | "Draft"

type PreviewTableRow = {
  id: number
  name: string
  owner: string
  initials: string
  status: PreviewTableStatus
  updated: string
  sort: number
}

const previewTableRows: PreviewTableRow[] = [
  {
    id: 1,
    name: "Date Picker",
    owner: "An Nguyen",
    initials: "AN",
    status: "Stable",
    updated: "Aug 24, 2026",
    sort: 20260824,
  },
  {
    id: 2,
    name: "Button",
    owner: "An Nguyen",
    initials: "AN",
    status: "Stable",
    updated: "Aug 22, 2026",
    sort: 20260822,
  },
  {
    id: 3,
    name: "Input",
    owner: "Minh Tran",
    initials: "MT",
    status: "Review",
    updated: "Aug 21, 2026",
    sort: 20260821,
  },
  {
    id: 4,
    name: "Checkbox & Radio",
    owner: "Minh Tran",
    initials: "MT",
    status: "Review",
    updated: "Aug 20, 2026",
    sort: 20260820,
  },
  {
    id: 5,
    name: "Tabs",
    owner: "Linh Pham",
    initials: "LP",
    status: "Draft",
    updated: "Aug 19, 2026",
    sort: 20260819,
  },
  {
    id: 6,
    name: "Table",
    owner: "Linh Pham",
    initials: "LP",
    status: "Draft",
    updated: "Aug 18, 2026",
    sort: 20260818,
  },
]

const previewTableBadge = {
  Stable: "success",
  Review: "warning",
  Draft: "neutral",
} as const

export { previewTableBadge, previewTableRows }
export type { PreviewTableRow, PreviewTableStatus }
