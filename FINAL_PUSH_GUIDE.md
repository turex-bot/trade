# 🚀 PANDUAN LENGKAP - Push ke 2 Repository Terpisah

## 📋 **Overview**

Anda memiliki 2 repository di GitHub:
- **timberflow-web**: https://github.com/turex-bot/timberflow-web.git
- **timberflow-api**: https://github.com/turex-bot/timberflow-api.git

Panduan ini akan membantu Anda memindahkan semua file ke 2 repository tersebut.

---

## 🎯 **LANGKAH 1: Jalankan Script Setup**

Script `setup-repos.sh` akan otomatis memindahkan semua file ke folder yang benar.

### **Di Terminal (Linux/Mac):**
```bash
# Make script executable
chmod +x setup-repos.sh

# Run script
./setup-repos.sh
```

### **Di Windows (PowerShell):**
```powershell
# Jika menggunakan Git Bash
bash setup-repos.sh

# Atau manual copy (lihat LANGKAH 2)
```

---

## 🎯 **LANGKAH 2: Manual Copy (Jika Script Tidak Bisa)**

Jika script tidak bisa dijalankan, lakukan copy manual:

### **A. Copy File Frontend ke timberflow-web/**

```bash
# Buat folder
mkdir -p timberflow-web/src/components/ui
mkdir -p timberflow-web/src/pages
mkdir -p timberflow-web/src/context
mkdir -p timberflow-web/src/data
mkdir -p timberflow-web/src/utils
mkdir -p timberflow-web/public

# Copy file-file frontend
cp -r src/* timberflow-web/src/
cp index.html timberflow-web/
cp package.json timberflow-web/
cp package-lock.json timberflow-web/
cp tsconfig.json timberflow-web/
cp vite.config.js timberflow-web/
```

### **B. Copy File Backend ke timberflow-api/**

```bash
# Copy file-file backend
cp -r trade-api/* timberflow-api/
```

---

## 🎯 **LANGKAH 3: Push ke GitHub**

### **A. Push timberflow-web**

```bash
# Navigate ke folder frontend
cd timberflow-web

# Initialize git
git init

# Add semua file
git add .

# Commit
git commit -m "Initial commit: TimberFlow Frontend"

# Rename branch ke main
git branch -M main

# Add remote (sesuai repository Anda)
git remote add origin https://github.com/turex-bot/timberflow-web.git

# Push
git push -u origin main
```

### **B. Push timberflow-api**

```bash
# Navigate ke folder backend
cd timberflow-api

# Initialize git
git init

# Add semua file
git add .

# Commit
git commit -m "Initial commit: TimberFlow Backend API"

# Rename branch ke main
git branch -M main

# Add remote (sesuai repository Anda)
git remote add origin https://github.com/turex-bot/timberflow-api.git

# Push
git push -u origin main
```

---

## 🎯 **LANGKAH 4: Setup Development**

### **A. Setup Frontend**

```bash
cd timberflow-web

# Install dependencies
npm install

# Setup environment
cp .env.example .env

# Edit .env jika perlu
nano .env

# Run development server
npm run dev

# Buka http://localhost:5173
```

### **B. Setup Backend**

```bash
cd timberflow-api

# Install dependencies
go mod download

# Setup database
createdb timberflow
psql -U postgres -d timberflow -f migrations/001_init_schema.sql

# Setup environment
cp .env.example .env

# Edit .env jika perlu
nano .env

# Run server
make run
# Atau: go run cmd/server/main.go

# Server berjalan di http://localhost:8080
```

---

## 📊 **Struktur Final**

### **timberflow-web/**
```
├── public/
├── src/
│   ├── components/
│   │   ├── ui/
│   │   ├── Layout.tsx
│   │   ├── Toast.tsx
│   │   ├── CommandPalette.tsx
│   │   └── NotificationCenter.tsx
│   ├── pages/
│   │   ├── Dashboard.tsx
│   │   ├── Suppliers.tsx
│   │   ├── Companies.tsx
│   │   ├── WoodSpecs.tsx
│   │   ├── Prices.tsx
│   │   ├── Orders.tsx
│   │   ├── Payables.tsx
│   │   ├── Receivables.tsx
│   │   ├── Reports.tsx
│   │   ├── Settings.tsx
│   │   ├── AuditLog.tsx
│   │   └── Login.tsx
│   ├── context/
│   │   └── DataContext.tsx
│   ├── data/
│   │   ├── mockData.ts
│   │   └── seedData.ts
│   ├── services/
│   │   ├── api.ts
│   │   ├── auth.service.ts
│   │   ├── supplier.service.ts
│   │   ├── company.service.ts
│   │   ├── order.service.ts
│   │   └── payment.service.ts
│   ├── types/
│   │   └── index.ts
│   ├── hooks/
│   │   └── useAuth.ts
│   ├── constants/
│   │   └── index.ts
│   ├── utils/
│   │   └── logVolumeFormatter.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
└── README.md
```

