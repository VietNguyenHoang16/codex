# Script to regenerate Prisma client
Write-Host "Stopping any running processes..." -ForegroundColor Yellow
Get-Process | Where-Object {$_.Path -like "*node*"} | Stop-Process -Force -ErrorAction SilentlyContinue

Write-Host "Regenerating Prisma client..." -ForegroundColor Green
npx prisma generate

Write-Host "Done! You can now restart your dev server with: npm run dev" -ForegroundColor Green










