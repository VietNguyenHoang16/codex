"use server"

import { prisma } from "@/lib/prisma"
import { z } from "zod"

const contactSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(10),
  zalo: z.string().optional(),
  email: z.string().email(),
  service: z.string().min(1),
  message: z.string().optional(),
})

export async function createContact(data: z.infer<typeof contactSchema>) {
  try {
    const validatedData = contactSchema.parse(data)
    
    const contact = await prisma.contact.create({
      data: {
        name: validatedData.name,
        phone: validatedData.phone,
        zalo: validatedData.zalo || null,
        email: validatedData.email,
        service: validatedData.service,
        message: validatedData.message || null,
      },
    })

    return { success: true, data: contact }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: "Dữ liệu không hợp lệ", details: error.errors }
    }
    console.error("Error creating contact:", error)
    return { success: false, error: "Có lỗi xảy ra, vui lòng thử lại sau" }
  }
}

