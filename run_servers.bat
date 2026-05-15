@echo off
echo ==============================================
echo   Starting Nuvora Backend and Frontend...
echo ==============================================

:: Start Django Backend
echo Starting Django Server on port 8000...
start "Nuvora Backend" cmd /k "cd backend && venv\Scripts\activate && python manage.py runserver"

:: Start Frontend Server
echo Starting Frontend Server on port 3000...
start "Nuvora Frontend" cmd /k "python -m http.server 3000"

echo.
echo Servers are starting! 
echo 1. Check the 'Nuvora Backend' window for any errors.
echo 2. Open http://localhost:3000 in your browser.
echo.
pause
