"use client"

import { useState } from "react"

interface PortfolioImageProps {
  src: string
  alt: string
  className?: string
}

export function PortfolioImage({ src, alt, className = "" }: PortfolioImageProps) {
  const [imgSrc, setImgSrc] = useState(src)
  const [hasError, setHasError] = useState(false)

  const handleError = () => {
    if (!hasError) {
      setHasError(true)
      setImgSrc("https://placehold.co/400x300?text=Image+Error")
    }
  }

  if (!src || !src.startsWith("http")) {
    return (
      <div className={`w-full h-full flex items-center justify-center text-muted-foreground bg-muted ${className}`}>
        No Image
      </div>
    )
  }

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      onError={handleError}
    />
  )
}

