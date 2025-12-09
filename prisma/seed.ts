import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting seed...')

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

  console.log('✅ Admin user created/updated:', {
    email: admin.email,
    role: admin.role,
    id: admin.id,
  })

  console.log('')
  console.log('📧 Email: admin@codex.studio')
  console.log('🔑 Password: admin123')
  console.log('')
  console.log('⚠️  Lưu ý: Hãy đổi mật khẩu sau khi đăng nhập!')
  console.log('')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

