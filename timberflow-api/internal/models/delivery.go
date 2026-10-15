package models

import (
	"time"

	"gorm.io/gorm"
)

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

func (Delivery) TableName() string {
	return "deliveries"
}
