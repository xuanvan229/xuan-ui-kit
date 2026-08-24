"use client"

import * as React from "react"
import { Tabs as TabsPrimitive } from "@base-ui/react/tabs"

import { cn } from "@/lib/utils"

type TabsVariant = "segmented" | "underline"

const TabsVariantContext = React.createContext<TabsVariant>("segmented")

function Tabs({ className, variant = "segmented", ...props }: TabsPrimitive.Root.Props & { variant?: TabsVariant }) {
  return (
    <TabsVariantContext.Provider value={variant}>
      <TabsPrimitive.Root
        data-slot="tabs"
        data-variant={variant}
        className={cn("flex flex-col gap-4", className)}
        {...props}
      />
    </TabsVariantContext.Provider>
  )
}

function TabsList({ className, ...props }: TabsPrimitive.List.Props) {
  const variant = React.useContext(TabsVariantContext)
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      data-variant={variant}
      className={cn(
        variant === "segmented"
          ? "inline-flex w-fit gap-1 rounded-xl border border-line-control bg-fill-hover p-1"
          : "flex w-fit gap-7 border-b border-line-control",
        className
      )}
      {...props}
    />
  )
}

function TabsTab({ className, ...props }: TabsPrimitive.Tab.Props) {
  const variant = React.useContext(TabsVariantContext)
  return (
    <TabsPrimitive.Tab
      data-slot="tabs-tab"
      className={cn(
        "cursor-pointer font-sans font-medium text-ink-secondary outline-none select-none focus-visible:focus-ring data-disabled:cursor-not-allowed data-disabled:text-ink-disabled",
        variant === "segmented"
          ? "h-8 rounded-md px-3.5 text-sm transition-[background-color,color] duration-[120ms] ease-in not-data-active:not-data-disabled:hover:bg-fill-active not-data-active:not-data-disabled:hover:text-ink data-active:bg-accent-500 data-active:text-white data-active:text-shadow-tab data-active:bevel-tab"
          : "relative px-0.5 pt-2.5 pb-3 text-[15px] transition-colors duration-[120ms] ease-in not-data-disabled:hover:text-ink focus-visible:rounded-sm data-active:font-semibold data-active:text-accent-700 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:origin-left after:scale-x-0 after:rounded-[1px] after:bg-accent-500 after:transition-transform after:duration-150 after:ease-out data-active:after:scale-x-100",
        className
      )}
      {...props}
    />
  )
}

function TabsPanel({ className, ...props }: TabsPrimitive.Panel.Props) {
  return <TabsPrimitive.Panel data-slot="tabs-panel" className={cn("outline-none", className)} {...props} />
}

export { Tabs, TabsList, TabsPanel, TabsTab }
