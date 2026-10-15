package models

import (
	"time"

	"gorm.io/gorm"
)

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

func (Payment) TableName() string {
	return "payments"
}
