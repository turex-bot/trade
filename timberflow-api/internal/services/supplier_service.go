package services

import (
	"errors"
	"timberflow-api/internal/dtos"
	"timberflow-api/internal/models"
	"timberflow-api/internal/repositories"
)

type SupplierService interface {
	GetAll(page, limit int) ([]dtos.SupplierResponse, int64, error)
	GetByID(id string) (*dtos.SupplierResponse, error)
	Create(req dtos.CreateSupplierRequest) (*dtos.SupplierResponse, error)
	Update(id string, req dtos.UpdateSupplierRequest) (*dtos.SupplierResponse, error)
	Delete(id string) error
}

type supplierService struct {
	repo repositories.SupplierRepository
}

func NewSupplierService(repo repositories.SupplierRepository) SupplierService {
	return &supplierService{repo: repo}
}

func (s *supplierService) GetAll(page, limit int) ([]dtos.SupplierResponse, int64, error) {
	suppliers, total, err := s.repo.FindAll(page, limit)
	if err != nil {
		return nil, 0, err
	}

	var responses []dtos.SupplierResponse
	for _, supplier := range suppliers {
		responses = append(responses, s.toResponse(&supplier))
	}

	return responses, total, nil
}

func (s *supplierService) GetByID(id string) (*dtos.SupplierResponse, error) {
	supplier, err := s.repo.FindByID(id)
	if err != nil {
		return nil, err
	}

	return s.toResponse(supplier), nil
}

func (s *supplierService) Create(req dtos.CreateSupplierRequest) (*dtos.SupplierResponse, error) {
	existing, _ := s.repo.FindByEmail(req.Email)
	if existing != nil {
		return nil, errors.New("email already exists")
	}

	supplier := &models.Supplier{
		Name:        req.Name,
		OwnerName:   req.OwnerName,
		Phone:       req.Phone,
		Email:       req.Email,
		Address:     req.Address,
		BankAccount: req.BankAccount,
		BankName:    req.BankName,
		NPWP:        req.NPWP,
		Status:      "aktif",
	}

	if err := s.repo.Create(supplier); err != nil {
		return nil, err
	}

	return s.toResponse(supplier), nil
}

func (s *supplierService) Update(id string, req dtos.UpdateSupplierRequest) (*dtos.SupplierResponse, error) {
	supplier, err := s.repo.FindByID(id)
	if err != nil {
		return nil, err
	}

	if req.Name != nil {
		supplier.Name = *req.Name
	}
	if req.OwnerName != nil {
		supplier.OwnerName = *req.OwnerName
	}
	if req.Phone != nil {
		supplier.Phone = *req.Phone
	}
	if req.Email != nil {
		supplier.Email = *req.Email
	}
	if req.Address != nil {
		supplier.Address = *req.Address
	}
	if req.BankAccount != nil {
		supplier.BankAccount = *req.BankAccount
	}
	if req.BankName != nil {
		supplier.BankName = *req.BankName
	}
	if req.NPWP != nil {
		supplier.NPWP = *req.NPWP
	}
	if req.Status != nil {
		supplier.Status = *req.Status
	}

	if err := s.repo.Update(supplier); err != nil {
		return nil, err
	}

	return s.toResponse(supplier), nil
}

func (s *supplierService) Delete(id string) error {
	return s.repo.Delete(id)
}

func (s *supplierService) toResponse(supplier *models.Supplier) *dtos.SupplierResponse {
	return &dtos.SupplierResponse{
		ID:          supplier.ID,
		Name:        supplier.Name,
		OwnerName:   supplier.OwnerName,
		Phone:       supplier.Phone,
		Email:       supplier.Email,
		Address:     supplier.Address,
		BankAccount: supplier.BankAccount,
		BankName:    supplier.BankName,
		NPWP:        supplier.NPWP,
		Status:      supplier.Status,
		CreatedAt:   supplier.CreatedAt,
		UpdatedAt:   supplier.UpdatedAt,
	}
}
