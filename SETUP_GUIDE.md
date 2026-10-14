# 🚀 Panduan Setup 2 Repository - TimberFlow

## 📋 **Overview**

TimberFlow sekarang terdiri dari 2 repository terpisah:

1. **trade-web** - Frontend (React + TypeScript + Vite)
2. **trade-api** - Backend (Go + Gin + PostgreSQL)

---

## 🏗️ **Arsitektur**

```
┌─────────────────┐                    ┌─────────────────┐
│   trade-web     │                    │   trade-api     │
│   (Frontend)    │                    │   (Backend)     │
│                 │                    │                 │
│  React + Vite   │◄──── HTTP/JSON ───►│  Go + Gin       │
│  TypeScript     │    (REST API)      │  PostgreSQL     │
│  Tailwind CSS   │                    │  JWT Auth       │
│                 │                    │                 │
│  Port: 5173     │                    │  Port: 8080     │
└─────────────────┘                    └─────────────────┘
```

---

## 📦 **Repository 1: trade-web (Frontend)**

### **Struktur:**
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
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.js
└── README.md
```

### **Setup:**

```bash
# 1. Buat repository baru di GitHub
# Nama: trade-web
# Jangan initialize dengan README

# 2. Clone atau navigate ke folder proyek
cd trade-web

# 3. Initialize git
git init
git add .
git commit -m "Initial commit: TimberFlow Frontend"

# 4. Add remote
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/trade-web.git

# 5. Push
git push -u origin main
```

### **Development:**

```bash
# Install dependencies
npm install

# Run development server
npm run dev
# Buka http://localhost:5173

# Build for production
npm run build
```

### **Environment Variables:**

Buat file `.env` di root folder:

```env
VITE_API_URL=http://localhost:8080/api/v1
```

---

## 📦 **Repository 2: trade-api (Backend)**

### **Struktur:**
```
trade-api/
├── cmd/
│   └── server/
│       └── main.go              # Entry point
├── internal/
│   ├── config/                  # Configuration
│   ├── handlers/                # HTTP handlers
│   ├── models/                  # Database models
│   ├── middleware/              # Auth, CORS, RBAC
│   └── utils/                   # Helper functions
├── migrations/
│   └── 001_init.sql            # Database schema
├── .env.example
├── go.mod
├── go.sum
└── README.md
```

### **Setup:**

```bash
# 1. Buat repository baru di GitHub
# Nama: trade-api
# Jangan initialize dengan README

# 2. Navigate ke folder trade-api
cd trade-api

# 3. Initialize git
git init
git add .
git commit -m "Initial commit: TimberFlow Backend API"

# 4. Add remote
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/trade-api.git

# 5. Push
git push -u origin main
```

### **Prerequisites:**

1. **Go 1.21+**
   ```bash
   # Download dari https://go.dev/dl/
   go version
   ```

2. **PostgreSQL 15+**
   ```bash
   # macOS
   brew install postgresql
   
   # Ubuntu
   sudo apt install postgresql
   
   # Windows
   # Download dari https://www.postgresql.org/download/windows/
   ```

3. **Install Dependencies**
   ```bash
   cd trade-api
   go mod download
   ```

### **Database Setup:**

```bash
# 1. Start PostgreSQL
# macOS
brew services start postgresql

# Ubuntu
sudo service postgresql start

# 2. Create database
createdb timberflow

# Or using psql
psql -U postgres
CREATE DATABASE timberflow;
\q

# 3. Run migrations
psql -U postgres -d timberflow -f migrations/001_init.sql
```

### **Configuration:**

```bash
# 1. Copy .env.example to .env
cp .env.example .env

# 2. Edit .env
nano .env
```

**Isi file .env:**
```env
DATABASE_URL=postgres://postgres:postgres@localhost:5432/timberflow?sslmode=disable
JWT_SECRET=your-super-secret-jwt-key-change-in-production
PORT=8080
ENVIRONMENT=development
```

### **Run Backend:**

```bash
# Development
go run cmd/server/main.go

# Build
go build -o server cmd/server/main.go

# Run built binary
./server
```

Server akan berjalan di `http://localhost:8080`

---

## 🔗 **Integrasi Frontend-Backend**

### **Update Frontend untuk Connect ke Backend**

**1. Buat file `src/config/api.ts`:**

```typescript
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api/v1';

export const api = {
  // Auth
  login: async (email: string, password: string) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    return response.json();
  },

  // Suppliers
  getSuppliers: async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/suppliers`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return response.json();
  },

  createSupplier: async (data: any) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/suppliers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });
    return response.json();
  },

  // ... other endpoints
};
```

**2. Update `src/pages/Login.tsx`:**

```typescript
import { api } from '../config/api';

const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  
  const result = await api.login(email, password);
  
  if (result.code === 200) {
    localStorage.setItem('token', result.data.token);
    localStorage.setItem('user', JSON.stringify(result.data.user));
    navigate('/');
  } else {
    toast.error(result.message);
  }
};
```

**3. Update `src/context/DataContext.tsx`:**

```typescript
import { api } from '../config/api';

