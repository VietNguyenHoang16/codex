import { NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/simple-auth"
import { prisma } from "@/lib/prisma"
import { z } from "zod"

const portfolioSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  image: z.string().min(1),
  demoUrl: z.string().url().optional().nullable(),
  tech: z.array(z.string()).min(1),
  featured: z.boolean().default(false),
  order: z.number().default(0),
})

// GET - Lấy thông tin portfolio
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params
    const portfolio = await prisma.portfolio.findUnique({
      where: { id },
    })

    if (!portfolio) {
      return NextResponse.json(
        { error: "Không tìm thấy dự án" },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, data: portfolio })
  } catch (error) {
    console.error("Error fetching portfolio:", error)
    return NextResponse.json(
      { error: "Có lỗi xảy ra khi tải dữ liệu" },
      { status: 500 }
    )
  }
}

// PUT - Cập nhật portfolio
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params
    const body = await request.json()
    const validatedData = portfolioSchema.parse(body)

    // Kiểm tra portfolio có tồn tại không
    const existingPortfolio = await prisma.portfolio.findUnique({
      where: { id },
    })

    if (!existingPortfolio) {
      return NextResponse.json(
        { error: "Không tìm thấy dự án" },
        { status: 404 }
      )
    }

    // Cập nhật portfolio
    const portfolio = await prisma.portfolio.update({
      where: { id },
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

    console.error("Error updating portfolio:", error)
    return NextResponse.json(
      { error: "Có lỗi xảy ra khi cập nhật dự án" },
      { status: 500 }
    )
  }
}

// DELETE - Xóa portfolio
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params

    // Kiểm tra portfolio có tồn tại không
    const existingPortfolio = await prisma.portfolio.findUnique({
      where: { id },
    })

    if (!existingPortfolio) {
      return NextResponse.json(
        { error: "Không tìm thấy dự án" },
        { status: 404 }
      )
    }

    // Xóa portfolio
    await prisma.portfolio.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting portfolio:", error)
    return NextResponse.json(
      { error: "Có lỗi xảy ra khi xóa dự án" },
      { status: 500 }
    )
  }
}

