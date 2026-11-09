// HTML betiği kayıtlı temayı veya açık varsayılanı ilk boyamadan önce uygular.
import { useSyncExternalStore } from 'react'

export type Theme = 'light' | 'dark'
const KEY = 'battery-intelligence-theme'

function stored(): Theme | null {
  try { const value = localStorage.getItem(KEY); return value === 'light' || value === 'dark' ? value : null } catch { return null }
}

let current: Theme = (document.documentElement.dataset.theme as Theme | undefined) ?? stored() ?? 'light'
const listeners = new Set<() => void>()

function apply(theme: Theme) {
  current = theme
  document.documentElement.dataset.theme = theme
  document.documentElement.style.colorScheme = theme
  listeners.forEach((listener) => listener())
}
apply(current)

export function setTheme(theme: Theme) {
  try { localStorage.setItem(KEY, theme) } catch { /* Tercih bu oturumla sınırlı kalır. */ }
  apply(theme)
}

export function useTheme() {
  const theme = useSyncExternalStore((listener) => { listeners.add(listener); return () => listeners.delete(listener) }, () => current)
  return { theme, toggle: () => setTheme(theme === 'dark' ? 'light' : 'dark') }
}
