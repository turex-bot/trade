package models

import (
	"time"

	"gorm.io/gorm"
)

type Company struct {
	ID          string         `gorm:"type:uuid;default:gen_random_uuid();primaryKey" json:"id"`
	Name        string         `gorm:"not null" json:"name" validate:"required"`
	PICName     string         `gorm:"not null" json:"pic_name" validate:"required"`
	PICPhone    string         `gorm:"not null" json:"pic_phone" validate:"required"`
	Address     string         `gorm:"not null" json:"address" validate:"required"`
	NPWP        string         `json:"npwp"`
	TOPDays     int            `gorm:"column:top_days;not null" json:"top_days" validate:"required,min=1"`
	CreditLimit float64        `gorm:"not null;default:0" json:"credit_limit" validate:"required,min=0"`
	RiskRating  string         `gorm:"not null" json:"risk_rating" validate:"required,oneof=A B C"`
	Status      string         `gorm:"default:aktif" json:"status" validate:"required,oneof=aktif nonaktif"`
	CreatedAt   time.Time      `json:"created_at"`
	UpdatedAt   time.Time      `json:"updated_at"`
	DeletedAt   gorm.DeletedAt `gorm:"index" json:"-"`
}

func (Company) TableName() string {
	return "companies"
}
