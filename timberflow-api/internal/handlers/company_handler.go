package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"timberflow-api/internal/dtos"
	"timberflow-api/internal/services"
	"timberflow-api/internal/utils"
)

type CompanyHandler struct {
	service services.CompanyService
}

func NewCompanyHandler(service services.CompanyService) *CompanyHandler {
	return &CompanyHandler{service: service}
}

func (h *CompanyHandler) GetAll(c *gin.Context) {
	params := utils.GetPaginationParams(c)

	companies, total, err := h.service.GetAll(params.Page, params.Limit)
	if err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Failed to fetch companies")
		return
	}

	response := utils.NewPaginationResponse(companies, params, total)
	utils.SuccessResponse(c, http.StatusOK, "Companies retrieved successfully", response)
}

func (h *CompanyHandler) GetByID(c *gin.Context) {
	id := c.Param("id")

	company, err := h.service.GetByID(id)
	if err != nil {
		utils.ErrorResponse(c, http.StatusNotFound, "Company not found")
		return
	}

	utils.SuccessResponse(c, http.StatusOK, "Company retrieved successfully", company)
}

func (h *CompanyHandler) Create(c *gin.Context) {
	var req dtos.CreateCompanyRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		utils.ValidationErrorResponse(c, err)
		return
	}

	company, err := h.service.Create(req)
	if err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	utils.SuccessResponse(c, http.StatusCreated, "Company created successfully", company)
}

func (h *CompanyHandler) Update(c *gin.Context) {
	id := c.Param("id")

	var req dtos.UpdateCompanyRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		utils.ValidationErrorResponse(c, err)
		return
	}

	company, err := h.service.Update(id, req)
	if err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	utils.SuccessResponse(c, http.StatusOK, "Company updated successfully", company)
}

func (h *CompanyHandler) Delete(c *gin.Context) {
	id := c.Param("id")

	if err := h.service.Delete(id); err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Failed to delete company")
		return
	}

	utils.SuccessResponse(c, http.StatusOK, "Company deleted successfully", nil)
}
