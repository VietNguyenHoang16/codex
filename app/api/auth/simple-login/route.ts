import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { SignJWT } from "jose"

const secret = new TextEncoder().encode(
  process.env.NEXTAUTH_SECRET || "codex-studio-secret-key-2024-change-in-production"
)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email và mật khẩu là bắt buộc" },
        { status: 400 }
      )
    }

    // Kiểm tra user
    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user || !user.password) {
      return NextResponse.json(
        { error: "Email hoặc mật khẩu không đúng" },
        { status: 401 }
      )
    }

    // Kiểm tra password
    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Email hoặc mật khẩu không đúng" },
        { status: 401 }
      )
    }

    // Tạo JWT token
    const token = await new SignJWT({
      id: user.id,
      email: user.email,
      role: user.role,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("7d")
      .sign(secret)

    // Tạo response với cookie
    const response = NextResponse.json({ success: true, user: { email: user.email, role: user.role } })
    
    // Set cookie
    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    })

    return response
  } catch (error: any) {
    console.error("Login error:", error)
    return NextResponse.json(
      { error: error.message || "Có lỗi xảy ra khi đăng nhập" },
      { status: 500 }
    )
  }
}

