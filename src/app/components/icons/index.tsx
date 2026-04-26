import {
  Heart,
  Droplets,
  Smile,
  Zap,
  Meh,
  BookOpen,
  Rocket,
  Leaf,
  Wand2,
  Swords,
  Ghost,
  Brain,
  BookMarked,
  Flame,
  Sparkles,
  Square,
  Moon,
  Activity,
  Compass,
  PenLine,
  Users,
} from 'lucide-react'

// ─── Emotion icons ─────────────────────────────────────────────────────────────

export type EmotionId =
  | 'love'
  | 'cried'
  | 'laughed'
  | 'surprised'
  | 'irritated'
  | 'absorbed'
  | 'excited'
  | 'peaceful'

const EMOTION_CONFIG: Record<EmotionId, { Icon: React.ElementType; color: string; label: string }> = {
  love:      { Icon: Heart,    color: '#e8635a', label: 'Me apaixonei'     },
  cried:     { Icon: Droplets, color: '#6a9fcf', label: 'Chorei'           },
  laughed:   { Icon: Smile,    color: '#c8a96e', label: 'Ri muito'         },
  surprised: { Icon: Zap,      color: '#b87cde', label: 'Fui surpreendido' },
  irritated: { Icon: Meh,      color: '#8a7e6e', label: 'Me irritei'       },
  absorbed:  { Icon: BookOpen, color: '#c8a96e', label: 'Absorvido'        },
  excited:   { Icon: Rocket,   color: '#6a9fcf', label: 'Animado'          },
  peaceful:  { Icon: Leaf,     color: '#7c9e7a', label: 'Em paz'           },
}

interface EmotionIconProps {
  id: EmotionId
  size?: number
  showLabel?: boolean
  className?: string
}

export function EmotionIcon({ id, size = 16, showLabel = false, className }: EmotionIconProps) {
  const config = EMOTION_CONFIG[id]
  if (!config) return null
  const { Icon, color, label } = config
  if (showLabel) {
    return (
      <span className={`inline-flex items-center gap-1.5 ${className ?? ''}`}>
        <Icon size={size} style={{ color }} />
        <span>{label}</span>
      </span>
    )
  }
  return <Icon size={size} style={{ color }} className={className} />
}

export function getEmotionColor(id: EmotionId): string {
  return EMOTION_CONFIG[id]?.color ?? '#8a7e6e'
}

export function getEmotionLabel(id: EmotionId): string {
  return EMOTION_CONFIG[id]?.label ?? id
}

// ─── Genre icons ───────────────────────────────────────────────────────────────

export type GenreId =
  | 'fantasy'
  | 'romance'
  | 'thriller'
  | 'literary'
  | 'scifi'
  | 'horror'
  | 'nonfiction'
  | 'manga'

const GENRE_CONFIG: Record<GenreId, { Icon: React.ElementType; color: string }> = {
  fantasy:    { Icon: Wand2,      color: '#b87cde' },
  romance:    { Icon: Heart,      color: '#e8635a' },
  thriller:   { Icon: Swords,     color: '#8a7e6e' },
  literary:   { Icon: BookOpen,   color: '#c8a96e' },
  scifi:      { Icon: Rocket,     color: '#6a9fcf' },
  horror:     { Icon: Ghost,      color: '#8a7e6e' },
  nonfiction: { Icon: Brain,      color: '#6a9fcf' },
  manga:      { Icon: BookMarked, color: '#e8635a' },
}

interface GenreIconProps {
  id: GenreId
  size?: number
  className?: string
}

export function GenreIcon({ id, size = 24, className }: GenreIconProps) {
  const config = GENRE_CONFIG[id]
  if (!config) return null
  const { Icon, color } = config
  return <Icon size={size} style={{ color }} className={className} />
}

export function getGenreColor(id: GenreId): string {
  return GENRE_CONFIG[id]?.color ?? '#c8a96e'
}

// ─── Aesthetic icons ───────────────────────────────────────────────────────────

export type AestheticId = 'dark-academia' | 'cottagecore' | 'minimalist' | 'fantasy' | 'vibrant'

