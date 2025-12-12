import { getSession } from "@/lib/simple-auth"
import { UserMenu } from "./user-menu"
import { Button } from "./ui/button"
import Link from "next/link"

export async function AuthButtons() {
  const session = await getSession()

  if (session) {
    return <UserMenu email={session.email} />
  }

  return (
    <>
      <Button asChild variant="outline" className="rounded-full">
        <Link href="/login">Đăng nhập</Link>
      </Button>
      <Button asChild className="rounded-full">
        <Link href="/register">Đăng ký</Link>
      </Button>
    </>
  )
}












