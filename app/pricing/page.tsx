"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Check, Sparkles, Zap, Crown, ArrowRight, Settings, Shield, Rocket, Code, FileText, Users, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

const pricingPlans = [
  {
    name: "Gói Khởi Điểm",
    subtitle: "Startup Launch",
    icon: Sparkles,
    price: "3-5 triệu",
    description: "Phù hợp cho doanh nghiệp nhỏ, khởi nghiệp - Tập trung vào hiệu quả chi phí",
    features: [
      "Nền tảng CMS tối ưu",
      "Thiết kế theo mẫu chuẩn Quốc tế (International Standard Template)",
      "Thiết kế UI/UX theo xu hướng mới nhất",
      "Tối ưu SEO cơ bản",
      "Form liên hệ",
      "Chứng chỉ SSL/TLS Tiêu chuẩn",
      "Hỗ trợ dài hạn",
      "Bàn giao trong 2-3 tuần",
    ],
    popular: false,
    gradient: "from-cyan-400 via-blue-500 to-indigo-600",
    borderGradient: "from-cyan-400 via-blue-500 to-indigo-600",
    iconGradient: "from-cyan-400 to-blue-600",
    bgGradient: "from-cyan-50/50 via-blue-50/50 to-indigo-50/50",
    glowColor: "rgba(34, 211, 238, 0.3)",
    warranty: "3 Tháng",
    ecommerce: "Không",
    speed: "Cơ bản",
  },
  {
    name: "Gói Tăng Tốc",
    subtitle: "Business Growth",
    icon: Zap,
    price: "6-10 triệu",
    description: "Phù hợp cho doanh nghiệp vừa và nhỏ - Mở rộng và tính năng nâng cao",
    features: [
      "Thiết kế theo yêu cầu",
      "Áp dụng Brand Guidelines của doanh nghiệp",
      "10-15 trang nội dung",
      "CMS quản trị đầy đủ",
      "Nghiên cứu từ khóa ban đầu",
      "Cấu trúc Silo Content",
      "Schema Markup",
      "Tối ưu Core Web Vitals",
      "Tốc độ tối ưu nâng cao",
      "Tích hợp Cổng thanh toán nội địa (VNPay, Momo)",
      "Thiết lập giỏ hàng và quy trình đặt hàng",
      "E-commerce cơ bản",
      "Chứng chỉ SSL/TLS Tiêu chuẩn",
      "Hỗ trợ dài hạn",
      "Bàn giao trong 3-4 tuần",
    ],
    popular: true,
    gradient: "from-yellow-400 via-orange-500 to-pink-600",
    borderGradient: "from-yellow-400 via-orange-500 to-pink-600",
    iconGradient: "from-yellow-400 to-orange-600",
    bgGradient: "from-yellow-50/50 via-orange-50/50 to-pink-50/50",
    glowColor: "rgba(251, 191, 36, 0.4)",
    warranty: "6 Tháng",
    ecommerce: "Cơ bản (5-10 sản phẩm)",
    speed: "Nâng cao",
  },
  {
    name: "Gói Đột Phá",
    subtitle: "Enterprise Solution",
    icon: Crown,
    price: "Từ 11 triệu",
    description: "Giải pháp toàn diện cho doanh nghiệp lớn - Tùy chỉnh, tốc độ và quy mô lớn",
    features: [
      "Tùy chỉnh hoàn toàn",
      "Không giới hạn trang",
      "Tốc độ tối ưu hóa cao",
      "Bảo hành dài hạn",
      "Chứng chỉ SSL/TLS Tiêu chuẩn",
      "Bảo vệ chống DDoS/Malware",
      "Sao lưu dữ liệu hàng tuần",
      "Hỗ trợ dài hạn",
      "Tích hợp đầy đủ",
      "E-commerce đầy đủ",
      "Training & Documentation",
      "Bàn giao trong 4-6 tuần",
    ],
    popular: false,
    gradient: "from-purple-400 via-pink-500 to-rose-600",
    borderGradient: "from-purple-400 via-pink-500 to-rose-600",
    iconGradient: "from-purple-400 to-pink-600",
    bgGradient: "from-purple-50/50 via-pink-50/50 to-rose-50/50",
    glowColor: "rgba(168, 85, 247, 0.3)",
    warranty: "12 Tháng",
    ecommerce: "Đầy đủ (Không giới hạn)",
    speed: "Tối ưu hóa cao",
  },
  {
    name: "Gói Cá Nhân Hóa",
    subtitle: "Bespoke/Custom Solution",
    icon: Settings,
    price: "Báo giá sau khi khảo sát (POC)",
    description: "Giải pháp tùy chỉnh hoàn toàn cho doanh nghiệp lớn - Phát triển phần mềm chuyên biệt",
    features: [
      "Giải pháp phát triển phần mềm Web App",
      "Hệ thống Quản trị Doanh nghiệp (ERP/CRM) tích hợp",
      "Phát triển API tùy chỉnh",
      "Cam kết SLA (Service Level Agreement) chuyên biệt",
      "Thiết kế và phát triển từ đầu",
      "Tư vấn chiến lược công nghệ",
      "Chứng chỉ SSL/TLS Tiêu chuẩn",
      "Hỗ trợ và bảo trì dài hạn",
      "Bàn giao theo tiến độ dự án",
    ],
    popular: false,
    gradient: "from-emerald-400 via-teal-500 to-cyan-600",
    borderGradient: "from-emerald-400 via-teal-500 to-cyan-600",
    iconGradient: "from-emerald-400 to-teal-600",
    bgGradient: "from-emerald-50/50 via-teal-50/50 to-cyan-50/50",
    glowColor: "rgba(16, 185, 129, 0.3)",
    warranty: "Theo SLA",
    ecommerce: "Tùy chỉnh",
    speed: "Tối ưu hóa cao",
  },
]

