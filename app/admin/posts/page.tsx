import { redirect } from "next/navigation"
import { getSession } from "@/lib/simple-auth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { Plus, Edit, Trash2, Eye, EyeOff } from "lucide-react"
import { formatDate } from "@/lib/utils"

export default async function AdminPostsPage() {
  const session = await getSession()
  
  if (!session) {
    redirect("/admin/login")
  }

  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b">
        <div className="container px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Quản lý Blog</h1>
            <p className="text-sm text-muted-foreground">Quản lý các bài viết blog</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button asChild>
              <Link href="/admin/posts/new">
                <Plus className="mr-2 h-4 w-4" />
                Tạo bài viết mới
              </Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link href="/admin">Về Dashboard</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="container px-4 py-8">
        {posts.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-muted-foreground mb-4">Chưa có bài viết nào</p>
              <Button asChild>
                <Link href="/admin/posts/new">
                  <Plus className="mr-2 h-4 w-4" />
                  Tạo bài viết đầu tiên
                </Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <Card key={post.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <CardTitle className="text-xl">{post.title}</CardTitle>
                        {post.published ? (
                          <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded flex items-center">
                            <Eye className="h-3 w-3 mr-1" />
                            Đã xuất bản
                          </span>
                        ) : (
                          <span className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded flex items-center">
                            <EyeOff className="h-3 w-3 mr-1" />
                            Nháp
                          </span>
                        )}
                      </div>
                      <CardDescription>
                        Slug: {post.slug} • {formatDate(post.createdAt)}
                      </CardDescription>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button asChild variant="outline" size="sm">
                        <Link href={`/admin/posts/${post.id}/edit`}>
                          <Edit className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button variant="outline" size="sm" className="text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                {post.excerpt && (
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {post.excerpt}
                    </p>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

