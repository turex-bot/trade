package utils

import (
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func Transaction(db *gorm.DB, c *gin.Context, fn func(tx *gorm.DB) error) error {
	tx := db.Begin()
	if tx.Error != nil {
		return tx.Error
	}

	defer func() {
		if r := recover(); r != nil {
			tx.Rollback()
			panic(r)
		}
	}()

	if err := fn(tx); err != nil {
		tx.Rollback()
		return err
	}

	return tx.Commit().Error
}

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
