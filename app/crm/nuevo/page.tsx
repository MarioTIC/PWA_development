"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { useAppDispatch } from "@/lib/hooks"
import { addProspecto } from "@/lib/slices/prospectosSlice"
import { useToast } from "@/hooks/use-toast"
import type { Prospecto } from "@/lib/slices/prospectosSlice"
import { User } from "lucide-react"

export default function NuevoProspectoPage() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    nombre: "",
    empresa: "",
    telefono: "",
    email: "",
    ubicacion: "",
    estado: "Contacto inicial" as const,
    prioridad: "Media" as const,
    cultivos: [] as string[],
    notas: "",
  })

  const cultivosDisponibles = ["Frijol", "Maíz", "Sorgo", "Garbanzo"]

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleCultivoToggle = (cultivo: string) => {
    setFormData((prev) => ({
      ...prev,
      cultivos: prev.cultivos.includes(cultivo)
        ? prev.cultivos.filter((c) => c !== cultivo)
        : [...prev.cultivos, cultivo],
    }))
  }

  const handleSave = () => {
    if (!formData.nombre || !formData.empresa || !formData.telefono) {
      toast({
        title: "Campos requeridos",
        description: "Por favor completa los campos obligatorios",
        variant: "destructive",
      })
      return
    }

    const prospecto: Prospecto = {
      id: Date.now().toString(),
      ...formData,
      ultimoContacto: new Date().toISOString().split("T")[0],
      fechaCreacion: new Date().toISOString().split("T")[0],
    }

    dispatch(addProspecto(prospecto))

    toast({
      title: "Prospecto creado",
      description: "El prospecto se ha guardado correctamente",
    })

    router.push("/crm")
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header title="Nuevo Prospecto" showBack />

      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="space-y-6">
          {/* Información Personal */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-blue-500" />
                Información Personal
              \
