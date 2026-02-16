# TechStorm Admin System - Quick Start Script
# This script helps you start both backend and frontend servers

param(
    [switch]$Setup,
    [switch]$Backend,
    [switch]$Frontend,
    [switch]$Test
)

$ErrorActionPreference = "Stop"

function Show-Usage {
    Write-Host ""
    Write-Host "TechStorm Admin System - Quick Start" -ForegroundColor Cyan
    Write-Host "====================================" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Usage:" -ForegroundColor Yellow
    Write-Host "  .\start-admin-system.ps1 -Setup      # First-time setup (install & create users)" -ForegroundColor White
    Write-Host "  .\start-admin-system.ps1 -Backend    # Start backend server only" -ForegroundColor White
    Write-Host "  .\start-admin-system.ps1 -Frontend   # Start frontend server only" -ForegroundColor White
    Write-Host "  .\start-admin-system.ps1 -Test       # Run backend API tests" -ForegroundColor White
    Write-Host ""
    Write-Host "Examples:" -ForegroundColor Yellow
    Write-Host "  # First time setup:" -ForegroundColor Gray
    Write-Host "  .\start-admin-system.ps1 -Setup" -ForegroundColor Gray
    Write-Host ""
    Write-Host "  # Start backend in one terminal:" -ForegroundColor Gray
    Write-Host "  .\start-admin-system.ps1 -Backend" -ForegroundColor Gray
    Write-Host ""
    Write-Host "  # Start frontend in another terminal:" -ForegroundColor Gray
    Write-Host "  .\start-admin-system.ps1 -Frontend" -ForegroundColor Gray
    Write-Host ""
}

function Start-Setup {
    Write-Host ""
    Write-Host "=====================================" -ForegroundColor Cyan
    Write-Host "Running First-Time Setup" -ForegroundColor Cyan
    Write-Host "=====================================" -ForegroundColor Cyan
    Write-Host ""
    
    # Check if MongoDB is running
    Write-Host "Checking MongoDB connection..." -ForegroundColor Yellow
    try {
        $null = mongosh --eval "db.version()" 2>&1
        Write-Host "✅ MongoDB is running!" -ForegroundColor Green
    } catch {
        Write-Host "⚠️  MongoDB is not running!" -ForegroundColor Red
        Write-Host "   Please start MongoDB first:" -ForegroundColor Yellow
        Write-Host "   mongod --dbpath=`"C:\data\db`"" -ForegroundColor White
        exit 1
    }
    
    Write-Host ""
    Write-Host "Installing backend dependencies..." -ForegroundColor Yellow
    Set-Location server
    npm install
    
    Write-Host ""
    Write-Host "Creating admin users in database..." -ForegroundColor Yellow
    node setup.js
    
    Set-Location ..
    
    Write-Host ""
    Write-Host "Installing frontend dependencies..." -ForegroundColor Yellow
    npm install
    
    Write-Host ""
    Write-Host "=====================================" -ForegroundColor Cyan
    Write-Host "✅ Setup Complete!" -ForegroundColor Green
    Write-Host "=====================================" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Yellow
    Write-Host "1. Start backend:  .\start-admin-system.ps1 -Backend" -ForegroundColor White
    Write-Host "2. Start frontend: .\start-admin-system.ps1 -Frontend" -ForegroundColor White
    Write-Host "3. Visit: http://localhost:3000/admin" -ForegroundColor White
    Write-Host ""
}

function Start-Backend {
    Write-Host ""
    Write-Host "=====================================" -ForegroundColor Cyan
    Write-Host "Starting Backend Server" -ForegroundColor Cyan
    Write-Host "=====================================" -ForegroundColor Cyan
    Write-Host ""
    
    # Check if MongoDB is running
    Write-Host "Checking MongoDB connection..." -ForegroundColor Yellow
    try {
        $null = mongosh --eval "db.version()" 2>&1
        Write-Host "✅ MongoDB is running!" -ForegroundColor Green
    } catch {
        Write-Host "⚠️  MongoDB is not running!" -ForegroundColor Red
        Write-Host "   Please start MongoDB first:" -ForegroundColor Yellow
        Write-Host "   mongod --dbpath=`"C:\data\db`"" -ForegroundColor White
        exit 1
    }
    
    Write-Host ""
    Write-Host "Starting server on http://localhost:5000..." -ForegroundColor Yellow
    Write-Host "Press Ctrl+C to stop" -ForegroundColor Gray
    Write-Host ""
    
    Set-Location server
    node server.js
}

function Start-Frontend {
    Write-Host ""
    Write-Host "=====================================" -ForegroundColor Cyan
    Write-Host "Starting Frontend Server" -ForegroundColor Cyan
    Write-Host "=====================================" -ForegroundColor Cyan
    Write-Host ""
    
    Write-Host "Starting React development server..." -ForegroundColor Yellow
    Write-Host "Press Ctrl+C to stop" -ForegroundColor Gray
    Write-Host ""
    Write-Host "Admin portal will be available at:" -ForegroundColor Yellow
    Write-Host "http://localhost:3000/admin" -ForegroundColor Cyan
    Write-Host ""
    
    npm start
}

function Start-Test {
    Write-Host ""
    Write-Host "=====================================" -ForegroundColor Cyan
    Write-Host "Running Backend API Tests" -ForegroundColor Cyan
    Write-Host "=====================================" -ForegroundColor Cyan
    Write-Host ""
    
    # Check if backend is running
    Write-Host "Checking if backend is running..." -ForegroundColor Yellow
    try {
        $null = Invoke-RestMethod -Uri "http://localhost:5000" -TimeoutSec 2
        Write-Host "✅ Backend is running!" -ForegroundColor Green
    } catch {
        Write-Host "⚠️  Backend is not running!" -ForegroundColor Red
        Write-Host "   Please start backend first:" -ForegroundColor Yellow
        Write-Host "   .\start-admin-system.ps1 -Backend" -ForegroundColor White
        exit 1
    }
    
    Write-Host ""
    Set-Location server
    .\test-admin-system.ps1
    Set-Location ..
}

# Main script logic
if (-not ($Setup -or $Backend -or $Frontend -or $Test)) {
    Show-Usage
    exit 0
}

if ($Setup) {
    Start-Setup
}

if ($Backend) {
    Start-Backend
}

if ($Frontend) {
    Start-Frontend
}

if ($Test) {
    Start-Test
}
