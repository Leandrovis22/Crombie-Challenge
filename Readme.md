# Crombie Challenge - Sistema de Registro de Préstamos

## 📑 Descripción General
Aplicación fullstack accesible para registro y gestión de solicitudes de préstamos, desarrollada como parte del Crombie Challenge. La aplicación implementa las mejores prácticas de accesibilidad web y está construida con TypeScript tanto en el frontend como en el backend.

## 📁 Estructura del Proyecto

```
├── API/
│   ├── controllers/
│   │   ├── homeController.ts
│   │   ├── loginController.ts
│   │   └── registerController.ts
│   ├── db/
│   │   └── createDb.ts
│   ├── middlewares/
│   │   └── authMiddleware.ts
│   ├── routes/
│   │   └── route.ts
│   ├── types/
│   │   └── types.ts
│   └── index.ts
│
└── Front/
    ├── src/
    │   ├── auth/
    │   │   ├── authService.ts
    │   │   └── useAuthRedirect.ts
    │   ├── components/
    │   │   ├── Alerts.tsx
    │   │   ├── DateOfBirth.tsx
    │   │   ├── FormButtons.tsx
    │   │   ├── FormField.tsx
    │   │   ├── PhoneField.tsx
    │   │   └── UserInfoField.tsx
    │   ├── hooks/
    │   │   ├── useFormPersistence.ts
    │   │   └── useFormSubmission.ts
    │   ├── pages/
    │   │   ├── Home.tsx
    │   │   ├── Login.tsx
    │   │   └── Register.tsx
    │   ├── schemas/
    │   │   ├── loginValidationSchema.ts
    │   │   └── registerValidationSchema.ts
    │   └── styles/
        └── theme.ts
```

## 🎨 Frontend

### Requisitos Previos
- Node.js (v14 o superior)
- npm (v6 o superior)

### Instalación Frontend

```bash
# Navegar al directorio frontend
cd Front

# Instalar dependencias
npm install
```

### Dependencias Principales Frontend
```json
{
  "@emotion/react": "^11.13.3",
  "@emotion/styled": "^11.13.0",
  "@hookform/resolvers": "^3.9.1",
  "@mui/material": "^6.1.6",
  "@mui/x-date-pickers": "^7.22.1",
  "dayjs": "^1.11.13",
  "mui-tel-input": "^6.0.1",
  "react": "^18.3.1",
  "react-hook-form": "^7.53.1",
  "react-router-dom": "^6.28.0",
  "yup": "^1.4.0"
}
```

### Configuración Frontend
1. Crear archivo `.env` en el directorio `/Front`:
```env
REACT_APP_API_URL=http://localhost:3001
```

### Ejecución Frontend
```bash
# Iniciar servidor de desarrollo
npm run dev
```

### Características de Accesibilidad
- Navegación completa por teclado
- Labels y aria-labels descriptivos
- Mensajes de error claros y accesibles
- Alto contraste en textos
- Estructura semántica del HTML
- Soporte para lectores de pantalla
- Focus visual visible
- Textos alternativos para elementos visuales

## ⚙️ Backend (API)

### Requisitos Previos
- Node.js (v14 o superior)
- npm (v6 o superior)
- TypeScript

### Instalación Backend

```bash
# Navegar al directorio backend
cd API

# Instalar dependencias
npm install
```

### Dependencias Principales Backend
```json
{
  "@neondatabase/serverless": "^0.10.3",
  "bcrypt": "^5.1.1",
  "cors": "^2.8.5",
  "express": "^4.21.1",
  "jsonwebtoken": "^9.0.2"
}
```

### Configuración Backend
1. Crear archivo `.env` en el directorio `/API`:
```env
PORT=3001
JWT_SECRET=your_secret_key
DATABASE_URL=your_database_url
```

2. Configurar Base de Datos:
```bash
# Ejecutar script de creación de base de datos
npm run db:create
```

### Ejecución Backend
```bash
# Compilar TypeScript
npm run build

# Iniciar servidor de desarrollo
npm run dev
```

## 🔧 Scripts Disponibles

### Frontend
```bash
npm run dev      # Inicia servidor de desarrollo
npm run build    # Construye la aplicación para producción
npm run test     # Ejecuta tests
```

### Backend
```bash
npm run build    # Compila TypeScript
npm run start    # Inicia servidor en producción
npm run dev      # Inicia servidor en desarrollo con hot-reload
```

## 📚 Documentación Adicional

### Componentes Reutilizables
- `FormField`: Campo de formulario base con validación
- `DateOfBirth`: Selector de fecha con validación de edad
- `PhoneField`: Campo de teléfono con formato
- `FormButtons`: Botones de formulario estandarizados
- `Alerts`: Sistema de notificaciones accesible

### Hooks Personalizados
- `useFormPersistence`: Persistencia de formularios en localStorage
- `useFormSubmission`: Manejo de envío de formularios
- `useAuthRedirect`: Redirección basada en autenticación

## 🔐 Variables de Entorno Requeridas

### Frontend (Front/.env)
```env
REACT_APP_API_URL=http://localhost:3001
```

### Backend (API/.env)
```env
PORT=3001
JWT_SECRET=your_secret_key
DATABASE_URL=your_database_url
CORS_ORIGIN=http://localhost:3000
```

## 📝 Licencia
Este proyecto está bajo la Licencia MIT.

