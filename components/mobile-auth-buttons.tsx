import { getSession } from "@/lib/simple-auth"
import { UserMenu } from "./user-menu"
import { Button } from "./ui/button"
import Link from "next/link"

export async function MobileAuthButtons() {
  const session = await getSession()

  if (session) {
    return (
      <div className="pt-2">
        <UserMenu email={session.email} />
      </div>
    )
  }

  return (
    <div className="flex flex-col space-y-2 pt-2">
      <Button asChild variant="outline" className="w-full rounded-full">
        <Link href="/login">Đăng nhập</Link>
      </Button>
      <Button asChild className="w-full rounded-full">
        <Link href="/register">Đăng ký</Link>
      </Button>
    </div>
  )
}
















