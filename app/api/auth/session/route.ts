import { NextResponse } from "next/server"
import { getSession } from "@/lib/simple-auth"

export async function GET() {
  const session = await getSession()
  
  if (!session) {
    return NextResponse.json({ session: null })
  }

  return NextResponse.json({ 
    session: {
      email: session.email || "",
      name: "",
      id: session.id || "",
      role: session.role || "USER",
    }
  })
}







