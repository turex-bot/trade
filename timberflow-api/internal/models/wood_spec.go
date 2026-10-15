package models

import (
	"time"

	"gorm.io/gorm"
)

type WoodSpec struct {
	ID             string         `gorm:"type:uuid;default:gen_random_uuid();primaryKey" json:"id"`
	WoodType       string         `gorm:"not null" json:"wood_type" validate:"required"`
	DiameterRange  string         `gorm:"not null" json:"diameter_range" validate:"required"`
	DiameterMin    float64        `gorm:"not null" json:"diameter_min" validate:"required,min=0"`
	DiameterMax    float64        `gorm:"not null" json:"diameter_max" validate:"required,min=0"`
	AvgDiameter    float64        `gorm:"not null" json:"avg_diameter" validate:"required,min=0"`
	StandardLength float64        `gorm:"not null" json:"standard_length" validate:"required,min=0"`
	VolumePerLog   float64        `gorm:"not null" json:"volume_per_log" validate:"required,min=0"`
	Grade          string         `gorm:"not null" json:"grade" validate:"required,oneof=Reguler Premium"`
	Unit           string         `gorm:"default:m³" json:"unit"`
	Notes          string         `json:"notes"`
	CreatedAt      time.Time      `json:"created_at"`
	UpdatedAt      time.Time      `json:"updated_at"`
	DeletedAt      gorm.DeletedAt `gorm:"index" json:"-"`
}

func (WoodSpec) TableName() string {
	return "wood_specs"
}
