import { redirect } from "next/navigation"
import { getSession } from "@/lib/simple-auth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { FileText, MessageSquare, Receipt, FolderKanban, User } from "lucide-react"

export default async function DashboardPage() {
  const session = await getSession()

  if (!session) {
    redirect("/login?redirect=/dashboard")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Chào mừng, {session.email || "Người dùng"}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Thông tin cá nhân
            </CardTitle>
            <CardDescription>
              Cập nhật thông tin tài khoản
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline" className="mt-4 w-full">
              <Link href="/dashboard/profile">Cập nhật thông tin</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FolderKanban className="h-5 w-5" />
              Dự án của tôi
            </CardTitle>
            <CardDescription>
              Theo dõi tiến độ dự án
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">0</p>
            <Button asChild variant="outline" className="mt-4 w-full">
              <Link href="/dashboard/projects">Xem dự án</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Hợp đồng / Báo giá
            </CardTitle>
            <CardDescription>
              Xem hợp đồng và báo giá
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">0</p>
            <Button asChild variant="outline" className="mt-4 w-full">
              <Link href="/dashboard/contracts">Xem hợp đồng</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Yêu cầu hỗ trợ
            </CardTitle>
            <CardDescription>
              Gửi và theo dõi ticket hỗ trợ
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">0</p>
            <Button asChild variant="outline" className="mt-4 w-full">
              <Link href="/dashboard/support">Xem ticket</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Receipt className="h-5 w-5" />
              Hóa đơn
            </CardTitle>
            <CardDescription>
              Quản lý hóa đơn
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">0</p>
            <Button asChild variant="outline" className="mt-4 w-full">
              <Link href="/dashboard/invoices">Xem hóa đơn</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}







