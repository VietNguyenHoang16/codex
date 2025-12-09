import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Bảng giá - CodeX Studio",
  description: "Bảng giá các gói dịch vụ thiết kế website chuyên nghiệp",
}

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}


