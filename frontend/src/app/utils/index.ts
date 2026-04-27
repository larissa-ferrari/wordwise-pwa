/**
 * Shared utility functions. Pure — no side effects, no imports from app code.
 */

import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/** Merge Tailwind classes safely (shadcn/ui pattern) */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format a date string as a relative time label in Portuguese.
 * e.g. "2h atrás", "ontem", "3 dias atrás"
 */
export function formatRelativeTime(isoString: string): string {
  const diff = Date.now() - new Date(isoString).getTime()
  const minutes = Math.floor(diff / 60_000)
  const hours = Math.floor(diff / 3_600_000)
  const days = Math.floor(diff / 86_400_000)

  if (minutes < 1) return 'agora mesmo'
  if (minutes < 60) return `${minutes}min atrás`
  if (hours < 24) return `${hours}h atrás`
  if (days === 1) return 'ontem'
  if (days < 7) return `${days} dias atrás`

  return new Date(isoString).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })
}

/**
 * Truncate text to a max character count, appending "…" if trimmed.
 */
export function truncate(text: string, max: number): string {
  if (text.length <= max) return text
  return text.slice(0, max).trimEnd() + '…'
}

/**
 * Return a deterministic gradient string for a book without one defined.
 */
export function bookGradientFallback(bookId: string): string {
  const gradients = [
    'from-[#c8a96e] to-[#e8635a]',
    'from-[#6a9fcf] to-[#b87cde]',
    'from-[#7c9e7a] to-[#c8a96e]',
    'from-[#e8635a] to-[#b87cde]',
    'from-[#b87cde] to-[#6a9fcf]',
  ]
  const index = bookId.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0) % gradients.length
  return gradients[index]
}

/** Format large numbers: 1200 → "1.2k" */
export function formatCount(n: number): string {
  if (n < 1000) return String(n)
  return `${(n / 1000).toFixed(1).replace('.0', '')}k`
}
