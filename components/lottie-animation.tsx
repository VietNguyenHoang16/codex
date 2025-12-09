"use client"

import { useEffect, useState } from "react"
import Lottie from "lottie-react"

interface LottieAnimationProps {
  url?: string
  jsonPath?: string
  className?: string
  height?: number
  width?: number
}

export function LottieAnimation({ 
  url, 
  jsonPath = "/animations/animation.json", 
  className, 
  height = 400, 
  width = 400 
}: LottieAnimationProps) {
  const [animationData, setAnimationData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadAnimation = async () => {
      try {
        setIsLoading(true)
        setError(null)

        let jsonUrl = jsonPath

        // If URL is provided, try to extract animation ID and use local file
        if (url) {
          const match = url.match(/animation\/([a-f0-9-]+)/)
          if (match) {
            // Use the animation ID as filename
            const animationId = match[1]
            jsonUrl = `/animations/${animationId}.json`
          }
        }

        // Fetch JSON from public folder
        const response = await fetch(jsonUrl)
        
        if (!response.ok) {
          throw new Error(`Failed to load animation: ${response.status}`)
        }

        const data = await response.json()
        
        // Verify it's a valid Lottie JSON
        if (data && (data.v || data.fr !== undefined)) {
          setAnimationData(data)
        } else {
          throw new Error("Invalid Lottie JSON format")
        }
      } catch (err: any) {
        console.error("Error loading Lottie animation:", err)
        setError(err.message || "Failed to load animation")
      } finally {
        setIsLoading(false)
      }
    }

    loadAnimation()
  }, [url, jsonPath])

  if (isLoading) {
    return (
      <div 
        className={`flex items-center justify-center ${className}`}
        style={{ height, width }}
      >
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (error || !animationData) {
    return (
      <div 
        className={`flex items-center justify-center text-muted-foreground ${className}`}
        style={{ height, width }}
      >
        <p className="text-sm">Không thể tải animation</p>
      </div>
    )
  }

  return (
    <div className={className} style={{ height: "auto", width: "100%", aspectRatio: "4/3" }}>
      <Lottie
        animationData={animationData}
        loop={true}
        autoplay={true}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  )
}

