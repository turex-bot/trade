# 🔍 Backend Go Structure Audit Report

**Audit Date:** 2025-01-20  
**Project:** TimberFlow API  
**Stack:** Go + Gin + PostgreSQL + JWT  

---

## 📊 **Executive Summary**

### **Overall Assessment:** ⭐⭐⭐☆☆ (3/5)

Struktur folder backend memiliki **beberapa masalah kritis** yang perlu diperbaiki sebelum production-ready:

- ✅ **Yang Sudah Baik:** Basic structure, middleware separation, config management
- ❌ **Yang Perlu Diperbaiki:** Missing layers (service, repository, DTO), main.go terlalu gemuk, handler langsung akses DB

### **Critical Issues:** 5  
### **High Priority Issues:** 4  
### **Medium Priority Issues:** 3  

---

## 🎯 **Audit Checklist Results**

| # | Check Item | Status | Notes |
|---|-----------|--------|-------|
| 1 | Struktur folder sesuai best practice? | ❌ **NO** | Missing service, repository, DTO layers |
| 2 | Pemisahan handler/service/repository/model? | ❌ **NO** | Handler langsung akses database |
| 3 | main.go terlalu banyak logic? | ❌ **YES** | 172 lines, routing di main.go |
| 4 | Middleware terpisah dengan rapi? | ✅ **YES** | Good separation |
| 5 | Konfigurasi environment terpisah? | ✅ **YES** | Config package sudah baik |
| 6 | Ada duplikasi logic antar layer? | ❌ **YES** | Tidak ada layer, semua di handler |
| 7 | Penamaan file dan package konsisten? | ⚠️ **PARTIAL** | Beberapa inkonsistensi |
| 8 | Ada file yang salah penempatan? | ❌ **YES** | models.go terlalu besar |
| 9 | Struktur mudah di-scale? | ❌ **NO** | Akan sulit maintain saat fitur bertambah |

---

## 🚨 **Critical Issues (Must Fix)**

### **Issue #1: Missing Service Layer** 🔴
**Severity:** CRITICAL  
**Location:** `internal/handlers/*.go`

**Problem:**
Handler langsung mengakses database tanpa service layer. Ini melanggar prinsip separation of concerns.

**Current Code (supplier_handler.go):**
```go
func (h *SupplierHandler) GetAll(c *gin.Context) {
    var suppliers []models.Supplier
    if err := h.db.Find(&suppliers).Error; err != nil {  // ❌ Langsung akses DB
        utils.ErrorResponse(c, http.StatusInternalServerError, "Failed to fetch suppliers")
        return
    }
    utils.SuccessResponse(c, http.StatusOK, "Suppliers retrieved successfully", suppliers)
}
```

**Expected Structure:**
```
Handler → Service → Repository → Database
```

**Impact:**
- ❌ Business logic tercampur dengan HTTP handling
- ❌ Sulit untuk unit testing
- ❌ Sulit untuk reuse logic
- ❌ Violates Single Responsibility Principle

---

### **Issue #2: Missing Repository Layer** 🔴
**Severity:** CRITICAL  
**Location:** `internal/handlers/*.go`

**Problem:**
Tidak ada repository layer untuk database operations. Handler langsung query database.

**Current Code:**
```go
func (h *SupplierHandler) Create(c *gin.Context) {
    var supplier models.Supplier
    if err := c.ShouldBindJSON(&supplier); err != nil {
        utils.ErrorResponse(c, http.StatusBadRequest, "Invalid request body")
        return
    }
    if err := h.db.Create(&supplier).Error; err != nil {  // ❌ Langsung DB operation
        utils.ErrorResponse(c, http.StatusInternalServerError, "Failed to create supplier")
        return
    }
    utils.SuccessResponse(c, http.StatusCreated, "Supplier created successfully", supplier)
}
```

**Expected Structure:**
```go
// Repository
type SupplierRepository interface {
    FindAll() ([]models.Supplier, error)
    FindByID(id string) (*models.Supplier, error)
    Create(supplier *models.Supplier) error
    Update(supplier *models.Supplier) error
    Delete(id string) error
}

// Handler menggunakan repository
func (h *SupplierHandler) Create(c *gin.Context) {
    var req dtos.CreateSupplierRequest
    if err := c.ShouldBindJSON(&req); err != nil {
        utils.ErrorResponse(c, http.StatusBadRequest, err.Error())
        return
    }
    
    supplier := h.service.Create(req)  // ✅ Melalui service
    utils.SuccessResponse(c, http.StatusCreated, "Supplier created", supplier)
}
```

