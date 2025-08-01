#!/bin/bash

echo "🔄 Script de migración de MongoDB Local a Atlas"
echo "================================================"
echo ""

# Verificar si mongodump está instalado
if ! command -v mongodump &> /dev/null; then
    echo "❌ mongodump no está instalado."
    echo "💡 Para instalar MongoDB Tools:"
    echo "   Ubuntu/Debian: sudo apt install mongodb-database-tools"
    echo "   macOS: brew install mongodb/brew/mongodb-database-tools"
    exit 1
fi

echo "📋 Este script te ayudará a migrar tus datos de MongoDB local a Atlas"
echo ""

# Solicitar información
read -p "🗃️  Nombre de la base de datos local: " LOCAL_DB
read -p "🌐 URL de conexión de MongoDB Atlas: " ATLAS_URI

echo ""
echo "🔄 Iniciando migración..."

# Crear backup local
echo "📦 Creando backup de la base de datos local..."
mongodump --uri="mongodb://admin:admin123@localhost:27017/?authSource=admin" --db="$LOCAL_DB" --out="./backup_$(date +%Y%m%d_%H%M%S)"

# Verificar si el backup se creó correctamente
if [ $? -eq 0 ]; then
    echo "✅ Backup creado exitosamente"
    
    # Restaurar en Atlas
    echo "🚀 Restaurando en MongoDB Atlas..."
    mongorestore --uri="$ATLAS_URI" --db="$LOCAL_DB" "./backup_$(date +%Y%m%d_%H%M%S)/$LOCAL_DB"
    
    if [ $? -eq 0 ]; then
        echo "✅ Migración completada exitosamente!"
        echo "🗑️  Puedes eliminar la carpeta de backup si todo funciona correctamente"
    else
        echo "❌ Error durante la restauración en Atlas"
    fi
else
    echo "❌ Error al crear el backup local"
fi

echo ""
echo "📝 Recuerda actualizar las variables de entorno en Vercel:"
echo "   MONGODB_URI=$ATLAS_URI"
