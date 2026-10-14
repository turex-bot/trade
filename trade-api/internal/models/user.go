package models

import (
	"time"

	"gorm.io/gorm"
)

type User struct {
	ID           string         `gorm:"type:uuid;default:gen_random_uuid();primaryKey" json:"id"`
	Email        string         `gorm:"uniqueIndex;not null" json:"email" validate:"required,email"`
	PasswordHash string         `gorm:"not null" json:"-"`
	FullName     string         `json:"full_name" validate:"required"`
	Role         string         `gorm:"default:operator" json:"role" validate:"required,oneof=admin operator finance"`
	IsActive     bool           `gorm:"default:true" json:"is_active"`
	CreatedAt    time.Time      `json:"created_at"`
	UpdatedAt    time.Time      `json:"updated_at"`
	DeletedAt    gorm.DeletedAt `gorm:"index" json:"-"`
}
