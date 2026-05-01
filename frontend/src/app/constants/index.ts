import type { Aesthetic, Emotion, Genre, ReadingMood, StoryRating, StoryStatus, TagType } from '../types'

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

export const STORY_RATINGS: Record<StoryRating, { label: string; color: string; bg: string }> = {
  general: { label: 'G', color: '#7c9e7a', bg: '#7c9e7a20' },
  teen:    { label: 'T', color: '#6a9fcf', bg: '#6a9fcf20' },
  mature:  { label: 'M', color: '#c8a96e', bg: '#c8a96e20' },
  explicit: { label: 'E', color: '#e8635a', bg: '#e8635a20' },
}

export const STORY_STATUS: Record<StoryStatus, { label: string; color: string }> = {
  complete: { label: 'Completa',     color: '#7c9e7a' },
  ongoing:  { label: 'Em andamento', color: '#c8a96e' },
  hiatus:   { label: 'Hiato',        color: '#8a7e6e' },
}

export const TAG_COLORS: Record<TagType, string> = {
  fandom:       '#b87cde',
  relationship: '#e8635a',
  character:    '#6a9fcf',
  freeform:     '#8a7e6e',
}

export const STORY_WARNINGS: Record<string, string> = {
  violence:          'Violência Gráfica',
  character_death:   'Morte de Personagem',
  non_con:           'Conteúdo Não Consensual',
  underage:          'Menores de Idade',
  no_warnings:       'Sem Avisos',
  choose_not_to_warn: 'Autor Optou por Não Avisar',
}

export const COVER_GRADIENTS = [
  'from-[#2d1040] to-[#6a9fcf]',
  'from-[#1a0a20] to-[#e8635a]',
  'from-[#2d3d1f] to-[#b87cde]',
  'from-[#1f1f2e] to-[#c8a96e]',
  'from-[#0a0807] to-[#e8635a]',
  'from-[#2d1f0e] to-[#7c9e7a]',
  'from-[#1a1210] to-[#6a9fcf]',
  'from-[#2d1040] to-[#e8635a]',
  'from-[#0a1520] to-[#7c9e7a]',
  'from-[#2a0a0a] to-[#c8a96e]',
  'from-[#0a1a0a] to-[#b87cde]',
  'from-[#1a1a2e] to-[#e8d4a8]',
] as const

export const ROUTES = {
  onboarding: '/onboarding',
  feed: '/feed',
  discover: '/discover',
  shelves: '/shelves',
  profile: '/profile',
  stories: '/stories',
  storyDetails: (id: string) => `/stories/${id}`,
  chapterReader: (storyId: string, chapterNum: number) => `/stories/${storyId}/chapters/${chapterNum}`,
  myWorks: '/my-works',
  storyEditorNew: '/my-works/new',
  storyEditorEdit: (id: string) => `/my-works/${id}/edit`,
  chapterEditorNew: (storyId: string) => `/my-works/${storyId}/chapters/new`,
  chapterEditorEdit: (storyId: string, num: number) => `/my-works/${storyId}/chapters/${num}/edit`,
  bookDetails: (id: string) => `/books/${id}`,
  brand: '/brand',
} as const

// ─── Storage keys ─────────────────────────────────────────────────────────────

export const STORAGE_KEYS = {
  onboardingCompleted: 'ww:onboarding_completed',
  userProfile: 'ww:user_profile',
  shelves: 'ww:shelves',
} as const
