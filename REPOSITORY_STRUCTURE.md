# 🏗️ Arsitektur 2 Repository - Panduan Lengkap

## 📋 **Struktur Repository**

### **Repository 1: trade-web (Frontend)**
```
trade-web/
├── src/
│   ├── components/          # UI Components
│   ├── pages/              # Halaman aplikasi
│   ├── context/            # State management
│   ├── data/               # Mock data & types
│   ├── utils/              # Helper functions
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── public/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.js
└── README.md
```

### **Repository 2: trade-api (Backend)**
```
trade-api/
├── cmd/
│   └── server/
│       └── main.go         # Entry point
├── internal/
│   ├── config/             # Konfigurasi
│   ├── handlers/           # HTTP handlers
│   ├── models/             # Database models
│   ├── repositories/       # Database queries
│   ├── services/           # Business logic
│   ├── middleware/         # Auth, CORS, dll
│   └── utils/              # Helper functions
├── migrations/             # Database migrations
├── docs/                   # API documentation
├── go.mod
├── go.sum
├── .env.example
└── README.md
```

---

## 🔧 **Setup Repository 1: trade-web**

### **Step 1: Buat Repository Baru**
```bash
# Di GitHub, buat repository baru: trade-web
# Jangan initialize dengan README
```

### **Step 2: Push Kode Frontend**
```bash
# Di folder proyek saat ini
git init
git add .
git commit -m "Initial commit: TimberFlow Frontend"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/trade-web.git
git push -u origin main
```

### **Step 3: Update README**
```markdown
# TimberFlow - Frontend

Sistem Manajemen Trader Kayu Lapis (Plywood) - Frontend Application

## Tech Stack
- React 18 + TypeScript
- Vite
- Tailwind CSS
- React Router
- Recharts

## Features
- Dashboard dengan KPI real-time
- Master Data Management (Supplier, Company, Wood Spec, Price)
- Transaction Management (Orders, Deliveries)
- Financial Management (Payables, Receivables)
- Reports & Analytics
- Audit Log

## Installation
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
```

## Environment Variables
```env
VITE_API_URL=http://localhost:8080/api/v1
```
```

---

## 🔧 **Setup Repository 2: trade-api**

### **Step 1: Buat Folder Baru**
```bash
mkdir trade-api
cd trade-api
```

### **Step 2: Initialize Go Module**
```bash
go mod init github.com/YOUR_USERNAME/trade-api
```

### **Step 3: Install Dependencies**
```bash
go get -u github.com/gin-gonic/gin
go get -u gorm.io/gorm
go get -u gorm.io/driver/postgres
go get -u github.com/golang-jwt/jwt/v5
go get -u github.com/go-playground/validator/v10
go get -u github.com/joho/godotenv
go get -u golang.org/x/crypto/bcrypt
```

---

## 📁 **Struktur File Backend**

Saya akan membuat file-file backend yang lengkap. Berikut adalah struktur yang akan dibuat:

### **1. Main Entry Point**
- `cmd/server/main.go` - Entry point aplikasi

### **2. Configuration**
- `internal/config/config.go` - Konfigurasi aplikasi
- `.env.example` - Template environment variables

### **3. Models**
- `internal/models/user.go` - User model
- `internal/models/supplier.go` - Supplier model
- `internal/models/company.go` - Company model
- `internal/models/wood_spec.go` - Wood specification model
- `internal/models/price.go` - Price model
- `internal/models/order.go` - Order model
- `internal/models/delivery.go` - Delivery model
- `internal/models/invoice.go` - Invoice model
- `internal/models/payment.go` - Payment model

### **4. Repositories**
- `internal/repositories/user_repo.go`
- `internal/repositories/supplier_repo.go`
- `internal/repositories/company_repo.go`
- `internal/repositories/wood_spec_repo.go`
- `internal/repositories/price_repo.go`
- `internal/repositories/order_repo.go`
- `internal/repositories/delivery_repo.go`
- `internal/repositories/invoice_repo.go`
- `internal/repositories/payment_repo.go`

### **5. Services**
- `internal/services/auth_service.go`
- `internal/services/supplier_service.go`
- `internal/services/company_service.go`
- `internal/services/wood_spec_service.go`
- `internal/services/price_service.go`
- `internal/services/order_service.go`
- `internal/services/delivery_service.go`
- `internal/services/invoice_service.go`
- `internal/services/payment_service.go`

### **6. Handlers**
- `internal/handlers/auth_handler.go`
- `internal/handlers/supplier_handler.go`
- `internal/handlers/company_handler.go`
- `internal/handlers/wood_spec_handler.go`
- `internal/handlers/price_handler.go`
- `internal/handlers/order_handler.go`
- `internal/handlers/delivery_handler.go`
- `internal/handlers/invoice_handler.go`
- `internal/handlers/payment_handler.go`

### **7. Middleware**
- `internal/middleware/auth.go` - JWT authentication
- `internal/middleware/cors.go` - CORS handling
- `internal/middleware/rbac.go` - Role-based access control

### **8. Utils**
- `internal/utils/response.go` - Response formatter
- `internal/utils/validator.go` - Input validator
- `internal/utils/calculator.go` - Volume calculator

### **9. Database**
- `migrations/001_init.sql` - Initial schema
- `migrations/002_seed.sql` - Seed data

---

## 🚀 **Cara Menggunakan 2 Repository**

### **Development Mode**

**Terminal 1 - Backend:**
```bash
cd trade-api
go run cmd/server/main.go
# Server berjalan di http://localhost:8080
```

**Terminal 2 - Frontend:**
```bash
cd trade-web
npm run dev
# Frontend berjalan di http://localhost:5173
```

### **Production Mode**

**Backend:**
```bash
cd trade-api
go build -o server cmd/server/main.go
./server
```

**Frontend:**
```bash
cd trade-web
npm run build
# Deploy folder dist/ ke hosting
```

---

## 🔗 **Integrasi Frontend-Backend**

### **Update Frontend untuk Connect ke Backend**

**File: `src/config/api.ts`**
```typescript
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api/v1';

