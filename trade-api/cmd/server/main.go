package main

import (
	"log"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/heepo-tech/trade-api/internal/config"
	"github.com/heepo-tech/trade-api/internal/handlers"
	"github.com/heepo-tech/trade-api/internal/middleware"
	"github.com/heepo-tech/trade-api/internal/models"
	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func main() {
	// Load environment variables
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found, using system environment")
	}

	// Initialize configuration
	cfg := config.LoadConfig()

	// Initialize database
	db, err := gorm.Open(postgres.Open(cfg.DatabaseURL), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}

	// Auto migrate models
	if err := db.AutoMigrate(
		&models.User{},
		&models.Supplier{},
		&models.Company{},
		&models.WoodSpec{},
		&models.Price{},
		&models.Order{},
		&models.OrderItem{},
		&models.Delivery{},
		&models.Invoice{},
		&models.Payment{},
	); err != nil {
		log.Fatal("Failed to migrate database:", err)
	}

	// Initialize handlers
	authHandler := handlers.NewAuthHandler(db, cfg.JWTSecret)
	supplierHandler := handlers.NewSupplierHandler(db)
	companyHandler := handlers.NewCompanyHandler(db)
	woodSpecHandler := handlers.NewWoodSpecHandler(db)
	priceHandler := handlers.NewPriceHandler(db)
	orderHandler := handlers.NewOrderHandler(db)
	deliveryHandler := handlers.NewDeliveryHandler(db)
	invoiceHandler := handlers.NewInvoiceHandler(db)
	paymentHandler := handlers.NewPaymentHandler(db)

	// Initialize Gin router
	router := gin.Default()

	// CORS middleware
	router.Use(middleware.CORSMiddleware())

	// API v1 routes
	v1 := router.Group("/api/v1")
	{
		// Public routes
		auth := v1.Group("/auth")
		{
			auth.POST("/login", authHandler.Login)
			auth.POST("/register", authHandler.Register)
		}

		// Protected routes
		protected := v1.Group("")
		protected.Use(middleware.JWTAuthMiddleware(cfg.JWTSecret))
		{
			// Suppliers
			suppliers := protected.Group("/suppliers")
			{
				suppliers.GET("", supplierHandler.GetAll)
				suppliers.GET("/:id", supplierHandler.GetByID)
				suppliers.POST("", supplierHandler.Create)
				suppliers.PUT("/:id", supplierHandler.Update)
				suppliers.DELETE("/:id", supplierHandler.Delete)
			}

			// Companies
			companies := protected.Group("/companies")
			{
				companies.GET("", companyHandler.GetAll)
				companies.GET("/:id", companyHandler.GetByID)
				companies.POST("", companyHandler.Create)
				companies.PUT("/:id", companyHandler.Update)
				companies.DELETE("/:id", companyHandler.Delete)
			}

			// Wood Specs
			woodSpecs := protected.Group("/wood-specs")
			{
				woodSpecs.GET("", woodSpecHandler.GetAll)
				woodSpecs.GET("/:id", woodSpecHandler.GetByID)
				woodSpecs.POST("", woodSpecHandler.Create)
				woodSpecs.PUT("/:id", woodSpecHandler.Update)
				woodSpecs.DELETE("/:id", woodSpecHandler.Delete)
			}

			// Prices
			prices := protected.Group("/prices")
			{
				prices.GET("", priceHandler.GetAll)
				prices.GET("/:id", priceHandler.GetByID)
				prices.POST("", priceHandler.Create)
				prices.PUT("/:id", priceHandler.Update)
				prices.DELETE("/:id", priceHandler.Delete)
			}

			// Orders
			orders := protected.Group("/orders")
			{
				orders.GET("", orderHandler.GetAll)
				orders.GET("/:id", orderHandler.GetByID)
				orders.POST("", orderHandler.Create)
				orders.PUT("/:id", orderHandler.Update)
				orders.DELETE("/:id", orderHandler.Delete)
				orders.POST("/:id/confirm", orderHandler.Confirm)
			}

			// Deliveries
			deliveries := protected.Group("/deliveries")
			{
				deliveries.GET("", deliveryHandler.GetAll)
				deliveries.GET("/:id", deliveryHandler.GetByID)
				deliveries.POST("", deliveryHandler.Create)
				deliveries.PUT("/:id", deliveryHandler.Update)
				deliveries.DELETE("/:id", deliveryHandler.Delete)
				deliveries.POST("/:id/receive", deliveryHandler.MarkReceived)
			}

			// Invoices
			invoices := protected.Group("/invoices")
			{
				invoices.GET("", invoiceHandler.GetAll)
				invoices.GET("/:id", invoiceHandler.GetByID)
				invoices.POST("/:id/invoice", invoiceHandler.GenerateInvoice)
			}

			// Payments
			payments := protected.Group("/payments")
			{
				payments.GET("", paymentHandler.GetAll)
				payments.POST("", paymentHandler.Create)
			}
		}
	}

	// Start server
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("Server starting on port %s", port)
	if err := router.Run(":" + port); err != nil {
		log.Fatal("Failed to start server:", err)
	}
}
