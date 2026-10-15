package database

import (
	"log"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
	"timberflow-api/internal/models"
)

func NewConnection(databaseURL string) *gorm.DB {
	db, err := gorm.Open(postgres.Open(databaseURL), &gorm.Config{
		Logger: logger.Default.LogMode(logger.Info),
	})
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

	log.Println("✅ Database connected and migrated successfully")
	return db
}
