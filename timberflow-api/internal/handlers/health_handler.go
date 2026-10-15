package handlers

import (
	"net/http"
	"runtime"
	"time"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// Fix Issue #16: Health check endpoint for monitoring

type HealthHandler struct {
	db *gorm.DB
}

func NewHealthHandler(db *gorm.DB) *HealthHandler {
	return &HealthHandler{db: db}
}

type HealthResponse struct {
	Status    string            `json:"status"`
	Timestamp time.Time         `json:"timestamp"`
	Uptime    string            `json:"uptime"`
	Version   string            `json:"version"`
	Database  string            `json:"database"`
	System    SystemHealth      `json:"system"`
}

type SystemHealth struct {
	CPUCores    int    `json:"cpu_cores"`
	MemoryUsed  string `json:"memory_used"`
	MemoryTotal string `json:"memory_total"`
	GoVersion   string `json:"go_version"`
}

var startTime = time.Now()

// HealthCheck returns the health status of the application
func (h *HealthHandler) HealthCheck(c *gin.Context) {
	// Check database connection
	dbStatus := "healthy"
	if err := h.db.Exec("SELECT 1").Error; err != nil {
		dbStatus = "unhealthy"
	}

	// Get memory stats
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

	// If database is unhealthy, return 503
	if dbStatus != "healthy" {
		response.Status = "unhealthy"
		c.JSON(http.StatusServiceUnavailable, response)
		return
	}

	c.JSON(http.StatusOK, response)
}

// formatBytes formats bytes to human readable string
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
