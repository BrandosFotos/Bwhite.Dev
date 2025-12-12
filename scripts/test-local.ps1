# Local Testing Script - Replicates GitHub Actions Workflow
# Run this script to test your website locally before pushing

$ErrorActionPreference = "Stop"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Starting Local Website Tests" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

# Step 1: Remove node_modules
Write-Host "`n[1/7] Removing node_modules..." -ForegroundColor Yellow
if (Test-Path "node_modules") {
    Remove-Item -Recurse -Force "node_modules"
    Write-Host "✓ node_modules removed" -ForegroundColor Green
} else {
    Write-Host "✓ node_modules does not exist, skipping" -ForegroundColor Green
}

# Step 2: Install dependencies
Write-Host "`n[2/7] Installing dependencies..." -ForegroundColor Yellow
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "✗ npm install failed" -ForegroundColor Red
    exit 1
}
Write-Host "✓ Dependencies installed" -ForegroundColor Green

# Step 3: Test dev server
Write-Host "`n[3/7] Testing dev server..." -ForegroundColor Yellow
$devLog = "$env:TEMP\dev-server.log"
$devProcess = Start-Process -FilePath "npm" -ArgumentList "run", "dev" -PassThru -NoNewWindow -RedirectStandardOutput $devLog -RedirectStandardError $devLog

Write-Host "Waiting for dev server to start..." -ForegroundColor Gray
$devStarted = $false
for ($i = 1; $i -le 60; $i++) {
    try {
        $response = Invoke-WebRequest -Uri "http://localhost:3000" -TimeoutSec 2 -UseBasicParsing -ErrorAction SilentlyContinue
        if ($response.StatusCode -eq 200) {
            Write-Host "✓ Dev server is running!" -ForegroundColor Green
            $devStarted = $true
            break
        }
    } catch {
        Start-Sleep -Seconds 1
    }
}

if (-not $devStarted) {
    Write-Host "✗ Dev server failed to start within 60 seconds" -ForegroundColor Red
    Write-Host "Dev server logs:" -ForegroundColor Yellow
    Get-Content $devLog -ErrorAction SilentlyContinue
    if ($devProcess -and !$devProcess.HasExited) {
        Stop-Process -Id $devProcess.Id -Force -ErrorAction SilentlyContinue
    }
    Get-Process -Name "node" -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
    exit 1
}

# Verify dev server responds
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000" -UseBasicParsing
    Write-Host "✓ Dev server test passed!" -ForegroundColor Green
} catch {
    Write-Host "✗ Dev server is not responding correctly" -ForegroundColor Red
    Write-Host "Dev server logs:" -ForegroundColor Yellow
    Get-Content $devLog -ErrorAction SilentlyContinue
    if ($devProcess -and !$devProcess.HasExited) {
        Stop-Process -Id $devProcess.Id -Force -ErrorAction SilentlyContinue
    }
    Get-Process -Name "node" -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
    exit 1
}

# Stop dev server
if ($devProcess -and !$devProcess.HasExited) {
    Stop-Process -Id $devProcess.Id -Force -ErrorAction SilentlyContinue
}
Get-Process -Name "node" -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
Start-Sleep -Seconds 2

# Step 4: Build application
Write-Host "`n[4/7] Building application..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "✗ Build failed" -ForegroundColor Red
    exit 1
}
Write-Host "✓ Build completed" -ForegroundColor Green

# Step 5: Test production server
Write-Host "`n[5/7] Testing production server..." -ForegroundColor Yellow
$prodLog = "$env:TEMP\prod-server.log"
$prodProcess = Start-Process -FilePath "npm" -ArgumentList "run", "start" -PassThru -NoNewWindow -RedirectStandardOutput $prodLog -RedirectStandardError $prodLog

