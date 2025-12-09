import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Chính sách hoàn tiền - CodeX Studio",
  description: "Chính sách hoàn tiền của CodeX Studio",
}

export default function RefundPage() {
  return (
    <div className="min-h-screen">
      <section className="py-20 md:py-32 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Chính sách hoàn tiền
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
            <h2>1. Điều kiện hoàn tiền</h2>
            <p>
              CodeX Studio cam kết cung cấp dịch vụ chất lượng cao. Trong trường hợp không hài lòng 
              với dịch vụ, khách hàng có thể yêu cầu hoàn tiền theo các điều kiện sau:
            </p>

            <h2>2. Thời gian yêu cầu hoàn tiền</h2>
            <ul>
              <li>
                <strong>Trước khi bắt đầu dự án:</strong> Hoàn tiền 100% nếu khách hàng hủy 
                trước khi chúng tôi bắt đầu làm việc.
              </li>
              <li>
                <strong>Trong quá trình thực hiện:</strong> Hoàn tiền theo tỷ lệ phần trăm công việc 
                chưa hoàn thành, trừ đi chi phí đã phát sinh.
              </li>
              <li>
                <strong>Sau khi bàn giao:</strong> Không hoàn tiền, nhưng chúng tôi sẽ hỗ trợ sửa chữa 
                và cải thiện theo yêu cầu trong thời gian bảo hành.
              </li>
            </ul>

            <h2>3. Quy trình hoàn tiền</h2>
            <ol>
              <li>Khách hàng gửi yêu cầu hoàn tiền qua email hoặc điện thoại</li>
              <li>CodeX Studio xem xét và phản hồi trong vòng 3-5 ngày làm việc</li>
              <li>Nếu được chấp nhận, tiền sẽ được hoàn trong vòng 7-14 ngày làm việc</li>
              <li>Tiền sẽ được hoàn về tài khoản ban đầu mà khách hàng đã thanh toán</li>
            </ol>

            <h2>4. Các trường hợp không hoàn tiền</h2>
            <ul>
              <li>Dự án đã hoàn thành và được bàn giao</li>
              <li>Khách hàng đã sử dụng dịch vụ trong thời gian dài</li>
              <li>Yêu cầu hoàn tiền do lý do chủ quan của khách hàng (không phải lỗi từ phía chúng tôi)</li>
              <li>Dịch vụ hosting/VPS đã được kích hoạt và sử dụng</li>
            </ul>

            <h2>5. Phí hoàn tiền</h2>
            <p>
              Nếu hoàn tiền do lý do từ phía khách hàng (không phải lỗi từ CodeX Studio), 
              có thể áp dụng phí xử lý 5-10% tùy theo từng trường hợp cụ thể.
            </p>

            <h2>6. Giải quyết tranh chấp</h2>
            <p>
              Trong trường hợp có tranh chấp về hoàn tiền, chúng tôi sẽ làm việc với khách hàng 
              để tìm giải pháp công bằng cho cả hai bên. Ưu tiên giải quyết thông qua đàm phán 
              và thỏa thuận.
            </p>

            <h2>7. Liên hệ</h2>
            <p>
              Để yêu cầu hoàn tiền hoặc có câu hỏi về chính sách này, vui lòng liên hệ:
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

