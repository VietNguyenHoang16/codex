require('dotenv').config()

console.log('\n=== Kiểm tra OAuth Environment Variables ===\n')

const googleClientId = process.env.GOOGLE_CLIENT_ID
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET
const facebookClientId = process.env.FACEBOOK_CLIENT_ID
const facebookClientSecret = process.env.FACEBOOK_CLIENT_SECRET

console.log('Google OAuth:')
console.log('  GOOGLE_CLIENT_ID:', googleClientId ? `${googleClientId.substring(0, 20)}...` : '❌ KHÔNG TÌM THẤY')
console.log('  GOOGLE_CLIENT_SECRET:', googleClientSecret ? `${googleClientSecret.substring(0, 10)}...` : '❌ KHÔNG TÌM THẤY')

console.log('\nFacebook OAuth:')
console.log('  FACEBOOK_CLIENT_ID:', facebookClientId ? `${facebookClientId.substring(0, 20)}...` : '❌ KHÔNG TÌM THẤY')
console.log('  FACEBOOK_CLIENT_SECRET:', facebookClientSecret ? `${facebookClientSecret.substring(0, 10)}...` : '❌ KHÔNG TÌM THẤY')

console.log('\n=== Kết quả ===')
if (!googleClientId || !googleClientSecret) {
  console.log('❌ Google OAuth chưa được cấu hình đúng!')
  console.log('   Vui lòng thêm vào file .env:')
  console.log('   GOOGLE_CLIENT_ID=your_client_id')
  console.log('   GOOGLE_CLIENT_SECRET=your_client_secret')
} else {
  console.log('✅ Google OAuth đã được cấu hình')
}

if (!facebookClientId || !facebookClientSecret) {
  console.log('⚠️  Facebook OAuth chưa được cấu hình (không bắt buộc)')
} else {
  console.log('✅ Facebook OAuth đã được cấu hình')
}

console.log('\n')








