package config

import (
	"log"
	"os"
	"strconv"
)

type Config struct {
	DatabaseURL   string
	JWTSecret     string
	JWTExpiration int
	Port          string
	Environment   string
	CORSOrigin    string
	LogLevel      string
}

// Fix Issue #3: Require JWT_SECRET environment variable
func LoadConfig() *Config {
	jwtSecret := os.Getenv("JWT_SECRET")
	if jwtSecret == "" {
		log.Fatal("❌ JWT_SECRET environment variable is required for security")
	}

	return &Config{
		DatabaseURL:   getEnv("DATABASE_URL", "postgres://postgres:postgres@localhost:5432/timberflow?sslmode=disable"),
		JWTSecret:     jwtSecret,
		JWTExpiration: getEnvAsInt("JWT_EXPIRATION", 24),
		Port:          getEnv("PORT", "8080"),
		Environment:   getEnv("ENVIRONMENT", "development"),
		CORSOrigin:    getEnv("CORS_ORIGIN", "http://localhost:5173"),
		LogLevel:      getEnv("LOG_LEVEL", "info"),
	}
}

func getEnv(key, defaultValue string) string {
	value := os.Getenv(key)
	if value == "" {
		return defaultValue
	}
	return value
}

func getEnvAsInt(key string, defaultValue int) int {
	value := os.Getenv(key)
	if value == "" {
		return defaultValue
	}
	intValue, err := strconv.Atoi(value)
	if err != nil {
		return defaultValue
	}
	return intValue
}
