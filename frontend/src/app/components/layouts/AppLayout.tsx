import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { BottomNav } from './BottomNav'
import { ReviewModal } from '../features/review/ReviewModal'
import { useReviewModal } from '../../context/ReviewModalContext'

export function AppLayout() {
  const { isOpen, close } = useReviewModal()

  return (
    <div className="min-h-screen bg-[#0a0807]">
      {/* Desktop sidebar — fixed, hidden on mobile */}
      <Sidebar />

      {/* Main content — full width on mobile, offset by sidebar on desktop */}
      <main className="lg:pl-64 pb-20 lg:pb-0">
        {/* Mobile: constrain to phone width; desktop: no limit */}
        <div className="max-w-md mx-auto lg:max-w-none lg:mx-0">
          <Outlet />
        </div>
      </main>

      {/* Mobile bottom nav — hidden on desktop */}
      <BottomNav />

      {/* Global review modal */}
      <ReviewModal isOpen={isOpen} onClose={close} />
    </div>
  )
}
