import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { SignJWT } from "jose"
import { z } from "zod"

const secret = new TextEncoder().encode(
  process.env.NEXTAUTH_SECRET || "codex-studio-secret-key-2024-change-in-production"
)

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
  rememberMe: z.boolean().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = loginSchema.parse(body)

    // Find user
    const user = await prisma.user.findUnique({
      where: { email: validatedData.email },
    })

    if (!user || !user.password) {
      return NextResponse.json(
        { error: "Email hoặc mật khẩu không đúng" },
        { status: 401 }
      )
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(
      validatedData.password,
      user.password
    )

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Email hoặc mật khẩu không đúng" },
        { status: 401 }
      )
    }

    // Create JWT token
    const expiresIn = validatedData.rememberMe ? "30d" : "2h"
    const maxAge = validatedData.rememberMe ? 60 * 60 * 24 * 30 : 60 * 60 * 2

    const token = await new SignJWT({
      id: user.id,
      email: user.email,
      role: user.role,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime(expiresIn)
      .sign(secret)

    // Create response
    const response = NextResponse.json({
      success: true,
      message: "Đăng nhập thành công",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    })

    // Set cookie in response
    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge,
    })

    return response
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Dữ liệu không hợp lệ", details: error.errors },
        { status: 400 }
      )
    }

    console.error("Login error:", error)
    
    // Return more detailed error message in development
    const errorMessage = error instanceof Error 
      ? error.message 
      : "Có lỗi xảy ra khi đăng nhập"
    
    return NextResponse.json(
      { 
        error: errorMessage,
        details: process.env.NODE_ENV === 'development' ? String(error) : undefined
      },
      { status: 500 }
    )
  }
}
