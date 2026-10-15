package routes

import (
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
	"timberflow-api/internal/config"
	"timberflow-api/internal/handlers"
	"timberflow-api/internal/middleware"
	"timberflow-api/internal/repositories"
	"timberflow-api/internal/services"
)

func SetupRoutes(db *gorm.DB, cfg *config.Config) *gin.Engine {
	router := gin.Default()

	// Global middleware
	router.Use(middleware.CORSMiddleware())
	router.Use(middleware.NormalRateLimitMiddleware())

	// Health check endpoints
	healthHandler := handlers.NewHealthHandler(db)
	router.GET("/health", healthHandler.HealthCheck)
	router.GET("/api/health", healthHandler.HealthCheck)

	// API v1 routes
	v1 := router.Group("/api/v1")
	{
		// Public routes with strict rate limiting
		setupAuthRoutes(v1, db, cfg)

		// Protected routes
		protected := v1.Group("")
		protected.Use(middleware.JWTAuthMiddleware(cfg.JWTSecret))
		{
			setupSupplierRoutes(protected, db)
			setupCompanyRoutes(protected, db)
		}
	}

	return router
}

func setupAuthRoutes(v1 *gin.RouterGroup, db *gorm.DB, cfg *config.Config) {
	auth := v1.Group("/auth")
	auth.Use(middleware.StrictRateLimitMiddleware())

	userRepo := repositories.NewUserRepository(db)
	authService := services.NewAuthService(userRepo, cfg.JWTSecret)
	authHandler := handlers.NewAuthHandler(authService)

	auth.POST("/login", authHandler.Login)
	auth.POST("/register", authHandler.Register)
}

func setupSupplierRoutes(protected *gin.RouterGroup, db *gorm.DB) {
	supplierRepo := repositories.NewSupplierRepository(db)
	supplierService := services.NewSupplierService(supplierRepo)
	supplierHandler := handlers.NewSupplierHandler(supplierService)

	suppliers := protected.Group("/suppliers")
	{
		suppliers.GET("", supplierHandler.GetAll)
		suppliers.GET("/:id", supplierHandler.GetByID)
		suppliers.POST("", supplierHandler.Create)
		suppliers.PUT("/:id", supplierHandler.Update)
		suppliers.DELETE("/:id", supplierHandler.Delete)
	}
}

func setupCompanyRoutes(protected *gin.RouterGroup, db *gorm.DB) {
	companyRepo := repositories.NewCompanyRepository(db)
	companyService := services.NewCompanyService(companyRepo)
	companyHandler := handlers.NewCompanyHandler(companyService)

	companies := protected.Group("/companies")
	{
		companies.GET("", companyHandler.GetAll)
		companies.GET("/:id", companyHandler.GetByID)
		companies.POST("", companyHandler.Create)
		companies.PUT("/:id", companyHandler.Update)
		companies.DELETE("/:id", companyHandler.Delete)
	}
}
