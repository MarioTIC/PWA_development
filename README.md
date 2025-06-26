# PURP - Sistema de Gestión Agrícola PWA

## 📋 Descripción

PURP es una aplicación web progresiva (PWA) diseñada para técnicos agrícolas que permite gestionar productores, realizar visitas técnicas, crear dictámenes técnicos y administrar un CRM de prospectos. La aplicación funciona completamente offline y sincroniza datos cuando hay conexión disponible.

## 🚀 Características Principales

### 🔐 Sistema de Autenticación
- Login con códigos de acceso
- Roles diferenciados: Técnico y Manager
- Persistencia de sesión

### 👥 Gestión de Productores
- Catálogo completo de productores
- Información detallada de contacto
- Cultivos asociados
- Búsqueda y filtrado

### 📝 Visitas Técnicas
- **Dos tipos de visitas:**
  - **Comercial**: Prospección, ventas, post-venta
  - **Inspección Técnica**: Asesoría técnica, supervisión
- Campos dinámicos según el tipo de visita
- Programación de próximas actividades
- Integración automática con agenda
- Captura de fotografías
- Coordenadas GPS

### 📋 Dictámenes Técnicos
- Formularios completos de evaluación
- Delimitación de áreas con coordenadas GPS
- Avance de labores agrícolas
- Características del suelo
- Régimen de riego
- Observaciones y recomendaciones

### 📅 Sistema de Agenda
- Calendario interactivo
- Eventos categorizados
- Recordatorios automáticos
- Integración con visitas programadas

### 💼 CRM de Prospectos
- Gestión completa de prospectos
- Estados de seguimiento
- Prioridades
- Cultivos de interés
- Notas y observaciones

### 🔄 Funcionalidades Offline
- Funcionamiento completo sin conexión
- Sincronización automática
- Almacenamiento local persistente
- Indicadores de estado de sincronización

## 🛠️ Tecnologías Utilizadas

### Frontend
- **Next.js 14** - Framework React con App Router
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Estilos utilitarios
- **shadcn/ui** - Componentes de UI
- **Lucide React** - Iconografía

### Estado y Datos
- **Redux Toolkit** - Gestión de estado global
- **localStorage** - Persistencia de datos offline

### PWA
- **Service Workers** - Funcionalidad offline
- **Web App Manifest** - Instalación como app nativa

### Utilidades
- **jsPDF** - Generación de documentos PDF
- **date-fns** - Manipulación de fechas

## 📁 Estructura del Proyecto