const includedFeatures = [
  {
    icon: Code,
    title: "Thiết kế Responsive 100%",
    description: "Hiển thị hoàn hảo trên mọi thiết bị (Desktop, Tablet, Mobile)",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: FileText,
    title: "Cài đặt Google Analytics & Search Console",
    description: "Giúp bạn theo dõi hiệu suất website ngay từ ngày đầu tiên",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: Users,
    title: "Đào tạo sử dụng chuyên sâu",
    description: "Cung cấp tài liệu và buổi training trực tiếp để quản lý nội dung dễ dàng",
    gradient: "from-orange-500 to-yellow-500",
  },
]

// Typing Effect Component
function TypingEffect({ text, className }: { text: string; className?: string }) {
  const [displayedText, setDisplayedText] = useState("")
  const [showCursor, setShowCursor] = useState(true)
  const [isTyping, setIsTyping] = useState(true)

  useEffect(() => {
    let currentIndex = 0
    const typingInterval = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayedText(text.slice(0, currentIndex + 1))
        currentIndex++
      } else {
        clearInterval(typingInterval)
        setIsTyping(false)
        // Hide cursor after a short delay when typing is complete
        setTimeout(() => {
          setShowCursor(false)
        }, 500)
      }
    }, 100) // Typing speed: 100ms per character

    return () => clearInterval(typingInterval)
  }, [text])

  return (
    <span className={className}>
      {displayedText}
      {showCursor && isTyping && <span className="animate-pulse">|</span>}
    </span>
  )
}

