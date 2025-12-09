import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { z } from "zod"
import bcrypt from "bcryptjs"

const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Mật khẩu hiện tại không được để trống"),
  newPassword: z.string().min(6, "Mật khẩu mới phải có ít nhất 6 ký tự"),
  confirmPassword: z.string().min(1, "Xác nhận mật khẩu không được để trống"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Mật khẩu mới và xác nhận mật khẩu không khớp",
  path: ["confirmPassword"],
})

export async function POST(request: NextRequest) {
  try {
    const session = await auth()

    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const userId = (session.user as any).id

    if (!userId) {
      return NextResponse.json(
        { error: "User ID not found" },
        { status: 400 }
      )
    }

    const body = await request.json()
    const validatedData = changePasswordSchema.parse(body)

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        password: true,
      },
    })

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      )
    }

    // Check if user has a password (OAuth users might not have one)
    if (!user.password) {
      return NextResponse.json(
        { error: "Tài khoản này không có mật khẩu. Vui lòng đăng nhập bằng phương thức khác." },
        { status: 400 }
      )
    }

    // Verify current password
    const isPasswordValid = await bcrypt.compare(
      validatedData.currentPassword,
      user.password
    )

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Mật khẩu hiện tại không đúng" },
        { status: 400 }
      )
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(validatedData.newPassword, 10)

    // Update password
    await prisma.user.update({
      where: { id: userId },
      data: {
        password: hashedPassword,
      },
    })

    return NextResponse.json({
      success: true,
      message: "Đổi mật khẩu thành công",
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      )
    }

    console.error("Change password error:", error)
    return NextResponse.json(
      { error: "Có lỗi xảy ra khi đổi mật khẩu" },
      { status: 500 }
    )
  }
}