**Impact:**
- ❌ Database logic tercampur dengan HTTP handling
- ❌ Sulit untuk switch database (PostgreSQL → MySQL)
- ❌ Tidak ada abstraction layer
- ❌ Sulit untuk implement caching

---

### **Issue #3: Missing DTO Layer** 🔴
**Severity:** CRITICAL  
**Location:** Tidak ada folder `internal/dtos`

**Problem:**
Tidak ada DTO (Data Transfer Object) untuk request/response. Handler langsung menggunakan model.

**Current Code:**
```go
func (h *SupplierHandler) Create(c *gin.Context) {
    var supplier models.Supplier  // ❌ Langsung pakai model
    if err := c.ShouldBindJSON(&supplier); err != nil {
        utils.ErrorResponse(c, http.StatusBadRequest, "Invalid request body")
        return
    }
    // ...
}
```

**Expected Structure:**
```go
// DTOs
type CreateSupplierRequest struct {
    Name        string `json:"name" binding:"required"`
    OwnerName   string `json:"owner_name" binding:"required"`
    Phone       string `json:"phone" binding:"required"`
    Email       string `json:"email" binding:"required,email"`
    Address     string `json:"address" binding:"required"`
    BankAccount string `json:"bank_account" binding:"required"`
    BankName    string `json:"bank_name" binding:"required"`
}

type SupplierResponse struct {
    ID          string `json:"id"`
    Name        string `json:"name"`
    OwnerName   string `json:"owner_name"`
    Phone       string `json:"phone"`
    Email       string `json:"email"`
    Status      string `json:"status"`
    CreatedAt   string `json:"created_at"`
}
```

**Impact:**
- ❌ Model database terekspos ke API
- ❌ Sulit untuk evolve API tanpa break database schema
- ❌ Tidak ada validation layer yang proper
- ❌ Response bisa contain sensitive data (password, deleted_at, dll)

---

### **Issue #4: main.go Terlalu Gemuk** 🔴
**Severity:** CRITICAL  
**Location:** `cmd/server/main.go` (172 lines)

**Problem:**
main.go mengandung terlalu banyak logic:
- Database connection
- Auto migration
- Handler initialization
- **Routing definition** (90+ lines)
- Server startup

**Current Code:**
```go
func main() {
    // Load config
    cfg := config.LoadConfig()
    
    // Initialize database
    db, err := gorm.Open(postgres.Open(cfg.DatabaseURL), &gorm.Config{})
    
    // Auto migrate
    db.AutoMigrate(...)
    
    // Initialize handlers
    authHandler := handlers.NewAuthHandler(db, cfg.JWTSecret)
    
    // Initialize router
    router := gin.Default()
    
    // ❌ 90+ lines routing di sini
    v1 := router.Group("/api/v1")
    {
        auth := v1.Group("/auth")
        auth.Use(middleware.StrictRateLimitMiddleware())
        {
            auth.POST("/login", authHandler.Login)
            auth.POST("/register", authHandler.Register)
        }
        
        protected := v1.Group("")
        protected.Use(middleware.JWTAuthMiddleware(cfg.JWTSecret))
        {
            // Suppliers
            suppliers := protected.Group("/suppliers")
            {
                suppliers.GET("", supplierHandler.GetAll)
                suppliers.GET("/:id", supplierHandler.GetByID)
                // ... 50+ more routes
            }
        }
    }
    
    // Start server
    router.Run(":8080")
}
```

**Expected Structure:**
```go
// cmd/server/main.go (minimal)
func main() {
    cfg := config.LoadConfig()
    db := database.NewConnection(cfg.DatabaseURL)
    
    router := routes.SetupRoutes(db, cfg)
    
    log.Printf("Server starting on port %s", cfg.Port)
    router.Run(":" + cfg.Port)
}

// internal/routes/routes.go
func SetupRoutes(db *gorm.DB, cfg *config.Config) *gin.Engine {
    router := gin.Default()
    
    // Middleware
    router.Use(middleware.CORSMiddleware())
    router.Use(middleware.NormalRateLimitMiddleware())
    
    // Health check
    router.GET("/health", handlers.HealthCheck(db))
    
    // API routes
    setupAPIRoutes(router, db, cfg)
    
    return router
}
```

**Impact:**
- ❌ Sulit untuk maintain
- ❌ Sulit untuk test
- ❌ Violates Single Responsibility Principle
- ❌ Akan semakin gemuk saat fitur bertambah

---

### **Issue #5: models.go Terlalu Besar** 🔴
**Severity:** CRITICAL  
**Location:** `internal/models/models.go` (166 lines, 10 models)

