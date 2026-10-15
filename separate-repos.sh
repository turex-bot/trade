#!/bin/bash

# Script untuk memindahkan file ke 2 repository terpisah

echo "🚀 Memulai proses pemisahan repository..."

# 1. Pindahkan file frontend ke timberflow-web/
echo "📦 Memindahkan file frontend..."
mkdir -p timberflow-web/src
mkdir -p timberflow-web/public

# Copy semua file frontend
cp -r src/* timberflow-web/src/
cp index.html timberflow-web/
cp package.json timberflow-web/
cp package-lock.json timberflow-web/ 2>/dev/null || true
cp tsconfig.json timberflow-web/
cp vite.config.js timberflow-web/
cp .env timberflow-web/ 2>/dev/null || true
cp .gitignore timberflow-web/ 2>/dev/null || true

# Copy file konfigurasi tambahan
cp tailwind.config.js timberflow-web/ 2>/dev/null || true
cp postcss.config.js timberflow-web/ 2>/dev/null || true

echo "✅ File frontend berhasil dipindahkan ke timberflow-web/"

# 2. Pindahkan file backend ke timberflow-api/
echo "📦 Memindahkan file backend..."
if [ -d "trade-api" ]; then
    cp -r trade-api/* timberflow-api/
    echo "✅ File backend berhasil dipindahkan ke timberflow-api/"
else
    echo "⚠️  Folder trade-api tidak ditemukan, skip..."
fi

# 3. Buat file .gitignore untuk timberflow-web/
cat > timberflow-web/.gitignore << 'EOF'
# Dependencies
node_modules/
.pnp
.pnp.js

# Testing
coverage/

# Production
build/
dist/

# Misc
.DS_Store
.env.local
.env.development.local
.env.test.local
.env.production.local

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
lerna-debug.log*

# Editor
.vscode/
.idea/
*.swp
*.swo
*~

# TypeScript
*.tsbuildinfo
EOF

echo "✅ .gitignore untuk timberflow-web/ berhasil dibuat"

# 4. Buat file .gitignore untuk timberflow-api/
cat > timberflow-api/.gitignore << 'EOF'
# Binary
/server
*.exe
*.exe~
*.dll
*.so
*.dylib

# Test binary
*.test

# Output
*.out

# Dependency directories
vendor/

# Go workspace file
go.work

# Environment
.env
.env.local

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Logs
*.log
EOF

echo "✅ .gitignore untuk timberflow-api/ berhasil dibuat"

echo ""
echo "🎉 Proses pemisahan file selesai!"
echo ""
echo "📝 Langkah selanjutnya:"
echo ""
echo "1. Push timberflow-web/:"
echo "   cd timberflow-web"
echo "   git init"
echo "   git add ."
echo "   git commit -m 'Initial commit: TimberFlow Frontend'"
echo "   git branch -M main"
echo "   git remote add origin https://github.com/turex-bot/timberflow-web.git"
echo "   git push -u origin main"
echo ""
echo "2. Push timberflow-api/:"
echo "   cd timberflow-api"
echo "   git init"
echo "   git add ."
echo "   git commit -m 'Initial commit: TimberFlow Backend API'"
echo "   git branch -M main"
echo "   git remote add origin https://github.com/turex-bot/timberflow-api.git"
echo "   git push -u origin main"
echo ""
