import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { z } from "zod"

const resetPasswordSchema = z.object({
  token: z.string(),
  password: z.string().min(8),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = resetPasswordSchema.parse(body)

    // Find user with valid token
    const user = await prisma.user.findFirst({
      where: {
        resetPasswordToken: validatedData.token,
        resetPasswordExpires: {
          gt: new Date(), // Token not expired
        },
      },
    })

    if (!user) {
      return NextResponse.json(
        { error: "Token không hợp lệ hoặc đã hết hạn" },
        { status: 400 }
      )
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(validatedData.password, 10)

    // Update password and clear reset token
    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetPasswordToken: null,
        resetPasswordExpires: null,
      },
    })

    return NextResponse.json({
      success: true,
      message: "Đặt lại mật khẩu thành công",
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Dữ liệu không hợp lệ", details: error.errors },
        { status: 400 }
      )
    }

    console.error("Reset password error:", error)
    return NextResponse.json(
      { error: "Có lỗi xảy ra" },
      { status: 500 }
    )
  }
}










