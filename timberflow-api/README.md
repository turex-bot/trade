# TimberFlow API - Backend

Backend API untuk Sistem Manajemen Trader Kayu Lapis (Plywood) dengan standar enterprise.

## 🚀 Tech Stack

- **Language**: Go 1.21+
- **Framework**: Gin
- **Database**: PostgreSQL 15+
- **ORM**: GORM
- **Authentication**: JWT
- **Validation**: go-playground/validator
- **Logging**: Zap
- **Configuration**: Viper

## ✨ Features

### Core Modules
- ✅ User Authentication & Authorization (JWT)
- ✅ Role-Based Access Control (Admin, Operator, Finance)
- ✅ Supplier Management
- ✅ Company Management
- ✅ Wood Specification Management
- ✅ Price Management
- ✅ Order Management (Multi-item)
- ✅ Delivery Management
- ✅ Invoice Management
- ✅ Payment Recording
- ✅ Audit Logging

### Advanced Features
- ✅ CORS Support
- ✅ Request Validation
- ✅ Error Handling
- ✅ Database Migrations
- ✅ Environment Configuration
- ✅ Structured Logging

## 📦 Installation

### Prerequisites
- Go 1.21 or higher
- PostgreSQL 15 or higher
- Git

### Steps

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

# Run server
make run
```

## 🔧 Configuration

### Environment Variables

```env
# Database
DATABASE_URL=postgres://postgres:postgres@localhost:5432/timberflow?sslmode=disable

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRATION=24

# Server
PORT=8080
ENVIRONMENT=development

# CORS
CORS_ORIGIN=http://localhost:5173
```

## 🏗️ Project Structure

```
timberflow-api/
├── cmd/
│   └── server/
│       └── main.go              # Entry point
├── internal/
│   ├── config/
│   │   └── config.go           # Configuration loader
│   ├── handlers/
│   │   ├── auth_handler.go     # Authentication endpoints
│   │   ├── supplier_handler.go # Supplier CRUD
│   │   ├── company_handler.go  # Company CRUD
│   │   ├── woodspec_handler.go # Wood spec CRUD
│   │   ├── price_handler.go    # Price CRUD
│   │   ├── order_handler.go    # Order management
│   │   ├── delivery_handler.go # Delivery management
│   │   ├── invoice_handler.go  # Invoice management
│   │   └── payment_handler.go  # Payment recording
│   ├── middleware/
│   │   ├── auth.go            # JWT authentication
│   │   ├── cors.go            # CORS handling
│   │   └── rbac.go            # Role-based access
│   ├── models/
│   │   ├── user.go            # User model
│   │   ├── supplier.go        # Supplier model
│   │   ├── company.go         # Company model
│   │   ├── woodspec.go        # Wood spec model
│   │   ├── price.go           # Price model
│   │   ├── order.go           # Order model
│   │   ├── delivery.go        # Delivery model
│   │   ├── invoice.go         # Invoice model
│   │   └── payment.go         # Payment model
│   ├── repositories/
│   │   ├── user_repo.go       # User data access
│   │   ├── supplier_repo.go   # Supplier data access
│   │   ├── company_repo.go    # Company data access
│   │   ├── woodspec_repo.go   # Wood spec data access
│   │   ├── price_repo.go      # Price data access
│   │   ├── order_repo.go      # Order data access
│   │   ├── delivery_repo.go   # Delivery data access
│   │   ├── invoice_repo.go    # Invoice data access
│   │   └── payment_repo.go    # Payment data access
│   ├── services/
│   │   ├── auth_service.go    # Auth business logic
│   │   ├── supplier_service.go # Supplier business logic
│   │   ├── company_service.go # Company business logic
│   │   ├── woodspec_service.go # Wood spec business logic
│   │   ├── price_service.go   # Price business logic
│   │   ├── order_service.go   # Order business logic
│   │   ├── delivery_service.go # Delivery business logic
│   │   ├── invoice_service.go # Invoice business logic
│   │   └── payment_service.go # Payment business logic
│   └── utils/
│       ├── response.go        # Response formatter
│       ├── validator.go       # Input validator
│       └── calculator.go      # Volume calculator
├── migrations/
│   ├── 001_init_schema.sql    # Database schema
│   └── 002_seed_data.sql      # Seed data
├── docs/
│   └── api.md                 # API documentation
├── tests/
│   ├── handlers/              # Handler tests
│   ├── services/              # Service tests
│   └── repositories/          # Repository tests
├── .env.example               # Environment template
├── .gitignore
├── go.mod                     # Go module
├── go.sum                     # Go dependencies
├── Makefile                   # Build commands
└── README.md                  # This file
```

## 📡 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/auth/login` | Login user |
| POST | `/api/v1/auth/register` | Register new user |
| GET | `/api/v1/auth/profile` | Get user profile |

