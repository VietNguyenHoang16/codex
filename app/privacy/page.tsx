import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Chính sách bảo mật - CodeX Studio",
  description: "Chính sách bảo mật thông tin của CodeX Studio",
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen">
      <section className="py-20 md:py-32 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Chính sách bảo mật
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
            <h2>1. Thu thập thông tin</h2>
            <p>
              CodeX Studio thu thập thông tin cá nhân của bạn khi bạn:
            </p>
            <ul>
              <li>Điền form liên hệ trên website</li>
              <li>Đăng ký sử dụng dịch vụ</li>
              <li>Liên hệ với chúng tôi qua email, điện thoại hoặc Zalo</li>
            </ul>
            <p>
              Thông tin thu thập bao gồm: Họ tên, số điện thoại, email, địa chỉ, 
              thông tin về dự án và các thông tin khác bạn cung cấp.
            </p>

            <h2>2. Sử dụng thông tin</h2>
            <p>Chúng tôi sử dụng thông tin của bạn để:</p>
            <ul>
              <li>Cung cấp dịch vụ và hỗ trợ khách hàng</li>
              <li>Liên hệ và tư vấn về dịch vụ</li>
              <li>Cải thiện chất lượng dịch vụ</li>
              <li>Gửi thông tin về dịch vụ mới (nếu bạn đồng ý)</li>
            </ul>

            <h2>3. Bảo vệ thông tin</h2>
            <p>
              CodeX Studio cam kết bảo vệ thông tin cá nhân của bạn bằng các biện pháp bảo mật 
              tiên tiến. Chúng tôi sử dụng mã hóa SSL/TLS để bảo vệ dữ liệu trong quá trình 
              truyền tải.
            </p>

            <h2>4. Chia sẻ thông tin</h2>
            <p>
              Chúng tôi không bán, cho thuê hoặc chia sẻ thông tin cá nhân của bạn cho bên thứ ba, 
              trừ các trường hợp:
            </p>
            <ul>
              <li>Được bạn đồng ý</li>
              <li>Theo yêu cầu của pháp luật</li>
              <li>Với các đối tác cung cấp dịch vụ (với cam kết bảo mật)</li>
            </ul>

            <h2>5. Cookie</h2>
            <p>
              Website của chúng tôi sử dụng cookie để cải thiện trải nghiệm người dùng. 
              Bạn có thể tắt cookie trong cài đặt trình duyệt, nhưng điều này có thể ảnh hưởng 
              đến chức năng của website.
            </p>

            <h2>6. Quyền của bạn</h2>
            <p>Bạn có quyền:</p>
            <ul>
              <li>Truy cập và xem thông tin cá nhân của mình</li>
              <li>Yêu cầu sửa đổi hoặc xóa thông tin</li>
              <li>Từ chối nhận thông tin marketing</li>
              <li>Rút lại sự đồng ý bất cứ lúc nào</li>
            </ul>

            <h2>7. Liên hệ</h2>
            <p>
              Nếu bạn có câu hỏi về chính sách bảo mật, vui lòng liên hệ:
            </p>
            <ul>
              <li>Email: contact@codex.studio</li>
              <li>Điện thoại: +84 123 456 789</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}