export default function PricingPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 relative overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -80, 0],
            y: [0, 60, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 left-1/3 w-96 h-96 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{
            scale: [1, 1.1, 1],
            x: [0, 50, 0],
            y: [0, -80, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/2 right-1/4 w-72 h-72 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-15"
          animate={{
            scale: [1, 1.4, 1],
            x: [0, -60, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="container relative z-10 px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            {/* Main Title with Typing Effect */}
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-8 leading-tight"
            >
              <span className="text-blue-700">
                <TypingEffect text="KIẾN TẠO NỀN TẢNG SỐ" />
              </span>
            </motion.h1>
            
            {/* Subtitle with Fade-In Blur Effect */}
            <motion.div
              initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.2, delay: 2.5, ease: "easeOut" }}
              className="text-lg md:text-xl lg:text-2xl text-slate-600 leading-relaxed max-w-3xl mx-auto space-y-2"
            >
              <p>Lựa chọn gói giải pháp được tùy chỉnh chuyên biệt</p>
              <p>và đáp ứng hoàn hảo chiến lược kinh doanh của doanh nghiệp bạn</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards Section */}
      <section className="py-12 md:py-20 relative z-10">
        <div className="container px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto items-start">
            {pricingPlans.map((plan, index) => {
              const Icon = plan.icon
              const isPopular = plan.popular
              
              return (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 40, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 100
                  }}
                  whileHover={{ scale: isPopular ? 1.12 : 1.05 }}
                  className={`relative ${isPopular ? "md:scale-110 md:-mt-4 md:mb-4 z-20 lg:col-span-1" : "z-10"}`}
                >
                  {/* Popular Badge with Animation */}
                  {isPopular && (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      className="absolute -top-4 left-1/2 -translate-x-1/2 z-30"
                    >
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-600 rounded-full blur-lg opacity-75 animate-pulse" />
                        <div className="relative bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-600 text-white px-6 py-1.5 rounded-full text-sm font-bold shadow-xl">
                          <motion.span
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            POPULAR
                          </motion.span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Animated Border Gradient */}
                  <div
                    className={`
                      relative rounded-[24px] p-[2px]
                      bg-gradient-to-r ${plan.borderGradient}
                      ${isPopular ? "animate-gradient" : ""}
                    `}
                    style={{
                      boxShadow: isPopular 
                        ? `0 0 30px ${plan.glowColor}, 0 0 60px ${plan.glowColor}`
                        : `0 0 20px ${plan.glowColor}`,
                    }}
                  >
                    {/* Glassmorphism Card */}
                    <div
                      className={`
                        relative h-full flex flex-col
                        bg-white/90 backdrop-blur-xl
                        rounded-[22px]
                        transition-all duration-500
                        hover:shadow-2xl
                        ${isPopular ? "shadow-2xl" : "shadow-lg"}
                      `}
                      style={{
                        background: `linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.9) 100%)`,
                      }}
                    >
                      {/* Animated Background Gradient Overlay */}
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-br ${plan.bgGradient} rounded-[22px] opacity-0 hover:opacity-100 transition-opacity duration-500`}
                        animate={isPopular ? {
                          opacity: [0.3, 0.5, 0.3],
                        } : {}}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />

                      {/* Shimmer Effect */}
                      <div className="absolute inset-0 rounded-[22px] overflow-hidden">
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                          animate={{
                            x: ["-100%", "200%"],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        />
                      </div>

                      <div className="relative z-10 p-6 md:p-8 flex flex-col h-full">
                        {/* Animated Icon */}
                        <motion.div
                          whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                          transition={{ duration: 0.5 }}
                          className={`mb-4 w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br ${plan.iconGradient} flex items-center justify-center shadow-lg`}
                        >
                          <motion.div
                            animate={isPopular ? {
                              scale: [1, 1.2, 1],
                              rotate: [0, 5, -5, 0],
                            } : {}}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                          >
                            <Icon className="h-7 w-7 md:h-8 md:w-8 text-white" />
                          </motion.div>
                        </motion.div>

                        {/* Plan Name with Gradient */}
                        <h3 className={`text-xl md:text-2xl font-bold mb-1 bg-gradient-to-r ${plan.gradient} bg-clip-text text-transparent`}>
                          {plan.name}
                        </h3>
                        <p className="text-xs md:text-sm text-slate-600 mb-4 font-medium">{plan.subtitle}</p>

                        {/* Animated Price */}
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          className="mb-4"
                        >
                          <span className={`text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r ${plan.gradient} bg-clip-text text-transparent`}>
                            {plan.price}
                          </span>
                        </motion.div>

                        {/* Description */}
                        <p className="text-slate-600 mb-6 text-xs md:text-sm leading-relaxed">
                          {plan.description}
                        </p>

                        {/* Features List with Stagger Animation */}
                        <ul className="flex-1 space-y-3 mb-6">
                          {plan.features.map((feature, idx) => (
                            <motion.li
                              key={idx}
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: index * 0.1 + idx * 0.05 }}
                              className="flex items-start gap-2 md:gap-3 group"
                            >
                              <motion.div
                                whileHover={{ rotate: 360, scale: 1.2 }}
                                transition={{ duration: 0.5 }}
                                className="mt-0.5 flex-shrink-0"
                              >
                                <div className={`w-4 h-4 md:w-5 md:h-5 rounded-full bg-gradient-to-br ${plan.gradient} flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow`}>
                                  <Check className="h-2.5 w-2.5 md:h-3 md:w-3 text-white" />
                                </div>
                              </motion.div>
                              <span className="text-xs md:text-sm text-slate-700 leading-relaxed group-hover:text-slate-900 transition-colors">
                                {feature}
                              </span>
                            </motion.li>
                          ))}
                        </ul>

                        {/* Animated CTA Button */}
                        <Link href="/contact" className="mt-auto">
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Button
                              className={`
                                w-full h-11 md:h-12 rounded-xl font-semibold text-sm md:text-base
                                relative overflow-hidden
                                ${
                                  isPopular
                                    ? `bg-gradient-to-r ${plan.gradient} text-white shadow-xl hover:shadow-2xl`
                                    : `bg-white border-2 border-transparent bg-clip-padding text-slate-700 hover:text-white`
                                }
                              `}
                              style={{
                                background: isPopular
                                  ? `linear-gradient(135deg, var(--tw-gradient-stops))`
                                  : "white",
                              }}
                            >
                              <motion.span
                                className="relative z-10 flex items-center justify-center"
                                animate={isPopular ? {
                                  x: [0, 2, 0],
                                } : {}}
                                transition={{
                                  duration: 1.5,
                                  repeat: Infinity,
                                  ease: "easeInOut",
                                }}
                              >
                                Liên hệ ngay
                                <ArrowRight className="ml-2 h-4 w-4" />
                              </motion.span>
                              {!isPopular && (
                                <motion.div
                                  className={`absolute inset-0 bg-gradient-to-r ${plan.gradient} opacity-0 hover:opacity-100 transition-opacity duration-300`}
                                  whileHover={{ opacity: 1 }}
                                />
                              )}
                            </Button>
                          </motion.div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Comparison Table with Enhanced Design */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 max-w-7xl mx-auto"
          >
            <div className="bg-white/80 backdrop-blur-xl rounded-[24px] border-2 border-gradient-to-r from-blue-200/50 via-purple-200/50 to-pink-200/50 shadow-2xl p-6 md:p-8 relative overflow-hidden">
              {/* Animated Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/50 to-pink-50/50 opacity-50" />
              
              <div className="relative z-10">
                <h3 className="text-2xl md:text-3xl font-bold text-blue-700 mb-8 text-center">
                  Bảng So Sánh Tính Năng
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-gradient-to-r from-blue-200 to-purple-200">
                        <th className="text-left py-4 px-4 text-slate-900 font-semibold">Tính năng</th>
                        {pricingPlans.map((plan) => (
                          <th key={plan.name} className="text-center py-4 px-4 text-sm md:text-base text-slate-900 font-semibold">
                            {plan.name}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <motion.tr
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="border-b border-slate-200/50 hover:bg-blue-50/50 transition-colors"
                      >
                        <td className="py-4 px-4 text-slate-700 font-medium flex items-center gap-2">
                          <Shield className="h-5 w-5 text-blue-600" />
                          Bảo hành
                        </td>
                        {pricingPlans.map((plan) => (
                          <td key={plan.name} className="py-4 px-4 text-center text-sm md:text-base text-slate-600">
                            {plan.warranty}
                          </td>
                        ))}
                      </motion.tr>
                      <motion.tr
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="border-b border-slate-200/50 hover:bg-purple-50/50 transition-colors"
                      >
                        <td className="py-4 px-4 text-slate-700 font-medium flex items-center gap-2">
                          <Rocket className="h-5 w-5 text-purple-600" />
                          Tích hợp E-commerce
                        </td>
                        {pricingPlans.map((plan) => (
                          <td key={plan.name} className="py-4 px-4 text-center text-sm md:text-base text-slate-600">
                            {plan.ecommerce}
                          </td>
                        ))}
                      </motion.tr>
                      <motion.tr
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="hover:bg-pink-50/50 transition-colors"
                      >
                        <td className="py-4 px-4 text-slate-700 font-medium flex items-center gap-2">
                          <Zap className="h-5 w-5 text-pink-600" />
                          Tối ưu Tốc độ
                        </td>
                        {pricingPlans.map((plan) => (
                          <td key={plan.name} className="py-4 px-4 text-center text-sm md:text-base text-slate-600">
                            {plan.speed}
                          </td>
                        ))}
                      </motion.tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Included Features Section with Enhanced Design */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-16 max-w-7xl mx-auto"
          >
            <div className="bg-gradient-to-br from-blue-50/80 via-purple-50/80 to-pink-50/80 backdrop-blur-xl rounded-[24px] border-2 border-blue-200/50 shadow-2xl p-6 md:p-8 relative overflow-hidden">
              {/* Animated Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-40 h-40 bg-blue-400 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-0 w-40 h-40 bg-purple-400 rounded-full blur-3xl" />
              </div>
              
              <div className="relative z-10">
                <h3 className="text-2xl md:text-3xl font-bold text-blue-700 mb-8 text-center">
                  Tất cả các gói dịch vụ đều được hưởng những quyền lợi sau
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {includedFeatures.map((feature, index) => {
                    const FeatureIcon = feature.icon
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                        whileHover={{ scale: 1.05, y: -5 }}
                        className="bg-white/90 backdrop-blur-xl rounded-2xl p-6 border-2 border-slate-200/50 shadow-lg hover:shadow-xl transition-all relative overflow-hidden group"
                      >
                        {/* Hover Gradient Overlay */}
                        <motion.div
                          className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                        />
                        
                        <div className="relative z-10">
                          <motion.div
                            whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                            className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 shadow-lg`}
                          >
                            <FeatureIcon className="h-6 w-6 text-white" />
                          </motion.div>
                          <h4 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h4>
                          <p className="text-sm text-slate-600 leading-relaxed">{feature.description}</p>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Commitment Section with Enhanced Design */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-16 max-w-4xl mx-auto"
          >
            <div className="bg-white/90 backdrop-blur-xl rounded-[24px] border-2 border-gradient-to-r from-blue-200/50 via-purple-200/50 to-pink-200/50 shadow-2xl p-6 md:p-8 relative overflow-hidden">
              {/* Animated Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/50 to-pink-50/50 opacity-50" />
              
              <div className="relative z-10">
                <h3 className="text-2xl md:text-3xl font-bold text-blue-700 mb-8 text-center">
                  Cam kết Chất lượng & Quy trình
                </h3>
                
                <div className="space-y-6">
                  {/* Cam kết về Chất lượng */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className="bg-gradient-to-r from-blue-50/80 to-cyan-50/80 rounded-2xl p-6 border-2 border-blue-200/50 shadow-lg hover:shadow-xl transition-all relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="flex items-start gap-4 relative z-10">
                      <motion.div
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                        className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center flex-shrink-0 shadow-lg"
                      >
                        <Shield className="h-5 w-5 text-white" />
                      </motion.div>
                      <div>
                        <h4 className="text-lg font-bold text-slate-900 mb-2">Cam kết 100% về Code</h4>
                        <p className="text-slate-700 leading-relaxed">
                          Chúng tôi cam kết sử dụng code sạch, tối ưu và không trùng lặp, đảm bảo khả năng nâng cấp và bảo trì lâu dài.
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Quy trình làm việc */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    whileHover={{ scale: 1.02 }}
                    className="bg-gradient-to-r from-purple-50/80 to-pink-50/80 rounded-2xl p-6 border-2 border-purple-200/50 shadow-lg hover:shadow-xl transition-all relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="flex items-start gap-4 relative z-10">
                      <motion.div
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                        className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center flex-shrink-0 shadow-lg"
                      >
                        <Clock className="h-5 w-5 text-white" />
                      </motion.div>
                      <div>
                        <h4 className="text-lg font-bold text-slate-900 mb-2">Quy trình làm việc minh bạch</h4>
                        <p className="text-slate-700 leading-relaxed mb-3">
                          Mỗi dự án đều đi qua 4 giai đoạn chính:
                        </p>
                        <ol className="list-decimal list-inside space-y-2 text-slate-700">
                          <li>Khảo sát & Phân tích yêu cầu</li>
                          <li>Thiết kế UI/UX & Duyệt bản mẫu</li>
                          <li>Lập trình & Kiểm thử (QA/QC)</li>
                          <li>Bàn giao & Đào tạo</li>
                        </ol>
                      </div>
                    </div>
                  </motion.div>

                  {/* Chi phí ẩn */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    whileHover={{ scale: 1.02 }}
                    className="bg-gradient-to-r from-emerald-50/80 to-teal-50/80 rounded-2xl p-6 border-2 border-emerald-200/50 shadow-lg hover:shadow-xl transition-all relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="flex items-start gap-4 relative z-10">
                      <motion.div
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                        className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center flex-shrink-0 shadow-lg"
                      >
                        <Check className="h-5 w-5 text-white" />
                      </motion.div>
                      <div>
                        <h4 className="text-lg font-bold text-slate-900 mb-2">Không phát sinh chi phí ẩn</h4>
                        <p className="text-slate-700 leading-relaxed">
                          Báo giá cuối cùng sẽ được chốt sau khi ký hợp đồng và sẽ không phát sinh thêm chi phí nào ngoài phạm vi đã thống nhất.
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Lưu ý về giá */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="bg-gradient-to-br from-slate-50/80 to-blue-50/80 rounded-2xl p-6 border-2 border-slate-200/50 shadow-lg"
                  >
                    <h4 className="text-lg font-bold text-slate-900 mb-3">Lưu ý về giá</h4>
                    <p className="text-slate-700 leading-relaxed mb-3">
                      Giá trên chỉ mang tính chất tham khảo. Giá chính xác sẽ được báo sau khi tư vấn và nắm rõ yêu cầu cụ thể của bạn.
                    </p>
                    <p className="text-slate-700 leading-relaxed">
                      Chúng tôi sẵn sàng tùy chỉnh gói dịch vụ theo nhu cầu thực tế của doanh nghiệp bạn.
                    </p>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
