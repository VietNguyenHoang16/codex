"use client"

import { motion } from "framer-motion"
import { MessageSquare, Palette, Code, Rocket, Settings } from "lucide-react"

const steps = [
  {
    icon: MessageSquare,
    title: "Tư vấn",
    description: "Lắng nghe nhu cầu, tư vấn giải pháp phù hợp với doanh nghiệp của bạn",
    step: "01",
  },
  {
    icon: Palette,
    title: "Thiết kế UI",
    description: "Thiết kế giao diện đẹp mắt, chuyên nghiệp theo đúng yêu cầu và thương hiệu",
    step: "02",
  },
  {
    icon: Code,
    title: "Lập trình",
    description: "Phát triển website với công nghệ hiện đại, tối ưu hiệu suất và bảo mật",
    step: "03",
  },
  {
    icon: Rocket,
    title: "Bàn giao + Chạy thực tế",
    description: "Bàn giao website hoàn chỉnh, hỗ trợ triển khai và chạy thực tế",
    step: "04",
  },
  {
    icon: Settings,
    title: "Bảo trì",
    description: "Bảo trì, cập nhật và hỗ trợ kỹ thuật lâu dài cho website",
    step: "05",
  },
]

export function ProcessSection() {
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
            Quy trình làm việc
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Quy trình chuyên nghiệp, minh bạch từ đầu đến cuối
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <div className="relative">
            {/* Connection Line */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-primary/20 transform -translate-y-1/2" />
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative">
              {steps.map((step, index) => {
                const Icon = step.icon
                return (
                  <motion.div
                    key={step.step}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="relative"
                  >
                    <div className="text-center">
                      <div className="relative inline-block mb-4">
                        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto relative z-10">
                          <Icon className="h-10 w-10 text-primary" />
                        </div>
                        <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                          {step.step}
                        </div>
                      </div>
                      <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

