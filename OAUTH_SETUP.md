# Hướng dẫn Setup OAuth (Google & Facebook)

Hướng dẫn này sẽ giúp bạn cấu hình đăng nhập bằng Google và Facebook cho ứng dụng.

## 📋 Yêu cầu

- Tài khoản Google Developer Console
- Tài khoản Facebook Developer
- Ứng dụng đã được deploy hoặc có URL public (cho production)

## 🔧 Setup Google OAuth

### Bước 1: Tạo OAuth 2.0 Client ID

1. Truy cập [Google Cloud Console](https://console.cloud.google.com/)
2. Tạo project mới hoặc chọn project hiện có
3. Vào **APIs & Services** > **Credentials**
4. Click **Create Credentials** > **OAuth client ID**
5. Nếu chưa có, cấu hình OAuth consent screen:
   - Chọn **External** (hoặc Internal nếu dùng Google Workspace)
   - Điền thông tin ứng dụng
   - Thêm scopes: `email`, `profile`
6. Tạo OAuth client:
   - **Application type**: Web application
   - **Name**: CodeX Studio (hoặc tên bạn muốn)
   - **Authorized JavaScript origins**:
     - `http://localhost:3000` (cho development)
     - `https://yourdomain.com` (cho production)
   - **Authorized redirect URIs**:
     - `http://localhost:3000/api/auth/callback/google` (cho development)
     - `https://yourdomain.com/api/auth/callback/google` (cho production)
7. Copy **Client ID** và **Client Secret**

### Bước 2: Thêm vào .env

Thêm các biến sau vào file `.env`:

```env
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
```

## 📘 Setup Facebook OAuth

### Bước 1: Tạo Facebook App

1. Truy cập [Facebook Developers](https://developers.facebook.com/)
2. Click **My Apps** > **Create App**
3. Chọn **Consumer** làm app type
4. Điền thông tin app:
   - **App Name**: CodeX Studio
   - **App Contact Email**: email của bạn
5. Vào **Settings** > **Basic**
6. Thêm **App Domains**:
   - `localhost` (cho development)
   - `yourdomain.com` (cho production)
7. Thêm **Website** platform:
   - **Site URL**: 
     - `http://localhost:3000` (cho development)
     - `https://yourdomain.com` (cho production)
8. Vào **Products** > **Facebook Login** > **Settings**
9. Thêm **Valid OAuth Redirect URIs**:
   - `http://localhost:3000/api/auth/callback/facebook` (cho development)
   - `https://yourdomain.com/api/auth/callback/facebook` (cho production)
10. Vào **Settings** > **Basic** để lấy:
    - **App ID**
    - **App Secret** (click Show để hiện)

### Bước 2: Thêm vào .env

Thêm các biến sau vào file `.env`:

```env
FACEBOOK_CLIENT_ID=your_facebook_app_id_here
FACEBOOK_CLIENT_SECRET=your_facebook_app_secret_here
```

## 🔐 Cấu hình .env hoàn chỉnh

File `.env` của bạn nên có các biến sau:

```env
# Database
DATABASE_URL="your_database_url"

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secret_key_here

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Facebook OAuth
FACEBOOK_CLIENT_ID=your_facebook_app_id
FACEBOOK_CLIENT_SECRET=your_facebook_app_secret
```

## 🚀 Sử dụng

Sau khi cấu hình xong:

1. Restart development server:
   ```bash
   npm run dev
   ```

2. Truy cập trang đăng nhập:
   - User login: `http://localhost:3000/login`
   - Admin login: `http://localhost:3000/admin/login`

3. Click vào nút **"Đăng nhập với Google"** hoặc **"Đăng nhập với Facebook"**

4. Cho phép ứng dụng truy cập thông tin của bạn

5. Bạn sẽ được đăng nhập tự động!

## ⚠️ Lưu ý quan trọng

### Development (localhost)

- Google và Facebook đều cho phép test với `localhost:3000`
- Không cần verify domain cho development

### Production

- **Google**: Cần verify domain nếu muốn hiển thị logo/branding
- **Facebook**: Cần submit app để review nếu muốn public (hoặc chỉ dùng cho test users)
- Đảm bảo redirect URIs khớp chính xác với domain production

### Security

- **KHÔNG** commit file `.env` lên Git
- Sử dụng environment variables trên hosting platform (Vercel, Railway, etc.)
- Rotate secrets định kỳ

## 🐛 Troubleshooting

### Lỗi "redirect_uri_mismatch"

- Kiểm tra lại redirect URIs trong Google/Facebook console
- Đảm bảo URL khớp chính xác (bao gồm http/https, port, path)

### Lỗi "Invalid client"

- Kiểm tra Client ID và Client Secret trong `.env`
- Đảm bảo không có khoảng trắng thừa

### Email đã tồn tại

- Nếu email từ OAuth đã tồn tại trong database (từ đăng ký email/password), hệ thống sẽ tự động liên kết accounts
- User có thể đăng nhập bằng cả email/password và OAuth

## 📚 Tài liệu tham khảo

- [NextAuth.js OAuth Providers](https://next-auth.js.org/providers/)
- [Google OAuth 2.0](https://developers.google.com/identity/protocols/oauth2)
- [Facebook Login](https://developers.facebook.com/docs/facebook-login/)












