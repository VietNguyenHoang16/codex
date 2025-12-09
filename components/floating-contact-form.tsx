"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Send, Loader2, X, MessageSquareText } from "lucide-react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

const contactSchema = z.object({
  name: z.string().min(2, "Tên phải có ít nhất 2 ký tự"),
  phone: z.string().min(10, "Số điện thoại không hợp lệ"),
  message: z.string().optional(),
})

type ContactFormData = z.infer<typeof contactSchema>

export function FloatingContactForm() {
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [showButton, setShowButton] = useState(true) // Hiển thị ngay từ đầu
  const [imageError, setImageError] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          email: "", // Không bắt buộc
          zalo: "", // Không bắt buộc
          service: "Liên hệ từ form nổi", // Mặc định
        }),
      })

      if (response.ok) {
        setSubmitSuccess(true)
        reset()
        setTimeout(() => {
          setSubmitSuccess(false)
          setIsOpen(false)
        }, 3000)
      }
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {!isOpen ? (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            <Button
              onClick={() => setIsOpen(true)}
              size="lg"
              variant="ghost"
              className="rounded-full h-16 w-16 shadow-lg hover:shadow-xl transition-all hover:scale-110 bg-transparent hover:bg-transparent p-0 relative"
            >
              <div className="relative h-full w-full flex items-center justify-center">
                {/* Ưu tiên dùng hình ảnh PNG, nếu không có thì dùng icon từ lucide-react */}
                {!imageError ? (
                  <Image
                    src="/message-icon.PNG"
                    alt="Liên hệ"
                    width={64}
                    height={64}
                    className="object-contain"
                    onError={() => {
                      console.error("Failed to load message-icon.PNG");
                      setImageError(true);
                    }}
                    priority
                  />
                ) : (
                  <MessageSquareText className="h-12 w-12 text-gray-700" />
                )}
              </div>
            </Button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="w-80 max-w-[calc(100vw-2rem)]"
          >
            <Card className="shadow-2xl border-2">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Liên hệ ngay</CardTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => setIsOpen(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                  <div>
                    <Label htmlFor="floating-name" className="text-xs">
                      Họ tên *
                    </Label>
                    <Input
                      id="floating-name"
                      {...register("name")}
                      placeholder="Nhập họ tên"
                      className="h-9 text-sm"
                    />
                    {errors.name && (
                      <p className="text-xs text-destructive mt-1">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="floating-phone" className="text-xs">
                      Số điện thoại *
                    </Label>
                    <Input
                      id="floating-phone"
                      {...register("phone")}
                      placeholder="0123456789"
                      className="h-9 text-sm"
                    />
                    {errors.phone && (
                      <p className="text-xs text-destructive mt-1">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="floating-message" className="text-xs">
                      Tin nhắn
                    </Label>
                    <Textarea
                      id="floating-message"
                      {...register("message")}
                      placeholder="Nội dung yêu cầu..."
                      rows={3}
                      className="text-sm resize-none"
                    />
                  </div>

                  {submitSuccess && (
                    <div className="p-2 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded text-xs text-green-800 dark:text-green-200">
                      Cảm ơn bạn! Chúng tôi sẽ liên hệ lại sớm nhất.
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="w-full h-9 text-sm"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                        Đang gửi...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-3 w-3" />
                        Gửi yêu cầu
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

