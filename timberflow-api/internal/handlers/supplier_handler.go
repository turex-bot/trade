package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"timberflow-api/internal/dtos"
	"timberflow-api/internal/services"
	"timberflow-api/internal/utils"
)

type SupplierHandler struct {
	service services.SupplierService
}

func NewSupplierHandler(service services.SupplierService) *SupplierHandler {
	return &SupplierHandler{service: service}
}

func (h *SupplierHandler) GetAll(c *gin.Context) {
	params := utils.GetPaginationParams(c)

	suppliers, total, err := h.service.GetAll(params.Page, params.Limit)
	if err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Failed to fetch suppliers")
		return
	}

	response := utils.NewPaginationResponse(suppliers, params, total)
	utils.SuccessResponse(c, http.StatusOK, "Suppliers retrieved successfully", response)
}

func (h *SupplierHandler) GetByID(c *gin.Context) {
	id := c.Param("id")

	supplier, err := h.service.GetByID(id)
	if err != nil {
		utils.ErrorResponse(c, http.StatusNotFound, "Supplier not found")
		return
	}

	utils.SuccessResponse(c, http.StatusOK, "Supplier retrieved successfully", supplier)
}

func (h *SupplierHandler) Create(c *gin.Context) {
	var req dtos.CreateSupplierRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		utils.ValidationErrorResponse(c, err)
		return
	}

	supplier, err := h.service.Create(req)
	if err != nil {
		if err.Error() == "email already exists" {
			utils.ErrorResponse(c, http.StatusConflict, err.Error())
		} else {
			utils.ErrorResponse(c, http.StatusInternalServerError, err.Error())
		}
		return
	}

	utils.SuccessResponse(c, http.StatusCreated, "Supplier created successfully", supplier)
}

func (h *SupplierHandler) Update(c *gin.Context) {
	id := c.Param("id")

	var req dtos.UpdateSupplierRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		utils.ValidationErrorResponse(c, err)
		return
	}

	supplier, err := h.service.Update(id, req)
	if err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	utils.SuccessResponse(c, http.StatusOK, "Supplier updated successfully", supplier)
}

func (h *SupplierHandler) Delete(c *gin.Context) {
	id := c.Param("id")

	if err := h.service.Delete(id); err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Failed to delete supplier")
		return
	}

	utils.SuccessResponse(c, http.StatusOK, "Supplier deleted successfully", nil)
}
