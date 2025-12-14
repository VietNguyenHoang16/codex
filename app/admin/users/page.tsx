import { redirect } from "next/navigation"
import { getSession } from "@/lib/simple-auth"
import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, User, Mail, Phone, Calendar } from "lucide-react"
import { formatDate } from "@/lib/utils"

export default async function AdminUsersPage() {
  const session = await getSession()

  if (!session || session.role !== "ADMIN") {
    redirect("/admin/login")
  }

  // Fetch all users
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      role: true,
      createdAt: true,
      emailVerified: true,
    },
  })

  const userCount = users.length
  const adminCount = users.filter((u) => u.role === "ADMIN").length
  const regularUserCount = users.filter((u) => u.role === "USER").length

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b">
        <div className="container px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button asChild variant="ghost" size="sm">
              <Link href="/admin">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Về Dashboard
              </Link>
            </Button>
            <h1 className="text-2xl font-bold">Quản lý Tài khoản</h1>
          </div>
        </div>
      </div>

      <div className="container px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Tổng số tài khoản
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{userCount}</div>
              <p className="text-xs text-muted-foreground mt-1">Tất cả người dùng</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Khách hàng
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{regularUserCount}</div>
              <p className="text-xs text-muted-foreground mt-1">Tài khoản USER</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Admin
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{adminCount}</div>
              <p className="text-xs text-muted-foreground mt-1">Tài khoản ADMIN</p>
            </CardContent>
          </Card>
        </div>

        {/* Users List */}
        <Card>
          <CardHeader>
            <CardTitle>Danh sách tài khoản</CardTitle>
            <CardDescription>
              Quản lý tất cả tài khoản người dùng trong hệ thống
            </CardDescription>
          </CardHeader>
          <CardContent>
            {users.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                Chưa có tài khoản nào
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4 font-medium">Họ tên</th>
                      <th className="text-left p-4 font-medium">Email</th>
                      <th className="text-left p-4 font-medium">Số điện thoại</th>
                      <th className="text-left p-4 font-medium">Vai trò</th>
                      <th className="text-left p-4 font-medium">Ngày tạo</th>
                      <th className="text-left p-4 font-medium">Trạng thái</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id} className="border-b hover:bg-muted/50">
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">
                              {user.name || "Chưa cập nhật"}
                            </span>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            <span>{user.email}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <span>{user.phone || "Chưa cập nhật"}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              user.role === "ADMIN"
                                ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                                : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                            }`}
                          >
                            {user.role === "ADMIN" ? "Admin" : "Khách hàng"}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">
                              {formatDate(user.createdAt)}
                            </span>
                          </div>
                        </td>
                        <td className="p-4">
                          {user.emailVerified ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                              Đã xác thực
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200">
                              Chưa xác thực
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
