Write-Host "Waiting for production server to start..." -ForegroundColor Gray
$prodStarted = $false
for ($i = 1; $i -le 60; $i++) {
    try {
        $response = Invoke-WebRequest -Uri "http://localhost:3009" -TimeoutSec 2 -UseBasicParsing -ErrorAction SilentlyContinue
        if ($response.StatusCode -eq 200) {
            Write-Host "✓ Production server is running!" -ForegroundColor Green
            $prodStarted = $true
            break
        }
    } catch {
        Start-Sleep -Seconds 1
    }
}

if (-not $prodStarted) {
    Write-Host "✗ Production server failed to start within 60 seconds" -ForegroundColor Red
    Write-Host "Production server logs:" -ForegroundColor Yellow
    Get-Content $prodLog -ErrorAction SilentlyContinue
    if ($prodProcess -and !$prodProcess.HasExited) {
        Stop-Process -Id $prodProcess.Id -Force -ErrorAction SilentlyContinue
    }
    Get-Process -Name "node" -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
    exit 1
}

# Verify production server responds
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3009" -UseBasicParsing
    Write-Host "✓ Production server test passed!" -ForegroundColor Green
} catch {
    Write-Host "✗ Production server is not responding correctly" -ForegroundColor Red
    Write-Host "Production server logs:" -ForegroundColor Yellow
    Get-Content $prodLog -ErrorAction SilentlyContinue
    if ($prodProcess -and !$prodProcess.HasExited) {
        Stop-Process -Id $prodProcess.Id -Force -ErrorAction SilentlyContinue
    }
    Get-Process -Name "node" -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
    exit 1
}

# Stop production server
if ($prodProcess -and !$prodProcess.HasExited) {
    Stop-Process -Id $prodProcess.Id -Force -ErrorAction SilentlyContinue
}
Get-Process -Name "node" -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
Start-Sleep -Seconds 2

# Step 6: Build Docker images
Write-Host "`n[6/7] Building Docker images..." -ForegroundColor Yellow
docker compose build
if ($LASTEXITCODE -ne 0) {
    Write-Host "✗ Docker build failed" -ForegroundColor Red
    exit 1
}
Write-Host "✓ Docker images built" -ForegroundColor Green

# Step 7: Test Docker containers
Write-Host "`n[7/7] Testing Docker containers..." -ForegroundColor Yellow
docker compose up -d
if ($LASTEXITCODE -ne 0) {
    Write-Host "✗ Docker compose up failed" -ForegroundColor Red
    docker compose down
    exit 1
}

Write-Host "Waiting for Docker containers to start..." -ForegroundColor Gray
$dockerStarted = $false
for ($i = 1; $i -le 60; $i++) {
    $containers = docker compose ps --format json | ConvertFrom-Json
    $upContainers = $containers | Where-Object { $_.State -eq "running" }
    
    if ($upContainers) {
        try {
            $response = Invoke-WebRequest -Uri "http://localhost:3009" -TimeoutSec 2 -UseBasicParsing -ErrorAction SilentlyContinue
            if ($response.StatusCode -eq 200) {
                Write-Host "✓ Docker containers are running and responding!" -ForegroundColor Green
                $dockerStarted = $true
                break
            }
        } catch {
            Start-Sleep -Seconds 1
        }
    } else {
        Start-Sleep -Seconds 1
    }
}

if (-not $dockerStarted) {
    Write-Host "✗ Docker containers failed to start within 60 seconds" -ForegroundColor Red
    Write-Host "Docker logs:" -ForegroundColor Yellow
    docker compose logs
    docker compose down
    exit 1
}

# Verify Docker service responds
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3009" -UseBasicParsing
    Write-Host "✓ Docker test passed!" -ForegroundColor Green
} catch {
    Write-Host "✗ Docker service is not responding correctly" -ForegroundColor Red
    Write-Host "Docker logs:" -ForegroundColor Yellow
    docker compose logs
    docker compose down
    exit 1
}

# Show Docker logs
Write-Host "`nDocker logs:" -ForegroundColor Cyan
docker compose logs

# Cleanup
Write-Host "`nCleaning up Docker containers..." -ForegroundColor Yellow
docker compose down -v
Write-Host "✓ Cleanup completed" -ForegroundColor Green

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "All tests passed! ✓" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan

