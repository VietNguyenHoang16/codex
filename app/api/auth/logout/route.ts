import { NextResponse } from "next/server"

export async function POST() {
  try {
    const response = NextResponse.json({ 
      success: true, 
      message: "Đăng xuất thành công" 
    })
    
    // Xóa cookie auth-token
    response.cookies.set("auth-token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 0, // Xóa cookie ngay lập tức
    })
    
    return response
  } catch (error) {
    console.error("Logout error:", error)
    
    return NextResponse.json(
      { success: false, error: "Có lỗi xảy ra khi đăng xuất" },
      { status: 500 }
    )
  }
}

