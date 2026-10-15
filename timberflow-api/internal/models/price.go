package models

import (
	"time"

	"gorm.io/gorm"
)

type Price struct {
	ID              string         `gorm:"type:uuid;default:gen_random_uuid();primaryKey" json:"id"`
	WoodSpecID      string         `gorm:"type:uuid;not null" json:"wood_spec_id" validate:"required"`
	WoodSpecName    string         `gorm:"not null" json:"wood_spec_name" validate:"required"`
	BuyPrice        float64        `gorm:"not null" json:"buy_price" validate:"required,min=0"`
	BuyPricePerLog  float64        `gorm:"not null" json:"buy_price_per_log" validate:"required,min=0"`
	TraderMargin    float64        `gorm:"default:15000" json:"trader_margin"`
	SellPrice       float64        `gorm:"not null" json:"sell_price" validate:"required,min=0"`
	SellPricePerLog float64        `gorm:"not null" json:"sell_price_per_log" validate:"required,min=0"`
	EffectiveDate   time.Time      `gorm:"not null" json:"effective_date" validate:"required"`
	IsActive        bool           `gorm:"default:true" json:"is_active"`
	CreatedAt       time.Time      `json:"created_at"`
	UpdatedAt       time.Time      `json:"updated_at"`
	DeletedAt       gorm.DeletedAt `gorm:"index" json:"-"`
}

func (Price) TableName() string {
	return "prices"
}
