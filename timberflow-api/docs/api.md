# TimberFlow API Documentation

## Base URL
```
http://localhost:8080/api/v1
```

## Authentication

### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "admin@timberflow.id",
  "password": "admin123"
}
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

### Register
```http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "full_name": "User Name",
  "role": "operator"
}
```

## Suppliers

### Get All Suppliers
```http
GET /suppliers
Authorization: Bearer <token>
```

### Get Supplier by ID
```http
GET /suppliers/:id
Authorization: Bearer <token>
```

### Create Supplier
```http
POST /suppliers
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Depo Kayu Makmur",
  "owner_name": "Pak Hartono",
  "phone": "081234567890",
  "email": "makmur@email.com",
  "address": "Jl. Hutan Pinus No. 45, Samarinda",
  "bank_account": "1234567890",
  "bank_name": "BCA",
  "npwp": "01.234.567.8-901.000",
  "status": "aktif"
}
```

### Update Supplier
```http
PUT /suppliers/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Depo Kayu Makmur Jaya",
  "phone": "081234567891"
}
```

### Delete Supplier
```http
DELETE /suppliers/:id
Authorization: Bearer <token>
```

## Companies

### Get All Companies
```http
GET /companies
Authorization: Bearer <token>
```

### Create Company
```http
POST /companies
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "PT. Plywood Nusantara",
  "pic_name": "Ibu Sari",
  "pic_phone": "081111111111",
  "address": "Kawasan Industri Jababeka, Cikarang",
  "npwp": "11.111.111.1-111.000",
  "top_days": 30,
  "credit_limit": 500000000,
  "risk_rating": "A",
  "status": "aktif"
}
```

## Wood Specifications

### Get All Wood Specs
```http
GET /wood-specs
Authorization: Bearer <token>
```

### Create Wood Spec
```http
POST /wood-specs
Authorization: Bearer <token>
Content-Type: application/json

{
  "wood_type": "Meranti",
  "diameter_range": "20-30 cm",
  "diameter_min": 20,
  "diameter_max": 30,
  "avg_diameter": 25,
  "standard_length": 400,
  "volume_per_log": 0.196,
  "grade": "Premium",
  "unit": "m³",
  "notes": "Bebas kulit, kadar air maks 15%"
}
```

## Prices

### Get All Prices
```http
GET /prices
Authorization: Bearer <token>
```

### Create Price
```http
POST /prices
Authorization: Bearer <token>
Content-Type: application/json

{
  "wood_spec_id": "uuid",
  "wood_spec_name": "Meranti 20-30cm Premium",
  "buy_price": 1200000,
  "buy_price_per_log": 235200,
  "trader_margin": 15000,
  "sell_price": 1215000,
  "sell_price_per_log": 238140,
  "effective_date": "2025-01-01",
  "is_active": true
}
```

## Orders

### Get All Orders
```http
GET /orders
Authorization: Bearer <token>
```

### Create Order
```http
POST /orders
Authorization: Bearer <token>
Content-Type: application/json

{
  "order_date": "2025-01-15",
  "company_id": "uuid",
  "company_name": "PT. Plywood Nusantara",
  "supplier_id": "uuid",
  "supplier_name": "Depo Kayu Makmur",
  "status": "draft",
  "total_volume": 50,
  "total_value": 60750000,
  "notes": "Pesanan rutin Januari",
  "items": [
    {
      "wood_spec_id": "uuid",
      "wood_spec_name": "Meranti 20-30cm Premium",
      "number_of_logs": 255,
      "log_diameters": [21, 22, 23, ...],
      "log_length": 400,
      "volume_dm3": 50000,
      "volume": 50,
      "buy_price_per_log": 235200,
      "sell_price_per_log": 238140,
      "buy_price": 1200000,
      "sell_price": 1215000,
      "total_buy_value": 59976000,
      "total_sell_value": 60725700
    }
  ]
}
```

### Confirm Order
```http
POST /orders/:id/confirm
Authorization: Bearer <token>
```

## Deliveries

### Get All Deliveries
```http
GET /deliveries
Authorization: Bearer <token>
```

### Create Delivery
```http
POST /deliveries
Authorization: Bearer <token>
Content-Type: application/json

{
  "order_id": "uuid",
  "order_number": "ORD-202501-0001",
  "delivery_date": "2025-01-17",
  "vehicle_plate": "KT 1234 AB",
  "driver_name": "Pak Joko",
  "actual_volume": 50,
  "status": "in_transit"
}
```

### Mark Delivery as Received
```http
POST /deliveries/:id/receive
Authorization: Bearer <token>
Content-Type: application/json

{
  "receive_date": "2025-01-18",
  "received_by": "Ibu Sari"
}
```

## Invoices

### Get All Invoices
```http
GET /invoices
Authorization: Bearer <token>
```

### Generate Invoice
```http
POST /invoices/:id/generate
Authorization: Bearer <token>
```

## Payments

### Get All Payments
```http
GET /payments
Authorization: Bearer <token>
```

### Create Payment
```http
POST /payments
Authorization: Bearer <token>
Content-Type: application/json

{
  "invoice_id": "uuid",
  "invoice_number": "INV-202501-0001",
  "payment_date": "2025-02-15",
  "amount": 60750000,
  "method": "transfer",
  "reference": "TRF-BCA-001234"
}
```

## Error Responses

### 400 Bad Request
```json
{
  "code": 400,
  "message": "Invalid request body"
}
```

### 401 Unauthorized
```json
{
  "code": 401,
  "message": "Invalid email or password"
}
```

### 404 Not Found
```json
{
  "code": 404,
  "message": "Supplier not found"
}
```

### 500 Internal Server Error
```json
{
  "code": 500,
  "message": "Failed to create supplier"
}
```

## Business Logic

### Volume Calculation
```
V = (π/4) × d² × L

Where:
- d = diameter in meters
- L = length in meters
- Result = volume in m³
```

### Margin Calculation
```
Margin = Volume (m³) × Rp15.000
```

### Payment Calculation

**To Supplier:**
```
Payable = Total Price - Margin
```

**From Company:**
```
Receivable = Total Price (margin already included)
```

## Rate Limiting

- Login: 5 requests per minute
- Other endpoints: 100 requests per minute

## CORS

Allowed origins:
- http://localhost:5173
- http://localhost:3000

---

**Last Updated:** 2025-01-20
