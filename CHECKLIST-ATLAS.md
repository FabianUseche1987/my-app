# ✅ Checklist de Despliegue - MongoDB Atlas

## 🎯 Tu Situación Actual

- ✅ MongoDB Atlas: Configurado con datos
- ✅ Cluster0: Activo y funcionando
- ✅ Base de datos: `my-app`
- ✅ Colecciones: `users` (4 docs), `facturas`
- ✅ Código: Listo para Vercel

## 📋 Pasos Pendientes

### ⚡ URGENTE - Obtener Connection String

□ **Paso 1**: En Atlas → "Get connection string"
□ **Paso 2**: Copiar cadena mongodb+srv://...
□ **Paso 3**: Reemplazar username/password
□ **Paso 4**: Verificar formato final:

```
mongodb+srv://usuario:password@cluster0.xxxxx.mongodb.net/my-app?retryWrites=true&w=majority
```

### 🔒 Configurar Acceso de Red

□ **Paso 5**: Atlas → Network Access
□ **Paso 6**: Add IP Address → `0.0.0.0/0`
□ **Paso 7**: Confirmar que permite "Access from anywhere"

### 🧪 Probar Conexión (Opcional)

□ **Paso 8**: Crear `.env.production` en backend/
□ **Paso 9**: Pegar connection string
□ **Paso 10**: Probar: `NODE_ENV=production npm run dev`

### 🚀 Desplegar

□ **Paso 11**: Git push a GitHub
□ **Paso 12**: Vercel Backend + variables
□ **Paso 13**: Vercel Frontend + API_URL
□ **Paso 14**: ¡Probar en producción!

## 🆘 Si algo falla

1. **Error de autenticación**: Verificar usuario/password en Atlas
2. **Error de red**: Verificar Network Access en Atlas
3. **Error de base de datos**: Verificar que el nombre es `my-app`

## 🎉 Una vez completado

Tu app estará disponible en:

- Frontend: `https://tu-app.vercel.app`
- Backend: `https://tu-api.vercel.app`
- Base de datos: MongoDB Atlas (ya configurada)
