"use client"

import * as React from "react"

import { Button } from "@/registry/xuan/ui/button"

const STORAGE_KEY = "xuan-theme"

type Theme = "light" | "dark"

function readTheme(): Theme {
  return document.documentElement.classList.contains("dark") ? "dark" : "light"
}

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange)
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  })
  return () => observer.disconnect()
}

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark")
  try {
    localStorage.setItem(STORAGE_KEY, theme)
  } catch {
    // note: storage can be unavailable (private mode); the class still applies for this page view.
  }
}

function PreviewTheme() {
  const theme = React.useSyncExternalStore(
    subscribe,
    readTheme,
    () => "light" as Theme
  )
  const next: Theme = theme === "dark" ? "light" : "dark"
  return (
    <Button variant="secondary" size="compact" onClick={() => applyTheme(next)}>
      {theme === "dark" ? "Light mode" : "Dark mode"}
    </Button>
  )
}

export { PreviewTheme }
