"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAppDispatch } from "@/lib/hooks"
import { loginSuccess, setLoading } from "@/lib/slices/authSlice"
import { useToast } from "@/hooks/use-toast"
import { Eye, EyeOff } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { toast } = useToast()
  const [code, setCode] = useState("")
  const [showCode, setShowCode] = useState(false)
  const [loading, setLoadingState] = useState(false)

  // Códigos válidos para demo
  const validCodes = {
    "7917": "tecnico",
    "1234": "manager",
    "5678": "tecnico",
  }

  const handleLogin = async () => {
    if (!code) {
      toast({
        title: "Código requerido",
        description: "Por favor ingresa tu código de acceso",
        variant: "destructive",
      })
      return
    }

    setLoadingState(true)
    dispatch(setLoading(true))

    // Simular validación del código
    await new Promise((resolve) => setTimeout(resolve, 1500))

    if (validCodes[code as keyof typeof validCodes]) {
      const role = validCodes[code as keyof typeof validCodes] as "tecnico" | "manager"

      dispatch(loginSuccess({ code, role }))

      toast({
        title: "Acceso autorizado",
        description: `Bienvenido al sistema PURP`,
      })

      router.push("/")
    } else {
      toast({
        title: "Código inválido",
        description: "El código ingresado no es válido. Intenta nuevamente.",
        variant: "destructive",
      })
    }

    setLoadingState(false)
    dispatch(setLoading(false))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleLogin()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="mx-auto w-48 h-48 mb-6">
            <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center shadow-2xl border-4 border-white">
              <div className="text-center">
                {/* Iconos de trigo */}
                <div className="flex justify-center gap-1 mb-2">
                  <div className="w-3 h-8 bg-gradient-to-t from-yellow-600 to-yellow-400 rounded-sm"></div>
                  <div className="w-3 h-10 bg-gradient-to-t from-yellow-600 to-yellow-400 rounded-sm"></div>
                  <div className="w-3 h-8 bg-gradient-to-t from-yellow-600 to-yellow-400 rounded-sm"></div>
                </div>
                {/* Texto PURP */}
                <div className="text-4xl font-black text-blue-700 mb-1">PURP</div>
                {/* Texto inferior */}
                <div className="text-xs font-semibold text-blue-600 tracking-wider">SOMOS CONFIANZA</div>
              </div>
            </div>
          </div>
        </div>

        {/* Formulario de login */}
        <div className="bg-white rounded-3xl p-8 shadow-2xl">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Inicia Sesión</h2>

          <div className="space-y-6">
            <div className="relative">
              <Input
                type={showCode ? "text" : "password"}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Código de acceso"
                className="text-lg py-6 pr-12 border-0 border-b-2 border-gray-300 rounded-none bg-transparent focus:border-blue-600 focus:ring-0"
                disabled={loading}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                onClick={() => setShowCode(!showCode)}
              >
                {showCode ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </Button>
            </div>

            <Button
              onClick={handleLogin}
              disabled={loading}
              className="w-full py-4 text-lg font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg transition-all duration-200"
            >
              {loading ? "Verificando..." : "Confirmar"}
            </Button>
          </div>
        </div>

        {/* Versión */}
        <div className="text-center mt-6">
          <p className="text-white text-sm opacity-70">v. 5.1.1.3</p>
        </div>
      </div>
    </div>
  )
}
