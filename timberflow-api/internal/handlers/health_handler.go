package handlers

import (
	"net/http"
	"runtime"
	"time"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
	"timberflow-api/internal/utils"
)

type HealthHandler struct {
	db *gorm.DB
}

func NewHealthHandler(db *gorm.DB) *HealthHandler {
	return &HealthHandler{db: db}
}

type HealthResponse struct {
	Status    string       `json:"status"`
	Timestamp time.Time    `json:"timestamp"`
	Uptime    string       `json:"uptime"`
	Version   string       `json:"version"`
	Database  string       `json:"database"`
	System    SystemHealth `json:"system"`
}

type SystemHealth struct {
	CPUCores    int    `json:"cpu_cores"`
	MemoryUsed  string `json:"memory_used"`
	MemoryTotal string `json:"memory_total"`
	GoVersion   string `json:"go_version"`
}

var startTime = time.Now()

func (h *HealthHandler) HealthCheck(c *gin.Context) {
	dbStatus := "healthy"
	if err := h.db.Exec("SELECT 1").Error; err != nil {
		dbStatus = "unhealthy"
	}

	var m runtime.MemStats
	runtime.ReadMemStats(&m)

	response := HealthResponse{
		Status:    "healthy",
		Timestamp: time.Now(),
		Uptime:    time.Since(startTime).String(),
		Version:   "1.0.0",
		Database:  dbStatus,
		System: SystemHealth{
			CPUCores:    runtime.NumCPU(),
			MemoryUsed:  formatBytes(m.Alloc),
			MemoryTotal: formatBytes(m.Sys),
			GoVersion:   runtime.Version(),
		},
	}

	if dbStatus != "healthy" {
		response.Status = "unhealthy"
		c.JSON(http.StatusServiceUnavailable, response)
		return
	}

	utils.SuccessResponse(c, http.StatusOK, "Health check successful", response)
}

func formatBytes(bytes uint64) string {
	const unit = 1024
	if bytes < unit {
		return string(bytes) + " B"
	}
	div, exp := uint64(unit), 0
	for n := bytes / unit; n >= unit; n /= unit {
		div *= unit
		exp++
	}
	return string(rune('k')) + string(rune('M')) + string(rune('G'))
}
