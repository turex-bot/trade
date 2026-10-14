.PHONY: build run test clean migrate deps fmt lint

# Build binary
build:
	@echo "Building TimberFlow API..."
	go build -o server cmd/server/main.go
	@echo "Build complete: ./server"

# Run server
run:
	@echo "Starting TimberFlow API..."
	go run cmd/server/main.go

# Run tests
test:
	@echo "Running tests..."
	go test ./... -v

# Clean binary
clean:
	@echo "Cleaning..."
	rm -f server
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

# Development mode (run with hot reload)
dev:
	@echo "Starting development mode..."
	go run cmd/server/main.go

# Production build
prod:
	@echo "Building for production..."
	CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o server cmd/server/main.go
	@echo "Production build complete"

# Docker build
docker-build:
	@echo "Building Docker image..."
	docker build -t timberflow-api:latest .

# Docker run
docker-run:
	@echo "Running Docker container..."
	docker run -p 8080:8080 --env-file .env timberflow-api:latest

# Help
help:
	@echo "TimberFlow API Makefile"
	@echo ""
	@echo "Usage:"
	@echo "  make build      - Build binary"
	@echo "  make run        - Run server"
	@echo "  make test       - Run tests"
	@echo "  make clean      - Clean binary"
	@echo "  make migrate    - Run migrations"
	@echo "  make deps       - Install dependencies"
	@echo "  make fmt        - Format code"
	@echo "  make lint       - Lint code"
	@echo "  make dev        - Development mode"
	@echo "  make prod       - Production build"
	@echo "  make docker-build - Build Docker image"
	@echo "  make docker-run   - Run Docker container"
	@echo "  make help       - Show this help"
