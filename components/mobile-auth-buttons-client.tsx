"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { Button } from "./ui/button"
import Link from "next/link"
import { UserMenu } from "./user-menu"

export function MobileAuthButtonsClient() {
  const [session, setSession] = useState<{ email: string } | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const pathname = usePathname()

  const fetchSession = () => {
    fetch("/api/auth/session")
      .then((res) => res.json())
      .then((data) => {
        setSession(data.session)
        setIsLoading(false)
      })
      .catch(() => {
        setIsLoading(false)
      })
  }

  useEffect(() => {
    fetchSession()
  }, [])

  // Refresh session when pathname changes (e.g., after OAuth redirect)
  useEffect(() => {
    fetchSession()
  }, [pathname])

  // Refresh session when window gains focus (e.g., after OAuth popup closes)
  useEffect(() => {
    const handleFocus = () => {
      fetchSession()
    }
    window.addEventListener("focus", handleFocus)
    return () => window.removeEventListener("focus", handleFocus)
  }, [])

  if (isLoading) {
    return (
      <div className="flex flex-col space-y-2 pt-2">
        <Button variant="outline" className="w-full rounded-full" disabled>
          Đăng nhập
        </Button>
        <Button className="w-full rounded-full" disabled>
          Đăng ký
        </Button>
      </div>
    )
  }

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







