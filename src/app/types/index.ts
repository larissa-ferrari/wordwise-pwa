// ─── User ────────────────────────────────────────────────────────────────────

export type Aesthetic = 'dark-academia' | 'cottagecore' | 'minimalist' | 'fantasy'

export type ReadingMood =
  | 'escape'
  | 'learn'
  | 'cry'
  | 'laugh'
  | 'challenge'

export interface User {
  id: string
  name: string
  username: string
  avatar: string
  bio?: string
  aesthetic: Aesthetic
  followersCount: number
  followingCount: number
  booksReadCount: number
  reviewsCount: number
  readingStreak: number
  averageRating: number
  favoriteGenres: string[]
  badges: Badge[]
}

// ─── Book ─────────────────────────────────────────────────────────────────────

export type Genre =
  | 'Fantasy'
  | 'Romance'
  | 'Thriller'
  | 'Literary'
  | 'Sci-Fi'
  | 'Horror'
  | 'Non-Fiction'
  | 'Manga'

export interface Book {
  id: string
  title: string
  author: string
  coverGradient: string
  synopsis?: string
  genres: Genre[]
  tropes?: string[]
  pageCount?: number
  publishedYear?: number
  seriesName?: string
  seriesNumber?: number
  rating: number
  ratingsCount: number
  emotionsBreakdown?: EmotionBreakdown[]
}

// ─── Review ───────────────────────────────────────────────────────────────────

export type Emotion =
  | 'love'
  | 'cried'
  | 'laughed'
  | 'surprised'
  | 'irritated'

export interface Review {
  id: string
  userId: string
  user: Pick<User, 'id' | 'name' | 'username' | 'avatar' | 'aesthetic'>
  bookId: string
  book: Pick<Book, 'id' | 'title' | 'author' | 'coverGradient'>
  rating: number
  emotions: Emotion[]
  text?: string
  favoritQuote?: string
  spotifyTrackId?: string
  likesCount: number
  commentsCount: number
  isLiked: boolean
  createdAt: string
}

// ─── Shelf ────────────────────────────────────────────────────────────────────

export type ShelfType = 'reading' | 'read' | 'want-to-read'

export interface ShelfEntry {
  id: string
  bookId: string
  book: Book
  shelf: ShelfType
  currentPage?: number
  addedAt: string
  finishedAt?: string
  review?: Review
}

// ─── Misc ─────────────────────────────────────────────────────────────────────

export interface Badge {
  id: string
  label: string
  emoji: string
  unlockedAt: string
}

export interface EmotionBreakdown {
  emotion: Emotion
  percentage: number
  count: number
}

export interface UserCompatibility {
  user: Pick<User, 'id' | 'name' | 'username' | 'avatar'>
  matchPercentage: number
}

// ─── API / Service shapes ─────────────────────────────────────────────────────

export interface PaginatedResponse<T> {
  data: T[]
  nextCursor: string | null
  total: number
}

export interface ApiError {
  message: string
  code: string
  status: number
}
