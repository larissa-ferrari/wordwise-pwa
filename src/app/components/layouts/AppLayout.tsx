import React from 'react'
import { Outlet } from 'react-router-dom'
import { BottomNav } from './BottomNav'
import { ReviewModal } from '../features/review/ReviewModal'
import { useReviewModal } from '../../context/ReviewModalContext'

export function AppLayout() {
  const { isOpen, close } = useReviewModal()

  return (
    <div className="relative min-h-screen bg-[#0a0807] max-w-md mx-auto">
      {/* Page content */}
      <main className="pb-20">
        <Outlet />
      </main>

      {/* Persistent bottom navigation */}
      <BottomNav />

      {/* Global review modal */}
      <ReviewModal isOpen={isOpen} onClose={close} />
    </div>
  )
}
