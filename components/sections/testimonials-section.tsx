"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"
import Image from "next/image"

const testimonials = [
  {
    id: "1",
    name: "Nguyễn Văn A",
    avatar: "https://placehold.co/64x64/6366F1/FFFFFF?text=U",
    content: "CodeX Studio đã giúp chúng tôi tạo ra một website chuyên nghiệp, tốc độ nhanh và hiệu quả. Doanh thu tăng đáng kể sau khi website đi vào hoạt động.",
    rating: 5,
  },
  {
    id: "2",
    name: "Trần Thị B",
    avatar: "https://placehold.co/64x64/6366F1/FFFFFF?text=U",
    content: "Dịch vụ hỗ trợ rất tốt, team rất nhiệt tình. Website được thiết kế đẹp, đúng như mong muốn. Tôi rất hài lòng với dịch vụ của CodeX.",
    rating: 5,
  },
  {
    id: "3",
    name: "Lê Văn C",
    avatar: "https://placehold.co/64x64/6366F1/FFFFFF?text=U",
    content: "Website load cực nhanh, giao diện đẹp và dễ sử dụng. Khách hàng phản hồi rất tích cực. Cảm ơn CodeX Studio!",
    rating: 5,
  },
  {
    id: "4",
    name: "Phạm Thị D",
    avatar: "https://placehold.co/64x64/6366F1/FFFFFF?text=U",
    content: "Từ khi có website mới, lượng khách hàng tìm đến chúng tôi tăng gấp đôi. CodeX đã giúp chúng tôi phát triển mạnh mẽ hơn.",
    rating: 5,
  },
]

export function TestimonialsSection() {
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
            Feedback khách hàng
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Những đánh giá chân thực từ khách hàng đã sử dụng dịch vụ của chúng tôi
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 italic">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                      <Image
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">Khách hàng</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