export const api = {
  // Auth
  login: (email: string, password: string) => 
    fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    }),
  
  // Suppliers
  getSuppliers: () => 
    fetch(`${API_BASE_URL}/suppliers`, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    }),
  
  // ... other endpoints
};
```

**File: `.env`**
```env
VITE_API_URL=http://localhost:8080/api/v1
```

---

## 📊 **Database Schema**

### **PostgreSQL Schema**

```sql
-- Users
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(255),
  role VARCHAR(50) CHECK (role IN ('admin', 'operator', 'finance')),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Suppliers
CREATE TABLE suppliers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  owner_name VARCHAR(255),
  phone VARCHAR(50),
  email VARCHAR(255),
  address TEXT,
  bank_account VARCHAR(100),
  bank_name VARCHAR(100),
  npwp VARCHAR(50),
  status VARCHAR(50) DEFAULT 'aktif',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Companies
CREATE TABLE companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  pic_name VARCHAR(255),
  pic_phone VARCHAR(50),
  address TEXT,
  npwp VARCHAR(50),
  top_days INT NOT NULL,
  credit_limit DECIMAL(15,2) NOT NULL DEFAULT 0,
  risk_rating VARCHAR(10) CHECK (risk_rating IN ('A', 'B', 'C')),
  status VARCHAR(50) DEFAULT 'aktif',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Wood Specs
CREATE TABLE wood_specs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wood_type VARCHAR(255) NOT NULL,
  diameter_range VARCHAR(100) NOT NULL,
  diameter_min DECIMAL(5,2) NOT NULL,
  diameter_max DECIMAL(5,2) NOT NULL,
  avg_diameter DECIMAL(5,2) NOT NULL,
  standard_length DECIMAL(5,2) NOT NULL,
  volume_per_log DECIMAL(10,4) NOT NULL,
  grade VARCHAR(50) CHECK (grade IN ('Reguler', 'Premium')),
  unit VARCHAR(50) DEFAULT 'm³',
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Prices
CREATE TABLE prices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wood_spec_id UUID REFERENCES wood_specs(id),
  wood_spec_name VARCHAR(255) NOT NULL,
  buy_price DECIMAL(15,2) NOT NULL,
  buy_price_per_log DECIMAL(15,2) NOT NULL,
  trader_margin DECIMAL(15,2) DEFAULT 15000,
  sell_price DECIMAL(15,2) NOT NULL,
  sell_price_per_log DECIMAL(15,2) NOT NULL,
  effective_date DATE NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Orders
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number VARCHAR(100) UNIQUE NOT NULL,
  order_date DATE NOT NULL,
  company_id UUID REFERENCES companies(id),
  company_name VARCHAR(255) NOT NULL,
  supplier_id UUID REFERENCES suppliers(id),
  supplier_name VARCHAR(255) NOT NULL,
  status VARCHAR(50) DEFAULT 'draft',
  total_volume DECIMAL(10,2) NOT NULL,
  total_value DECIMAL(15,2) NOT NULL,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Order Items
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  wood_spec_id UUID REFERENCES wood_specs(id),
  wood_spec_name VARCHAR(255) NOT NULL,
  number_of_logs INT NOT NULL,
  log_diameters DECIMAL(5,2)[] NOT NULL,
  log_length DECIMAL(5,2) NOT NULL,
  volume_dm3 DECIMAL(10,2) NOT NULL,
  volume DECIMAL(10,2) NOT NULL,
  buy_price_per_log DECIMAL(15,2) NOT NULL,
  sell_price_per_log DECIMAL(15,2) NOT NULL,
  buy_price DECIMAL(15,2) NOT NULL,
  sell_price DECIMAL(15,2) NOT NULL,
  total_buy_value DECIMAL(15,2) NOT NULL,
  total_sell_value DECIMAL(15,2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payments
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_id UUID,
  invoice_number VARCHAR(100) NOT NULL,
  payment_date DATE NOT NULL,
  amount DECIMAL(15,2) NOT NULL,
  method VARCHAR(50),
  reference VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 📝 **Checklist Setup**

### **Repository trade-web:**
- [ ] Buat repository di GitHub
- [ ] Push kode frontend
- [ ] Update README
- [ ] Setup environment variables
- [ ] Test build

### **Repository trade-api:**
- [ ] Buat repository di GitHub
- [ ] Initialize Go module
- [ ] Install dependencies
- [ ] Buat struktur folder
- [ ] Implementasi models
- [ ] Implementasi repositories
- [ ] Implementasi services
- [ ] Implementasi handlers
- [ ] Setup database
- [ ] Run migrations
- [ ] Test API endpoints
- [ ] Update README

### **Integrasi:**
- [ ] Update frontend untuk connect ke backend
- [ ] Test login flow
- [ ] Test CRUD operations
- [ ] Test payment flow
- [ ] Deploy backend
- [ ] Deploy frontend
- [ ] Test production

---

## 🎯 **Next Steps**

Saya akan membuat file-file backend (Go API) secara lengkap. File-file tersebut akan mencakup:

1. ✅ Main entry point
2. ✅ Configuration
3. ✅ Models
4. ✅ Repositories
5. ✅ Services
6. ✅ Handlers
7. ✅ Middleware
8. ✅ Utils
9. ✅ Database migrations
10. ✅ Documentation

**Apakah Anda ingin saya lanjutkan membuat semua file backend tersebut?** 🚀
