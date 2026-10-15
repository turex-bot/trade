package dtos

import "time"

// Request DTOs
type CreateSupplierRequest struct {
	Name        string `json:"name" binding:"required,min=3,max=100"`
	OwnerName   string `json:"owner_name" binding:"required,min=3,max=100"`
	Phone       string `json:"phone" binding:"required"`
	Email       string `json:"email" binding:"required,email"`
	Address     string `json:"address" binding:"required,min=10"`
	BankAccount string `json:"bank_account" binding:"required"`
	BankName    string `json:"bank_name" binding:"required"`
	NPWP        string `json:"npwp"`
}

type UpdateSupplierRequest struct {
	Name        *string `json:"name"`
	OwnerName   *string `json:"owner_name"`
	Phone       *string `json:"phone"`
	Email       *string `json:"email"`
	Address     *string `json:"address"`
	BankAccount *string `json:"bank_account"`
	BankName    *string `json:"bank_name"`
	NPWP        *string `json:"npwp"`
	Status      *string `json:"status"`
}

// Response DTOs
type SupplierResponse struct {
	ID          string    `json:"id"`
	Name        string    `json:"name"`
	OwnerName   string    `json:"owner_name"`
	Phone       string    `json:"phone"`
	Email       string    `json:"email"`
	Address     string    `json:"address"`
	BankAccount string    `json:"bank_account"`
	BankName    string    `json:"bank_name"`
	NPWP        string    `json:"npwp"`
	Status      string    `json:"status"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
}
