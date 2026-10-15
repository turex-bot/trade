package repositories

import (
	"timberflow-api/internal/models"

	"gorm.io/gorm"
)

type CompanyRepository interface {
	FindAll(page, limit int) ([]models.Company, int64, error)
	FindByID(id string) (*models.Company, error)
	Create(company *models.Company) error
	Update(company *models.Company) error
	Delete(id string) error
}

type companyRepository struct {
	db *gorm.DB
}

func NewCompanyRepository(db *gorm.DB) CompanyRepository {
	return &companyRepository{db: db}
}

func (r *companyRepository) FindAll(page, limit int) ([]models.Company, int64, error) {
	var companies []models.Company
	var total int64

	if err := r.db.Model(&models.Company{}).Count(&total).Error; err != nil {
		return nil, 0, err
	}

	offset := (page - 1) * limit
	if err := r.db.Offset(offset).Limit(limit).Find(&companies).Error; err != nil {
		return nil, 0, err
	}

	return companies, total, nil
}

func (r *companyRepository) FindByID(id string) (*models.Company, error) {
	var company models.Company
	if err := r.db.First(&company, "id = ?", id).Error; err != nil {
		return nil, err
	}
	return &company, nil
}

func (r *companyRepository) Create(company *models.Company) error {
	return r.db.Create(company).Error
}

func (r *companyRepository) Update(company *models.Company) error {
	return r.db.Save(company).Error
}

func (r *companyRepository) Delete(id string) error {
	return r.db.Delete(&models.Company{}, "id = ?", id).Error
}