**Problem:**
Semua model digabung dalam satu file. Ini akan menjadi sangat besar saat aplikasi grow.

**Current Structure:**
```
internal/models/
└── models.go  (166 lines, 10 models)
    - Supplier
    - Company
    - WoodSpec
    - Price
    - Order
    - OrderItem
    - Delivery
    - Invoice
    - Payment
    - User (separate file)
```

**Expected Structure:**
```
internal/models/
├── user.go
├── supplier.go
├── company.go
├── wood_spec.go
├── price.go
├── order.go
├── order_item.go
├── delivery.go
├── invoice.go
└── payment.go
```

**Impact:**
- ❌ Sulit untuk navigate
- ❌ Merge conflicts saat multiple developer edit
- ❌ File terlalu besar untuk di-review
- ❌ Violates Single Responsibility Principle

---

## ⚠️ **High Priority Issues**

### **Issue #6: Tidak Ada Pagination di GetAll** 🟠
**Severity:** HIGH  
**Location:** `internal/handlers/supplier_handler.go`

**Problem:**
```go
func (h *SupplierHandler) GetAll(c *gin.Context) {
    var suppliers []models.Supplier
    h.db.Find(&suppliers)  // ❌ Ambil semua data, tidak ada pagination
    utils.SuccessResponse(c, http.StatusOK, "Suppliers retrieved", suppliers)
}
```

**Expected:**
```go
func (h *SupplierHandler) GetAll(c *gin.Context) {
    page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
    limit, _ := strconv.Atoi(c.DefaultQuery("limit", "10"))
    
    var suppliers []models.Supplier
    var total int64
    
    h.db.Model(&models.Supplier{}).Count(&total)
    h.db.Offset((page - 1) * limit).Limit(limit).Find(&suppliers)
    
    utils.SuccessResponse(c, http.StatusOK, "Suppliers retrieved", gin.H{
        "data": suppliers,
        "pagination": gin.H{
            "page": page,
            "limit": limit,
            "total": total,
            "total_pages": (int(total) + limit - 1) / limit,
        },
    })
}
```

**Impact:**
- ❌ Performance issue saat data banyak
- ❌ Memory usage tinggi
- ❌ Response time lambat

---

### **Issue #7: Tidak Ada Error Handling yang Proper** 🟠
**Severity:** HIGH  
**Location:** `internal/handlers/*.go`

**Problem:**
```go
func (h *SupplierHandler) Create(c *gin.Context) {
    var supplier models.Supplier
    if err := c.ShouldBindJSON(&supplier); err != nil {
        utils.ErrorResponse(c, http.StatusBadRequest, "Invalid request body")  // ❌ Generic error
        return
    }
    
    if err := h.db.Create(&supplier).Error; err != nil {
        utils.ErrorResponse(c, http.StatusInternalServerError, "Failed to create supplier")  // ❌ Generic error
        return
    }
}
```

**Expected:**
```go
func (h *SupplierHandler) Create(c *gin.Context) {
    var req dtos.CreateSupplierRequest
    if err := c.ShouldBindJSON(&req); err != nil {
        // ❌ Proper validation error
        utils.ValidationErrorResponse(c, err)
        return
    }
    
    supplier, err := h.service.Create(req)
    if err != nil {
        // ❌ Proper error handling
        if errors.Is(err, domain.ErrDuplicateEmail) {
            utils.ErrorResponse(c, http.StatusConflict, "Email already exists")
        } else if errors.Is(err, domain.ErrInvalidPhone) {
            utils.ErrorResponse(c, http.StatusBadRequest, "Invalid phone number")
        } else {
            utils.ErrorResponse(c, http.StatusInternalServerError, "Internal server error")
            log.Error("Failed to create supplier:", err)  // ❌ Log error
        }
        return
    }
    
    utils.SuccessResponse(c, http.StatusCreated, "Supplier created", supplier)
}
```

**Impact:**
- ❌ Client tidak tahu error spesifik
- ❌ Sulit untuk debugging
- ❌ Poor user experience

---

### **Issue #8: Tidak Ada Input Validation** 🟠
**Severity:** HIGH  
**Location:** `internal/handlers/*.go`

**Problem:**
```go
func (h *SupplierHandler) Create(c *gin.Context) {
    var supplier models.Supplier
    c.ShouldBindJSON(&supplier)  // ❌ Tidak ada validation
    h.db.Create(&supplier)
}
```

