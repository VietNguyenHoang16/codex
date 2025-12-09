import { Card, CardContent } from "@/components/ui/card"
import { Metadata } from "next"
import { CheckCircle, Award, Users, Clock } from "lucide-react"

export const metadata: Metadata = {
  title: "Giới thiệu - CodeX Studio",
  description: "Về CodeX Studio - Đội ngũ chuyên nghiệp thiết kế website chuẩn SEO",
}

const stats = [
  { icon: Award, label: "Dự án đã hoàn thành", value: "100+" },
  { icon: Users, label: "Khách hàng hài lòng", value: "95%" },
  { icon: Clock, label: "Kinh nghiệm", value: "5+ năm" },
  { icon: CheckCircle, label: "Tỷ lệ hoàn thành đúng hạn", value: "98%" },
]

const values = [
  {
    title: "Chuyên nghiệp",
    description: "Đội ngũ có nhiều năm kinh nghiệm trong lĩnh vực thiết kế và phát triển website, luôn cập nhật công nghệ mới nhất.",
  },
  {
    title: "Chất lượng",
    description: "Mỗi dự án đều được chăm chút tỉ mỉ, đảm bảo chất lượng cao nhất, từ thiết kế đến code và hiệu suất.",
  },
  {
    title: "Tốc độ",
    description: "Website được tối ưu hóa để load nhanh, đảm bảo trải nghiệm người dùng mượt mà và hiệu quả.",
  },
  {
    title: "Hỗ trợ",
    description: "Hỗ trợ khách hàng 24/7, luôn sẵn sàng giải đáp thắc mắc và xử lý mọi vấn đề kỹ thuật.",
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <section className="py-20 md:py-32 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Về chúng tôi
            </h1>
            <p className="text-xl text-muted-foreground">
              CodeX Studio - Đối tác tin cậy cho sự phát triển số của doanh nghiệp bạn
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <h2>Bạn là ai?</h2>
              <p>
                CodeX Studio là đội ngũ chuyên nghiệp chuyên thiết kế và phát triển website 
                chuẩn SEO, hiện đại và hiệu quả. Chúng tôi tập trung vào việc tạo ra những 
                website không chỉ đẹp mắt mà còn mang lại giá trị thực sự cho doanh nghiệp.
              </p>

              <h2>Tại sao giỏi?</h2>
              <p>
                Với nhiều năm kinh nghiệm trong ngành, chúng tôi đã hoàn thành hàng trăm dự án 
                website cho các doanh nghiệp từ nhỏ đến lớn. Đội ngũ của chúng tôi luôn cập nhật 
                các công nghệ mới nhất, đảm bảo mỗi website đều được xây dựng với tiêu chuẩn cao nhất.
              </p>

              <h2>Kinh nghiệm</h2>
              <p>
                Chúng tôi có kinh nghiệm sâu rộng trong việc phát triển các loại website khác nhau:
              </p>
              <ul>
                <li>Website thương mại điện tử (E-commerce)</li>
                <li>Website doanh nghiệp (Corporate)</li>
                <li>Website bất động sản</li>
                <li>Website giáo dục</li>
                <li>Website y tế</li>
                <li>Website du lịch</li>
                <li>Hệ thống quản lý tùy chỉnh</li>
              </ul>

              <h2>Thời gian làm việc</h2>
              <p>
                Chúng tôi làm việc từ Thứ 2 đến Thứ 6, từ 9:00 đến 18:00. Tuy nhiên, với các 
                dự án khẩn cấp hoặc khách hàng VIP, chúng tôi sẵn sàng hỗ trợ ngoài giờ và cuối tuần.
              </p>

              <h2>Giá trị mang lại</h2>
              <p>
                Chúng tôi không chỉ tạo ra website, mà còn mang lại:
              </p>
              <ul>
                <li><strong>Tăng trưởng doanh thu:</strong> Website chuẩn SEO giúp tăng lượng khách hàng tiềm năng</li>
                <li><strong>Uy tín thương hiệu:</strong> Website chuyên nghiệp tạo ấn tượng tốt với khách hàng</li>
                <li><strong>Tiết kiệm thời gian:</strong> Tự động hóa các quy trình, giảm công việc thủ công</li>
                <li><strong>Mở rộng thị trường:</strong> Vươn ra thị trường rộng lớn hơn qua internet</li>
                <li><strong>Hỗ trợ lâu dài:</strong> Đồng hành cùng doanh nghiệp trong quá trình phát triển</li>
              </ul>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat) => {
                const Icon = stat.icon
                return (
                  <Card key={stat.label}>
                    <CardContent className="pt-6 text-center">
                      <Icon className="h-8 w-8 text-primary mx-auto mb-2" />
                      <div className="text-3xl font-bold mb-1">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* Values */}
            <div>
              <h2 className="text-3xl font-bold mb-8 text-center">Giá trị cốt lõi</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {values.map((value) => (
                  <Card key={value.title}>
                    <CardContent className="pt-6">
                      <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                      <p className="text-muted-foreground">{value.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

