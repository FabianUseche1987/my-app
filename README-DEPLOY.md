# Guía de Despliegue en Vercel

## 📋 Requisitos Previos

1. Cuenta en [Vercel](https://vercel.com)
2. Cuenta en [MongoDB Atlas](https://cloud.mongodb.com) (para la base de datos)
3. Repositorio en GitHub con el código

## 🚀 Pasos para el Despliegue

### 1. Preparar la Base de Datos

**Para desarrollo local:**

- Tienes MongoDB local configurado: `mongodb://admin****@localhost:27017/?authSource=admin`
- Esta configuración ya está en `backend/.env`

**Para producción (Vercel):**

1. Crear un cluster en [MongoDB Atlas](https://cloud.mongodb.com)
2. Crear un usuario de base de datos
3. Obtener la cadena de conexión (formato: `mongodb+srv://...`)
4. Migrar tus datos locales a Atlas (opcional)

### 2. Desplegar el Backend

1. Ve a [Vercel Dashboard](https://vercel.com/dashboard)
2. Hacer clic en "New Project"
3. Importar el repositorio desde GitHub
4. Configurar el directorio raíz como `backend`
5. Agregar las variables de entorno:
   - `MONGODB_URI`: tu cadena de conexión de MongoDB Atlas
   - `NODE_ENV`: `production`

### 3. Desplegar el Frontend

1. Crear otro proyecto en Vercel
2. Importar el mismo repositorio
3. Configurar el directorio raíz como `front`
4. Agregar las variables de entorno:
   - `VITE_API_URL`: URL de tu backend desplegado (ej: https://tu-backend.vercel.app)

### 4. Configurar Dominios (Opcional)

- Configurar dominios personalizados en Vercel si es necesario
- Actualizar CORS en el backend para permitir el dominio del frontend

## 🔧 Variables de Entorno Necesarias

### Backend (.env)

```env
MONGODB_URI=mongodb+srv://fabianusecherueda:tu_password@cluster0.jethmqk.mongodb.net/my-app?retryWrites=true&w=majority&appName=Cluster0
NODE_ENV=production
```

### Frontend (.env)

```env
VITE_API_URL=https://tu-backend-vercel.vercel.app
```

## ⚠️ Notas Importantes

1. **CORS**: Asegúrate de que el backend permita requests desde el dominio del frontend
2. **Base de datos**: Usa MongoDB Atlas (no local) para producción
3. **Variables de entorno**: Nunca commitees archivos .env con datos sensibles
4. **Build**: Vercel automáticamente detecta y ejecuta los comandos de build

## 🛠️ Comandos Útiles

```bash
# Desarrollo local
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview
```

## 📱 Estructura del Proyecto Desplegado

```
Proyecto/
├── Frontend (Vercel App 1)
│   ├── React + Vite
│   └── URL: https://mi-app-frontend.vercel.app
│
└── Backend (Vercel App 2)
    ├── Node.js + Express
    └── URL: https://mi-app-backend.vercel.app
```
