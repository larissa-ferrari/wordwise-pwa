import type { Aesthetic, Emotion, Genre, ReadingMood } from '../types'

// ─── Brand colors ─────────────────────────────────────────────────────────────

export const COLORS = {
  inkBlack: '#0a0807',
  deepEspresso: '#1a1210',
  antiqueGold: '#c8a96e',
  parchment: '#e8d4a8',
  literaryCoral: '#e8635a',
  sageWisdom: '#7c9e7a',
  midnightBlue: '#6a9fcf',
  violetProse: '#b87cde',
  ashGray: '#8a7e6e',
  cream: '#f5f0e8',
} as const

// ─── Aesthetics ───────────────────────────────────────────────────────────────

export const AESTHETICS: Record<Aesthetic, { label: string; emoji: string; gradient: string }> = {
  'dark-academia': { label: 'Dark Academia', emoji: '🕯️', gradient: 'from-[#2d1f0e] to-[#1a1210]' },
  cottagecore: { label: 'Cottagecore Literário', emoji: '🌿', gradient: 'from-[#2d3d1f] to-[#1a2410]' },
  minimalist: { label: 'Minimalista Urbano', emoji: '⬜', gradient: 'from-[#1f1f2e] to-[#0a0a15]' },
  fantasy: { label: 'Fantasia Vibrante', emoji: '✨', gradient: 'from-[#2d1040] to-[#1a0a20]' },
}

// ─── Genres ───────────────────────────────────────────────────────────────────

export const GENRES: Array<{ value: Genre; emoji: string }> = [
  { value: 'Fantasy', emoji: '🧙' },
  { value: 'Romance', emoji: '💕' },
  { value: 'Thriller', emoji: '🔪' },
  { value: 'Literary', emoji: '📖' },
  { value: 'Sci-Fi', emoji: '🚀' },
  { value: 'Horror', emoji: '👻' },
  { value: 'Non-Fiction', emoji: '🎓' },
  { value: 'Manga', emoji: '🇯🇵' },
]

// ─── Emotions ─────────────────────────────────────────────────────────────────

export const EMOTIONS: Record<Emotion, { label: string; emoji: string; color: string }> = {
  love: { label: 'Me apaixonei', emoji: '❤️', color: '#e8635a' },
  cried: { label: 'Chorei', emoji: '😢', color: '#6a9fcf' },
  laughed: { label: 'Ri muito', emoji: '😄', color: '#c8a96e' },
  surprised: { label: 'Fui surpreendido', emoji: '⚡', color: '#b87cde' },
  irritated: { label: 'Me irritei', emoji: '😐', color: '#7c9e7a' },
}

// ─── Reading Moods ────────────────────────────────────────────────────────────

export const READING_MOODS: Record<ReadingMood, { label: string; emoji: string; color: string }> = {
  escape: { label: 'Quero escapar', emoji: '🌟', color: '#b87cde' },
  learn: { label: 'Quero aprender', emoji: '📚', color: '#6a9fcf' },
  cry: { label: 'Quero chorar', emoji: '💔', color: '#e8635a' },
  laugh: { label: 'Quero rir', emoji: '😄', color: '#c8a96e' },
  challenge: { label: 'Quero ser desafiado', emoji: '⚡', color: '#7c9e7a' },
}

// ─── Rating labels ────────────────────────────────────────────────────────────

export const RATING_LABELS: Record<number, string> = {
  1: 'Decepcionante',
  2: 'Não é pra mim',
  3: 'Gostei',
  4: 'Adorei!',
  5: 'Obra-prima!',
}

// ─── App routes ───────────────────────────────────────────────────────────────

export const ROUTES = {
  onboarding: '/onboarding',
  feed: '/feed',
  discover: '/discover',
  shelves: '/shelves',
  profile: '/profile',
  bookDetails: (id: string) => `/books/${id}`,
  brand: '/brand',
} as const

// ─── Storage keys ─────────────────────────────────────────────────────────────

export const STORAGE_KEYS = {
  onboardingCompleted: 'ww:onboarding_completed',
  userProfile: 'ww:user_profile',
  shelves: 'ww:shelves',
} as const
