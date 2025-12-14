import { NextResponse } from "next/server"
import { getSession } from "@/lib/simple-auth"
import { auth } from "@/lib/auth"

export async function GET() {
  // Check NextAuth session first (for OAuth users)
  const nextAuthSession = await auth()
  
  if (nextAuthSession?.user) {
    return NextResponse.json({ 
      session: {
        email: nextAuthSession.user.email || "",
        name: nextAuthSession.user.name || "",
        id: (nextAuthSession.user as any).id || "",
        role: (nextAuthSession.user as any).role || "USER",
      }
    })
  }
  
  // Fallback to custom JWT session (for email/password users)
  const customSession = await getSession()
  
  if (!customSession) {
    return NextResponse.json({ session: null })
  }

  return NextResponse.json({ 
    session: {
      email: customSession.email || "",
      name: "",
      id: customSession.id || "",
      role: customSession.role || "USER",
    }
  })
}







