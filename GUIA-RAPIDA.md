# 🚀 Guía Rápida de Despliegue - Tu Proyecto

## 📊 Tu Configuración Actual

- **MongoDB Local**: `mongodb://admin:admin123@localhost:27017/?authSource=admin`
- **Backend**: Node.js + Express (Puerto 5000)
- **Frontend**: React + Vite
- **Funcionalidades**: CRUD Usuarios, CRUD Facturas, Exportación Excel

## ⚡ Despliegue Rápido en 5 Pasos

### 1️⃣ Obtener MongoDB Atlas Connection String (2 min)

**Ya tienes Atlas configurado! 🎉**

- ✅ Cluster: Cluster0 activo
- ✅ Base de datos: `my-app`
- ✅ Datos: 4 usuarios ya creados

**Pasos:**

1. En tu Atlas → Haz clic en **"Get connection string"** (botón verde)
2. Selecciona **"Node.js"** como driver
3. Copia la cadena que se ve así:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/my-app?retryWrites=true&w=majority
   ```
4. Reemplaza `<username>` y `<password>` con tus credenciales
5. Guarda esta cadena para Vercel

**Verificar acceso de red:**

- Database Access → Network Access → Add IP Address → `0.0.0.0/0` (permitir desde cualquier IP)

### 2️⃣ Subir a GitHub (2 min)

```bash
git add .
git commit -m "Preparado para Vercel"
git push origin main
```

### 3️⃣ Desplegar Backend en Vercel (3 min)

1. Ir a [vercel.com](https://vercel.com) → New Project
2. Importar tu repositorio de GitHub
3. **Root Directory**: `backend`
4. **Environment Variables**:
   - `MONGODB_URI`: `tu-connection-string-de-atlas`
   - `NODE_ENV`: `production`
5. Deploy

### 4️⃣ Desplegar Frontend en Vercel (3 min)

1. New Project (mismo repo)
2. **Root Directory**: `front`
3. **Environment Variables**:
   - `VITE_API_URL`: `https://tu-backend.vercel.app`
4. Deploy

### 5️⃣ Probar y listo! ✅

- Visita tu frontend URL
- Prueba crear usuarios
- Prueba crear facturas
- Prueba exportar a Excel

## 🔧 Variables de Entorno por Ambiente

### Desarrollo Local (actual)

```env
# Backend
MONGODB_URI=mongodb://admin:admin123@localhost:27017/?authSource=admin
PORT=5000
NODE_ENV=development

# Frontend
VITE_API_URL=http://localhost:5000
```

### Producción (Vercel)

```env
# Backend
MONGODB_URI=mongodb+srv://fabianusecherueda:Sw0rdfish2910@cluster0.jethmqk.mongodb.net/my-app?retryWrites=true&w=majority&appName=Cluster0
NODE_ENV=production

# Frontend
VITE_API_URL=https://tu-backend.vercel.app
```

## 🆘 Solución de Problemas

### Error de CORS

Si el frontend no puede conectar al backend:

1. Verificar que `VITE_API_URL` apunte al backend correcto
2. Verificar que el backend permite CORS desde el frontend

### Error de Base de Datos

- Verificar que Atlas permite conexiones desde cualquier IP (0.0.0.0/0)
- Verificar usuario y contraseña de MongoDB
- Verificar que el cluster está activo

### Error de Build

- Verificar que ambos `package.json` tienen scripts `build` y `start`
- Ver logs en Vercel Dashboard

## 📞 Contacto y Ayuda

Si tienes problemas:

1. Verificar logs en Vercel Dashboard
2. Comprobar Network tab en DevTools
3. Verificar variables de entorno en Vercel
