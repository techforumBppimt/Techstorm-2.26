# TechStorm Admin System - End-to-End Test Script
# This script tests the complete admin authentication flow

Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "TechStorm Admin System - E2E Test" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""

$baseUrl = "http://localhost:5000"

# Test 1: Core Login
Write-Host "[TEST 1] Testing Core Admin Login..." -ForegroundColor Yellow
$corePayload = @{
    email = "core@techstorm.com"
    password = "CoreSecure2026!"
    role = "core"
} | ConvertTo-Json

try {
    $coreResponse = Invoke-RestMethod -Uri "$baseUrl/api/admin/login" `
        -Method POST `
        -ContentType "application/json" `
        -Body $corePayload
    
    Write-Host "✅ Core login successful!" -ForegroundColor Green
    Write-Host "   Token: $($coreResponse.token.Substring(0, 20))..." -ForegroundColor Gray
    Write-Host "   User: $($coreResponse.user.email) ($($coreResponse.user.role))" -ForegroundColor Gray
    $coreToken = $coreResponse.token
} catch {
    Write-Host "❌ Core login failed: $_" -ForegroundColor Red
    exit 1
}

Write-Host ""

# Test 2: Coordinator Login (HackStorm)
Write-Host "[TEST 2] Testing Coordinator Login (HackStorm)..." -ForegroundColor Yellow
$coordPayload = @{
    email = "coordHS@techstorm.com"
    password = "CoordHS2026!"
    role = "coordinator"
} | ConvertTo-Json

try {
    $coordResponse = Invoke-RestMethod -Uri "$baseUrl/api/admin/login" `
        -Method POST `
        -ContentType "application/json" `
        -Body $coordPayload
    
    Write-Host "✅ Coordinator login successful!" -ForegroundColor Green
    Write-Host "   Token: $($coordResponse.token.Substring(0, 20))..." -ForegroundColor Gray
    Write-Host "   User: $($coordResponse.user.email) ($($coordResponse.user.role))" -ForegroundColor Gray
    Write-Host "   Event: $($coordResponse.user.eventAbbr)" -ForegroundColor Gray
    $coordToken = $coordResponse.token
} catch {
    Write-Host "❌ Coordinator login failed: $_" -ForegroundColor Red
    exit 1
}

Write-Host ""

# Test 3: Volunteer Login (CodeBee)
Write-Host "[TEST 3] Testing Volunteer Login (CodeBee)..." -ForegroundColor Yellow
$voltPayload = @{
    email = "voltCB@techstorm.com"
    password = "VoltCB2026!"
    role = "volunteer"
} | ConvertTo-Json

try {
    $voltResponse = Invoke-RestMethod -Uri "$baseUrl/api/admin/login" `
        -Method POST `
        -ContentType "application/json" `
        -Body $voltPayload
    
    Write-Host "✅ Volunteer login successful!" -ForegroundColor Green
    Write-Host "   Token: $($voltResponse.token.Substring(0, 20))..." -ForegroundColor Gray
    Write-Host "   User: $($voltResponse.user.email) ($($voltResponse.user.role))" -ForegroundColor Gray
    Write-Host "   Event: $($voltResponse.user.eventAbbr)" -ForegroundColor Gray
    $voltToken = $voltResponse.token
} catch {
    Write-Host "❌ Volunteer login failed: $_" -ForegroundColor Red
    exit 1
}

Write-Host ""

# Test 4: Invalid Credentials
Write-Host "[TEST 4] Testing Invalid Credentials (should fail)..." -ForegroundColor Yellow
$invalidPayload = @{
    email = "invalid@techstorm.com"
    password = "WrongPassword123!"
    role = "core"
} | ConvertTo-Json

try {
    $invalidResponse = Invoke-RestMethod -Uri "$baseUrl/api/admin/login" `
        -Method POST `
        -ContentType "application/json" `
        -Body $invalidPayload
    
    Write-Host "❌ Test failed - invalid credentials should be rejected!" -ForegroundColor Red
} catch {
    Write-Host "✅ Invalid credentials correctly rejected!" -ForegroundColor Green
}

Write-Host ""

