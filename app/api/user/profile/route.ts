import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { z } from "zod"

const updateProfileSchema = z.object({
  name: z.string().min(1, "Tên không được để trống").optional(),
  phone: z.string().optional().nullable(),
  image: z.string().url("URL ảnh không hợp lệ").optional().nullable(),
})

export async function GET() {
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

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        image: true,
        role: true,
      },
    })

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({ user })
  } catch (error) {
    console.error("Get profile error:", error)
    return NextResponse.json(
      { error: "Có lỗi xảy ra khi lấy thông tin" },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
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
    const validatedData = updateProfileSchema.parse(body)

    // Chỉ cập nhật các trường được cung cấp
    const updateData: {
      name?: string
      phone?: string | null
      image?: string | null
    } = {}

    if (validatedData.name !== undefined) {
      updateData.name = validatedData.name
    }
    if (validatedData.phone !== undefined) {
      updateData.phone = validatedData.phone || null
    }
    if (validatedData.image !== undefined) {
      updateData.image = validatedData.image || null
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        image: true,
        role: true,
      },
    })

    return NextResponse.json({
      success: true,
      message: "Cập nhật thông tin thành công",
      user: updatedUser,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      )
    }

    console.error("Update profile error:", error)
    return NextResponse.json(
      { error: "Có lỗi xảy ra khi cập nhật thông tin" },
      { status: 500 }
    )
  }
}
