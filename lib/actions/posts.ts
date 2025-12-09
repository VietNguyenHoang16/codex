"use server"

import { prisma } from "@/lib/prisma"

export async function getPosts(published?: boolean) {
  try {
    const posts = await prisma.post.findMany({
      where: published !== undefined ? { published } : undefined,
      orderBy: { createdAt: "desc" },
    })
    return { success: true, data: posts }
  } catch (error) {
    console.error("Error fetching posts:", error)
    return { success: false, error: "Có lỗi xảy ra khi tải dữ liệu" }
  }
}

export async function getPostBySlug(slug: string) {
  try {
    const post = await prisma.post.findUnique({
      where: { slug },
    })
    return { success: true, data: post }
  } catch (error) {
    console.error("Error fetching post:", error)
    return { success: false, error: "Có lỗi xảy ra khi tải dữ liệu" }
  }
}

