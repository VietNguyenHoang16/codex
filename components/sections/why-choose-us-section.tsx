"use client"

import { motion } from "framer-motion"
import { Palette, Zap, Shield, Headphones, DollarSign } from "lucide-react"

const features = [
  {
    icon: Palette,
    title: "Giao diện đẹp",
    description: "Thiết kế hiện đại, chuyên nghiệp, tạo ấn tượng mạnh với khách hàng",
  },
  {
    icon: Zap,
    title: "Load < 1 giây",
    description: "Tối ưu hóa tốc độ tải trang, đảm bảo trải nghiệm người dùng mượt mà",
  },
  {
    icon: Shield,
    title: "Bảo mật cao",
    description: "Bảo vệ website và dữ liệu khách hàng với các biện pháp bảo mật tiên tiến",
  },
  {
    icon: Headphones,
    title: "Support 24/7",
    description: "Hỗ trợ khách hàng 24/7, giải đáp mọi thắc mắc và xử lý sự cố nhanh chóng",
  },
  {
    icon: DollarSign,
    title: "Giá hợp lý",
    description: "Giá cả cạnh tranh, phù hợp với mọi quy mô doanh nghiệp",
  },
]

export function WhyChooseUsSection() {
  return (
    <section className="py-20 md:py-32 bg-muted/50">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Vì sao chọn chúng tôi
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Những lý do khiến CodeX Studio trở thành đối tác tin cậy của hàng trăm doanh nghiệp
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

