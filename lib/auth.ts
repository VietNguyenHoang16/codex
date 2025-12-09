import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import FacebookProvider from "next-auth/providers/facebook"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma) as any,
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
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      allowDangerousEmailAccountLinking: true,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID || "",
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET || "",
      allowDangerousEmailAccountLinking: true,
    }),
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
  },
})

