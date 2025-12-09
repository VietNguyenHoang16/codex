import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"
import { Metadata } from "next"
import { prisma } from "@/lib/prisma"
import { PortfolioImage } from "@/components/admin/portfolio-image"

export const metadata: Metadata = {
  title: "Portfolio - CodeX Studio",
  description: "Các dự án website chuyên nghiệp chúng tôi đã hoàn thành",
}

async function getPortfolios() {
  try {
    const portfolios = await prisma.portfolio.findMany({
      orderBy: [
        { featured: "desc" },
        { order: "asc" },
        { createdAt: "desc" },
      ],
    })
    return portfolios
  } catch (error) {
    console.error("Error fetching portfolios:", error)
    return []
  }
}

export default async function PortfolioPage() {
  const portfolios = await getPortfolios()
  return (
    <div className="min-h-screen">
      <section className="py-20 md:py-32 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Portfolio
            </h1>
            <p className="text-xl text-muted-foreground mb-4">
              Các dự án website chuyên nghiệp, tốc độ cao chúng tôi đã hoàn thành
            </p>
            <p className="text-muted-foreground">
              Mỗi dự án đều được thiết kế và phát triển với sự chăm chút tỉ mỉ, 
              đảm bảo chất lượng và hiệu quả tối đa
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container px-4">
          {portfolios.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center">
                <p className="text-muted-foreground">Chưa có dự án nào được hiển thị</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {portfolios.map((item) => (
                <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
                  <div className="relative h-64 w-full bg-muted">
                    <PortfolioImage
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl">{item.title}</CardTitle>
                    <CardDescription className="text-base">
                      {item.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col justify-between">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {item.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 text-xs bg-primary/10 text-primary rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    {item.demoUrl ? (
                      <Button asChild variant="outline" className="w-full">
                        <Link href={item.demoUrl} target="_blank" rel="noopener noreferrer">
                          Xem demo
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    ) : (
                      <Button variant="outline" className="w-full" disabled>
                        Chưa có demo
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

