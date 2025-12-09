"use client"

import { motion } from "framer-motion"
import { LottieAnimation } from "@/components/lottie-animation"
import { Sparkles } from "lucide-react"

export function AnimationSection() {
  return (
    <section className="py-12 md:py-20 bg-gradient-to-b from-blue-50/50 via-white to-background dark:from-gray-900 dark:via-gray-800 dark:to-background">
      <div className="container px-4">
        <div className="flex flex-col items-center justify-center space-y-8">
          {/* Text Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium mb-4">
              <Sparkles className="h-4 w-4" />
              <span>Công nghệ tiên tiến</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Tích hợp AI
              </span>
              {" - "}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Nâng cao hiệu suất
              </span>
            </h2>
          </motion.div>

          {/* Animation - 80% width */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full max-w-[80%] mx-auto"
          >
            <div className="w-full" style={{ aspectRatio: "16/9" }}>
              <LottieAnimation
                url="https://app.lottiefiles.com/animation/07a1acd4-fe7f-4b6f-8f1f-08f962f55898"
                jsonPath="/animations/07a1acd4-fe7f-4b6f-8f1f-08f962f55898.json"
                className="w-full h-full"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

