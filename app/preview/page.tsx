import { PreviewAccordionBox } from "@/app/preview/accordion/box"
import { PreviewBadgeBox } from "@/app/preview/badge/box"
import { PreviewButtonBox } from "@/app/preview/button/box"
import { PreviewCheckboxBox } from "@/app/preview/checkbox/box"
import { PreviewDateBox } from "@/app/preview/date/box"
import { PreviewDialogBox } from "@/app/preview/dialog/box"
import { PreviewInputBox } from "@/app/preview/input/box"
import { PreviewMenuBox } from "@/app/preview/menu/box"
import { PreviewNav } from "@/app/preview/nav"
import { PreviewSelectBox } from "@/app/preview/select/box"
import { PreviewSwitchBox } from "@/app/preview/switch/box"
import { PreviewTableBox } from "@/app/preview/table/box"
import { PreviewTabsBox } from "@/app/preview/tabs/box"
import { PreviewToastBox } from "@/app/preview/toast/box"

// note: Next.js App Router requires a default export for page files.
export default function PreviewPage() {
  return (
    <div className="flex min-h-screen bg-background font-sans text-ink">
      <PreviewNav />
      <main className="flex min-w-0 flex-1 flex-col gap-16 px-8 py-12 lg:px-16">
        <header className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold text-ink-heading">
            Component preview
          </h1>
          <p className="text-sm text-ink-secondary">
            Every registry item, rendered in the states shown in the design
            references.
          </p>
        </header>
        <PreviewButtonBox />
        <PreviewInputBox />
        <PreviewSwitchBox />
        <PreviewCheckboxBox />
        <PreviewSelectBox />
        <PreviewDateBox />
        <PreviewTabsBox />
        <PreviewTableBox />
        <PreviewToastBox />
        <PreviewDialogBox />
        <PreviewMenuBox />
        <PreviewAccordionBox />
        <PreviewBadgeBox />
      </main>
    </div>
  )
}