\`\`\`
src/
├── app/                          # Páginas de Next.js (App Router)
│   ├── agenda/                   # Sistema de agenda
│   ├── configuracion/            # Configuración de la app
│   ├── crm/                      # CRM de prospectos
│   ├── formularios/              # Formularios IPP
│   ├── historial/                # Historial de visitas
│   ├── login/                    # Autenticación
│   ├── productores/              # Gestión de productores
│   │   └── [id]/                 # Páginas dinámicas por productor
│   │       ├── dictamen/         # Dictámenes técnicos
│   │       ├── dictamenes/       # Lista de dictámenes
│   │       ├── opciones/         # Opciones de asesoría
│   │       └── visitas/          # Visitas técnicas
│   └── visitas/                  # Gestión de visitas
├── components/                   # Componentes reutilizables
│   ├── layout/                   # Componentes de layout
│   ├── ui/                       # Componentes de UI (shadcn)
│   └── ...                       # Otros componentes
├── lib/                          # Lógica de negocio
│   └── slices/                   # Redux slices
├── hooks/                        # Custom hooks
└── utils/                        # Utilidades
\`\`\`

## 🔧 Instalación y Configuración

### Prerrequisitos
- Node.js 18+ 
- npm o yarn

### Instalación
\`\`\`bash
# Clonar el repositorio
git clone [repository-url]

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Construir para producción
npm run build

# Ejecutar en producción
npm start
\`\`\`

### Variables de Entorno
\`\`\`env
# No se requieren variables de entorno para el funcionamiento básico
# La aplicación funciona completamente en el cliente
\`\`\`

## 📱 Funcionalidades PWA

### Instalación
- La app puede instalarse como aplicación nativa
- Funciona offline completamente
- Actualizaciones automáticas

### Características Offline
- Todos los datos se almacenan localmente
- Sincronización automática cuando hay conexión
- Indicadores visuales de estado de conexión

## 🎯 Flujos de Trabajo Principales

### 1. Gestión de Visitas Técnicas

#### Crear Nueva Visita
1. Seleccionar productor
2. Elegir tipo de visita (Comercial/Inspección)
3. Completar formulario dinámico
4. Programar próxima actividad (opcional)
5. Guardar visita

#### Consultar/Modificar Visitas
1. Acceder al historial de visitas
2. Usar botones "Consultar" o "Modificar"
3. Ver información completa o editar campos
4. Guardar cambios

### 2. Dictámenes Técnicos

#### Crear Dictamen
1. Seleccionar productor
2. Completar datos generales
3. Delimitar área con coordenadas GPS
4. Especifi car régimen de riego
5. Evaluar características del suelo
6. Registrar avance de labores
7. Generar resultado de supervisión

#### Consultar/Modificar Dictámenes
1. Acceder al historial de dictámenes
2. Usar botones "Consultar" o "Modificar"
3. Ver información completa o editar campos
4. Guardar cambios

### 3. Programación de Actividades
1. En nueva visita, completar sección "Programación Próxima Actividad"
2. Seleccionar asunto y fecha
3. Al guardar visita, evento se agrega automáticamente a la agenda
4. Verificar en sección Agenda

## 🔄 Sistema de Sincronización

### Estados de Sincronización
- **Sincronizado**: Datos guardados en servidor
- **Pendiente**: Datos solo locales, pendientes de sincronizar
- **Error**: Problemas en la sincronización

### Proceso de Sincronización
1. Detección automática de conexión
2. Envío de datos pendientes
3. Actualización de estados
4. Notificaciones al usuario

## 🎨 Diseño y UX

### Principios de Diseño
- **Mobile First**: Optimizado para dispositivos móviles
- **Offline First**: Funcionalidad completa sin conexión
- **Accesibilidad**: Cumple estándares WCAG
- **Consistencia**: Patrones de UI uniformes

### Temas
- Modo claro y oscuro
- Colores adaptados al contexto agrícola
- Iconografía intuitiva

## 🧪 Testing

### Tipos de Testing
- Pruebas unitarias de componentes
- Pruebas de integración de Redux
- Pruebas E2E de flujos críticos
- Pruebas de funcionalidad offline

### Comandos de Testing
\`\`\`bash
# Ejecutar todas las pruebas
npm test

# Pruebas en modo watch
npm run test:watch

# Cobertura de código
npm run test:coverage
\`\`\`

## 🚀 Despliegue

### Vercel (Recomendado)
\`\`\`bash
# Instalar Vercel CLI
npm i -g vercel

# Desplegar
vercel
\`\`\`

### Otros Proveedores
- Netlify
- AWS Amplify
- Firebase Hosting

## 📊 Métricas y Monitoreo

### Métricas PWA
- Tiempo de carga inicial
- Tiempo de respuesta offline
- Tasa de instalación
- Retención de usuarios

### Herramientas de Monitoreo
- Google Analytics
- Vercel Analytics
- Lighthouse CI

## 🔒 Seguridad

### Medidas de Seguridad
- Autenticación basada en códigos
- Validación de datos en cliente
- Sanitización de inputs
- Headers de seguridad

### Datos Sensibles
- No se almacenan contraseñas
- Datos encriptados en localStorage
- Comunicación HTTPS obligatoria

## 🤝 Contribución

### Guías de Contribución
1. Fork del repositorio
2. Crear rama feature
3. Implementar cambios
4. Escribir tests
5. Crear Pull Request

### Estándares de Código
- ESLint + Prettier
- Convenciones de naming
- Documentación de funciones
- Tests obligatorios

## 📝 Changelog

### v1.0.0 (Actual)
- ✅ Sistema de autenticación
- ✅ Gestión de productores
- ✅ Visitas técnicas (Comercial/Inspección)
- ✅ Dictámenes técnicos
- ✅ Sistema de agenda
- ✅ CRM de prospectos
- ✅ Funcionalidad offline completa
- ✅ Botones de consulta y modificación funcionales
- ✅ Integración agenda con programación de actividades

### Próximas Versiones
- 🔄 Integración con API real
- 🔄 Mapas interactivos avanzados
- 🔄 Notificaciones push
- 🔄 Optimización para tablets
- 🔄 Más formularios IPP

## 📞 Soporte

### Documentación
- README.md (este archivo)
- Documentación de componentes inline
- Guías de usuario en la aplicación

### Contacto
- Issues en GitHub
- Documentación técnica en código
- Comentarios inline en funciones críticas

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver archivo `LICENSE` para más detalles.

---

**PURP** - Sistema de Gestión Agrícola PWA
Desarrollado con ❤️ para técnicos agrícolas
\`\`\`
