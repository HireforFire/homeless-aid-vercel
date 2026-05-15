@echo off
setlocal enabledelayedexpansion

echo =====================================
echo  Homeless Aid Finder - Test Script
echo =====================================
echo.

:: 1. npm install
echo [1/4] Installing dependencies...
call npm install --silent
if %errorlevel% neq 0 (
    echo FAILED: npm install
    pause
    exit /b %errorlevel%
)
echo OK
echo.

:: 2. npm run build
echo [2/4] Building...
call npm run build
if %errorlevel% neq 0 (
    echo FAILED: build
    pause
    exit /b %errorlevel%
)
echo OK
echo.

:: 3. Start server in background and test API
echo [3/4] Starting server on port 3459...
start "AidFinder" cmd /c "npx next start -p 3459"
timeout /t 10 /nobreak >nul

echo Testing API...
curl -s http://localhost:3459/api/resources > "%TEMP%\api-test.json"
if %errorlevel% neq 0 (
    echo FAILED: API route did not respond
    pause
    exit /b 1
)

powershell -Command "try { $d = Get-Content '%TEMP%\api-test.json' | ConvertFrom-Json; Write-Host 'OK -' $d.resources.Count 'resources returned' } catch { Write-Host 'FAILED: invalid JSON'; exit 1 }"
if %errorlevel% neq 0 (
    pause
    exit /b 1
)
echo OK
echo.

:: 4. Stop server
echo [4/4] Stopping server...
for /f "tokens=2" %%a in ('tasklist /fi "WINDOWTITLE eq AidFinder" /nh 2^>nul') do taskkill /pid %%a >nul 2>&1
echo OK
echo.

echo =====================================
echo  All tests passed!
echo =====================================
echo.
pause
