import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import FacebookProvider from "next-auth/providers/facebook"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

// Validate environment variables
const googleClientId = process.env.GOOGLE_CLIENT_ID?.trim()
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET?.trim()
const facebookClientId = process.env.FACEBOOK_CLIENT_ID?.trim()
const facebookClientSecret = process.env.FACEBOOK_CLIENT_SECRET?.trim()
// Remove quotes if present and trim
const nextAuthSecretRaw = process.env.NEXTAUTH_SECRET?.trim().replace(/^["']|["']$/g, '') || ''
const nextAuthSecret = nextAuthSecretRaw || "codex-studio-secret-key-2024-change-in-production-min-32-chars"
const nextAuthUrl = process.env.NEXTAUTH_URL?.trim().replace(/^["']|["']$/g, '')

// Validate secret length (NextAuth requires at least 32 characters)
if (nextAuthSecret.length < 32) {
  console.error('❌ NEXTAUTH_SECRET must be at least 32 characters long')
}

// Log missing environment variables in development
if (process.env.NODE_ENV === 'development') {
  console.log('🔍 NextAuth Configuration:')
  console.log('  NEXTAUTH_URL:', nextAuthUrl || 'NOT SET')
  console.log('  NEXTAUTH_SECRET:', nextAuthSecret ? `${nextAuthSecret.substring(0, 10)}... (${nextAuthSecret.length} chars)` : 'NOT SET')
  console.log('  GOOGLE_CLIENT_ID:', googleClientId ? `${googleClientId.substring(0, 20)}...` : 'NOT SET')
  console.log('  GOOGLE_CLIENT_SECRET:', googleClientSecret ? 'SET' : 'NOT SET')
  
  if (!nextAuthSecret || nextAuthSecret.length < 32) {
    console.warn('⚠️ NEXTAUTH_SECRET is not set or too short (min 32 chars)')
  }
  if (!nextAuthUrl) {
    console.warn('⚠️ NEXTAUTH_URL is not set')
  }
  if (!googleClientId || !googleClientSecret) {
    console.warn('⚠️ Google OAuth credentials are missing')
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma) as any,
  secret: nextAuthSecret || "codex-studio-secret-key-2024-change-in-production-min-32-chars",
  trustHost: true, // Trust Vercel's host and localhost
  debug: process.env.NODE_ENV === 'development', // Enable debug in development
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        })

        if (!user || !user.password) {
          return null
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password as string,
          user.password
        )

        if (!isPasswordValid) {
          return null
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        }
      },
    }),
    // Only add Google provider if credentials are available
    ...(googleClientId && googleClientSecret ? [
      GoogleProvider({
        clientId: googleClientId,
        clientSecret: googleClientSecret,
        allowDangerousEmailAccountLinking: true,
      })
    ] : []),
    // Only add Facebook provider if credentials are available
    ...(facebookClientId && facebookClientSecret ? [
      FacebookProvider({
        clientId: facebookClientId,
        clientSecret: facebookClientSecret,
        allowDangerousEmailAccountLinking: true,
      })
    ] : []),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.role = (user as any).role || "USER"
        ;(token as any).id = user.id
      } else if ((token as any).id) {
        // Nếu token đã có id nhưng chưa có role, lấy từ database
        const dbUser = await prisma.user.findUnique({
          where: { id: (token as any).id as string },
          select: { role: true },
        })
        if (dbUser) {
          token.role = dbUser.role
        }
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        const userSession = session.user as any
        const tokenData = token as any
        userSession.role = token.role || "USER"
        userSession.id = tokenData.id || ""
      }
      return session
    },
    async signIn({ user, account, profile }) {
      // Cho phép đăng nhập
      return true
    },
    async redirect({ url, baseUrl }) {
      // Nếu URL là relative, thêm baseUrl
      if (url.startsWith("/")) return `${baseUrl}${url}`
      // Nếu URL là same-origin, cho phép
      if (new URL(url).origin === baseUrl) return url
      // Mặc định redirect về baseUrl
      return baseUrl
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  useSecureCookies: process.env.NODE_ENV === 'production',
})

