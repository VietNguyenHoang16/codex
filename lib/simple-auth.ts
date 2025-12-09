import { cookies } from "next/headers"
import { jwtVerify } from "jose"

const secret = new TextEncoder().encode(
  process.env.NEXTAUTH_SECRET || "codex-studio-secret-key-2024-change-in-production"
)

export async function getSession() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("auth-token")?.value

    if (!token) {
      return null
    }

    const { payload } = await jwtVerify(token, secret)
    return payload as { id: string; email: string; role: string }
  } catch (error) {
    return null
  }
}

export async function requireAuth() {
  const session = await getSession()
  if (!session) {
    throw new Error("Unauthorized")
  }
  return session
}

