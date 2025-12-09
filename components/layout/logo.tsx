"use client"

import Image from "next/image"
import { useState } from "react"

export function Logo() {
  const [imageError, setImageError] = useState(false)

  if (imageError) {
    return (
      <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        CodeX
      </span>
    )
  }

  return (
    <div className="relative h-8 w-32">
      <Image
        src="/logo.png"
        alt="CodeX Studio"
        fill
        className="object-contain"
        priority
        onError={() => setImageError(true)}
      />
    </div>
  )
}

