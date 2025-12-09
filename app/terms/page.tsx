import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Điều khoản sử dụng - CodeX Studio",
  description: "Điều khoản sử dụng dịch vụ của CodeX Studio",
}

export default function TermsPage() {
  return (
    <div className="min-h-screen">
      <section className="py-20 md:py-32 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Điều khoản sử dụng
            </h1>
            <p className="text-muted-foreground">
              Cập nhật lần cuối: {new Date().toLocaleDateString("vi-VN")}
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert">
            <h2>1. Chấp nhận điều khoản</h2>
            <p>
              Bằng việc sử dụng dịch vụ của CodeX Studio, bạn đồng ý tuân thủ và bị ràng buộc bởi 
              các điều khoản và điều kiện được nêu trong tài liệu này.
            </p>

            <h2>2. Dịch vụ</h2>
            <p>
              CodeX Studio cung cấp các dịch vụ thiết kế website, hosting, VPS, nâng cấp website 
              và các dịch vụ liên quan. Chúng tôi cam kết cung cấp dịch vụ chất lượng cao và 
              chuyên nghiệp.
            </p>

            <h2>3. Quyền và trách nhiệm</h2>
            <h3>3.1. Quyền của khách hàng</h3>
            <ul>
              <li>Nhận dịch vụ đúng như đã thỏa thuận</li>
              <li>Được hỗ trợ kỹ thuật trong thời gian bảo hành</li>
              <li>Yêu cầu sửa đổi, bổ sung theo thỏa thuận</li>
            </ul>

            <h3>3.2. Trách nhiệm của khách hàng</h3>
            <ul>
              <li>Cung cấp thông tin chính xác và đầy đủ</li>
              <li>Thanh toán đúng hạn theo thỏa thuận</li>
              <li>Không sử dụng dịch vụ cho mục đích bất hợp pháp</li>
            </ul>

            <h2>4. Thanh toán</h2>
            <p>
              Khách hàng có thể thanh toán qua chuyển khoản ngân hàng, ví điện tử hoặc các 
              phương thức khác được thỏa thuận. Thanh toán có thể được chia thành nhiều đợt 
              tùy theo quy mô dự án.
            </p>

            <h2>5. Bảo hành và hỗ trợ</h2>
            <p>
              CodeX Studio cung cấp bảo hành và hỗ trợ kỹ thuật theo từng gói dịch vụ. 
              Thời gian bảo hành được quy định cụ thể trong hợp đồng dịch vụ.
            </p>

            <h2>6. Sở hữu trí tuệ</h2>
            <p>
              Sau khi thanh toán đầy đủ, khách hàng sở hữu mã nguồn và thiết kế website. 
              Tuy nhiên, CodeX Studio giữ quyền sử dụng website như một mẫu portfolio 
              (trừ khi có thỏa thuận khác).
            </p>

            <h2>7. Bảo mật thông tin</h2>
            <p>
              CodeX Studio cam kết bảo mật thông tin khách hàng theo chính sách bảo mật. 
              Chúng tôi không chia sẻ thông tin cho bên thứ ba mà không có sự đồng ý của khách hàng.
            </p>

            <h2>8. Giới hạn trách nhiệm</h2>
            <p>
              CodeX Studio không chịu trách nhiệm cho bất kỳ thiệt hại gián tiếp nào phát sinh 
              từ việc sử dụng dịch vụ, trừ khi do lỗi kỹ thuật từ phía chúng tôi.
            </p>

            <h2>9. Thay đổi điều khoản</h2>
            <p>
              CodeX Studio có quyền thay đổi điều khoản này bất cứ lúc nào. Các thay đổi sẽ có 
              hiệu lực sau khi được công bố trên website.
            </p>

            <h2>10. Liên hệ</h2>
            <p>
              Nếu bạn có bất kỳ câu hỏi nào về điều khoản này, vui lòng liên hệ với chúng tôi 
              qua email: contact@codex.studio hoặc số điện thoại: +84 123 456 789.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

