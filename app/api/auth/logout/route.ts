import { NextResponse } from "next/server"
import { signOut } from "@/lib/auth"

export async function POST() {
  try {
    await signOut({ redirect: false })
    
    return NextResponse.json({ 
      success: true, 
      message: "Đăng xuất thành công" 
    })
  } catch (error) {
    console.error("Logout error:", error)
    
    return NextResponse.json(
      { success: false, error: "Có lỗi xảy ra khi đăng xuất" },
      { status: 500 }
    )
  }
}

