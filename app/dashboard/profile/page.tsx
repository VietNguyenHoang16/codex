"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, User, Save, ArrowLeft, Lock } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface UserProfile {
  id: string
  name: string | null
  email: string
  phone: string | null
  image: string | null
  role: string
}

export default function ProfilePage() {
  const router = useRouter()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    image: "",
  })

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      const response = await fetch("/api/user/profile")
      if (!response.ok) {
        if (response.status === 401) {
          router.push("/login?redirect=/dashboard/profile")
          return
        }
        throw new Error("Không thể tải thông tin")
      }
      const data = await response.json()
      setProfile(data.user)
      setFormData({
        name: data.user.name || "",
        phone: data.user.phone || "",
        image: data.user.image || "",
      })
    } catch (error) {
      console.error("Error fetching profile:", error)
      setError("Không thể tải thông tin cá nhân")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setError(null)
    setSuccess(null)

    try {
      const response = await fetch("/api/user/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name || null,
          phone: formData.phone || null,
          image: formData.image || null,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Có lỗi xảy ra")
      }

      setSuccess("Cập nhật thông tin thành công!")
      setProfile(data.user)
      
      // Refresh session to update header
      setTimeout(() => {
        window.location.reload()
      }, 1000)
    } catch (error: any) {
      console.error("Error updating profile:", error)
      setError(error.message || "Có lỗi xảy ra khi cập nhật")
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">
              Không thể tải thông tin cá nhân
            </p>
            <Button asChild className="mt-4 w-full">
              <Link href="/dashboard">Quay lại Dashboard</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="mb-6">
        <Button asChild variant="ghost" className="mb-4">
          <Link href="/dashboard">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Quay lại Dashboard
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Cập nhật thông tin cá nhân</h1>
        <p className="text-muted-foreground mt-2">
          Quản lý thông tin tài khoản của bạn
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Thông tin cá nhân
          </CardTitle>
          <CardDescription>
            Cập nhật thông tin tài khoản của bạn
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Avatar Preview */}
            {formData.image && (
              <div className="flex justify-center">
                <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-border">
                  <Image
                    src={formData.image}
                    alt="Avatar"
                    fill
                    className="object-cover"
                    onError={() => {
                      setFormData({ ...formData, image: "" })
                    }}
                  />
                </div>
              </div>
            )}

            {/* Email (read-only) */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={profile.email}
                disabled
                className="bg-muted"
              />
              <p className="text-xs text-muted-foreground">
                Email không thể thay đổi
              </p>
            </div>

            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Họ và tên</Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Nhập họ và tên"
              />
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone">Số điện thoại</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                placeholder="Nhập số điện thoại"
              />
            </div>

            {/* Image URL */}
            <div className="space-y-2">
              <Label htmlFor="image">URL ảnh đại diện</Label>
              <Input
                id="image"
                type="url"
                value={formData.image}
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.value })
                }
                placeholder="https://example.com/avatar.jpg"
              />
              <p className="text-xs text-muted-foreground">
                Nhập URL ảnh đại diện (tùy chọn)
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 rounded-md bg-destructive/10 text-destructive text-sm">
                {error}
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="p-3 rounded-md bg-green-500/10 text-green-600 text-sm">
                {success}
              </div>
            )}

            {/* Submit Button */}
            <div className="flex gap-3">
              <Button
                type="submit"
                disabled={isSaving}
                className="flex-1"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Đang lưu...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Lưu thay đổi
                  </>
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setFormData({
                    name: profile.name || "",
                    phone: profile.phone || "",
                    image: profile.image || "",
                  })
                  setError(null)
                  setSuccess(null)
                }}
              >
                Hủy
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Change Password Card */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            Đổi mật khẩu
          </CardTitle>
          <CardDescription>
            Thay đổi mật khẩu tài khoản của bạn
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChangePasswordForm />
        </CardContent>
      </Card>
    </div>
  )
}

function ChangePasswordForm() {
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setError(null)
    setSuccess(null)

    try {
      const response = await fetch("/api/user/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Có lỗi xảy ra")
      }

      setSuccess("Đổi mật khẩu thành công!")
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
    } catch (error: any) {
      console.error("Error changing password:", error)
      setError(error.message || "Có lỗi xảy ra khi đổi mật khẩu")
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="currentPassword">Mật khẩu hiện tại</Label>
        <Input
          id="currentPassword"
          type="password"
          value={formData.currentPassword}
          onChange={(e) =>
            setFormData({ ...formData, currentPassword: e.target.value })
          }
          placeholder="Nhập mật khẩu hiện tại"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="newPassword">Mật khẩu mới</Label>
        <Input
          id="newPassword"
          type="password"
          value={formData.newPassword}
          onChange={(e) =>
            setFormData({ ...formData, newPassword: e.target.value })
          }
          placeholder="Nhập mật khẩu mới (tối thiểu 6 ký tự)"
          required
          minLength={6}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Xác nhận mật khẩu mới</Label>
        <Input
          id="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={(e) =>
            setFormData({ ...formData, confirmPassword: e.target.value })
          }
          placeholder="Nhập lại mật khẩu mới"
          required
          minLength={6}
        />
      </div>

      {error && (
        <div className="p-3 rounded-md bg-destructive/10 text-destructive text-sm">
          {error}
        </div>
      )}

      {success && (
        <div className="p-3 rounded-md bg-green-500/10 text-green-600 text-sm">
          {success}
        </div>
      )}

      <Button type="submit" disabled={isSaving} className="w-full">
        {isSaving ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Đang lưu...
          </>
        ) : (
          <>
            <Lock className="h-4 w-4 mr-2" />
            Đổi mật khẩu
          </>
        )}
      </Button>
    </form>
  )
}

