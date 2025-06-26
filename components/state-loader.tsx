"use client"

import type React from "react"
import { useEffect } from "react"
import { useAppDispatch } from "@/lib/hooks"
import { loadState } from "@/lib/store"
import { setProductores } from "@/lib/slices/productoresSlice"
import { setVisitas } from "@/lib/slices/visitasSlice"
import { setAppState } from "@/lib/slices/appSlice"
import { setAuthState } from "@/lib/slices/authSlice"

export function StateLoader({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const savedState = loadState()
    if (savedState) {
      if (savedState.productores) {
        dispatch(setProductores(savedState.productores))
      }
      if (savedState.visitas) {
        dispatch(setVisitas(savedState.visitas))
      }
      if (savedState.app) {
        dispatch(setAppState(savedState.app))
      }
      if (savedState.auth) {
        dispatch(setAuthState(savedState.auth))
      }
      // Los nuevos slices se cargarán automáticamente desde localStorage
    }
  }, [dispatch])

  return <>{children}</>
}
