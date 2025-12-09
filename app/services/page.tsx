import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Globe, Server, TrendingUp, Zap, Wrench, Code, ArrowRight } from "lucide-react"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Dịch vụ - CodeX Studio",
  description: "Các dịch vụ thiết kế website, hosting, VPS, nâng cấp website chuyên nghiệp",
}

const services = [
  {
    icon: Globe,
    title: "Thiết kế website",
    slug: "website-design",
    description: "Thiết kế website chuyên nghiệp, responsive, chuẩn SEO với giao diện đẹp mắt và trải nghiệm người dùng tối ưu.",
    features: [
      "Thiết kế UI/UX chuyên nghiệp",
      "Responsive trên mọi thiết bị",
      "Chuẩn SEO từ đầu",
      "Tốc độ tải nhanh",
      "CMS quản trị dễ dàng",
    ],
  },
  {
    icon: Server,
    title: "Hosting – VPS",
    slug: "hosting-vps",
    description: "Dịch vụ hosting và VPS chất lượng cao, tốc độ nhanh, bảo mật tốt với hỗ trợ 24/7.",
    features: [
      "Hosting tốc độ cao",
      "VPS mạnh mẽ",
      "Bảo mật SSL miễn phí",
      "Backup tự động",
      "Hỗ trợ 24/7",
    ],
  },
  {
    icon: TrendingUp,
    title: "Nâng cấp website",
    slug: "website-upgrade",
    description: "Nâng cấp website hiện tại với các tính năng mới, cải thiện hiệu suất và trải nghiệm người dùng.",
    features: [
      "Thêm tính năng mới",
      "Cải thiện hiệu suất",
      "Nâng cấp giao diện",
      "Tối ưu SEO",
      "Bảo trì định kỳ",
    ],
  },
  {
    icon: Zap,
    title: "Tối ưu tốc độ",
    slug: "speed-optimization",
    description: "Tối ưu hóa tốc độ tải trang, giảm thời gian load xuống dưới 1 giây để tăng trải nghiệm người dùng.",
    features: [
      "Tối ưu hình ảnh",
      "Minify CSS/JS",
      "CDN tích hợp",
      "Caching thông minh",
      "Load < 1 giây",
    ],
  },
  {
    icon: Wrench,
    title: "Sửa lỗi web",
    slug: "bug-fix",
    description: "Sửa chữa và khắc phục các lỗi kỹ thuật, bảo trì website định kỳ để đảm bảo hoạt động ổn định.",
    features: [
      "Sửa lỗi nhanh chóng",
      "Bảo trì định kỳ",
      "Cập nhật bảo mật",
      "Tối ưu hiệu suất",
      "Hỗ trợ kỹ thuật",
    ],
  },
  {
    icon: Code,
    title: "Lập trình hệ thống",
    slug: "system-development",
    description: "Phát triển các hệ thống web phức tạp, ứng dụng quản lý và giải pháp công nghệ tùy chỉnh.",
    features: [
      "Hệ thống tùy chỉnh",
      "API integration",
      "Database design",
      "Bảo mật cao",
      "Scalable architecture",
    ],
  },
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      <section className="py-20 md:py-32 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Dịch vụ của chúng tôi
            </h1>
            <p className="text-xl text-muted-foreground">
              Các dịch vụ chuyên nghiệp giúp doanh nghiệp của bạn phát triển mạnh mẽ trên nền tảng số
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => {
              const Icon = service.icon
              return (
                <Card key={service.slug} className="h-full flex flex-col hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-2xl">{service.title}</CardTitle>
                    <CardDescription className="text-base mt-2">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <ul className="space-y-2 mb-6">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-start text-sm">
                          <span className="text-primary mr-2">✓</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button asChild className="w-full">
                      <Link href={`/services/${service.slug}`}>
                        Xem chi tiết
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}

