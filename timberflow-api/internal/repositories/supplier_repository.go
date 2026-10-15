package repositories

import (
	"timberflow-api/internal/models"

	"gorm.io/gorm"
)

type SupplierRepository interface {
	FindAll(page, limit int) ([]models.Supplier, int64, error)
	FindByID(id string) (*models.Supplier, error)
	FindByEmail(email string) (*models.Supplier, error)
	Create(supplier *models.Supplier) error
	Update(supplier *models.Supplier) error
	Delete(id string) error
}

type supplierRepository struct {
	db *gorm.DB
}

func NewSupplierRepository(db *gorm.DB) SupplierRepository {
	return &supplierRepository{db: db}
}

func (r *supplierRepository) FindAll(page, limit int) ([]models.Supplier, int64, error) {
	var suppliers []models.Supplier
	var total int64

	if err := r.db.Model(&models.Supplier{}).Count(&total).Error; err != nil {
		return nil, 0, err
	}

	offset := (page - 1) * limit
	if err := r.db.Offset(offset).Limit(limit).Find(&suppliers).Error; err != nil {
		return nil, 0, err
	}

	return suppliers, total, nil
}

func (r *supplierRepository) FindByID(id string) (*models.Supplier, error) {
	var supplier models.Supplier
	if err := r.db.First(&supplier, "id = ?", id).Error; err != nil {
		return nil, err
	}
	return &supplier, nil
}

func (r *supplierRepository) FindByEmail(email string) (*models.Supplier, error) {
	var supplier models.Supplier
	if err := r.db.Where("email = ?", email).First(&supplier).Error; err != nil {
		return nil, err
	}
	return &supplier, nil
}

func (r *supplierRepository) Create(supplier *models.Supplier) error {
	return r.db.Create(supplier).Error
}

func (r *supplierRepository) Update(supplier *models.Supplier) error {
	return r.db.Save(supplier).Error
}

func (r *supplierRepository) Delete(id string) error {
	return r.db.Delete(&models.Supplier{}, "id = ?", id).Error
}
