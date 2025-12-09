import { redirect } from "next/navigation"
import { getSession } from "@/lib/simple-auth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FileText, Briefcase, MessageSquare, Users, ArrowRight } from "lucide-react"

async function getStats() {
  try {
    const [posts, portfolios, contacts, testimonials] = await Promise.all([
      prisma.post.count(),
      prisma.portfolio.count(),
      prisma.contact.count({ where: { read: false } }),
      prisma.testimonial.count(),
    ])

    return { posts, portfolios, contacts, testimonials }
  } catch (error) {
    console.error("Error fetching stats:", error)
    return { posts: 0, portfolios: 0, contacts: 0, testimonials: 0 }
  }
}

export default async function AdminDashboard() {
  const session = await getSession()
  
  if (!session) {
    redirect("/admin/login")
  }

  const stats = await getStats()

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b">
        <div className="container px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-muted-foreground">{session.user?.email}</span>
            <Button asChild variant="outline" size="sm">
              <Link href="/">Về trang chủ</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="container px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Bài viết
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.posts}</div>
              <p className="text-xs text-muted-foreground mt-1">Tổng số bài viết</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Portfolio
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.portfolios}</div>
              <p className="text-xs text-muted-foreground mt-1">Dự án đã làm</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Liên hệ mới
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.contacts}</div>
              <p className="text-xs text-muted-foreground mt-1">Chưa đọc</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Testimonials
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.testimonials}</div>
              <p className="text-xs text-muted-foreground mt-1">Đánh giá</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Quản lý Tài khoản</CardTitle>
              <CardDescription>Xem và quản lý tài khoản người dùng</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" className="w-full">
                <Link href="/admin/users">
                  <Users className="mr-2 h-4 w-4" />
                  Quản lý tài khoản
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quản lý Blog</CardTitle>
              <CardDescription>Quản lý các bài viết blog</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" className="w-full">
                <Link href="/admin/posts">
                  <FileText className="mr-2 h-4 w-4" />
                  Quản lý bài viết
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quản lý Portfolio</CardTitle>
              <CardDescription>Quản lý các dự án đã làm</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" className="w-full">
                <Link href="/admin/portfolio">
                  <Briefcase className="mr-2 h-4 w-4" />
                  Quản lý portfolio
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quản lý Liên hệ</CardTitle>
              <CardDescription>Xem và quản lý yêu cầu liên hệ</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" className="w-full">
                <Link href="/admin/contacts">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Quản lý liên hệ
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

