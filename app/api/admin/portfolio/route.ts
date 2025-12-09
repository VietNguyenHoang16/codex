import { NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/simple-auth"
import { prisma } from "@/lib/prisma"
import { z } from "zod"

const portfolioSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  image: z.string().url(),
  demoUrl: z.string().url().optional().nullable(),
  tech: z.array(z.string()).min(1),
  featured: z.boolean().default(false),
  order: z.number().default(0),
})

export async function POST(request: NextRequest) {
  try {
    // Kiểm tra authentication
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = portfolioSchema.parse(body)

    // Tạo dự án mới
    const portfolio = await prisma.portfolio.create({
      data: {
        title: validatedData.title,
        description: validatedData.description,
        image: validatedData.image,
        demoUrl: validatedData.demoUrl || null,
        tech: validatedData.tech,
        featured: validatedData.featured,
        order: validatedData.order,
      },
    })

    return NextResponse.json({ success: true, data: portfolio })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Dữ liệu không hợp lệ", details: error.errors },
        { status: 400 }
      )
    }

    console.error("Error creating portfolio:", error)
    return NextResponse.json(
      { error: "Có lỗi xảy ra khi tạo dự án" },
      { status: 500 }
    )
  }
}

