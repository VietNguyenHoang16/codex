"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
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
import { OAuthButtons } from "@/components/oauth-buttons"

const loginSchema = z.object({
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(1, "Vui lòng nhập mật khẩu"),
  rememberMe: z.boolean().optional(),
})

type LoginFormData = z.infer<typeof loginSchema>

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const registered = searchParams.get("registered")

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      rememberMe: false,
    },
  })

  const rememberMe = watch("rememberMe")

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
          rememberMe: data.rememberMe,
        }),
        credentials: "include",
      })

      // Check if response is ok
      if (!response.ok) {
        const result = await response.json().catch(() => ({}))
        setError(result.error || `Lỗi ${response.status}: ${response.statusText}`)
        setIsLoading(false)
        return
      }

      const result = await response.json()

      // Check if result has success flag
      if (result.success) {
        // Small delay to ensure cookie is set
        await new Promise(resolve => setTimeout(resolve, 100))
        
        // Redirect to dashboard or home
        const redirectTo = searchParams.get("redirect") || "/dashboard"
        window.location.href = redirectTo // Use window.location for hard redirect
      } else {
        setError(result.error || "Email hoặc mật khẩu không đúng")
        setIsLoading(false)
      }
    } catch (error) {
      console.error("Login error:", error)
      const errorMessage = error instanceof Error 
        ? error.message 
        : "Có lỗi xảy ra, vui lòng thử lại"
      setError(errorMessage)
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Đăng nhập</CardTitle>
          <CardDescription>
            Đăng nhập để truy cập tài khoản của bạn
          </CardDescription>
        </CardHeader>
        <CardContent>
          {registered && (
            <div className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md mb-4">
              <p className="text-sm text-green-800 dark:text-green-200">
                Đăng ký thành công! Vui lòng đăng nhập.
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
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
              <Label htmlFor="password">Mật khẩu</Label>
              <Input
                id="password"
                type="password"
                {...register("password")}
                placeholder="••••••••"
                disabled={isLoading}
              />
              {errors.password && (
                <p className="text-sm text-destructive mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="rememberMe"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setValue("rememberMe", checked === true)}
                  disabled={isLoading}
                />
                <Label
                  htmlFor="rememberMe"
                  className="text-sm font-normal cursor-pointer"
                >
                  Ghi nhớ đăng nhập
                </Label>
              </div>

              <Link
                href="/forgot-password"
                className="text-sm text-primary underline hover:no-underline"
              >
                Quên mật khẩu?
              </Link>
            </div>

            {error && (
              <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md">
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Đang đăng nhập...
                </>
              ) : (
                "Đăng nhập"
              )}
            </Button>
          </form>

          <OAuthButtons />

          <div className="text-center text-sm text-muted-foreground mt-4">
            Chưa có tài khoản?{" "}
            <Link href="/register" className="text-primary underline">
              Đăng ký ngay
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

