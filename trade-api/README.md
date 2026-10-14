# TimberFlow API - Backend

Backend API untuk Sistem Manajemen Trader Kayu Lapis (Plywood)

## Tech Stack

- **Language**: Go 1.21+
- **Framework**: Gin
- **Database**: PostgreSQL 15+
- **ORM**: GORM
- **Authentication**: JWT
- **Validation**: go-playground/validator

## Features

- ✅ User Authentication & Authorization (JWT)
- ✅ Role-Based Access Control (Admin, Operator, Finance)
- ✅ Supplier Management
- ✅ Company Management
- ✅ Wood Specification Management
- ✅ Price Management
- ✅ Order Management
- ✅ Delivery Management
- ✅ Invoice Management
- ✅ Payment Recording
- ✅ Audit Logging

## Prerequisites

- Go 1.21 or higher
- PostgreSQL 15 or higher
- Git

## Installation

### 1. Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/trade-api.git
cd trade-api
```

### 2. Install Dependencies

```bash
go mod download
```

### 3. Setup Database

```bash
# Create database
createdb timberflow

# Or using psql
psql -U postgres
CREATE DATABASE timberflow;
```

### 4. Configure Environment

```bash
# Copy .env.example to .env
cp .env.example .env

# Edit .env file with your configuration
nano .env
```

### 5. Run Application

```bash
# Development
go run cmd/server/main.go

# Build
go build -o server cmd/server/main.go

# Run built binary
./server
```

Server akan berjalan di `http://localhost:8080`

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/auth/login` | Login user |
| POST | `/api/v1/auth/register` | Register new user |

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
| POST | `/api/v1/invoices/:id/invoice` | Generate invoice |

### Payments

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/payments` | Get all payments |
| POST | `/api/v1/payments` | Create payment |

## Authentication

Semua endpoint kecuali `/api/v1/auth/*` memerlukan JWT token.

**Header:**
```
Authorization: Bearer <your-jwt-token>
```

**Login:**
```bash
curl -X POST http://localhost:8080/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@timberflow.id",
    "password": "admin123"
  }'
```

**Response:**
```json
{
  "code": 200,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "uuid",
      "email": "admin@timberflow.id",
      "full_name": "Admin User",
      "role": "admin"
    },
    "expires_at": "2025-01-21T10:00:00Z"
  }
}
```

## Database Schema

Database akan otomatis di-migrate saat aplikasi pertama kali dijalankan.

**Tables:**
- `users` - User accounts
- `suppliers` - Wood suppliers/depots
- `companies` - Plywood companies (buyers)
- `wood_specs` - Wood specifications
- `prices` - Price list
- `orders` - Purchase orders
- `order_items` - Order line items
- `deliveries` - Delivery orders
- `invoices` - Invoices
- `payments` - Payment records

## Business Logic

### Volume Calculation

```go
// Formula: V = (π/4) × d² × L
// diameter in cm, length in cm, result in m³
volume = (math.Pi / 4) * (diameter/100)² * (length/100)
```

### Margin Calculation

```go
// Trader margin: Rp15.000 per m³
margin = volume_m3 * 15000
```

### Payment Calculation

**To Supplier:**
```go
payable = total_price - margin
```

**From Company:**
```go
receivable = total_price  // Company pays full price
```

## Development

### Run in Development Mode

```bash
go run cmd/server/main.go
```

### Build for Production

```bash
go build -o server cmd/server/main.go
```

### Run Tests

```bash
go test ./...
```

## Deployment

### Using Docker

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

### Environment Variables

```env
DATABASE_URL=postgres://user:pass@host:5432/dbname
JWT_SECRET=your-secret-key
PORT=8080
ENVIRONMENT=production
```

## Project Structure

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
├── .env.example
├── go.mod
├── go.sum
└── README.md
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License

## Support

For support, email support@timberflow.id or join our Slack channel.
