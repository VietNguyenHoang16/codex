"use client"

import { useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LogOut, User, Loader2 } from "lucide-react"

interface UserMenuProps {
  email: string
}

export function UserMenu({ email }: UserMenuProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleLogout = async () => {
    if (isLoggingOut) return

    setIsLoggingOut(true)
    try {
      // Call logout API
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      })
      
      // Small delay to ensure cookie is cleared
      await new Promise(resolve => setTimeout(resolve, 100))
      
      // Force a hard refresh to clear all client-side state
      if (pathname?.startsWith("/dashboard") || pathname?.startsWith("/admin")) {
        // If on protected page, redirect to home
        window.location.href = "/"
      } else {
        // Otherwise just refresh the page
        window.location.reload()
      }
    } catch (error) {
      console.error("Logout error:", error)
      // Even if there's an error, try to redirect anyway
      window.location.href = "/"
    } finally {
      setIsLoggingOut(false)
    }
  }

  return (
    <div className="flex items-center gap-3">
      <div className="hidden md:flex items-center gap-2 text-sm">
        <User className="h-4 w-4" />
        <span className="text-muted-foreground">{email}</span>
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={handleLogout}
        disabled={isLoggingOut}
        className="rounded-full"
      >
        {isLoggingOut ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Đang đăng xuất...
          </>
        ) : (
          <>
            <LogOut className="h-4 w-4 mr-2" />
            Đăng xuất
          </>
        )}
      </Button>
    </div>
  )
}