**Expected:**
```go
// DTO dengan validation tags
type CreateSupplierRequest struct {
    Name        string `json:"name" binding:"required,min=3,max=100"`
    OwnerName   string `json:"owner_name" binding:"required,min=3,max=100"`
    Phone       string `json:"phone" binding:"required,e164"`
    Email       string `json:"email" binding:"required,email"`
    Address     string `json:"address" binding:"required,min=10"`
    BankAccount string `json:"bank_account" binding:"required,min=10,max=20"`
    BankName    string `json:"bank_name" binding:"required"`
}

// Handler dengan validation
func (h *SupplierHandler) Create(c *gin.Context) {
    var req dtos.CreateSupplierRequest
    if err := c.ShouldBindJSON(&req); err != nil {
        // ❌ Automatic validation
        utils.ValidationErrorResponse(c, err)
        return
    }
    // ...
}
```

**Impact:**
- ❌ Invalid data bisa masuk ke database
- ❌ Data integrity issue
- ❌ Sulit untuk debug

---

### **Issue #9: Tidak Ada Logging** 🟠
**Severity:** HIGH  
**Location:** Seluruh aplikasi

**Problem:**
Tidak ada structured logging. Hanya ada `log.Println` dan `log.Fatal`.

**Expected:**
```go
// internal/logger/logger.go
package logger

import (
    "go.uber.org/zap"
    "go.uber.org/zap/zapcore"
)

var Log *zap.Logger

func Init() {
    config := zap.NewProductionConfig()
    config.EncoderConfig.TimeKey = "timestamp"
    config.EncoderConfig.EncodeTime = zapcore.ISO8601TimeEncoder
    
    Log, _ = config.Build()
}

// Usage
logger.Log.Info("Supplier created",
    zap.String("supplier_id", supplier.ID),
    zap.String("supplier_name", supplier.Name),
    zap.String("user_id", userID),
)

logger.Log.Error("Failed to create supplier",
    zap.Error(err),
    zap.String("request_body", string(body)),
)
```

**Impact:**
- ❌ Sulit untuk debugging di production
- ❌ Tidak ada audit trail
- ❌ Sulit untuk monitoring

---

## 🟡 **Medium Priority Issues**

### **Issue #10: Tidak Ada Database Migration Tool** 🟡
**Severity:** MEDIUM  
**Location:** `migrations/`

**Problem:**
Hanya ada SQL file, tidak ada migration tool seperti golang-migrate atau goose.

**Expected:**
```bash
# Menggunakan golang-migrate
migrate create -ext sql -dir migrations -seq create_suppliers_table
migrate -database postgres://... -path migrations up
```

**Impact:**
- ❌ Sulit untuk track schema changes
- ❌ Manual migration error-prone
- ❌ Tidak ada rollback mechanism

---

### **Issue #11: Tidak Ada Unit Tests** 🟡
**Severity:** MEDIUM  
**Location:** Tidak ada folder `*_test.go`

**Problem:**
Tidak ada unit tests sama sekali.

**Expected:**
```
internal/
├── handlers/
│   ├── supplier_handler.go
│   └── supplier_handler_test.go  ✅
├── services/
│   ├── supplier_service.go
│   └── supplier_service_test.go  ✅
└── repositories/
    ├── supplier_repository.go
    └── supplier_repository_test.go  ✅
```

**Impact:**
- ❌ Tidak ada regression protection
- ❌ Sulit untuk refactor
- ❌ Low code quality

---

### **Issue #12: Tidak Ada API Documentation** 🟡
**Severity:** MEDIUM  
**Location:** `docs/`

**Problem:**
Hanya ada `api.md` manual, tidak ada Swagger/OpenAPI.

**Expected:**
```go
// @title TimberFlow API
// @version 1.0
// @description API for TimberFlow

// @host localhost:8080
// @BasePath /api/v1

// @securityDefinitions.apikey BearerAuth
// @in header
// @name Authorization

// @Summary Get all suppliers
// @Description Get list of all suppliers
// @Tags suppliers
// @Accept json
// @Produce json
// @Success 200 {array} models.Supplier
// @Router /suppliers [get]
// @Security BearerAuth
func (h *SupplierHandler) GetAll(c *gin.Context) {
    // ...
}
```

**Impact:**
- ❌ Sulit untuk frontend developer
- ❌ Tidak ada interactive API docs
- ❌ Manual documentation error-prone

---

## 📁 **Current Structure vs Expected Structure**

