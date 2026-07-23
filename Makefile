# ------------------------------------------------------------------------------
# Environment Variables
# ------------------------------------------------------------------------------
# Automatically load and export variables from .env if it exists
ifneq (,$(wildcard .env))
    include .env
    export $(shell sed 's/=.*//' .env)
endif

.PHONY: dev db stop build test help

# Default command when running just `make`
help:
	@echo "Available tasks:"
	@echo "  make dev    - Start Postgres in Docker and run Phoenix on host"
	@echo "  make db     - Start only the Postgres database container"
	@echo "  make build  - Build production Docker image"
	@echo "  make test   - Run Elixir test suite"

# ------------------------------------------------------------------------------
# Development Commands
# ------------------------------------------------------------------------------

# 1. Ensures Postgres container is running
# 2. Runs Phoenix on host (keeping hot reloading fast)
dev: db
	mix phx.server

# Start Postgres container in background
db:
	docker compose up -d postgres

# Stop all local background Docker services
stop:
	docker compose down

# ------------------------------------------------------------------------------
# Production / CI Commands
# ------------------------------------------------------------------------------

# Test building the production Docker container locally
build:
	docker build -t core_web:latest .

# Run tests on host with env vars loaded
test: db
	mix test
