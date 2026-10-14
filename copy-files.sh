#!/bin/bash
# ============================================
# TimberFlow - Copy Files to Repositories
# ============================================
# Jalankan script ini untuk copy semua file
# ke folder timberflow-web/ dan timberflow-api/
# ============================================

echo "🚀 Memulai proses copy file..."
echo ""

# ============================================
# FRONTEND FILES
# ============================================
echo "📦 Copying frontend files to timberflow-web/..."

# Buat folder structure
mkdir -p timberflow-web/src/components/ui
mkdir -p timberflow-web/src/pages
mkdir -p timberflow-web/src/context
mkdir -p timberflow-web/src/data
mkdir -p timberflow-web/src/utils
mkdir -p timberflow-web/public

# Copy core files
cp src/main.tsx timberflow-web/src/ 2>/dev/null || echo "⚠ main.tsx skipped"
cp src/App.tsx timberflow-web/src/ 2>/dev/null || echo "⚠ App.tsx skipped"
cp src/index.css timberflow-web/src/ 2>/dev/null || echo "⚠ index.css skipped"
cp index.html timberflow-web/ 2>/dev/null || echo "⚠ index.html skipped"

# Copy components
cp -r src/components/* timberflow-web/src/components/ 2>/dev/null || echo "⚠ components skipped"

# Copy pages
cp -r src/pages/* timberflow-web/src/pages/ 2>/dev/null || echo "⚠ pages skipped"

# Copy context
cp -r src/context/* timberflow-web/src/context/ 2>/dev/null || echo "⚠ context skipped"

# Copy data
cp -r src/data/* timberflow-web/src/data/ 2>/dev/null || echo "⚠ data skipped"

# Copy utils
cp -r src/utils/* timberflow-web/src/utils/ 2>/dev/null || echo "⚠ utils skipped"

# Copy config files
cp package.json timberflow-web/ 2>/dev/null || echo "⚠ package.json skipped"
cp package-lock.json timberflow-web/ 2>/dev/null || echo "⚠ package-lock.json skipped"
cp tsconfig.json timberflow-web/ 2>/dev/null || echo "⚠ tsconfig.json skipped"
cp vite.config.js timberflow-web/ 2>/dev/null || echo "⚠ vite.config.js skipped"

echo "✅ Frontend files copied!"
echo ""

# ============================================
# BACKEND FILES
# ============================================
echo "📦 Copying backend files to timberflow-api/..."

# Copy all from trade-api
if [ -d "trade-api" ]; then
    cp -r trade-api/* timberflow-api/ 2>/dev/null || echo "⚠ trade-api files skipped"
    echo "✅ Backend files copied!"
else
    echo "⚠ trade-api folder not found"
fi

echo ""
echo "======================================"
echo "✅ Copy process complete!"
echo "======================================"
echo ""
echo "📤 Next: Run git commands to push to GitHub"
echo ""
