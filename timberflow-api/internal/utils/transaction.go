package utils

import (
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// Fix Issue #6: Database transaction helper

// Transaction executes a function within a database transaction
// If the function returns an error, the transaction is rolled back
// Otherwise, the transaction is committed
func Transaction(db *gorm.DB, c *gin.Context, fn func(tx *gorm.DB) error) error {
	tx := db.Begin()
	if tx.Error != nil {
		return tx.Error
	}

	// Use defer to ensure rollback on panic
	defer func() {
		if r := recover(); r != nil {
			tx.Rollback()
			panic(r)
		}
	}()

	// Execute the function
	if err := fn(tx); err != nil {
		tx.Rollback()
		return err
	}

	// Commit the transaction
	return tx.Commit().Error
}

// TransactionWithResponse executes a transaction and returns a response
func TransactionWithResponse[T any](db *gorm.DB, c *gin.Context, fn func(tx *gorm.DB) (T, error)) (T, error) {
	var result T

	tx := db.Begin()
	if tx.Error != nil {
		return result, tx.Error
	}

	defer func() {
		if r := recover(); r != nil {
			tx.Rollback()
			panic(r)
		}
	}()

	var err error
	result, err = fn(tx)
	if err != nil {
		tx.Rollback()
		return result, err
	}

	if err := tx.Commit().Error; err != nil {
		return result, err
	}

	return result, nil
}
