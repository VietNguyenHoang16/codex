# Script để thêm OAuth environment variables vào .env
# Chạy: powershell -ExecutionPolicy Bypass -File scripts/add-oauth-env.ps1

$envFile = ".env"

Write-Host "`n=== Thêm OAuth Environment Variables ===`n" -ForegroundColor Cyan

# Kiểm tra file .env có tồn tại không
if (-not (Test-Path $envFile)) {
    Write-Host "❌ File .env không tồn tại!" -ForegroundColor Red
    exit 1
}

# Đọc nội dung hiện tại
$content = Get-Content $envFile -Raw

# Kiểm tra xem đã có GOOGLE_CLIENT_ID chưa
if ($content -match "GOOGLE_CLIENT_ID") {
    Write-Host "⚠️  GOOGLE_CLIENT_ID đã tồn tại trong file .env" -ForegroundColor Yellow
    Write-Host "   Vui lòng kiểm tra và cập nhật thủ công nếu cần`n" -ForegroundColor Yellow
} else {
    Write-Host "📝 Thêm Google OAuth variables vào .env..." -ForegroundColor Green
    
    # Thêm vào cuối file
    Add-Content -Path $envFile -Value "`n# Google OAuth"
    Add-Content -Path $envFile -Value "GOOGLE_CLIENT_ID=your_google_client_id_here"
    Add-Content -Path $envFile -Value "GOOGLE_CLIENT_SECRET=your_google_client_secret_here"
    
    Write-Host "✅ Đã thêm vào file .env" -ForegroundColor Green
    Write-Host "   ⚠️  VUI LÒNG SỬA LẠI: Thay 'your_google_client_id_here' và 'your_google_client_secret_here' bằng giá trị thật từ Google Cloud Console`n" -ForegroundColor Yellow
}

# Kiểm tra Facebook
if ($content -match "FACEBOOK_CLIENT_ID") {
    Write-Host "⚠️  FACEBOOK_CLIENT_ID đã tồn tại" -ForegroundColor Yellow
} else {
    Write-Host "📝 Thêm Facebook OAuth variables vào .env..." -ForegroundColor Green
    Add-Content -Path $envFile -Value "`n# Facebook OAuth"
    Add-Content -Path $envFile -Value "FACEBOOK_CLIENT_ID=your_facebook_app_id_here"
    Add-Content -Path $envFile -Value "FACEBOOK_CLIENT_SECRET=your_facebook_app_secret_here"
    Write-Host "✅ Đã thêm vào file .env`n" -ForegroundColor Green
}

Write-Host "`nInstructions:" -ForegroundColor Cyan
Write-Host "   1. Open .env file" -ForegroundColor White
Write-Host "   2. Find GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET lines" -ForegroundColor White
Write-Host "   3. Replace values with real Client ID and Secret from Google Cloud Console" -ForegroundColor White
Write-Host "   4. Save file and restart server (npm run dev)`n" -ForegroundColor White

