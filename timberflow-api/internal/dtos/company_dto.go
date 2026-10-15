package dtos

import "time"

// Request DTOs
type CreateCompanyRequest struct {
	Name        string  `json:"name" binding:"required,min=3,max=100"`
	PICName     string  `json:"pic_name" binding:"required"`
	PICPhone    string  `json:"pic_phone" binding:"required"`
	Address     string  `json:"address" binding:"required"`
	NPWP        string  `json:"npwp"`
	TOPDays     int     `json:"top_days" binding:"required,min=1"`
	CreditLimit float64 `json:"credit_limit" binding:"required,min=0"`
	RiskRating  string  `json:"risk_rating" binding:"required,oneof=A B C"`
}

type UpdateCompanyRequest struct {
	Name        *string  `json:"name"`
	PICName     *string  `json:"pic_name"`
	PICPhone    *string  `json:"pic_phone"`
	Address     *string  `json:"address"`
	NPWP        *string  `json:"npwp"`
	TOPDays     *int     `json:"top_days"`
	CreditLimit *float64 `json:"credit_limit"`
	RiskRating  *string  `json:"risk_rating"`
	Status      *string  `json:"status"`
}

// Response DTOs
type CompanyResponse struct {
	ID          string    `json:"id"`
	Name        string    `json:"name"`
	PICName     string    `json:"pic_name"`
	PICPhone    string    `json:"pic_phone"`
	Address     string    `json:"address"`
	NPWP        string    `json:"npwp"`
	TOPDays     int       `json:"top_days"`
	CreditLimit float64   `json:"credit_limit"`
	RiskRating  string    `json:"risk_rating"`
	Status      string    `json:"status"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
}
