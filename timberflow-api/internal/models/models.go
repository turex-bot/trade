package models

import (
	"time"

	"gorm.io/gorm"
)

// Supplier represents a wood depot/supplier
type Supplier struct {
	ID           string         `gorm:"type:uuid;default:gen_random_uuid();primaryKey" json:"id"`
	Name         string         `gorm:"not null" json:"name" validate:"required"`
	OwnerName    string         `gorm:"not null" json:"owner_name" validate:"required"`
	Phone        string         `gorm:"not null" json:"phone" validate:"required"`
	Email        string         `json:"email"`
	Address      string         `gorm:"not null" json:"address" validate:"required"`
	BankAccount  string         `gorm:"not null" json:"bank_account" validate:"required"`
	BankName     string         `gorm:"not null" json:"bank_name" validate:"required"`
	NPWP         string         `json:"npwp"`
	Status       string         `gorm:"default:aktif" json:"status" validate:"required,oneof=aktif nonaktif"`
	CreatedAt    time.Time      `json:"created_at"`
	UpdatedAt    time.Time      `json:"updated_at"`
	DeletedAt    gorm.DeletedAt `gorm:"index" json:"-"`
}

// Company represents a plywood company (buyer)
type Company struct {
	ID           string         `gorm:"type:uuid;default:gen_random_uuid();primaryKey" json:"id"`
	Name         string         `gorm:"not null" json:"name" validate:"required"`
	PICName      string         `gorm:"not null" json:"pic_name" validate:"required"`
	PICPhone     string         `gorm:"not null" json:"pic_phone" validate:"required"`
	Address      string         `gorm:"not null" json:"address" validate:"required"`
	NPWP         string         `json:"npwp"`
	TOPDays      int            `gorm:"column:top_days;not null" json:"top_days" validate:"required,min=1"`
	CreditLimit  float64        `gorm:"not null;default:0" json:"credit_limit" validate:"required,min=0"`
	RiskRating   string         `gorm:"not null" json:"risk_rating" validate:"required,oneof=A B C"`
	Status       string         `gorm:"default:aktif" json:"status" validate:"required,oneof=aktif nonaktif"`
	CreatedAt    time.Time      `json:"created_at"`
	UpdatedAt    time.Time      `json:"updated_at"`
	DeletedAt    gorm.DeletedAt `gorm:"index" json:"-"`
}

// WoodSpec represents wood specification
type WoodSpec struct {
	ID             string         `gorm:"type:uuid;default:gen_random_uuid();primaryKey" json:"id"`
	WoodType       string         `gorm:"not null" json:"wood_type" validate:"required"`
	DiameterRange  string         `gorm:"not null" json:"diameter_range" validate:"required"`
	DiameterMin    float64        `gorm:"not null" json:"diameter_min" validate:"required,min=0"`
	DiameterMax    float64        `gorm:"not null" json:"diameter_max" validate:"required,min=0"`
	AvgDiameter    float64        `gorm:"not null" json:"avg_diameter" validate:"required,min=0"`
	StandardLength float64        `gorm:"not null" json:"standard_length" validate:"required,min=0"` // in cm
	VolumePerLog   float64        `gorm:"not null" json:"volume_per_log" validate:"required,min=0"`  // in m³
	Grade          string         `gorm:"not null" json:"grade" validate:"required,oneof=Reguler Premium"`
	Unit           string         `gorm:"default:m³" json:"unit"`
	Notes          string         `json:"notes"`
	CreatedAt      time.Time      `json:"created_at"`
	UpdatedAt      time.Time      `json:"updated_at"`
	DeletedAt      gorm.DeletedAt `gorm:"index" json:"-"`
}

// Price represents price list
type Price struct {
	ID              string         `gorm:"type:uuid;default:gen_random_uuid();primaryKey" json:"id"`
	WoodSpecID      string         `gorm:"type:uuid;not null" json:"wood_spec_id" validate:"required"`
	WoodSpecName    string         `gorm:"not null" json:"wood_spec_name" validate:"required"`
	BuyPrice        float64        `gorm:"not null" json:"buy_price" validate:"required,min=0"`        // per m³
	BuyPricePerLog  float64        `gorm:"not null" json:"buy_price_per_log" validate:"required,min=0"` // per log
	TraderMargin    float64        `gorm:"default:15000" json:"trader_margin"`                          // per m³
	SellPrice       float64        `gorm:"not null" json:"sell_price" validate:"required,min=0"`        // per m³
	SellPricePerLog float64        `gorm:"not null" json:"sell_price_per_log" validate:"required,min=0"` // per log
	EffectiveDate   time.Time      `gorm:"not null" json:"effective_date" validate:"required"`
	IsActive        bool           `gorm:"default:true" json:"is_active"`
	CreatedAt       time.Time      `json:"created_at"`
	UpdatedAt       time.Time      `json:"updated_at"`
	DeletedAt       gorm.DeletedAt `gorm:"index" json:"-"`
}

