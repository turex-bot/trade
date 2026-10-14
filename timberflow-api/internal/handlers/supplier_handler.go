package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/yourusername/timberflow-api/internal/models"
	"github.com/yourusername/timberflow-api/internal/utils"
	"gorm.io/gorm"
)

type SupplierHandler struct {
	db *gorm.DB
}

func NewSupplierHandler(db *gorm.DB) *SupplierHandler {
	return &SupplierHandler{db: db}
}

func (h *SupplierHandler) GetAll(c *gin.Context) {
	var suppliers []models.Supplier
	if err := h.db.Find(&suppliers).Error; err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Failed to fetch suppliers")
		return
	}

	utils.SuccessResponse(c, http.StatusOK, "Suppliers retrieved successfully", suppliers)
}

func (h *SupplierHandler) GetByID(c *gin.Context) {
	id := c.Param("id")
	var supplier models.Supplier
	if err := h.db.First(&supplier, "id = ?", id).Error; err != nil {
		utils.ErrorResponse(c, http.StatusNotFound, "Supplier not found")
		return
	}

	utils.SuccessResponse(c, http.StatusOK, "Supplier retrieved successfully", supplier)
}

func (h *SupplierHandler) Create(c *gin.Context) {
	var supplier models.Supplier
	if err := c.ShouldBindJSON(&supplier); err != nil {
		utils.ErrorResponse(c, http.StatusBadRequest, "Invalid request body")
		return
	}

	if err := h.db.Create(&supplier).Error; err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Failed to create supplier")
		return
	}

	utils.SuccessResponse(c, http.StatusCreated, "Supplier created successfully", supplier)
}

func (h *SupplierHandler) Update(c *gin.Context) {
	id := c.Param("id")
	var supplier models.Supplier
	if err := h.db.First(&supplier, "id = ?", id).Error; err != nil {
		utils.ErrorResponse(c, http.StatusNotFound, "Supplier not found")
		return
	}

	var updateData models.Supplier
	if err := c.ShouldBindJSON(&updateData); err != nil {
		utils.ErrorResponse(c, http.StatusBadRequest, "Invalid request body")
		return
	}

	if err := h.db.Model(&supplier).Updates(updateData).Error; err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Failed to update supplier")
		return
	}

	utils.SuccessResponse(c, http.StatusOK, "Supplier updated successfully", supplier)
}

func (h *SupplierHandler) Delete(c *gin.Context) {
	id := c.Param("id")
	var supplier models.Supplier
	if err := h.db.First(&supplier, "id = ?", id).Error; err != nil {
		utils.ErrorResponse(c, http.StatusNotFound, "Supplier not found")
		return
	}

	if err := h.db.Delete(&supplier).Error; err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Failed to delete supplier")
		return
	}

	utils.SuccessResponse(c, http.StatusOK, "Supplier deleted successfully", nil)
}
