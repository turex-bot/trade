#!/bin/bash

# ============================================
# TimberFlow - Repository Separation Script
# ============================================
# Script ini akan memisahkan file ke 2 repository:
# 1. timberflow-web (Frontend)
# 2. timberflow-api (Backend)
# ============================================

echo "🚀 TimberFlow Repository Separation"
echo "===================================="
echo ""

# Warna untuk output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Fungsi untuk print status
success() {
    echo -e "${GREEN}✓ $1${NC}"
}

warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

error() {
    echo -e "${RED}✗ $1${NC}"
}

# ============================================
# STEP 1: Setup timberflow-web (Frontend)
# ============================================
echo "📦 Setting up timberflow-web (Frontend)..."
echo ""

# Buat struktur folder
mkdir -p timberflow-web/src/components/ui
mkdir -p timberflow-web/src/pages
mkdir -p timberflow-web/src/context
mkdir -p timberflow-web/src/data
mkdir -p timberflow-web/src/utils
mkdir -p timberflow-web/src/assets
mkdir -p timberflow-web/public

# Copy file-file frontend
success "Copying frontend files..."

# Core files
cp src/main.tsx timberflow-web/src/ 2>/dev/null && success "  ✓ main.tsx" || warning "  ⚠ main.tsx (already exists)"
cp src/App.tsx timberflow-web/src/ 2>/dev/null && success "  ✓ App.tsx" || warning "  ⚠ App.tsx (already exists)"
cp src/index.css timberflow-web/src/ 2>/dev/null && success "  ✓ index.css" || warning "  ⚠ index.css (skipped)"
cp index.html timberflow-web/ 2>/dev/null && success "  ✓ index.html" || warning "  ⚠ index.html (already exists)"

