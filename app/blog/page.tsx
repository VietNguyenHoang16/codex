import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar } from "lucide-react"
import { formatDate } from "@/lib/utils"
import { Metadata } from "next"
import { prisma } from "@/lib/prisma"

export const metadata: Metadata = {
  title: "Blog - CodeX Studio",
  description: "Các bài viết về thiết kế website, SEO, hosting và công nghệ web",
}

async function getPosts() {
  try {
    const posts = await prisma.post.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
      take: 12,
    })
    return posts
  } catch (error) {
    console.error("Error fetching posts:", error)
    return []
  }
}

export default async function BlogPage() {
  const posts = await getPosts()

  // Sample posts nếu chưa có data
  const samplePosts = [
    {
      id: "1",
      title: "Tối ưu tốc độ website - Hướng dẫn chi tiết",
      slug: "toi-uu-toc-do-website",
      excerpt: "Tốc độ tải trang là yếu tố quan trọng ảnh hưởng đến trải nghiệm người dùng và SEO. Bài viết này sẽ hướng dẫn bạn cách tối ưu tốc độ website hiệu quả.",
      featuredImage: "https://placehold.co/600x400/4F46E5/FFFFFF?text=Blog+Post",
      createdAt: new Date(),
    },
    {
      id: "2",
      title: "Web chuẩn SEO là gì? Tại sao quan trọng?",
      slug: "web-chuan-seo-la-gi",
      excerpt: "Website chuẩn SEO giúp tăng thứ hạng trên Google, thu hút nhiều khách hàng tiềm năng hơn. Tìm hiểu cách tạo website chuẩn SEO.",
      featuredImage: "https://placehold.co/600x400/4F46E5/FFFFFF?text=Blog+Post",
      createdAt: new Date(),
    },
    {
      id: "3",
      title: "Hosting là gì? Chọn hosting như thế nào?",
      slug: "hosting-la-gi",
      excerpt: "Hosting là nơi lưu trữ website của bạn. Bài viết này sẽ giúp bạn hiểu rõ về hosting và cách chọn hosting phù hợp.",
      featuredImage: "https://placehold.co/600x400/4F46E5/FFFFFF?text=Blog+Post",
      createdAt: new Date(),
    },
    {
      id: "4",
      title: "VPS là gì? Khi nào nên dùng VPS?",
      slug: "vps-la-gi",
      excerpt: "VPS (Virtual Private Server) là giải pháp hosting mạnh mẽ hơn shared hosting. Tìm hiểu khi nào nên sử dụng VPS.",
      featuredImage: "https://placehold.co/600x400/4F46E5/FFFFFF?text=Blog+Post",
      createdAt: new Date(),
    },
    {
      id: "5",
      title: "So sánh Shared Hosting và VPS",
      slug: "so-sanh-shared-hosting-va-vps",
      excerpt: "So sánh chi tiết giữa Shared Hosting và VPS để giúp bạn chọn giải pháp phù hợp nhất cho website của mình.",
      featuredImage: "https://placehold.co/600x400/4F46E5/FFFFFF?text=Blog+Post",
      createdAt: new Date(),
    },
    {
      id: "6",
      title: "Lý do website load chậm và cách khắc phục",
      slug: "ly-do-website-load-cham",
      excerpt: "Website load chậm ảnh hưởng nghiêm trọng đến trải nghiệm người dùng. Tìm hiểu nguyên nhân và cách khắc phục.",
      featuredImage: "https://placehold.co/600x400/4F46E5/FFFFFF?text=Blog+Post",
      createdAt: new Date(),
    },
  ]

  const displayPosts = posts.length > 0 ? posts : samplePosts

  return (
    <div className="min-h-screen">
      <section className="py-20 md:py-32 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Blog
            </h1>
            <p className="text-xl text-muted-foreground">
              Các bài viết về thiết kế website, SEO, hosting và công nghệ web
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
                {post.featuredImage && (
                  <div className="relative h-48 w-full bg-muted">
                    <img
                      src={post.featuredImage}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <CardHeader>
                  <div className="flex items-center text-sm text-muted-foreground mb-2">
                    <Calendar className="h-4 w-4 mr-2" />
                    {formatDate(post.createdAt)}
                  </div>
                  <CardTitle className="text-xl line-clamp-2">{post.title}</CardTitle>
                  <CardDescription className="line-clamp-3">
                    {post.excerpt || post.content?.substring(0, 150)}
                  </CardDescription>
                </CardHeader>
                <CardContent className="mt-auto">
                  <Button asChild variant="ghost" className="w-full">
                    <Link href={`/blog/${post.slug}`}>
                      Đọc thêm
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

