"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, ArrowLeft, X } from "lucide-react"
import Link from "next/link"

const portfolioSchema = z.object({
  title: z.string().min(1, "Tiêu đề là bắt buộc"),
  description: z.string().min(1, "Mô tả là bắt buộc"),
  image: z.string().min(1, "URL ảnh là bắt buộc"),
  demoUrl: z.string().optional(),
  tech: z.array(z.string()).min(1, "Cần ít nhất 1 công nghệ"),
  featured: z.boolean().default(false),
  order: z.number().default(0),
}).refine((data) => {
  if (data.demoUrl && data.demoUrl.trim() !== "") {
    try {
      new URL(data.demoUrl)
      return true
    } catch {
      return false
    }
  }
  return true
}, {
  message: "URL demo không hợp lệ",
  path: ["demoUrl"],
})

type PortfolioFormData = z.infer<typeof portfolioSchema>

export default function EditPortfolioPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [techInput, setTechInput] = useState("")

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<PortfolioFormData>({
    resolver: zodResolver(portfolioSchema),
  })

  const tech = watch("tech") || []

  // Load portfolio data
  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const response = await fetch(`/api/admin/portfolio/${id}`)
        const result = await response.json()

        if (response.ok && result.success) {
          const data = result.data
          setValue("title", data.title)
          setValue("description", data.description)
          setValue("image", data.image)
          setValue("demoUrl", data.demoUrl || "")
          setValue("tech", data.tech || [])
          setValue("featured", data.featured || false)
          setValue("order", data.order || 0)
        } else {
          setError("Không tìm thấy dự án")
        }
      } catch (error) {
        console.error("Error fetching portfolio:", error)
        setError("Có lỗi xảy ra khi tải dữ liệu")
      } finally {
        setIsLoading(false)
      }
    }

    if (id) {
      fetchPortfolio()
    }
  }, [id, setValue])

  const addTech = () => {
    if (techInput.trim() && !tech.includes(techInput.trim())) {
      setValue("tech", [...tech, techInput.trim()])
      setTechInput("")
    }
  }

  const removeTech = (index: number) => {
    setValue(
      "tech",
      tech.filter((_, i) => i !== index)
    )
  }

  const onSubmit = async (data: PortfolioFormData) => {
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch(`/api/admin/portfolio/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          demoUrl: data.demoUrl || null,
        }),
      })

      const result = await response.json()

      if (response.ok && result.success) {
        router.push("/admin/portfolio")
        router.refresh()
      } else {
        setError(result.error || "Có lỗi xảy ra khi cập nhật dự án")
      }
    } catch (error) {
      console.error("Error updating portfolio:", error)
      setError("Có lỗi xảy ra, vui lòng thử lại")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b">
        <div className="container px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Chỉnh sửa dự án</h1>
            <p className="text-sm text-muted-foreground">Cập nhật thông tin dự án</p>
          </div>
          <Button asChild variant="outline" size="sm">
            <Link href="/admin/portfolio">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Quay lại
            </Link>
          </Button>
        </div>
      </div>

      <div className="container px-4 py-8">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>Thông tin dự án</CardTitle>
            <CardDescription>Cập nhật thông tin dự án</CardDescription>
          </CardHeader>
          <CardContent>
            {error && !isLoading && (
              <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md mb-6">
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <Label htmlFor="title">Tiêu đề *</Label>
                <Input
                  id="title"
                  {...register("title")}
                  placeholder="Tên dự án"
                />
                {errors.title && (
                  <p className="text-sm text-destructive mt-1">{errors.title.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="description">Mô tả *</Label>
                <Textarea
                  id="description"
                  {...register("description")}
                  placeholder="Mô tả về dự án..."
                  rows={4}
                />
                {errors.description && (
                  <p className="text-sm text-destructive mt-1">{errors.description.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="image">URL ảnh đại diện *</Label>
                <Input
                  id="image"
                  {...register("image")}
                  placeholder="https://example.com/image.jpg"
                />
                {errors.image && (
                  <p className="text-sm text-destructive mt-1">{errors.image.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="demoUrl">URL Demo (tùy chọn)</Label>
                <Input
                  id="demoUrl"
                  {...register("demoUrl")}
                  placeholder="https://demo.example.com"
                />
                {errors.demoUrl && (
                  <p className="text-sm text-destructive mt-1">{errors.demoUrl.message}</p>
                )}
              </div>

              <div>
                <Label>Công nghệ sử dụng *</Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    value={techInput}
                    onChange={(e) => setTechInput(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        addTech()
                      }
                    }}
                    placeholder="Nhập công nghệ và nhấn Enter"
                  />
                  <Button type="button" onClick={addTech} variant="outline">
                    Thêm
                  </Button>
                </div>
                {tech.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {tech.map((t, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary/10 text-primary"
                      >
                        {t}
                        <button
                          type="button"
                          onClick={() => removeTech(index)}
                          className="ml-2 hover:text-destructive"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
                {errors.tech && (
                  <p className="text-sm text-destructive mt-1">{errors.tech.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="order">Thứ tự hiển thị</Label>
                <Input
                  id="order"
                  type="number"
                  {...register("order", { valueAsNumber: true })}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Số nhỏ hơn sẽ hiển thị trước
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="featured"
                  {...register("featured")}
                  className="h-4 w-4 rounded border-gray-300"
                />
                <Label htmlFor="featured" className="cursor-pointer">
                  Đánh dấu là dự án nổi bật
                </Label>
              </div>

              <div className="flex items-center space-x-4">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Đang cập nhật...
                    </>
                  ) : (
                    "Cập nhật dự án"
                  )}
                </Button>
                <Button type="button" variant="outline" asChild>
                  <Link href="/admin/portfolio">Hủy</Link>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