# Components
cp -r src/components/* timberflow-web/src/components/ 2>/dev/null && success "  ✓ components/" || warning "  ⚠ components/ (skipped)"

# Pages
cp -r src/pages/* timberflow-web/src/pages/ 2>/dev/null && success "  ✓ pages/" || warning "  ⚠ pages/ (skipped)"

# Context
cp -r src/context/* timberflow-web/src/context/ 2>/dev/null && success "  ✓ context/" || warning "  ⚠ context/ (skipped)"

# Data
cp -r src/data/* timberflow-web/src/data/ 2>/dev/null && success "  ✓ data/" || warning "  ⚠ data/ (skipped)"

# Utils
cp -r src/utils/* timberflow-web/src/utils/ 2>/dev/null && success "  ✓ utils/" || warning "  ⚠ utils/ (skipped)"

# Config files
cp package.json timberflow-web/ 2>/dev/null && success "  ✓ package.json" || warning "  ⚠ package.json (already exists)"
cp package-lock.json timberflow-web/ 2>/dev/null && success "  ✓ package-lock.json" || warning "  ⚠ package-lock.json (skipped)"
cp tsconfig.json timberflow-web/ 2>/dev/null && success "  ✓ tsconfig.json" || warning "  ⚠ tsconfig.json (already exists)"
cp vite.config.js timberflow-web/ 2>/dev/null && success "  ✓ vite.config.js" || warning "  ⚠ vite.config.js (skipped)"

echo ""

# ============================================
# STEP 2: Setup timberflow-api (Backend)
# ============================================
echo "📦 Setting up timberflow-api (Backend)..."
echo ""

# Buat struktur folder
mkdir -p timberflow-api/cmd/server
mkdir -p timberflow-api/internal/config
mkdir -p timberflow-api/internal/handlers
mkdir -p timberflow-api/internal/middleware
mkdir -p timberflow-api/internal/models
mkdir -p timberflow-api/internal/utils
mkdir -p timberflow-api/migrations
mkdir -p timberflow-api/docs

# Copy file-file backend
success "Copying backend files..."

# Core files
cp trade-api/cmd/server/main.go timberflow-api/cmd/server/ 2>/dev/null && success "  ✓ cmd/server/main.go" || warning "  ⚠ main.go (already exists)"
cp trade-api/internal/config/config.go timberflow-api/internal/config/ 2>/dev/null && success "  ✓ config.go" || warning "  ⚠ config.go (already exists)"

# Handlers
cp -r trade-api/internal/handlers/* timberflow-api/internal/handlers/ 2>/dev/null && success "  ✓ handlers/" || warning "  ⚠ handlers/ (skipped)"

# Middleware
cp -r trade-api/internal/middleware/* timberflow-api/internal/middleware/ 2>/dev/null && success "  ✓ middleware/" || warning "  ⚠ middleware/ (skipped)"

# Models
cp -r trade-api/internal/models/* timberflow-api/internal/models/ 2>/dev/null && success "  ✓ models/" || warning "  ⚠ models/ (skipped)"

# Utils
cp -r trade-api/internal/utils/* timberflow-api/internal/utils/ 2>/dev/null && success "  ✓ utils/" || warning "  ⚠ utils/ (skipped)"

# Migrations
cp -r trade-api/migrations/* timberflow-api/migrations/ 2>/dev/null && success "  ✓ migrations/" || warning "  ⚠ migrations/ (skipped)"

# Docs
cp -r trade-api/docs/* timberflow-api/docs/ 2>/dev/null && success "  ✓ docs/" || warning "  ⚠ docs/ (skipped)"

# Config files
cp trade-api/go.mod timberflow-api/ 2>/dev/null && success "  ✓ go.mod" || warning "  ⚠ go.mod (already exists)"
cp trade-api/Makefile timberflow-api/ 2>/dev/null && success "  ✓ Makefile" || warning "  ⚠ Makefile (already exists)"
cp trade-api/README.md timberflow-api/ 2>/dev/null && success "  ✓ README.md" || warning "  ⚠ README.md (already exists)"

echo ""

# ============================================
# STEP 3: Create .gitignore files
# ============================================
echo "📝 Creating .gitignore files..."
echo ""

# Frontend .gitignore
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

success "✓ timberflow-web/.gitignore created"

# Backend .gitignore
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

success "✓ timberflow-api/.gitignore created"

echo ""

# ============================================
# STEP 4: Create .env.example files
# ============================================
echo "📝 Creating .env.example files..."
echo ""

# Frontend .env.example
cat > timberflow-web/.env.example << 'EOF'
# API Configuration
VITE_API_URL=http://localhost:8080/api/v1

# App Configuration
VITE_APP_NAME=TimberFlow
VITE_APP_VERSION=1.0.0

# Environment
VITE_ENVIRONMENT=development
EOF

success "✓ timberflow-web/.env.example created"

# Backend .env.example (already exists, just verify)
if [ -f "timberflow-api/.env.example" ]; then
    success "✓ timberflow-api/.env.example already exists"
else
    cat > timberflow-api/.env.example << 'EOF'
# Database Configuration
DATABASE_URL=postgres://postgres:postgres@localhost:5432/timberflow?sslmode=disable

# JWT Secret (Change this in production!)
JWT_SECRET=your-super-secret-jwt-key-change-in-production

# Server Port
PORT=8080

# Environment (development, staging, production)
ENVIRONMENT=development
EOF
    success "✓ timberflow-api/.env.example created"
fi

echo ""

# ============================================
# STEP 5: Summary
# ============================================
echo "======================================"
echo -e "${GREEN}✅ Repository separation complete!${NC}"
echo "======================================"
echo ""
echo "📁 Structure created:"
echo "   timberflow-web/  (Frontend - React + TypeScript)"
echo "   timberflow-api/  (Backend - Go + Gin)"
echo ""
echo "📤 Next steps:"
echo ""
echo "1. Push timberflow-web:"
echo "   cd timberflow-web"
echo "   git init"
echo "   git add ."
echo "   git commit -m 'Initial commit: TimberFlow Frontend'"
echo "   git branch -M main"
echo "   git remote add origin https://github.com/turex-bot/timberflow-web.git"
echo "   git push -u origin main"
echo ""
echo "2. Push timberflow-api:"
echo "   cd timberflow-api"
echo "   git init"
echo "   git add ."
echo "   git commit -m 'Initial commit: TimberFlow Backend API'"
echo "   git branch -M main"
echo "   git remote add origin https://github.com/turex-bot/timberflow-api.git"
echo "   git push -u origin main"
echo ""
echo "📚 Documentation:"
echo "   - QUICK_START.md"
echo "   - ENTERPRISE_STRUCTURE.md"
echo "   - timberflow-web/README.md"
echo "   - timberflow-api/README.md"
echo ""
echo "🎉 Done! Your repositories are ready to push!"
echo ""
