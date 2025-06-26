"use client"

import type React from "react"
import { Provider } from "react-redux"
import { store } from "@/lib/store"
import { ThemeProvider } from "./theme-provider"
import { OnlineStatusProvider } from "./online-status-provider"
import { StateLoader } from "./state-loader"
import { ThemeController } from "./theme-controller"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
        <OnlineStatusProvider>
          <StateLoader>
            <ThemeController />
            {children}
          </StateLoader>
        </OnlineStatusProvider>
      </ThemeProvider>
    </Provider>
  )
}
