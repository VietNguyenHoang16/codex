import { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, ArrowRight } from "lucide-react"
import Link from "next/link"
import { ContactFormSection } from "@/components/sections/contact-form-section"

export const metadata: Metadata = {
  title: "Thiết kế Website - CodeX Studio",
  description: "Dịch vụ thiết kế website chuyên nghiệp, chuẩn SEO, responsive",
}

const features = [
  "Thiết kế UI/UX chuyên nghiệp, hiện đại",
  "Responsive trên mọi thiết bị (Mobile, Tablet, Desktop)",
  "Chuẩn SEO từ đầu, tối ưu cho Google",
  "Tốc độ tải nhanh (< 1 giây)",
  "CMS quản trị dễ dàng, không cần biết code",
  "Tích hợp thanh toán online",
  "Form liên hệ, đặt hàng",
  "Tích hợp mạng xã hội",
  "Bảo mật cao, SSL miễn phí",
  "Hỗ trợ và bảo hành lâu dài",
]

const process = [
  {
    step: "1",
    title: "Tư vấn & Phân tích",
    description: "Lắng nghe nhu cầu, phân tích thị trường và đối thủ để đưa ra giải pháp phù hợp",
  },
  {
    step: "2",
    title: "Thiết kế UI/UX",
    description: "Thiết kế giao diện đẹp mắt, chuyên nghiệp theo đúng thương hiệu của bạn",
  },
  {
    step: "3",
    title: "Phát triển",
    description: "Lập trình website với công nghệ hiện đại, tối ưu hiệu suất và bảo mật",
  },
  {
    step: "4",
    title: "Test & Tối ưu",
    description: "Kiểm thử kỹ lưỡng, tối ưu tốc độ và SEO trước khi bàn giao",
  },
  {
    step: "5",
    title: "Bàn giao & Hỗ trợ",
    description: "Bàn giao website hoàn chỉnh, hướng dẫn sử dụng và hỗ trợ kỹ thuật",
  },
]

const faqs = [
  {
    question: "Thời gian hoàn thành một website là bao lâu?",
    answer: "Thời gian hoàn thành phụ thuộc vào quy mô và độ phức tạp của website. Thông thường từ 2-6 tuần.",
  },
  {
    question: "Website có responsive không?",
    answer: "Có, tất cả website chúng tôi thiết kế đều responsive, hiển thị tốt trên mọi thiết bị.",
  },
  {
    question: "Có hỗ trợ SEO không?",
    answer: "Có, website được tối ưu SEO từ đầu, giúp dễ dàng lên top Google.",
  },
  {
    question: "Sau khi bàn giao, tôi có thể tự chỉnh sửa không?",
    answer: "Có, chúng tôi sẽ hướng dẫn bạn sử dụng CMS để tự quản lý nội dung. Nếu cần chỉnh sửa code, chúng tôi sẽ hỗ trợ.",
  },
]

export default function WebsiteDesignPage() {
  return (
    <div className="min-h-screen">
      <section className="py-20 md:py-32 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Thiết kế Website
            </h1>
            <p className="text-xl text-muted-foreground">
              Thiết kế website chuyên nghiệp, chuẩn SEO, tốc độ cao
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto space-y-16">
            {/* Mô tả */}
            <div>
              <h2 className="text-3xl font-bold mb-4">Mô tả dịch vụ</h2>
              <p className="text-lg text-muted-foreground mb-4">
                Chúng tôi chuyên thiết kế và phát triển website chuyên nghiệp, hiện đại với 
                giao diện đẹp mắt và trải nghiệm người dùng tối ưu. Website của bạn sẽ được 
                tối ưu hóa cho SEO, tốc độ tải nhanh và hoạt động mượt mà trên mọi thiết bị.
              </p>
              <p className="text-lg text-muted-foreground">
                Với nhiều năm kinh nghiệm, chúng tôi đã giúp hàng trăm doanh nghiệp tăng trưởng 
                doanh thu thông qua website chuyên nghiệp.
              </p>
            </div>

            {/* Tính năng */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Tính năng</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {features.map((feature) => (
                  <div key={feature} className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quy trình */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Quy trình làm việc</h2>
              <div className="space-y-4">
                {process.map((item) => (
                  <Card key={item.step}>
                    <CardHeader>
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                          {item.step}
                        </div>
                        <CardTitle>{item.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{item.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Bảng giá */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Bảng giá</h2>
              <p className="text-muted-foreground mb-4">
                Giá thiết kế website phụ thuộc vào quy mô và yêu cầu cụ thể. 
                Liên hệ để nhận báo giá chính xác.
              </p>
              <Button asChild>
                <Link href="/pricing">
                  Xem bảng giá chi tiết
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            {/* FAQ */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Câu hỏi thường gặp</h2>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="text-lg">{faq.question}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Form đặt dịch vụ */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Đặt dịch vụ ngay</h2>
              <ContactFormSection />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

