# Hướng dẫn cấu hình Email Service (Resend)

## Bước 1: Tạo tài khoản Resend

1. Truy cập https://resend.com
2. Đăng ký tài khoản miễn phí (100 emails/ngày)
3. Xác thực email của bạn

## Bước 2: Lấy API Key

1. Đăng nhập vào Resend Dashboard
2. Vào **API Keys** trong menu
3. Click **Create API Key**
4. Đặt tên cho API key (ví dụ: "CodeX Studio Production")
5. Chọn quyền: **Sending access**
6. Copy API key (chỉ hiển thị 1 lần, lưu lại cẩn thận)

## Bước 3: Cấu hình Domain (QUAN TRỌNG)

### ⚠️ Lưu ý quan trọng:
- Resend chỉ cho phép gửi **test email** đến email đã đăng ký tài khoản
- Để gửi email đến bất kỳ địa chỉ nào, **BẮT BUỘC** phải verify domain

### Option A: Verify Domain (Khuyến nghị - cho production)
1. Vào **Domains** trong Resend Dashboard
2. Click **Add Domain**
3. Thêm domain của bạn (ví dụ: `codex.studio` hoặc subdomain như `mail.codex.studio`)
4. Thêm DNS records theo hướng dẫn (SPF, DKIM, DMARC)
5. Chờ xác thực domain (thường mất vài phút đến vài giờ)
6. Sau khi verify, đổi `RESEND_FROM_EMAIL` trong `.env` thành email của domain đã verify
   - Ví dụ: `noreply@codex.studio` hoặc `noreply@mail.codex.studio`

### Option B: Sử dụng domain test của Resend (Chỉ cho development)
- Chỉ có thể gửi đến email đã đăng ký tài khoản Resend
- Không thể gửi đến email khác
- Dùng `onboarding@resend.dev` (đã cấu hình sẵn)

## Bước 4: Cấu hình trong .env

Thêm các biến môi trường sau vào file `.env`:

```env
# Resend API Key
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Email gửi đi (sử dụng domain của Resend hoặc domain đã verify)
RESEND_FROM_EMAIL=onboarding@resend.dev
# Hoặc nếu đã verify domain:
# RESEND_FROM_EMAIL=noreply@codex.studio
```

## Bước 5: Test

1. Restart dev server
2. Thử chức năng "Quên mật khẩu"
3. Kiểm tra email trong hộp thư (có thể trong spam)

## Lưu ý

- **Development**: Sử dụng `onboarding@resend.dev` (không cần verify domain)
- **Production**: Nên sử dụng domain riêng đã verify để tránh email vào spam
- Resend miễn phí 100 emails/ngày, đủ cho hầu hết các website nhỏ
- API key phải được bảo mật, không commit vào git

## Troubleshooting

### Email không đến
1. Kiểm tra spam folder
2. Kiểm tra API key đúng chưa
3. Kiểm tra logs trong Resend Dashboard
4. Đảm bảo domain đã được verify (nếu dùng domain riêng)

### Lỗi "Invalid API Key"
- Kiểm tra lại API key trong `.env`
- Đảm bảo không có khoảng trắng thừa
- Restart dev server sau khi thay đổi `.env`

