import { NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/simple-auth"
import { prisma } from "@/lib/prisma"
import { z } from "zod"

const postSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  content: z.string().min(1),
  excerpt: z.string().optional(),
  featuredImage: z.string().optional(),
  published: z.boolean().default(false),
})

export async function POST(request: NextRequest) {
  try {
    // Kiểm tra authentication
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = postSchema.parse(body)

    // Kiểm tra slug đã tồn tại chưa
    const existingPost = await prisma.post.findUnique({
      where: { slug: validatedData.slug },
    })

    if (existingPost) {
      return NextResponse.json(
        { error: "Slug đã tồn tại, vui lòng chọn slug khác" },
        { status: 400 }
      )
    }

    // Tạo bài viết mới
    const post = await prisma.post.create({
      data: {
        title: validatedData.title,
        slug: validatedData.slug,
        content: validatedData.content,
        excerpt: validatedData.excerpt || null,
        featuredImage: validatedData.featuredImage || null,
        published: validatedData.published,
      },
    })

    return NextResponse.json({ success: true, data: post })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Dữ liệu không hợp lệ", details: error.errors },
        { status: 400 }
      )
    }

    console.error("Error creating post:", error)
    return NextResponse.json(
      { error: "Có lỗi xảy ra khi tạo bài viết" },
      { status: 500 }
    )
  }
}

