package services

import (
	"timberflow-api/internal/dtos"
	"timberflow-api/internal/models"
	"timberflow-api/internal/repositories"
)

type CompanyService interface {
	GetAll(page, limit int) ([]dtos.CompanyResponse, int64, error)
	GetByID(id string) (*dtos.CompanyResponse, error)
	Create(req dtos.CreateCompanyRequest) (*dtos.CompanyResponse, error)
	Update(id string, req dtos.UpdateCompanyRequest) (*dtos.CompanyResponse, error)
	Delete(id string) error
}

type companyService struct {
	repo repositories.CompanyRepository
}

func NewCompanyService(repo repositories.CompanyRepository) CompanyService {
	return &companyService{repo: repo}
}

func (s *companyService) GetAll(page, limit int) ([]dtos.CompanyResponse, int64, error) {
	companies, total, err := s.repo.FindAll(page, limit)
	if err != nil {
		return nil, 0, err
	}

	var responses []dtos.CompanyResponse
	for _, company := range companies {
		responses = append(responses, s.toResponse(&company))
	}

	return responses, total, nil
}

func (s *companyService) GetByID(id string) (*dtos.CompanyResponse, error) {
	company, err := s.repo.FindByID(id)
	if err != nil {
		return nil, err
	}

	return s.toResponse(company), nil
}

func (s *companyService) Create(req dtos.CreateCompanyRequest) (*dtos.CompanyResponse, error) {
	company := &models.Company{
		Name:        req.Name,
		PICName:     req.PICName,
		PICPhone:    req.PICPhone,
		Address:     req.Address,
		NPWP:        req.NPWP,
		TOPDays:     req.TOPDays,
		CreditLimit: req.CreditLimit,
		RiskRating:  req.RiskRating,
		Status:      "aktif",
	}

	if err := s.repo.Create(company); err != nil {
		return nil, err
	}

	return s.toResponse(company), nil
}

func (s *companyService) Update(id string, req dtos.UpdateCompanyRequest) (*dtos.CompanyResponse, error) {
	company, err := s.repo.FindByID(id)
	if err != nil {
		return nil, err
	}

	if req.Name != nil {
		company.Name = *req.Name
	}
	if req.PICName != nil {
		company.PICName = *req.PICName
	}
	if req.PICPhone != nil {
		company.PICPhone = *req.PICPhone
	}
	if req.Address != nil {
		company.Address = *req.Address
	}
	if req.NPWP != nil {
		company.NPWP = *req.NPWP
	}
	if req.TOPDays != nil {
		company.TOPDays = *req.TOPDays
	}
	if req.CreditLimit != nil {
		company.CreditLimit = *req.CreditLimit
	}
	if req.RiskRating != nil {
		company.RiskRating = *req.RiskRating
	}
	if req.Status != nil {
		company.Status = *req.Status
	}

	if err := s.repo.Update(company); err != nil {
		return nil, err
	}

	return s.toResponse(company), nil
}

func (s *companyService) Delete(id string) error {
	return s.repo.Delete(id)
}

func (s *companyService) toResponse(company *models.Company) *dtos.CompanyResponse {
	return &dtos.CompanyResponse{
		ID:          company.ID,
		Name:        company.Name,
		PICName:     company.PICName,
		PICPhone:    company.PICPhone,
		Address:     company.Address,
		NPWP:        company.NPWP,
		TOPDays:     company.TOPDays,
		CreditLimit: company.CreditLimit,
		RiskRating:  company.RiskRating,
		Status:      company.Status,
		CreatedAt:   company.CreatedAt,
		UpdatedAt:   company.UpdatedAt,
	}
}
