import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { FloatingContactForm } from "@/components/floating-contact-form";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CodeX Studio - Thiết kế Website Chuẩn SEO Chuyên Nghiệp",
  description: "Thiết kế website chuẩn SEO, chuyên nghiệp với tốc độ cao. Dịch vụ hosting, VPS, nâng cấp website và tối ưu tốc độ.",
  keywords: "thiết kế website, website chuẩn SEO, hosting, VPS, nâng cấp website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <FloatingContactForm />
      </body>
    </html>
  );
}
