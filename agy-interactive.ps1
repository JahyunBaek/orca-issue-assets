# Interactive arm: the mode the report actually describes. `--print` never
# redraws, so it cannot exercise the CJK draft jitter the 1.1.20 fix names.
# BOM-prefixed on purpose: Windows PowerShell 5.1 reads a BOM-less .ps1 as the
# ANSI code page, which mangles the Korean prompt.
#
#   powershell -NoProfile -ExecutionPolicy Bypass -File C:/agyrun/agy-interactive.ps1 -Exe <path> -Tag <label>

param(
  [string]$Exe = "$env:LOCALAPPDATA/agy/bin/agy.exe",
  [string]$Tag = 'AGY122'
)

$env:GEMINI_API_KEY = [Environment]::GetEnvironmentVariable('GEMINI_API_KEY', 'User')

$prompt = '한국어로만 답하세요. 터미널에서 한글이 깨지는 현상에 대해 여덟 개의 긴 문장으로 자세히 설명하세요. 각 문장은 80자 이상이어야 하며 코드 블록이나 목록은 쓰지 마세요.'

Write-Host ""
Write-Host "=== $Tag INTERACTIVE cols=$($Host.UI.RawUI.WindowSize.Width) ==="
& $Exe -i $prompt
Write-Host "=== $Tag INTERACTIVE END ==="
