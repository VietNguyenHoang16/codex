import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const token = searchParams.get("token")

    if (!token) {
      return NextResponse.json({ valid: false }, { status: 400 })
    }

    // Find user with this token
    const user = await prisma.user.findFirst({
      where: {
        resetPasswordToken: token,
        resetPasswordExpires: {
          gt: new Date(), // Token not expired
        },
      },
    })

    return NextResponse.json({ valid: !!user })
  } catch (error) {
    console.error("Verify reset token error:", error)
    return NextResponse.json({ valid: false }, { status: 500 })
  }
}










