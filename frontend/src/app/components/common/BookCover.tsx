import { useState } from 'react'

interface BookCoverProps {
  cover_url?: string | null
  cover_gradient?: string | null
  alt?: string
  className?: string
  children?: React.ReactNode
}

export function BookCover({
  cover_url,
  cover_gradient,
  alt = '',
  className = '',
  children,
}: BookCoverProps) {
  const [imgError, setImgError] = useState(false)

  const showImage = Boolean(cover_url) && !imgError
  const bgClass   = cover_gradient ? `bg-gradient-to-br ${cover_gradient}` : 'bg-[#2a1f1a]'

  return (
    <div className={`relative overflow-hidden ${showImage ? '' : bgClass} ${className}`}>
      {showImage && (
        <img
          src={cover_url!}
          alt={alt}
          className="absolute inset-0 w-full h-full object-cover"
          onError={() => setImgError(true)}
        />
      )}
      {children}
    </div>
  )
}
