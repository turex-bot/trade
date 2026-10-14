package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/yourusername/timberflow-api/internal/models"
	"github.com/yourusername/timberflow-api/internal/utils"
	"gorm.io/gorm"
)

type CompanyHandler struct {
	db *gorm.DB
}

func NewCompanyHandler(db *gorm.DB) *CompanyHandler {
	return &CompanyHandler{db: db}
}

func (h *CompanyHandler) GetAll(c *gin.Context) {
	var companies []models.Company
	if err := h.db.Find(&companies).Error; err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Failed to fetch companies")
		return
	}

	utils.SuccessResponse(c, http.StatusOK, "Companies retrieved successfully", companies)
}

func (h *CompanyHandler) GetByID(c *gin.Context) {
	id := c.Param("id")
	var company models.Company
	if err := h.db.First(&company, "id = ?", id).Error; err != nil {
		utils.ErrorResponse(c, http.StatusNotFound, "Company not found")
		return
	}

	utils.SuccessResponse(c, http.StatusOK, "Company retrieved successfully", company)
}

func (h *CompanyHandler) Create(c *gin.Context) {
	var company models.Company
	if err := c.ShouldBindJSON(&company); err != nil {
		utils.ErrorResponse(c, http.StatusBadRequest, "Invalid request body")
		return
	}

	if err := h.db.Create(&company).Error; err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Failed to create company")
		return
	}

	utils.SuccessResponse(c, http.StatusCreated, "Company created successfully", company)
}

func (h *CompanyHandler) Update(c *gin.Context) {
	id := c.Param("id")
	var company models.Company
	if err := h.db.First(&company, "id = ?", id).Error; err != nil {
		utils.ErrorResponse(c, http.StatusNotFound, "Company not found")
		return
	}

	var updateData models.Company
	if err := c.ShouldBindJSON(&updateData); err != nil {
		utils.ErrorResponse(c, http.StatusBadRequest, "Invalid request body")
		return
	}

	if err := h.db.Model(&company).Updates(updateData).Error; err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Failed to update company")
		return
	}

	utils.SuccessResponse(c, http.StatusOK, "Company updated successfully", company)
}

func (h *CompanyHandler) Delete(c *gin.Context) {
	id := c.Param("id")
	var company models.Company
	if err := h.db.First(&company, "id = ?", id).Error; err != nil {
		utils.ErrorResponse(c, http.StatusNotFound, "Company not found")
		return
	}

	if err := h.db.Delete(&company).Error; err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Failed to delete company")
		return
	}

	utils.SuccessResponse(c, http.StatusOK, "Company deleted successfully", nil)
}