### **Current Structure:**
```
timberflow-api/
├── cmd/server/
│   └── main.go (172 lines) ❌
├── internal/
│   ├── config/
│   │   └── config.go ✅
│   ├── handlers/
│   │   ├── auth_handler.go
│   │   ├── company_handler.go
│   │   ├── health_handler.go
│   │   └── supplier_handler.go ❌ (langsung akses DB)
│   ├── middleware/
│   │   ├── middleware.go ✅
│   │   └── rate_limit.go ✅
│   ├── models/
│   │   ├── models.go (166 lines) ❌
│   │   └── user.go ✅
│   └── utils/
│       ├── calculator.go ✅
│       ├── pagination.go ✅
│       ├── response.go ✅
│       └── transaction.go ✅
├── migrations/
│   └── 001_init_schema.sql ✅
├── docs/
│   └── api.md ✅
├── go.mod ✅
├── Makefile ✅
└── README.md ✅
```

### **Expected Structure:**
```
timberflow-api/
├── cmd/
│   └── server/
│       └── main.go (minimal, <30 lines) ✅
├── internal/
│   ├── config/
│   │   └── config.go ✅
│   ├── middleware/
│   │   ├── cors.go ✅
│   │   ├── auth.go ✅
│   │   ├── ratelimit.go ✅
│   │   └── logger.go ✅
│   ├── models/
│   │   ├── user.go ✅
│   │   ├── supplier.go ✅
│   │   ├── company.go ✅
│   │   ├── wood_spec.go ✅
│   │   ├── price.go ✅
│   │   ├── order.go ✅
│   │   ├── order_item.go ✅
│   │   ├── delivery.go ✅
│   │   ├── invoice.go ✅
│   │   └── payment.go ✅
│   ├── dtos/
│   │   ├── user_dto.go ✅
│   │   ├── supplier_dto.go ✅
│   │   ├── company_dto.go ✅
│   │   └── ... ✅
│   ├── repositories/
│   │   ├── user_repository.go ✅
│   │   ├── supplier_repository.go ✅
│   │   ├── company_repository.go ✅
│   │   └── ... ✅
│   ├── services/
│   │   ├── auth_service.go ✅
│   │   ├── supplier_service.go ✅
│   │   ├── company_service.go ✅
│   │   └── ... ✅
│   ├── handlers/
│   │   ├── auth_handler.go ✅
│   │   ├── supplier_handler.go ✅
│   │   ├── company_handler.go ✅
│   │   └── ... ✅
│   ├── routes/
│   │   └── routes.go ✅
│   └── utils/
│       ├── response.go ✅
│       ├── validator.go ✅
│       ├── pagination.go ✅
│       ├── transaction.go ✅
│       └── calculator.go ✅
├── pkg/
│   └── logger/
│       └── logger.go ✅
├── migrations/
│   ├── 001_init_schema.sql ✅
│   └── 002_add_indexes.sql ✅
├── docs/
│   ├── api.md ✅
│   └── swagger.yaml ✅
├── tests/
│   ├── handlers/
│   ├── services/
│   └── repositories/
├── go.mod ✅
├── go.sum ✅
├── Makefile ✅
├── .env.example ✅
└── README.md ✅
```

---

## 🔧 **Refactoring Plan**

### **Phase 1: Create Missing Layers (Week 1)**

#### **Step 1.1: Create DTO Layer**
```bash
mkdir -p internal/dtos
```

**File: `internal/dtos/supplier_dto.go`**
```go
package dtos

import "time"

// Request DTOs
type CreateSupplierRequest struct {
    Name        string `json:"name" binding:"required,min=3,max=100"`
    OwnerName   string `json:"owner_name" binding:"required,min=3,max=100"`
    Phone       string `json:"phone" binding:"required"`
    Email       string `json:"email" binding:"required,email"`
    Address     string `json:"address" binding:"required,min=10"`
    BankAccount string `json:"bank_account" binding:"required"`
    BankName    string `json:"bank_name" binding:"required"`
    NPWP        string `json:"npwp"`
}

type UpdateSupplierRequest struct {
    Name        *string `json:"name"`
    OwnerName   *string `json:"owner_name"`
    Phone       *string `json:"phone"`
    Email       *string `json:"email"`
    Address     *string `json:"address"`
    BankAccount *string `json:"bank_account"`
    BankName    *string `json:"bank_name"`
    NPWP        *string `json:"npwp"`
    Status      *string `json:"status"`
}

// Response DTOs
type SupplierResponse struct {
    ID          string    `json:"id"`
    Name        string    `json:"name"`
    OwnerName   string    `json:"owner_name"`
    Phone       string    `json:"phone"`
    Email       string    `json:"email"`
    Address     string    `json:"address"`
    BankAccount string    `json:"bank_account"`
    BankName    string    `json:"bank_name"`
    NPWP        string    `json:"npwp"`
    Status      string    `json:"status"`
    CreatedAt   time.Time `json:"created_at"`
    UpdatedAt   time.Time `json:"updated_at"`
}
```