const AESTHETIC_CONFIG: Record<AestheticId, { Icon: React.ElementType; color: string }> = {
  'dark-academia': { Icon: Flame,    color: '#c8a96e' },
  cottagecore:     { Icon: Leaf,     color: '#7c9e7a' },
  minimalist:      { Icon: Square,   color: '#6a9fcf' },
  fantasy:         { Icon: Sparkles, color: '#b87cde' },
  vibrant:         { Icon: Sparkles, color: '#e8635a' },
}

interface AestheticIconProps {
  id: AestheticId
  size?: number
  className?: string
}

export function AestheticIcon({ id, size = 14, className }: AestheticIconProps) {
  const config = AESTHETIC_CONFIG[id]
  if (!config) return null
  const { Icon, color } = config
  return <Icon size={size} style={{ color }} className={className} />
}

// ─── User avatar ───────────────────────────────────────────────────────────────

interface UserAvatarProps {
  name: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

const AVATAR_GRADIENTS = [
  'from-[#c8a96e] to-[#e8635a]',
  'from-[#6a9fcf] to-[#b87cde]',
  'from-[#7c9e7a] to-[#c8a96e]',
  'from-[#e8635a] to-[#b87cde]',
  'from-[#b87cde] to-[#6a9fcf]',
]

function nameToGradient(name: string): string {
  let h = 0
  for (let i = 0; i < name.length; i++) h = name.charCodeAt(i) + ((h << 5) - h)
  return AVATAR_GRADIENTS[Math.abs(h) % AVATAR_GRADIENTS.length]
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .map(n => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

const SIZE_MAP = {
  sm: { outer: 'w-8 h-8',   text: 'text-xs font-semibold'  },
  md: { outer: 'w-10 h-10', text: 'text-sm font-semibold'  },
  lg: { outer: 'w-12 h-12', text: 'text-base font-semibold'},
  xl: { outer: 'w-24 h-24', text: 'text-3xl font-semibold' },
}

export function UserAvatar({ name, size = 'md', className = '' }: UserAvatarProps) {
  const gradient = nameToGradient(name)
  const initials = getInitials(name)
  const { outer, text } = SIZE_MAP[size]
  return (
    <div
      className={`${outer} rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center flex-shrink-0 ${className}`}
    >
      <span className={`${text} text-[#1a1210]`}>{initials}</span>
    </div>
  )
}

// ─── Badge icons ───────────────────────────────────────────────────────────────

export type BadgeId = 'marathon' | 'explorer' | 'critic' | 'social'

const BADGE_CONFIG: Record<BadgeId, { Icon: React.ElementType; color: string }> = {
  marathon: { Icon: Activity, color: '#e8635a' },
  explorer: { Icon: Compass,  color: '#6a9fcf' },
  critic:   { Icon: PenLine,  color: '#c8a96e' },
  social:   { Icon: Users,    color: '#7c9e7a' },
}

interface BadgeIconProps {
  id: BadgeId
  size?: number
  className?: string
}

export function BadgeIcon({ id, size = 28, className }: BadgeIconProps) {
  const config = BADGE_CONFIG[id]
  if (!config) return null
  const { Icon, color } = config
  return <Icon size={size} style={{ color }} className={className} />
}

// ─── Mood icons ────────────────────────────────────────────────────────────────

export type MoodId = 'escape' | 'learn' | 'cry' | 'laugh' | 'challenge' | 'thrill'

const MOOD_CONFIG: Record<MoodId, { Icon: React.ElementType; color: string }> = {
  escape:    { Icon: Moon,      color: '#b87cde' },
  learn:     { Icon: Brain,     color: '#6a9fcf' },
  cry:       { Icon: Droplets,  color: '#e8635a' },
  laugh:     { Icon: Smile,     color: '#c8a96e' },
  challenge: { Icon: Zap,       color: '#7c9e7a' },
  thrill:    { Icon: Zap,       color: '#7c9e7a' },
}

interface MoodIconProps {
  id: MoodId
  size?: number
  className?: string
}

export function MoodIcon({ id, size = 24, className }: MoodIconProps) {
  const config = MOOD_CONFIG[id]
  if (!config) return null
  const { Icon, color } = config
  return <Icon size={size} style={{ color }} className={className} />
}

export function getMoodColor(id: MoodId): string {
  return MOOD_CONFIG[id]?.color ?? '#c8a96e'
}
