package models

import (
	"time"

	"gorm.io/gorm"
)

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

func (Invoice) TableName() string {
	return "invoices"
}
