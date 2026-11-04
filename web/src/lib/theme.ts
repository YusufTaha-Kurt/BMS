// Açık/koyu tema. Kayıtlı tercih yoksa cihazın ayarı izlenir. HTML başındaki küçük betik aynı kuralla
// ilk boyamadan önce data-theme değerini yazar; bu modül sonradan gelen değişiklikleri yönetir.
import { useSyncExternalStore } from 'react'

export type Theme = 'light' | 'dark'
const KEY = 'battery-intelligence-theme'
const media = window.matchMedia('(prefers-color-scheme: dark)')

function stored(): Theme | null {
  try { const value = localStorage.getItem(KEY); return value === 'light' || value === 'dark' ? value : null } catch { return null }
}
const system = (): Theme => (media.matches ? 'dark' : 'light')

let current: Theme = (document.documentElement.dataset.theme as Theme | undefined) ?? stored() ?? system()
const listeners = new Set<() => void>()

function apply(theme: Theme) {
  current = theme
  document.documentElement.dataset.theme = theme
  document.documentElement.style.colorScheme = theme
  listeners.forEach((listener) => listener())
}
apply(current)
media.addEventListener('change', () => { if (!stored()) apply(system()) })

export function setTheme(theme: Theme) {
  try { localStorage.setItem(KEY, theme) } catch { /* Tercih bu oturumla sınırlı kalır. */ }
  apply(theme)
}

export function useTheme() {
  const theme = useSyncExternalStore((listener) => { listeners.add(listener); return () => listeners.delete(listener) }, () => current)
  return { theme, toggle: () => setTheme(theme === 'dark' ? 'light' : 'dark') }
}