#### **Step 1.2: Create Repository Layer**
```bash
mkdir -p internal/repositories
```

**File: `internal/repositories/supplier_repository.go`**
```go
package repositories

import (
    "timberflow-api/internal/models"
    "gorm.io/gorm"
)

type SupplierRepository interface {
    FindAll(page, limit int) ([]models.Supplier, int64, error)
    FindByID(id string) (*models.Supplier, error)
    FindByEmail(email string) (*models.Supplier, error)
    Create(supplier *models.Supplier) error
    Update(supplier *models.Supplier) error
    Delete(id string) error
}

type supplierRepository struct {
    db *gorm.DB
}

func NewSupplierRepository(db *gorm.DB) SupplierRepository {
    return &supplierRepository{db: db}
}

func (r *supplierRepository) FindAll(page, limit int) ([]models.Supplier, int64, error) {
    var suppliers []models.Supplier
    var total int64
    
    r.db.Model(&models.Supplier{}).Count(&total)
    
    offset := (page - 1) * limit
    err := r.db.Offset(offset).Limit(limit).Find(&suppliers).Error
    
    return suppliers, total, err
}

func (r *supplierRepository) FindByID(id string) (*models.Supplier, error) {
    var supplier models.Supplier
    err := r.db.First(&supplier, "id = ?", id).Error
    return &supplier, err
}

func (r *supplierRepository) Create(supplier *models.Supplier) error {
    return r.db.Create(supplier).Error
}

func (r *supplierRepository) Update(supplier *models.Supplier) error {
    return r.db.Save(supplier).Error
}

func (r *supplierRepository) Delete(id string) error {
    return r.db.Delete(&models.Supplier{}, "id = ?", id).Error
}
```

#### **Step 1.3: Create Service Layer**
```bash
mkdir -p internal/services
```

**File: `internal/services/supplier_service.go`**
```go
package services

import (
    "errors"
    "timberflow-api/internal/dtos"
    "timberflow-api/internal/models"
    "timberflow-api/internal/repositories"
)

type SupplierService interface {
    GetAll(page, limit int) ([]dtos.SupplierResponse, int64, error)
    GetByID(id string) (*dtos.SupplierResponse, error)
    Create(req dtos.CreateSupplierRequest) (*dtos.SupplierResponse, error)
    Update(id string, req dtos.UpdateSupplierRequest) (*dtos.SupplierResponse, error)
    Delete(id string) error
}

type supplierService struct {
    repo repositories.SupplierRepository
}

func NewSupplierService(repo repositories.SupplierRepository) SupplierService {
    return &supplierService{repo: repo}
}

func (s *supplierService) GetAll(page, limit int) ([]dtos.SupplierResponse, int64, error) {
    suppliers, total, err := s.repo.FindAll(page, limit)
    if err != nil {
        return nil, 0, err
    }
    
    var responses []dtos.SupplierResponse
    for _, supplier := range suppliers {
        responses = append(responses, s.toResponse(&supplier))
    }
    
    return responses, total, nil
}

func (s *supplierService) Create(req dtos.CreateSupplierRequest) (*dtos.SupplierResponse, error) {
    // Check duplicate email
    existing, _ := s.repo.FindByEmail(req.Email)
    if existing != nil {
        return nil, errors.New("email already exists")
    }
    
    supplier := &models.Supplier{
        Name:        req.Name,
        OwnerName:   req.OwnerName,
        Phone:       req.Phone,
        Email:       req.Email,
        Address:     req.Address,
        BankAccount: req.BankAccount,
        BankName:    req.BankName,
        NPWP:        req.NPWP,
        Status:      "aktif",
    }
    
    if err := s.repo.Create(supplier); err != nil {
        return nil, err
    }
    
    return s.toResponse(supplier), nil
}

func (s *supplierService) toResponse(supplier *models.Supplier) *dtos.SupplierResponse {
    return &dtos.SupplierResponse{
        ID:          supplier.ID,
        Name:        supplier.Name,
        OwnerName:   supplier.OwnerName,
        Phone:       supplier.Phone,
        Email:       supplier.Email,
        Address:     supplier.Address,
        BankAccount: supplier.BankAccount,
        BankName:    supplier.BankName,
        NPWP:        supplier.NPWP,
        Status:      supplier.Status,
        CreatedAt:   supplier.CreatedAt,
        UpdatedAt:   supplier.UpdatedAt,
    }
}
```

