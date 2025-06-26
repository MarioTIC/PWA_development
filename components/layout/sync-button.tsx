"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useAppSelector, useAppDispatch } from "@/lib/hooks"
import { setSyncing, setLastSync } from "@/lib/slices/appSlice"
import { markAllAsSincronizado } from "@/lib/slices/visitasSlice"
import { RefreshCw, Check, AlertCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function SyncButton() {
  const dispatch = useAppDispatch()
  const { toast } = useToast()
  const { isOnline, syncing } = useAppSelector((state) => state.app)
  const { visitas } = useAppSelector((state) => state.visitas)
  const [syncStatus, setSyncStatus] = useState<"idle" | "success" | "error">("idle")

  const pendingVisitas = visitas.filter((v) => !v.sincronizado)

  const handleSync = async () => {
    if (!isOnline) {
      toast({
        title: "Sin conexión",
        description: "No es posible sincronizar sin conexión a internet",
        variant: "destructive",
      })
      return
    }

    if (pendingVisitas.length === 0) {
      toast({
        title: "Sin cambios",
        description: "No hay visitas pendientes por sincronizar",
      })
      return
    }

    dispatch(setSyncing(true))
    setSyncStatus("idle")

    try {
      // Simular sincronización con API
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Marcar todas las visitas como sincronizadas
      dispatch(markAllAsSincronizado())
      dispatch(setLastSync(new Date().toISOString()))

      setSyncStatus("success")
      toast({
        title: "Sincronización exitosa",
        description: `${pendingVisitas.length} visitas sincronizadas correctamente`,
      })
    } catch (error) {
      setSyncStatus("error")
      toast({
        title: "Error de sincronización",
        description: "No se pudieron sincronizar los datos. Intenta nuevamente.",
        variant: "destructive",
      })
    } finally {
      dispatch(setSyncing(false))
      setTimeout(() => setSyncStatus("idle"), 3000)
    }
  }

  const getIcon = () => {
    if (syncing) return <RefreshCw className="h-4 w-4 animate-spin" />
    if (syncStatus === "success") return <Check className="h-4 w-4" />
    if (syncStatus === "error") return <AlertCircle className="h-4 w-4" />
    return <RefreshCw className="h-4 w-4" />
  }

  const getVariant = () => {
    if (syncStatus === "success") return "default"
    if (syncStatus === "error") return "destructive"
    return "outline"
  }

  return (
    <Button
      onClick={handleSync}
      disabled={syncing || !isOnline}
      variant={getVariant()}
      size="sm"
      className="fixed bottom-4 right-4 z-50 shadow-lg"
    >
      {getIcon()}
      {syncing ? "Sincronizando..." : `Sincronizar ${pendingVisitas.length > 0 ? `(${pendingVisitas.length})` : ""}`}
    </Button>
  )
}
