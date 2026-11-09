import { Moon, Sun } from 'lucide-react'
import { useI18n } from '../lib/i18n.tsx'
import { useTheme } from '../lib/theme.ts'

export function ThemeToggle({ className = '', showLabel = false }: { className?: string; showLabel?: boolean }) {
  const { l } = useI18n()
  const { theme, toggle } = useTheme()
  const label = theme === 'dark' ? l('Switch to light theme', 'Açık temaya geç') : l('Switch to dark theme', 'Koyu temaya geç')
  return (
    <button type="button" className={className} onClick={toggle} aria-label={label} title={label}>
      {theme === 'dark' ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
      {showLabel && <span>{label}</span>}
    </button>
  )
}
