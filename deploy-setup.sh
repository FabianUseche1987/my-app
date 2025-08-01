#!/bin/bash

echo "🚀 Configurando proyecto para despliegue en Vercel..."

# Crear .gitignore si no existe
if [ ! -f .gitignore ]; then
    echo "📝 Creando .gitignore..."
    cat > .gitignore << EOF
# Dependencies
node_modules/
.pnp
.pnp.js

# Production builds
/build
/dist

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
lerna-debug.log*

# OS
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db

# IDE
.vscode/
.idea/
*.swp
*.swo

# Temporary folders
tmp/
temp/
EOF
fi

echo "✅ Proyecto configurado para Vercel!"
echo ""
echo "📋 Próximos pasos:"
echo "1. Subir el código a GitHub"
echo "2. Crear cuenta en MongoDB Atlas y obtener connection string"
echo "3. Crear dos proyectos en Vercel (uno para frontend, otro para backend)"
echo "4. Configurar variables de entorno en Vercel"
echo ""
echo "📖 Lee README-DEPLOY.md para instrucciones detalladas"
