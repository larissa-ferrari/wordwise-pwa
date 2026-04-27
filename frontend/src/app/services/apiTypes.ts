// Types that mirror the FastAPI backend schemas (snake_case)

export interface ApiTokenResponse {
  access_token: string
  token_type:   string
}

export interface ApiUserPublic {
  id:              string
  username:        string
  display_name:    string
  bio:             string | null
  aesthetic:       string | null
  is_admin:        boolean
  books_read_count:  number
  reviews_count:     number
  followers_count:   number
  following_count:   number
  reading_streak:    number
  created_at:        string
}

export interface ApiAuthorOut {
  id:          string
  name:        string
  bio:         string | null
  photo_url:   string | null
  birth_year:  number | null
  nationality: string | null
  books_count: number
  created_at:  string
}

export interface ApiCategoryOut {
  id:          string
  name:        string
  slug:        string
  description: string | null
  books_count: number
  created_at:  string
}

export interface ApiUserProfile extends ApiUserPublic {
  avg_rating:    number | null
  is_following:  boolean
  compatibility: number | null
}

export interface ApiTrope {
  id:   string
  name: string
  slug: string
}

export interface ApiBookSummary {
  id:             string
  title:          string
  author:         string
  cover_gradient: string | null
  cover_url:      string | null
  avg_rating:     number
  genres:         string[]
}

export interface ApiBookOut extends ApiBookSummary {
  series:         string | null
  isbn:           string | null
  description:    string | null
  pages:          number | null
  published_year: number | null
  rating_count:   number
  tropes:         ApiTrope[]
  created_at:     string
}

export interface ApiReviewOut {
  id:                 string
  user:               ApiUserPublic
  book:               ApiBookSummary
  rating:             number
  text:               string | null
  favorite_quote:     string | null
  emotions:           string[]
  likes_count:        number
  helpful_count:      number
  helpful_percentage: number
  created_at:         string
}

export interface ApiShelfEntryOut {
  id:                  string
  book:                ApiBookOut
  shelf:               string
  current_page:        number | null
  progress_percentage: number
  added_at:            string
  updated_at:          string
}

export interface ApiEmotionBreakdown {
  emotion:    string
  label:      string
  count:      number
  percentage: number
}

export interface ApiCursorPage<T> {
  items:       T[]
  next_cursor: string | null
  has_next:    boolean
}

export interface ApiPaginatedResponse<T> {
  items:     T[]
  total:     number
  page:      number
  page_size: number
  has_next:  boolean
}
