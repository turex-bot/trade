# 🚀 Quick Start Guide - TimberFlow

## 📋 **Overview**

TimberFlow adalah Sistem Manajemen Trader Kayu Lapis (Plywood) yang terdiri dari 2 repository terpisah:

1. **timberflow-web** - Frontend (React + TypeScript + Vite)
2. **timberflow-api** - Backend (Go + Gin + PostgreSQL)

---

## 🎯 **Langkah Cepat Memulai**

### **Step 1: Pisahkan File ke 2 Repository**

Jalankan script otomatis:
```bash
chmod +x separate-repos.sh
./separate-repos.sh
```

Atau manual:
```bash
# Frontend
mkdir -p timberflow-web/src
cp -r src/* timberflow-web/src/
cp index.html package.json tsconfig.json vite.config.js timberflow-web/

# Backend
cp -r trade-api/* timberflow-api/
```

### **Step 2: Push ke GitHub**

#### **Repository 1: timberflow-web**
```bash
cd timberflow-web
git init
git add .
git commit -m "Initial commit: TimberFlow Frontend"
git branch -M main
git remote add origin https://github.com/turex-bot/timberflow-web.git
git push -u origin main
```

#### **Repository 2: timberflow-api**
```bash
cd timberflow-api
git init
git add .
git commit -m "Initial commit: TimberFlow Backend API"
git branch -M main
git remote add origin https://github.com/turex-bot/timberflow-api.git
git push -u origin main
```

---

## 🔧 **Setup Development**

### **Frontend Setup**

```bash
cd timberflow-web

# Install dependencies
npm install

# Setup environment
cp .env.example .env
# Edit .env dengan konfigurasi Anda

# Run development server
npm run dev
# Buka http://localhost:5173
```

### **Backend Setup**

```bash
cd timberflow-api

# Install dependencies
go mod download

# Setup database
createdb timberflow
psql -U postgres -d timberflow -f migrations/001_init_schema.sql

# Configure environment
cp .env.example .env
# Edit .env dengan konfigurasi Anda

# Run server
go run cmd/server/main.go
# Server berjalan di http://localhost:8080
```

---

## 📊 **Struktur Repository**

### **timberflow-web/**
```
├── src/
│   ├── components/     # UI Components
│   ├── pages/         # Page components
│   ├── services/      # API services
│   ├── types/         # TypeScript types
│   ├── hooks/         # Custom hooks
│   └── utils/         # Helper functions
├── package.json
├── tsconfig.json
└── vite.config.ts
```

### **timberflow-api/**
```
├── cmd/server/        # Entry point
├── internal/
│   ├── handlers/      # HTTP handlers
│   ├── models/        # Database models
│   ├── middleware/    # Auth, CORS
│   └── utils/         # Helper functions
├── migrations/        # Database migrations
├── go.mod
└── Makefile
```

---

## 🔗 **Repository Links**

- **Frontend**: https://github.com/turex-bot/timberflow-web
- **Backend**: https://github.com/turex-bot/timberflow-api

---

## 📚 **Documentation**

- **Frontend Docs**: `timberflow-web/README.md`
- **Backend Docs**: `timberflow-api/README.md`
- **API Docs**: `timberflow-api/docs/api.md`
- **Setup Guide**: `SETUP_GUIDE.md`
- **Enterprise Structure**: `ENTERPRISE_STRUCTURE.md`

---

## ✅ **Checklist**

- [ ] Pisahkan file ke 2 repository
- [ ] Push timberflow-web ke GitHub
- [ ] Push timberflow-api ke GitHub
- [ ] Setup frontend (npm install)
- [ ] Setup backend (go mod download)
- [ ] Setup database PostgreSQL
- [ ] Run migrations
- [ ] Test frontend + backend
- [ ] Deploy ke production

---

## 🆘 **Troubleshooting**

### **Problem: Script tidak bisa dijalankan**
```bash
# Solusi: Jalankan manual
bash separate-repos.sh
```

### **Problem: Git push gagal**
```bash
# Solusi: Check remote URL
git remote -v

# Update remote URL
git remote set-url origin https://github.com/turex-bot/timberflow-web.git
```

### **Problem: Database connection error**
```bash
# Solusi: Check PostgreSQL
sudo service postgresql status

# Check database exists
psql -U postgres -l | grep timberflow
```

---

## 📞 **Support**

Email: support@timberflow.id

---

**Built with ❤️ for Indonesian Plywood Traders**
