import React, { createContext, useContext, useState } from 'react'

interface ReviewModalContextValue {
  isOpen: boolean
  open: () => void
  close: () => void
}

const ReviewModalContext = createContext<ReviewModalContextValue | null>(null)

export function ReviewModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <ReviewModalContext.Provider
      value={{ isOpen, open: () => setIsOpen(true), close: () => setIsOpen(false) }}
    >
      {children}
    </ReviewModalContext.Provider>
  )
}

export function useReviewModal() {
  const ctx = useContext(ReviewModalContext)
  if (!ctx) throw new Error('useReviewModal must be used within <ReviewModalProvider>')
  return ctx
}
