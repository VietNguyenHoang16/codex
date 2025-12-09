const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Creating admin user...')

  // Hash password cho admin
  const hashedPassword = await bcrypt.hash('admin123', 10)

  // Tạo hoặc cập nhật admin user
  const admin = await prisma.user.upsert({
    where: { email: 'admin@codex.studio' },
    update: {
      password: hashedPassword,
      role: 'ADMIN',
      name: 'Admin',
    },
    create: {
      email: 'admin@codex.studio',
      password: hashedPassword,
      role: 'ADMIN',
      name: 'Admin',
    },
  })

  console.log('✅ Admin user created/updated successfully!')
  console.log('')
  console.log('📧 Email: admin@codex.studio')
  console.log('🔑 Password: admin123')
  console.log('')
  console.log('⚠️  Lưu ý: Hãy đổi mật khẩu sau khi đăng nhập!')
  console.log('')
}

main()
  .catch((e) => {
    console.error('❌ Error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