### Suppliers
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/suppliers` | Get all suppliers |
| GET | `/api/v1/suppliers/:id` | Get supplier by ID |
| POST | `/api/v1/suppliers` | Create supplier |
| PUT | `/api/v1/suppliers/:id` | Update supplier |
| DELETE | `/api/v1/suppliers/:id` | Delete supplier |

### Companies
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/companies` | Get all companies |
| GET | `/api/v1/companies/:id` | Get company by ID |
| POST | `/api/v1/companies` | Create company |
| PUT | `/api/v1/companies/:id` | Update company |
| DELETE | `/api/v1/companies/:id` | Delete company |

### Wood Specifications
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/wood-specs` | Get all wood specs |
| GET | `/api/v1/wood-specs/:id` | Get wood spec by ID |
| POST | `/api/v1/wood-specs` | Create wood spec |
| PUT | `/api/v1/wood-specs/:id` | Update wood spec |
| DELETE | `/api/v1/wood-specs/:id` | Delete wood spec |

### Prices
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/prices` | Get all prices |
| GET | `/api/v1/prices/:id` | Get price by ID |
| POST | `/api/v1/prices` | Create price |
| PUT | `/api/v1/prices/:id` | Update price |
| DELETE | `/api/v1/prices/:id` | Delete price |

### Orders
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/orders` | Get all orders |
| GET | `/api/v1/orders/:id` | Get order by ID |
| POST | `/api/v1/orders` | Create order |
| PUT | `/api/v1/orders/:id` | Update order |
| DELETE | `/api/v1/orders/:id` | Delete order |
| POST | `/api/v1/orders/:id/confirm` | Confirm order |

### Deliveries
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/deliveries` | Get all deliveries |
| GET | `/api/v1/deliveries/:id` | Get delivery by ID |
| POST | `/api/v1/deliveries` | Create delivery |
| PUT | `/api/v1/deliveries/:id` | Update delivery |
| DELETE | `/api/v1/deliveries/:id` | Delete delivery |
| POST | `/api/v1/deliveries/:id/receive` | Mark as received |

### Invoices
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/invoices` | Get all invoices |
| GET | `/api/v1/invoices/:id` | Get invoice by ID |
| POST | `/api/v1/invoices/:id/generate` | Generate invoice |

### Payments
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/payments` | Get all payments |
| POST | `/api/v1/payments` | Create payment |

## 🔐 Authentication

All endpoints except `/api/v1/auth/*` require JWT token.

**Header:**
```
Authorization: Bearer <your-jwt-token>
```

**Example:**
```bash
curl -X GET http://localhost:8080/api/v1/suppliers \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

## 📊 Business Logic

### Volume Calculation
```go
// Formula: V = (π/4) × d² × L
// diameter in cm, length in cm, result in m³
func CalculateLogVolumeM3(diameterCm, lengthCm float64) float64 {
    diameterM := diameterCm / 100
    lengthM := lengthCm / 100
    return (math.Pi / 4) * (diameterM * diameterM) * lengthM
}
```

### Margin Calculation
```go
// Trader margin: Rp15.000 per m³
func CalculateMargin(volumeM3 float64) float64 {
    return volumeM3 * 15000
}
```

### Payment Calculation
```go
// To Supplier: Total Price - Margin
func CalculatePayableToSupplier(totalPrice, margin float64) float64 {
    return totalPrice - margin
}

// From Company: Total Price (margin already included)
func CalculateReceivableFromCompany(totalPrice float64) float64 {
    return totalPrice
}
```

## 🧪 Testing

```bash
# Run all tests
make test

# Run tests with coverage
make test-coverage

# Run specific test
go test ./internal/handlers -v
```

## 🚀 Deployment

### Build
```bash
make build
```

### Docker
```bash
# Build image
docker build -t timberflow-api:latest .

# Run container
docker run -p 8080:8080 --env-file .env timberflow-api:latest
```

### Production
```bash
# Build for production
make prod

# Run binary
./server
```

## 📝 Makefile Commands

```bash
make build      # Build binary
make run        # Run server
make test       # Run tests
make clean      # Clean binary
make migrate    # Run migrations
make deps       # Install dependencies
make fmt        # Format code
make lint       # Lint code
make dev        # Development mode
make prod       # Production build
make help       # Show help
```

## 🔗 Related

- Frontend: [timberflow-web](https://github.com/YOUR_USERNAME/timberflow-web)
- API Documentation: [docs/api.md](docs/api.md)

## 📄 License

MIT License

## 🆘 Support

Email: support@timberflow.id

---

**Built with ❤️ for Indonesian Plywood Traders**
