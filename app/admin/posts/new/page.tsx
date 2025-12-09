"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, ArrowLeft } from "lucide-react"
import Link from "next/link"

const postSchema = z.object({
  title: z.string().min(1, "Tiêu đề là bắt buộc"),
  slug: z.string().min(1, "Slug là bắt buộc").regex(/^[a-z0-9-]+$/, "Slug chỉ chứa chữ thường, số và dấu gạch ngang"),
  content: z.string().min(1, "Nội dung là bắt buộc"),
  excerpt: z.string().optional(),
  featuredImage: z.string().optional(),
  published: z.boolean().default(false),
})

type PostFormData = z.infer<typeof postSchema>

export default function NewPostPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      published: false,
    },
  })

  const title = watch("title")

  // Auto-generate slug from title
  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value
    setValue("title", newTitle)
    if (!watch("slug") || watch("slug") === generateSlug(title)) {
      setValue("slug", generateSlug(newTitle))
    }
  }

  const onSubmit = async (data: PostFormData) => {
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch("/api/admin/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (response.ok && result.success) {
        router.push("/admin/posts")
        router.refresh()
      } else {
        setError(result.error || "Có lỗi xảy ra khi tạo bài viết")
      }
    } catch (error) {
      console.error("Error creating post:", error)
      setError("Có lỗi xảy ra, vui lòng thử lại")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b">
        <div className="container px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Tạo bài viết mới</h1>
            <p className="text-sm text-muted-foreground">Thêm bài viết blog mới</p>
          </div>
          <Button asChild variant="outline" size="sm">
            <Link href="/admin/posts">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Quay lại
            </Link>
          </Button>
        </div>
      </div>

      <div className="container px-4 py-8">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>Thông tin bài viết</CardTitle>
            <CardDescription>Điền thông tin để tạo bài viết mới</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <Label htmlFor="title">Tiêu đề *</Label>
                <Input
                  id="title"
                  {...register("title")}
                  onChange={handleTitleChange}
                  placeholder="Nhập tiêu đề bài viết"
                />
                {errors.title && (
                  <p className="text-sm text-destructive mt-1">{errors.title.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="slug">Slug *</Label>
                <Input
                  id="slug"
                  {...register("slug")}
                  placeholder="url-friendly-slug"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  URL thân thiện, tự động tạo từ tiêu đề
                </p>
                {errors.slug && (
                  <p className="text-sm text-destructive mt-1">{errors.slug.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="excerpt">Mô tả ngắn</Label>
                <Textarea
                  id="excerpt"
                  {...register("excerpt")}
                  placeholder="Mô tả ngắn về bài viết (hiển thị trong danh sách)"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="featuredImage">Ảnh đại diện (URL)</Label>
                <Input
                  id="featuredImage"
                  {...register("featuredImage")}
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div>
                <Label htmlFor="content">Nội dung *</Label>
                <Textarea
                  id="content"
                  {...register("content")}
                  placeholder="Nội dung bài viết..."
                  rows={15}
                  className="font-mono text-sm"
                />
                {errors.content && (
                  <p className="text-sm text-destructive mt-1">{errors.content.message}</p>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="published"
                  {...register("published")}
                  className="h-4 w-4 rounded border-gray-300"
                />
                <Label htmlFor="published" className="cursor-pointer">
                  Xuất bản ngay (nếu không chọn, bài viết sẽ ở chế độ nháp)
                </Label>
              </div>

              {error && (
                <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md">
                  <p className="text-sm text-destructive">{error}</p>
                </div>
              )}

              <div className="flex items-center space-x-4">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Đang tạo...
                    </>
                  ) : (
                    "Tạo bài viết"
                  )}
                </Button>
                <Button type="button" variant="outline" asChild>
                  <Link href="/admin/posts">Hủy</Link>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

