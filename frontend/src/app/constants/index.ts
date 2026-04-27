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

export const AESTHETICS: Record<Aesthetic, { label: string; gradient: string }> = {
  'dark-academia': { label: 'Dark Academia',        gradient: 'from-[#2d1f0e] to-[#1a1210]' },
  cottagecore:     { label: 'Cottagecore Literário', gradient: 'from-[#2d3d1f] to-[#1a2410]' },
  minimalist:      { label: 'Minimalista Urbano',    gradient: 'from-[#1f1f2e] to-[#0a0a15]' },
  fantasy:         { label: 'Fantasia Vibrante',     gradient: 'from-[#2d1040] to-[#1a0a20]' },
}

// ─── Genres ───────────────────────────────────────────────────────────────────

export const GENRES: Array<{ value: Genre; iconId: string }> = [
  { value: 'Fantasy',     iconId: 'fantasy'    },
  { value: 'Romance',     iconId: 'romance'    },
  { value: 'Thriller',    iconId: 'thriller'   },
  { value: 'Literary',    iconId: 'literary'   },
  { value: 'Sci-Fi',      iconId: 'scifi'      },
  { value: 'Horror',      iconId: 'horror'     },
  { value: 'Non-Fiction', iconId: 'nonfiction' },
  { value: 'Manga',       iconId: 'manga'      },
]

// ─── Emotions ─────────────────────────────────────────────────────────────────

export const EMOTIONS: Record<Emotion, { label: string; color: string }> = {
  love:      { label: 'Me apaixonei',     color: '#e8635a' },
  cried:     { label: 'Chorei',           color: '#6a9fcf' },
  laughed:   { label: 'Ri muito',         color: '#c8a96e' },
  surprised: { label: 'Fui surpreendido', color: '#b87cde' },
  irritated: { label: 'Me irritei',       color: '#7c9e7a' },
}

// ─── Reading Moods ────────────────────────────────────────────────────────────

export const READING_MOODS: Record<ReadingMood, { label: string; color: string }> = {
  escape:    { label: 'Quero escapar',       color: '#b87cde' },
  learn:     { label: 'Quero aprender',      color: '#6a9fcf' },
  cry:       { label: 'Quero chorar',        color: '#e8635a' },
  laugh:     { label: 'Quero rir',           color: '#c8a96e' },
  challenge: { label: 'Quero ser desafiado', color: '#7c9e7a' },
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
