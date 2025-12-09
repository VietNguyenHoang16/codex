"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

const pricingPlans = [
  {
    name: "Basic",
    price: "3-5 triệu",
    description: "Phù hợp cho doanh nghiệp nhỏ, khởi nghiệp",
    features: [
      "Web giới thiệu cơ bản",
      "5 trang nội dung",
      "Responsive design",
      "Tối ưu SEO cơ bản",
      "Hỗ trợ 3 tháng",
    ],
    popular: false,
  },
  {
    name: "Standard",
    price: "6-12 triệu",
    description: "Phù hợp cho doanh nghiệp vừa và nhỏ",
    features: [
      "Thiết kế theo yêu cầu",
      "CMS quản trị đầy đủ",
      "Chuẩn SEO nâng cao",
      "Tốc độ tối ưu",
      "Hỗ trợ 6 tháng",
      "Tích hợp thanh toán",
    ],
    popular: true,
  },
  {
    name: "Premium",
    price: "15-30 triệu",
    description: "Giải pháp toàn diện cho doanh nghiệp lớn",
    features: [
      "Tùy chỉnh hoàn toàn",
      "Tốc độ tối ưu hóa cao",
      "Bảo hành dài hạn",
      "Hỗ trợ 24/7",
      "Tích hợp đầy đủ",
      "Bảo mật nâng cao",
      "Training & Documentation",
    ],
    popular: false,
  },
]

export function PricingSection() {
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
            Bảng giá dịch vụ
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Chọn gói dịch vụ phù hợp với nhu cầu và ngân sách của bạn
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className={`h-full flex flex-col ${plan.popular ? 'border-primary shadow-lg scale-105' : ''}`}>
                {plan.popular && (
                  <div className="bg-primary text-primary-foreground text-center py-2 text-sm font-semibold">
                    Phổ biến nhất
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                  </div>
                  <CardDescription className="mt-2">{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start">
                        <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full" variant={plan.popular ? "default" : "outline"}>
                    <Link href="/contact">Liên hệ ngay</Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground mb-4">
            Cần tùy chỉnh gói dịch vụ? Chúng tôi sẵn sàng tư vấn
          </p>
          <Button asChild variant="outline">
            <Link href="/pricing">Xem chi tiết bảng giá</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

