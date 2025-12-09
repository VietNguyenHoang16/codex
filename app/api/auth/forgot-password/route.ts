import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { randomBytes } from "crypto"
import { z } from "zod"
import { sendResetPasswordEmail } from "@/lib/email"

const forgotPasswordSchema = z.object({
  email: z.string().email(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = forgotPasswordSchema.parse(body)

    // Find user
    const user = await prisma.user.findUnique({
      where: { email: validatedData.email },
    })

    // Don't reveal if user exists or not (security best practice)
    if (!user) {
      return NextResponse.json({
        success: true,
        message: "Nếu email tồn tại, chúng tôi đã gửi link đặt lại mật khẩu",
      })
    }

    // Generate reset token
    const resetToken = randomBytes(32).toString("hex")
    const resetExpires = new Date(Date.now() + 30 * 60 * 1000) // 30 minutes

    // Save reset token to database
    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetPasswordToken: resetToken,
        resetPasswordExpires: resetExpires,
      },
    })

    // Generate reset link
    const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000"
    const resetLink = `${baseUrl}/reset-password?token=${resetToken}`

    // Send email
    try {
      console.log(`[FORGOT PASSWORD] Sending reset email to user: ${user.email}`)
      const emailResult = await sendResetPasswordEmail(user.email, resetLink, user.name || undefined)
      console.log(`[FORGOT PASSWORD] Email sent successfully:`, emailResult)
    } catch (emailError) {
      console.error("[FORGOT PASSWORD ERROR] Failed to send reset password email:", emailError)
      console.error("[FORGOT PASSWORD ERROR] Error stack:", emailError instanceof Error ? emailError.stack : 'No stack trace')
      
      // If email service is not configured, return error
      if (emailError instanceof Error && emailError.message.includes("not configured")) {
        return NextResponse.json(
          { 
            error: "Email service chưa được cấu hình. Vui lòng liên hệ admin.",
            details: process.env.NODE_ENV === 'development' 
              ? "Please set RESEND_API_KEY in .env file. See EMAIL_SETUP.md for instructions."
              : undefined
          },
          { status: 500 }
        )
      }
      
      // If domain not verified, return specific error
      if (emailError instanceof Error && emailError.message.includes("verify a domain")) {
        return NextResponse.json(
          { 
            error: "Domain chưa được verify. Vui lòng verify domain trong Resend Dashboard để gửi email.",
            details: process.env.NODE_ENV === 'development' 
              ? "Resend chỉ cho phép gửi test email đến email đã đăng ký. Để gửi đến email khác, cần verify domain. Xem EMAIL_SETUP.md"
              : undefined
          },
          { status: 500 }
        )
      }
      
      // For other errors, still return success to user (security best practice)
      // but log the error for admin to investigate
      console.error("[FORGOT PASSWORD] Email sending failed but continuing. Check logs above for details.")
    }

    return NextResponse.json({
      success: true,
      message: "Nếu email tồn tại, chúng tôi đã gửi link đặt lại mật khẩu",
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Dữ liệu không hợp lệ", details: error.errors },
        { status: 400 }
      )
    }

    console.error("Forgot password error:", error)
    return NextResponse.json(
      { error: "Có lỗi xảy ra" },
      { status: 500 }
    )
  }
}