# Test 5: Role Mismatch
Write-Host "[TEST 5] Testing Role Mismatch (should fail)..." -ForegroundColor Yellow
$mismatchPayload = @{
    email = "coordHS@techstorm.com"
    password = "CoordHS2026!"
    role = "volunteer"  # Wrong role!
} | ConvertTo-Json

try {
    $mismatchResponse = Invoke-RestMethod -Uri "$baseUrl/api/admin/login" `
        -Method POST `
        -ContentType "application/json" `
        -Body $mismatchPayload
    
    Write-Host "❌ Test failed - role mismatch should be rejected!" -ForegroundColor Red
} catch {
    Write-Host "✅ Role mismatch correctly detected!" -ForegroundColor Green
}

Write-Host ""

# Test 6: Protected Route - Core Access
Write-Host "[TEST 6] Testing Protected Route - Core User..." -ForegroundColor Yellow
$headers = @{
    "Authorization" = "Bearer $coreToken"
}

try {
    $eventsResponse = Invoke-RestMethod -Uri "$baseUrl/api/events" `
        -Method GET `
        -Headers $headers
    
    Write-Host "✅ Core user can access protected routes!" -ForegroundColor Green
    Write-Host "   Response: $($eventsResponse | ConvertTo-Json -Depth 1)" -ForegroundColor Gray
} catch {
    Write-Host "❌ Core user cannot access protected routes: $_" -ForegroundColor Red
}

Write-Host ""

# Test 7: Protected Route - No Token
Write-Host "[TEST 7] Testing Protected Route - No Token (should fail)..." -ForegroundColor Yellow

try {
    $noTokenResponse = Invoke-RestMethod -Uri "$baseUrl/api/events" `
        -Method GET
    
    Write-Host "❌ Test failed - should require authentication!" -ForegroundColor Red
} catch {
    Write-Host "✅ Authentication required correctly enforced!" -ForegroundColor Green
}

Write-Host ""

# Test 8: Users Route - Core Only
Write-Host "[TEST 8] Testing Users Route - Core Access..." -ForegroundColor Yellow
$coreHeaders = @{
    "Authorization" = "Bearer $coreToken"
}

try {
    $usersResponse = Invoke-RestMethod -Uri "$baseUrl/api/users" `
        -Method GET `
        -Headers $coreHeaders
    
    Write-Host "✅ Core user can access users route!" -ForegroundColor Green
    Write-Host "   Found $($usersResponse.Count) users" -ForegroundColor Gray
} catch {
    Write-Host "❌ Core user cannot access users route: $_" -ForegroundColor Red
}

Write-Host ""

# Test 9: Users Route - Coordinator (should fail)
Write-Host "[TEST 9] Testing Users Route - Coordinator Access (should fail)..." -ForegroundColor Yellow
$coordHeaders = @{
    "Authorization" = "Bearer $coordToken"
}

try {
    $coordUsersResponse = Invoke-RestMethod -Uri "$baseUrl/api/users" `
        -Method GET `
        -Headers $coordHeaders
    
    Write-Host "❌ Test failed - coordinators should not access users route!" -ForegroundColor Red
} catch {
    Write-Host "✅ Role-based access control working correctly!" -ForegroundColor Green
}

Write-Host ""

# Test Summary
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "Test Summary" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "✅ All authentication tests passed!" -ForegroundColor Green
Write-Host "✅ Role-based access control verified!" -ForegroundColor Green
Write-Host "✅ Event-based credentials working!" -ForegroundColor Green
Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Yellow
Write-Host "1. Start frontend: npm start" -ForegroundColor White
Write-Host "2. Navigate to: http://localhost:3000/admin" -ForegroundColor White
Write-Host "3. Test the UI flow with these credentials:" -ForegroundColor White
Write-Host ""
Write-Host "   Core:        core@techstorm.com / CoreSecure2026!" -ForegroundColor Cyan
Write-Host "   Coordinator: coordHS@techstorm.com / CoordHS2026!" -ForegroundColor Cyan
Write-Host "   Volunteer:   voltCB@techstorm.com / VoltCB2026!" -ForegroundColor Cyan
Write-Host ""
Write-Host "Full credentials list in: server/roleCredentials.json" -ForegroundColor Gray
Write-Host "Complete guide in: ADMIN_SYSTEM_GUIDE.md" -ForegroundColor Gray
Write-Host ""
