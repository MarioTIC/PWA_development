"use client"

import { useEffect } from "react"
import { useTheme } from "next-themes"
import { useAppSelector } from "@/lib/hooks"

export function ThemeController() {
  const { setTheme } = useTheme()
  const { darkMode } = useAppSelector((state) => state.app)

  // Only sync Redux state to next-themes, not the other way around
  useEffect(() => {
    setTheme(darkMode ? "dark" : "light")
  }, [darkMode, setTheme])

  return null
}
