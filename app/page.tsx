import { HeroSection } from "@/components/sections/hero-section"
import { AnimationSection } from "@/components/sections/animation-section"
import { ServicesSection } from "@/components/sections/services-section"
import { WhyChooseUsSection } from "@/components/sections/why-choose-us-section"
import { PortfolioSection } from "@/components/sections/portfolio-section"
import { ProcessSection } from "@/components/sections/process-section"
import { PricingSection } from "@/components/sections/pricing-section"
import { TestimonialsSection } from "@/components/sections/testimonials-section"
import { ContactFormSection } from "@/components/sections/contact-form-section"
import { Metadata } from "next"
import { prisma } from "@/lib/prisma"

export const metadata: Metadata = {
  title: "CodeX Studio - Thiết kế Website Chuẩn SEO Chuyên Nghiệp",
  description: "Thiết kế website chuẩn SEO, chuyên nghiệp với tốc độ cao. Dịch vụ hosting, VPS, nâng cấp website và tối ưu tốc độ.",
  keywords: "thiết kế website, website chuẩn SEO, hosting, VPS, nâng cấp website, tối ưu tốc độ",
  openGraph: {
    title: "CodeX Studio - Thiết kế Website Chuẩn SEO",
    description: "Thiết kế website chuyên nghiệp, tốc độ cao, chuẩn SEO",
    type: "website",
  },
}

async function getPortfolios() {
  try {
    const portfolios = await prisma.portfolio.findMany({
      where: { featured: true },
      orderBy: [
        { order: "asc" },
        { createdAt: "desc" },
      ],
      take: 6,
    })
    return portfolios
  } catch (error) {
    console.error("Error fetching portfolios:", error)
    return []
  }
}

export default async function HomePage() {
  const portfolios = await getPortfolios()

  return (
    <>
      <HeroSection />
      <AnimationSection />
      <ServicesSection />
      <WhyChooseUsSection />
      <PortfolioSection portfolios={portfolios} />
      <ProcessSection />
      <PricingSection />
      <TestimonialsSection />
      <ContactFormSection />
    </>
  )
}
