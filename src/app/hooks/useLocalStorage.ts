import { useState, useEffect } from 'react'

/**
 * Persists state in localStorage. Falls back gracefully when storage is unavailable.
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key)
      return item ? (JSON.parse(item) as T) : initialValue
    } catch {
      return initialValue
    }
  })

  const setValue = (value: T | ((prev: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch {
      // storage unavailable — only update in-memory state
      setStoredValue(value instanceof Function ? value(storedValue) : value)
    }
  }

  return [storedValue, setValue] as const
}
