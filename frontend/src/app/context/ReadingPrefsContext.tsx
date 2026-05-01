import { createContext, useContext, useState } from 'react'

export type FontSize    = 'sm' | 'md' | 'lg' | 'xl'
export type ReadingBg   = 'dark' | 'sepia' | 'paper'
export type LineSpacing = 'compact' | 'normal' | 'relaxed'

export interface ReadingPrefs {
  fontSize:    FontSize
  bg:          ReadingBg
  lineSpacing: LineSpacing
  serif:       boolean
}

interface ReadingPrefsCtx {
  prefs: ReadingPrefs
  set: <K extends keyof ReadingPrefs>(key: K, value: ReadingPrefs[K]) => void
}

const DEFAULTS: ReadingPrefs = {
  fontSize:    'md',
  bg:          'dark',
  lineSpacing: 'normal',
  serif:       true,
}

const STORAGE_KEY = 'ww-reading-prefs'

const Ctx = createContext<ReadingPrefsCtx>({ prefs: DEFAULTS, set: () => {} })

export function ReadingPrefsProvider({ children }: { children: React.ReactNode }) {
  const [prefs, setPrefs] = useState<ReadingPrefs>(() => {
    try {
      return { ...DEFAULTS, ...JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}') }
    } catch {
      return DEFAULTS
    }
  })

  const set = <K extends keyof ReadingPrefs>(key: K, value: ReadingPrefs[K]) => {
    setPrefs(p => {
      const next = { ...p, [key]: value }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      return next
    })
  }

  return <Ctx.Provider value={{ prefs, set }}>{children}</Ctx.Provider>
}

export const useReadingPrefs = () => useContext(Ctx)
