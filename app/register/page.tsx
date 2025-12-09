"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Loader2 } from "lucide-react"

const registerSchema = z.object({
  name: z.string().min(2, "Họ tên phải có ít nhất 2 ký tự"),
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(8, "Mật khẩu phải có ít nhất 8 ký tự"),
  confirmPassword: z.string().optional(),
  phone: z.string().min(10, "Số điện thoại không hợp lệ"),
  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: "Bạn phải đồng ý với điều khoản và chính sách",
  }),
}).refine((data) => {
  if (data.confirmPassword && data.password !== data.confirmPassword) {
    return false
  }
  return true
}, {
  message: "Mật khẩu xác nhận không khớp",
  path: ["confirmPassword"],
})

type RegisterFormData = z.infer<typeof registerSchema>

export default function RegisterPage() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      agreeToTerms: false,
    },
  })

  const agreeToTerms = watch("agreeToTerms")

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
          phone: data.phone,
        }),
      })

      const result = await response.json()

      if (response.ok) {
        router.push("/login?registered=true")
      } else {
        // Display detailed error message
        let errorMessage = result.error || "Có lỗi xảy ra, vui lòng thử lại"
        
        // If there are validation details, show them
        if (result.details && Array.isArray(result.details)) {
          const detailMessages = result.details.map((d: any) => 
            `${d.field}: ${d.message}`
          ).join(", ")
          errorMessage = `${errorMessage} (${detailMessages})`
        } else if (result.details) {
          errorMessage = `${errorMessage}: ${result.details}`
        }
        
        setError(errorMessage)
      }
    } catch (error) {
      console.error("Register error:", error)
      setError("Có lỗi xảy ra, vui lòng thử lại")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Đăng ký tài khoản</CardTitle>
          <CardDescription>
            Tạo tài khoản để theo dõi dự án và quản lý dịch vụ
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="name">Họ tên *</Label>
              <Input
                id="name"
                {...register("name")}
                placeholder="Nguyễn Văn A"
                disabled={isLoading}
              />
              {errors.name && (
                <p className="text-sm text-destructive mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                placeholder="example@email.com"
                disabled={isLoading}
              />
              {errors.email && (
                <p className="text-sm text-destructive mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="phone">Số điện thoại *</Label>
              <Input
                id="phone"
                type="tel"
                {...register("phone")}
                placeholder="0123456789"
                disabled={isLoading}
              />
              {errors.phone && (
                <p className="text-sm text-destructive mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="password">Mật khẩu *</Label>
              <Input
                id="password"
                type="password"
                {...register("password")}
                placeholder="Tối thiểu 8 ký tự"
                disabled={isLoading}
              />
              {errors.password && (
                <p className="text-sm text-destructive mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="confirmPassword">Xác nhận mật khẩu</Label>
              <Input
                id="confirmPassword"
                type="password"
                {...register("confirmPassword")}
                placeholder="Nhập lại mật khẩu"
                disabled={isLoading}
              />
              {errors.confirmPassword && (
                <p className="text-sm text-destructive mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <div className="flex items-start space-x-2">
              <Checkbox
                id="agreeToTerms"
                checked={agreeToTerms}
                onCheckedChange={(checked) => setValue("agreeToTerms", checked === true)}
                disabled={isLoading}
              />
              <Label
                htmlFor="agreeToTerms"
                className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Tôi đồng ý với{" "}
                <Link href="/terms" className="text-primary underline">
                  điều khoản
                </Link>{" "}
                và{" "}
                <Link href="/privacy" className="text-primary underline">
                  chính sách
                </Link>{" "}
                của CodeX Studio *
              </Label>
            </div>
            {errors.agreeToTerms && (
              <p className="text-sm text-destructive">
                {errors.agreeToTerms.message}
              </p>
            )}

            {error && (
              <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md">
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Đang đăng ký...
                </>
              ) : (
                "Đăng ký"
              )}
            </Button>

            <div className="text-center text-sm text-muted-foreground">
              Đã có tài khoản?{" "}
              <Link href="/login" className="text-primary underline">
                Đăng nhập ngay
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