### **timberflow-api/**
```
├── cmd/
│   └── server/
│       └── main.go
├── internal/
│   ├── config/
│   │   └── config.go
│   ├── handlers/
│   │   ├── auth_handler.go
│   │   ├── supplier_handler.go
│   │   └── company_handler.go
│   ├── middleware/
│   │   └── middleware.go
│   ├── models/
│   │   ├── user.go
│   │   └── models.go
│   └── utils/
│       ├── response.go
│       └── calculator.go
├── migrations/
│   └── 001_init_schema.sql
├── docs/
│   └── api.md
├── .env.example
├── .gitignore
├── go.mod
├── Makefile
└── README.md
```

---

## ✅ **Checklist**

### **Persiapan:**
- [ ] Repository `timberflow-web` sudah dibuat di GitHub
- [ ] Repository `timberflow-api` sudah dibuat di GitHub
- [ ] Script `setup-repos.sh` sudah dijalankan ATAU manual copy sudah dilakukan

### **Push Frontend:**
- [ ] Navigate ke `timberflow-web/`
- [ ] `git init`
- [ ] `git add .`
- [ ] `git commit -m "Initial commit"`
- [ ] `git branch -M main`
- [ ] `git remote add origin https://github.com/turex-bot/timberflow-web.git`
- [ ] `git push -u origin main`

### **Push Backend:**
- [ ] Navigate ke `timberflow-api/`
- [ ] `git init`
- [ ] `git add .`
- [ ] `git commit -m "Initial commit"`
- [ ] `git branch -M main`
- [ ] `git remote add origin https://github.com/turex-bot/timberflow-api.git`
- [ ] `git push -u origin main`

### **Setup Development:**
- [ ] Frontend: `npm install`
- [ ] Frontend: `npm run dev`
- [ ] Backend: `go mod download`
- [ ] Backend: Setup PostgreSQL
- [ ] Backend: `make migrate`
- [ ] Backend: `make run`

### **Testing:**
- [ ] Frontend berjalan di http://localhost:5173
- [ ] Backend berjalan di http://localhost:8080
- [ ] Login berhasil
- [ ] CRUD operations berhasil
- [ ] Payment recording berhasil

---

## 🆘 **Troubleshooting**

### **Problem: Script tidak bisa dijalankan**
```bash
# Solusi 1: Gunakan bash
bash setup-repos.sh

# Solusi 2: Manual copy (lihat LANGKAH 2)
```

### **Problem: Git push gagal**
```bash
# Check remote URL
git remote -v

# Update remote URL
git remote set-url origin https://github.com/turex-bot/timberflow-web.git

# Try push again
git push -u origin main
```

### **Problem: File tidak ter-copy**
```bash
# Check folder structure
ls -la timberflow-web/
ls -la timberflow-api/

# Manual copy jika perlu
cp -r src/* timberflow-web/src/
cp -r trade-api/* timberflow-api/
```

### **Problem: npm install error**
```bash
# Clear cache
npm cache clean --force

# Delete node_modules
rm -rf node_modules package-lock.json

# Install again
npm install
```

### **Problem: Database connection error**
```bash
# Check PostgreSQL
sudo service postgresql status

# Check database
psql -U postgres -l | grep timberflow

# Create database if not exists
createdb timberflow
```

---

## 📚 **Dokumentasi**

- **Quick Start**: `QUICK_START.md`
- **Enterprise Structure**: `ENTERPRISE_STRUCTURE.md`
- **Frontend Docs**: `timberflow-web/README.md`
- **Backend Docs**: `timberflow-api/README.md`
- **API Docs**: `timberflow-api/docs/api.md`

---

## 🎯 **Next Steps**

Setelah push berhasil:

1. **Test Frontend:**
   ```bash
   cd timberflow-web
   npm install
   npm run dev
   ```

2. **Test Backend:**
   ```bash
   cd timberflow-api
   make deps
   make migrate
   make run
   ```

3. **Integrate:**
   - Update frontend untuk connect ke backend
   - Test semua fitur
   - Deploy ke production

---

## 📞 **Support**

Jika ada masalah:
1. Check troubleshooting section di atas
2. Check dokumentasi di setiap folder
3. Contact support

---

**Status:** ✅ Ready to push!

**Silakan ikuti langkah-langkah di atas untuk push ke 2 repository!** 🚀

---

**Repository Links:**
- Frontend: https://github.com/turex-bot/timberflow-web
- Backend: https://github.com/turex-bot/timberflow-api

**Built with ❤️ for Indonesian Plywood Traders**
