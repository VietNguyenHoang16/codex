import { NextResponse } from "next/server"

export async function GET() {
  // Chỉ cho phép trong development hoặc với secret key
  const isDev = process.env.NODE_ENV === 'development'
  const secret = process.env.DEBUG_SECRET || ''
  const requestSecret = new URL(process.env.URL || 'http://localhost:3000').searchParams.get('secret')
  
  // Chỉ cho phép trong dev hoặc có secret đúng
  if (!isDev && requestSecret !== secret && secret !== '') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  return NextResponse.json({
    environment: process.env.NODE_ENV,
    hasNextAuthUrl: !!process.env.NEXTAUTH_URL,
    hasNextAuthSecret: !!process.env.NEXTAUTH_SECRET,
    hasGoogleClientId: !!process.env.GOOGLE_CLIENT_ID,
    hasGoogleClientSecret: !!process.env.GOOGLE_CLIENT_SECRET,
    hasFacebookClientId: !!process.env.FACEBOOK_CLIENT_ID,
    hasFacebookClientSecret: !!process.env.FACEBOOK_CLIENT_SECRET,
    nextAuthUrl: process.env.NEXTAUTH_URL || 'NOT SET',
    nextAuthUrlLength: process.env.NEXTAUTH_URL?.length || 0,
    googleClientIdLength: process.env.GOOGLE_CLIENT_ID?.length || 0,
    googleClientSecretLength: process.env.GOOGLE_CLIENT_SECRET?.length || 0,
    // Không hiển thị giá trị thực của secret vì bảo mật
    nextAuthSecretLength: process.env.NEXTAUTH_SECRET?.length || 0,
  })
}

