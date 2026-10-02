@echo off
chcp 65001 >nul
echo ============================================================
echo   AI Video Editor - CapCut Local Draft Engine (Port 9001)
echo ============================================================
cd /d "%~dp0engine\vectcut"
python capcut_server.py
pause
