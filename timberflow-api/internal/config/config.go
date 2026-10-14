package config

import (
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

func LoadConfig() *Config {
	return &Config{
		DatabaseURL:   getEnv("DATABASE_URL", "postgres://postgres:postgres@localhost:5432/timberflow?sslmode=disable"),
		JWTSecret:     getEnv("JWT_SECRET", "your-secret-key-change-in-production"),
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
