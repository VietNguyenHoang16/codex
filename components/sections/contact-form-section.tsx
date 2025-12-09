"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Send, Loader2 } from "lucide-react"

const contactSchema = z.object({
  name: z.string().min(2, "Tên phải có ít nhất 2 ký tự"),
  phone: z.string().min(10, "Số điện thoại không hợp lệ"),
  message: z.string().optional(),
})

type ContactFormData = z.infer<typeof contactSchema>

export function ContactFormSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

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
          service: "Liên hệ từ trang web", // Mặc định
        }),
      })

      if (response.ok) {
        setSubmitSuccess(true)
        reset()
        setTimeout(() => setSubmitSuccess(false), 5000)
      }
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Liên hệ với chúng tôi
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Để lại thông tin, chúng tôi sẽ liên hệ lại trong thời gian sớm nhất
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Gửi yêu cầu</CardTitle>
              <CardDescription>
                Điền thông tin bên dưới để nhận báo giá và tư vấn miễn phí
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Họ tên *</Label>
                    <Input
                      id="name"
                      {...register("name")}
                      placeholder="Nguyễn Văn A"
                    />
                    {errors.name && (
                      <p className="text-sm text-destructive mt-1">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="phone">Số điện thoại *</Label>
                    <Input
                      id="phone"
                      {...register("phone")}
                      placeholder="0123456789"
                    />
                    {errors.phone && (
                      <p className="text-sm text-destructive mt-1">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="message">Tin nhắn</Label>
                  <Textarea
                    id="message"
                    {...register("message")}
                    placeholder="Mô tả chi tiết yêu cầu của bạn..."
                    rows={4}
                  />
                </div>

                {submitSuccess && (
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md">
                    <p className="text-sm text-green-800 dark:text-green-200">
                      Cảm ơn bạn! Chúng tôi sẽ liên hệ lại sớm nhất có thể.
                    </p>
                  </div>
                )}

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Đang gửi...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Gửi yêu cầu
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

