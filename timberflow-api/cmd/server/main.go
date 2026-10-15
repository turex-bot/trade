package main

import (
	"log"

	"github.com/joho/godotenv"
	"timberflow-api/internal/config"
	"timberflow-api/internal/database"
	"timberflow-api/internal/routes"
)

func main() {
	// Load environment variables
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found, using system environment")
	}

	// Initialize configuration
	cfg := config.LoadConfig()

	// Initialize database
	db := database.NewConnection(cfg.DatabaseURL)

	// Setup routes
	router := routes.SetupRoutes(db, cfg)

	// Start server
	log.Printf("🚀 Server starting on port %s", cfg.Port)
	if err := router.Run(":" + cfg.Port); err != nil {
		log.Fatal("Failed to start server:", err)
	}
}
