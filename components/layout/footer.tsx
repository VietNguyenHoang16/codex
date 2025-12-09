import Link from "next/link"
import { Phone, Mail, MessageCircle, Facebook, Instagram, Linkedin } from "lucide-react"
import { Logo } from "./logo"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t bg-muted/50">
      <div className="container px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Logo />
            </Link>
            <p className="text-sm text-muted-foreground">
              Thiết kế Website Chuẩn SEO – Chuyên Nghiệp. 
              Tạo ra những website đẹp, nhanh và hiệu quả.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold">Liên kết nhanh</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-muted-foreground hover:text-foreground transition-colors">
                  Dịch vụ
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="text-muted-foreground hover:text-foreground transition-colors">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-muted-foreground hover:text-foreground transition-colors">
                  Bảng giá
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  Giới thiệu
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-foreground transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="font-semibold">Dịch vụ</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/services/website-design" className="text-muted-foreground hover:text-foreground transition-colors">
                  Thiết kế website
                </Link>
              </li>
              <li>
                <Link href="/services/hosting-vps" className="text-muted-foreground hover:text-foreground transition-colors">
                  Hosting – VPS
                </Link>
              </li>
              <li>
                <Link href="/services/website-upgrade" className="text-muted-foreground hover:text-foreground transition-colors">
                  Nâng cấp website
                </Link>
              </li>
              <li>
                <Link href="/services/speed-optimization" className="text-muted-foreground hover:text-foreground transition-colors">
                  Tối ưu tốc độ
                </Link>
              </li>
              <li>
                <Link href="/services/bug-fix" className="text-muted-foreground hover:text-foreground transition-colors">
                  Sửa lỗi web
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold">Liên hệ</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <a href="tel:+84123456789" className="text-muted-foreground hover:text-foreground transition-colors">
                  +84 123 456 789
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <MessageCircle className="h-4 w-4 text-muted-foreground" />
                <a href="https://zalo.me/0123456789" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                  Zalo: 0123456789
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <a href="mailto:contact@codex.studio" className="text-muted-foreground hover:text-foreground transition-colors">
                  contact@codex.studio
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              © {currentYear} CodeX Studio. Tất cả quyền được bảo lưu.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                Điều khoản
              </Link>
              <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                Chính sách bảo mật
              </Link>
              <Link href="/refund" className="text-muted-foreground hover:text-foreground transition-colors">
                Chính sách hoàn tiền
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