// Order represents a purchase order
type Order struct {
	ID           string         `gorm:"type:uuid;default:gen_random_uuid();primaryKey" json:"id"`
	OrderNumber  string         `gorm:"uniqueIndex;not null" json:"order_number"`
	OrderDate    time.Time      `gorm:"not null" json:"order_date" validate:"required"`
	CompanyID    string         `gorm:"type:uuid;not null" json:"company_id" validate:"required"`
	CompanyName  string         `gorm:"not null" json:"company_name" validate:"required"`
	SupplierID   string         `gorm:"type:uuid;not null" json:"supplier_id" validate:"required"`
	SupplierName string         `gorm:"not null" json:"supplier_name" validate:"required"`
	Status       string         `gorm:"default:draft" json:"status" validate:"required,oneof=draft confirmed in_delivery received invoiced paid cancelled"`
	TotalVolume  float64        `gorm:"not null" json:"total_volume" validate:"required,min=0"`
	TotalValue   float64        `gorm:"not null" json:"total_value" validate:"required,min=0"`
	Notes        string         `json:"notes"`
	Items        []OrderItem    `gorm:"foreignKey:OrderID;constraint:OnDelete:CASCADE" json:"items"`
	CreatedAt    time.Time      `json:"created_at"`
	UpdatedAt    time.Time      `json:"updated_at"`
	DeletedAt    gorm.DeletedAt `gorm:"index" json:"-"`
}

// OrderItem represents items in an order
type OrderItem struct {
	ID              string    `gorm:"type:uuid;default:gen_random_uuid();primaryKey" json:"id"`
	OrderID         string    `gorm:"type:uuid;not null" json:"order_id"`
	WoodSpecID      string    `gorm:"type:uuid" json:"wood_spec_id"`
	WoodSpecName    string    `gorm:"not null" json:"wood_spec_name" validate:"required"`
	NumberOfLogs    int       `gorm:"not null" json:"number_of_logs" validate:"required,min=1"`
	LogDiameters    []float64 `gorm:"type:decimal(5,2)[]" json:"log_diameters" validate:"required"`
	LogLength       float64   `gorm:"not null" json:"log_length" validate:"required,min=0"` // in cm
	VolumeDm3       float64   `gorm:"not null" json:"volume_dm3" validate:"required,min=0"`
	Volume          float64   `gorm:"not null" json:"volume" validate:"required,min=0"` // in m³
	BuyPricePerLog  float64   `gorm:"not null" json:"buy_price_per_log" validate:"required,min=0"`
	SellPricePerLog float64   `gorm:"not null" json:"sell_price_per_log" validate:"required,min=0"`
	BuyPrice        float64   `gorm:"not null" json:"buy_price" validate:"required,min=0"` // per m³
	SellPrice       float64   `gorm:"not null" json:"sell_price" validate:"required,min=0"` // per m³
	TotalBuyValue   float64   `gorm:"not null" json:"total_buy_value" validate:"required,min=0"`
	TotalSellValue  float64   `gorm:"not null" json:"total_sell_value" validate:"required,min=0"`
	CreatedAt       time.Time `json:"created_at"`
}

// Delivery represents a delivery order
type Delivery struct {
	ID           string         `gorm:"type:uuid;default:gen_random_uuid();primaryKey" json:"id"`
	DONumber     string         `gorm:"uniqueIndex;not null" json:"do_number"`
	OrderID      string         `gorm:"type:uuid;not null" json:"order_id" validate:"required"`
	OrderNumber  string         `gorm:"not null" json:"order_number" validate:"required"`
	DeliveryDate time.Time      `json:"delivery_date"`
	VehiclePlate string         `json:"vehicle_plate"`
	DriverName   string         `json:"driver_name"`
	ActualVolume float64        `json:"actual_volume"`
	ReceiveDate  *time.Time     `json:"receive_date"`
	Status       string         `gorm:"default:pending" json:"status" validate:"required,oneof=pending in_transit received rejected"`
	ReceivedBy   string         `json:"received_by"`
	CreatedAt    time.Time      `json:"created_at"`
	UpdatedAt    time.Time      `json:"updated_at"`
	DeletedAt    gorm.DeletedAt `gorm:"index" json:"-"`
}

// Invoice represents an invoice
type Invoice struct {
	ID            string         `gorm:"type:uuid;default:gen_random_uuid();primaryKey" json:"id"`
	InvoiceNumber string         `gorm:"uniqueIndex;not null" json:"invoice_number"`
	DeliveryID    string         `gorm:"type:uuid" json:"delivery_id"`
	OrderID       string         `gorm:"type:uuid;not null" json:"order_id" validate:"required"`
	CompanyID     string         `gorm:"type:uuid;not null" json:"company_id" validate:"required"`
	CompanyName   string         `gorm:"not null" json:"company_name" validate:"required"`
	InvoiceDate   time.Time      `gorm:"not null" json:"invoice_date" validate:"required"`
	DueDate       time.Time      `gorm:"not null" json:"due_date" validate:"required"`
	TotalAmount   float64        `gorm:"not null" json:"total_amount" validate:"required,min=0"`
	PaidAmount    float64        `gorm:"default:0" json:"paid_amount"`
	Status        string         `gorm:"default:unpaid" json:"status" validate:"required,oneof=unpaid partial paid"`
	AgingDays     int            `gorm:"default:0" json:"aging_days"`
	AgingCategory string         `json:"aging_category"`
	CreatedAt     time.Time      `json:"created_at"`
	UpdatedAt     time.Time      `json:"updated_at"`
	DeletedAt     gorm.DeletedAt `gorm:"index" json:"-"`
}

// Payment represents a payment record
type Payment struct {
	ID            string    `gorm:"type:uuid;default:gen_random_uuid();primaryKey" json:"id"`
	InvoiceID     string    `gorm:"type:uuid" json:"invoice_id"`
	InvoiceNumber string    `gorm:"not null" json:"invoice_number" validate:"required"`
	PaymentDate   time.Time `gorm:"not null" json:"payment_date" validate:"required"`
	Amount        float64   `gorm:"not null" json:"amount" validate:"required,min=0"`
	Method        string    `json:"method" validate:"required,oneof=transfer cash giro cek"`
	Reference     string    `json:"reference"`
	CreatedAt     time.Time `json:"created_at"`
}
