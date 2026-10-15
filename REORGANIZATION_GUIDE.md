# 🔄 Panduan Reorganisasi ke 2 Repository

## 📋 **Status Saat Ini**

Proyek saat ini masih dalam **1 folder** dengan struktur:
```
timberflow/
├── src/                    # Frontend (React)
├── trade-api/             # Backend (Go)
├── *.md                   # Dokumentasi
└── config files
```

## 🎯 **Target: 2 Repository Terpisah**

### **Repository 1: timberflow-web**
```
timberflow-web/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── ui/
│   │   ├── Layout.tsx
│   │   ├── Toast.tsx
│   │   ├── CommandPalette.tsx
│   │   └── NotificationCenter.tsx
│   ├── context/
│   │   └── DataContext.tsx
│   ├── data/
│   │   ├── mockData.ts
│   │   └── seedData.ts
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
│   ├── utils/
│   │   └── logVolumeFormatter.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── .env
├── .gitignore
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

### **Repository 2: timberflow-api**
```
timberflow-api/
├── cmd/
│   └── server/
│       └── main.go
├── internal/
│   ├── config/
│   │   └── config.go
│   ├── handlers/
│   │   ├── auth_handler.go
│   │   ├── supplier_handler.go
│   │   ├── company_handler.go
│   │   ├── woodspec_handler.go
│   │   ├── price_handler.go
│   │   ├── order_handler.go
│   │   ├── delivery_handler.go
│   │   ├── invoice_handler.go
│   │   └── payment_handler.go
│   ├── middleware/
│   │   ├── auth.go
│   │   ├── cors.go
│   │   └── rbac.go
│   ├── models/
│   │   ├── user.go
│   │   ├── supplier.go
│   │   ├── company.go
│   │   ├── woodspec.go
│   │   ├── price.go
│   │   ├── order.go
│   │   ├── delivery.go
│   │   ├── invoice.go
│   │   └── payment.go
│   ├── repositories/
│   │   ├── user_repo.go
│   │   ├── supplier_repo.go
│   │   ├── company_repo.go
│   │   ├── woodspec_repo.go
│   │   ├── price_repo.go
│   │   ├── order_repo.go
│   │   ├── delivery_repo.go
│   │   ├── invoice_repo.go
│   │   └── payment_repo.go
│   ├── services/
│   │   ├── auth_service.go
│   │   ├── supplier_service.go
│   │   ├── company_service.go
│   │   ├── woodspec_service.go
│   │   ├── price_service.go
│   │   ├── order_service.go
│   │   ├── delivery_service.go
│   │   ├── invoice_service.go
│   │   └── payment_service.go
│   └── utils/
│       ├── response.go
│       ├── validator.go
│       └── calculator.go
├── migrations/
│   ├── 001_init_schema.sql
│   └── 002_seed_data.sql
├── docs/
│   └── api.md
├── .env.example
├── .gitignore
├── go.mod
├── go.sum
├── Makefile
└── README.md
```

---

## 🚀 **Langkah Reorganisasi**

### **Step 1: Backup Proyek Saat Ini**

```bash
# Buat backup
cp -r timberflow timberflow-backup
```

### **Step 2: Buat Folder untuk 2 Repository**

```bash
# Di folder parent
mkdir timberflow-web
mkdir timberflow-api
```

### **Step 3: Pindahkan Frontend**

```bash
# Pindahkan file frontend
cd timberflow
mv src/ ../timberflow-web/
mv public/ ../timberflow-web/ 2>/dev/null || true
mv index.html ../timberflow-web/
mv package.json ../timberflow-web/
mv package-lock.json ../timberflow-web/
mv tsconfig.json ../timberflow-web/
mv vite.config.* ../timberflow-web/
mv .env ../timberflow-web/ 2>/dev/null || true
mv .gitignore ../timberflow-web/ 2>/dev/null || true
```

### **Step 4: Pindahkan Backend**

```bash
# Pindahkan file backend
cd timberflow
mv trade-api/* ../timberflow-api/
mv trade-api/.env.example ../timberflow-api/ 2>/dev/null || true
mv trade-api/.gitignore ../timberflow-api/ 2>/dev/null || true
rmdir trade-api
```

### **Step 5: Setup Repository Frontend**

```bash
cd ../timberflow-web

# Initialize git
git init
git add .
git commit -m "Initial commit: TimberFlow Frontend"

# Create GitHub repository
# Nama: timberflow-web
# Jangan initialize dengan README

# Add remote
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/timberflow-web.git
git push -u origin main
```

### **Step 6: Setup Repository Backend**

```bash
cd ../timberflow-api

# Initialize git
git init
git add .
git commit -m "Initial commit: TimberFlow Backend API"

# Create GitHub repository
# Nama: timberflow-api
# Jangan initialize dengan README

# Add remote
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/timberflow-api.git
git push -u origin main
```

---

## 📝 **File yang Perlu Dibuat**

### **Frontend (timberflow-web)**

#### **1. .gitignore**
```gitignore
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
```

#### **2. .env**
```env
VITE_API_URL=http://localhost:8080/api/v1
```

#### **3. README.md**
```markdown
# TimberFlow Web - Frontend

Frontend aplikasi Sistem Manajemen Trader Kayu Lapis (Plywood)

## Tech Stack
- React 18 + TypeScript
- Vite
- Tailwind CSS
- React Router
- Recharts

## Installation
```bash
npm install
```

## Development
```bash
npm run dev
```

## Build
```bash
npm run build
```

## Related
- Backend API: [timberflow-api](https://github.com/YOUR_USERNAME/timberflow-api)
```

---

### **Backend (timberflow-api)**

#### **1. .gitignore**
```gitignore
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
```

#### **2. Makefile**
```makefile
.PHONY: build run test clean migrate

# Build binary
build:
	go build -o server cmd/server/main.go

# Run server
run:
	go run cmd/server/main.go

# Run tests
test:
	go test ./...

# Clean binary
clean:
	rm -f server

# Run migrations
migrate:
	psql -U postgres -d timberflow -f migrations/001_init_schema.sql
	psql -U postgres -d timberflow -f migrations/002_seed_data.sql

# Install dependencies
deps:
	go mod download

# Format code
fmt:
	go fmt ./...

# Lint code
lint:
	golangci-lint run
```

#### **3. README.md**
```markdown
# TimberFlow API - Backend

Backend API untuk Sistem Manajemen Trader Kayu Lapis (Plywood)

## Tech Stack
- Go 1.21+
- Gin Framework
- PostgreSQL 15+
- GORM
- JWT Authentication

## Prerequisites
- Go 1.21+
- PostgreSQL 15+

## Installation
```bash
# Clone repository
git clone https://github.com/YOUR_USERNAME/timberflow-api.git
cd timberflow-api

# Install dependencies
make deps

# Setup database
createdb timberflow
make migrate

# Configure environment
cp .env.example .env
# Edit .env with your configuration
```

## Development
```bash
# Run server
make run

# Server akan berjalan di http://localhost:8080
```

## Build
```bash
make build
./server
```

## API Documentation
Lihat [docs/api.md](docs/api.md)

## Related
- Frontend: [timberflow-web](https://github.com/YOUR_USERNAME/timberflow-web)
```

---

## ✅ **Checklist Reorganisasi**

### **Persiapan:**
- [ ] Backup proyek saat ini
- [ ] Buat folder timberflow-web
- [ ] Buat folder timberflow-api

### **Frontend:**
- [ ] Pindahkan semua file frontend
- [ ] Buat .gitignore
- [ ] Buat .env
- [ ] Buat README.md
- [ ] Test build: `npm run build`
- [ ] Initialize git
- [ ] Push ke GitHub

### **Backend:**
- [ ] Pindahkan semua file backend
- [ ] Buat .gitignore
- [ ] Buat Makefile
- [ ] Buat README.md
- [ ] Test build: `go build`
- [ ] Initialize git
- [ ] Push ke GitHub

### **Testing:**
- [ ] Test backend API
- [ ] Test frontend connect ke backend
- [ ] Test semua fitur

### **Deployment:**
- [ ] Deploy backend
- [ ] Deploy frontend
- [ ] Setup environment variables
- [ ] Test production

---

## 🎯 **Keuntungan Reorganisasi**

### **1. Separation of Concerns**
- ✅ Frontend dan backend terpisah
- ✅ Tim bisa bekerja parallel
- ✅ Deploy independent

### **2. Better Organization**
- ✅ Struktur folder lebih jelas
- ✅ Easy to navigate
- ✅ Follow best practices

### **3. Scalability**
- ✅ Mudah menambah fitur
- ✅ Easy to maintain
- ✅ Better code organization

### **4. Professional**
- ✅ Industry standard structure
- ✅ Easy for new developers
- ✅ Better documentation

---

## 📚 **Referensi Struktur**

### **React + TypeScript Best Practices:**
- https://github.com/alan2207/bulletproof-react
- https://github.com/antfu/vite-template

### **Go Project Layout:**
- https://github.com/golang-standards/project-layout
- https://github.com/google/go-cloud

---

## 🆘 **Troubleshooting**

### **Problem: File tidak bisa dipindahkan**
```bash
# Pastikan tidak ada file yang sedang digunakan
# Close semua editor dan terminal
# Try again
```

### **Problem: Git push gagal**
```bash
# Check remote URL
git remote -v

# Update remote URL
git remote set-url origin https://github.com/YOUR_USERNAME/repo-name.git

# Try push again
git push -u origin main
```

### **Problem: Build error**
```bash
# Frontend
npm install
npm run build

# Backend
go mod tidy
go build
```

---

## 📞 **Support**

Jika ada masalah saat reorganisasi:
1. Check dokumentasi di setiap repository
2. Lihat troubleshooting section
3. Contact support

---

**Status:** ⏳ Ready to reorganize

**Silakan ikuti langkah-langkah di atas untuk memisahkan proyek menjadi 2 repository!** 🚀
