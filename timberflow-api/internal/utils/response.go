package utils

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
)

type Response struct {
	Code    int         `json:"code"`
	Message string      `json:"message"`
	Data    interface{} `json:"data,omitempty"`
}

func SuccessResponse(c *gin.Context, code int, message string, data interface{}) {
	c.JSON(code, Response{
		Code:    code,
		Message: message,
		Data:    data,
	})
}

func ErrorResponse(c *gin.Context, code int, message string) {
	c.JSON(code, Response{
		Code:    code,
		Message: message,
	})
}

func ValidationErrorResponse(c *gin.Context, err error) {
	var errors []map[string]string
	if validationErrors, ok := err.(validator.ValidationErrors); ok {
		for _, e := range validationErrors {
			errors = append(errors, map[string]string{
				"field": e.Field(),
				"tag":   e.Tag(),
				"value": e.Param(),
			})
		}
	}

	c.JSON(http.StatusBadRequest, Response{
		Code:    http.StatusBadRequest,
		Message: "Validation failed",
		Data:    errors,
	})
}
