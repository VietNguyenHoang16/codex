import { ContactFormSection } from "@/components/sections/contact-form-section"
import { Card, CardContent } from "@/components/ui/card"
import { Phone, Mail, MessageCircle, MapPin } from "lucide-react"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Liên hệ - CodeX Studio",
  description: "Liên hệ với CodeX Studio để được tư vấn và báo giá miễn phí",
}

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <section className="py-20 md:py-32 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Liên hệ với chúng tôi
            </h1>
            <p className="text-xl text-muted-foreground">
              Hãy liên hệ để được tư vấn và báo giá miễn phí
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            <Card>
              <CardContent className="pt-6 text-center">
                <Phone className="h-10 w-10 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Điện thoại</h3>
                <a href="tel:+84123456789" className="text-muted-foreground hover:text-foreground transition-colors">
                  +84 123 456 789
                </a>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 text-center">
                <MessageCircle className="h-10 w-10 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Zalo</h3>
                <a
                  href="https://zalo.me/0123456789"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  0123456789
                </a>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 text-center">
                <Mail className="h-10 w-10 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Email</h3>
                <a
                  href="mailto:contact@codex.studio"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  contact@codex.studio
                </a>
              </CardContent>
            </Card>
          </div>

          <ContactFormSection />
        </div>
      </section>
    </div>
  )
}

