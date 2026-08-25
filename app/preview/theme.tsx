"use client"

import * as React from "react"

import { Button } from "@/registry/xuan/ui/button"

const STORAGE_KEY = "xuan-theme"

type Theme = "light" | "dark"

function currentTheme(): Theme {
  if (typeof document === "undefined") return "light"
  return document.documentElement.classList.contains("dark") ? "dark" : "light"
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
  const [theme, setTheme] = React.useState<Theme>(currentTheme)
  const next: Theme = theme === "dark" ? "light" : "dark"
  return (
    <Button
      variant="secondary"
      size="compact"
      suppressHydrationWarning
      onClick={() => {
        applyTheme(next)
        setTheme(next)
      }}
    >
      {theme === "dark" ? "Light mode" : "Dark mode"}
    </Button>
  )
}

export { PreviewTheme }