export function DataProvider({ children }: { children: ReactNode }) {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);

  useEffect(() => {
    // Fetch from API
    api.getSuppliers().then(result => {
      if (result.code === 200) {
        setSuppliers(result.data);
      }
    });
  }, []);

  const addSupplier = async (supplier: Omit<Supplier, 'id'>) => {
    const result = await api.createSupplier(supplier);
    if (result.code === 201) {
      setSuppliers(prev => [...prev, result.data]);
    }
  };

  // ... rest of the code
}
```

---

## 🧪 **Testing**

### **Test Backend API:**

```bash
# Test login
curl -X POST http://localhost:8080/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@timberflow.id",
    "password": "admin123"
  }'

# Expected response:
# {
#   "code": 200,
#   "message": "Login successful",
#   "data": {
#     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
#     "user": {...}
#   }
# }

# Test get suppliers
TOKEN="your-jwt-token"
curl -X GET http://localhost:8080/api/v1/suppliers \
  -H "Authorization: Bearer $TOKEN"
```

### **Test Frontend:**

1. Buka `http://localhost:5173`
2. Login dengan:
   - Email: `admin@timberflow.id`
   - Password: `admin123`
3. Test fitur:
   - Tambah supplier
   - Tambah perusahaan
   - Buat pesanan
   - Input pembayaran

---

## 🚀 **Deployment**

### **Backend Deployment:**

**Option 1: VPS/Server**
```bash
# Build
go build -o server cmd/server/main.go

# Run with systemd or supervisor
sudo systemctl start trade-api
```

**Option 2: Docker**
```dockerfile
FROM golang:1.21-alpine

WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download

COPY . .
RUN go build -o server cmd/server/main.go

EXPOSE 8080
CMD ["./server"]
```

```bash
docker build -t trade-api .
docker run -p 8080:8080 --env-file .env trade-api
```

### **Frontend Deployment:**

**Option 1: Vercel/Netlify**
```bash
npm run build
# Upload folder dist/
```

**Option 2: VPS/Server**
```bash
npm run build
# Serve with nginx or any web server
```

---

## 📝 **Checklist Setup**

### **Repository trade-web:**
- [ ] Buat repository di GitHub
- [ ] Push kode frontend
- [ ] Update README
- [ ] Setup environment variables
- [ ] Test build
- [ ] Deploy

### **Repository trade-api:**
- [ ] Buat repository di GitHub
- [ ] Push kode backend
- [ ] Install Go dependencies
- [ ] Setup PostgreSQL
- [ ] Run database migrations
- [ ] Setup environment variables
- [ ] Test API endpoints
- [ ] Update README
- [ ] Deploy

### **Integrasi:**
- [ ] Update frontend untuk connect ke backend
- [ ] Test login flow
- [ ] Test CRUD operations
- [ ] Test payment flow
- [ ] Test all features
- [ ] Deploy both services

---

## 🎯 **Next Steps**

1. **Selesaikan Backend Handlers**
   - Company handler
   - Wood spec handler
   - Price handler
   - Order handler
   - Delivery handler
   - Invoice handler
   - Payment handler

2. **Update Frontend**
   - Connect ke backend API
   - Remove mock data
   - Test all features

3. **Testing**
   - Unit tests
   - Integration tests
   - E2E tests

4. **Deployment**
   - Setup production environment
   - Deploy backend
   - Deploy frontend
   - Setup monitoring

---

## 📚 **Documentation**

- **Frontend README**: `trade-web/README.md`
- **Backend README**: `trade-api/README.md`
- **API Documentation**: `trade-api/README.md#api-endpoints`
- **Database Schema**: `trade-api/migrations/001_init.sql`

---

## 💡 **Tips**

1. **Development:**
   - Run backend dan frontend di terminal terpisah
   - Gunakan hot reload untuk development
   - Test API dengan Postman atau curl

2. **Production:**
   - Gunakan environment variables
   - Setup HTTPS
   - Enable logging
   - Setup monitoring
   - Backup database regularly

3. **Security:**
   - Change JWT secret in production
   - Use strong passwords
   - Enable CORS properly
   - Validate all inputs
   - Use HTTPS in production

---

## 🆘 **Troubleshooting**

### **Backend tidak bisa connect ke database:**
```bash
# Check PostgreSQL is running
sudo service postgresql status

# Check database exists
psql -U postgres -l | grep timberflow

# Check connection string in .env
cat .env | grep DATABASE_URL
```

### **Frontend tidak bisa connect ke backend:**
```bash
# Check backend is running
curl http://localhost:8080/api/v1/auth/login

# Check CORS settings in backend
# Check VITE_API_URL in frontend .env
```

### **JWT token invalid:**
```bash
# Check JWT_SECRET in .env
# Make sure frontend and backend use same secret
```

---

## ✅ **Status**

- ✅ Repository structure created
- ✅ Backend basic setup complete
- ✅ Frontend already exists
- ⏳ Backend handlers (in progress)
- ⏳ Frontend-backend integration
- ⏳ Testing
- ⏳ Deployment

**Both repositories are ready for development!** 🚀
