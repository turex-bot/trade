.PHONY: build run test clean migrate deps fmt lint dev prod docker-build docker-run help

# Variables
APP_NAME=timberflow-api
BUILD_DIR=build
BINARY_NAME=server

# Build binary
build:
	@echo "Building $(APP_NAME)..."
	@mkdir -p $(BUILD_DIR)
	go build -o $(BUILD_DIR)/$(BINARY_NAME) cmd/server/main.go
	@echo "Build complete: $(BUILD_DIR)/$(BINARY_NAME)"

# Run server
run:
	@echo "Starting $(APP_NAME)..."
	go run cmd/server/main.go

# Run tests
test:
	@echo "Running tests..."
	go test ./... -v

# Run tests with coverage
test-coverage:
	@echo "Running tests with coverage..."
	go test ./... -coverprofile=coverage.out
	go tool cover -html=coverage.out -o coverage.html
	@echo "Coverage report: coverage.html"

# Clean binary
clean:
	@echo "Cleaning..."
	rm -rf $(BUILD_DIR)
	rm -f $(BINARY_NAME)
	rm -f coverage.out coverage.html
	@echo "Clean complete"

# Run migrations
migrate:
	@echo "Running migrations..."
	psql -U postgres -d timberflow -f migrations/001_init_schema.sql
	@echo "Migrations complete"

# Install dependencies
deps:
	@echo "Installing dependencies..."
	go mod download
	go mod tidy
	@echo "Dependencies installed"

# Format code
fmt:
	@echo "Formatting code..."
	go fmt ./...
	@echo "Format complete"

# Lint code
lint:
	@echo "Linting code..."
	golangci-lint run
	@echo "Lint complete"

# Development mode
dev:
	@echo "Starting development mode..."
	go run cmd/server/main.go

# Production build
prod:
	@echo "Building for production..."
	@mkdir -p $(BUILD_DIR)
	CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -ldflags="-w -s" -o $(BUILD_DIR)/$(BINARY_NAME) cmd/server/main.go
	@echo "Production build complete: $(BUILD_DIR)/$(BINARY_NAME)"

# Docker build
docker-build:
	@echo "Building Docker image..."
	docker build -t $(APP_NAME):latest .

# Docker run
docker-run:
	@echo "Running Docker container..."
	docker run -p 8080:8080 --env-file .env $(APP_NAME):latest

# Generate Swagger docs
docs:
	@echo "Generating API documentation..."
	swag init -g cmd/server/main.go -o docs
	@echo "Documentation generated"

# Database seed
seed:
	@echo "Seeding database..."
	psql -U postgres -d timberflow -f migrations/002_seed_data.sql
	@echo "Seed complete"

# Reset database
reset-db:
	@echo "Resetting database..."
	psql -U postgres -c "DROP DATABASE IF EXISTS timberflow;"
	psql -U postgres -c "CREATE DATABASE timberflow;"
	make migrate
	make seed
	@echo "Database reset complete"

# Help
help:
	@echo "TimberFlow API Makefile"
	@echo ""
	@echo "Usage:"
	@echo "  make build          - Build binary"
	@echo "  make run            - Run server"
	@echo "  make test           - Run tests"
	@echo "  make test-coverage  - Run tests with coverage"
	@echo "  make clean          - Clean binary"
	@echo "  make migrate        - Run migrations"
	@echo "  make deps           - Install dependencies"
	@echo "  make fmt            - Format code"
	@echo "  make lint           - Lint code"
	@echo "  make dev            - Development mode"
	@echo "  make prod           - Production build"
	@echo "  make docker-build   - Build Docker image"
	@echo "  make docker-run     - Run Docker container"
	@echo "  make docs           - Generate Swagger docs"
	@echo "  make seed           - Seed database"
	@echo "  make reset-db       - Reset database"
	@echo "  make help           - Show this help"