#### **Step 1.4: Refactor Handler**
```go
package handlers

import (
    "net/http"
    "strconv"
    
    "github.com/gin-gonic/gin"
    "timberflow-api/internal/dtos"
    "timberflow-api/internal/services"
    "timberflow-api/internal/utils"
)

type SupplierHandler struct {
    service services.SupplierService
}

func NewSupplierHandler(service services.SupplierService) *SupplierHandler {
    return &SupplierHandler{service: service}
}

func (h *SupplierHandler) GetAll(c *gin.Context) {
    page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
    limit, _ := strconv.Atoi(c.DefaultQuery("limit", "10"))
    
    suppliers, total, err := h.service.GetAll(page, limit)
    if err != nil {
        utils.ErrorResponse(c, http.StatusInternalServerError, "Failed to fetch suppliers")
        return
    }
    
    utils.SuccessResponse(c, http.StatusOK, "Suppliers retrieved", gin.H{
        "data": suppliers,
        "pagination": gin.H{
            "page": page,
            "limit": limit,
            "total": total,
            "total_pages": (int(total) + limit - 1) / limit,
        },
    })
}

func (h *SupplierHandler) Create(c *gin.Context) {
    var req dtos.CreateSupplierRequest
    if err := c.ShouldBindJSON(&req); err != nil {
        utils.ValidationErrorResponse(c, err)
        return
    }
    
    supplier, err := h.service.Create(req)
    if err != nil {
        if err.Error() == "email already exists" {
            utils.ErrorResponse(c, http.StatusConflict, err.Error())
        } else {
            utils.ErrorResponse(c, http.StatusInternalServerError, err.Error())
        }
        return
    }
    
    utils.SuccessResponse(c, http.StatusCreated, "Supplier created", supplier)
}
```

---

### **Phase 2: Refactor main.go (Week 1)**

**File: `internal/routes/routes.go`**
```go
package routes

import (
    "github.com/gin-gonic/gin"
    "gorm.io/gorm"
    "timberflow-api/internal/config"
    "timberflow-api/internal/handlers"
    "timberflow-api/internal/middleware"
    "timberflow-api/internal/repositories"
    "timberflow-api/internal/services"
)

func SetupRoutes(db *gorm.DB, cfg *config.Config) *gin.Engine {
    router := gin.Default()
    
    // Global middleware
    router.Use(middleware.CORSMiddleware())
    router.Use(middleware.NormalRateLimitMiddleware())
    
    // Health check
    router.GET("/health", handlers.HealthCheck(db))
    
    // API v1
    v1 := router.Group("/api/v1")
    {
        // Public routes
        setupAuthRoutes(v1, db, cfg)
        
        // Protected routes
        protected := v1.Group("")
        protected.Use(middleware.JWTAuthMiddleware(cfg.JWTSecret))
        {
            setupSupplierRoutes(protected, db)
            setupCompanyRoutes(protected, db)
            // ... other routes
        }
    }
    
    return router
}

func setupAuthRoutes(v1 *gin.RouterGroup, db *gorm.DB, cfg *config.Config) {
    auth := v1.Group("/auth")
    auth.Use(middleware.StrictRateLimitMiddleware())
    
    userRepo := repositories.NewUserRepository(db)
    authService := services.NewAuthService(userRepo, cfg.JWTSecret)
    authHandler := handlers.NewAuthHandler(authService)
    
    auth.POST("/login", authHandler.Login)
    auth.POST("/register", authHandler.Register)
}

func setupSupplierRoutes(protected *gin.RouterGroup, db *gorm.DB) {
    supplierRepo := repositories.NewSupplierRepository(db)
    supplierService := services.NewSupplierService(supplierRepo)
    supplierHandler := handlers.NewSupplierHandler(supplierService)
    
    suppliers := protected.Group("/suppliers")
    {
        suppliers.GET("", supplierHandler.GetAll)
        suppliers.GET("/:id", supplierHandler.GetByID)
        suppliers.POST("", supplierHandler.Create)
        suppliers.PUT("/:id", supplierHandler.Update)
        suppliers.DELETE("/:id", supplierHandler.Delete)
    }
}
```

**File: `cmd/server/main.go` (Refactored)**
```go
package main

import (
    "log"
    
    "github.com/joho/godotenv"
    "timberflow-api/internal/config"
    "timberflow-api/internal/database"
    "timberflow-api/internal/routes"
)

func main() {
    // Load environment variables
    godotenv.Load()
    
    // Initialize configuration
    cfg := config.LoadConfig()
    
    // Initialize database
    db := database.NewConnection(cfg.DatabaseURL)
    
    // Setup routes
    router := routes.SetupRoutes(db, cfg)
    
    // Start server
    log.Printf("🚀 Server starting on port %s", cfg.Port)
    if err := router.Run(":" + cfg.Port); err != nil {
        log.Fatal("Failed to start server:", err)
    }
}
```

