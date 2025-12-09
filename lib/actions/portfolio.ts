"use server"

import { prisma } from "@/lib/prisma"

export async function getPortfolios(featured?: boolean) {
  try {
    const portfolios = await prisma.portfolio.findMany({
      where: featured ? { featured: true } : undefined,
      orderBy: { order: "asc" },
    })
    return { success: true, data: portfolios }
  } catch (error) {
    console.error("Error fetching portfolios:", error)
    return { success: false, error: "Có lỗi xảy ra khi tải dữ liệu" }
  }
}

export async function getPortfolioBySlug(slug: string) {
  try {
    const portfolio = await prisma.portfolio.findUnique({
      where: { id: slug },
    })
    return { success: true, data: portfolio }
  } catch (error) {
    console.error("Error fetching portfolio:", error)
    return { success: false, error: "Có lỗi xảy ra khi tải dữ liệu" }
  }
}

