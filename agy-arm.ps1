# The arm nwparker asked for: the same agy command in both terminals, at a matched
# pane width, 15+ runs. Prints the column count per run so the transcript proves
# the widths were equal.
#
#   powershell -NoProfile -File agy-arm.ps1 [runs]

param([int]$Runs = 15)

$env:GEMINI_API_KEY = [Environment]::GetEnvironmentVariable('GEMINI_API_KEY', 'User')
$agy = "$env:LOCALAPPDATA\agy\bin\agy.exe"

# Why fixed wording: every run must ask for the same shape, or the arms differ by
# more than the terminal. Long sentences guarantee wrapped continuation rows,
# which is where the reported corruption lands.
$prompt = '한국어로만 답하세요. 터미널 렌더링에 대해 6개 문장으로 설명하세요. 각 문장은 60자 이상이어야 합니다. 코드 블록이나 목록은 쓰지 마세요.'

for ($i = 1; $i -le $Runs; $i++) {
  Write-Host ""
  Write-Host "=== AGY RUN $i cols=$($Host.UI.RawUI.WindowSize.Width) ==="
  & $agy --print $prompt
  Write-Host "=== AGY RUN $i END ==="
  Start-Sleep -Milliseconds 400
}