---

### **Phase 3: Split models.go (Week 2)**

```bash
# Split models.go into separate files
internal/models/
├── user.go
├── supplier.go
├── company.go
├── wood_spec.go
├── price.go
├── order.go
├── order_item.go
├── delivery.go
├── invoice.go
└── payment.go
```

**Example: `internal/models/supplier.go`**
```go
package models

import (
    "time"
    "gorm.io/gorm"
)

type Supplier struct {
    ID           string         `gorm:"type:uuid;default:gen_random_uuid();primaryKey" json:"id"`
    Name         string         `gorm:"not null" json:"name"`
    OwnerName    string         `gorm:"not null" json:"owner_name"`
    Phone        string         `gorm:"not null" json:"phone"`
    Email        string         `json:"email"`
    Address      string         `gorm:"not null" json:"address"`
    BankAccount  string         `gorm:"not null" json:"bank_account"`
    BankName     string         `gorm:"not null" json:"bank_name"`
    NPWP         string         `json:"npwp"`
    Status       string         `gorm:"default:aktif" json:"status"`
    CreatedAt    time.Time      `json:"created_at"`
    UpdatedAt    time.Time      `json:"updated_at"`
    DeletedAt    gorm.DeletedAt `gorm:"index" json:"-"`
}

func (Supplier) TableName() string {
    return "suppliers"
}
```

---

### **Phase 4: Add Missing Features (Week 3-4)**

1. ✅ Add logger package
2. ✅ Add Swagger documentation
3. ✅ Add unit tests
4. ✅ Add database migration tool
5. ✅ Add error handling middleware
6. ✅ Add request ID middleware
7. ✅ Add caching layer (Redis)

---

## 📊 **Priority Matrix**

| Priority | Issue | Effort | Impact | Timeline |
|----------|-------|--------|--------|----------|
| 🔴 **P0** | Create Service Layer | High | High | Week 1 |
| 🔴 **P0** | Create Repository Layer | High | High | Week 1 |
| 🔴 **P0** | Create DTO Layer | Medium | High | Week 1 |
| 🔴 **P0** | Refactor main.go | Medium | High | Week 1 |
| 🔴 **P0** | Split models.go | Low | Medium | Week 2 |
| 🟠 **P1** | Add Pagination | Low | High | Week 2 |
| 🟠 **P1** | Add Error Handling | Medium | High | Week 2 |
| 🟠 **P1** | Add Input Validation | Medium | High | Week 2 |
| 🟠 **P1** | Add Logging | Medium | Medium | Week 3 |
| 🟡 **P2** | Add Migration Tool | Low | Medium | Week 3 |
| 🟡 **P2** | Add Unit Tests | High | Medium | Week 3-4 |
| 🟡 **P2** | Add Swagger Docs | Medium | Low | Week 4 |

---

## ✅ **Final Recommendations**

### **Immediate Actions (This Week):**
1. ✅ Create DTO layer (`internal/dtos/`)
2. ✅ Create Repository layer (`internal/repositories/`)
3. ✅ Create Service layer (`internal/services/`)
4. ✅ Refactor handlers to use service layer
5. ✅ Refactor main.go (extract routes)
6. ✅ Split models.go into separate files

### **Short-term (Next 2 Weeks):**
1. ✅ Add pagination to all GET endpoints
2. ✅ Add proper error handling
3. ✅ Add input validation
4. ✅ Add structured logging
5. ✅ Add database migration tool

### **Long-term (Next Month):**
1. ✅ Add unit tests (target 70% coverage)
2. ✅ Add Swagger documentation
3. ✅ Add caching layer
4. ✅ Add monitoring & metrics
5. ✅ Add CI/CD pipeline

---

## 🎯 **Expected Outcome**

After refactoring:

✅ **Clean Architecture:** Handler → Service → Repository → Database  
✅ **Separation of Concerns:** Each layer has single responsibility  
✅ **Testability:** Easy to unit test each layer  
✅ **Maintainability:** Easy to understand and modify  
✅ **Scalability:** Easy to add new features  
✅ **Security:** Proper validation and error handling  
✅ **Performance:** Pagination, caching, optimized queries  

---

**Audit Completed:** ✅  
**Next Review:** After Phase 1 completion (Week 2)
