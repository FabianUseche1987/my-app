#!/bin/bash

echo "🧪 Test de Conexión MongoDB Atlas"
echo "================================="
echo ""

# Solicitar la contraseña
read -s -p "🔐 Ingresa la contraseña para el usuario 'fabianusecherueda': " PASSWORD
echo ""

# Crear archivo temporal de configuración
cat > /tmp/test-atlas.env << EOF
MONGODB_URI=mongodb+srv://fabianusecherueda:${PASSWORD}@cluster0.jethmqk.mongodb.net/my-app?retryWrites=true&w=majority&appName=Cluster0
PORT=5000
NODE_ENV=production
EOF

echo "📝 Archivo de configuración creado"
echo "🔄 Iniciando test de conexión..."
echo ""

# Cambiar al directorio backend y probar
cd "$(dirname "$0")/backend"

# Usar el archivo temporal
export $(cat /tmp/test-atlas.env | xargs)

# Intentar conectar
echo "🚀 Probando conexión con Atlas..."
timeout 10s npm run dev 2>&1 | head -20

# Limpiar
rm /tmp/test-atlas.env

echo ""
echo "✅ Si viste '✅ Conectado a MongoDB', ¡la conexión funciona!"
echo "❌ Si hubo error, verifica:"
echo "   1. La contraseña del usuario fabianusecherueda"
echo "   2. Network Access en Atlas (permitir 0.0.0.0/0)"
echo "   3. Que el usuario tenga permisos en la BD my-app"
