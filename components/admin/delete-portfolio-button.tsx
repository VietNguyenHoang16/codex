"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Trash2, Loader2 } from "lucide-react"

interface DeletePortfolioButtonProps {
  portfolioId: string
  portfolioTitle: string
}

export function DeletePortfolioButton({ portfolioId, portfolioTitle }: DeletePortfolioButtonProps) {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const handleDelete = async () => {
    if (!showConfirm) {
      setShowConfirm(true)
      return
    }

    setIsDeleting(true)

    try {
      const response = await fetch(`/api/admin/portfolio/${portfolioId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })

      const result = await response.json()

      if (response.ok && result.success) {
        // Redirect về trang portfolio sau khi xóa thành công
        router.push("/admin/portfolio")
        router.refresh()
      } else {
        alert(result.error || "Có lỗi xảy ra khi xóa dự án")
        setIsDeleting(false)
        setShowConfirm(false)
      }
    } catch (error) {
      console.error("Error deleting portfolio:", error)
      alert("Có lỗi xảy ra, vui lòng thử lại")
      setIsDeleting(false)
      setShowConfirm(false)
    }
  }

  if (showConfirm) {
    return (
      <div className="flex items-center space-x-2">
        <span className="text-xs text-muted-foreground">Xác nhận xóa?</span>
        <Button
          variant="outline"
          size="sm"
          className="text-destructive"
          onClick={handleDelete}
          disabled={isDeleting}
        >
          {isDeleting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            "Xóa"
          )}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowConfirm(false)}
          disabled={isDeleting}
        >
          Hủy
        </Button>
      </div>
    )
  }

  return (
    <Button
      variant="outline"
      size="sm"
      className="text-destructive"
      onClick={handleDelete}
      disabled={isDeleting}
    >
      <Trash2 className="h-4 w-4" />
    </Button>
  )
}

