import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"

export async function GET() {
  const session = await auth()
  
  if (!session || !session.user) {
    return NextResponse.json({ session: null })
  }

  return NextResponse.json({ 
    session: {
      email: session.user.email || "",
      name: session.user.name || "",
      id: (session.user as any).id || "",
      role: (session.user as any).role || "USER",
    }
  })
}







