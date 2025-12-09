import { redirect } from "next/navigation"
import { getSession } from "@/lib/simple-auth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { Plus, Edit, Trash2, Star } from "lucide-react"
import { formatDate } from "@/lib/utils"
import { PortfolioImage } from "@/components/admin/portfolio-image"
import { DeletePortfolioButton } from "@/components/admin/delete-portfolio-button"

export default async function AdminPortfolioPage() {
  const session = await getSession()
  
  if (!session) {
    redirect("/admin/login")
  }

  const portfolios = await prisma.portfolio.findMany({
    orderBy: { order: "asc" },
  })

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b">
        <div className="container px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Quản lý Portfolio</h1>
            <p className="text-sm text-muted-foreground">Quản lý các dự án đã làm</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button asChild>
              <Link href="/admin/portfolio/new">
                <Plus className="mr-2 h-4 w-4" />
                Thêm dự án mới
              </Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link href="/admin">Về Dashboard</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="container px-4 py-8">
        {portfolios.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-muted-foreground mb-4">Chưa có dự án nào</p>
              <Button asChild>
                <Link href="/admin/portfolio/new">
                  <Plus className="mr-2 h-4 w-4" />
                  Thêm dự án đầu tiên
                </Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolios.map((portfolio) => (
              <Card key={portfolio.id} className="overflow-hidden">
                <div className="relative h-48 w-full bg-muted">
                  <PortfolioImage
                    src={portfolio.image}
                    alt={portfolio.title}
                    className="w-full h-full object-cover"
                  />
                  {portfolio.featured && (
                    <div className="absolute top-2 right-2">
                      <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                    </div>
                  )}
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">{portfolio.title}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {portfolio.description}
                  </CardDescription>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {portfolio.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs bg-primary/10 text-primary rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {formatDate(portfolio.createdAt)}
                    </span>
                    <div className="flex items-center space-x-2">
                      <Button asChild variant="outline" size="sm">
                        <Link href={`/admin/portfolio/${portfolio.id}/edit`}>
                          <Edit className="h-4 w-4" />
                        </Link>
                      </Button>
                      <DeletePortfolioButton portfolioId={portfolio.id} portfolioTitle={portfolio.title} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

