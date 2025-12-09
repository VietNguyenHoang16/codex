import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { z } from "zod"

const contactSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(10),
  zalo: z.string().optional(),
  email: z.string().optional(),
  service: z.string().optional(),
  message: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = contactSchema.parse(body)

    const contact = await prisma.contact.create({
      data: {
        name: validatedData.name,
        phone: validatedData.phone,
        zalo: validatedData.zalo || null,
        email: validatedData.email || "",
        service: validatedData.service || "Liên hệ từ website",
        message: validatedData.message || null,
      },
    })

    return NextResponse.json(
      { success: true, message: "Gửi yêu cầu thành công!", id: contact.id },
      { status: 201 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: "Dữ liệu không hợp lệ", errors: error.errors },
        { status: 400 }
      )
    }

    console.error("Error creating contact:", error)
    return NextResponse.json(
      { success: false, message: "Có lỗi xảy ra, vui lòng thử lại sau" },
      { status: 500 }
    )
  }
}

