package models

import (
	"time"

	"gorm.io/gorm"
)

type Supplier struct {
	ID          string         `gorm:"type:uuid;default:gen_random_uuid();primaryKey" json:"id"`
	Name        string         `gorm:"not null" json:"name" validate:"required"`
	OwnerName   string         `gorm:"not null" json:"owner_name" validate:"required"`
	Phone       string         `gorm:"not null" json:"phone" validate:"required"`
	Email       string         `json:"email"`
	Address     string         `gorm:"not null" json:"address" validate:"required"`
	BankAccount string         `gorm:"not null" json:"bank_account" validate:"required"`
	BankName    string         `gorm:"not null" json:"bank_name" validate:"required"`
	NPWP        string         `json:"npwp"`
	Status      string         `gorm:"default:aktif" json:"status" validate:"required,oneof=aktif nonaktif"`
	CreatedAt   time.Time      `json:"created_at"`
	UpdatedAt   time.Time      `json:"updated_at"`
	DeletedAt   gorm.DeletedAt `gorm:"index" json:"-"`
}

func (Supplier) TableName() string {
	return "suppliers"
}
