package models

import (
	"time"

	"gorm.io/gorm"
)

type Order struct {
	ID            string         `gorm:"type:uuid;default:gen_random_uuid();primaryKey" json:"id"`
	OrderNumber   string         `gorm:"uniqueIndex;not null" json:"order_number"`
	OrderDate     time.Time      `gorm:"not null" json:"order_date" validate:"required"`
	CompanyID     string         `gorm:"type:uuid;not null" json:"company_id" validate:"required"`
	CompanyName   string         `gorm:"not null" json:"company_name" validate:"required"`
	SupplierID    string         `gorm:"type:uuid;not null" json:"supplier_id" validate:"required"`
	SupplierName  string         `gorm:"not null" json:"supplier_name" validate:"required"`
	Status        string         `gorm:"default:draft" json:"status" validate:"required,oneof=draft confirmed in_delivery received invoiced paid cancelled"`
	TotalVolume   float64        `gorm:"not null" json:"total_volume" validate:"required,min=0"`
	TotalValue    float64        `gorm:"not null" json:"total_value" validate:"required,min=0"`
	Notes         string         `json:"notes"`
	Items         []OrderItem    `gorm:"foreignKey:OrderID;constraint:OnDelete:CASCADE" json:"items"`
	CreatedAt     time.Time      `json:"created_at"`
	UpdatedAt     time.Time      `json:"updated_at"`
	DeletedAt     gorm.DeletedAt `gorm:"index" json:"-"`
}

func (Order) TableName() string {
	return "orders"
}

type OrderItem struct {
	ID              string    `gorm:"type:uuid;default:gen_random_uuid();primaryKey" json:"id"`
	OrderID         string    `gorm:"type:uuid;not null" json:"order_id"`
	WoodSpecID      string    `gorm:"type:uuid" json:"wood_spec_id"`
	WoodSpecName    string    `gorm:"not null" json:"wood_spec_name" validate:"required"`
	NumberOfLogs    int       `gorm:"not null" json:"number_of_logs" validate:"required,min=1"`
	LogDiameters    []float64 `gorm:"type:decimal(5,2)[]" json:"log_diameters" validate:"required"`
	LogLength       float64   `gorm:"not null" json:"log_length" validate:"required,min=0"`
	VolumeDm3       float64   `gorm:"not null" json:"volume_dm3" validate:"required,min=0"`
	Volume          float64   `gorm:"not null" json:"volume" validate:"required,min=0"`
	BuyPricePerLog  float64   `gorm:"not null" json:"buy_price_per_log" validate:"required,min=0"`
	SellPricePerLog float64   `gorm:"not null" json:"sell_price_per_log" validate:"required,min=0"`
	BuyPrice        float64   `gorm:"not null" json:"buy_price" validate:"required,min=0"`
	SellPrice       float64   `gorm:"not null" json:"sell_price" validate:"required,min=0"`
	TotalBuyValue   float64   `gorm:"not null" json:"total_buy_value" validate:"required,min=0"`
	TotalSellValue  float64   `gorm:"not null" json:"total_sell_value" validate:"required,min=0"`
	CreatedAt       time.Time `json:"created_at"`
}

func (OrderItem) TableName() string {
	return "order_items"
}
