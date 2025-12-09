"use client"

import { motion } from "framer-motion"
import { Globe, Server, TrendingUp, Zap, Wrench, Code } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const services = [
  {
    icon: Globe,
    title: "Thiết kế website",
    description: "Thiết kế website chuyên nghiệp, responsive, chuẩn SEO với giao diện đẹp mắt và trải nghiệm người dùng tối ưu.",
  },
  {
    icon: Server,
    title: "Hosting – VPS",
    description: "Dịch vụ hosting và VPS chất lượng cao, tốc độ nhanh, bảo mật tốt với hỗ trợ 24/7.",
  },
  {
    icon: TrendingUp,
    title: "Nâng cấp website",
    description: "Nâng cấp website hiện tại với các tính năng mới, cải thiện hiệu suất và trải nghiệm người dùng.",
  },
  {
    icon: Zap,
    title: "Tối ưu tốc độ",
    description: "Tối ưu hóa tốc độ tải trang, giảm thời gian load xuống dưới 1 giây để tăng trải nghiệm người dùng.",
  },
  {
    icon: Wrench,
    title: "Sửa lỗi web",
    description: "Sửa chữa và khắc phục các lỗi kỹ thuật, bảo trì website định kỳ để đảm bảo hoạt động ổn định.",
  },
  {
    icon: Code,
    title: "Lập trình hệ thống",
    description: "Phát triển các hệ thống web phức tạp, ứng dụng quản lý và giải pháp công nghệ tùy chỉnh.",
  },
]

export function ServicesSection() {
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
            Dịch vụ chính
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Các dịch vụ chuyên nghiệp giúp doanh nghiệp của bạn phát triển mạnh mẽ trên nền tảng số
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {service.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

