"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"
import { PortfolioImage } from "@/components/admin/portfolio-image"

interface PortfolioSectionProps {
  portfolios: Array<{
    id: string
    title: string
    description: string
    image: string
    demoUrl: string | null
    tech: string[]
  }>
}

export function PortfolioSection({ portfolios }: PortfolioSectionProps) {
  // Chỉ hiển thị 6 dự án đầu tiên (hoặc featured)
  const displayPortfolios = portfolios.slice(0, 6)
  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Portfolio
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Các dự án website chuyên nghiệp chúng tôi đã hoàn thành
          </p>
          <Button asChild variant="outline">
            <Link href="/portfolio">Xem tất cả dự án</Link>
          </Button>
        </motion.div>

        {displayPortfolios.length === 0 ? (
          <p className="text-center text-muted-foreground">Chưa có dự án nào</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayPortfolios.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
                  <div className="relative h-48 w-full bg-muted">
                    <PortfolioImage
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle>{item.title}</CardTitle>
                    <CardDescription>{item.description}</CardDescription>
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
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

