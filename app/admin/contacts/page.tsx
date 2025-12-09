import { redirect } from "next/navigation"
import { getSession } from "@/lib/simple-auth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { Mail, Phone, MessageCircle, CheckCircle, Circle } from "lucide-react"
import { formatDate } from "@/lib/utils"

export default async function AdminContactsPage() {
  const session = await getSession()
  
  if (!session) {
    redirect("/admin/login")
  }

  const contacts = await prisma.contact.findMany({
    orderBy: { createdAt: "desc" },
  })

  const unreadCount = contacts.filter(c => !c.read).length

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b">
        <div className="container px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Quản lý Liên hệ</h1>
            <p className="text-sm text-muted-foreground">
              {unreadCount > 0 && (
                <span className="text-primary font-semibold">
                  {unreadCount} tin nhắn chưa đọc
                </span>
              )}
              {unreadCount === 0 && "Tất cả tin nhắn đã được đọc"}
            </p>
          </div>
          <Button asChild variant="outline" size="sm">
            <Link href="/admin">Về Dashboard</Link>
          </Button>
        </div>
      </div>

      <div className="container px-4 py-8">
        {contacts.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-muted-foreground">Chưa có yêu cầu liên hệ nào</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {contacts.map((contact) => (
              <Card key={contact.id} className={!contact.read ? "border-primary" : ""}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <CardTitle className="text-lg">{contact.name}</CardTitle>
                        {!contact.read && (
                          <span className="px-2 py-1 text-xs bg-primary text-primary-foreground rounded">
                            Mới
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 mr-1" />
                          {contact.email}
                        </div>
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 mr-1" />
                          {contact.phone}
                        </div>
                        {contact.zalo && (
                          <div className="flex items-center">
                            <MessageCircle className="h-4 w-4 mr-1" />
                            Zalo: {contact.zalo}
                          </div>
                        )}
                      </div>
                      <CardDescription className="mt-2">
                        Dịch vụ: {contact.service} • {formatDate(contact.createdAt)}
                      </CardDescription>
                    </div>
                    <div className="flex items-center space-x-2">
                      {!contact.read && (
                        <Button variant="outline" size="sm">
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </CardHeader>
                {contact.message && (
                  <CardContent>
                    <p className="text-sm whitespace-pre-wrap">{contact.message}</p>
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

