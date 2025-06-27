"use client"

import { Header } from "@/components/layout/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { useAppSelector, useAppDispatch } from "@/lib/hooks"
import { toggleDarkMode } from "@/lib/slices/appSlice"
import { useToast } from "@/hooks/use-toast"
import { Moon, Sun, Database, Wifi, Download, Trash2, Info, Settings, Smartphone } from "lucide-react"

export default function ConfiguracionPage() {
  const dispatch = useAppDispatch()
  const { toast } = useToast()
  const { darkMode, isOnline, lastSync } = useAppSelector((state) => state.app)
  const { visitas } = useAppSelector((state) => state.visitas)
  const { productores } = useAppSelector((state) => state.productores)

  const handleToggleDarkMode = () => {
    dispatch(toggleDarkMode())
    toast({
      title: "Tema cambiado",
      description: `Modo ${!darkMode ? "oscuro" : "claro"} activado`,
    })
  }

  const handleClearData = () => {
    if (confirm("¿Estás seguro de que deseas eliminar todos los datos locales? Esta acción no se puede deshacer.")) {
      localStorage.clear()
      window.location.reload()
    }
  }

  const handleExportData = () => {
    const data = {
      visitas,
      productores,
      exportDate: new Date().toISOString(),
    }

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `purp-backup-${new Date().toISOString().split("T")[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast({
      title: "Datos exportados",
      description: "El respaldo se ha descargado correctamente",
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header title="Configuración" showBack />

      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="space-y-6">
          {/* Apariencia */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Apariencia
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {darkMode ? <Moon className="h-5 w-5 text-blue-500" /> : <Sun className="h-5 w-5 text-yellow-500" />}
                  <div>
                    <Label htmlFor="dark-mode" className="text-base font-medium">
                      Modo Oscuro
                    </Label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Cambiar entre tema claro y oscuro</p>
                  </div>
                </div>
                <Switch id="dark-mode" checked={darkMode} onCheckedChange={handleToggleDarkMode} />
              </div>
            </CardContent>
          </Card>

          {/* Estado de la Aplicación */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5" />
                Estado de la Aplicación
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Wifi className="h-5 w-5" />
                  <div>
                    <Label className="text-base font-medium">Estado de Conexión</Label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Conexión actual a internet</p>
                  </div>
                </div>
                <Badge variant={isOnline ? "default" : "destructive"}>{isOnline ? "Online" : "Offline"}</Badge>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Database className="h-5 w-5" />
                  <div>
                    <Label className="text-base font-medium">Última Sincronización</Label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {lastSync ? new Date(lastSync).toLocaleString() : "Nunca sincronizado"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Smartphone className="h-5 w-5" />
                  <div>
                    <Label className="text-base font-medium">Modo PWA</Label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Aplicación web progresiva instalada</p>
                  </div>
                </div>
                <Badge variant="secondary">Activo</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Datos Locales */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Gestión de Datos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{productores.length}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Productores</p>
                </div>
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{visitas.length}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Visitas</p>
                </div>
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {visitas.filter((v) => !v.sincronizado).length}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Pendientes</p>
                </div>
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {Math.round((localStorage.getItem("agritech-state")?.length || 0) / 1024)}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">KB Usados</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button onClick={handleExportData} variant="outline" className="flex-1">
                  <Download className="h-4 w-4 mr-2" />
                  Exportar Datos
                </Button>
                <Button onClick={handleClearData} variant="destructive" className="flex-1">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Limpiar Datos
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Información de la App */}
          <Card>
            <CardHeader>
              <CardTitle>Información de la Aplicación</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex justify-between">
                  <span>Versión:</span>
                  <span>1.0.0</span>
                </div>
                <div className="flex justify-between">
                  <span>Última actualización:</span>
                  <span>Junio 2025</span>
                </div>
                <div className="flex justify-between">
                  <span>Desarrollado por:</span>
                  <span>PURP TIC</span>
                </div>
                <div className="flex justify-between">
                  <span>Soporte:</span>
                  <span>soporte@purp.com</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
